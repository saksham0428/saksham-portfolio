import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_STEPS = [
  { text: 'INITIALIZING KERNEL...', delay: 0 },
  { text: 'LOADING MODULES...', delay: 400 },
  { text: 'MOUNTING FILESYSTEM...', delay: 800 },
  { text: 'STARTING SERVICES...', delay: 1100 },
  { text: 'SYSTEM ONLINE', delay: 1400 },
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Animate progress bar
    const duration = 1800;
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(Math.floor(p * 100));
      if (p < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Step through boot messages
    BOOT_STEPS.forEach((step, i) => {
      setTimeout(() => setCurrentStep(i), step.delay);
    });

    // Complete
    setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 600);
    }, 2400);
  }, []);

  const barWidth = Math.max(0, Math.min(20, Math.floor(progress / 5)));
  const bar = '█'.repeat(barWidth) + '░'.repeat(20 - barWidth);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99998] bg-bg flex items-center justify-center"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-accent/20 pointer-events-none"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          <div className="font-mono text-sm md:text-base z-10 px-8 max-w-lg w-full">
            {/* Logo */}
            <motion.div
              className="text-accent text-2xl md:text-3xl font-bold tracking-widest mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              SAKSHAM.EXE
            </motion.div>

            {/* Boot log */}
            <div className="space-y-1 mb-6 text-text-secondary">
              {BOOT_STEPS.slice(0, currentStep + 1).map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={i === BOOT_STEPS.length - 1 ? 'text-accent' : ''}
                >
                  <span className="text-text-muted mr-2">[{String(i).padStart(2, '0')}]</span>
                  {step.text}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="border border-border-subtle p-3 mb-4">
              <div className="text-text-muted text-xs mb-2">BOOT PROGRESS</div>
              <div className="text-accent tracking-tight">
                [{bar}] {progress}%
              </div>
            </div>

            {/* Status */}
            {progress === 100 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-accent"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                SYSTEM READY
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
