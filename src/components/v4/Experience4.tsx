'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { gsap, SplitWords, useGsap } from '../ui/motion';
import { TechIcon } from '@/lib/icons';
import { experience4 } from '@/data/v4';

type Stat = { value: number; suffix: string; label: string; note: string };

function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState(0);
  useEffect(() => { if (!inView) return; const c = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) }); return () => c.stop(); }, [inView, to]);
  return <span ref={ref}>{n.toLocaleString('en-US')}{suffix}</span>;
}

function Entry({ e }: { e: (typeof experience4)[number] }) {
  const [more, setMore] = useState(false);
  return (
    <li data-exp className="relative pl-12 sm:pl-16">
      <span aria-hidden className="absolute left-[9px] top-8 h-3.5 w-3.5 rounded-full border-[3px] border-n-fg bg-n-accent ring-1 ring-n-accent sm:left-[17px]" />
      <div className="rounded-[1.75rem] border border-n-line bg-n-card p-6 shadow-[0_12px_40px_-24px_rgba(21,25,35,.30)] sm:p-7">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="flex items-start gap-4 lg:col-span-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-n-ink font-display text-xl font-bold text-n-accentdark" aria-hidden>{e.mark}</span>
            <div><h3 className="text-xl font-semibold">{e.company}</h3><p className="text-sm text-n-muted">{e.parent}</p><p className="mt-1 text-xs text-n-muted">{e.where}</p></div>
          </div>
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2"><p className="font-semibold">{e.role}</p><p className="font-mono text-xs text-n-muted">{e.when}</p></div>
            {'summary' in e && <p className="mt-3 text-[15px] leading-relaxed text-n-muted">{e.summary}</p>}
            {'stats' in e && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(e.stats as Stat[]).map((st) => (
                  <div key={st.label} className="rounded-2xl bg-n-ink p-4 text-n-fg">
                    <p className="font-display text-3xl font-semibold tracking-tight text-n-accentdark"><Count to={st.value} suffix={st.suffix} /></p>
                    <p className="mt-1 text-sm font-semibold">{st.label}</p>
                    <p className="text-xs text-n-fgmuted">{st.note}</p>
                  </div>
                ))}
              </div>
            )}
            {'listTitle' in e && <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-n-muted">{e.listTitle}</p>}
            <ul className="mt-3 grid gap-1.5 text-[15px] text-n-ink">
              {e.highlights.map((h) => <li key={h} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-n-accent" />{h}</li>)}
              <AnimatePresence initial={false}>{more && e.more.map((h) => <motion.li key={h} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex gap-2.5 overflow-hidden"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-n-accent" />{h}</motion.li>)}</AnimatePresence>
            </ul>
            {e.more.length > 0 && <button onClick={() => setMore(!more)} aria-expanded={more} className="mt-2 inline-flex min-h-[36px] items-center gap-1 text-sm font-medium text-n-accent hover:underline">{more ? <Minus size={14} /> : <Plus size={14} />}{more ? 'Show less' : `${e.more.length} more`}</button>}
          </div>
          <div className="lg:col-span-3"><p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-n-muted">Technology</p><ul className="flex flex-wrap content-start gap-1.5" aria-label="Technology">{e.stack.map((s) => <li key={s} className="inline-flex items-center gap-1.5 rounded-full border border-n-ink/10 bg-white px-2.5 py-1 text-xs font-medium"><TechIcon name={s} size={12} />{s}</li>)}</ul></div>
        </div>
      </div>
    </li>
  );
}

export default function Experience4() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, () => {
    gsap.from(root.current!.querySelectorAll('h2 [data-word]'), { yPercent: 110, duration: 1, stagger: 0.05, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } });
    gsap.fromTo('[data-tline]', { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top', ease: 'none', scrollTrigger: { trigger: '[data-tlist]', start: 'top 70%', end: 'bottom 60%', scrub: 0.5 } });
    gsap.from('[data-exp]', { x: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'expo.out', scrollTrigger: { trigger: '[data-tlist]', start: 'top 78%', once: true } });
  });
  return (
    <section id="experience" ref={root} aria-labelledby="exp-title" className="bg-n-bg py-20 text-n-ink sm:py-24">
      <div className="wrap">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-n-accent">04 · Experience</p>
        <h2 id="exp-title" className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"><SplitWords text="Where I've contributed" /></h2>
        <ol data-tlist className="relative mt-12 grid gap-6">
          <span aria-hidden className="absolute bottom-4 left-[15px] top-4 w-px bg-n-ink/10 sm:left-[23px]" />
          <span aria-hidden data-tline className="absolute bottom-4 left-[15px] top-4 w-px bg-n-accent sm:left-[23px]" />
          {experience4.map((e) => <Entry key={e.id} e={e} />)}
        </ol>
      </div>
    </section>
  );
}
