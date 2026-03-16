import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Code2 } from 'lucide-react';
import { Link } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm'
        : 'bg-background/40 backdrop-blur-md border-b border-transparent'
        }`}
    >
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-md shadow-primary/20">
            <Code2 size={18} className="text-primary-foreground" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-sm leading-tight">George Victor</span>
            <span className="text-[10px] text-foreground/40 leading-tight font-medium">Software Engineer</span>
          </div>
        </Link>

        {}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${activeSection === item.id
                ? 'text-primary bg-primary/8'
                : 'text-foreground/60 hover:text-foreground hover:bg-secondary/50'
                }`}
            >
              {item.label}
              {activeSection === item.id && (
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
              )}
            </a>
          ))}

          {}
          <div className="w-px h-6 bg-border mx-2"></div>

          {}
          <button
            onClick={toggleTheme}
            className="p-2.5 hover:bg-secondary rounded-xl transition-all duration-300 text-foreground/50 hover:text-foreground"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {}
        <div className="md:hidden flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="p-2.5 hover:bg-secondary rounded-xl transition-colors text-foreground/50 hover:text-foreground"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 hover:bg-secondary rounded-xl transition-colors text-foreground/70"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {}
      {isOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="container py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium py-2.5 px-4 rounded-xl transition-all duration-300 ${activeSection === item.id
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-foreground/60 hover:text-foreground hover:bg-secondary/50'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
