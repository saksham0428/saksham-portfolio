import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillGroups } from '../../data/skills';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="skills" className="py-24 md:py-36 px-6 md:px-10 bg-bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="font-mono text-xs text-accent tracking-[0.3em]">02</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-6">Skills</div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text-primary">
            TECHNICAL STACK
          </h2>
        </motion.div>

        {/* Skill groups grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              custom={gi}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="border border-border bg-bg-elevated p-5 group hover:border-accent/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/[0.02] group-hover:to-accent/[0.05] transition-all duration-500 pointer-events-none" />

              {/* Category header */}
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-xs text-text-muted tracking-widest uppercase group-hover:text-accent transition-colors duration-300">
                  {group.category}
                </div>
                <span className="font-mono text-lg text-accent/30 group-hover:text-accent/60 transition-colors duration-300 leading-none">
                  {group.icon}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs text-text-secondary border border-border px-2.5 py-1 hover:border-accent/40 hover:text-text-primary transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
