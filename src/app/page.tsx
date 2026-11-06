// v4: complete redesign. Earlier versions: branches archive/v1-before-story and archive/v2-story-journey.
import Nav4 from '@/components/v4/Nav4';
import Hero4 from '@/components/v4/Hero4';
import Work4 from '@/components/v4/Work4';
import Journey5 from '@/components/v5/Journey5';
import Experience4 from '@/components/v4/Experience4';
import Skills4 from '@/components/v4/Skills4';
import HowIWork from '@/components/v5/HowIWork';
import AskContact4 from '@/components/v4/AskContact4';
import Contact5 from '@/components/v5/Contact5';
import { ChatProvider } from '@/components/chat/ChatContext';

export default function Page() {
  return (
    <ChatProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-[#A6E35A] focus:px-4 focus:py-2 focus:text-[#0F1D16]">Skip to content</a>
      <Nav4 />
      <main id="main">
        <Hero4 />
        <Journey5 />
        <Work4 />
        <Experience4 />
        <Skills4 />
        <HowIWork />
        <AskContact4 />
        <Contact5 />
      </main>
    </ChatProvider>
  );
}
