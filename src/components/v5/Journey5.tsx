'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, Briefcase, Building2, Sparkles, ArrowRight, Check } from 'lucide-react';
import Avatar from '../avatar/Avatar';
import { gsap, SplitWords, useGsap } from '../ui/motion';
import { journey5, type Scene5 } from '@/data/v4';

const ease = [0.22, 1, 0.36, 1] as const;
const W = 680, H = 540; // design size of every scene; scaled to fit its container
const KIND_ICON = { Education: GraduationCap, Internship: Briefcase, 'Current role': Building2, Now: Sparkles } as const;

const pop = (d: number, y = 16) => ({ initial: { opacity: 0, y, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { delay: d, duration: 0.55, ease } });

function Win({ title, children, className = '', dark = true }: { title: string; children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-xl border shadow-[0_24px_50px_-20px_rgba(0,0,0,.55)] ${dark ? 'border-white/10 bg-[#0F131C]' : 'border-black/5 bg-white'} ${className}`}>
      <div className={`flex items-center gap-1.5 px-3 py-2 ${dark ? 'bg-[#1A2030]' : 'bg-[#F2F4F7]'}`}>
        <span className="h-2 w-2 rounded-full bg-[#F06A6A]" /><span className="h-2 w-2 rounded-full bg-[#F2C14E]" /><span className="h-2 w-2 rounded-full bg-[#5BC17F]" />
        <span className={`ml-2 truncate font-mono text-[10.5px] ${dark ? 'text-white/55' : 'text-[#667085]'}`}>{title}</span>
      </div>
      {children}
    </div>
  );
}

const K = ({ c, children }: { c: string; children: React.ReactNode }) => <span style={{ color: c }}>{children}</span>;
const kw = '#C792EA', fn = '#82AAFF', str = '#C3E88D', cm = '#8A94AA', num = '#F78C6C';

function Foundation() {
  return (
    <>
      <motion.div {...pop(0.1)} className="absolute right-6 top-6 w-[300px]">
        <Win title="practice/two_sum.cpp">
          <pre className="px-4 py-3 font-mono text-[11.5px] leading-[1.7] text-[#D6DEEB]">
            <div><K c={kw}>#include</K> <K c={str}>{'<bits/stdc++.h>'}</K></div>
            <div><K c={kw}>int</K> <K c={fn}>main</K>() {'{'}</div>
            <div className="pl-4"><K c={cm}>{'// break it down first'}</K></div>
            <div className="pl-4"><K c={kw}>for</K> (<K c={kw}>int</K> i = <K c={num}>0</K>; i {'<'} n; ++i)</div>
            <div className="pl-8">solve(i);</div>
            <div>{'}'}</div>
          </pre>
        </Win>
      </motion.div>
      <motion.div {...pop(0.45)} className="absolute right-[150px] top-[232px] flex items-center gap-2 font-mono text-[11px] text-[#8EA0FF]">
        <span>fundamentals</span><ArrowRight size={14} /><span>the web</span>
      </motion.div>
      <motion.div {...pop(0.6)} className="absolute right-6 top-[268px] w-[250px]">
        <Win title="localhost:3000" dark={false}>
          <div className="space-y-2 p-3">
            <div className="flex items-center justify-between"><span className="h-2 w-14 rounded bg-[#151923]" /><span className="h-5 w-12 rounded-md bg-[#4A5FF0]" /></div>
            <div className="h-2 w-3/4 rounded bg-[#E4E7EC]" /><div className="h-2 w-1/2 rounded bg-[#E4E7EC]" />
            <div className="grid grid-cols-3 gap-1.5 pt-1">{[0, 1, 2].map((k) => <motion.div key={k} {...pop(0.8 + k * 0.1, 8)} className="h-10 rounded-md bg-[#EEF1FF]" />)}</div>
          </div>
        </Win>
      </motion.div>
      <div className="absolute left-6 top-6 flex flex-wrap gap-1.5">
        {['C', 'C++', 'DSA', 'HTML/CSS', 'React'].map((t, k) => <motion.span key={t} {...pop(0.2 + k * 0.08, 8)} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-[#A7B0C2]">{t}</motion.span>)}
      </div>
    </>
  );
}

function Product() {
  const items = ['#E4E9FF', '#FDE8D7', '#DDF3E6', '#F3E1F5'];
  return (
    <>
      <motion.div {...pop(0.1)} className="absolute right-6 top-6 w-[330px]">
        <Win title="kulies · storefront" dark={false}>
          <div className="p-3">
            <div className="flex items-center justify-between"><span className="text-[13px] font-semibold text-[#151923]">Kulies</span><span className="rounded-full bg-[#151923] px-2 py-0.5 text-[10px] text-white">Cart · 2</span></div>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {items.map((c, k) => (
                <motion.div key={k} initial={{ opacity: 0, y: 14, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.35 + k * 0.12, duration: 0.5, ease }} className="rounded-lg border border-[#E4E7EC] p-1.5">
                  <div className="aspect-[4/3] rounded-md" style={{ background: c }} />
                  <div className="mt-1.5 h-1.5 w-3/4 rounded bg-[#E4E7EC]" />
                  <div className="mt-1 flex items-center justify-between"><span className="h-1.5 w-8 rounded bg-[#151923]/70" /><span className="h-3.5 w-8 rounded bg-[#4A5FF0]" /></div>
                </motion.div>
              ))}
            </div>
          </div>
        </Win>
      </motion.div>
      <motion.div {...pop(0.55)} className="absolute right-[250px] top-[300px] w-[230px]">
        <Win title="ProductCard.jsx">
          <pre className="px-3 py-2.5 font-mono text-[11px] leading-[1.7] text-[#D6DEEB]">
            <div><K c={kw}>export</K> <K c={kw}>function</K> <K c={fn}>ProductCard</K>(p) {'{'}</div>
            <div className="pl-3"><K c={kw}>return</K> {'<'}<K c={fn}>Card</K> price={'{'}p.price{'}'} /{'>'}</div>
            <div>{'}'}</div>
          </pre>
        </Win>
      </motion.div>
      <motion.div {...pop(0.75)} className="absolute right-6 top-[318px] w-[210px] rounded-xl border border-white/10 bg-[#0F131C] p-3 font-mono text-[10.5px] leading-[1.7] text-[#D6DEEB]">
        <div><K c="#8EA0FF">GET</K> /api/products</div>
        <div className="text-[#5BC17F]">200 OK · 48ms</div>
        <div className="text-[#6B7489]">[{'{'} id, name, price {'}'}, …]</div>
      </motion.div>
      <p className="absolute bottom-3 right-6 text-[10px] text-[#A7B0C2]/70">Illustration of the work, not a product screenshot</p>
    </>
  );
}

function Engineering() {
  const [ok, setOk] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOk(true), 1400); return () => clearTimeout(t); }, []);
  return (
    <>
      <motion.div {...pop(0.05)} className="absolute right-5 top-5 w-[440px]">
        <Win title="integrations/crm/actions/create-record.js">
          <pre className="px-4 py-3 font-mono text-[11.5px] leading-[1.75] text-[#D6DEEB]">
            <div><K c={kw}>export const</K> <K c={fn}>createRecord</K> = {'{'}</div>
            <div className="pl-4">auth: {'{'} type: <K c={str}>&apos;oauth2&apos;</K> {'}'},</div>
            <div className="pl-4">inputFields: <K c={kw}>async</K> (ctx) {'=>'} <K c={fn}>loadFields</K>(ctx),</div>
            <div className="pl-4"><K c={kw}>async</K> <K c={fn}>perform</K>(ctx) {'{'}</div>
            <div className="pl-8"><K c={kw}>const</K> body = <K c={fn}>mapFields</K>(ctx.input);</div>
            <div className="pl-8"><K c={kw}>return</K> api.<K c={fn}>post</K>(<K c={str}>&apos;/records&apos;</K>, body);</div>
            <div className="pl-4">{'}'},</div>
            <div className="pl-4">paginate: {'{'} cursor: <K c={str}>&apos;next_cursor&apos;</K> {'}'},</div>
            <div>{'}'};<span className="caret ml-0.5 inline-block h-3.5 w-[6px] translate-y-0.5 bg-[#8EA0FF]" /></div>
          </pre>
        </Win>
      </motion.div>
      <motion.div {...pop(0.35)} className="absolute right-[262px] top-[268px] w-[200px] rounded-xl border border-white/10 bg-[#0F131C] p-3 font-mono text-[10.5px] leading-[1.75] text-[#D6DEEB]">
        <div className="text-[#A7B0C2]">debug · request</div>
        <div><K c="#8EA0FF">POST</K> /v1/records</div>
        <AnimatePresence mode="wait">
          {ok ? <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#5BC17F]">201 Created ✓</motion.div>
            : <motion.div key="err" exit={{ opacity: 0 }} className="text-[#F06A6A]">401 invalid_token</motion.div>}
        </AnimatePresence>
      </motion.div>
      <motion.div {...pop(0.5)} className="absolute right-5 top-[268px] w-[220px] rounded-xl bg-white p-3 text-[#151923] shadow-[0_20px_40px_-20px_rgba(0,0,0,.5)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#667085]">Dynamic fields</p>
        <div className="mt-2 space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between rounded-md border border-[#E4E7EC] px-2 py-1"><span>Pipeline</span><span className="text-[#667085]">Sales ▾</span></div>
          <div className="flex items-center justify-between rounded-md border border-[#E4E7EC] px-2 py-1"><span>Owner</span><span className="text-[#667085]">from trigger</span></div>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[10.5px] text-[#3D52DB]"><Check size={11} />OAuth 2.0 connected</p>
      </motion.div>
      <motion.span {...pop(0.65, 8)} className="absolute left-6 top-6 rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10.5px] text-[#A7B0C2]">webhook · record.updated ⚡</motion.span>
      {/* the feature running inside a workflow, in the background */}
      <motion.div {...pop(0.8)} className="absolute bottom-5 right-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[10.5px] text-[#A7B0C2]">
        {['Trigger', 'create-record', 'Notify'].map((s, k) => (
          <span key={s} className="flex items-center gap-2">
            <span className={`rounded-md px-2 py-0.5 ${k === 1 ? 'bg-[#4A5FF0] text-white' : 'bg-white/10'}`}>{s}</span>
            {k < 2 && <span className="relative block h-px w-6 overflow-hidden bg-white/20"><span className="pipe-dot absolute -top-[2px] h-[5px] w-[5px] rounded-full bg-[#8EA0FF]" /></span>}
          </span>
        ))}
      </motion.div>
      <p className="absolute bottom-[58px] right-6 text-[10px] text-[#A7B0C2]/70">Illustrative code, not viaSocket source</p>
    </>
  );
}

function Next() {
  const tools = ['Asana', 'Slack', 'Calendar', 'APIs'];
  return (
    <>
      <motion.div {...pop(0.1)} className="absolute right-6 top-6 w-[320px]">
        <Win title="ai-assistant" dark={false}>
          <div className="space-y-2 p-3 text-[11.5px]">
            <div className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-[#151923] px-3 py-2 text-white">Summarise this meeting and create the tasks</div>
            <motion.div {...pop(0.6, 8)} className="w-fit max-w-[90%] rounded-xl rounded-tl-sm bg-[#EEF1FF] px-3 py-2 text-[#151923]">Found 3 action items. Creating tasks and posting a summary…</motion.div>
          </div>
        </Win>
      </motion.div>
      <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
        {tools.map((_, k) => <path key={k} d={`M 520 300 C 520 ${330 + k * 10}, ${440 + k * 40} 360, ${400 + k * 70} 420`} stroke="#8EA0FF" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="4 5" fill="none" className="flow-dash" />)}
      </svg>
      <motion.div {...pop(0.4)} className="absolute right-[124px] top-[262px] grid h-[72px] w-[72px] place-items-center rounded-2xl bg-[#4A5FF0] font-semibold text-white shadow-[0_0_40px_rgba(74,95,240,.55)]"><span className="ai-pulse">LLM</span></motion.div>
      {tools.map((t, k) => <motion.span key={t} {...pop(0.7 + k * 0.1, 8)} className="absolute rounded-lg border border-white/10 bg-[#0F131C] px-2.5 py-1 text-[11px] text-[#D6DEEB]" style={{ left: 370 + k * 70, top: 424 }}>{t}</motion.span>)}
    </>
  );
}

const SCENES: Record<Scene5, () => React.JSX.Element> = { foundation: Foundation, product: Product, engineering: Engineering, next: Next };

/** Draws a scene at its design size and scales it to the container. */
function Stage({ i }: { i: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
  useIso(() => {
    const el = box.current; if (!el) return;
    const fit = () => setS(Math.min(el.clientWidth / W, el.clientHeight / H));
    fit(); const ro = new ResizeObserver(fit); ro.observe(el); return () => ro.disconnect();
  }, []);
  const c = journey5[i];
  const Scene = SCENES[c.scene];
  return (
    <div ref={box} className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-[radial-gradient(120%_90%_at_70%_0%,#26304A_0%,#1A2030_45%,#151923_100%)]">
      <div aria-hidden className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#EEF1F6_1px,transparent_1px),linear-gradient(90deg,#EEF1F6_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="absolute bottom-0 left-1/2" style={{ width: W, height: H, transform: `translateX(-50%) scale(${s})`, transformOrigin: 'bottom center' }}>
        <AnimatePresence mode="wait">
          <motion.div key={c.id} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
            <Scene />
            <motion.div className={`absolute bottom-0 ${c.scene === 'engineering' ? 'left-2 w-[250px]' : 'left-4 w-[290px]'}`} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease }}>
              <Avatar pose={c.pose} expression={c.expression} outfit={c.outfit} title={`Illustration of Hitesh: ${c.title}`} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
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
              <div className="h-[66vh] max-h-[560px]"><Stage i={active} /></div>
              <ol className="mt-4 grid grid-cols-4 gap-2" aria-label="Chapters">
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
                  <div className="mb-5 aspect-[680/540] lg:hidden"><Stage i={i} /></div>
                  <div className="lg:pl-6">
                    <p data-in className="flex items-center gap-2 font-mono text-sm text-n-accent">{c.num}<span className="inline-flex items-center gap-1 rounded-full bg-n-accentsoft px-2 py-0.5 font-sans text-xs font-medium text-n-accenthover"><Icon size={12} />{c.kind}</span></p>
                    <h3 data-in className="mt-2 text-3xl font-semibold tracking-tight">{c.title}</h3>
                    <p data-in className="mt-1 text-sm font-medium text-n-ink/80">{c.role} · <span className="text-n-muted">{c.org}</span></p>
                    {c.story.map((p, k) => <p key={k} data-in className="mt-4 leading-relaxed text-n-muted">{p}</p>)}
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
