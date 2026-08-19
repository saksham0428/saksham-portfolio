import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// UI
import CustomCursor from './components/ui/CustomCursor';
import Loader from './components/ui/Loader';
import ScrollProgress from './components/ui/ScrollProgress';
import Terminal from './components/ui/Terminal';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import DSA from './components/sections/DSA';
import Projects from './components/sections/Projects';
import Journey from './components/sections/Journey';
import Achievements from './components/sections/Achievements';
import Contact from './components/sections/Contact';

export default function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('saksham-loaded'));
  const [terminalOpen, setTerminalOpen] = useState(false);

  const handleLoaderComplete = () => {
    sessionStorage.setItem('saksham-loaded', '1');
    setLoading(false);
  };

  // Prevent body scroll when terminal is open
  useEffect(() => {
    document.body.style.overflow = terminalOpen ? 'hidden' : '';
  }, [terminalOpen]);

  return (
    <div className="noise-overlay relative">
      {/* Boot loader (once per session) */}
      <AnimatePresence>
        {loading && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Global UI */}
            <CustomCursor />
            <ScrollProgress />

            {/* Navigation */}
            <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

            {/* Main content */}
            <main>
              <Hero />
              <About />
              <Skills />
              <DSA />
              <Projects />
              <Journey />
              <Achievements />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />

            {/* Floating terminal button */}
            <motion.button
              onClick={() => setTerminalOpen(true)}
              className="fixed bottom-6 right-6 z-[500] bg-bg-elevated border border-border text-text-secondary hover:border-accent hover:text-accent transition-all duration-200 p-3 shadow-lg group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
              aria-label="Open terminal"
              title="Open Terminal (type 'help' to see commands)"
            >
              <div className="flex items-center gap-2 font-mono text-xs">
                <TerminalIcon size={14} />
                <span className="hidden md:inline">TERMINAL</span>
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 font-mono text-xs bg-bg-elevated border border-border px-2 py-1 text-text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Press ESC to close
              </div>
            </motion.button>

            {/* Terminal modal */}
            <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
