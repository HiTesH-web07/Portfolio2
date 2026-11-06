'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Clock, Plus, Minus, FileText } from 'lucide-react';
import { CaseStudy } from '../Projects';
import { gsap, SplitWords, useGsap } from '../ui/motion';
import { TechIcon } from '@/lib/icons';
import { work, type WorkItem } from '@/data/v4';
import { projects, type Project } from '@/data/content';

const ease = [0.22, 1, 0.36, 1] as const;

function Browser({ w }: { w: WorkItem }) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 18 });
  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
      className="overflow-hidden rounded-[1.25rem] border border-black/10 bg-[#1A1F1C] shadow-[0_30px_60px_-25px_rgba(15,29,22,.45)]">
      <div className="flex items-center gap-1.5 bg-[#222824] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5735E]" /><span className="h-2.5 w-2.5 rounded-full bg-[#E3B341]" /><span className="h-2.5 w-2.5 rounded-full bg-[#7BC46C]" />
        {w.url && <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center font-mono text-[11px] text-white/55">{w.url}</span>}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F0E6]">
        {w.image
          ? <Image src={w.image} alt={`Screenshot of ${w.name}`} fill sizes="(min-width: 1024px) 680px, 100vw" className="object-cover object-top" />
          : <div className="absolute inset-0 flex flex-col justify-between bg-[radial-gradient(120%_90%_at_80%_10%,#1F3B29,#0F1D16)] p-8 text-[#F4F0E6]">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A6E35A]">{w.badge}</span>
              <span className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{w.name}</span>
              <span className="flex items-center gap-1.5 text-xs text-[#F4F0E6]/60"><Clock size={12} />{w.note}</span>
            </div>}
      </div>
    </motion.div>
  );
}

function Details({ w, onCase }: { w: WorkItem; onCase: () => void }) {
  const [more, setMore] = useState(false);
  useEffect(() => setMore(false), [w.id]);
  const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };
  return (
    <motion.div key={w.id} initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}>
      <motion.span variants={item} className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${w.badge === 'Internship project' ? 'bg-[#0F1D16] text-[#A6E35A]' : 'bg-[#A6E35A] text-[#0F1D16]'}`}>{w.badge}</motion.span>
      <motion.h3 variants={item} className="mt-4 text-3xl font-semibold tracking-tight sm:text-[2.1rem]">{w.name}</motion.h3>
      <motion.p variants={item} className="mt-3 leading-relaxed text-[#4A524C]">{w.description}</motion.p>
      <motion.p variants={item} className="mt-4 text-sm leading-relaxed"><span className="mr-1.5 font-semibold text-[#356A18]">Problem:</span><span className="text-[#4A524C]">{w.problem}</span></motion.p>
      <motion.div variants={item} className="mt-4">
        <p className="text-sm font-semibold text-[#356A18]">What I implemented</p>
        <ul className="mt-2 grid gap-1.5 text-[15px] text-[#18201B]">
          {w.implemented.map((x) => <li key={x} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6E35A]" />{x}</li>)}
          <AnimatePresence initial={false}>
            {more && w.more?.map((x) => <motion.li key={x} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex gap-2.5 overflow-hidden"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6E35A]" />{x}</motion.li>)}
          </AnimatePresence>
        </ul>
        {w.more && <button onClick={() => setMore(!more)} aria-expanded={more} className="mt-2 inline-flex min-h-[36px] items-center gap-1 text-sm font-medium text-[#356A18] hover:underline">{more ? <Minus size={14} /> : <Plus size={14} />}{more ? 'Show less' : `${w.more.length} more`}</button>}
      </motion.div>
      <motion.ul variants={item} className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
        {w.stack.map((s) => <li key={s} className="inline-flex items-center gap-1.5 rounded-full border border-[#18201B]/10 bg-white px-2.5 py-1 text-xs font-medium"><TechIcon name={s} size={13} />{s}</li>)}
      </motion.ul>
      <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-3">
        {w.live && <a href={w.live} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0F1D16] px-5 text-sm font-medium text-[#F4F0E6] transition-colors hover:bg-[#1F3B29]">Live demo <ArrowUpRight size={15} /><span className="sr-only">(opens in a new tab)</span></a>}
        {w.code && <a href={w.code} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#18201B]/20 px-5 text-sm font-medium hover:bg-[#18201B]/5"><Github size={15} />GitHub<span className="sr-only">(opens in a new tab)</span></a>}
        <button onClick={onCase} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#18201B]/20 px-5 text-sm font-medium hover:bg-[#18201B]/5"><FileText size={15} />Case study</button>
        {!w.code && <span className="text-xs text-[#5B6259]">GitHub link to be added</span>}
      </motion.div>
    </motion.div>
  );
}

export default function Work4() {
  const root = useRef<HTMLElement>(null);
  const [[i, dir], setI] = useState<[number, number]>([0, 0]);
  const [open, setOpen] = useState<Project | null>(null);
  const go = useCallback((n: number) => setI(([cur]) => [((n % work.length) + work.length) % work.length, n > cur ? 1 : -1]), []);
  const show = useCallback((id: string) => { const p = projects.find((x) => x.id === id); if (p) { setOpen(p); history.replaceState(null, '', `#case-${id}`); } }, []);
  const close = useCallback(() => { setOpen(null); history.replaceState(null, '', '#work'); }, []);

  useEffect(() => {
    const h = location.hash.match(/^#case-(.+)$/);
    if (h) { document.getElementById('work')?.scrollIntoView(); show(h[1]); }
    const onOpen = (e: Event) => show((e as CustomEvent<string>).detail);
    addEventListener('open-case', onOpen);
    return () => removeEventListener('open-case', onOpen);
  }, [show]);

  useGsap(root, () => {
    gsap.from(root.current!.querySelectorAll('h2 [data-word]'), { yPercent: 110, duration: 1, stagger: 0.05, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } });
    gsap.fromTo('[data-reveal-shot]', { clipPath: 'inset(12% 12% 12% 12% round 2rem)', opacity: 0.4 }, { clipPath: 'inset(0% 0% 0% 0% round 2rem)', opacity: 1, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '[data-reveal-shot]', start: 'top 80%', once: true } });
  });

  const w = work[i];
  return (
    <section id="work" ref={root} aria-labelledby="work-title" className="bg-[#F4F0E6] py-20 text-[#18201B] sm:py-24"
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); }}>
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#356A18]">02 · Selected work</p>
            <h2 id="work-title" className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"><SplitWords text="Products I've worked on" /></h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#5B6259]">A few projects that show how I turn ideas into working, real-world solutions.</p>
        </div>

        <div role="tablist" aria-label="Projects" className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {work.map((x, k) => (
            <button key={x.id} role="tab" aria-selected={i === k} onClick={() => go(k)} className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${i === k ? 'text-[#F4F0E6]' : 'text-[#4A524C] hover:text-[#18201B]'}`}>
              {i === k && <motion.span layoutId="worktab" className="absolute inset-0 rounded-full bg-[#0F1D16]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="relative">{x.name.split(' · ')[0]}</span>
            </button>
          ))}
        </div>

        <div className="relative mt-6">
          <div data-reveal-shot className="overflow-hidden rounded-[2rem] border border-[#18201B]/[0.08] bg-[#FBF9F4] p-5 shadow-[0_20px_60px_-30px_rgba(15,29,22,.35)] sm:p-8 lg:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-12 [&>*]:min-w-0">
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div key={w.id} custom={dir} initial={{ opacity: 0, x: dir * 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -60 }} transition={{ duration: 0.55, ease }}>
                    <Browser w={w} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="lg:col-span-5" role="tabpanel" aria-label={w.name}>
                <AnimatePresence mode="wait"><Details key={w.id} w={w} onCase={() => show(w.id)} /></AnimatePresence>
              </div>
            </div>
          </div>
          <button onClick={() => go(i - 1)} aria-label="Previous project" className="absolute -left-3 top-[38%] hidden h-12 w-12 place-items-center rounded-full border border-[#18201B]/10 bg-white shadow-soft transition-transform hover:-translate-x-0.5 lg:-left-6 lg:grid"><ArrowLeft size={18} /></button>
          <button onClick={() => go(i + 1)} aria-label="Next project" className="absolute -right-3 top-[38%] hidden h-12 w-12 place-items-center rounded-full border border-[#18201B]/10 bg-white shadow-soft transition-transform hover:translate-x-0.5 lg:-right-6 lg:grid"><ArrowRight size={18} /></button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2">
          {work.map((x, k) => <button key={x.id} onClick={() => go(k)} aria-label={`Show ${x.name}`} className="grid h-8 w-8 place-items-center"><span className={`block h-1.5 rounded-full transition-all duration-500 ${i === k ? 'w-8 bg-[#356A18]' : 'w-2 bg-[#18201B]/20'}`} /></button>)}
        </div>
      </div>
      <AnimatePresence>{open && <CaseStudy key={open.id} p={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
