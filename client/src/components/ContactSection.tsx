import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, AlertCircle, Linkedin, Github, ArrowUpRight, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendMessage = trpc.portfolio.contact.send.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Message sent successfully! I'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        toast.warning(data.message || "Could not deliver your message. Please try emailing directly.");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) { toast.error('Please fix the errors in the form'); return; }
    setIsSubmitting(true);
    try { await sendMessage.mutateAsync(formData); } finally { setIsSubmitting(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'georgevictorkamal@gmail.com', href: 'mailto:georgevictorkamal@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+20 12 11 388 499', href: 'tel:+201211388499' },
    { icon: MapPin, label: 'Location', value: 'Cairo, Egypt', href: undefined },
  ];

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/georgevictorkamal' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/georgevictorkamal' },
    { icon: Palette, label: 'Behance', href: 'https://behance.net/georgevictorkamal' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
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
            Get in Touch
          </span>
          <h2 className="mb-4">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-lg text-foreground/55 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {}
          <motion.div
            className="lg:col-span-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href }) => {
                const Wrapper = href ? 'a' : 'div';
                return (
                  <Wrapper
                    key={label}
                    {...(href ? { href, ...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : {})}
                    className="flex gap-3.5 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/45 mb-0.5">{label}</p>
                      <p className="font-medium text-sm">{value}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </motion.div>

            {}
            <motion.div variants={itemVariants} className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-foreground/45 mb-3 font-medium">Connect on social:</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-xl transition-all duration-300 text-sm font-medium text-foreground/60"
                  >
                    <Icon size={16} className="shrink-0" />
                    <span className="whitespace-nowrap">{label}</span>
                    <ArrowUpRight size={12} className="opacity-50 shrink-0" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {}
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <motion.div variants={itemVariants}>
                <label htmlFor="contact-name" className="block text-xs font-medium mb-1.5 text-foreground/70">Name</label>
                <Input
                  id="contact-name" type="text" name="name" autoComplete="name"
                  value={formData.name} onChange={handleChange} placeholder="Your name"
                  className={`bg-secondary/50 border-border ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="contact-email" className="block text-xs font-medium mb-1.5 text-foreground/70">Email</label>
                <Input
                  id="contact-email" type="email" name="email" autoComplete="email"
                  value={formData.email} onChange={handleChange} placeholder="your@email.com"
                  className={`bg-secondary/50 border-border ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mb-5">
              <label htmlFor="contact-subject" className="block text-xs font-medium mb-1.5 text-foreground/70">Subject</label>
              <Input
                id="contact-subject" type="text" name="subject" autoComplete="off"
                value={formData.subject} onChange={handleChange} placeholder="What is this about?"
                className={`bg-secondary/50 border-border ${errors.subject ? 'border-red-500' : ''}`}
              />
              {errors.subject && (
                <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle size={12} /> {errors.subject}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="mb-5">
              <label htmlFor="contact-message" className="block text-xs font-medium mb-1.5 text-foreground/70">
                Message <span className="text-foreground/30">({formData.message.length}/5000)</span>
              </label>
              <Textarea
                id="contact-message" name="message" autoComplete="off"
                value={formData.message} onChange={handleChange}
                placeholder="Your message here..." rows={5}
                className={`bg-secondary/50 border-border resize-none ${errors.message ? 'border-red-500' : ''}`}
              />
              {errors.message && (
                <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle size={12} /> {errors.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                disabled={isSubmitting || sendMessage.isPending}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
              >
                {isSubmitting || sendMessage.isPending ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
