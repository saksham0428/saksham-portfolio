import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { achievements } from '../../data/achievements';

const CATEGORY_COLORS = {
  DSA: 'text-green-400 border-green-400/20',
  'Competitive Programming': 'text-blue-400 border-blue-400/20',
  Projects: 'text-purple-400 border-purple-400/20',
  Academic: 'text-yellow-400 border-yellow-400/20',
  Certification: 'text-orange-400 border-orange-400/20',
};

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="achievements" className="py-24 md:py-36 px-6 md:px-10 bg-bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="font-mono text-xs text-accent tracking-[0.3em]">06</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-6">Achievements</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text-primary">
              MILESTONES
            </h2>
          </div>
        </motion.div>

        {/* Achievement cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {achievements.map((item, i) => {
            const colorClass = CATEGORY_COLORS[item.category] || 'text-accent border-accent/20';
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="border border-border bg-bg-elevated p-5 group hover:border-accent/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span
                      className={`font-mono text-xs border ${colorClass} px-2 py-0.5 mb-2 inline-block`}
                    >
                      {item.category}
                    </span>
                    <h3 className="text-text-primary font-semibold group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent transition-colors shrink-0 mt-1"
                      aria-label={`Visit ${item.title} link`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-3">{item.description}</p>

                {item.date && (
                  <div className="font-mono text-xs text-text-muted">{item.date}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
