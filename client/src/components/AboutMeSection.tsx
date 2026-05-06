import { motion } from 'framer-motion';
import { Sparkles, Code2, Rocket, Heart } from 'lucide-react';

export default function AboutMeSection() {
    const points = [
        {
            icon: <Code2 className="text-blue-500" size={24} />,
            title: "Architecture-first thinker",
            description: "I design systems before I write code. Clean architecture, repository patterns, and microservices aren't buzzwords — they're the difference between a codebase that scales and one that collapses under load."
        },
        {
            icon: <Rocket className="text-emerald-500" size={24} />,
            title: "Full-stack ownership",
            description: "From database schema to Flutter UI to Azure DevOps pipeline — I own the full delivery. No throwing work over walls. I've taken 13 enterprise products from first commit to production."
        },
        {
            icon: <Heart className="text-rose-500" size={24} />,
            title: "Team multiplier",
            description: "I mentor two junior engineers and run weekly knowledge-sharing sessions. The best code I write is the pull request review that stops a bug from reaching 10,000 users."
        }
    ];

    return (
        <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-secondary/20">
            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 border border-primary/20">
                            About Me
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            I build systems that <span className="gradient-text">scale</span> and<br />
                            teams that <span className="gradient-text">grow</span>
                        </h2>
                        <div className="space-y-4 text-lg text-foreground/70 leading-relaxed">
                            <p>
                                My engineering philosophy is simple:{' '}
                                <strong className="text-foreground">systems should work harder than the people who built them.</strong>
                            </p>
                            <p>
                                At ITE Corp I've designed and shipped platforms that now run quietly in the background
                                of real organisations — a HIPAA-compliant donor system serving{' '}
                                <strong className="text-foreground">10,000+ patients</strong>, a government procurement
                                engine processing <strong className="text-foreground">200+ monthly tenders</strong>, and
                                a geofenced attendance tracker used by field staff every single day.
                            </p>
                            <p>
                                I care about the numbers that matter: we cut API response times by{' '}
                                <strong className="text-foreground">40%</strong> through Redis caching and microservice
                                refactoring, reduced deployment incidents by{' '}
                                <strong className="text-foreground">70%</strong> after introducing end-to-end CI/CD, and
                                saved hundreds of manual work-hours through Power Platform automation.
                            </p>
                            <p>
                                When I'm not shipping features, I'm running weekly clean architecture and testing
                                sessions with the engineers I mentor — because the best system I can build is one
                                my team can confidently own and evolve long after I've moved on.
                            </p>
                        </div>

                        <div className="mt-8 flex items-center gap-4 p-4 bg-card border rounded-2xl">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-primary">Open to senior engineering roles</p>
                                <p className="text-xs text-foreground/50">Cairo · Remote · Hybrid — let's talk architecture and scale.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 gap-6"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {points.map((point, index) => (
                            <motion.div
                                key={index}
                                className="p-6 bg-card border rounded-3xl hover:border-primary/50 transition-all duration-300 group shadow-sm hover:shadow-md"
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex gap-5">
                                    <div className="size-14 rounded-2xl bg-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        {point.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                                        <p className="text-foreground/60 leading-relaxed">
                                            {point.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
