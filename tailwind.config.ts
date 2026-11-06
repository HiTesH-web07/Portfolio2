import type { Config } from 'tailwindcss';
export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        forest: 'rgb(var(--forest) / <alpha-value>)',
        sage: 'rgb(var(--sage) / <alpha-value>)',
        clay: 'rgb(var(--clay) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        onaccent: 'rgb(var(--on-accent) / <alpha-value>)',
        // v5 design system: midnight ink, cool neutrals, one cobalt accent
        n: {
          ink: '#151923',        // primary dark sections, headings on light
          ink2: '#202635',       // dark surfaces
          ink3: '#2B3245',       // borders and raised surfaces on dark
          bg: '#F7F8FA',         // main light background
          card: '#FFFFFF',       // cards on light
          line: '#E4E7EC',       // borders on light
          muted: '#667085',      // secondary text on light
          fg: '#EEF1F6',         // primary text on dark
          fgmuted: '#A7B0C2',    // secondary text on dark
          accent: '#4A5FF0',     // buttons, links, focus (white text 5.0:1)
          accenthover: '#3D52DB',
          accentdark: '#8EA0FF', // accent text on dark (7.2:1)
          accentsoft: '#EEF1FF', // accent tint on light
        },
      },
      fontFamily: {
        display: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      borderRadius: { '4xl': '2rem' },
      boxShadow: {
        soft: '0 1px 2px rgb(36 35 31 / .04), 0 12px 32px -12px rgb(36 35 31 / .14)',
        lift: '0 2px 4px rgb(36 35 31 / .05), 0 24px 48px -16px rgb(36 35 31 / .22)',
      },
      maxWidth: { page: '76rem' },
    },
  },
  plugins: [],
} satisfies Config;
