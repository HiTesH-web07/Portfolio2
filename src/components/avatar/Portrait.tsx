// Hitesh's own illustrated portrait (his reference image), used everywhere the character appears,
// so the face, hair, beard and style never drift between sections.
import Image from 'next/image';

export const PORTRAIT = { src: '/avatar/hitesh-arch.webp', w: 940, h: 1069 };
export const FACE = '/avatar/ask-face.webp'; // cut from the Ask Hitesh illustration

export function Portrait({ className = '', sizes = '(min-width: 1024px) 520px, 90vw', priority = false, alt = 'Illustrated portrait of Hitesh Ahuja at his laptop' }: { className?: string; sizes?: string; priority?: boolean; alt?: string }) {
  return <Image src={PORTRAIT.src} width={PORTRAIT.w} height={PORTRAIT.h} sizes={sizes} priority={priority} alt={alt} className={`h-auto w-full select-none rounded-b-[1.75rem] ${className}`} draggable={false} />;
}

export function Face({ size = 40, className = '' }: { size?: number; className?: string }) {
  return <Image src={FACE} width={size} height={size} alt="" aria-hidden className={`shrink-0 rounded-full object-cover ${className}`} style={{ width: size, height: size }} />;
}
