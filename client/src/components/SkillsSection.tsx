import { motion } from 'framer-motion';
import {
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  Shield,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  tile: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: Code2,
    tile: 'bg-primary/10 text-primary',
    skills: ['C#', 'JavaScript', 'TypeScript', 'Dart', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frontend',
    icon: Zap,
    tile: 'bg-accent-emerald/10 text-accent-emerald',
    skills: ['Angular', 'Flutter', 'Bootstrap', 'Responsive Design', 'Cross-browser Compatibility'],
  },
  {
    title: 'Backend',
    icon: Wrench,
    tile: 'bg-primary/10 text-primary',
    skills: ['.NET Core', 'ASP.NET Web API', 'Entity Framework', 'Node.js', 'RESTful APIs', 'Microservices', 'Swagger'],
  },
  {
    title: 'Databases',
    icon: Database,
    tile: 'bg-accent-mint/10 text-accent-mint',
    skills: ['SQL Server', 'Oracle Database', 'PostgreSQL', 'MongoDB', 'Redis Caching'],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    tile: 'bg-primary/10 text-primary',
    skills: ['Microsoft Azure', 'Google Cloud', 'Firebase', 'Docker', 'CI/CD', 'GitHub Actions', 'Git'],
  },
  {
    title: 'Power Platform',
    icon: GitBranch,
    tile: 'bg-accent-emerald/10 text-accent-emerald',
    skills: ['SharePoint', 'PowerApps', 'Power Automate', 'Power Platform', 'Power BI'],
  },
  {
    title: 'Testing & QA',
    icon: Shield,
    tile: 'bg-accent-mint/10 text-accent-mint',
    skills: ['Moq', 'Unit Testing', 'Integration Testing', 'Software Testing', 'Postman'],
  },
  {
    title: 'Architecture',
    icon: Layers,
    tile: 'bg-primary/10 text-primary',
    skills: ['Agile', 'Scrum', 'Clean Architecture', 'OOP', 'Repository Pattern', 'Factory Pattern', 'MVVM'],
  },
];

const chipTones = ['text-primary', 'text-accent-emerald', 'text-accent-mint', 'text-foreground/75'];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative border-y border-border bg-surface-container-lowest py-20 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Technical Expertise"
          title={
            <>
              Skills &amp; <span className="gradient-text">Technologies</span>
            </>
          }
          description="A comprehensive toolkit of modern technologies and frameworks mastered through enterprise-level projects and continuous learning."
          className="mb-10"
        />

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
          }}
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                className="surface-card surface-card-hover flex h-full flex-col p-5"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${category.tile}`}>
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-bold tracking-normal text-foreground">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill, index) => (
                    <span
                      key={skill}
                      className={`rounded-md bg-secondary/70 px-2 py-1 font-mono text-[11px] leading-none transition-colors hover:bg-primary/10 ${
                        chipTones[index % chipTones.length]
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
