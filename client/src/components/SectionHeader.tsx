import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(
        'flex flex-col',
        align === 'center' ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-2xl items-start text-left',
        className
      )}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="section-heading mt-4 text-balance">{title}</h2>
      {description && <p className={cn('section-copy', align === 'left' && 'mx-0')}>{description}</p>}
    </motion.div>
  );
}
