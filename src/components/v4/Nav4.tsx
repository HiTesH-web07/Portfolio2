'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X, Download } from 'lucide-react';
import { nav4, v4 } from '@/data/v4';

export default function Nav4() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(scrollY > 20); onScroll(); addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    nav4.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => { removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? 'border-b border-white/[0.06] bg-n-ink/85 backdrop-blur-xl' : 'bg-n-ink'}`}>
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between gap-4 text-n-fg">
        <a href="#top" className="flex items-center gap-2.5 font-semibold" aria-label="Hitesh Ahuja, back to top">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-n-accent font-display text-[15px] font-bold text-white">H</span>{v4.name}
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {nav4.map((n) => (
            <li key={n.id}><a href={`#${n.id}`} className={`relative rounded-full px-3 py-2 text-[14px] transition-colors ${active === n.id ? 'text-n-fg' : 'text-n-fg/65 hover:text-n-fg'}`}>
              {n.label}{active === n.id && <motion.span layoutId="nav4dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-n-accent" />}
            </a></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <motion.a whileHover={{ y: -1 }} href={v4.resume} download className="hidden min-h-[40px] items-center gap-1.5 rounded-full border border-n-fg/25 px-4 text-sm font-medium transition-colors hover:border-n-accentdark hover:text-n-accentdark sm:inline-flex">Resume <ArrowUpRight size={15} /></motion.a>
          <button className="grid h-11 w-11 place-items-center rounded-full lg:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={21} /></button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-n-ink text-n-fg lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="wrap flex h-16 items-center justify-between"><span className="font-semibold">{v4.name}</span><button className="grid h-11 w-11 place-items-center" aria-label="Close menu" onClick={() => setOpen(false)}><X size={22} /></button></div>
            <ul className="wrap mt-4 grid">
              {nav4.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 text-3xl font-medium">{n.label}</a>
                </motion.li>
              ))}
            </ul>
            <div className="wrap mt-8"><a href={v4.resume} download className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-n-accent font-medium text-white"><Download size={17} />Download resume</a></div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
