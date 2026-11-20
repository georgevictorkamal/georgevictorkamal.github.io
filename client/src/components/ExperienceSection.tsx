import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Skeleton } from '@/components/ui/skeleton';
import SectionHeader from '@/components/SectionHeader';

function parseAchievements(value: unknown): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(String(value));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ExperienceSection() {
  const { data: experiences = [], isLoading } = trpc.portfolio.experience.all.useQuery();

  const formatDate = (date: Date | string | null) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <section id="experience" className="relative border-y border-border bg-surface-container-lowest py-20 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Career Journey"
          title={
            <>
              Professional <span className="gradient-text">experience</span>
            </>
          }
          description="A timeline of professional growth and key achievements in enterprise software engineering."
          className="mb-12"
        />

        {isLoading ? (
          <div className="mx-auto max-w-4xl space-y-5">
            {[1, 2].map((index) => (
              <div key={index} className="surface-card flex gap-5 p-6">
                <Skeleton className="size-12 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between gap-4">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="mx-auto max-w-4xl space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
          >
            {experiences.map((exp, index) => {
              const achievements = parseAchievements(exp.achievements);
              const isCurrent = Boolean(exp.current) || index === 0;

              return (
                <motion.div
                  key={exp.id}
                  className="relative pl-12 md:pl-14"
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                >
                  {index !== experiences.length - 1 && (
                    <span className="absolute left-[17px] top-11 -bottom-5 w-px bg-border" aria-hidden="true" />
                  )}

                  <div
                    className={`absolute left-0 top-1 flex size-9 items-center justify-center rounded-lg border shadow-sm ${
                      isCurrent
                        ? 'border-primary/25 bg-primary/10 text-primary'
                        : 'border-border bg-card text-foreground/45'
                    }`}
                  >
                    <Briefcase size={16} />
                  </div>

                  <div className="surface-card p-5 md:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold tracking-normal text-foreground">{exp.title}</h3>
                          {isCurrent && (
                            <span className="rounded border border-accent-emerald/20 bg-accent-emerald/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent-emerald">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm font-semibold text-primary">{exp.company}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-foreground/45">
                        <span className="inline-flex items-center gap-1.5 rounded bg-secondary px-2 py-1">
                          <Calendar size={11} />
                          {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                        </span>
                        {exp.location && (
                          <span className="inline-flex items-center gap-1.5 rounded bg-secondary px-2 py-1">
                            <MapPin size={11} />
                            {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {exp.description && (
                      <p className="mt-4 text-sm leading-relaxed text-foreground/55">{exp.description}</p>
                    )}

                    {achievements.length > 0 && (
                      <ul className="mt-4 space-y-2.5">
                        {achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex gap-2.5 text-sm">
                            <CheckCircle2
                              size={15}
                              className="mt-0.5 shrink-0 text-accent-emerald"
                              aria-hidden="true"
                            />
                            <span className="leading-relaxed text-foreground/60">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
