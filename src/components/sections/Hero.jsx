import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Code2, Trophy, ArrowDown, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { profile } from '../../data/profile';

const ROTATING_WORDS = ['Problem Solver', 'Builder', 'CS Student', 'Learner'];

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING_WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-7 md:h-9 overflow-hidden relative">
      <motion.div
        key={index}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="text-text-secondary font-mono text-sm md:text-lg tracking-widest"
      >
        {ROTATING_WORDS[index]}
      </motion.div>
    </div>
  );
}

const socialLinks = [
  { label: 'GitHub', href: profile.github, icon: <GithubIcon size={14} /> },
  { label: 'LinkedIn', href: profile.linkedin, icon: <LinkedinIcon size={14} /> },
  { label: 'LeetCode', href: profile.leetcode, icon: <Code2 size={14} /> },
  { label: 'Codeforces', href: profile.codeforces, icon: <Trophy size={14} /> },
];

const statusItems = [
  { key: '> system.status', value: 'ONLINE', accent: true },
  { key: '> current.focus', value: 'DSA + SOFTWARE DEV', accent: false },
  { key: '> graduation', value: profile.graduation, accent: false },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Parallax — desktop only
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotX = useTransform(mouseY, [-300, 300], [3, -3]);
  const rotY = useTransform(mouseX, [-300, 300], [-3, 3]);
  const smoothX = useSpring(rotX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(rotY, { stiffness: 80, damping: 20 });

  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(!window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const handleMouseMove = (e) => {
    if (isTouch || shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-x-hidden pt-16"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(57,255,126,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Corner accents — hidden on very small screens */}
      <div className="hidden sm:block absolute top-20 left-6 md:left-10 font-mono text-xs text-text-muted opacity-30 select-none">
        <div>X: 0,0</div>
        <div>Y: 0,0</div>
      </div>
      <div className="hidden sm:block absolute bottom-20 right-6 md:right-10 font-mono text-xs text-text-muted opacity-30 select-none text-right">
        <div>BUILD: 2026.08</div>
        <div>STATUS: ACTIVE</div>
      </div>

      {/* Vertical line decoration */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-20 pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-10 w-full"
        variants={container}
        initial="hidden"
        animate="show"
        style={
          !isTouch && !shouldReduceMotion
            ? { rotateX: smoothX, rotateY: smoothY, perspective: 1200 }
            : {}
        }
      >
        {/* Label */}
        <motion.div variants={item} className="mb-5 flex items-center gap-3">
          <div className="w-6 h-px bg-accent" />
          <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
            v2026.08 — Portfolio
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-sans text-[clamp(3.2rem,13vw,11rem)] font-black leading-none text-text-primary mb-2"
          style={{ letterSpacing: '-0.04em' }}
        >
          SAKSHAM
        </motion.h1>

        {/* Rotating subtitle */}
        <motion.div variants={item} className="mb-4 flex items-center gap-3">
          <span className="font-mono text-xs text-text-muted">_</span>
          <RotatingText />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-text-secondary text-base md:text-xl max-w-lg font-light mb-8 leading-relaxed"
        >
          "Turning problems into things that work."
        </motion.p>

        {/* Status terminal block */}
        <motion.div
          variants={item}
          className="font-mono text-xs border border-border bg-bg-elevated p-3 md:p-4 mb-8 max-w-full sm:max-w-sm overflow-hidden"
        >
          {statusItems.map((s) => (
            <div key={s.key} className="flex flex-wrap gap-2 mb-1 last:mb-0">
              <span className="text-text-muted shrink-0">{s.key}</span>
              <span className={s.accent ? 'text-accent' : 'text-text-primary'}>{s.value}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={scrollToProjects}
            className="font-mono text-xs sm:text-sm tracking-widest bg-accent text-bg px-5 sm:px-6 py-3 font-bold hover:bg-accent/90 active:scale-95 transition-all duration-200 touch-manipulation"
            aria-label="View projects"
          >
            VIEW PROJECTS
          </button>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs sm:text-sm tracking-widest border border-border text-text-secondary px-5 sm:px-6 py-3 hover:border-accent hover:text-accent active:scale-95 transition-all duration-200 flex items-center gap-2 touch-manipulation"
          >
            <Download size={13} />
            RESUME
          </a>
        </motion.div>

        {/* Social links — wrap on mobile, show icon only hint */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-3 sm:gap-5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-accent active:text-accent transition-colors duration-200 touch-manipulation py-1"
              aria-label={link.label}
            >
              {link.icon}
              <span className="hidden xs:inline sm:inline">{link.label}</span>
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-text-muted"
        >
          <ArrowDown size={14} />
        </motion.div>
        <div className="font-mono text-xs text-text-muted tracking-widest">SCROLL</div>
      </motion.div>
    </section>
  );
}
