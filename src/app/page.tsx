// v4: complete redesign. Earlier versions: branches archive/v1-before-story and archive/v2-story-journey.
import Nav4 from '@/components/v4/Nav4';
import Hero4 from '@/components/v4/Hero4';
import Work4 from '@/components/v4/Work4';
import Journey4 from '@/components/v4/Journey4';
import Experience4 from '@/components/v4/Experience4';
import Skills4 from '@/components/v4/Skills4';
import Problem4 from '@/components/v4/Problem4';
import AskContact4 from '@/components/v4/AskContact4';
import { ChatProvider } from '@/components/chat/ChatContext';
import { AvatarDefs } from '@/components/avatar/Avatar';

export default function Page() {
  return (
    <ChatProvider>
      <AvatarDefs />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-[#A6E35A] focus:px-4 focus:py-2 focus:text-[#0F1D16]">Skip to content</a>
      <Nav4 />
      <main id="main">
        <Hero4 />
        <Work4 />
        <Journey4 />
        <Experience4 />
        <Skills4 />
        <Problem4 />
        <AskContact4 />
      </main>
    </ChatProvider>
  );
}
