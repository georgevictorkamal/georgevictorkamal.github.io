import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Download, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const cvUrl = `${import.meta.env.BASE_URL}George_Victor_Kamal_CV.pdf`;
  const profileUrl = `${import.meta.env.BASE_URL}profile.png`;

  const navItems = [
    { label: 'Home', href: '/', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['contact', 'certifications', 'experience', 'projects', 'skills', 'about'];
      let found = false;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom > 0) {
            setActiveSection(sectionId);
            found = true;
            break;
          }
        }
      }

      if (!found && window.scrollY < 200) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hrefValue: string) => {
    if (hrefValue.startsWith('#')) {
      e.preventDefault();
      const id = hrefValue.slice(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
      }
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-border/70 bg-background/80 shadow-[0_18px_40px_-32px_rgba(0,0,0,0.9)] backdrop-blur-xl'
          : 'border-transparent bg-background/40 backdrop-blur-md'
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary via-cyan-400 to-accent-emerald p-[1.5px] shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
            <img
              src={profileUrl}
              alt=""
              className="h-full w-full rounded-full object-cover object-top"
            />
          </div>
          <div className="flex shrink-0 flex-col">
            <span className="whitespace-nowrap text-sm font-bold leading-tight">George Victor</span>
            <span className="hidden whitespace-nowrap font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-foreground/40 lg:block">
              Senior Full-Stack Software Engineer
            </span>
          </div>
        </Link>

        <div className="hidden shrink-0 items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-300 xl:px-3.5 ${
                activeSection === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/55 hover:bg-secondary/70 hover:text-foreground'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </a>
          ))}

          <div className="mx-2 h-5 w-px bg-border" />

          <a
            href={cvUrl}
            download="George_Victor_Kamal_CV.pdf"
            className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-foreground/55 transition-colors hover:bg-secondary/70 hover:text-primary lg:flex"
          >
            <Download size={14} />
            CV
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary ml-1 hidden shrink-0 whitespace-nowrap px-4 py-2 text-xs sm:inline-flex"
          >
            Hire Me
            <ArrowUpRight size={14} />
          </a>

          <button
            onClick={toggleTheme}
            className="ml-1 rounded-lg p-2 text-foreground/45 transition-colors hover:bg-secondary hover:text-foreground"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2.5 text-foreground/50 transition-colors hover:bg-secondary hover:text-foreground"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2.5 text-foreground/70 transition-colors hover:bg-secondary"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="container flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-primary/10 font-semibold text-primary'
                    : 'text-foreground/60 hover:bg-secondary/60 hover:text-foreground'
                }`}
              >
                {item.label}
              </a>
            ))}

            <div className="my-2 h-px bg-border" />

            <a
              href={cvUrl}
              download="George_Victor_Kamal_CV.pdf"
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-foreground/60 hover:bg-secondary/60 hover:text-foreground"
            >
              <Download size={16} />
              Download CV
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary mt-1 w-full"
            >
              Hire Me
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
