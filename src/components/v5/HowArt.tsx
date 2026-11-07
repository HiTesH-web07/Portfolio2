'use client';
import { motion } from 'framer-motion';

// Six small animated illustrations for "How I work", drawn in the same indigo style
// as the avatar sheet. Each one shows the quality through work Hitesh actually does.
const A = '#8EA0FF', ACC = '#4A5FF0', OK = '#5BC17F', BAD = '#F97066', FG = '#EEF1F6', MUTED = '#A7B0C2', PANEL = '#1E2540', LINE = 'rgba(142,160,255,.35)';
const ease = [0.22, 1, 0.36, 1] as const;
const inT = (d: number) => ({ initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease } });
const loop = (d = 0, dur = 3) => ({ repeat: Infinity, repeatDelay: 0.6, duration: dur, delay: d, ease: 'easeInOut' as const });

function Panel(p: { x: number; y: number; w: number; h: number; r?: number; glow?: boolean }) {
  return <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={p.r ?? 12} fill={PANEL} stroke={LINE} filter={p.glow ? 'url(#hglow)' : undefined} />;
}
const T = ({ x, y, s = 12, c = FG, w = 500, a = 'start', children }: { x: number; y: number; s?: number; c?: string; w?: number; a?: 'start' | 'middle' | 'end'; children: React.ReactNode }) =>
  <text x={x} y={y} fontSize={s} fill={c} fontWeight={w} textAnchor={a} fontFamily="inherit">{children}</text>;
const Check = ({ x, y, r = 9, d = 0 }: { x: number; y: number; r?: number; d?: number }) => (
  <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: d, type: 'spring', stiffness: 300, damping: 15 }} style={{ originX: `${x}px`, originY: `${y}px` }}>
    <circle cx={x} cy={y} r={r} fill={OK} />
    <path d={`M ${x - r * 0.45} ${y} l ${r * 0.3} ${r * 0.32} l ${r * 0.6} ${-r * 0.62}`} stroke="#0F131C" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </motion.g>
);

function Ownership() {
  const rows = ['Reproduce the failing request', 'Fix the integration', 'Verify against the live API', 'Test edge cases'];
  return (
    <>
      <Panel x={30} y={22} w={250} h={176} glow />
      <T x={48} y={50} s={11} c={MUTED} w={600}>TICKET · WEBHOOK RETRIES</T>
      {rows.map((r, i) => (
        <motion.g key={r} {...inT(0.2 + i * 0.25)}>
          <rect x={48} y={66 + i * 30} width={16} height={16} rx={5} fill="none" stroke={LINE} />
          <Check x={56} y={74 + i * 30} r={8} d={0.5 + i * 0.35} />
          <T x={74} y={78 + i * 30} s={12}>{r}</T>
        </motion.g>
      ))}
      <motion.g {...inT(1.9)}>
        <circle cx={330} cy={110} r={34} fill={ACC} />
        <motion.circle cx={330} cy={110} r={34} fill="none" stroke={A} strokeWidth="2" animate={{ r: [34, 50], opacity: [0.7, 0] }} transition={loop(2.2, 1.8)} />
        <path d="M 316 110 l 9 9 l 18 -19" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <T x={330} y={168} s={11} c={MUTED} a="middle" w={600}>DONE · VERIFIED</T>
      </motion.g>
    </>
  );
}

function ProblemSolving() {
  const parts = [['auth', false], ['payload', false], ['pagination', true]] as const;
  return (
    <>
      <motion.g {...inT(0.1)}>
        <Panel x={140} y={16} w={120} h={44} glow />
        <T x={200} y={43} a="middle" s={13} c={BAD} w={700}>500 error</T>
      </motion.g>
      {parts.map(([p, root], i) => {
        const x = 40 + i * 120;
        return (
          <motion.g key={p} {...inT(0.6 + i * 0.2)}>
            <motion.path d={`M 200 60 C 200 90, ${x + 60} 90, ${x + 60} 122`} stroke={root ? A : LINE} strokeWidth="2" fill="none" strokeDasharray="4 5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }} />
            <rect x={x} y={122} width={120 - 12} height={40} rx={10} fill={root ? 'rgba(74,95,240,.25)' : PANEL} stroke={root ? A : LINE} />
            <T x={x + 54} y={147} a="middle" s={12} c={root ? FG : MUTED} w={root ? 600 : 500}>{p}</T>
          </motion.g>
        );
      })}
      <Check x={340} y={122} r={10} d={2.4} />
      <motion.g initial={{ x: 0, y: 0 }} animate={{ x: [0, 120, 240, 240], y: [0, 0, 0, -6] }} transition={{ duration: 2.2, delay: 1.2, ease: 'easeInOut' }}>
        <circle cx={88} cy={186} r={12} fill="none" stroke={A} strokeWidth="2.5" />
        <path d="M 97 195 l 9 9" stroke={A} strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      <motion.g {...inT(2.6)}><T x={200} y={212} a="middle" s={11} c={MUTED} w={600}>ROOT CAUSE: PAGINATION MISMATCH</T></motion.g>
    </>
  );
}

function Collaboration() {
  const people = [['E', 'Engineering', 80, 60], ['P', 'Product', 320, 60], ['D', 'Design', 200, 180]] as const;
  return (
    <>
      {people.map(([, , x, y], i) => (
        <motion.line key={i} x1={200} y1={105} x2={x} y2={y} stroke={A} strokeOpacity=".5" strokeWidth="2" strokeDasharray="5 6" className="flow-dash" {...inT(0.2 + i * 0.1)} />
      ))}
      <motion.g {...inT(0.1)}>
        <circle cx={200} cy={105} r={28} fill={ACC} filter="url(#hglow)" />
        <T x={200} y={112} a="middle" s={20} w={700} c="#fff">H</T>
      </motion.g>
      {people.map(([k, label, x, y], i) => (
        <motion.g key={k} {...inT(0.4 + i * 0.2)}>
          <circle cx={x} cy={y} r={20} fill={PANEL} stroke={LINE} />
          <T x={x} y={y + 5} a="middle" s={14} w={700} c={A}>{k}</T>
          <T x={x} y={y + (y > 150 ? -28 : 36)} a="middle" s={10.5} c={MUTED} w={600}>{label.toUpperCase()}</T>
        </motion.g>
      ))}
      {[['Shared the context', 16, 150], ['Sprint review', 270, 150]].map(([t, x, y], i) => (
        <motion.g key={t as string} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.95] }} transition={{ ...loop(1 + i * 1.3, 2.6), repeatDelay: 1.4 }}>
          <rect x={x as number} y={y as number} width={(t as string).length * 6.4 + 18} height={24} rx={12} fill="#EEF1FF" />
          <T x={(x as number) + 9} y={(y as number) + 16} s={11} c="#151923" w={600}>{t}</T>
        </motion.g>
      ))}
    </>
  );
}

function Adaptability() {
  const from = ['React', 'Tailwind', 'UI states'], to = ['REST APIs', 'OAuth 2.0', 'Webhooks'];
  return (
    <>
      <T x={90} y={30} a="middle" s={11} c={MUTED} w={600}>FRONTEND</T>
      <T x={310} y={30} a="middle" s={11} c={MUTED} w={600}>INTEGRATIONS</T>
      {from.map((t, i) => (
        <motion.g key={t} {...inT(0.1 + i * 0.12)}>
          <rect x={30} y={46 + i * 52} width={120} height={38} rx={10} fill={PANEL} stroke={LINE} />
          <T x={90} y={70 + i * 52} a="middle" s={12}>{t}</T>
        </motion.g>
      ))}
      {to.map((t, i) => (
        <motion.g key={t} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.2, duration: 0.6, ease }}>
          <rect x={250} y={46 + i * 52} width={120} height={38} rx={10} fill="rgba(74,95,240,.22)" stroke={A} />
          <T x={310} y={70 + i * 52} a="middle" s={12} w={600}>{t}</T>
        </motion.g>
      ))}
      <motion.g {...inT(0.6)}>
        <circle cx={200} cy={117} r={22} fill={ACC} filter="url(#hglow)" />
        <motion.path d="M 190 117 h 18 m -7 -7 l 7 7 l -7 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" animate={{ x: [0, 3, 0] }} transition={loop(0, 1.4)} />
      </motion.g>
    </>
  );
}

function Detail() {
  return (
    <>
      <Panel x={40} y={18} w={320} h={184} glow />
      <T x={60} y={46} s={11} c={MUTED} w={600}>CONNECT AN APP</T>
      <T x={60} y={72} s={11} c={MUTED}>API key</T>
      <rect x={60} y={80} width={280} height={30} rx={8} fill="#0F131C" stroke={LINE} />
      <T x={72} y={100} s={12} c={MUTED}>•••••••••••••••••</T>
      <Check x={322} y={95} r={8} d={0.4} />
      <T x={60} y={132} s={11} c={MUTED}>Webhook URL</T>
      <motion.rect x={60} y={140} width={280} height={30} rx={8} fill="#0F131C" strokeWidth="1.5" animate={{ stroke: [BAD, BAD, OK] }} transition={{ ...loop(0.8, 3.2), times: [0, 0.55, 0.7] }} />
      <T x={72} y={160} s={12}>https://hooks.example.com/</T>
      <motion.g animate={{ opacity: [1, 1, 0] }} transition={{ ...loop(0.8, 3.2), times: [0, 0.55, 0.7] }}>
        <T x={60} y={190} s={11} c={BAD} w={600}>Enter a valid https URL with a path</T>
      </motion.g>
      <motion.g animate={{ x: [0, 150, 150, 0], y: [0, 0, 0, 0] }} transition={{ ...loop(0, 3.2) }}>
        <circle cx={150} cy={152} r={20} fill="rgba(142,160,255,.12)" stroke={A} strokeWidth="2.5" />
        <path d="M 165 167 l 12 12" stroke={A} strokeWidth="3.5" strokeLinecap="round" />
      </motion.g>
    </>
  );
}

function Learning() {
  const steps = ['C++', 'React', 'APIs', 'Agentic AI'];
  return (
    <>
      {steps.map((t, i) => {
        const x = 40 + i * 82, h = 34 + i * 30, y = 196 - h;
        return (
          <motion.g key={t} initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ delay: 0.15 + i * 0.25, duration: 0.6, ease }} style={{ originY: '196px' }}>
            <rect x={x} y={y} width={70} height={h} rx={10} fill={i === 3 ? ACC : PANEL} stroke={i === 3 ? A : LINE} />
            <T x={x + 35} y={y + 24} a="middle" s={12} w={600} c={i === 3 ? '#fff' : FG}>{t}</T>
          </motion.g>
        );
      })}
      <motion.path d="M 75 152 L 157 122 L 239 92 L 321 62" stroke={A} strokeWidth="2.5" fill="none" strokeDasharray="5 6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1, duration: 1 }} />
      <motion.g animate={{ opacity: [0.35, 1, 0.35] }} transition={loop(1.8, 2)}>
        <path d="M 321 20 l 5 11 l 11 5 l -11 5 l -5 11 l -5 -11 l -11 -5 l 11 -5 z" fill={A} />
      </motion.g>
      <T x={30} y={30} s={11} c={MUTED} w={600}>ALWAYS LEARNING</T>
    </>
  );
}

const ART = [Ownership, ProblemSolving, Collaboration, Adaptability, Detail, Learning];

export default function HowArt({ i, className = '' }: { i: number; className?: string }) {
  const Art = ART[i];
  return (
    <svg viewBox="0 0 400 220" className={className} role="img" aria-hidden>
      <defs>
        <filter id="hglow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" result="b" /><feColorMatrix in="b" values="0 0 0 0 0.29  0 0 0 0 0.37  0 0 0 0 0.94  0 0 0 .55 0" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <Art />
    </svg>
  );
}
