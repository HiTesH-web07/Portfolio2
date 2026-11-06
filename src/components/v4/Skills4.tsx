'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, FlaskConical } from 'lucide-react';
import { gsap, SplitWords, useGsap } from '../ui/motion';
import { TechIcon } from '@/lib/icons';
import { skills4, exploring4, certs4 } from '@/data/v4';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Skills4() {
  const root = useRef<HTMLElement>(null);
  const [tab, setTab] = useState<'skills' | 'certs'>('skills');
  useGsap(root, () => {
    gsap.from(root.current!.querySelectorAll('h2 [data-word]'), { yPercent: 110, duration: 1, stagger: 0.05, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } });
  });
  const grid = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
  const card = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };
  return (
    <section id="skills" ref={root} aria-labelledby="skills-title" className="bg-n-card py-20 text-n-ink sm:py-24">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-n-accent">05 · Skills &amp; certifications</p>
            <h2 id="skills-title" className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"><SplitWords text="My Technical Toolkit" /></h2>
            <p className="mt-3 text-n-muted">Technologies I work with, and what I am currently exploring.</p>
          </div>
          <div role="tablist" aria-label="Skills or certifications" className="flex rounded-full border border-n-ink/10 bg-n-card p-1">
            {([['skills', 'Skills'], ['certs', 'Certifications']] as const).map(([k, l]) => (
              <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`relative min-h-[40px] rounded-full px-5 text-sm font-medium ${tab === k ? 'text-n-fg' : 'text-n-muted'}`}>
                {tab === k && <motion.span layoutId="skilltab" className="absolute inset-0 rounded-full bg-n-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}<span className="relative">{l}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tab === 'skills' ? (
            <motion.div key="skills" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" variants={grid} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
                {skills4.map((g) => (
                  <motion.li key={g.group} variants={card} className="rounded-[1.5rem] border border-n-line bg-n-bg p-5">
                    <p className="text-sm font-semibold">{g.group}</p>
                    <ul className="mt-4 flex flex-wrap gap-2.5">
                      {g.items.map((s) => (
                        <li key={s} className="group relative">
                          <span tabIndex={0} aria-label={s} className="grid h-11 w-11 place-items-center rounded-xl border border-n-line bg-white transition-transform duration-300 group-hover:-translate-y-1 group-focus-within:-translate-y-1"><TechIcon name={s} size={20} /></span>
                          <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-n-ink px-2 py-1 text-[11px] text-n-fg opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">{s}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs leading-relaxed text-n-muted">{g.items.join(' · ')}</p>
                  </motion.li>
                ))}
                <motion.li variants={card} className="rounded-[1.5rem] border border-dashed border-n-accent/40 bg-n-bg p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-n-accent"><FlaskConical size={15} />Currently exploring</p>
                  <ul className="mt-3 grid gap-2 text-sm">{exploring4.map((x) => <li key={x} className="rounded-xl border border-n-line bg-white px-3 py-2">{x}</li>)}</ul>
                </motion.li>
              </motion.ul>
            </motion.div>
          ) : (
            <motion.ul key="certs" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" variants={grid} initial="hidden" animate="show" exit={{ opacity: 0 }}>
              {certs4.map((c) => (
                <motion.li key={c.name} variants={card} whileHover={{ y: -4 }} className="relative overflow-hidden rounded-[1.5rem] border border-n-line bg-n-bg p-6">
                  <span aria-hidden className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-n-accent/10" />
                  <Award size={24} className="relative text-n-accent" />
                  <p className="relative mt-4 text-lg font-semibold leading-snug">{c.name}</p>
                  <p className="relative mt-1 flex justify-between text-sm text-n-muted"><span>{c.issuer ?? 'Issuer to be added'}</span><span className="font-mono">{c.year ?? ''}</span></p>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
