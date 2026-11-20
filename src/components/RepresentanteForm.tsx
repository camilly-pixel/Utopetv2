import { FormEvent, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getUtmParams } from '../lib/utm';

const UFS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
const SEGMENTOS = [['racao_nutricao', 'Ração e nutrição'], ['medicamentos', 'Medicamentos veterinários'], ['equipamentos_hospitalares', 'Equipamentos e produtos hospitalares'], ['outro', 'Outro']];
const CLINICAS = [['ate_10', 'Até 10'], ['11_30', '11 a 30'], ['31_60', '31 a 60'], ['mais_60', 'Mais de 60']];
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Fields = { nome: string; whatsapp: string; email: string; cidade: string; uf: string; segmento: string; clinicas: string; empresa: string; linkedin: string };
const EMPTY: Fields = { nome: '', whatsapp: '', email: '', cidade: '', uf: '', segmento: '', clinicas: '', empresa: '', linkedin: '' };

function maskWhatsapp(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  const digits = f.whatsapp.replace(/\D/g, '');
  if (!f.nome.trim()) errors.nome = 'Informe seu nome completo.';
  if (digits.length !== 10 && digits.length !== 11) errors.whatsapp = 'Informe um WhatsApp válido com DDD.';
  if (!EMAIL_RE.test(f.email.trim())) errors.email = 'Informe um e-mail válido.';
  if (!f.cidade.trim()) errors.cidade = 'Informe a cidade.';
  if (!UFS.includes(f.uf)) errors.uf = 'Selecione o estado.';
  if (!SEGMENTOS.some(([v]) => v === f.segmento)) errors.segmento = 'Selecione uma opção.';
  if (!CLINICAS.some(([v]) => v === f.clinicas)) errors.clinicas = 'Selecione uma opção.';
  if (f.empresa.length > 300) errors.empresa = 'Use no máximo 300 caracteres.';
  if (f.linkedin.length > 300) errors.linkedin = 'Use no máximo 300 caracteres.';
  return errors;
}

export function RepresentanteForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const submittingRef = useRef(false);

  const update = (key: keyof Fields) => (event: { target: { value: string } }) => {
    const value = key === 'whatsapp' ? maskWhatsapp(event.target.value) : event.target.value;
    setFields((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    const errors = validate(fields);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    submittingRef.current = true;
    setLoading(true);
    setError('');
    const { error: insertError } = await supabase.from('utopet_leads').insert([{
      origem: 'representante',
      name: fields.nome.trim(),
      contact: fields.whatsapp.replace(/\D/g, ''),
      email: fields.email.trim().toLowerCase(),
      cidade: fields.cidade.trim(),
      uf: fields.uf,
      segmento: fields.segmento,
      clinicas_mes: fields.clinicas,
      empresa: fields.empresa.trim() || null,
      linkedin: fields.linkedin.trim() || null,
      pagina_url: window.location.href.slice(0, 1000),
      ...getUtmParams(),
    }]);
    setLoading(false);
    if (insertError) {
      submittingRef.current = false;
      setError('Não foi possível enviar agora. Tente novamente em instantes.');
      return;
    }
    window.fbq?.('track', 'Lead', { content_name: 'representante' }, { eventID: crypto.randomUUID() });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rep-sucesso" role="status">
        <div className="rep-sucesso-ic"><Check size={36} /></div>
        <p>Inscrição recebida. Nosso time vai falar com você pelo WhatsApp.</p>
      </div>
    );
  }

  const aria = (key: keyof Fields) => ({ 'aria-invalid': Boolean(fieldErrors[key]), 'aria-describedby': fieldErrors[key] ? `${key}-erro` : undefined });
  const field = (key: keyof Fields, label: string, input: JSX.Element, wide = false) => (
    <div className={`form-field${wide ? ' rep-largo' : ''}`}>
      <label htmlFor={key}>{label}</label>
      {input}
      {fieldErrors[key] && <span className="form-erro" id={`${key}-erro`}>{fieldErrors[key]}</span>}
    </div>
  );
  const text = (key: keyof Fields, placeholder: string, type = 'text', extra: Record<string, string> = {}) => (
    <input id={key} type={type} placeholder={placeholder} value={fields[key]} onChange={update(key)} {...aria(key)} {...extra} />
  );
  const select = (key: keyof Fields, options: string[][]) => (
    <select id={key} value={fields[key]} onChange={update(key)} {...aria(key)}>
      <option value="" disabled>Selecione</option>
      {options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
    </select>
  );

  return (
    <form className="rep-form" onSubmit={handleSubmit} noValidate>
      {field('nome', 'Nome completo*', text('nome', 'Seu nome completo', 'text', { autoComplete: 'name' }), true)}
      {field('whatsapp', 'WhatsApp*', text('whatsapp', '(00) 00000-0000', 'tel', { autoComplete: 'tel', inputMode: 'tel' }))}
      {field('email', 'E-mail*', text('email', 'voce@email.com', 'email', { autoComplete: 'email' }))}
      {field('cidade', 'Cidade*', text('cidade', 'Sua cidade', 'text', { autoComplete: 'address-level2' }))}
      {field('uf', 'Estado (UF)*', select('uf', UFS.map((uf) => [uf, uf])))}
      {field('segmento', 'O que você vende hoje?*', select('segmento', SEGMENTOS))}
      {field('clinicas', 'Quantas clínicas você visita por mês?*', select('clinicas', CLINICAS))}
      {field('empresa', 'Empresa ou marcas que representa', text('empresa', 'Opcional'))}
      {field('linkedin', 'LinkedIn', text('linkedin', 'Opcional', 'url', { inputMode: 'url' }))}
      {error && <p role="alert" className="form-erro rep-largo">{error}</p>}
      <button type="submit" className="btn btn-roxo rep-largo" disabled={loading}>{loading ? 'Enviando...' : 'Quero garantir a minha região'}</button>
    </form>
  );
}
