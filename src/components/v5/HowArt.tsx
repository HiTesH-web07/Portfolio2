'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Looping illustrations for "How I work". Each quality has two short scenes ("beats"),
// one for each of its "In practice" examples, and they alternate while the card is visible.
const A = '#8EA0FF', ACC = '#4A5FF0', OK = '#5BC17F', BAD = '#F97066', WARN = '#F2C14E', FG = '#EEF1F6', MUTED = '#A7B0C2', PANEL = '#1E2540', LINE = 'rgba(142,160,255,.35)';
const STEPS = 10; // steps per beat
const TICK = 480; // ms per step
const spring = { type: 'spring', stiffness: 170, damping: 20 } as const;

type S = { s: number }; // current step inside the beat, 0..STEPS-1

const T = ({ x, y, s = 12, c = FG, w = 500, a = 'start', children }: { x: number; y: number; s?: number; c?: string; w?: number; a?: 'start' | 'middle' | 'end'; children: React.ReactNode }) =>
  <text x={x} y={y} fontSize={s} fill={c} fontWeight={w} textAnchor={a} fontFamily="inherit">{children}</text>;
const Tick = ({ x, y, on, r = 8 }: { x: number; y: number; on: boolean; r?: number }) => (
  <g opacity={on ? 1 : 0} style={{ transition: 'opacity .3s' }}>
    <circle cx={x} cy={y} r={r} fill={OK} />
    <path d={`M ${x - r * 0.45} ${y} l ${r * 0.3} ${r * 0.32} l ${r * 0.6} ${-r * 0.62}`} stroke="#0F131C" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);
const Pill = ({ x, y, text, color, dark = false }: { x: number; y: number; text: string; color: string; dark?: boolean }) => (
  <g>
    <rect x={x} y={y} width={text.length * 6.6 + 22} height={24} rx={12} fill={color} opacity={dark ? 1 : 0.18} />
    <T x={x + 11} y={y + 16} s={11.5} w={700} c={dark ? '#0F131C' : color}>{text}</T>
  </g>
);

// ---------- 01 Ownership ----------
function OwnA({ s }: S) {
  const nodes = ['Failing request', 'Debug', 'Fix', 'Live API'];
  const at = Math.min(3, Math.floor(s / 2));
  const xs = [55, 150, 250, 345];
  return (
    <>
      <T x={30} y={36} s={11} c={MUTED} w={600}>POST /v1/contacts/sync</T>
      <line x1={xs[0]} y1={100} x2={xs[3]} y2={100} stroke={LINE} strokeWidth="2" strokeDasharray="5 6" />
      <motion.line x1={xs[0]} y1={100} y2={100} stroke={A} strokeWidth="2.5" animate={{ x2: xs[at] }} transition={spring} />
      {nodes.map((n, i) => (
        <g key={n}>
          <circle cx={xs[i]} cy={100} r={16} fill={i <= at ? ACC : PANEL} stroke={i <= at ? A : LINE} style={{ transition: 'fill .3s' }} />
          <T x={xs[i]} y={105} a="middle" s={12} w={700} c="#fff">{i + 1}</T>
          <T x={xs[i]} y={136} a="middle" s={11} c={i <= at ? FG : MUTED} w={600}>{n}</T>
        </g>
      ))}
      <motion.circle r={6} cy={100} fill="#fff" animate={{ cx: xs[at] }} transition={spring} />
      {s < 7 ? <Pill x={130} y={160} text="401 Unauthorized" color={BAD} /> : <Pill x={120} y={160} text="200 OK · verified live" color={OK} />}
    </>
  );
}
function OwnB({ s }: S) {
  const cases = ['Empty input', 'Expired token', 'Page 2+ results', 'Rate limit (429)'];
  return (
    <>
      <rect x={30} y={22} width={340} height={150} rx={12} fill={PANEL} stroke={LINE} />
      <T x={48} y={46} s={11} c={MUTED} w={600}>EDGE CASES BEFORE HANDOFF</T>
      {cases.map((c, i) => {
        const done = s > i * 2 + 1, running = !done && s >= i * 2;
        return (
          <g key={c}>
            <rect x={48} y={58 + i * 27} width={16} height={16} rx={5} fill="none" stroke={running ? A : LINE} />
            {running && <motion.circle cx={56} cy={66 + i * 27} r={4} fill={A} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 0.8 }} />}
            <Tick x={56} y={66 + i * 27} on={done} />
            <T x={74} y={71 + i * 27} s={12.5} c={done || running ? FG : MUTED}>{c}</T>
            <T x={350} y={71 + i * 27} a="end" s={11} c={done ? OK : MUTED} w={600}>{done ? 'pass' : running ? 'testing…' : ''}</T>
          </g>
        );
      })}
      {s >= 8 && <Pill x={118} y={184} text="Ready to hand over ✓" color={OK} dark />}
    </>
  );
}

// ---------- 02 Problem solving ----------
function PsA({ s }: S) {
  const arr = [1, 3, 4, 6, 8, 11], target = 10;
  const seq: [number, number][] = [[0, 5], [0, 4], [1, 4], [1, 3], [2, 3]];
  const k = Math.min(seq.length - 1, Math.floor(s / 2));
  const [i, j] = seq[k];
  const sum = arr[i] + arr[j], found = sum === target;
  const cx = (n: number) => 62 + n * 56;
  return (
    <>
      <T x={30} y={36} s={11} c={MUTED} w={600}>two_pointers.cpp · O(n) · target = {target}</T>
      {arr.map((v, n) => (
        <g key={n}>
          <rect x={cx(n) - 22} y={74} width={44} height={44} rx={10} fill={(n === i || n === j) ? (found ? 'rgba(91,193,127,.25)' : 'rgba(74,95,240,.3)') : PANEL} stroke={(n === i || n === j) ? (found ? OK : A) : LINE} style={{ transition: 'all .3s' }} />
          <T x={cx(n)} y={101} a="middle" s={15} w={700}>{v}</T>
        </g>
      ))}
      <motion.g animate={{ x: cx(i) }} transition={spring}><path d="M 0 132 l -7 10 h 14 z" fill={A} /><T x={0} y={158} a="middle" s={12} w={700} c={A}>i</T></motion.g>
      <motion.g animate={{ x: cx(j) }} transition={spring}><path d="M 0 132 l -7 10 h 14 z" fill={WARN} /><T x={0} y={158} a="middle" s={12} w={700} c={WARN}>j</T></motion.g>
      <T x={200} y={196} a="middle" s={13} w={700} c={found ? OK : FG}>{arr[i]} + {arr[j]} = {sum} {found ? '✓ found' : sum > target ? '> target, move j' : '< target, move i'}</T>
    </>
  );
}
function PsB({ s }: S) {
  const lines = [['200', 'GET /contacts?page=1', '50 items', OK], ['200', 'GET /contacts?page=2', 'same 50 items', WARN], ['500', 'GET /contacts?page=3', 'server error', BAD]] as const;
  const at = Math.min(2, Math.floor(s / 2));
  return (
    <>
      <rect x={24} y={20} width={352} height={112} rx={12} fill="#0F131C" stroke={LINE} />
      {lines.map(([c, path, note, col], n) => (
        <g key={n} opacity={n <= at || s >= 6 ? 1 : 0.35} style={{ transition: 'opacity .3s' }}>
          {s >= 6 && n === 1 && <rect x={30} y={36 + n * 30} width={340} height={26} rx={6} fill="rgba(242,193,78,.15)" stroke={WARN} />}
          <T x={40} y={54 + n * 30} s={12} w={700} c={col}>{c}</T>
          <T x={72} y={54 + n * 30} s={12} c={FG}>{path}</T>
          <T x={360} y={54 + n * 30} a="end" s={11} c={col}>{note}</T>
        </g>
      ))}
      <motion.g animate={{ y: (s >= 6 ? 1 : at) * 30 }} transition={spring}>
        <circle cx={330} cy={49} r={13} fill="rgba(142,160,255,.12)" stroke={A} strokeWidth="2.5" />
        <path d="M 340 59 l 8 8" stroke={A} strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      {s >= 6 && s < 8 && <Pill x={74} y={152} text="Root cause: next-page cursor ignored" color={WARN} />}
      {s >= 8 && <Pill x={92} y={152} text="Fixed ✓ every page returns new items" color={OK} />}
    </>
  );
}

// ---------- 03 Collaboration ----------
function CoA({ s }: S) {
  const col = s < 3 ? 0 : s < 6 ? 1 : 2;
  const cols = ['To do', 'In review', 'Done'];
  return (
    <>
      <T x={30} y={34} s={11} c={MUTED} w={600}>THINK DEBUG · WEEKLY SPRINT · TEAM OF 6</T>
      {[0, 1, 2, 3, 4, 5].map((k) => <circle key={k} cx={300 + k * 13} cy={30} r={8} fill={k === 2 ? ACC : PANEL} stroke={k === 2 ? A : LINE} />)}
      {cols.map((c, k) => (
        <g key={c}>
          <rect x={30 + k * 116} y={50} width={106} height={128} rx={10} fill={PANEL} stroke={k === col ? A : LINE} style={{ transition: 'stroke .3s' }} />
          <T x={42 + k * 116} y={70} s={11} c={MUTED} w={600}>{c.toUpperCase()}</T>
        </g>
      ))}
      <motion.g animate={{ x: col * 116 }} transition={spring}>
        <rect x={40} y={84} width={86} height={50} rx={8} fill="#EEF1FF" />
        <T x={48} y={103} s={11} c="#151923" w={700}>Product filters</T>
        <T x={48} y={122} s={10} c="#475467">React · API</T>
      </motion.g>
      {s >= 4 && s < 6 && <Pill x={150} y={186} text="Code review: 2 comments" color={WARN} />}
      {s >= 6 && <Pill x={160} y={186} text="Approved & merged ✓" color={OK} />}
    </>
  );
}
function CoB({ s }: S) {
  const P = { E: [70, 70], P: [330, 70], D: [200, 190], H: [200, 112] } as const;
  const beats = [['P', 'H', 'Requirement'], ['D', 'H', 'Wireframes'], ['H', 'E', 'Pull request']] as const;
  const k = Math.min(2, Math.floor(s / 3.4));
  const [from, to, label] = beats[k];
  const prog = (s % 3.4) / 3.4;
  const [x1, y1] = P[from], [x2, y2] = P[to];
  return (
    <>
      {(['E', 'P', 'D'] as const).map((n) => <line key={n} x1={P.H[0]} y1={P.H[1]} x2={P[n][0]} y2={P[n][1]} stroke={LINE} strokeWidth="2" strokeDasharray="5 6" />)}
      {([['E', 'Engineering'], ['P', 'Product'], ['D', 'Design']] as const).map(([n, l]) => (
        <g key={n}>
          <circle cx={P[n][0]} cy={P[n][1]} r={20} fill={n === from || n === to ? ACC : PANEL} stroke={n === from || n === to ? A : LINE} style={{ transition: 'fill .3s' }} />
          <T x={P[n][0]} y={P[n][1] + 5} a="middle" s={14} w={700} c="#fff">{n}</T>
          <T x={P[n][0] + (n === 'D' ? 30 : 0)} y={P[n][1] + (n === 'D' ? 5 : -28)} a={n === 'D' ? 'start' : 'middle'} s={10.5} c={MUTED} w={600}>{l.toUpperCase()}</T>
        </g>
      ))}
      <circle cx={P.H[0]} cy={P.H[1]} r={24} fill={ACC} stroke={A} strokeWidth="2" />
      <T x={200} y={119} a="middle" s={18} w={700} c="#fff">H</T>
      <circle cx={x1 + (x2 - x1) * prog} cy={y1 + (y2 - y1) * prog} r={6} fill="#fff" style={{ transition: `cx ${TICK}ms linear, cy ${TICK}ms linear` }} />
      <Pill x={k === 2 ? 46 : 248} y={k === 2 ? 150 : 150} text={label} color={A} />
    </>
  );
}

// ---------- 04 Adaptability ----------
function AdA({ s }: S) {
  const learned = ['REST APIs', 'OAuth 2.0', 'Webhooks', 'Pagination'];
  const n = Math.min(4, Math.floor((s + 1) / 2));
  return (
    <>
      <rect x={24} y={46} width={130} height={130} rx={12} fill={PANEL} stroke={LINE} />
      <T x={89} y={36} a="middle" s={11} c={MUTED} w={600}>FRONTEND</T>
      {['React', 'Redux', 'Tailwind'].map((t, k) => <g key={t}><rect x={38} y={60 + k * 36} width={102} height={26} rx={7} fill="#0F131C" stroke={LINE} /><T x={89} y={77 + k * 36} a="middle" s={11.5}>{t}</T></g>)}
      <rect x={246} y={46} width={130} height={130} rx={12} fill="rgba(74,95,240,.15)" stroke={A} />
      <T x={311} y={36} a="middle" s={11} c={MUTED} w={600}>INTEGRATIONS</T>
      {learned.map((t, k) => (
        <motion.g key={t} initial={false} animate={{ opacity: k < n ? 1 : 0, x: k < n ? 0 : -60 }} transition={spring}>
          <rect x={260} y={56 + k * 29} width={102} height={23} rx={7} fill={ACC} />
          <T x={311} y={72 + k * 29} a="middle" s={11.5} w={600} c="#fff">{t}</T>
        </motion.g>
      ))}
      <path d="M 160 111 C 190 80, 215 80, 240 111" stroke={A} strokeWidth="2" fill="none" strokeDasharray="5 6" className="flow-dash" />
      <motion.circle r={6} fill="#fff" animate={{ cx: [160, 200, 240], cy: [111, 88, 111] }} transition={{ duration: TICK * 2 / 1000, repeat: Infinity, ease: 'linear' }} />
      <T x={200} y={204} a="middle" s={11.5} c={MUTED} w={600}>Think Debug → viaSocket</T>
    </>
  );
}
function AdB({ s }: S) {
  const boxes = [['App', 'redirect'], ['Authorize', 'code'], ['Token', 'access_token'], ['API', '200 OK']];
  const at = Math.min(3, Math.floor(s / 2));
  const xs = [52, 148, 252, 348];
  return (
    <>
      <T x={30} y={34} s={11} c={MUTED} w={600}>OAUTH 2.0 FLOW</T>
      {boxes.map(([b, sub], k) => (
        <g key={b}>
          <rect x={xs[k] - 42} y={54} width={84} height={44} rx={10} fill={k <= at ? 'rgba(74,95,240,.3)' : PANEL} stroke={k <= at ? A : LINE} style={{ transition: 'all .3s' }} />
          <T x={xs[k]} y={81} a="middle" s={12} w={700}>{b}</T>
          <T x={xs[k]} y={116} a="middle" s={10.5} c={k <= at ? A : MUTED} w={600}>{sub}</T>
          {k < 3 && <line x1={xs[k] + 42} y1={76} x2={xs[k + 1] - 42} y2={76} stroke={LINE} strokeWidth="2" />}
        </g>
      ))}
      <motion.circle r={5} cy={76} fill="#fff" animate={{ cx: xs[at] }} transition={spring} />
      <T x={30} y={150} s={11} c={MUTED} w={600}>WEBHOOK</T>
      <rect x={30} y={160} width={340} height={34} rx={10} fill="#0F131C" stroke={s >= 8 ? OK : LINE} style={{ transition: 'stroke .3s' }} />
      <T x={44} y={182} s={12}>POST /webhook  {'{'} event: "contact.created" {'}'}</T>
      {s >= 8 && <T x={356} y={182} a="end" s={11} w={700} c={OK}>received</T>}
    </>
  );
}

// ---------- 05 Attention to detail ----------
function DeA({ s }: S) {
  const full = 'https://hooks.example.com', fixed = 'https://hooks.example.com/webhook';
  const typed = s < 5 ? full.slice(0, Math.round((full.length * (s + 1)) / 5)) : s < 7 ? full : fixed;
  const state = s < 5 ? 'typing' : s < 7 ? 'error' : 'ok';
  const stroke = state === 'error' ? BAD : state === 'ok' ? OK : A;
  return (
    <>
      <rect x={30} y={22} width={340} height={172} rx={12} fill={PANEL} stroke={LINE} />
      <T x={50} y={48} s={11} c={MUTED} w={600}>DYNAMIC INPUT FIELDS</T>
      <T x={50} y={74} s={11} c={MUTED}>Webhook URL</T>
      <rect x={50} y={82} width={300} height={34} rx={8} fill="#0F131C" stroke={stroke} strokeWidth="1.5" style={{ transition: 'stroke .3s' }} />
      <T x={62} y={104} s={12.5}>{typed}{state === 'typing' ? '|' : ''}</T>
      <Tick x={332} y={99} on={state === 'ok'} />
      {state === 'error' && <T x={50} y={138} s={11.5} c={BAD} w={600}>Add a path, for example /webhook</T>}
      {state === 'ok' && <T x={50} y={138} s={11.5} c={OK} w={600}>Looks good</T>}
      <rect x={50} y={152} width={90} height={28} rx={8} fill={state === 'ok' ? ACC : '#2B3245'} style={{ transition: 'fill .3s' }} />
      <T x={95} y={171} a="middle" s={12} w={700} c={state === 'ok' ? '#fff' : MUTED}>Save</T>
    </>
  );
}
function DeB({ s }: S) {
  const fixedN = Math.min(30, Math.round(((s + 1) / 8) * 30));
  return (
    <>
      <T x={30} y={36} s={11} c={MUTED} w={600}>KULIES · UI/UX DEFECTS</T>
      {Array.from({ length: 30 }, (_, k) => (
        <rect key={k} x={30 + (k % 10) * 24} y={54 + Math.floor(k / 10) * 30} width={18} height={18} rx={5} fill={k < fixedN ? OK : BAD} opacity={k < fixedN ? 0.9 : 0.55} style={{ transition: 'fill .3s, opacity .3s' }} />
      ))}
      <T x={300} y={92} a="middle" s={34} w={800} c={FG}>{fixedN}{fixedN >= 30 ? '+' : ''}</T>
      <T x={300} y={114} a="middle" s={11} c={MUTED} w={600}>FIXED</T>
      <T x={30} y={170} s={11.5} c={MUTED}>Spacing · alignment · states · responsive breakpoints</T>
      {s >= 8 && <Pill x={30} y={182} text="30+ defects fixed ✓" color={OK} />}
    </>
  );
}

// ---------- 06 Continuous learning ----------
function LeA({ s }: S) {
  const certs = ['Generative AI', 'Agentic AI'];
  return (
    <>
      <T x={30} y={36} s={11} c={MUTED} w={600}>IBM COURSES · 2026</T>
      {certs.map((c, k) => {
        const p = Math.max(0, Math.min(1, (s - k * 3 + 1) / 5));
        return (
          <g key={c}>
            <rect x={30} y={52 + k * 66} width={340} height={56} rx={12} fill={PANEL} stroke={p >= 1 ? OK : LINE} style={{ transition: 'stroke .3s' }} />
            <T x={48} y={76 + k * 66} s={13} w={700}>IBM · {c}</T>
            <rect x={48} y={86 + k * 66} width={250} height={8} rx={4} fill="#2B3245" />
            <rect x={48} y={86 + k * 66} width={250 * p} height={8} rx={4} fill={p >= 1 ? OK : A} style={{ transition: `width ${TICK}ms linear` }} />
            <T x={354} y={93 + k * 66} a="end" s={11} w={700} c={p >= 1 ? OK : MUTED}>{p >= 1 ? 'Done ✓' : `${Math.round(p * 100)}%`}</T>
          </g>
        );
      })}
    </>
  );
}
function LeB({ s }: S) {
  const prods = ['Cairn', 'Meeting-to-Action Closer', 'SENSAI'];
  return (
    <>
      <T x={30} y={36} s={11} c={MUTED} w={600}>BUILDING MY OWN PRODUCTS</T>
      {prods.map((p, k) => {
        const shown = s >= k * 2, built = s >= k * 2 + 2;
        return (
          <motion.g key={p} initial={false} animate={{ opacity: shown ? 1 : 0, x: shown ? 0 : 30 }} transition={spring}>
            <rect x={30} y={50 + k * 50} width={340} height={40} rx={10} fill={PANEL} stroke={built ? A : LINE} />
            <circle cx={52} cy={70 + k * 50} r={8} fill={ACC} />
            <T x={70} y={75 + k * 50} s={13} w={600}>{p}</T>
            <T x={354} y={75 + k * 50} a="end" s={11} w={700} c={built ? OK : MUTED}>{built ? 'built ✓' : 'building…'}</T>
          </motion.g>
        );
      })}
    </>
  );
}

export const ART_BEATS: [(p: S) => React.JSX.Element, (p: S) => React.JSX.Element][] = [[OwnA, OwnB], [PsA, PsB], [CoA, CoB], [AdA, AdB], [DeA, DeB], [LeA, LeB]];

/** Plays the two scenes of quality `i` in a loop while visible. Reports which example is showing. */
export default function HowArt({ i, className = '', onBeat }: { i: number; className?: string; onBeat?: (b: number) => void }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  useEffect(() => { setT(0); }, [i]);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setT((x) => x + 1), TICK);
    return () => clearInterval(id);
  }, [inView, reduce]);
  const beat = reduce ? 0 : Math.floor(t / STEPS) % 2;
  const s = reduce ? STEPS - 1 : t % STEPS;
  useEffect(() => { onBeat?.(beat); }, [beat, onBeat]);
  const Scene = ART_BEATS[i][beat];
  return (
    <svg ref={ref} viewBox="0 0 400 220" className={className} role="img" aria-hidden>
      <motion.g key={`${i}-${beat}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <Scene s={s} />
      </motion.g>
    </svg>
  );
}
