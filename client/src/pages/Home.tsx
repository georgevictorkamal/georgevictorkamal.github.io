import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import { AIChatBox } from '@/components/AIChatBox';
import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, X, ArrowUpIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutMeSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />

      {}
      <AIChatWrapper />

      {}
      <ScrollToTop />
    </div>
  );
}

function AIChatWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: "👋 Hey there! I'm George's AI Twin — ask me anything about my projects, tech stack, experience, or certifications. I know it all!" }
  ]);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: 'assistant', content: data }]);
    },
    onError: (error) => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ ${error.message || "I'm having trouble connecting right now. Please try again or use the contact form below to reach George directly!"}`
      }]);
    }
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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[90vw] sm:w-[400px] shadow-2xl overflow-hidden rounded-2xl border bg-card/95 backdrop-blur-xl"
          >
            <div className="bg-primary p-4 text-primary-foreground flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">George's AI Twin</h3>
                  <p className="text-[10px] opacity-70">Powered by Gemini 2.5 Flash</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <AIChatBox
              messages={messages}
              onSendMessage={handleSend}
              isLoading={chatMutation.isPending}
              className="border-none rounded-none shadow-none"
              height="450px"
              placeholder="Ask about my projects or skills..."
              suggestedPrompts={[
                "What's your tech stack?",
                "Tell me about the Grifols-DonorHUB project",
                "What certifications do you have?",
                "Are you available for hire?"
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="size-14 rounded-full shadow-2xl shadow-primary/40 p-0"
        >
          {isOpen ? <X size={24} /> : <Sparkles size={24} />}
        </Button>
      </motion.div>
    </div>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
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
          <Button
            size="icon"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="size-12 rounded-full shadow-lg bg-secondary text-foreground hover:bg-primary hover:text-white transition-all border border-border"
          >
            <ArrowUpIcon size={20} />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
