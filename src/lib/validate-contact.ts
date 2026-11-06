// Shared by the form (instant feedback) and the API (the real check).
export type ContactInput = { name: string; email: string; subject?: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: Partial<ContactInput>): ContactErrors {
  const e: ContactErrors = {};
  const name = (v.name ?? '').trim(), email = (v.email ?? '').trim(), subject = (v.subject ?? '').trim(), message = (v.message ?? '').trim();
  if (name.length < 2) e.name = 'Please enter your name.';
  else if (name.length > 100) e.name = 'Name is too long.';
  if (!email) e.email = 'Please enter your email.';
  else if (!EMAIL.test(email) || email.length > 200) e.email = 'Please enter a valid email address.';
  if (subject.length > 150) e.subject = 'Subject is too long (150 characters max).';
  if (message.length < 10) e.message = 'Please write at least 10 characters.';
  else if (message.length > 5000) e.message = 'Message is too long (5,000 characters max).';
  return e;
}
