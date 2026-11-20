import { FormEvent, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import { LogoSvg } from './Icons';
import { supabase } from '../lib/supabase';
import { getUtmParams } from '../lib/utm';

const STATES: Array<[string, string]> = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'], ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['DC', 'District of Columbia'], ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawaii'], ['ID', 'Idaho'], ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'], ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'], ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'], ['MS', 'Mississippi'], ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'], ['NH', 'New Hampshire'], ['NJ', 'New Jersey'], ['NM', 'New Mexico'], ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'], ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'], ['SC', 'South Carolina'], ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'], ['VT', 'Vermont'], ['VA', 'Virginia'], ['WA', 'Washington'], ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
];
const PETS: Array<[string, string]> = [['under_10', 'Under 10'], ['10_20', '10-20'], ['21_40', '21-40'], ['over_40', 'Over 40']];
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Fields = { name: string; clinic: string; email: string; phone: string; city: string; state: string; pets: string };
const EMPTY: Fields = { name: '', clinic: '', email: '', phone: '', city: '', state: '', pets: '' };

function phoneDigits(value: string) {
  const digits = value.replace(/\D/g, '');
  return digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
}

function maskPhone(value: string) {
  const d = phoneDigits(value).slice(0, 10);
  if (d.length <= 3) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) errors.name = 'Please enter your full name.';
  if (!f.clinic.trim()) errors.clinic = 'Please enter your clinic name.';
  if (!EMAIL_RE.test(f.email.trim())) errors.email = 'Please enter a valid email.';
  if (!/^[2-9]\d{9}$/.test(phoneDigits(f.phone))) errors.phone = 'Please enter a valid US phone number.';
  if (!f.city.trim()) errors.city = 'Please enter your city.';
  if (!STATES.some(([code]) => code === f.state)) errors.state = 'Please select your state.';
  return errors;
}

export function LeadModalEn({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const submittingRef = useRef(false);

  const update = (key: keyof Fields) => (event: { target: { value: string } }) => {
    const value = key === 'phone' ? maskPhone(event.target.value) : event.target.value;
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
      origem: 'veterinario_us',
      name: fields.name.trim(),
      clinic: fields.clinic.trim(),
      email: fields.email.trim().toLowerCase(),
      contact: phoneDigits(fields.phone),
      cidade: fields.city.trim(),
      uf: fields.state,
      pets_por_dia: fields.pets || null,
      pagina_url: window.location.href.slice(0, 1000),
      ...getUtmParams(),
    }]);
    setLoading(false);
    if (insertError) {
      submittingRef.current = false;
      setError('We couldn’t send your request. Please try again in a moment.');
      return;
    }
    window.fbq?.('track', 'Lead', { content_name: 'veterinarian_us' }, { eventID: crypto.randomUUID() });
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

  const aria = (key: keyof Fields) => ({ 'aria-invalid': Boolean(fieldErrors[key]), 'aria-describedby': fieldErrors[key] ? `${key}-error` : undefined });
  const field = (key: keyof Fields, label: string, input: JSX.Element) => (
    <div className="form-field">
      <label htmlFor={key}>{label}</label>
      {input}
      {fieldErrors[key] && <span className="form-erro" id={`${key}-error`}>{fieldErrors[key]}</span>}
    </div>
  );
  const text = (key: keyof Fields, placeholder: string, type = 'text', extra: Record<string, string> = {}) => (
    <input id={key} type={type} placeholder={placeholder} value={fields[key]} onChange={update(key)} {...aria(key)} {...extra} />
  );
  const select = (key: keyof Fields, options: Array<[string, string]>) => (
    <select id={key} value={fields[key]} onChange={update(key)} {...aria(key)}>
      <option value="" disabled>Select</option>
      {options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
    </select>
  );

  return (
    <div className="modal-overlay" onClick={handleClose} role="presentation">
      <div className="modal-content" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" onClick={handleClose} aria-label="Close"><X size={22} /></button>
        {!submitted ? (
          <>
            <div className="modal-header">
              <span className="logo"><LogoSvg />topet</span>
              <h3 id="modal-title" style={{ fontSize: '28px', marginTop: '18px' }}>Book a demo</h3>
            </div>
            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              {field('name', 'Full name*', text('name', 'Your full name', 'text', { autoComplete: 'name' }))}
              {field('clinic', 'Clinic name*', text('clinic', 'Your clinic', 'text', { autoComplete: 'organization' }))}
              {field('email', 'Work email*', text('email', 'you@clinic.com', 'email', { autoComplete: 'email' }))}
              {field('phone', 'Phone*', text('phone', '(555) 555-5555', 'tel', { autoComplete: 'tel-national', inputMode: 'tel' }))}
              {field('city', 'City*', text('city', 'Your city', 'text', { autoComplete: 'address-level2' }))}
              {field('state', 'State*', select('state', STATES))}
              {field('pets', 'Pets seen per day', select('pets', PETS))}
              {error && <p role="alert" className="form-erro">{error}</p>}
              <button type="submit" className="btn btn-roxo" style={{ width: '100%' }} disabled={loading}>{loading ? 'Sending...' : 'Book my demo'}</button>
              <p className="form-consent">By submitting, you agree to be contacted by Utopet by email and phone about your demo.</p>
            </form>
          </>
        ) : (
          <div className="modal-success" role="status"><div className="modal-success-icon"><Check size={48} color="var(--roxo)" /></div><h3 style={{ fontSize: '25px', marginTop: '16px' }}>Thanks! Our team will reach out within one business day.</h3><button className="btn btn-roxo" style={{ marginTop: '24px' }} onClick={handleClose}>Close</button></div>
        )}
      </div>
    </div>
  );
}
