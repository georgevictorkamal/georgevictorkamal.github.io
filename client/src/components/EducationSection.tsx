import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, Globe, GraduationCap } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Skeleton } from '@/components/ui/skeleton';
import SectionHeader from '@/components/SectionHeader';

const languages = [
  { name: 'Arabic', level: 'Native', progress: 100, color: 'bg-accent-mint' },
  { name: 'English', level: 'Full Professional Proficiency', progress: 90, color: 'bg-primary' },
  { name: 'French', level: 'Elementary Proficiency', progress: 25, color: 'bg-foreground/30' },
];

const certAccents = ['text-primary', 'text-accent-emerald', 'text-accent-mint'];

const credentialExpiry: Record<string, string> = {
  'Microsoft Certified: Azure AI Engineer Associate': 'Jun 2027',
  'Microsoft Certified: Power Platform Developer Associate': 'Feb 2027',
};

export default function EducationSection() {
  const { data: education = [], isLoading: educationLoading } = trpc.portfolio.education.all.useQuery();
  const { data: certifications = [], isLoading: certificationsLoading } =
    trpc.portfolio.certifications.all.useQuery();

  const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <section id="certifications" className="relative py-20 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Learning & Credentials"
          title={
            <>
              Education &amp; <span className="gradient-text">certifications</span>
            </>
          }
          description="Academic foundation and industry certifications that validate expertise in modern technologies."
          className="mb-12"
        />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <motion.div
              className="surface-card p-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex items-center gap-2.5 text-primary">
                <div className="icon-tile size-9">
                  <GraduationCap size={18} />
                </div>
                <h3 className="text-base font-bold tracking-normal text-foreground">Education</h3>
              </div>

              {educationLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                education.map((item) => (
                  <div key={item.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold leading-snug text-foreground">{item.degree}</h4>
                        <p className="mt-1 text-sm font-semibold text-accent-mint">{item.institution}</p>
                      </div>
                      {item.grade && (
                        <span className="shrink-0 rounded border border-accent-emerald/20 bg-accent-emerald/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-accent-emerald">
                          {item.grade}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[10px] text-foreground/40">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={11} />
                        {formatDate(item.startDate)} — {formatDate(item.endDate)}
                      </span>
                      <span className="text-foreground/20">•</span>
                      <span>Cairo, Egypt</span>
                    </div>

                    {item.field && <p className="mt-2 text-xs text-foreground/45">{item.field}</p>}

                    {item.description && (
                      <p className="mt-2 text-xs leading-relaxed text-foreground/50">{item.description}</p>
                    )}
                  </div>
                ))
              )}
            </motion.div>

            <motion.div
              className="surface-card p-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex items-center gap-2.5">
                <div className="icon-tile icon-tile-emerald size-9">
                  <Globe size={18} />
                </div>
                <h3 className="text-base font-bold tracking-normal text-foreground">Languages</h3>
              </div>

              <div className="space-y-4">
                {languages.map((language) => (
                  <div key={language.name}>
                    <div className="mb-1.5 flex items-center justify-between gap-3 font-mono text-xs">
                      <span className="font-semibold text-foreground">{language.name}</span>
                      <span className="text-right text-[10px] text-foreground/45">{language.level}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className={`h-full rounded-full ${language.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${language.progress}%` }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="icon-tile size-9">
                  <Award size={18} />
                </div>
                <h3 className="text-base font-bold tracking-normal text-foreground">
                  Certifications
                  {!certificationsLoading && (
                    <span className="ml-2 font-mono text-xs font-medium text-foreground/35">
                      ({certifications.length})
                    </span>
                  )}
                </h3>
              </div>
              <span className="mono-label text-foreground/30">Verified credentials</span>
            </div>

            {certificationsLoading ? (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="surface-card space-y-3 p-4">
                    <Skeleton className="h-4 w-4/5" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
                }}
              >
                {certifications.map((cert, index) => {
                  const accent = certAccents[index % certAccents.length];
                  return (
                    <motion.div
                      key={cert.id}
                      className="surface-card surface-card-hover flex flex-col justify-between gap-3 p-4"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className="text-sm font-semibold leading-snug text-foreground"
                          title={cert.name}
                        >
                          {cert.name}
                        </h4>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`shrink-0 transition-colors hover:text-foreground ${accent}`}
                            title={`Verify ${cert.name}`}
                            aria-label={`Verify ${cert.name}`}
                          >
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-foreground/40">
                        <span className="truncate">{cert.issuer}</span>
                        <span className={`shrink-0 text-right leading-tight ${accent}`}>
                          <span className="block">{formatDate(cert.issuedDate)}</span>
                          {credentialExpiry[cert.name] && (
                            <span className="block text-[9px] text-foreground/30">
                              Exp. {credentialExpiry[cert.name]}
                            </span>
                          )}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
