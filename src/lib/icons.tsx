// Brand marks from simple-icons (CC0), imported one by one so only what we use ships.
import {
  siJavascript, siTypescript, siCplusplus, siOpenjdk, siPython, siMysql, siPostgresql, siPrisma, siReact, siNextdotjs,
  siTailwindcss, siRedux, siHtml5, siCss, siNodedotjs, siExpress, siGit, siGithub, siPostman, siGooglegemini, siClaude,
  siAxios, siClerk, siSqlite, siAsana, siGooglecalendar, siJson,
} from 'simple-icons';
import { KeyRound, Webhook, Code2, Workflow, Sparkles, Database, Server, Braces, Bot } from 'lucide-react';

type SI = { path: string; hex: string; title: string };
const BRAND: Record<string, SI> = {
  JavaScript: siJavascript, TypeScript: siTypescript, 'C++': siCplusplus, Java: siOpenjdk, Python: siPython, MySQL: siMysql,
  PostgreSQL: siPostgresql, Prisma: siPrisma, 'Prisma ORM': siPrisma, React: siReact, 'React.js': siReact, 'Next.js': siNextdotjs,
  'Tailwind CSS': siTailwindcss, 'Redux Toolkit': siRedux, HTML: siHtml5, CSS: siCss, 'Node.js': siNodedotjs, 'Express.js': siExpress,
  Express: siExpress, Git: siGit, GitHub: siGithub, Postman: siPostman, 'Gemini API': siGooglegemini, 'Claude Code': siClaude,
  Axios: siAxios, Clerk: siClerk, SQLite: siSqlite, Asana: siAsana, 'Google Calendar': siGooglecalendar, JSON: siJson,
};
const LINE: Record<string, typeof Code2> = {
  'OAuth 2.0': KeyRound, Webhooks: Webhook, 'VS Code': Code2, 'Workflow automation': Workflow, 'AI-assisted development': Bot,
  'LLM-powered apps': Sparkles, SQL: Database, 'REST APIs': Server, 'API integrations': Braces,
};
// a few marks are near-black; lift them on dark backgrounds
const DARKISH = new Set(['000000', '2D3748', '1F2937']);

export function TechIcon({ name, size = 22, dark = false }: { name: string; size?: number; dark?: boolean }) {
  const b = BRAND[name];
  if (b) {
    const fill = DARKISH.has(b.hex) ? (dark ? '#F4F0E6' : '#18201B') : `#${b.hex}`;
    return <svg role="img" aria-label={name} viewBox="0 0 24 24" width={size} height={size} fill={fill}><path d={b.path} /></svg>;
  }
  const L = LINE[name] ?? Code2;
  return <L aria-label={name} size={size} className={dark ? 'text-n-accentdark' : 'text-n-accent'} />;
}
