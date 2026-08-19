import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import { projects } from '../../data/projects';

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center sm:p-6 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* On mobile: slides up from bottom. On desktop: scales in from center */}
          <motion.div
            className="relative w-full sm:max-w-2xl bg-bg-elevated border border-border overflow-hidden flex flex-col"
            style={{ maxHeight: '92vh' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          >
            {/* Drag handle (mobile) */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border-strong" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-5 py-4 sm:p-6 border-b border-border shrink-0">
              <div className="pr-4">
                <div className="font-mono text-accent text-xs tracking-widest mb-1">
                  {project.id} — {project.subtitle}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight leading-tight">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text-primary active:text-accent transition-colors shrink-0 mt-1 p-1 touch-manipulation"
                aria-label="Close project details"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 no-scrollbar">
              {/* Tagline */}
              <p className="text-text-secondary text-sm mb-4 leading-relaxed italic border-l-2 border-accent/40 pl-3">
                {project.tagline}
              </p>

              {/* Description */}
              <p className="text-text-secondary text-sm mb-5 leading-relaxed">
                {project.description}
              </p>

              {/* Tech */}
              <div className="mb-5">
                <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
                  Technologies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs text-text-secondary border border-border px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
                  Key Features
                </div>
                <div className="space-y-2">
                  {project.features.map((f) => (
                    <div key={f} className="flex gap-2 text-text-secondary text-sm">
                      <span className="text-accent shrink-0">▸</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-5 py-4 sm:p-6 border-t border-border flex gap-3 shrink-0">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs border border-border text-text-secondary px-4 py-2.5 hover:border-accent/40 hover:text-accent active:text-accent transition-all duration-200 touch-manipulation"
                >
                  <GithubIcon size={13} />
                  GITHUB
                </a>
              ) : (
                <span className="flex items-center gap-2 font-mono text-xs border border-border text-text-muted px-4 py-2.5 opacity-40 select-none">
                  <GithubIcon size={13} />
                  <span className="hidden sm:inline">REPOSITORY UNAVAILABLE</span>
                  <span className="sm:hidden">UNAVAILABLE</span>
                </span>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs bg-accent text-bg px-4 py-2.5 font-bold hover:bg-accent/90 transition-colors duration-200 touch-manipulation"
                >
                  <ExternalLink size={13} />
                  LIVE DEMO
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectCard({ project, index, inView, onClick }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(project)}
      className="group border border-border bg-bg-elevated hover:border-accent/30 active:border-accent/30 transition-all duration-300 cursor-pointer relative overflow-hidden"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(project)}
      aria-label={`View ${project.title} details`}
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-accent/0 group-hover:from-accent/[0.03] group-hover:to-accent/[0.02] transition-all duration-500 pointer-events-none" />

      <div className="p-5 sm:p-6 md:p-8">
        {/* Number + category */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <span className="font-mono text-3xl sm:text-4xl font-black text-text-muted/20 group-hover:text-accent/20 transition-colors duration-300 leading-none">
            {project.id}
          </span>
          <span className="font-mono text-xs text-text-muted border border-border px-2 py-0.5 text-right max-w-[130px] leading-tight">
            {project.subtitle}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-text-primary tracking-tight mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4 sm:mb-5">
          {project.tagline}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-6">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-mono text-xs text-text-muted border border-border px-2 py-0.5"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="font-mono text-xs text-text-muted px-1 py-0.5">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* CTA — always visible on mobile (no hover-only), hidden on desktop until hover */}
        <div className="flex items-center gap-2 font-mono text-xs text-accent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          VIEW CASE STUDY
          <ChevronRight size={11} />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-px w-0 group-hover:w-full bg-accent/30 transition-all duration-500 ease-out" />
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 md:py-36 px-5 sm:px-6 md:px-10 bg-bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10 sm:mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="font-mono text-xs text-accent tracking-[0.3em]">04</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-5">
            Projects
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-text-primary">
              SELECTED WORK
            </h2>
            <p className="text-text-muted font-mono text-xs hidden md:block">
              Tap any project to view details
            </p>
          </div>
        </motion.div>

        {/* Projects grid — single col on mobile, 2 on sm, 3 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
