'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Linkedin, Github, Download, ArrowUpRight, Send, Loader2, CheckCircle2, AlertCircle, MapPin, ArrowUp, Copy, Check } from 'lucide-react';
import { SplitWords } from '../ui/motion';
import { validateContact, type ContactErrors } from '@/lib/validate-contact';
import { v4 } from '@/data/v4';

type Status = 'idle' | 'sending' | 'sent' | 'error';
const empty = { name: '', email: '', subject: '', message: '' };

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-n-ink">{label}{optional && <span className="text-xs font-normal text-n-muted">Optional</span>}</label>
      <div className="mt-1.5">{children}</div>
      <AnimatePresence>{error && <motion.p id={`${id}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-[#C4320A]">{error}</motion.p>}</AnimatePresence>
    </div>
  );
}

const input = (bad?: string) => `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-n-ink outline-none transition-[border-color,box-shadow] placeholder:text-[#98A2B3] hover:border-[#C9CED8] focus:border-n-accent focus:shadow-[0_0_0_4px_rgba(74,95,240,.15)] ${bad ? 'border-[#F04438]' : 'border-n-line'}`;

export default function Contact5() {
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const sending = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => { fetch('/api/contact').then((r) => r.json()).then((j) => setConfigured(Boolean(j.configured))).catch(() => setConfigured(null)); }, []);

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (sending.current) return; // no double submits
    const errs = validateContact(v);
    setErrors(errs);
    if (Object.keys(errs).length) { document.getElementById(`c-${Object.keys(errs)[0]}`)?.focus(); return; }
    sending.current = true; setStatus('sending'); setMsg('');
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...v, website: honeypot.current?.value ?? '' }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) { if (j.fields) setErrors(j.fields); throw new Error(j.error || 'Your message could not be sent. Please try again.'); }
      setStatus('sent'); setV(empty);
    } catch (err) {
      setStatus('error'); setMsg((err as Error).message);
    } finally { sending.current = false; }
  }

  const links = [
    { icon: Mail, label: 'Email', value: v4.email, href: `mailto:${v4.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/hiteshahuja07', href: v4.linkedin, ext: true },
    { icon: Github, label: 'GitHub', value: 'github.com/HiTesHweb07', href: v4.github, ext: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-n-bg text-n-ink">
      <div className="wrap grid gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-n-accent">08 · Contact</p>
          <h2 id="contact-title" className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"><SplitWords text="Let's Connect" /></h2>
          <p className="mt-5 max-w-md leading-relaxed text-n-muted">I&apos;m open to exciting opportunities, collaborations and interesting projects. If you&apos;d like to discuss an opportunity or just connect, feel free to reach out.</p>
          <ul className="mt-8 grid gap-3">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} {...(l.ext ? { target: '_blank', rel: 'noreferrer' } : {})} className="group flex items-center gap-4 rounded-2xl border border-n-line bg-white p-4 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-n-accent/40 hover:shadow-[0_12px_30px_-18px_rgba(21,25,35,.35)]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-n-accentsoft text-n-accent transition-colors group-hover:bg-n-accent group-hover:text-white"><l.icon size={20} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-xs text-n-muted">{l.label}</span><span className="block truncate font-medium">{l.value}</span></span>
                  <ArrowUpRight size={18} className="shrink-0 text-n-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-n-accent" />
                  {l.ext && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={v4.resume} download className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-n-accent px-6 font-medium text-white shadow-[0_10px_30px_-12px_rgba(74,95,240,.7)] transition-colors hover:bg-n-accenthover"><Download size={17} />Download resume</motion.a>
            <button onClick={() => { navigator.clipboard?.writeText(v4.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }).catch(() => {}); }} className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-n-line bg-white px-5 text-sm font-medium transition-colors hover:border-n-ink/30" aria-live="polite">
              {copied ? <><Check size={16} className="text-n-accent" />Copied</> : <><Copy size={16} />Copy email</>}
            </button>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-n-muted"><MapPin size={15} />{v4.location}</p>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[1.75rem] border border-n-line bg-white p-6 shadow-[0_24px_60px_-36px_rgba(21,25,35,.35)] sm:p-9">
            <h3 className="text-2xl font-semibold tracking-tight">Send me a message</h3>
            <p className="mt-1 text-sm text-n-muted">I usually reply by email.</p>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 rounded-2xl bg-[#ECFDF3] p-6 text-[#05603A]" role="status">
                  <p className="flex items-center gap-2 font-semibold"><CheckCircle2 size={20} />Message sent</p>
                  <p className="mt-2 text-sm">Thanks for reaching out. I&apos;ll get back to you by email.</p>
                  <button onClick={() => setStatus('idle')} className="mt-4 text-sm font-medium underline underline-offset-4">Send another message</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-7 grid gap-5" aria-busy={status === 'sending'}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="c-name" label="Your name" error={errors.name}><input id="c-name" autoComplete="name" value={v.name} onChange={set('name')} placeholder="Jane Doe" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-name-err' : undefined} className={input(errors.name)} /></Field>
                    <Field id="c-email" label="Your email" error={errors.email}><input id="c-email" type="email" autoComplete="email" value={v.email} onChange={set('email')} placeholder="jane@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'c-email-err' : undefined} className={input(errors.email)} /></Field>
                  </div>
                  <Field id="c-subject" label="Subject" optional error={errors.subject}><input id="c-subject" value={v.subject} onChange={set('subject')} placeholder="What is this about?" aria-invalid={!!errors.subject} className={input(errors.subject)} /></Field>
                  <Field id="c-message" label="Your message" error={errors.message}><textarea id="c-message" rows={5} value={v.message} onChange={set('message')} placeholder="Tell me about the role, project or idea…" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'c-message-err' : undefined} className={`${input(errors.message)} resize-y`} /></Field>
                  {/* hidden from people, bots fill it */}
                  <input ref={honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />
                  <AnimatePresence>
                    {status === 'error' && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="flex gap-2 rounded-xl bg-[#FEF3F2] p-3 text-sm text-[#B42318]"><AlertCircle size={17} className="mt-0.5 shrink-0" />{msg}</motion.p>}
                  </AnimatePresence>
                  <div className="flex flex-wrap items-center gap-4">
                    <motion.button whileHover={status === 'sending' ? undefined : { y: -2 }} whileTap={{ scale: 0.98 }} type="submit" disabled={status === 'sending'}
                      className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-n-ink px-7 font-medium text-white transition-colors hover:bg-n-accent disabled:cursor-wait disabled:opacity-70">
                      {status === 'sending' ? <><Loader2 size={17} className="animate-spin" />Sending…</> : <><Send size={16} />Send message</>}
                    </motion.button>
                    {configured === false && status !== 'error' && <p className="text-xs text-n-muted">The form is not connected to email yet. You can email me directly at <a className="font-medium text-n-accent underline underline-offset-2" href={`mailto:${v4.email}`}>{v4.email}</a>.</p>}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <footer className="bg-n-ink text-n-fgmuted">
        <div className="wrap flex flex-col items-start justify-between gap-3 py-6 text-sm sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {v4.name} · I build products and the systems behind them.</p>
          <a href="#top" className="inline-flex min-h-[44px] items-center gap-1.5 hover:text-n-fg">Back to top <ArrowUp size={14} /></a>
        </div>
      </footer>
    </section>
  );
}
