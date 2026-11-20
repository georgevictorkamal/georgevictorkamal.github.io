import { motion } from 'framer-motion';
import { BadgeCheck, Boxes, Network, UsersRound } from 'lucide-react';

const pillars = [
  {
    icon: Network,
    title: 'Architecture-first thinker',
    kicker: 'Clean Code & Scalability',
    description:
      "I design systems before I write code. Clean architecture, repository patterns, and microservices aren't buzzwords — they're the difference between a codebase that scales and one that collapses under load.",
  },
  {
    icon: Boxes,
    title: 'Full-stack ownership',
    kicker: 'Database → UI → Pipeline',
    description:
      'From database schema to Flutter UI to Azure DevOps pipeline, I own the full delivery. No throwing work over walls. I have taken 13 enterprise products from first commit to production.',
  },
  {
    icon: UsersRound,
    title: 'Team multiplier',
    kicker: 'Mentorship & Code Review',
    description:
      'I mentor two junior engineers and run weekly knowledge-sharing sessions. The best code I write is the pull request review that stops a bug from reaching 10,000 users.',
  },
];

export default function AboutMeSection() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            className="flex flex-col lg:col-span-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <span className="section-eyebrow">About Me</span>
              <span className="h-px w-12 bg-border" />
            </div>

            <h2 className="section-heading mt-4 text-balance">
              I build systems that <span className="text-primary">scale</span> and teams that{' '}
              <span className="text-accent-emerald">grow</span>.
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-foreground/60 md:text-base">
              <p>
                My engineering philosophy is simple:{' '}
                <strong className="font-semibold text-foreground">
                  systems should work harder than the people who built them
                </strong>
                . At ITE Corp I have designed and shipped platforms that now run quietly in the background
                of real organisations — a HIPAA-compliant donor system serving{' '}
                <strong className="font-semibold text-foreground">10,000+ donors</strong>, a government
                procurement engine processing{' '}
                <strong className="font-semibold text-foreground">200+ monthly tenders</strong>, and a
                geofenced attendance tracker used by field staff every single day.
              </p>
              <p>
                I care about the numbers that matter: we cut API response times by{' '}
                <strong className="font-semibold text-primary">40%</strong> through Redis caching and
                microservice refactoring, reduced deployment incidents by{' '}
                <strong className="font-semibold text-accent-emerald">70%</strong> after introducing
                end-to-end CI/CD, and saved hundreds of manual work-hours through Power Platform automation.
              </p>
              <p>
                When I am not shipping features, I run weekly clean architecture and testing sessions with
                the engineers I mentor — because the best system I can build is one my team can confidently
                own and evolve long after I have moved on.
              </p>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
              <BadgeCheck className="mt-0.5 size-5 shrink-0 text-accent-emerald" />
              <div>
                <p className="text-sm font-bold text-foreground">Open to senior engineering &amp; tech lead roles</p>
                <p className="mt-0.5 text-xs text-foreground/45">
                  Cairo · Remote · Hybrid — let&apos;s talk architecture, teams, and scale.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 lg:col-span-6"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            viewport={{ once: true }}
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="surface-card surface-card-hover group flex gap-4 p-5"
                >
                  <div className="icon-tile transition-transform duration-300 group-hover:scale-105">
                    <Icon size={19} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <h3 className="text-base font-bold tracking-normal text-foreground">{pillar.title}</h3>
                      <span className="mono-label text-foreground/35">{pillar.kicker}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/55">{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
