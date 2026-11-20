import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Filter,
  Github,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { trpc } from '@/lib/trpc';
import { useLocation } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';
import SectionHeader from '@/components/SectionHeader';

const categoryStyles: Record<
  string,
  { badge: string; text: string; dot: string }
> = {
  'Full Stack': {
    badge: 'border-primary/20 bg-primary/10 text-primary',
    text: 'text-primary',
    dot: 'bg-primary',
  },
  Backend: {
    badge: 'border-accent-emerald/20 bg-accent-emerald/10 text-accent-emerald',
    text: 'text-accent-emerald',
    dot: 'bg-accent-emerald',
  },
  Mobile: {
    badge: 'border-accent-mint/20 bg-accent-mint/10 text-accent-mint',
    text: 'text-accent-mint',
    dot: 'bg-accent-mint',
  },
  'Power Platform': {
    badge: 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
    text: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
};

const fallbackCategoryStyle = {
  badge: 'border-border bg-secondary text-foreground/60',
  text: 'text-foreground/60',
  dot: 'bg-foreground/40',
};

function getOutcomes(project: any): string[] {
  if (!project.outcomes) return [];
  try {
    const parsed = JSON.parse(project.outcomes);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getTechnologies(project: any): string[] {
  if (!project.technologies) return [];
  try {
    const parsed = JSON.parse(project.technologies);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return String(project.technologies)
      .split(',')
      .map((tech) => tech.trim())
      .filter(Boolean);
  }
}

function ProjectCardLinks({ project }: { project: any }) {
  const [, navigate] = useLocation();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => navigate(`/project/${project.id}`)}
        className="group/link inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary transition-colors hover:text-primary/80"
      >
        Case Study
        <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-0.5" />
      </button>
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/35 transition-colors hover:text-foreground"
          title="Live demo"
          aria-label={`Open live demo for ${project.title}`}
        >
          <ExternalLink size={14} />
        </a>
      )}
      {project.sourceUrl && (
        <a
          href={project.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/35 transition-colors hover:text-foreground"
          title="Source code"
          aria-label={`Open source code for ${project.title}`}
        >
          <Github size={14} />
        </a>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: projects = [], isLoading } = trpc.portfolio.projects.all.useQuery();

  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((project) => {
      if (project.category) cats.add(project.category);
    });
    return Array.from(cats).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();

    return projects
      .filter((project) => {
        const techs = getTechnologies(project);
        const matchesSearch =
          !searchLower ||
          project.title.toLowerCase().includes(searchLower) ||
          project.description?.toLowerCase().includes(searchLower) ||
          project.shortDescription?.toLowerCase().includes(searchLower) ||
          techs.some((tech) => tech.toLowerCase().includes(searchLower));

        if (!selectedCategory) return matchesSearch;
        return matchesSearch && project.category === selectedCategory;
      })
      .sort((a, b) => (a.order || 99) - (b.order || 99));
  }, [projects, searchTerm, selectedCategory]);

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Portfolio"
          title={
            <>
              Featured <span className="gradient-text">projects</span>
            </>
          }
          description="A selection of impactful projects showcasing full-stack development, mobile engineering, and enterprise platform expertise."
          className="mb-8"
        />

        <motion.div
          className="mx-auto mb-10 flex max-w-3xl flex-col items-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full max-w-md">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30"
              size={16}
            />
            <Input
              id="projects-search"
              type="text"
              name="search"
              placeholder="Search projects, technologies..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-10 rounded-full border-border bg-card pl-10 pr-4 text-sm shadow-sm"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                selectedCategory === null
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary text-foreground/55 hover:bg-secondary/70 hover:text-foreground'
              }`}
            >
              All ({projects.length})
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-secondary text-foreground/55 hover:bg-secondary/70 hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="surface-card flex h-[310px] flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-24 rounded" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <div className="mt-auto flex gap-2">
                  <Skeleton className="h-6 w-16 rounded" />
                  <Skeleton className="h-6 w-20 rounded" />
                  <Skeleton className="h-6 w-14 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const techs = getTechnologies(project);
                const outcomes = getOutcomes(project);
                const style = categoryStyles[project.category || ''] || fallbackCategoryStyle;

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    className="surface-card surface-card-hover group flex flex-col p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      {project.category && (
                        <span
                          className={`inline-flex items-center rounded border px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${style.badge}`}
                        >
                          {project.category}
                        </span>
                      )}
                      {outcomes[0] && (
                        <span className={`inline-flex min-w-0 items-center gap-1.5 font-mono text-[10px] ${style.text}`}>
                          <span className={`size-1.5 shrink-0 rounded-full ${style.dot}`} />
                          <span className="truncate">{outcomes[0]}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 text-lg font-bold tracking-normal text-foreground">{project.title}</h3>

                    {project.shortDescription && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/55">
                        {project.shortDescription}
                      </p>
                    )}

                    {outcomes[0] && (
                      <div className="mt-3 flex items-start gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2">
                        <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${style.text}`} />
                        <span className="text-xs leading-relaxed text-foreground/70">{outcomes[0]}</span>
                      </div>
                    )}

                    <div className="mt-auto pt-4">
                      {techs.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {techs.slice(0, 4).map((tech, index) => (
                            <span
                              key={tech}
                              className={`rounded bg-secondary px-2 py-0.5 font-mono text-[10px] ${
                                index % 3 === 0
                                  ? 'text-primary'
                                  : index % 3 === 1
                                    ? 'text-accent-emerald'
                                    : 'text-foreground/60'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {techs.length > 4 && (
                            <span className="rounded bg-secondary px-2 py-0.5 font-mono text-[10px] text-foreground/35">
                              +{techs.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
                        <span className="font-mono text-[10px] text-foreground/35">{project.duration || ''}</span>
                        <ProjectCardLinks project={project} />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center py-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Filter size={42} className="mb-4 text-foreground/20" />
            <p className="font-medium text-foreground/55">No projects found matching your criteria.</p>
            <p className="mt-1 text-sm text-foreground/30">Try adjusting your search or filter.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
