'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import ChatBox from '../chat/ChatBox';
import { SplitWords } from '../ui/motion';

export default function AskContact4() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section id="ask" aria-labelledby="ask-title" className="relative overflow-hidden bg-n-ink py-20 text-n-fg sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-n-accent/[0.07] blur-3xl" />
      <div ref={ref} className="wrap relative grid gap-10 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col lg:col-span-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-n-accentdark">07 · Ask Hitesh</p>
          <h2 id="ask-title" className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl"><SplitWords text="Curious about my work?" /> <SplitWords text="Just ask." className="italic text-n-accentdark" /></h2>
          <p className="mt-5 leading-relaxed text-n-fg/75">Meet Ask Hitesh, an AI assistant that helps you explore my experience, projects and technical skills.</p>
          <ul className="mt-6 grid gap-3 text-sm text-n-fg/75">
            <li className="flex gap-3"><Sparkles size={17} className="mt-0.5 shrink-0 text-n-accentdark" />An AI assistant, not Hitesh in person. It answers using my verified resume and projects.</li>
            <li className="flex gap-3"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-n-accentdark" />It does not invent experience or numbers. If it does not know something, it says so.</li>
          </ul>
          <motion.div className="relative mt-10 w-full max-w-[34rem] lg:mt-auto lg:pt-10" initial={{ y: 30, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div aria-hidden className="absolute inset-x-[10%] bottom-0 top-[20%] rounded-full bg-n-accent/25 blur-3xl" />
            <motion.div className="relative aspect-[1256/722] [mask-image:linear-gradient(to_bottom,black_86%,transparent)]" animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <Image src="/avatar/ask-hitesh.webp" alt="Hitesh at his laptop, gesturing as if explaining something" fill sizes="(min-width: 1024px) 34rem, 100vw" className="object-contain" />
              {/* soft pulse over the sparkle bubble in the illustration */}
              <motion.span aria-hidden className="absolute left-[11%] top-[13%] h-[30%] w-[22%] rounded-full bg-[#8EA0FF]/25 blur-xl" animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.9, 1.08, 0.9] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} />
            </motion.div>
          </motion.div>
        </div>

        <motion.div className="min-w-0 lg:col-span-7" initial={{ y: 40, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          <ChatBox className="h-[36rem] max-h-[80vh] rounded-[1.75rem] shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)]" />
        </motion.div>

      </div>
    </section>
  );
}
