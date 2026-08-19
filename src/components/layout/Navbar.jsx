import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Terminal } from 'lucide-react';
import { profile } from '../../data/profile';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'DSA', href: '#dsa' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled ? 'glass border-b border-border' : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-mono text-sm font-bold tracking-widest text-text-primary hover:text-accent transition-colors duration-200"
          >
            SAKSHAM<span className="text-accent">.EXE</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 relative group ${
                  activeSection === link.href.slice(1)
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                    activeSection === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenTerminal}
              className="font-mono text-xs tracking-widest text-text-muted border border-border px-3 py-1.5 hover:border-accent hover:text-accent transition-all duration-200 flex items-center gap-2"
              aria-label="Open terminal"
            >
              <Terminal size={12} />
              TERMINAL
            </button>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest bg-accent text-bg px-4 py-1.5 font-semibold hover:bg-accent/90 transition-colors duration-200 flex items-center gap-2"
            >
              <Download size={12} />
              RESUME
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-text-primary p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[999] bg-bg/98 backdrop-blur-md md:hidden flex flex-col pt-20 px-8"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          >
            <nav className="flex flex-col gap-6 mb-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="font-mono text-2xl font-bold text-text-secondary hover:text-accent transition-colors"
                >
                  <span className="text-accent text-sm mr-3">0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 mt-auto mb-12">
              <button
                onClick={() => { setMobileOpen(false); onOpenTerminal(); }}
                className="font-mono text-sm tracking-widest border border-border px-4 py-3 text-text-secondary hover:border-accent hover:text-accent transition-all flex items-center gap-2"
              >
                <Terminal size={14} />
                OPEN TERMINAL
              </button>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm tracking-widest bg-accent text-bg px-4 py-3 font-bold text-center flex items-center justify-center gap-2"
              >
                <Download size={14} />
                DOWNLOAD RESUME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
