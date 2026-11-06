'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SplitWords } from '../ui/motion';
import { problem4 } from '@/data/v4';

// Types the snippet once when it scrolls into view (instantly when motion is reduced).
function useTyping(lines: string[], start: boolean) {
  const full = lines.join('\n');
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(full.length); return; }
    let i = 0; const id = setInterval(() => { i += 2; setN(Math.min(i, full.length)); if (i >= full.length) clearInterval(id); }, 28);
    return () => clearInterval(id);
  }, [start, full]);
  return full.slice(0, n).split('\n');
}

export default function Problem4() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: true, margin: '-80px' });
  const typed = useTyping(problem4.code, inView);
  const arr = [2, 7, 11, 15];
  return (
    <section id="problems" aria-labelledby="ps-title" className="bg-[#0F1D16] py-20 text-[#F4F0E6] sm:py-24">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#A6E35A]">06 · Problem solving</p>
          <h2 id="ps-title" className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"><SplitWords text={problem4.title} /></h2>
          <p className="mt-5 max-w-md leading-relaxed text-[#F4F0E6]/75">{problem4.text}</p>
          <ul className="mt-6 flex flex-wrap gap-2">{problem4.tags.map((t) => <li key={t} className="rounded-full border border-[#A6E35A]/40 bg-[#A6E35A]/10 px-3.5 py-1.5 text-sm text-[#CFF29F]">{t}</li>)}</ul>
        </div>
        <div ref={box} className="lg:col-span-7">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0B1510] shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)]">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E5735E]" /><span className="h-2.5 w-2.5 rounded-full bg-[#E3B341]" /><span className="h-2.5 w-2.5 rounded-full bg-[#7BC46C]" />
              <span className="ml-3 rounded-md bg-white/5 px-3 py-1 font-mono text-xs text-[#F4F0E6]/70">solution.cpp</span>
            </div>
            <pre className="min-h-[15.5rem] overflow-x-auto px-5 py-4 font-mono text-[13px] leading-7" aria-label="C++ code sample">
              {problem4.code.map((_, k) => (
                <div key={k} className="flex"><span className="w-8 shrink-0 select-none text-[#F4F0E6]/50">{k + 1}</span>
                  <span className={typed[k]?.trim().startsWith('//') ? 'text-[#7BC46C]' : typed[k]?.startsWith('#') || typed[k]?.startsWith('using') ? 'text-[#C792EA]' : 'text-[#E8E2D2]'}>{typed[k] ?? ''}{k === typed.length - 1 && <span className="caret ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 bg-[#A6E35A]" />}</span>
                </div>
              ))}
            </pre>
            <div className="flex flex-wrap items-center gap-4 border-t border-white/10 px-5 py-4">
              <div className="flex gap-1.5" aria-hidden>
                {arr.map((v, k) => (
                  <motion.span key={k} className="grid h-9 w-9 place-items-center rounded-lg border font-mono text-sm" initial={false}
                    animate={inView ? { borderColor: k < 2 ? '#A6E35A' : 'rgba(255,255,255,.15)', backgroundColor: k < 2 ? 'rgba(166,227,90,.15)' : 'rgba(255,255,255,0)' } : {}}
                    transition={{ delay: 1.2 + k * 0.25, duration: 0.4 }}>{v}</motion.span>
                ))}
              </div>
              <p className="font-mono text-xs text-[#F4F0E6]/60">target = 9 → indices [0, 1] · O(n)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
