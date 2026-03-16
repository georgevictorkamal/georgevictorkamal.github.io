import { useParams, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Button onClick={() => navigate('/projects')} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>
      </div>
    );
  }

  const technologies = project.technologies ? JSON.parse(project.technologies) : [];
  const outcomes = project.outcomes ? JSON.parse(project.outcomes) : [];
  const challenges = project.challenges ? JSON.parse(project.challenges) : [];
  const measurableOutcomes = project.measurableOutcomes ? JSON.parse(project.measurableOutcomes) : [];
  const architecture = project.architecture ? JSON.parse(project.architecture) : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <Button
            onClick={() => navigate('/#projects')}
            variant="ghost"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>
        </div>
      </div>

      {}
      <motion.div
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {}
        <motion.div variants={itemVariants} className="mb-12">
          {project.imageUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl bg-secondary/30 relative aspect-video md:aspect-[21/9]">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80';
                  target.onerror = null;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            {project.title}
          </h1>
          <p className="text-xl text-slate-600 mb-6">{project.description}</p>

          {}
          <div className="flex flex-wrap gap-4 mb-8">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <ExternalLink className="w-4 h-4" />
                View Live Demo
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
              >
                <Github className="w-4 h-4" />
                View Source Code
              </a>
            )}
          </div>
        </motion.div>

        {}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">My Role</h3>
            <p className="text-lg font-semibold text-slate-900">{project.role || 'Full Stack Developer'}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Team Size</h3>
            <p className="text-lg font-semibold text-slate-900">{project.teamSize || 'Solo'}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Duration</h3>
            <p className="text-lg font-semibold text-slate-900">{project.duration || '3-6 months'}</p>
          </div>
        </motion.div>

        {}
        {project.caseStudyOverview && (
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Case Study Overview</h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <p className="text-slate-700 leading-relaxed">{project.caseStudyOverview}</p>
            </div>
          </motion.section>
        )}

        {}
        {project.problemStatement && (
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Problem Statement</h2>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {project.problemStatement}
              </p>
            </div>
          </motion.section>
        )}

        {}
        {project.solution && (
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Solution</h2>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {project.solution}
              </p>
            </div>
          </motion.section>
        )}

        {}
        {architecture && (
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Technical Architecture</h2>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <div className="space-y-4">
                {architecture.frontend && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Frontend</h3>
                    <p className="text-slate-600">{architecture.frontend}</p>
                  </div>
                )}
                {architecture.backend && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Backend</h3>
                    <p className="text-slate-600">{architecture.backend}</p>
                  </div>
                )}
                {architecture.database && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Database</h3>
                    <p className="text-slate-600">{architecture.database}</p>
                  </div>
                )}
                {architecture.infrastructure && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Infrastructure</h3>
                    <p className="text-slate-600">{architecture.infrastructure}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {}
        {technologies.length > 0 && (
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {}
        {challenges.length > 0 && (
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Challenges & Solutions</h2>
            <div className="space-y-4">
              {challenges.map((challenge: string, idx: number) => (
                <div key={idx} className="bg-white p-4 rounded-lg border border-slate-200">
                  <p className="text-slate-700">{challenge}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {}
        {measurableOutcomes.length > 0 && (
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Measurable Outcomes</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {measurableOutcomes.map((outcome: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200"
                >
                  <p className="text-slate-700 font-medium">{outcome}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {}
        {outcomes.length > 0 && (
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Key Outcomes</h2>
            <ul className="space-y-3">
              {outcomes.map((outcome: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mt-1">
                    ✓
                  </span>
                  <span className="text-slate-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {}
        {project.contribution && (
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">My Contribution</h2>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {project.contribution}
              </p>
            </div>
          </motion.section>
        )}

        {}
        <motion.div variants={itemVariants} className="text-center py-12">
          <h3 className="text-2xl font-bold mb-4 text-slate-900">
            Interested in similar work?
          </h3>
          <Button
          onClick={() => navigate('/#contact')}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Get in Touch
        </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
