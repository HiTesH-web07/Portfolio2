'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MessageCircle } from 'lucide-react';
import { Portrait } from '../avatar/Portrait';
import { gsap, SplitWords, useGsap } from '../ui/motion';
import { TechIcon } from '@/lib/icons';
import { v4 } from '@/data/v4';

export default function Hero4() {
  const root = useRef<HTMLElement>(null);


  useGsap(root, () => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('[data-bg]', { opacity: 0, duration: 1.2, ease: 'power2.out' })
      .from('[data-eyebrow]', { y: 14, opacity: 0, duration: 0.7 }, 0.2)
      .from('h1 [data-word]', { yPercent: 110, duration: 1, stagger: 0.05 }, 0.35)
      .fromTo('[data-swoosh]', { strokeDashoffset: 260 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power3.inOut' }, 0.9)
      .from('[data-fade]', { y: 16, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.8)
      .from('[data-avatar]', { y: 50, opacity: 0, scale: 0.96, duration: 1.2 }, 0.3);
    gsap.to('[data-avatar]', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
  });

  return (
    <section id="top" ref={root} className="relative overflow-hidden bg-n-ink pb-20 pt-28 text-n-fg sm:pt-32 lg:min-h-[100svh] lg:pb-16">
      <div data-bg aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_78%_18%,#26304A_0%,#1A2030_48%,#151923_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#EEF1F6_1px,transparent_1px),linear-gradient(90deg,#EEF1F6_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_60%_at_70%_40%,black,transparent)]" />
        <div className="drift absolute right-[8%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-n-accent/10 blur-3xl" style={{ ['--t' as string]: '16s' }} />
        <div className="drift absolute -left-32 bottom-0 h-[22rem] w-[22rem] rounded-full bg-[#3D52DB]/20 blur-3xl" style={{ ['--t' as string]: '20s' }} />
      </div>

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p data-eyebrow className="text-[13px] font-semibold uppercase tracking-[0.18em] text-n-accentdark">{v4.intro}</p>
          <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl xl:text-[4.1rem]">
            <span className="sr-only">{v4.name}, {v4.role}. </span>
            <SplitWords text={v4.headline[0]} />{' '}
            <span className="relative inline-block">
              <SplitWords text={v4.headline[1]} className="italic text-n-accentdark" />
              <svg aria-hidden viewBox="0 0 220 18" className="absolute -bottom-2 left-0 w-full" preserveAspectRatio="none"><path data-swoosh d="M3 13 C 60 4, 150 4, 217 10" stroke="#8EA0FF" strokeWidth="4" strokeLinecap="round" fill="none" strokeDasharray="260" /></svg>
            </span>{' '}
            <SplitWords text={v4.headline[2]} />
          </h1>
          <p data-fade className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] font-medium text-n-fg">
            {v4.identity.map((x, k) => <span key={x} className="flex items-center gap-3">{k > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-n-accentdark" />}{x}</span>)}
          </p>
          <p data-fade className="mt-4 max-w-xl text-[17px] leading-relaxed text-n-fg/75">{v4.description}</p>
          <div data-fade className="mt-8 flex flex-wrap gap-3">
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#work" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-n-accent px-5 font-medium text-white shadow-[0_10px_30px_-10px_rgba(74,95,240,.6)] transition-colors hover:bg-n-accenthover">Explore work <ArrowRight size={17} /></motion.a>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={v4.resume} download className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-n-fg/25 px-5 font-medium transition-colors hover:border-n-fg/60">Download resume <Download size={16} /></motion.a>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#ask" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-n-fg/25 px-5 font-medium transition-colors hover:border-n-fg/60">Ask Hitesh <MessageCircle size={16} /></motion.a>
          </div>
          <div data-fade className="mt-9 flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.16em] text-n-fg/70">Works with</span>
            <ul className="flex items-center gap-3">{v4.heroTech.map((t) => <li key={t} title={t} className="grid h-9 w-9 place-items-center rounded-xl bg-n-bg transition-transform hover:-translate-y-0.5"><TechIcon name={t} size={17} /></li>)}</ul>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto w-full max-w-[30rem]">
            <div aria-hidden className="absolute -inset-8 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(83,109,254,.28)_0%,transparent_65%)] blur-2xl" />
            <div data-avatar className="relative">
              <Portrait priority className="drop-shadow-[0_30px_60px_rgba(0,0,0,.45)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
