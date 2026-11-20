import HeroSection from '@/components/HeroSection';
import ImpactMetricsSection from '@/components/ImpactMetricsSection';
import AboutMeSection from '@/components/AboutMeSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import { AIChatBox } from '@/components/AIChatBox';
import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Sparkles, X } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <ImpactMetricsSection />
      <AboutMeSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />

      <AIChatWrapper />
      <ScrollToTop />
    </div>
  );
}

function AIChatWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      role: 'assistant',
      content:
        "👋 Hi! I'm George's AI Twin — ask me anything about his projects, tech stack, experience, certifications, or availability. I'll answer as George would.",
    },
  ]);

  const profileUrl = `${import.meta.env.BASE_URL}profile.png`;

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages((previous) => [...previous, { role: 'assistant', content: data }]);
    },
    onError: (error) => {
      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          content: `⚠️ ${
            error.message ||
            "I'm having trouble connecting right now. Please reach out via the contact form or email georgevictorkamal@gmail.com directly!"
          }`,
        },
      ]);
    },
  });

  const handleSend = (content: string) => {
    const newMessages = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    chatMutation.mutate({ messages: newMessages });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            className="absolute bottom-20 right-0 w-[92vw] overflow-hidden rounded-xl border border-border bg-card shadow-2xl sm:w-[420px]"
          >
            <div className="flex items-center justify-between border-b border-border bg-surface-container-high p-4">
              <div className="flex items-center gap-3">
                <div className="size-9 overflow-hidden rounded-full border border-border bg-secondary">
                  <img
                    src={profileUrl}
                    alt="George Victor"
                    className="h-full w-full object-cover object-top"
                    onError={(event) => {
                      (event.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">George&apos;s AI Twin</h3>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-foreground/45">
                    <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent-emerald" />
                    Online — ask me anything
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-foreground/45 transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Close AI chat"
              >
                <X size={17} />
              </button>
            </div>
            <AIChatBox
              messages={messages}
              onSendMessage={handleSend}
              isLoading={chatMutation.isPending}
              className="rounded-none border-none shadow-none"
              height="460px"
              placeholder="Ask about projects, stack, availability..."
              suggestedPrompts={[
                "What's your core tech stack?",
                'Tell me about DonorHUB',
                'What certifications do you hold?',
                'Are you available for hire?',
                "What's your biggest technical achievement?",
                'How do you approach system architecture?',
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((open) => !open)}
        className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent-emerald text-primary-foreground shadow-2xl shadow-primary/30"
        aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
      >
        {isOpen ? <X size={22} /> : <Sparkles size={22} />}
        {!isOpen && (
          <span className="absolute -right-1 -top-1 size-3.5 rounded-full border-2 border-background bg-accent-emerald" />
        )}
      </motion.button>
    </div>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 left-6 z-[60]"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground/55 shadow-lg transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
