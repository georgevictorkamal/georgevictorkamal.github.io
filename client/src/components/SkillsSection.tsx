import { motion } from 'framer-motion';
import { Code2, Database, Cloud, Wrench, Zap, GitBranch, Shield, Layers } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  gradient: string;
  iconBg: string;
}

export default function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Languages',
      icon: <Code2 size={22} />,
      skills: ['C#', 'JavaScript', 'TypeScript', 'Dart', 'SQL', 'HTML5', 'CSS3'],
      gradient: 'from-teal-500 to-emerald-600',
      iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    },
    {
      title: 'Frontend',
      icon: <Zap size={22} />,
      skills: ['Angular', 'Flutter', 'Bootstrap', 'Responsive Design', 'Cross-browser Compatibility'],
      gradient: 'from-emerald-500 to-teal-600',
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Backend',
      icon: <Wrench size={22} />,
      skills: ['.NET Core', 'ASP.NET Web API', 'Entity Framework', 'Node.js', 'RESTful APIs', 'Microservices', 'Swagger'],
      gradient: 'from-cyan-500 to-teal-600',
      iconBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    },
    {
      title: 'Databases',
      icon: <Database size={22} />,
      skills: ['SQL Server', 'Oracle Database', 'PostgreSQL', 'MongoDB', 'Redis Caching'],
      gradient: 'from-teal-500 to-cyan-600',
      iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    },
    {
      title: 'Cloud & DevOps',
      icon: <Cloud size={22} />,
      skills: ['Microsoft Azure', 'Google Cloud', 'Firebase', 'Docker', 'CI/CD', 'GitHub Actions', 'Git'],
      gradient: 'from-sky-500 to-cyan-600',
      iconBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    },
    {
      title: 'Microsoft Power Platform',
      icon: <GitBranch size={22} />,
      skills: ['SharePoint', 'PowerApps', 'Power Automate', 'Power Platform', 'Power BI'],
      gradient: 'from-teal-500 to-emerald-600',
      iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    },
    {
      title: 'Testing & QA',
      icon: <Shield size={22} />,
      skills: ['Moq', 'Unit Testing', 'Integration Testing', 'Software Testing', 'Postman'],
      gradient: 'from-emerald-500 to-teal-600',
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Architecture & Methods',
      icon: <Layers size={22} />,
      skills: ['Agile', 'Scrum', 'Clean Architecture', 'OOP', 'Repository Pattern', 'Factory Pattern', 'MVVM'],
      gradient: 'from-teal-600 to-cyan-600',
      iconBg: 'bg-teal-600/10 text-teal-700 dark:text-teal-400',
    },
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

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35 },
    },
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl"></div>
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
            Technical Expertise
          </span>
          <h2 className="mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-lg text-foreground/55 max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks mastered through enterprise-level projects and continuous learning.
          </p>
        </motion.div>

        {}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

              <div className="relative bg-card border border-border rounded-2xl p-5 hover:border-primary/40 transition-all duration-300 h-full">
                {}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl ${category.iconBg} transition-colors duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-base font-semibold tracking-normal">{category.title}</h3>
                </div>

                {}
                <motion.div
                  className="flex flex-wrap gap-1.5"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={skillVariants}
                      className="px-2.5 py-1 bg-secondary/80 text-foreground/65 rounded-lg text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-transparent hover:border-primary/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
