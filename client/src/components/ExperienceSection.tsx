import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExperienceSection() {
  const { data: experiences = [], isLoading } = trpc.portfolio.experience.all.useQuery();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return 'Present';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 border border-primary/20">
            Career Journey
          </span>
          <h2 className="mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-foreground/55 max-w-2xl mx-auto">
            A timeline of professional growth and key achievements in enterprise software engineering.
          </p>
        </motion.div>

        {}
        {isLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 flex gap-5">
                <Skeleton className="size-12 rounded-2xl shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative"
              >
                <div className="flex gap-5">
                  {}
                  <div className="flex flex-col items-center relative">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${index === 0
                      ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-primary/25'
                      : 'bg-secondary text-foreground/60 border border-border'
                      }`}>
                      <Briefcase size={20} />
                    </div>
                    {index !== experiences.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/30 to-border mt-2"></div>
                    )}
                  </div>

                  {}
                  <div className="flex-1 bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group mb-2">
                    {}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold tracking-normal">{exp.title}</h3>
                          {index === 0 && (
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase rounded-md border border-emerald-500/20">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-primary font-medium text-sm">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-foreground/50 text-xs font-medium whitespace-nowrap bg-secondary/60 px-2.5 py-1 rounded-lg">
                        <Calendar size={13} />
                        <span>
                          {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                        </span>
                      </div>
                    </div>

                    {exp.location && (
                      <div className="flex items-center gap-1.5 text-foreground/50 text-xs mb-4">
                        <MapPin size={13} />
                        <span>{exp.location}</span>
                      </div>
                    )}

                    {exp.description && (
                      <p className="text-foreground/60 text-sm mb-4 leading-relaxed">{exp.description}</p>
                    )}

                    {exp.achievements && (
                      <ul className="space-y-2">
                        {JSON.parse(exp.achievements).map((achievement: string, idx: number) => (
                          <li key={idx} className="flex gap-2.5 text-foreground/55 text-sm">
                            <CheckCircle2 size={15} className="text-primary/70 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
