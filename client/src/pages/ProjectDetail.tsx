import { useEffect } from 'react';
import { useLocation, useParams } from 'wouter';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Github,
  Layers,
  Loader2,
  UserRound,
  Users,
} from 'lucide-react';
import { trpc } from '@/lib/trpc';

function safeParseArray(value: unknown): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(String(value));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeParseObject(value: unknown): Record<string, string> | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(String(value));
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

interface ProjectDetailData {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  imageUrl?: string;
  role?: string;
  contribution?: string;
  technologies?: string;
  outcomes?: string;
  category?: string;
  featured?: number;
  caseStudyOverview?: string;
  problemStatement?: string;
  solution?: string;
  teamSize?: number;
  duration?: string;
  challenges?: string;
  measurableOutcomes?: string;
  architecture?: string;
  demoUrl?: string;
  sourceUrl?: string;
}

function DetailSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-3">
        <span className="mono-label text-primary">{index}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <h2 className="text-xl font-bold tracking-normal text-foreground md:text-2xl">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function ProjectDetail() {
  const params = useParams();
  const [, navigate] = useLocation();
  const projectId = parseInt(params.id || '0');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  const { data: project, isLoading, error } = trpc.portfolio.projects.byId.useQuery(
    { id: projectId },
    { enabled: projectId > 0 }
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
        <p className="max-w-md text-sm text-foreground/50">
          The case study you are looking for may have moved. Head back to the portfolio to browse the
          available projects.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ArrowLeft size={15} />
          Back to portfolio
        </button>
      </div>
    );
  }

  const detail = project as unknown as ProjectDetailData;
  const technologies = safeParseArray(detail.technologies);
  const outcomes = safeParseArray(detail.outcomes);
  const challenges = safeParseArray(detail.challenges);
  const measurableOutcomes = safeParseArray(detail.measurableOutcomes);
  const architecture = safeParseObject(detail.architecture);

  const metadata = [
    { label: 'Role', value: detail.role || 'Full-Stack Developer', icon: UserRound },
    { label: 'Team size', value: detail.teamSize || 'Solo', icon: Users },
    { label: 'Duration', value: detail.duration || '3–6 months', icon: Clock },
  ];

  let sectionCounter = 0;
  const sectionIndex = (label: string) =>
    `${String((sectionCounter += 1)).padStart(2, '0')} / ${label}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-16 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="container py-3">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-foreground/55 transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Back to projects
          </button>
        </div>
      </div>

      <motion.div
        className="container py-10 md:py-14"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            {detail.category && <span className="section-eyebrow">{detail.category}</span>}
            {detail.featured === 1 && (
              <span className="rounded border border-accent-emerald/20 bg-accent-emerald/10 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent-emerald">
                Featured
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {detail.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/55 md:text-lg">
            {detail.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {detail.demoUrl && (
              <a
                href={detail.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                <ExternalLink size={15} />
                Live demo
              </a>
            )}
            {detail.sourceUrl && (
              <a
                href={detail.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground/70 transition-colors hover:border-primary/30 hover:text-foreground"
              >
                <Github size={15} />
                Source code
              </a>
            )}
            <button
              onClick={() => navigate('/#contact')}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Discuss similar work
              <ArrowRight size={15} />
            </button>
          </div>

          {detail.imageUrl && (
            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-secondary shadow-sm">
              <div className="aspect-video w-full md:aspect-[21/9]">
                <img
                  src={detail.imageUrl}
                  alt={detail.title}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    (event.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {metadata.map(({ label, value, icon: Icon }) => (
              <div key={label} className="surface-card p-4">
                <div className="flex items-center gap-2">
                  <Icon size={14} className="text-primary" />
                  <span className="mono-label text-foreground/35">{label}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-10">
            {detail.caseStudyOverview && (
              <DetailSection index={sectionIndex('Overview')} title="Case study overview">
                <div className="surface-card border-l-2 border-l-primary p-5">
                  <p className="text-sm leading-relaxed text-foreground/60">{detail.caseStudyOverview}</p>
                </div>
              </DetailSection>
            )}

            {detail.problemStatement && (
              <DetailSection index={sectionIndex('Problem')} title="Problem statement">
                <div className="surface-card p-5">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/60">
                    {detail.problemStatement}
                  </p>
                </div>
              </DetailSection>
            )}

            {detail.solution && (
              <DetailSection index={sectionIndex('Solution')} title="Solution">
                <div className="surface-card p-5">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/60">
                    {detail.solution}
                  </p>
                </div>
              </DetailSection>
            )}

            {architecture && (
              <DetailSection index={sectionIndex('Architecture')} title="Technical architecture">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {Object.entries(architecture).map(([key, value]) => (
                    <div key={key} className="surface-card p-4">
                      <h3 className="mono-label text-primary">{key}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/55">{value}</p>
                    </div>
                  ))}
                </div>
              </DetailSection>
            )}

            {technologies.length > 0 && (
              <DetailSection index={sectionIndex('Stack')} title="Technologies used">
                <div className="surface-card p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-secondary px-2.5 py-1 font-mono text-[11px] text-foreground/65"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </DetailSection>
            )}

            {challenges.length > 0 && (
              <DetailSection index={sectionIndex('Challenges')} title="Challenges & solutions">
                <div className="space-y-3">
                  {challenges.map((challenge, index) => (
                    <div key={index} className="surface-card flex gap-3 p-4">
                      <span className="mono-label mt-0.5 text-accent-emerald">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm leading-relaxed text-foreground/60">{challenge}</p>
                    </div>
                  ))}
                </div>
              </DetailSection>
            )}

            {measurableOutcomes.length > 0 && (
              <DetailSection index={sectionIndex('Results')} title="Measurable outcomes">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {measurableOutcomes.map((outcome, index) => (
                    <div
                      key={index}
                      className="surface-card border-accent-emerald/20 bg-accent-emerald/5 p-4"
                    >
                      <p className="text-sm font-medium leading-relaxed text-foreground/70">{outcome}</p>
                    </div>
                  ))}
                </div>
              </DetailSection>
            )}

            {outcomes.length > 0 && (
              <DetailSection index={sectionIndex('Outcomes')} title="Key outcomes">
                <ul className="surface-card space-y-3 p-5">
                  {outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent-emerald" />
                      <span className="text-sm leading-relaxed text-foreground/60">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            )}

            {detail.contribution && (
              <DetailSection index={sectionIndex('Contribution')} title="My contribution">
                <div className="surface-card p-5">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/60">
                    {detail.contribution}
                  </p>
                </div>
              </DetailSection>
            )}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center shadow-sm">
            <Layers size={24} className="text-primary" />
            <h2 className="text-xl font-bold text-foreground md:text-2xl">Interested in similar work?</h2>
            <p className="max-w-md text-sm text-foreground/50">
              I am available for senior and lead engineering roles, architecture reviews, and full-stack
              delivery.
            </p>
            <button
              onClick={() => navigate('/#contact')}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent-emerald px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-110"
            >
              Get in touch
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
