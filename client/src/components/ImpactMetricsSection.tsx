import { motion } from 'framer-motion';
import { FileText, Gauge, GitBranch, Users } from 'lucide-react';

const metrics = [
  {
    value: '40%',
    label: 'Faster API response',
    tag: 'Latency',
    description: 'Redis caching layers, query profiling, and microservice decoupling.',
    icon: Gauge,
    accent: 'text-primary',
    tile: 'bg-primary/10 text-primary',
  },
  {
    value: '10,000+',
    label: 'Users served',
    tag: 'Scale',
    description: 'High-concurrency healthcare and donor platforms running without downtime.',
    icon: Users,
    accent: 'text-accent-emerald',
    tile: 'bg-accent-emerald/10 text-accent-emerald',
  },
  {
    value: '70%',
    label: 'Fewer deployment incidents',
    tag: 'Resilience',
    description: 'Automated CI/CD validation, unit testing coverage, and staging smoke runs.',
    icon: GitBranch,
    accent: 'text-accent-mint',
    tile: 'bg-accent-mint/10 text-accent-mint',
  },
  {
    value: '200+',
    label: 'Monthly tenders',
    tag: 'Volume',
    description: 'Mission-critical enterprise procurement transactions processed reliably.',
    icon: FileText,
    accent: 'text-primary',
    tile: 'bg-primary/10 text-primary',
  },
];

const secondaryMetrics = [
  { value: '99.9%', label: 'Uptime sustained' },
  { value: '13', label: 'Products shipped' },
  { value: '50+', label: 'Facilities supported' },
  { value: '2', label: 'Engineers mentored' },
];

export default function ImpactMetricsSection() {
  return (
    <section id="metrics" className="relative border-y border-border bg-surface-container-lowest py-16 md:py-20">
      <div className="container">
        <motion.div
          className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">High-Yield Performance</span>
          <h2 className="section-heading mt-4">Quantifiable production impact</h2>
          <p className="section-copy">
            Outcomes from shipping and operating business-critical systems, not just feature checklists.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                className="surface-card surface-card-hover group flex flex-col p-5"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                viewport={{ once: true }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className={`icon-tile ${metric.tile}`}>
                    <Icon size={18} />
                  </div>
                  <span className="mono-label rounded bg-secondary px-2 py-1 text-foreground/45">
                    {metric.tag}
                  </span>
                </div>

                <span className={`metric-value ${metric.accent}`}>{metric.value}</span>
                <h3 className="mt-1 text-base font-bold text-foreground">{metric.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/55">{metric.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {secondaryMetrics.map((metric) => (
            <div key={metric.label} className="flex items-center justify-between gap-3 bg-card px-4 py-3.5">
              <span className="font-mono text-sm font-bold text-foreground">{metric.value}</span>
              <span className="text-right text-[11px] font-medium uppercase tracking-wide text-foreground/40">
                {metric.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
