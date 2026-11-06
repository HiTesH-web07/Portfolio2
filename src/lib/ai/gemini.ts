// Tried in order; the next one is used when a model is out of quota, overloaded or retired.
const MODELS = [process.env.GEMINI_MODEL, 'gemini-3.5-flash-lite', 'gemini-flash-lite-latest', 'gemini-2.5-flash'].filter((m, i, a): m is string => !!m && a.indexOf(m) === i);
const MODEL = MODELS[0];
const genConfig = (model: string, max: number) => ({ temperature: 0.4, maxOutputTokens: max, ...(model.startsWith('gemini-2.5') ? { thinkingConfig: { thinkingBudget: 0 } } : {}) });

export type ChatMsg = { role: 'user' | 'assistant'; content: string };

export class AiError extends Error { constructor(message: string, public status: number) { super(message); } }

export async function askGemini(system: string, messages: ChatMsg[]): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new AiError('The assistant is not configured yet.', 503);
  const body = {
    systemInstruction: { parts: [{ text: system }] },
    contents: messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
    generationConfig: { temperature: 0.4, maxOutputTokens: 400, thinkingConfig: { thinkingBudget: 0 } },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  };
  for (let attempt = 0; attempt < MODELS.length; attempt++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    try {
      const model = MODELS[Math.min(attempt, MODELS.length - 1)];
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key }, body: JSON.stringify({ ...body, generationConfig: genConfig(model, 400) }), signal: ctrl.signal,
      });
      if ((r.status >= 500 || r.status === 429 || r.status === 404) && attempt < MODELS.length - 1) continue;
      if (!r.ok) {
        console.error('gemini error', r.status, (await r.text()).slice(0, 300));
        throw new AiError(r.status === 429 ? 'The assistant is busy right now. Please try again in a minute.' : 'The assistant could not answer right now.', r.status === 429 ? 429 : 502);
      }
      const j = await r.json();
      const text: string = j?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('') ?? '';
      if (!text.trim()) throw new AiError('I could not find a good answer to that. Try asking about my projects or experience.', 422);
      return text;
    } catch (e) {
      if (e instanceof AiError) throw e;
      if (attempt < MODELS.length - 1) continue;
      throw new AiError('The assistant took too long to answer. Please try again.', 504);
    } finally { clearTimeout(timer); }
  }
  throw new AiError('The assistant could not answer right now.', 502);
}

/** Stream an answer as plain text chunks (server-sent events from Gemini, re-emitted as raw text). */
export async function streamGemini(system: string, messages: ChatMsg[]): Promise<ReadableStream<Uint8Array>> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new AiError('The assistant is not configured yet.', 503);
  const body = {
    systemInstruction: { parts: [{ text: system }] },
    contents: messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
  };
  let r: Response | null = null;
  for (const model of MODELS) {
    r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key }, body: JSON.stringify({ ...body, generationConfig: genConfig(model, 450) }), signal: AbortSignal.timeout(25000),
    }).catch(() => null);
    if (r?.ok) break;
    console.error('gemini stream', model, r?.status);
  }
  if (!r || !r.ok || !r.body) {
    const status = r?.status ?? 502;
    console.error('gemini stream error', status);
    throw new AiError(status === 429 ? 'The assistant is busy right now. Please try again in a minute.' : 'The assistant could not answer right now.', status === 429 ? 429 : 502);
  }
  const enc = new TextEncoder(); const dec = new TextDecoder();
  const reader = r.body.getReader(); let buf = '';
  return new ReadableStream<Uint8Array>({
    async pull(ctrl) {
      // keep reading until we have text to hand on, or the stream ends
      for (;;) {
        const { done, value } = await reader.read();
        if (done) { ctrl.close(); return; }
        buf += dec.decode(value, { stream: true }).replace(/\r\n/g, '\n');
        const events = buf.split('\n\n'); buf = events.pop() ?? '';
        let out = '';
        for (const ev of events) {
          const line = ev.split('\n').find((l) => l.startsWith('data:'));
          if (!line) continue;
          try {
            const j = JSON.parse(line.slice(5));
            out += j?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('') ?? '';
          } catch { /* ignore partial frames */ }
        }
        if (out) { ctrl.enqueue(enc.encode(out.replace(/\+?91[\s-]?\d{10}|\b\d{10}\b/g, '[private]'))); return; }
      }
    },
    cancel() { reader.cancel(); },
  });
}
