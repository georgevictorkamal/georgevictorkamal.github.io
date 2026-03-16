import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, ExternalLink, BookOpen, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { trpc } from '@/lib/trpc';
import { Skeleton } from '@/components/ui/skeleton';

export default function EducationSection() {
  const { data: education = [], isLoading: eduLoading } = trpc.portfolio.education.all.useQuery();
  const { data: certifications = [], isLoading: certLoading } = trpc.portfolio.certifications.all.useQuery();

  const languages = [
    { name: 'Arabic', level: 'Native', progress: 100 },
    { name: 'English', level: 'Full Professional Proficiency', progress: 90 },
    { name: 'French', level: 'Elementary Proficiency', progress: 25 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <section id="certifications" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
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
            Learning & Credentials
          </span>
          <h2 className="mb-4">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-lg text-foreground/55 max-w-2xl mx-auto">
            Academic foundation and industry certifications that validate expertise in modern technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {}
          <div>
            <motion.h3
              className="text-xl font-semibold mb-6 flex items-center gap-2.5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="text-primary" size={22} />
              </div>
              Education
            </motion.h3>

            {eduLoading ? (
              <div className="space-y-4">
                {[1].map((i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-1/4" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {education.map((edu) => (
                  <motion.div
                    key={edu.id}
                    variants={itemVariants}
                    className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h4 className="text-base font-semibold">{edu.degree}</h4>
                        <p className="text-primary font-medium text-sm">{edu.institution}</p>
                      </div>
                      {edu.grade && (
                        <Badge variant="secondary" className="whitespace-nowrap text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                          {edu.grade}
                        </Badge>
                      )}
                    </div>

                    {edu.field && (
                      <p className="text-foreground/50 text-xs mb-2">{edu.field}</p>
                    )}

                    <div className="flex items-center gap-1.5 text-foreground/45 text-xs mb-3">
                      <Calendar size={12} />
                      <span>
                        {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                      </span>
                    </div>

                    {edu.description && (
                      <p className="text-foreground/50 text-xs leading-relaxed">{edu.description}</p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2.5">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Globe className="text-primary" size={22} />
                </div>
                Languages
              </h3>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{lang.name}</span>
                      <span className="text-xs text-foreground/50">{lang.level}</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {}
          <div className="lg:col-span-2">
            <motion.h3
              className="text-xl font-semibold mb-6 flex items-center gap-2.5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="text-primary" size={22} />
              </div>
              Certifications
              {!certLoading && (
                <span className="text-xs text-foreground/40 font-normal ml-1">({certifications.length})</span>
              )}
            </motion.h3>

            {certLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4 space-y-2">
                    <Skeleton className="h-4 w-4/5" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.id}
                    variants={itemVariants}
                    className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all duration-300 group"
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold mb-0.5 leading-snug truncate" title={cert.name}>{cert.name}</h4>
                        <div className="flex items-center gap-2">
                          <p className="text-primary font-medium text-xs">{cert.issuer}</p>
                          <span className="text-foreground/30">·</span>
                          <span className="text-foreground/40 text-xs">{formatDate(cert.issuedDate)}</span>
                        </div>
                      </div>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors flex-shrink-0"
                          title="Verify credential"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
