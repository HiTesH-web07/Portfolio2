'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, ShieldCheck, Mail, Linkedin, Github, MapPin, Download, ArrowUp } from 'lucide-react';
import Avatar from '../avatar/Avatar';
import ChatBox from '../chat/ChatBox';
import { SplitWords } from '../ui/motion';
import { v4 } from '@/data/v4';

export default function AskContact4() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const contacts = [
    { icon: Mail, label: v4.email, href: `mailto:${v4.email}` },
    { icon: Linkedin, label: 'linkedin.com/in/hiteshahuja07', href: v4.linkedin, ext: true },
    { icon: Github, label: 'github.com/HiTesHweb07', href: v4.github, ext: true },
    { icon: MapPin, label: v4.location },
  ];
  return (
    <section id="ask" aria-labelledby="ask-title" className="relative overflow-hidden bg-n-ink pb-10 pt-20 text-n-fg sm:pt-24">
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-n-accent/[0.07] blur-3xl" />
      <div ref={ref} className="wrap relative grid gap-10 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col lg:col-span-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-n-accentdark">07 · Ask Hitesh</p>
          <h2 id="ask-title" className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl"><SplitWords text="Curious about my work?" /> <SplitWords text="Just ask." className="italic text-n-accentdark" /></h2>
          <p className="mt-5 leading-relaxed text-n-fg/75">Meet Ask Hitesh, an AI assistant that helps you explore my experience, projects and technical skills.</p>
          <ul className="mt-6 grid gap-3 text-sm text-n-fg/75">
            <li className="flex gap-3"><Sparkles size={17} className="mt-0.5 shrink-0 text-n-accentdark" />An AI assistant, not Hitesh in person. It answers using my verified resume and projects.</li>
            <li className="flex gap-3"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-n-accentdark" />It does not invent experience or numbers. If it does not know something, it says so.</li>
          </ul>
          <motion.div className="relative mt-8 w-56 self-start lg:mt-auto" initial={{ y: 40, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div aria-hidden className="absolute inset-x-2 bottom-0 top-10 rounded-t-[999px] bg-[#26304A] ring-1 ring-n-accentdark/30" />
            <Avatar pose="wave" expression="smile" className="relative" title="Illustration of Hitesh waving hello" />
          </motion.div>
        </div>

        <motion.div className="min-w-0 lg:col-span-5" initial={{ y: 40, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          <ChatBox className="h-[36rem] max-h-[80vh] rounded-[1.75rem] shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)]" />
        </motion.div>

        <div id="contact" className="min-w-0 lg:col-span-3">
          <h3 className="text-2xl font-semibold">Get in touch</h3>
          <ul className="mt-6 grid gap-4">
            {contacts.map((c) => (
              <li key={c.label}>
                {c.href ? <a href={c.href} {...(c.ext ? { target: '_blank', rel: 'noreferrer' } : {})} className="group flex items-center gap-3 break-all text-[15px] text-n-fg/85 transition-colors hover:text-n-accentdark"><c.icon size={18} className="shrink-0" />{c.label}{c.ext && <span className="sr-only">(opens in a new tab)</span>}</a>
                  : <span className="flex items-center gap-3 text-[15px] text-n-fg/85"><c.icon size={18} className="shrink-0" />{c.label}</span>}
              </li>
            ))}
          </ul>
          <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={v4.resume} download className="mt-8 inline-flex min-h-[46px] items-center gap-2 rounded-full bg-n-bg px-5 font-medium text-n-ink transition-colors hover:bg-white"><Download size={16} />Download resume</motion.a>
        </div>
      </div>
      <footer className="wrap relative mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-sm text-n-fg/55 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {v4.name} · I build products and the systems behind them.</p>
        <a href="#top" className="inline-flex min-h-[44px] items-center gap-1.5 hover:text-n-fg">Back to top <ArrowUp size={14} /></a>
      </footer>
    </section>
  );
}
