import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Palette,
  Phone,
  Send,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import SectionHeader from '@/components/SectionHeader';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const contactChannels = [
  {
    icon: Mail,
    label: 'Email',
    value: 'georgevictorkamal@gmail.com',
    href: 'mailto:georgevictorkamal@gmail.com',
    copyValue: 'georgevictorkamal@gmail.com',
    tile: 'bg-primary/10 text-primary',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+20 12 11 388 499',
    href: 'tel:+201211388499',
    copyValue: '+201211388499',
    tile: 'bg-accent-emerald/10 text-accent-emerald',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Cairo, Egypt (available globally)',
    href: undefined,
    copyValue: undefined,
    tile: 'bg-accent-mint/10 text-accent-mint',
  },
];

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/georgevictorkamal', accent: 'text-primary' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/georgevictorkamal', accent: 'text-accent-emerald' },
  { icon: Palette, label: 'Behance', href: 'https://behance.net/georgevictorkamal', accent: 'text-accent-mint' },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const sendMessage = trpc.portfolio.contact.send.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Message sent successfully! I'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        toast.warning(data.message || 'Could not deliver your message. Please try emailing directly.');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to send message. Please try again.');
    },
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    else if (formData.subject.trim().length < 5) newErrors.subject = 'Subject must be at least 5 characters';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    setIsSubmitting(true);
    try {
      await sendMessage.mutateAsync(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((previous) => ({ ...previous, [name]: undefined }));
    }
  };

  const copyToClipboard = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      toast.success(`${label} copied to clipboard`);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error('Could not copy to clipboard');
    }
  };

  const isSending = isSubmitting || sendMessage.isPending;

  return (
    <section id="contact" className="relative border-y border-border bg-surface-container-lowest py-20 md:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Get In Touch"
          title={
            <>
              Let&apos;s work <span className="gradient-text">together</span>
            </>
          }
          description="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
          className="mb-12"
        />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <motion.div
            className="flex flex-col gap-3 lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
          >
            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <motion.div
                  key={channel.label}
                  className="surface-card flex items-center justify-between gap-3 p-4"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${channel.tile}`}>
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="mono-label text-foreground/35">{channel.label}</span>
                      {channel.href ? (
                        <a
                          href={channel.href}
                          className="block truncate font-mono text-xs text-foreground transition-colors hover:text-primary"
                        >
                          {channel.value}
                        </a>
                      ) : (
                        <span className="block truncate font-mono text-xs text-foreground">{channel.value}</span>
                      )}
                    </div>
                  </div>

                  {channel.copyValue && (
                    <button
                      onClick={() => copyToClipboard(channel.copyValue!, channel.label)}
                      className="shrink-0 rounded-lg bg-secondary p-2 text-foreground/40 transition-colors hover:bg-primary/10 hover:text-primary"
                      aria-label={`Copy ${channel.label.toLowerCase()}`}
                      title={`Copy ${channel.label.toLowerCase()}`}
                    >
                      {copied === channel.label ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  )}
                </motion.div>
              );
            })}

            <motion.div
              className="surface-card flex flex-col gap-3 p-4"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <span className="mono-label text-foreground/35">Connect on social</span>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ icon: Icon, label, href, accent }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 font-mono text-xs text-foreground/65 transition-colors hover:bg-secondary/70 hover:text-foreground"
                  >
                    <Icon size={14} className={accent} />
                    {label}
                    <ArrowUpRight size={11} className="text-foreground/25" />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 px-1 pt-1 text-xs text-foreground/40"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.4 } },
              }}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-emerald opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-emerald" />
              </span>
              Usually replies within 24 hours
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="surface-card p-5 md:p-7 lg:col-span-7"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mono-label mb-1.5 block text-foreground/40">
                  Your name
                </label>
                <Input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`border-border bg-background ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle size={11} /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="mono-label mb-1.5 block text-foreground/40">
                  Your email
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@enterprise.com"
                  className={`border-border bg-background ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle size={11} /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="contact-subject" className="mono-label mb-1.5 block text-foreground/40">
                Subject
              </label>
              <Input
                id="contact-subject"
                type="text"
                name="subject"
                autoComplete="off"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Architecture lead role / full-stack project"
                className={`border-border bg-background ${errors.subject ? 'border-destructive' : ''}`}
              />
              {errors.subject && (
                <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle size={11} /> {errors.subject}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="contact-message" className="mono-label mb-1.5 flex items-center justify-between text-foreground/40">
                <span>Message</span>
                <span className="normal-case tracking-normal text-foreground/25">{formData.message.length}/5000</span>
              </label>
              <Textarea
                id="contact-message"
                name="message"
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your architecture requirements, timeline, or engineering opportunity..."
                rows={5}
                className={`resize-none border-border bg-background ${errors.message ? 'border-destructive' : ''}`}
              />
              {errors.message && (
                <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle size={11} /> {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent-emerald px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
