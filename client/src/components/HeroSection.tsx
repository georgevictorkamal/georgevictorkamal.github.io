import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Download, MapPin, Sparkles, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const cvUrl = `${import.meta.env.BASE_URL}GeorgeVictor.pdf`;
  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/georgevictorkamal',
      label: 'LinkedIn',
    },
    {
      icon: Github,
      href: 'https://github.com/georgevictorkamal',
      label: 'GitHub',
    },
    {
      icon: Palette,
      href: 'https://behance.net/georgevictorkamal',
      label: 'Behance',
    },
    {
      icon: Mail,
      href: 'mailto:georgevictorkamal@gmail.com',
      label: 'Email',
    },
  ];

  const stats = [
    { value: '40%', label: 'Faster API Response' },
    { value: '10K+', label: 'Daily Active Users' },
    { value: '70%', label: 'Fewer Deploy Incidents' },
    { value: '200+', label: 'Monthly Tenders Processed' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-8 pb-20 relative overflow-hidden">
      {}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-gradient-to-tr from-primary/8 via-transparent to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl"></div>
        {}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <motion.div
        className="container relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {}
          <div className="lg:col-span-7">
            {}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for opportunities
              </span>
            </motion.div>

            {}
            <motion.h1 variants={itemVariants} className="mb-4 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Hi, I'm{' '}
              <span className="gradient-text">George Victor</span>
            </motion.h1>

            {}
            <motion.h2 variants={itemVariants} className="text-xl md:text-2xl font-semibold text-foreground/60 mb-6 flex items-center gap-3 flex-wrap">
              <span>Senior Full-Stack Software Engineer</span>
              <span className="hidden sm:inline text-foreground/30">•</span>
              <span className="text-primary/80 text-lg">.NET Core · Angular · Flutter</span>
            </motion.h2>

            {}
            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/55 mb-8 leading-relaxed max-w-2xl"
            >
              I build the backend that doesn't break at 2 AM. Over{' '}
              <strong className="text-foreground/80">3+ years at ITE Corp</strong>, I've shipped enterprise
              systems now serving <strong className="text-foreground/80">10,000+ daily users</strong> — cutting
              API response times by <strong className="text-foreground/80">40%</strong>, slashing deployment
              incidents by <strong className="text-foreground/80">70%</strong>, and processing{' '}
              <strong className="text-foreground/80">200+ monthly tenders</strong> across healthcare,
              procurement, and HR-tech.
            </motion.p>

            {}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-8 text-foreground/55 text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-primary" />
                <span>Cairo, Egypt</span>
              </div>
              <span className="text-foreground/20">|</span>
              <a href="mailto:georgevictorkamal@gmail.com" className="hover:text-primary transition-colors">
                georgevictorkamal@gmail.com
              </a>
              <span className="text-foreground/20">|</span>
              <a href="tel:+201211388499" className="hover:text-primary transition-colors">
                +20 12 11 388 499
              </a>
            </motion.div>

            {}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-foreground/60 hover:text-primary transition-all duration-300"
                asChild
              >
                <a href={cvUrl} download="George_Victor_Kamal_CV.pdf">
                  <Download size={18} className="mr-2" /> Download CV
                </a>
              </Button>
            </motion.div>

            {}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <span className="text-foreground/40 text-sm">Connect:</span>
              <div className="flex gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-secondary/80 hover:bg-primary hover:text-primary-foreground rounded-xl transition-all duration-300 text-foreground/60 border border-transparent hover:border-primary/30"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.label}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {}
          <motion.div
            className="lg:col-span-5 hidden lg:flex flex-col items-center gap-8"
            variants={itemVariants}
          >
            {}
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-52 h-52 rounded-3xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-2xl shadow-primary/30 animate-pulse-glow">
                <span className="text-primary-foreground font-bold text-7xl tracking-tighter select-none" style={{ fontFamily: 'Inter, sans-serif' }}>
                  GV
                </span>
              </div>
              {}
              <motion.div
                className="absolute -top-4 -right-4 px-3 py-1.5 bg-card border border-border rounded-xl shadow-lg text-xs font-semibold flex items-center gap-1.5"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles size={14} className="text-amber-500" />
                Azure Certified
              </motion.div>
              <motion.div
                className="absolute -bottom-3 -left-4 px-3 py-1.5 bg-card border border-border rounded-xl shadow-lg text-xs font-semibold flex items-center gap-1.5"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Full Stack
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center p-5 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/30 transition-all duration-300 group"
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text stat-number mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-foreground/50 font-medium group-hover:text-foreground/70 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {}
      <motion.button
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 group cursor-pointer bg-transparent border-none outline-none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-[10px] text-foreground/30 uppercase tracking-widest font-medium group-hover:text-primary/60 transition-colors">
          Explore
        </span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground/25 group-hover:text-primary/60 transition-colors"
        >
          <path d="M7 13l5 5 5-5" />
          <path d="M7 7l5 5 5-5" opacity="0.4" />
        </motion.svg>
      </motion.button>
    </section>
  );
}
