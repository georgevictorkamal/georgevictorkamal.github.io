import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Github, ArrowRight, Layers, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { useLocation } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';

function ProjectCardLinks({ project }: { project: any }) {
  const [, navigate] = useLocation();

  return (
    <div className="flex gap-2 mt-auto flex-wrap">
      <button
        onClick={() => navigate(`/project/${project.id}`)}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 text-xs font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25"
      >
        <ArrowRight size={14} />
        Case Study
      </button>
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 bg-secondary text-foreground/70 rounded-xl hover:bg-secondary/80 transition-all duration-300 text-xs font-medium border border-border hover:border-primary/30"
        >
          <ExternalLink size={13} />
          Demo
        </a>
      )}
      {project.sourceUrl && (
        <a
          href={project.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 bg-secondary text-foreground/70 rounded-xl hover:bg-secondary/80 transition-all duration-300 text-xs font-medium border border-border hover:border-primary/30"
        >
          <Github size={13} />
          Code
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
    projects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats).sort();
  }, [projects]);

  
  const filteredProjects = useMemo(() => {
    let result = projects.filter((project) => {
      const searchLower = searchTerm.toLowerCase();
      
      let techMatches = false;
      if (project.technologies) {
        try {
          const techs = JSON.parse(project.technologies);
          techMatches = techs.some((t: string) => t.toLowerCase().includes(searchLower));
        } catch {
          techMatches = project.technologies.toLowerCase().includes(searchLower);
        }
      }

      const matchesSearch =
        project.title.toLowerCase().includes(searchLower) ||
        project.description?.toLowerCase().includes(searchLower) ||
        project.shortDescription?.toLowerCase().includes(searchLower) ||
        techMatches;

      if (!selectedCategory) return matchesSearch;
      return matchesSearch && project.category === selectedCategory;
    });
    
    
    return result.sort((a, b) => (a.order || 99) - (b.order || 99));
  }, [projects, searchTerm, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  
  const imageBadgeColors: Record<string, string> = {
    'Full Stack': 'bg-indigo-600/90 text-white backdrop-blur-md border border-indigo-500/50 shadow-sm',
    'Backend': 'bg-emerald-600/90 text-white backdrop-blur-md border border-emerald-500/50 shadow-sm',
    'Frontend': 'bg-violet-600/90 text-white backdrop-blur-md border border-violet-500/50 shadow-sm',
    'Mobile': 'bg-sky-600/90 text-white backdrop-blur-md border border-sky-500/50 shadow-sm',
    'Power Platform': 'bg-blue-600/90 text-white backdrop-blur-md border border-blue-500/50 shadow-sm',
  };

  
  const techBadgeColors: Record<string, string> = {
    'Full Stack': 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20',
    'Backend': 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20',
    'Frontend': 'bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20',
    'Mobile': 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20',
    'Power Platform': 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20',
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 border border-primary/20">
            Portfolio
          </span>
          <h2 className="mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-foreground/55 max-w-2xl mx-auto">
            A selection of impactful projects showcasing full-stack development, mobile engineering, and enterprise platform expertise.
          </p>
        </motion.div>

        {}
        <motion.div
          className="mb-10 space-y-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/35" size={18} />
            <Input
              id="projects-search"
              type="text"
              name="search"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 py-2.5 bg-card border-border rounded-xl"
              autoComplete="off"
            />
          </div>

          {}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="rounded-xl text-xs h-8"
            >
              <Layers size={13} className="mr-1" />
              All
              {!isLoading && <span className="ml-1 opacity-60">({projects.length})</span>}
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="rounded-xl text-xs h-8"
              >
                {cat}
              </Button>
            ))}
          </div>
        </motion.div>

        {}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden h-[400px] flex flex-col">
                <Skeleton className="w-full h-44 rounded-none" />
                <div className="p-5 flex flex-col gap-3 flex-grow">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="mt-auto flex gap-2">
                    <Skeleton className="h-9 w-24 rounded-xl" />
                    <Skeleton className="h-9 w-20 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              let techs: string[] = [];
              try {
                techs = project.technologies ? JSON.parse(project.technologies) : [];
              } catch {
                techs = project.technologies ? project.technologies.split(',').map(t => t.trim()) : [];
              }

              return (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="group relative"
                  whileHover={{ y: -6 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

                  <div className="relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                    {}
                    {project.imageUrl && (
                      <div className="w-full h-44 bg-secondary overflow-hidden relative">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop'; 
                            target.onerror = null; 
                          }}
                        />
                        {}
                        <div className="absolute inset-0 bg-gradient-to-t from-card/30 to-transparent"></div>
                        {}
                        {project.category && (
                          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${imageBadgeColors[project.category] || 'bg-secondary text-foreground/60 border border-border'}`}>
                            {project.category}
                          </div>
                        )}
                      </div>
                    )}

                    {}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1.5 tracking-normal">{project.title}</h3>

                      {project.shortDescription && (
                        <p className="text-foreground/50 text-sm mb-4 flex-grow leading-relaxed line-clamp-2">
                          {project.shortDescription}
                        </p>
                      )}

                      {}
                      {techs.length > 0 && (() => {
                        const techClass = project.category && techBadgeColors[project.category] 
                          ? techBadgeColors[project.category] 
                          : "bg-secondary text-foreground/70 border border-border";
                        return (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {techs.slice(0, 4).map((tech: string) => (
                              <span key={tech} className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium ${techClass}`}>
                                {tech}
                              </span>
                            ))}
                            {techs.length > 4 && (
                              <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium opacity-60 ${techClass}`}>
                                +{techs.length - 4}
                              </span>
                            )}
                          </div>
                        );
                      })()}

                      {}
                      <ProjectCardLinks project={project} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Filter size={48} className="mx-auto text-foreground/20 mb-4" />
            <p className="text-foreground/50 font-medium">No projects found matching your criteria.</p>
            <p className="text-foreground/30 text-sm mt-1">Try adjusting your search or filter.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
