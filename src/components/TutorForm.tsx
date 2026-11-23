import { FormEvent, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getUtmParams } from '../lib/utm';
import { TutorPrecoAncora } from './TutorSections';

type Fields = { nome: string; whatsapp: string; nomePet: string; especie: string; bairro: string; local: string };
type FieldErrors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { nome: '', whatsapp: '', nomePet: '', especie: '', bairro: '', local: '' };

const especies = [{ value: 'cao', label: 'Cão' }, { value: 'gato', label: 'Gato' }];
const locais = [
  { value: 'casa', label: 'Na minha casa' },
  { value: 'lugar_publico', label: 'Num lugar público ou praça' },
  { value: 'veterinario', label: 'No meu veterinário de confiança' },
];

function phoneDigits(value: string) {
  const digits = value.replace(/\D/g, '');
  return (digits.length >= 12 && digits.startsWith('55') ? digits.slice(2) : digits).slice(0, 11);
}

function maskPhone(value: string) {
  const d = phoneDigits(value);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {};
  const phone = phoneDigits(fields.whatsapp);
  if (!fields.nome.trim()) errors.nome = 'Escreva seu nome.';
  if (phone.length !== 10 && phone.length !== 11) errors.whatsapp = 'Escreva seu WhatsApp com DDD.';
  if (!fields.nomePet.trim()) errors.nomePet = 'Escreva o nome do seu pet.';
  if (!especies.some((item) => item.value === fields.especie)) errors.especie = 'Escolha cão ou gato.';
  if (!fields.bairro.trim()) errors.bairro = 'Escreva o seu bairro.';
  if (!locais.some((item) => item.value === fields.local)) errors.local = 'Escolha onde prefere fazer a triagem.';
  return errors;
}

export function TutorForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [petReservado, setPetReservado] = useState('');
  const submittingRef = useRef(false);

  const set = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`tt-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setError('');
    const { error: insertError } = await supabase.from('utopet_leads').insert([{
      origem: 'tutor',
      name: fields.nome.trim(),
      contact: phoneDigits(fields.whatsapp),
      nome_pet: fields.nomePet.trim(),
      especie: fields.especie,
      bairro: fields.bairro.trim(),
      local_preferido: fields.local,
      pagina_url: window.location.href.slice(0, 1000),
      ...getUtmParams(),
    }]);
    setLoading(false);
    if (insertError) {
      submittingRef.current = false;
      setError('Não conseguimos enviar agora. Tente de novo em instantes.');
      return;
    }
    window.fbq?.('track', 'Lead', { content_name: 'tutor' }, { eventID: crypto.randomUUID() });
    setPetReservado(fields.nomePet.trim());
  };

  if (petReservado) {
    return (
      <div className="tt-form-card card tt-sucesso" role="status">
        <span className="tt-sucesso-ic"><Check size={34} /></span>
        <h3>Pronto! A vaga do(a) {petReservado} está reservada.</h3>
        <p>Em até 24 horas a gente te chama no WhatsApp para combinar o dia e o local. Nada foi cobrado.</p>
      </div>
    );
  }

  const erro = (key: keyof Fields) => errors[key] && <span className="form-erro" id={`tt-${key}-erro`}>{errors[key]}</span>;
  const aria = (key: keyof Fields) => ({ 'aria-invalid': Boolean(errors[key]), 'aria-describedby': errors[key] ? `tt-${key}-erro` : undefined });
  const texto = (key: keyof Fields, label: string, placeholder: string, extra: Record<string, string> = {}) => (
    <div className="form-field">
      <label htmlFor={`tt-${key}`}>{label}</label>
      <input id={`tt-${key}`} type="text" maxLength={120} placeholder={placeholder} value={fields[key]} onChange={(event) => set(key, event.target.value)} {...aria(key)} {...extra} />
      {erro(key)}
    </div>
  );
  const opcoes = (key: 'especie' | 'local', label: string, items: Array<{ value: string; label: string }>, className: string) => (
    <fieldset className="tt-fieldset">
      <legend>{label}</legend>
      <div className={className} role="radiogroup" id={`tt-${key}`} tabIndex={-1} {...aria(key)}>
        {items.map((item) => (
          <label key={item.value} className={`tt-pilula ${fields[key] === item.value ? 'ativa' : ''}`}>
            <input type="radio" name={`tt-${key}`} value={item.value} checked={fields[key] === item.value} onChange={() => set(key, item.value)} />
            <span className="tt-pilula-marca">{fields[key] === item.value && <Check size={14} />}</span>
            {item.label}
          </label>
        ))}
      </div>
      {erro(key)}
    </fieldset>
  );

  return (
    <form className="tt-form-card card" onSubmit={handleSubmit} noValidate>
      {texto('nome', 'Seu nome', 'Como podemos te chamar?', { autoComplete: 'name' })}
      <div className="form-field">
        <label htmlFor="tt-whatsapp">WhatsApp</label>
        <input id="tt-whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="(11) 90000-0000" value={fields.whatsapp} onChange={(event) => set('whatsapp', maskPhone(event.target.value))} {...aria('whatsapp')} />
        {erro('whatsapp')}
      </div>
      {texto('nomePet', 'Nome do pet', 'Ex.: Luna')}
      {opcoes('especie', 'Cão ou gato', especies, 'tt-pilulas')}
      {texto('bairro', 'Bairro', 'Seu bairro em Bragança Paulista')}
      {opcoes('local', 'Onde prefere fazer a triagem', locais, 'tt-pilulas tt-pilulas-col')}
      {error && <p role="alert" className="form-erro">{error}</p>}
      <button type="submit" className="btn btn-roxo tt-enviar" disabled={loading}>{loading ? 'Enviando...' : 'Quero agendar a visita'}</button>
      <p className="tt-form-nota">Depois de enviar, a gente te chama no WhatsApp em até 24 horas para combinar o dia, o horário e o local. Nada é cobrado agora: você paga só na visita, <TutorPrecoAncora />, por Pix ou cartão.</p>
    </form>
  );
}
