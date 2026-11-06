import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import nodemailer from 'nodemailer';
import { limit } from '@/lib/ai/rate-limit';
import { validateContact, type ContactInput } from '@/lib/validate-contact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Settings (environment variables, never in code). Either:
//   WEB3FORMS_ACCESS_KEY — Web3Forms delivers the message to the inbox the key was created for
// or:
//   SMTP_HOST, SMTP_PORT (default 465), SMTP_USER, SMTP_PASS  — e.g. Gmail with an app password
//   CONTACT_TO (default: Hitesh's email), SMTP_FROM (default: SMTP_USER)
const TO = process.env.CONTACT_TO || 'hiteshahuja633@gmail.com';
const w3f = () => process.env.WEB3FORMS_ACCESS_KEY;
const smtp = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
const configured = () => Boolean(w3f() || smtp());
const GENERIC = 'Your message could not be sent right now. Please try again in a moment.';
const recent = new Map<string, number>(); // duplicate guard: same content within 10 minutes

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

export async function POST(req: Request) {
  if (!configured()) {
    console.error('contact: no WEB3FORMS_ACCESS_KEY or SMTP settings');
    return NextResponse.json({ error: GENERIC }, { status: 503 });
  }
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'anon';
  if (!limit(`contact:${ip}`, 5, 60 * 60_000).ok) return NextResponse.json({ error: 'Too many messages in a short time. Please try again later.' }, { status: 429 });

  let body: Partial<ContactInput> & { website?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot: bots fill hidden fields

  const errors = validateContact(body);
  if (Object.keys(errors).length) return NextResponse.json({ error: 'Please fix the highlighted fields.', fields: errors }, { status: 422 });

  const name = oneLine(body.name!), email = oneLine(body.email!), subject = oneLine(body.subject ?? ''), message = body.message!.trim();
  const key = createHash('sha256').update(`${email}|${subject}|${message}`).digest('hex');
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > 10 * 60_000) recent.delete(k);
  if (recent.has(key)) return NextResponse.json({ ok: true, duplicate: true });

  try {
    if (w3f()) {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: w3f(),
          subject: `Portfolio: ${subject || `Message from ${name}`}`.slice(0, 180),
          from_name: 'Hitesh Ahuja Portfolio',
          replyto: email,
          name, email, 'Subject (from form)': subject || '(none)', message,
        }),
        signal: AbortSignal.timeout(20_000),
      });
      const j = (await r.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!r.ok || j.success !== true) throw new Error(`web3forms ${r.status} ${String(j.message ?? '').slice(0, 200)}`);
      recent.set(key, now);
      return NextResponse.json({ ok: true });
    }
    const port = Number(process.env.SMTP_PORT || 465);
    const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: port === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
    await transport.sendMail({
      from: `"Portfolio contact" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: TO,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `Portfolio: ${subject || `Message from ${name}`}`.slice(0, 180),
      text: `From: ${name} <${email}>\nSubject: ${subject || '(none)'}\n\n${message}`,
      html: `<p><b>From:</b> ${esc(name)} &lt;${esc(email)}&gt;<br><b>Subject:</b> ${esc(subject || '(none)')}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
    recent.set(key, now);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('contact mail failed', (e as Error).message);
    return NextResponse.json({ error: GENERIC }, { status: 502 });
  }
}

// Web3Forms only accepts submissions from a browser on its free plan, so the page sends
// directly. Its access key is designed to be public (it can only deliver to Hitesh's inbox);
// it is served from the environment so it never lives in the repository.
export function GET() {
  return NextResponse.json({ configured: configured(), web3forms: w3f() || null });
}
