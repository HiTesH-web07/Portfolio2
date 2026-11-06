// Content for the v4 site. Facts come from the master resume and Hitesh's own confirmations in chat.
import type { Pose } from './content';

export const v4 = {
  name: 'Hitesh Ahuja',
  role: 'Full-Stack Developer',
  headline: ['I build products and the', 'systems', 'behind them.'],
  description: "I'm a full-stack developer working with React, Next.js and Node.js to build web applications, integrate APIs and develop workflow automation solutions. Currently working on product development and integrations at viaSocket.",
  current: 'Integration Solution Engineer at viaSocket',
  location: 'Indore, India',
  heroTech: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
  email: 'hiteshahuja633@gmail.com',
  linkedin: 'https://linkedin.com/in/hiteshahuja07',
  github: 'https://github.com/HiTesHweb07',
  resume: '/resume/Hitesh_Ahuja_Resume.pdf',
};

export type WorkItem = {
  id: string; name: string; badge: 'Featured' | 'Independent project' | 'Personal project' | 'Internship project';
  description: string; problem: string; implemented: string[]; more?: string[]; stack: string[];
  image: string | null; url?: string; live: string | null; code: string | null; note?: string;
};

export const work: WorkItem[] = [
  {
    id: 'cairn', name: 'Cairn', badge: 'Independent project',
    description: 'A team app that measures the value of work, not the volume: a weekly ranked Priority Stack, quality ratings and disputes, with no activity tracking.',
    problem: 'Teams often reward whoever looks busiest, not whoever finished the most important work well.',
    implemented: ['Express REST API on Node.js with SQLite', 'Single-page frontend in vanilla JavaScript, light and dark themes', 'Ask Cairn: a Gemini helper with a prompt-injection guard'],
    more: ['Slack and Keka through viaSocket, phone alerts through M91', 'Password resets by email', '27 automated API tests'],
    stack: ['Node.js', 'Express', 'SQLite', 'JavaScript', 'Gemini API'],
    image: '/projects/cairn.webp', url: 'proof-of-impact.embarko.app', live: 'https://proof-of-impact.embarko.app', code: 'https://github.com/HiTesH-web07/Cairn'
  },
  {
    id: 'meeting-to-action', name: 'Meeting-to-Action Closer', badge: 'Featured',
    description: 'An AI-powered application that converts meeting discussions into structured, trackable tasks.',
    problem: 'Decisions made in meetings get lost between the transcript and the task tracker.',
    implemented: ['Meeting transcript processing with AI', 'Asana task creation, Slack summaries and status updates', 'Google Calendar and Fireflies integrations'],
    more: ['Role-based access control', 'Duplicate-safe database writes', '47 automated tests'],
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'REST APIs'],
    image: '/projects/mtac.webp', url: 'meeting-to-action-closer.embarko.app', live: 'https://meeting-to-action-closer.embarko.app', code: null
  },
  {
    id: 'kulies', name: 'Kulies', badge: 'Internship project',
    description: 'A B2B2C e-commerce platform. I contributed to the frontend during my Think Debug internship; the product was built by the whole team.',
    problem: 'Shoppers need fast, consistent product, cart and pricing flows on every screen size.',
    implemented: ['Built 15+ responsive React components', 'Integrated 20+ REST APIs with Axios; state with Redux Toolkit and Context API', 'Improved frontend performance by 18%'],
    more: ['Resolved 30+ UI/UX bugs', 'Product listing, cart, wishlist and real-time pricing', 'Six-member development team'],
    stack: ['React.js', 'Redux Toolkit', 'JavaScript', 'Tailwind CSS', 'Node.js'],
    image: null, live: 'https://kulies.com/', code: null, note: 'Screenshot to be added'
  },
  {
    id: 'sensai', name: 'SENSAI · AI Career Coach', badge: 'Personal project',
    description: 'An AI-powered career preparation application.',
    problem: 'Job seekers need focused help with resumes and interview preparation.',
    implemented: ['AI-powered career guidance with the Gemini API', 'Resume and interview preparation features', 'Clerk authentication'],
    more: ['Prisma and PostgreSQL data layer', 'Modular API architecture: one REST route per feature', '35% faster load after the refactor'],
    stack: ['Next.js', 'React', 'Gemini API', 'Clerk', 'Prisma', 'PostgreSQL'],
    image: null, live: null, code: null, note: 'Screenshot to be added'
  },
];

export type Chapter4 = { id: string; num: string; title: string; where: string; paras: string[]; scene: 'study' | 'product' | 'systems' | 'ai'; pose: Pose; expression: 'smile' | 'joy' | 'focus' | 'curious' | 'calm' | 'puzzled'; objects: string[] };

export const journey4: Chapter4[] = [
  { id: 'learn', num: '01', title: 'Learning to Build', where: 'Medi-Caps University · B.Tech CSE', scene: 'study', pose: 'laptop', expression: 'focus',
    paras: ['I started with C and C++ and spent most of my practice on data structures and algorithms.', 'Then I moved to the web: small React and Next.js apps to understand components, state and routing. I graduated in 2026 with a CGPA of 7.92.'],
    objects: ['C++', 'DSA', 'Web Dev'] },
  { id: 'products', num: '02', title: 'Building Real Products', where: 'Think Debug internship · Kulies', scene: 'product', pose: 'think', expression: 'focus',
    paras: ['My internship at Think Debug was my first real codebase: Kulies, a B2B2C e-commerce app, with a six-member team shipping every week.', 'I built React components, wired REST APIs and fixed UI issues, and learned to measure performance before optimising.'],
    objects: ['React components', 'REST APIs', 'Product cards'] },
  { id: 'systems', num: '03', title: 'Understanding Systems', where: 'Walkover · viaSocket', scene: 'systems', pose: 'explore', expression: 'curious',
    paras: ['As an Integration Solution Engineer I work on product development and integrations for viaSocket, a no-code automation platform.', 'I build integration modules and workflows: OAuth 2.0, webhooks, pagination and data mapping, and I debug APIs against live endpoints.'],
    objects: ['OAuth 2.0', 'Webhooks', 'Trigger → Action'] },
  { id: 'next', num: '04', title: "Exploring What's Next", where: 'AI, automation and modern tech', scene: 'ai', pose: 'celebrate', expression: 'joy',
    paras: ['I use AI in my products and in my daily workflow, and I am learning how AI agents plan and call tools and APIs.', 'Next: building larger products where intelligent automation does real work.'],
    objects: ['Gemini API', 'AI agents', 'Automation'] },
];

export const experience4 = [
  {
    id: 'viasocket', company: 'viaSocket', parent: 'Walkover Web Solution', role: 'Integration Solution Engineer', when: 'May 2026 – Present', where: 'Indore · On-site', mark: 'v',
    highlights: ['Product development across React, Next.js and Node.js', 'Built and maintained 100+ API integration modules', 'OAuth 2.0, API keys, webhooks, pagination and JSON data mapping'],
    more: ['Dynamic forms with field validation and clear error handling', 'Workflow automation', 'API debugging and error handling against live endpoints', 'Collaboration with engineering, product and design teams'],
    stack: ['Next.js', 'React', 'Node.js', 'JavaScript', 'REST APIs', 'OAuth 2.0', 'Postman', 'Git'],
  },
  {
    id: 'thinkdebug', company: 'Think Debug', parent: 'Internship · Kulies', role: 'Frontend Developer Intern', when: 'Feb 2025 – Apr 2025', where: 'Indore · On-site · Internship', mark: 't',
    highlights: ['Built 15+ responsive React components', 'Integrated 20+ REST APIs and improved performance by 18%', 'Fixed 30+ UI/UX bugs on the Kulies platform'],
    more: ['Six-member development team, weekly sprints and code reviews'],
    stack: ['React', 'Redux Toolkit', 'JavaScript', 'Tailwind CSS', 'Axios', 'Git'],
  },
];

export const skills4: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'C++', 'Java', 'Python', 'SQL'] },
  { group: 'Frontend', items: ['React.js', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'HTML', 'CSS'] },
  { group: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs'] },
  { group: 'Database', items: ['PostgreSQL', 'MySQL', 'Prisma ORM'] },
  { group: 'API integrations', items: ['OAuth 2.0', 'Webhooks', 'Axios', 'Postman', 'API integrations'] },
  { group: 'AI & automation', items: ['Gemini API', 'LLM-powered apps', 'Workflow automation', 'AI-assisted development'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Claude Code'] },
];
export const exploring4 = ['AI agents (Agentic AI)', 'Multi-step tool-calling workflows', 'Comparing LLMs with OpenRouter'];

export const certs4: { name: string; issuer: string | null; year: string | null; file?: string }[] = [
  { name: 'IBM DevOps Foundation', issuer: 'IBM', year: '2026' },
  { name: 'IBM Agentic AI', issuer: 'IBM', year: '2026' },
  { name: 'IBM Generative AI', issuer: 'IBM', year: '2026' },
  { name: 'Cisco CCNA', issuer: 'Cisco', year: '2025' },
  { name: 'C / C++ Programming', issuer: null, year: null },
  { name: 'Java and Advanced Java', issuer: null, year: null },
];

export const problem4 = {
  title: 'I enjoy solving problems.',
  text: 'I regularly practise Data Structures and Algorithms and solve coding challenges on LeetCode. I enjoy breaking down complex problems, exploring different approaches and finding efficient solutions.',
  tags: ['Data Structures & Algorithms', 'LeetCode', 'C++'],
  code: ['#include <bits/stdc++.h>', 'using namespace std;', '', 'int main() {', '  // break it down, then solve', '  vector<int> a = {2, 7, 11, 15};', '  return 0;', '}'],
};

export const nav4 = [
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'problems', label: 'Problems' },
  { id: 'ask', label: 'Ask Hitesh' },
];
