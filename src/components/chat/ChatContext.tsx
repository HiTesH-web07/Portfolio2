'use client';
// One conversation shared by the Ask Hitesh section and the slide-in panel.
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { profile } from '@/data/content';
import { projectsIn, tidy } from '@/lib/ai/projects';

export type Msg = { id: number; role: 'user' | 'assistant'; content: string; projects?: string[]; error?: boolean };

export const WELCOME: Msg = {
  id: 0, role: 'assistant',
  content: `Hi! I'm an AI assistant that answers from ${profile.firstName}'s resume and projects. Ask me about his experience, the things he has built or how he works. If I don't know something, I'll say so.`,
};

type Ctx = { msgs: Msg[]; busy: boolean; send: (q: string) => Promise<void>; reset: () => void; panelOpen: boolean; openPanel: () => void; closePanel: () => void };
const ChatCtx = createContext<Ctx | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [busy, setBusy] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const nextId = useRef(1);
  const msgsRef = useRef(msgs); msgsRef.current = msgs;

  const send = useCallback(async (q: string) => {
    const question = q.trim().slice(0, 600);
    if (!question) return;
    const user: Msg = { id: nextId.current++, role: 'user', content: question };
    const history = [...msgsRef.current.filter((m) => m.id !== 0 && !m.error), user];
    setMsgs((m) => [...m, user]);
    setBusy(true);
    const id = nextId.current++;
    try {
      const r = await fetch('/api/chat?stream=1', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }) });
      if (!r.ok || !r.body) { const j = await r.json().catch(() => ({})); throw new Error(j.error || 'The assistant could not answer right now.'); }
      const reader = r.body.getReader(); const dec = new TextDecoder(); let text = '';
      setMsgs((m) => [...m, { id, role: 'assistant', content: '' }]);
      setBusy(false);
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += dec.decode(value, { stream: true });
        const shown = tidy(text);
        setMsgs((m) => m.map((x) => (x.id === id ? { ...x, content: shown } : x)));
      }
      if (!text.trim()) throw new Error('I could not find a good answer to that. Try asking about my projects or experience.');
      const final = tidy(text);
      setMsgs((m) => m.map((x) => (x.id === id ? { ...x, content: final, projects: projectsIn(final, question) } : x)));
    } catch (e) {
      setMsgs((m) => [...m.filter((x) => !(x.id === id && !x.content)), { id: nextId.current++, role: 'assistant', content: `${(e as Error).message} You can always email ${profile.email}.`, error: true }]);
    } finally {
      setBusy(false);
    }
  }, []);

  const value = useMemo<Ctx>(() => ({
    msgs, busy, send, reset: () => setMsgs([WELCOME]),
    panelOpen, openPanel: () => setPanelOpen(true), closePanel: () => setPanelOpen(false),
  }), [msgs, busy, send, panelOpen]);
  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>;
}

export function useChat() {
  const c = useContext(ChatCtx);
  if (!c) throw new Error('useChat must be used inside ChatProvider');
  return c;
}
