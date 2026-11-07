'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, Briefcase, Building2, Sparkles, Check } from 'lucide-react';
import { gsap, SplitWords, useGsap } from '../ui/motion';
import { journey5, type Scene5 } from '@/data/v4';

const KIND_ICON = { Education: GraduationCap, Internship: Briefcase, 'Current role': Building2, Now: Sparkles } as const;

// One illustration per chapter, cut from Hitesh's avatar reference sheet.
const ART: Record<Scene5, { src: string; alt: string; pos: string }> = {
  foundation: { src: '/journey/foundation.webp', alt: 'Hitesh studying at his desk with notes on DSA, OS and DBMS', pos: '50% 30%' },
  product: { src: '/journey/building.webp', alt: 'Hitesh coding on a laptop with React, Next.js and Tailwind icons around him', pos: '55% 30%' },
  engineering: { src: '/journey/product.webp', alt: 'Hitesh thinking through an integration, with viaSocket, API and webhook icons', pos: '45% 30%' },
  next: { src: '/journey/ai.webp', alt: 'Hitesh smiling at his laptop next to a glowing AI assistant panel', pos: '45% 30%' },
};

/** The chapter illustration: cross-fades between chapters, with a slow drift and a light sweep. */
function Stage({ i }: { i: number }) {
  const c = journey5[i];
  const a = ART[c.scene];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-[#1A2030] shadow-[0_30px_70px_-35px_rgba(21,25,35,.55)] ring-1 ring-black/5">
      <AnimatePresence initial={false}>
        <motion.div key={c.id} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <motion.div className="absolute inset-0" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}>
            <Image src={a.src} alt={a.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" style={{ objectPosition: a.pos }} priority={i === 0} />
          </motion.div>
          <motion.span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" initial={{ x: '0%' }} animate={{ x: '400%' }} transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }} />
        </motion.div>
      </AnimatePresence>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#151923]/70 to-transparent" />
      <motion.span key={`n-${c.id}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#151923]/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
        <span className="rounded-full bg-[#4A5FF0] px-2 py-0.5 font-mono text-[11px]">{c.num}</span>{c.title}
      </motion.span>
    </div>
  );
}

export default function Journey5() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-ch]') ?? []);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement)); }), { rootMargin: '-42% 0px -48% 0px' });
    els.forEach((el) => io.observe(el)); return () => io.disconnect();
  }, []);
  useGsap(root, () => {
    gsap.from(root.current!.querySelectorAll('h2 [data-word]'), { yPercent: 110, duration: 1, stagger: 0.05, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } });
    gsap.fromTo('[data-jfill]', { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top', ease: 'none', scrollTrigger: { trigger: '[data-chs]', start: 'top 55%', end: 'bottom 60%', scrub: 0.5 } });
    gsap.utils.toArray<HTMLElement>('[data-ch]').forEach((el) => gsap.from(el.querySelectorAll('[data-in]'), { y: 22, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 78%', once: true } }));
  });

  return (
    <section id="journey" ref={root} aria-labelledby="journey-title" className="bg-n-bg py-20 text-n-ink sm:py-24">
      <div className="wrap">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-n-accent">02 · My journey</p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="journey-title" className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"><SplitWords text="The Journey of a Builder" /></h2>
          <p className="max-w-md text-n-muted">Student → frontend intern → integration engineer on a product → exploring AI.</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-[13vh]">
              <div className="mx-auto aspect-[358/378] h-[66vh] max-h-[580px]"><Stage i={active} /></div>
              <ol className="mx-auto mt-4 grid max-w-[550px] grid-cols-4 gap-2" aria-label="Chapters">
                {journey5.map((c, k) => (
                  <li key={c.id}>
                    <button onClick={() => document.querySelectorAll('#journey [data-ch]')[k]?.scrollIntoView({ behavior: 'smooth', block: 'center' })} aria-current={k === active ? 'step' : undefined} className="w-full text-left">
                      <span className="block h-1 overflow-hidden rounded-full bg-n-line"><span className={`block h-full origin-left rounded-full bg-n-accent transition-transform duration-700 ${k <= active ? 'scale-x-100' : 'scale-x-0'}`} /></span>
                      <span className={`mt-2 block text-xs transition-colors ${k === active ? 'font-semibold text-n-ink' : 'text-n-muted'}`}>{c.num} · {c.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <ol data-chs className="relative lg:col-span-5 lg:pl-10">
            <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-n-line lg:left-[11px]" />
            <span aria-hidden data-jfill className="absolute bottom-0 left-[11px] top-0 w-px bg-n-accent lg:left-[11px]" />
            {journey5.map((c, i) => {
              const Icon = KIND_ICON[c.kind as keyof typeof KIND_ICON];
              return (
                <li key={c.id} data-ch className={`relative pb-14 pl-10 transition-opacity duration-500 last:pb-0 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:pl-6 ${i === active ? 'lg:opacity-100' : 'lg:opacity-[0.38]'}`}>
                  <span aria-hidden className={`absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full border-2 transition-colors duration-500 lg:-left-[0px] lg:top-auto ${i <= active ? 'border-n-accent bg-n-accent' : 'border-n-line bg-n-bg'}`}><span className={`h-1.5 w-1.5 rounded-full ${i <= active ? 'bg-white' : 'bg-n-line'}`} /></span>
                  <div className="mb-5 aspect-[358/378] max-w-md lg:hidden"><Stage i={i} /></div>
                  <div className="lg:pl-6">
                    <p data-in className="flex items-center gap-2 font-mono text-sm text-n-accent">{c.num}<span className="inline-flex items-center gap-1 rounded-full bg-n-accentsoft px-2 py-0.5 font-sans text-xs font-medium text-n-accenthover"><Icon size={12} />{c.kind}</span></p>
                    <h3 data-in className="mt-2 text-3xl font-semibold tracking-tight">{c.title}</h3>
                    <p data-in className="mt-1 text-sm font-medium text-n-ink/80">{c.role} · <span className="text-n-muted">{c.org}</span></p>
                    {c.story.map((p, k) => <p key={k} data-in className="mt-4 leading-relaxed text-n-muted">{p.split(/\*\*(.+?)\*\*/g).map((t, j) => (j % 2 ? <strong key={j} className="font-semibold text-n-ink">{t}</strong> : t))}</p>)}
                    {c.meta && <p data-in className="mt-4 font-semibold text-n-ink">{c.meta}</p>}
                    {c.points && <ul data-in className="mt-4 grid gap-1.5 text-sm">{c.points.map((p) => <li key={p} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-n-accent" />{p}</li>)}</ul>}
                    {c.closing && <p data-in className="mt-6 text-xl font-semibold tracking-tight text-n-ink">{c.closing}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
