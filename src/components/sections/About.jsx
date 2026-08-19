import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile } from '../../data/profile';

const INFO_TILES = [
  { label: 'EDUCATION', value: 'Chandigarh University' },
  { label: 'DEGREE', value: 'Computer Science Engineering' },
  { label: 'GRADUATION', value: '2027' },
  { label: 'FOCUS', value: 'Software Dev + DSA' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-10 relative" ref={ref}>
      {/* Section label */}
      <motion.div
        className="max-w-7xl mx-auto mb-16"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-xs text-accent tracking-[0.3em]">01</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="font-mono text-xs text-text-muted tracking-widest uppercase">About</div>
      </motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Terminal card */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="border border-border bg-bg-elevated relative overflow-hidden"
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-bg-surface">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            </div>
            <span className="font-mono text-xs text-text-muted ml-2">about.sh</span>
          </div>

          <div className="p-6 font-mono text-sm space-y-4">
            <div>
              <span className="text-text-muted">$ </span>
              <span className="text-accent">whoami</span>
            </div>

            <div className="pl-2 border-l border-border-subtle text-text-secondary leading-relaxed">
              Saksham — Computer Science student focused on building,{' '}
              <span className="text-text-primary">learning</span>, and solving challenging problems.
            </div>

            <div>
              <span className="text-text-muted">$ </span>
              <span className="text-accent">cat interests.txt</span>
            </div>

            <div className="pl-2 space-y-1">
              {[
                'Software Development',
                'Data Structures & Algorithms',
                'AI / Computer Vision',
                'IoT & Embedded Systems',
                'Competitive Programming',
              ].map((item) => (
                <div key={item} className="text-text-secondary">
                  <span className="text-accent mr-2">▸</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1 text-text-muted text-xs mt-4">
              <span className="text-accent">saksham@portfolio</span>:~$
              <span className="terminal-cursor ml-1" />
            </div>
          </div>
        </motion.div>

        {/* Right side: info tiles + statement */}
        <div className="space-y-8">
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            {INFO_TILES.map((tile, i) => (
              <motion.div
                key={tile.label}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                className="border border-border p-4 group hover:border-accent/40 transition-colors duration-300"
              >
                <div className="font-mono text-xs text-text-muted tracking-widest mb-2 group-hover:text-accent transition-colors duration-300">
                  {tile.label}
                </div>
                <div className="text-text-primary text-sm font-medium">{tile.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Personal statement */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="relative pl-5 border-l-2 border-accent/40"
          >
            <p className="text-text-secondary text-base leading-relaxed italic">
              "I enjoy understanding how things work, solving problems, and turning ideas into working software."
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-wrap gap-2"
          >
            {[
              { label: 'LeetCode', href: profile.leetcode },
              { label: 'Codeforces', href: profile.codeforces },
              { label: 'GitHub', href: profile.github },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-muted border border-border px-3 py-1.5 hover:border-accent/40 hover:text-accent transition-all duration-200"
              >
                ↗ {link.label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
