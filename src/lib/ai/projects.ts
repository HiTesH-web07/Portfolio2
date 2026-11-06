// Which projects an answer talks about, so the chat can link to them.
const ALIASES: Record<string, RegExp> = {
  cairn: /\bcairn\b/i,
  'meeting-to-action': /meeting[- ]to[- ]action/i,
  sensai: /\bsensai\b/i,
  kulies: /\bkulies\b/i,
};
export function projectsIn(...texts: string[]): string[] {
  return Object.entries(ALIASES).filter(([, re]) => texts.some((t) => re.test(t))).map(([id]) => id).slice(0, 2);
}
export function tidy(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/^#+\s*/gm, '').replace(/^\s*[*-]\s+/gm, '• ').trim();
}
