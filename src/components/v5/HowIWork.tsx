'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Face } from '../avatar/Portrait';
import { gsap, SplitWords, useGsap } from '../ui/motion';
import { howIWork } from '@/data/v4';

const ease = [0.22, 1, 0.36, 1] as const;

export default function HowIWork() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-q]') ?? []);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement)); }), { rootMargin: '-45% 0px -50% 0px' });
    els.forEach((el) => io.observe(el)); return () => io.disconnect();
  }, []);
  useGsap(root, () => {
    gsap.from(root.current!.querySelectorAll('h2 [data-word]'), { yPercent: 110, duration: 1, stagger: 0.04, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } });
    gsap.from('[data-q] > div', { y: 30, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '[data-qs]', start: 'top 80%', once: true } });
  });
  const q = howIWork.qualities[active];

  return (
    <section id="how" ref={root} aria-labelledby="how-title" className="bg-n-bg py-20 text-n-ink sm:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-n-accent">06 · How I work</p>
            <h2 id="how-title" className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl"><SplitWords text={howIWork.title} /></h2>
            <p className="mt-5 max-w-md leading-relaxed text-n-muted">{howIWork.intro}</p>

            <div className="relative mt-10 hidden overflow-hidden rounded-[1.75rem] bg-n-ink p-7 text-n-fg lg:block">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(90%_80%_at_100%_0%,#26304A,transparent_60%)]" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="relative h-[4.5rem] overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span key={q.n} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.5, ease }} className="block font-display text-7xl font-semibold leading-none text-n-accentdark">{q.n}</motion.span>
                  </AnimatePresence>
                </div>
                <Face size={72} className="ring-2 ring-n-accentdark/40" />
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={q.n} className="relative" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease }}>
                  <p className="mt-4 text-xl font-semibold">{q.name}</p>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-n-fgmuted">In practice</p>
                  <ul className="mt-2 grid gap-2 text-sm text-n-fg/90">{q.examples.map((e) => <li key={e} className="flex gap-2"><ArrowUpRight size={15} className="mt-0.5 shrink-0 text-n-accentdark" />{e}</li>)}</ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <ol data-qs className="lg:col-span-7">
          {howIWork.qualities.map((x, i) => (
            <li key={x.n} data-q className={`group border-t border-n-line py-7 transition-opacity duration-500 last:border-b lg:py-9 ${i === active ? 'lg:opacity-100' : 'lg:opacity-50 hover:lg:opacity-90'}`}>
              <div className="grid gap-3 sm:grid-cols-[4.5rem_1fr]">
                <span className={`font-mono text-sm transition-colors ${i === active ? 'text-n-accent' : 'text-n-muted'}`}>{x.n}</span>
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-1 sm:text-[2.6rem] sm:leading-[1.05]">{x.name}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-n-muted">{x.line}</p>
                  <ul className="mt-4 grid gap-1.5 text-sm text-n-ink/85 lg:hidden">{x.examples.map((e) => <li key={e} className="flex gap-2"><ArrowUpRight size={15} className="mt-0.5 shrink-0 text-n-accent" />{e}</li>)}</ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
