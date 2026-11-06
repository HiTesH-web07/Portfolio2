'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Avatar from '../avatar/Avatar';
import { Artifact } from '../story/JourneyNext';
import { gsap, SplitWords, useGsap } from '../ui/motion';
import { journey4, type Chapter4 } from '@/data/v4';

const ease = [0.22, 1, 0.36, 1] as const;
const BG: Record<Chapter4['scene'], string> = {
  study: 'radial-gradient(90% 80% at 30% 20%, #2A4A2F 0%, #14271C 60%, #0E1B14 100%)',
  product: 'radial-gradient(90% 80% at 70% 20%, #23463A 0%, #132A22 60%, #0D1A15 100%)',
  systems: 'radial-gradient(90% 80% at 50% 10%, #1D3F3A 0%, #10261F 60%, #0B1813 100%)',
  ai: 'radial-gradient(90% 80% at 60% 30%, #34502A 0%, #17291B 60%, #0D1810 100%)',
};

function Props({ c }: { c: Chapter4 }) {
  const pop = (d: number) => ({ initial: { opacity: 0, y: 18, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { delay: d, duration: 0.6, ease } });
  if (c.scene === 'study') return (
    <>
      {/* desk lamp switching on */}
      <motion.div {...pop(0.1)} className="absolute left-[5%] top-[18%] w-24">
        <svg viewBox="0 0 100 130" aria-hidden className="w-full">
          <path d="M20 125 h60" stroke="#C9B48A" strokeWidth="6" strokeLinecap="round" />
          <path d="M50 122 L38 70 L70 38" stroke="#C9B48A" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M58 22 L92 40 L78 62 Z" fill="#E3C77A" />
        </svg>
        <motion.span aria-hidden className="absolute left-[55%] top-[44%] h-28 w-28 rounded-full bg-[#F7E3A1]/30 blur-2xl" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.7, 1] }} transition={{ delay: 0.5, duration: 1.2 }} />
      </motion.div>
      {/* stacked books */}
      <div className="absolute bottom-[13%] left-[6%] grid gap-1">
        {[['C++', '#2F6B3C'], ['DSA', '#8C5A3C'], ['Web Dev', '#3B5B8C']].map(([t, col], k) => (
          <motion.span key={t} {...pop(0.2 + k * 0.12)} className="block w-28 rounded-md px-3 py-1.5 font-mono text-[11px] font-semibold text-[#F4F0E6] shadow-lift" style={{ background: col, transform: `translateX(${k * 6}px)` }}>{t}</motion.span>
        ))}
      </div>
      <motion.span {...pop(0.6)} aria-hidden className="absolute bottom-[14%] right-[8%] h-10 w-9 rounded-b-xl rounded-t-sm bg-[#E8E2D2] shadow-lift after:absolute after:-right-3 after:top-2 after:h-5 after:w-4 after:rounded-r-full after:border-4 after:border-l-0 after:border-[#E8E2D2]" />
    </>
  );
  if (c.scene === 'product') return (
    <>
      <div className="absolute right-[5%] top-[12%] grid w-48 grid-cols-2 gap-2">
        {['#E8C6B8', '#D9E4DC', '#E9DFC8', '#C9DDE8'].map((col, k) => (
          <motion.div key={k} {...pop(0.15 + k * 0.1)} className="rounded-xl bg-[#FBF9F4] p-1.5 shadow-lift"><div className="aspect-[4/3] rounded-lg" style={{ background: col }} /><div className="mt-1.5 h-1.5 w-3/4 rounded bg-[#E2D9C6]" /><div className="mt-1 h-1.5 w-1/2 rounded bg-[#A6E35A]/70" /></motion.div>
        ))}
      </div>
      <motion.span {...pop(0.6)} className="absolute left-[6%] top-[16%] rounded-lg border border-[#61DAFB]/40 bg-[#61DAFB]/10 px-3 py-1.5 font-mono text-xs text-[#9BE7FB]">{'<ProductCard />'}</motion.span>
      <motion.div {...pop(0.8)} className="absolute bottom-[8%] right-[5%] rounded-xl border border-white/10 bg-[#0B1510]/80 px-3 py-2 font-mono text-[11px] text-[#F4F0E6]/80 backdrop-blur">GET /api/products <span className="text-[#A6E35A]">200 OK</span></motion.div>
    </>
  );
  if (c.scene === 'systems') return (
    <>
      <svg aria-hidden viewBox="0 0 300 200" className="absolute right-[3%] top-[10%] w-[58%]">
        <path d="M40 40 C 120 40, 120 100, 150 100 S 200 160, 260 160" stroke="#A6E35A" strokeOpacity=".6" strokeWidth="2" strokeDasharray="5 6" fill="none" className="flow-dash" />
      </svg>
      {[['Trigger', 'New form response', 'right-[44%] top-[9%]'], ['OAuth 2.0', 'Token refreshed', 'right-[14%] top-[34%]'], ['Action', 'Create record', 'right-[3%] top-[60%]']].map(([k, v, pos], n) => (
        <motion.div key={k} {...pop(0.15 + n * 0.15)} className={`absolute ${pos} rounded-xl bg-[#F4F0E6] px-3 py-2 text-[#18201B] shadow-lift`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#356A18]">{k}</p><p className="text-xs font-medium">{v}</p>
        </motion.div>
      ))}
      <motion.span {...pop(0.7)} className="absolute left-[6%] top-[14%] rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-[#F4F0E6]/80">webhook ⚡</motion.span>
      <motion.div {...pop(0.85)} className="absolute bottom-[7%] right-[4%] rounded-xl border border-white/10 bg-[#0B1510]/85 px-3 py-2 font-mono text-[11px] leading-5 text-[#F4F0E6]/80"><p>{'{ "status": 200,'}</p><p className="pl-2">{'"next_cursor": "a9f…" }'}</p></motion.div>
    </>
  );
  return <div className="absolute right-[2%] top-[8%] origin-top-right scale-[.82]"><Artifact kind="ai" /></div>;
}

function Stage({ c, idx }: { c: Chapter4; idx: number }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/[0.08] transition-[background] duration-700" style={{ background: BG[c.scene] }}>
      <div className="absolute left-6 top-5 z-10 flex items-center gap-3 text-[#F4F0E6]">
        <AnimatePresence mode="wait"><motion.span key={c.num} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="font-mono text-sm text-[#A6E35A]">{c.num}</motion.span></AnimatePresence>
        <span className="text-xs uppercase tracking-[0.16em] text-[#F4F0E6]/60">{c.where}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={c.id} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
          <Props c={c} />
          <motion.div className={`absolute bottom-0 ${c.scene === 'study' ? 'left-[24%] w-[54%]' : c.scene === 'ai' ? 'left-[3%] w-[42%]' : 'left-[4%] w-[46%]'}`} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease }}>
            <Avatar pose={c.pose} expression={c.expression} title={`Illustration of Hitesh: ${c.title}`} />
          </motion.div>
          {c.scene === 'study' && <div aria-hidden className="absolute inset-x-0 bottom-0 h-[13%] bg-[#3A2E22]/70" />}
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-5 right-6 z-10 flex gap-1.5" aria-hidden>{journey4.map((_, k) => <span key={k} className={`h-1.5 rounded-full transition-all duration-500 ${k === idx ? 'w-7 bg-[#A6E35A]' : 'w-2 bg-white/25'}`} />)}</div>
    </div>
  );
}

export default function Journey4() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-ch]') ?? []);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement)); }), { rootMargin: '-42% 0px -45% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  useGsap(root, () => {
    gsap.from(root.current!.querySelectorAll('h2 [data-word]'), { yPercent: 110, duration: 1, stagger: 0.05, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } });
    gsap.fromTo('[data-jline]', { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top', ease: 'none', scrollTrigger: { trigger: '[data-chs]', start: 'top 55%', end: 'bottom 55%', scrub: 0.5 } });
    gsap.utils.toArray<HTMLElement>('[data-ch]').forEach((el) => gsap.from(el.querySelectorAll('[data-in]'), { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 75%', once: true } }));
  });

  return (
    <section id="journey" ref={root} aria-labelledby="journey-title" className="bg-[#0F1D16] py-20 text-[#F4F0E6] sm:py-24">
      <div className="wrap">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#A6E35A]">02 · My journey</p>
        <h2 id="journey-title" className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"><SplitWords text="The Journey of a Builder" /></h2>
        <p className="mt-4 max-w-xl text-[#F4F0E6]/65">From learning to build, to building real products, to understanding the systems behind them.</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="hidden lg:col-span-6 lg:block"><div className="sticky top-[14vh] h-[70vh]"><Stage c={journey4[active]} idx={active} /></div></div>
          <ol data-chs className="relative lg:col-span-6 lg:pl-14">
            <span aria-hidden className="absolute bottom-0 left-[15px] top-0 w-px bg-white/10 lg:left-[31px]" />
            <span aria-hidden data-jline className="absolute bottom-0 left-[15px] top-0 w-px bg-[#A6E35A] lg:left-[31px]" />
            {journey4.map((c, i) => (
              <li key={c.id} data-ch className={`relative pb-12 pl-12 transition-opacity duration-500 last:pb-0 lg:flex lg:min-h-[54vh] lg:flex-col lg:justify-center lg:pl-0 ${i === active ? 'lg:opacity-100' : 'lg:opacity-40'}`}>
                <span aria-hidden className={`absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border-2 transition-colors duration-500 lg:-left-[39px] lg:top-auto ${i <= active ? 'border-[#A6E35A] bg-[#A6E35A]' : 'border-white/25 bg-[#0F1D16]'}`}><span className={`h-2 w-2 rounded-full ${i <= active ? 'bg-[#0F1D16]' : 'bg-white/30'}`} /></span>
                <div className="mb-5 h-64 sm:h-80 lg:hidden"><Stage c={c} idx={i} /></div>
                <p data-in className="font-mono text-sm text-[#A6E35A]">{c.num}</p>
                <h3 data-in className="mt-1 text-2xl font-semibold sm:text-3xl">{c.title}</h3>
                <p data-in className="mt-1 text-sm text-[#F4F0E6]/55">{c.where}</p>
                {c.paras.map((p, k) => <p key={k} data-in className="mt-4 max-w-lg leading-relaxed text-[#F4F0E6]/80">{p}</p>)}
                <ul data-in className="mt-5 flex flex-wrap gap-2">{c.objects.map((o) => <li key={o} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs text-[#F4F0E6]/80">{o}</li>)}</ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
