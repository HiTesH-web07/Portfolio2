// Content for the v4 site. Facts come from the master resume and Hitesh's own confirmations in chat.
import type { Pose } from './content';

export const v4 = {
  name: 'Hitesh Ahuja',
  role: 'Full-Stack Developer',
  headline: ['I build products and the', 'systems', 'behind them.'],
  intro: "Hey, I'm Hitesh Ahuja 👋",
  identity: ['Full-Stack Developer', '2026 CSE Graduate', 'Indore, India'],
  description: 'I enjoy turning ideas into real-world products through thoughtful engineering. From building web applications to developing product features and API integrations, I love solving problems and figuring out how things work under the hood. Currently contributing to product development at viaSocket.',
  current: 'Integration Solution Engineer at viaSocket',
  location: 'Indore, India',
  heroTech: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
  email: 'hiteshahuja633@gmail.com',
  linkedin: 'https://linkedin.com/in/hiteshahuja07',
  github: 'https://github.com/HiTesHweb07',
  resume: '/resume/Hitesh_Ahuja_Resume.pdf',
};

export type WorkItem = {
  layers?: { label: string; items: string[] }[];
  id: string; name: string; badge: 'Featured' | 'Full-stack project' | 'Independent project' | 'Personal project' | 'Internship project';
  description: string; problem: string; implemented: string[]; more?: string[]; stack: string[];
  image: string | null; url?: string; live: string | null; code: string | null; note?: string;
};

export const work: WorkItem[] = [
  {
    id: 'cairn', name: 'Cairn', badge: 'Full-stack project',
    description: 'A team app that measures the value of work, not the volume: a weekly ranked Priority Stack, quality ratings and disputes, with no activity tracking.',
    problem: 'Teams often reward whoever looks busiest, not whoever finished the most important work well.',
    implemented: ['Full-stack Next.js app: React pages and a REST API on Next.js route handlers (Node.js) with SQLite', 'Light and dark themes, reduced motion and accessible contrast on every screen', 'Ask Cairn: an AI chatbot (Gemini) that answers questions about your week, score and team, grounded in your own data, with a prompt-injection guard and rate limits'],
    more: ['Slack and Keka through viaSocket, phone alerts through M91', 'Password resets by email', '27 automated API tests'],
    stack: ['Next.js', 'React', 'Node.js', 'SQLite', 'Gemini API'],
    layers: [
      { label: 'Frontend', items: ['Next.js', 'React', 'JavaScript'] },
      { label: 'Backend', items: ['Next.js', 'Node.js', 'REST APIs'] },
      { label: 'Database', items: ['SQLite'] },
      { label: 'AI chatbot & integrations', items: ['Gemini API', 'viaSocket', 'Slack'] },
    ],
    image: '/projects/cairn.webp', url: 'proof-of-impact.embarko.app', live: 'https://proof-of-impact.embarko.app', code: 'https://github.com/HiTesH-web07/Cairn'
  },
  {
    id: 'meeting-to-action', name: 'Meeting-to-Action Closer', badge: 'Full-stack project',
    description: 'An agentic AI application that turns meeting discussions into structured, trackable tasks. It decides what was agreed, who owns it and when it is due, and when something is unclear it asks the person involved instead of guessing.',
    problem: 'Decisions made in meetings get lost between the transcript and the task tracker.',
    implemented: ['Agentic decision-making: an AI agent reads the transcript and decides which items are real decisions, who owns each one and the due date', 'Asks before it acts: when an owner or deadline is unclear, it messages the person involved in Slack and waits for their answer', 'Asana task creation, Slack summaries and status updates synced back to Asana', 'Google Calendar and Fireflies integrations'],
    more: ['Role-based access control', 'Duplicate-safe database writes', '47 automated tests'],
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'REST APIs'],
    layers: [
      { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript'] },
      { label: 'Backend', items: ['Next.js', 'REST APIs', 'Prisma'] },
      { label: 'Database', items: ['PostgreSQL'] },
      { label: 'AI agent', items: ['Agentic AI', 'Human-in-the-loop'] },
      { label: 'Integrations', items: ['Asana', 'Slack', 'Google Calendar', 'Fireflies'] },
    ],
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
    id: 'viasocket', company: 'Walkover Web Solution', parent: 'Product: viaSocket', role: 'Integration Solution Engineer', when: 'May 2026 – Present', where: 'Indore · On-site', mark: 'W',
    summary: "I contribute to the development and evolution of viaSocket, a no-code automation platform that helps businesses connect their apps and automate workflows. My work spans product feature development, frontend and backend engineering, and building integrations that expand the platform's capabilities.",
    stats: [
      { value: 2200, suffix: '+', label: 'SaaS applications', note: 'Connected through the viaSocket ecosystem' },
      { value: 100, suffix: '+', label: 'Integration modules', note: 'Built and maintained by me' },
    ],
    listTitle: 'What I contribute to',
    highlights: [
      "Developing and improving viaSocket's automation platform and product features.",
      'Building frontend functionality using React and Next.js.',
      'Developing backend functionality using Node.js.',
      'Expanding platform connectivity through integration modules.',
      'Implementing authentication, webhooks, pagination and data mapping.',
      'Debugging and collaborating with engineering, product and design teams.',
    ],
    more: [] as string[],
    stack: ['React', 'Next.js', 'Node.js', 'JavaScript', 'REST APIs', 'OAuth 2.0', 'Postman'],
  },
  {
    id: 'thinkdebug', company: 'Think Debug', parent: 'Internship · Product: Kulies', role: 'Frontend Developer Intern', when: 'Feb 2025 – Apr 2025', where: 'Indore · On-site · Internship', mark: 'T',
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
  { id: 'journey', label: 'Journey' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'how', label: 'How I Work' },
  { id: 'ask', label: 'Ask Hitesh' },
  { id: 'contact', label: 'Contact' },
];

// ---------- v5: Journey of a Builder (Hitesh's own chapter text) ----------
export type Scene5 = 'foundation' | 'product' | 'engineering' | 'next';
export const journey5: { id: string; num: string; title: string; org: string; role: string; kind: string; story: string[]; meta?: string; points?: string[]; scene: Scene5; pose: Pose; expression: 'smile' | 'joy' | 'focus' | 'curious' | 'calm'; outfit: 'student' | 'intern' | 'engineer' | 'jacket'; closing?: string; link?: { href: string; label: string } }[] = [
  {
    id: 'foundation', num: '01', title: 'The Foundation', org: 'Medi-Caps University', role: 'B.Tech in Computer Science', kind: 'Education',
    scene: 'foundation', pose: 'laptop', expression: 'focus', outfit: 'student',
    story: ['My journey began at Medi-Caps University, where I built a strong foundation in Computer Science through academics, programming, data structures, algorithms, database management and software engineering. Along the way, I explored different areas of technology, strengthened my problem-solving skills and developed an interest in building applications through web development and modern frameworks.'],
    meta: 'B.Tech in Computer Science · CGPA: 7.92/10 · 2022–2026',
  },
  {
    id: 'product', num: '02', title: 'My First Real Product', org: 'Think Debug · Kulies', role: 'Frontend Developer Intern', kind: 'Internship',
    scene: 'product', pose: 'laptop', expression: 'smile', outfit: 'intern',
    story: ['At Think Debug, I got my first professional experience working on a real product: Kulies, a B2B2C e-commerce platform. I contributed React components, integrated REST APIs and worked on improving the user experience alongside a development team.'],
    points: ['Responsive React components', 'REST APIs integrated with Axios', 'Redux Toolkit and Context API', 'UI/UX fixes and performance improvements'],
  },
  {
    id: 'engineering', num: '03', title: 'Building the Product', org: 'Walkover Web Solution · viaSocket', role: 'Integration Solution Engineer', kind: 'Current role',
    scene: 'engineering', pose: 'think', expression: 'focus', outfit: 'engineer',
    story: [
      'At Walkover, I work on viaSocket, building product features with React and Node.js and integration modules that connect the platform with **500+ SaaS applications**.',
      'Alongside product work, I explore AI-driven engineering: AI agents, AI development tools and Claude skills.',
    ],
    link: { href: '#experience', label: 'See my full experience' },
  },
  {
    id: 'next', num: '04', title: "Building What's Next", org: 'AI · Automation · Product Engineering', role: 'Exploring', kind: 'Now',
    scene: 'next', pose: 'explore', expression: 'curious', outfit: 'jacket',
    story: ["I'm increasingly interested in the intersection of software engineering and AI. I explore LLM-powered applications, AI agents and intelligent automation, while building products that solve practical problems."],
    closing: 'Still learning. Still building. Just getting started.',
  },
];

// ---------- v5: How I Work ----------
export const howIWork = {
  title: 'Good engineering is more than writing code.',
  intro: 'I care about understanding problems, taking ownership of outcomes and building things that work reliably.',
  qualities: [
    { n: '01', name: 'Ownership', line: 'I take responsibility for understanding a task, working through challenges and following it through to a reliable outcome.',
      examples: ['Following an integration from a failing request to a fix verified against the live API', 'Testing edge cases before handing work over'] },
    { n: '02', name: 'Problem Solving', line: "I enjoy breaking down complex problems, understanding what's happening beneath the surface and finding practical solutions.",
      examples: ['Regular DSA practice in C++ and LeetCode challenges', 'Root-causing 4xx/5xx errors and pagination mismatches'] },
    { n: '03', name: 'Collaboration', line: 'Building good products requires sharing context, communicating clearly and working towards a common goal.',
      examples: ['A six-member team with weekly sprints and code reviews at Think Debug', 'Working with engineering, product and design at Walkover'] },
    { n: '04', name: 'Adaptability', line: 'I enjoy learning new technologies and adapting to different challenges as products and requirements evolve.',
      examples: ['Moving from frontend work into API and integration engineering', 'Learning OAuth 2.0, webhooks and how real APIs behave'] },
    { n: '05', name: 'Attention to Detail', line: 'I care about the details that make software reliable, from validation and error handling to consistent user experiences.',
      examples: ['Dynamic input forms with field validation and clear error handling', 'Fixing 30+ UI/UX defects on Kulies'] },
    { n: '06', name: 'Continuous Learning', line: 'Becoming a better engineer means staying curious, experimenting and continuously improving how I build.',
      examples: ['IBM courses in Generative AI and Agentic AI (2026)', 'Building my own products: Cairn, Meeting-to-Action Closer, SENSAI'] },
  ],
};
