import { motion } from 'framer-motion';
import { Sparkles, Code2, Rocket, Heart, Coffee } from 'lucide-react';

export default function AboutMeSection() {
    const points = [
        {
            icon: <Code2 className="text-blue-500" size={24} />,
            title: "Problem Solver",
            description: "I don't just write code; I build systems that solve real business bottlenecks. I'm obsessed with efficiency and performance."
        },
        {
            icon: <Rocket className="text-emerald-500" size={24} />,
            title: "Growth Mindset",
            description: "The tech world moves fast, and so do I. I'm constantly exploring new frameworks and architectural patterns to stay ahead."
        },
        {
            icon: <Heart className="text-rose-500" size={24} />,
            title: "User Centric",
            description: "Technical excellence is nothing without a great user experience. I bridge the gap between complex backends and intuitive interfaces."
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
                            Personal Narrative
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Driven by <span className="gradient-text">Logic</span>,<br />
                            Inspired by <span className="gradient-text">Innovation</span>
                        </h2>
                        <div className="space-y-4 text-lg text-foreground/70 leading-relaxed">
                            <p>
                                My journey as a software engineer is fueled by a simple philosophy:
                                <strong className="text-foreground"> Code is a tool, but software is a solution.</strong>
                            </p>
                            <p>
                                With over 3 years of experience in the enterprise space, I've seen firsthand how
                                technical debt can cripple progress. That's why I advocate for clean architecture,
                                robust testing, and scalable cloud solutions from day one.
                            </p>
                            <p>
                                When I'm not architecting APIs or fine-tuning Flutter apps, you can find me
                                mentoring junior developers or contributing to open-source discussions.
                                I believe that the best way to grow is to empower others around you.
                            </p>
                        </div>

                        <div className="mt-8 flex items-center gap-4 p-4 bg-card border rounded-2xl">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <Coffee size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Let's connect over coffee</p>
                                <p className="text-xs text-foreground/50">I'm always open to discussing new tech and big ideas.</p>
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
