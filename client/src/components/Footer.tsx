import { Github, Linkedin, Mail, Heart, Code2, ArrowUpRight, Palette } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/in/georgevictorkamal', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/georgevictorkamal', label: 'GitHub' },
    { icon: Palette, href: 'https://behance.net/georgevictorkamal', label: 'Behance' },
    { icon: Mail, href: 'mailto:georgevictorkamal@gmail.com', label: 'Email' },
  ];

  const navLinks = [
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border mt-10">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md shadow-primary/15">
                <Code2 size={18} className="text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-sm">George Victor Kamal</span>
                <p className="text-[10px] text-foreground/40 leading-tight">Senior Full-Stack Software Engineer</p>
              </div>
            </div>
            <p className="text-foreground/50 text-sm leading-relaxed max-w-sm">
              Building enterprise systems that scale — .NET Core, Angular, Flutter, Azure. 10,000+ users served. 40% faster APIs. Open to senior & lead engineering roles.
            </p>
          </div>

          {}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/50 hover:text-primary transition-colors flex items-center gap-1 group"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/GeorgeVictor.pdf"
                  download="George_Victor_Kamal_CV.pdf"
                  className="text-sm text-primary/70 hover:text-primary transition-colors flex items-center gap-1 group font-medium"
                >
                  Download CV
                  <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {}
          <div className="md:col-span-4">
            <h4 className="font-semibold text-sm mb-4">Connect</h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-secondary/60 hover:bg-primary hover:text-primary-foreground rounded-xl transition-all duration-300 text-sm text-foreground/60"
                  title={label}
                >
                  <Icon size={16} />
                  <span className="text-xs font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="border-t border-border/60"></div>

        {}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-foreground/40">
          <p>
            © {currentYear} George Victor Kamal. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-rose-500 fill-rose-500" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
