import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Palette,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function HeroSection() {
  const cvUrl = `${import.meta.env.BASE_URL}George_Victor_Kamal_CV.pdf`;
  const profileUrl = `${import.meta.env.BASE_URL}profile.png`;

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/in/georgevictorkamal', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/georgevictorkamal', label: 'GitHub' },
    { icon: Palette, href: 'https://behance.net/georgevictorkamal', label: 'Behance' },
    { icon: Mail, href: 'mailto:georgevictorkamal@gmail.com', label: 'Email' },
  ];

  const telemetry = [
    { value: '4+ Yrs', label: 'Enterprise' },
    { value: '13', label: 'Shipped' },
    { value: '99.9%', label: 'Uptime' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/15 via-accent-emerald/10 to-transparent blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[380px] w-[380px] rounded-full bg-accent-mint/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <motion.div
        className="container relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-7">
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-emerald/25 bg-accent-emerald/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-accent-emerald">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-emerald opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent-emerald" />
                </span>
                Available for Senior / Lead Roles
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="max-w-3xl text-balance">
              Hi, I'm <span className="gradient-text">George Victor</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-foreground/60 md:text-sm"
            >
              <span className="font-semibold text-primary">Senior Full-Stack Software Engineer</span>
              <span className="text-foreground/25">•</span>
              <span>.NET Core</span>
              <span className="text-foreground/25">•</span>
              <span>Angular</span>
              <span className="text-foreground/25">•</span>
              <span>Flutter</span>
              <span className="text-foreground/25">•</span>
              <span className="font-semibold text-accent-mint">Azure &amp; Cloud Architecture</span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-base leading-relaxed text-foreground/60 md:text-lg"
            >
              I build the backend that doesn't break at 2 AM. Over{' '}
              <strong className="font-semibold text-foreground">4+ years at ITE Corp</strong>, I've shipped
              enterprise systems now serving{' '}
              <span className="font-semibold text-accent-mint">10,000+ users</span> — cutting API response
              times by <strong className="font-semibold text-primary">40%</strong>, slashing deployment
              incidents by <strong className="font-semibold text-accent-emerald">70%</strong>, and processing{' '}
              <strong className="font-semibold text-foreground">200+ monthly tenders</strong> across
              healthcare, procurement, and HR-tech.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-foreground/50"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                Cairo, Egypt
              </span>
              <span className="hidden text-foreground/20 sm:inline">•</span>
              <a
                href="mailto:georgevictorkamal@gmail.com"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
              >
                <Mail size={14} className="text-primary" />
                georgevictorkamal@gmail.com
              </a>
              <span className="hidden text-foreground/20 sm:inline">•</span>
              <a
                href="tel:+201211388499"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-emerald"
              >
                <Phone size={14} className="text-accent-emerald" />
                +20 12 11 388 499
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                View My Work
                <ArrowDown size={16} />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary"
              >
                <MessageSquare size={15} />
                Get In Touch
              </a>
              <a href={cvUrl} download="George_Victor_Kamal_CV.pdf" className="btn-ghost">
                <Download size={15} className="text-accent-mint" />
                Download CV
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3 pt-1">
              <span className="mono-label text-foreground/35">Connect:</span>
              <div className="flex gap-1.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex size-9 items-center justify-center rounded-full bg-secondary text-foreground/55 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.label}
                    >
                      <Icon size={16} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:col-span-5 lg:justify-end"
          >
            <div className="relative w-full max-w-[380px]">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-primary/20 via-accent-mint/10 to-transparent blur-xl" />

              <div className="relative rounded-xl border border-border bg-surface-slate p-2 shadow-2xl">
                <div className="absolute -top-3 right-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-container-highest px-2.5 py-1 text-accent-electric shadow-lg">
                  <ShieldCheck size={13} />
                  <span className="mono-label">Azure Certified</span>
                </div>

                <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
                  <img
                    src={profileUrl}
                    alt="George Victor Kamal — Senior Full-Stack Software Engineer"
                    className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />

                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg border border-border-subtle bg-surface-glass px-3 py-2 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-accent-emerald animate-pulse" />
                      <span className="text-xs font-semibold text-foreground">Open to Work</span>
                    </div>
                    <span className="mono-label text-accent-electric">Lead / Senior</span>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-3 gap-2 rounded-lg bg-secondary/60 p-2 text-center font-mono">
                  {telemetry.map((item) => (
                    <div key={item.label} className="flex flex-col py-1">
                      <span className="text-sm font-bold text-foreground">{item.value}</span>
                      <span className="mono-label text-foreground/35">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-lg sm:flex">
                <Sparkles size={14} className="text-amber-500" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-foreground/60">
                  Enterprise-grade delivery
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
