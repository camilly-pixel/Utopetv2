import { FormEvent, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import { LogoSvg } from './Icons';
import { supabase } from '../lib/supabase';
import { getUtmParams } from '../lib/utm';
import type { PageKind } from './UtopetShared';

type Fields = {
  nome: string;
  whatsapp: string;
  email: string;
  clinica: string;
  cidade: string;
  consultas: string;
  nomePet: string;
  especie: string;
  bairro: string;
};

const EMPTY: Fields = { nome: '', whatsapp: '', email: '', clinica: '', cidade: '', consultas: '', nomePet: '', especie: '', bairro: '' };
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function normalizeWhatsapp(value: string) {
  const digits = value.replace(/\D/g, '');
  const local = digits.length >= 12 && digits.startsWith('55') ? digits.slice(2) : digits;
  return local.length === 10 || local.length === 11 ? local : null;
}

function validate(fields: Fields, isVet: boolean) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!fields.nome.trim()) errors.nome = 'Informe seu nome.';
  if (!normalizeWhatsapp(fields.whatsapp)) errors.whatsapp = 'Informe um WhatsApp válido com DDD.';
  if (!EMAIL_RE.test(fields.email.trim())) errors.email = 'Informe um e-mail válido.';
  if (isVet) {
    if (!fields.clinica.trim()) errors.clinica = 'Informe o nome da clínica.';
    if (!fields.cidade.trim()) errors.cidade = 'Informe a cidade.';
    if (fields.consultas && !/^\d{1,4}$/.test(fields.consultas)) errors.consultas = 'Use apenas números.';
  } else {
    if (!fields.nomePet.trim()) errors.nomePet = 'Informe o nome do pet.';
    if (fields.especie !== 'cao' && fields.especie !== 'gato') errors.especie = 'Selecione a espécie.';
    if (!fields.bairro.trim()) errors.bairro = 'Informe o bairro.';
  }
  return errors;
}

export function LeadModal({ isOpen, onClose, kind }: { isOpen: boolean; onClose: () => void; kind: PageKind }) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const submittingRef = useRef(false);
  const isVet = kind === 'veterinario';

  const update = (key: keyof Fields) => (event: { target: { value: string } }) => {
    setFields((current) => ({ ...current, [key]: event.target.value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    const errors = validate(fields, isVet);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    submittingRef.current = true;
    setLoading(true);
    setError('');
    const common = {
      origem: kind,
      name: fields.nome.trim(),
      contact: normalizeWhatsapp(fields.whatsapp),
      email: fields.email.trim().toLowerCase(),
      pagina_url: window.location.href.slice(0, 1000),
      ...getUtmParams(),
    };
    const specific = isVet
      ? { clinic: fields.clinica.trim(), cidade: fields.cidade.trim(), consultas_por_dia: fields.consultas ? Number(fields.consultas) : null }
      : { nome_pet: fields.nomePet.trim(), especie: fields.especie, bairro: fields.bairro.trim() };
    const { error: insertError } = await supabase.from('utopet_leads').insert([{ ...common, ...specific }]);
    setLoading(false);
    if (insertError) {
      submittingRef.current = false;
      setError('Não foi possível enviar agora. Tente novamente em instantes.');
      return;
    }
    window.fbq?.('track', 'Lead', { content_name: kind }, { eventID: crypto.randomUUID() });
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    window.setTimeout(() => {
      setSubmitted(false);
      setFields(EMPTY);
      setFieldErrors({});
      setError('');
      submittingRef.current = false;
    }, 300);
  };

  if (!isOpen) return null;

  const field = (key: keyof Fields, label: string, input: JSX.Element) => (
    <div className="form-field">
      <label htmlFor={key}>{label}</label>
      {input}
      {fieldErrors[key] && <span className="form-erro" id={`${key}-erro`}>{fieldErrors[key]}</span>}
    </div>
  );
  const textInput = (key: keyof Fields, placeholder: string, type = 'text', extra: Record<string, string> = {}) => (
    <input id={key} type={type} placeholder={placeholder} value={fields[key]} onChange={update(key)} aria-invalid={Boolean(fieldErrors[key])} aria-describedby={fieldErrors[key] ? `${key}-erro` : undefined} {...extra} />
  );

  return (
    <div className="modal-overlay" onClick={handleClose} role="presentation">
      <div className="modal-content" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" onClick={handleClose} aria-label="Fechar"><X size={22} /></button>
        {!submitted ? (
          <>
            <div className="modal-header">
              <span className="logo"><LogoSvg />topet</span>
              <h3 id="modal-title" style={{ fontSize: '28px', marginTop: '18px' }}>{isVet ? 'Agende sua demonstração' : 'Garanta sua vaga'}</h3>
              <p style={{ color: 'var(--texto-2)', fontSize: '15px', marginTop: '8px' }}>{isVet ? 'Preencha os dados abaixo e nossa equipe entra em contato.' : 'Preencha seus dados e nossa equipe confirma os próximos passos.'}</p>
            </div>
            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              {field('nome', 'Nome completo', textInput('nome', 'Seu nome completo', 'text', { autoComplete: 'name' }))}
              {field('whatsapp', 'WhatsApp', textInput('whatsapp', '(00) 00000-0000', 'tel', { autoComplete: 'tel', inputMode: 'tel' }))}
              {field('email', 'E-mail', textInput('email', 'voce@email.com', 'email', { autoComplete: 'email' }))}
              {isVet ? (
                <>
                  {field('clinica', 'Nome da clínica', textInput('clinica', 'Nome da sua clínica'))}
                  {field('cidade', 'Cidade', textInput('cidade', 'Cidade da clínica', 'text', { autoComplete: 'address-level2' }))}
                  {field('consultas', 'Consultas por dia (opcional)', textInput('consultas', 'Ex.: 15', 'text', { inputMode: 'numeric' }))}
                </>
              ) : (
                <>
                  {field('nomePet', 'Nome do pet', textInput('nomePet', 'Nome do seu pet'))}
                  {field('especie', 'Espécie', (
                    <select id="especie" value={fields.especie} onChange={update('especie')} aria-invalid={Boolean(fieldErrors.especie)}>
                      <option value="" disabled>Selecione</option>
                      <option value="cao">Cão</option>
                      <option value="gato">Gato</option>
                    </select>
                  ))}
                  {field('bairro', 'Bairro', textInput('bairro', 'Seu bairro'))}
                </>
              )}
              {error && <p role="alert" className="form-erro">{error}</p>}
              <button type="submit" className="btn btn-roxo" style={{ width: '100%' }} disabled={loading}>{loading ? 'Enviando...' : isVet ? 'Agendar demonstração' : 'Garantir minha vaga'}</button>
            </form>
          </>
        ) : (
          <div className="modal-success" role="status"><div className="modal-success-icon"><Check size={48} color="var(--roxo)" /></div><h3 style={{ fontSize: '25px', marginTop: '16px' }}>Recebemos seu contato!</h3><p style={{ color: 'var(--texto-2)', fontSize: '15px', marginTop: '10px' }}>Em breve a equipe Utopet fala com você.</p><button className="btn btn-roxo" style={{ marginTop: '24px' }} onClick={handleClose}>Fechar</button></div>
        )}
      </div>
    </div>
  );
}
