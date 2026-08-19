import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TIMELINE = [
  {
    year: '2027',
    label: 'Expected',
    title: 'Graduation',
    description: 'B.E. Computer Science & Engineering — Chandigarh University',
    highlight: true,
  },
  {
    year: '2026',
    label: 'Current',
    title: 'DSA + Placement Prep',
    description: 'Actively solving problems on LeetCode & Codeforces. Preparing for software engineering roles.',
    highlight: false,
  },
  {
    year: '2025',
    label: 'Current',
    title: 'Building Projects',
    description: 'Working on software, AI/ML, IoT, and data analytics projects to gain hands-on experience.',
    highlight: false,
  },
  {
    year: '2024',
    label: 'Started',
    title: 'Competitive Programming',
    description: 'Began structured practice on Codeforces and LeetCode, learning algorithmic thinking.',
    highlight: false,
  },
  {
    year: '2023',
    label: 'Started',
    title: 'Chandigarh University',
    description: 'Began B.E. in Computer Science & Engineering. Learned C, C++, Java, and core CS fundamentals.',
    highlight: false,
  },
];

export default function Journey() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="journey" className="py-20 md:py-36 px-5 sm:px-6 md:px-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10 sm:mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="font-mono text-xs text-accent tracking-[0.3em]">05</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-5">Journey</div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-text-primary mb-2 sm:mb-3">
            MY JOURNEY
          </h2>
          <p className="text-text-secondary text-sm max-w-sm">
            An honest timeline of where I've been and where I'm headed.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — shifted for small screens */}
          <div className="absolute left-[44px] sm:left-[60px] md:left-[80px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4 sm:gap-8 md:gap-12 relative pb-8 sm:pb-12 last:pb-0"
              >
                {/* Year block — narrower on mobile */}
                <div className="w-11 sm:w-[60px] md:w-[80px] shrink-0 pt-1 text-right pr-2 sm:pr-4">
                  <div
                    className={`font-mono text-xs font-bold ${
                      item.highlight ? 'text-accent' : 'text-text-muted'
                    }`}
                  >
                    {item.year}
                  </div>
                  <div className="font-mono text-[10px] text-text-muted/50 mt-0.5 leading-tight">
                    {item.label}
                  </div>
                </div>

                {/* Dot — repositioned for mobile */}
                <div className="absolute left-[36px] sm:left-[52px] md:left-[72px] top-1.5">
                  <div
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 ${
                      item.highlight
                        ? 'border-accent bg-accent/20'
                        : 'border-border-strong bg-bg'
                    } transition-colors duration-300`}
                  />
                  {item.highlight && (
                    <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 border border-border bg-bg-elevated p-3 sm:p-4 md:p-5 hover:border-accent/20 transition-colors duration-300 group">
                  <div
                    className={`font-semibold text-sm sm:text-base mb-1 group-hover:text-accent transition-colors duration-300 ${
                      item.highlight ? 'text-accent' : 'text-text-primary'
                    }`}
                  >
                    {item.title}
                  </div>
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
