'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { gsap, SplitWords, useGsap } from '../ui/motion';
import { TechIcon } from '@/lib/icons';
import { experience4 } from '@/data/v4';

function Entry({ e }: { e: (typeof experience4)[number] }) {
  const [more, setMore] = useState(false);
  return (
    <li data-exp className="relative pl-12 sm:pl-16">
      <span aria-hidden className="absolute left-[9px] top-8 h-3.5 w-3.5 rounded-full border-[3px] border-[#F4F0E6] bg-[#356A18] ring-1 ring-[#356A18] sm:left-[17px]" />
      <div className="rounded-[1.75rem] border border-[#18201B]/[0.08] bg-[#FBF9F4] p-6 shadow-[0_12px_40px_-24px_rgba(15,29,22,.35)] sm:p-7">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="flex items-start gap-4 lg:col-span-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#0F1D16] font-display text-xl font-bold text-[#A6E35A]" aria-hidden>{e.mark}</span>
            <div><h3 className="text-xl font-semibold">{e.company}</h3><p className="text-sm text-[#5B6259]">{e.parent}</p><p className="mt-1 text-xs text-[#5B6259]">{e.where}</p></div>
          </div>
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2"><p className="font-semibold">{e.role}</p><p className="font-mono text-xs text-[#5B6259]">{e.when}</p></div>
            <ul className="mt-3 grid gap-1.5 text-[15px] text-[#2C342E]">
              {e.highlights.map((h) => <li key={h} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6E35A]" />{h}</li>)}
              <AnimatePresence initial={false}>{more && e.more.map((h) => <motion.li key={h} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex gap-2.5 overflow-hidden"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6E35A]" />{h}</motion.li>)}</AnimatePresence>
            </ul>
            <button onClick={() => setMore(!more)} aria-expanded={more} className="mt-2 inline-flex min-h-[36px] items-center gap-1 text-sm font-medium text-[#356A18] hover:underline">{more ? <Minus size={14} /> : <Plus size={14} />}{more ? 'Show less' : `${e.more.length} more`}</button>
          </div>
          <ul className="flex flex-wrap content-start gap-1.5 lg:col-span-3" aria-label="Stack">{e.stack.map((s) => <li key={s} className="inline-flex items-center gap-1.5 rounded-full border border-[#18201B]/10 bg-white px-2.5 py-1 text-xs font-medium"><TechIcon name={s} size={12} />{s}</li>)}</ul>
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
    <section id="experience" ref={root} aria-labelledby="exp-title" className="bg-[#F4F0E6] py-20 text-[#18201B] sm:py-24">
      <div className="wrap">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#356A18]">04 · Experience</p>
        <h2 id="exp-title" className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"><SplitWords text="Where I've contributed" /></h2>
        <ol data-tlist className="relative mt-12 grid gap-6">
          <span aria-hidden className="absolute bottom-4 left-[15px] top-4 w-px bg-[#18201B]/10 sm:left-[23px]" />
          <span aria-hidden data-tline className="absolute bottom-4 left-[15px] top-4 w-px bg-[#356A18] sm:left-[23px]" />
          {experience4.map((e) => <Entry key={e.id} e={e} />)}
        </ol>
      </div>
    </section>
  );
}
