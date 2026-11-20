import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Palette,
} from 'lucide-react';

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/georgevictorkamal', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/georgevictorkamal', label: 'GitHub' },
  { icon: Palette, href: 'https://behance.net/georgevictorkamal', label: 'Behance' },
  { icon: Mail, href: 'mailto:georgevictorkamal@gmail.com', label: 'Email' },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const cvUrl = `${import.meta.env.BASE_URL}George_Victor_Kamal_CV.pdf`;
  const profileUrl = `${import.meta.env.BASE_URL}profile.png`;

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-surface-container-lowest">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary via-cyan-400 to-accent-emerald p-[1.5px] shadow-md shadow-primary/15">
                <img
                  src={profileUrl}
                  alt=""
                  className="h-full w-full rounded-full object-cover object-top"
                />
              </div>
              <div>
                <span className="text-sm font-bold text-foreground">George Victor Kamal</span>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/35">
                  Senior Full-Stack Software Engineer
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/50">
              Building enterprise systems that scale — .NET Core, Angular, Flutter, and Azure. 10,000+ users
              served, 40% faster APIs, and a focus on reliability that holds under production load.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex size-9 items-center justify-center rounded-full bg-secondary text-foreground/45 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                  aria-label={label}
                  title={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="mono-label mb-4 text-foreground/35">Navigate</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="group inline-flex items-center gap-1 text-sm text-foreground/50 transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={11}
                      className="opacity-0 transition-opacity group-hover:opacity-60"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="mono-label mb-4 text-foreground/35">Get in touch</h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:georgevictorkamal@gmail.com"
                className="flex items-center gap-2 text-foreground/55 transition-colors hover:text-primary"
              >
                <Mail size={14} className="text-primary" />
                georgevictorkamal@gmail.com
              </a>
              <p className="flex items-center gap-2 text-foreground/55">
                <MapPin size={14} className="text-accent-emerald" />
                Cairo, Egypt · Remote / Hybrid
              </p>
            </div>

            <a
              href={cvUrl}
              download="George_Victor_Kamal_CV.pdf"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
            >
              <Download size={14} />
              Download CV
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-foreground/35 sm:flex-row">
          <p>© {currentYear} George Victor Kamal. All rights reserved.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.08em]">
            React · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
