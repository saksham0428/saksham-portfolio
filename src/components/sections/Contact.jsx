import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { profile } from '../../data/profile';

const CONTACT_LINKS = [
  {
    label: 'EMAIL ME',
    href: `mailto:${profile.email}`,
    icon: <Mail size={16} />,
    primary: true,
  },
  {
    label: 'GITHUB',
    href: profile.github,
    icon: <GithubIcon size={16} />,
    primary: false,
  },
  {
    label: 'LINKEDIN',
    href: profile.linkedin,
    icon: <LinkedinIcon size={16} />,
    primary: false,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="contact" className="py-24 md:py-40 px-6 md:px-10 relative overflow-hidden" ref={ref}>
      {/* Large decorative text */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="text-[clamp(5rem,20vw,18rem)] font-black tracking-tighter text-text-primary opacity-[0.02] leading-none"
        >
          HELLO
        </span>
      </div>

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(57,255,126,0.035) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Section label */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <div className="flex items-center gap-4 mb-2 justify-center">
            <div className="w-8 h-px bg-border" />
            <span className="font-mono text-xs text-accent tracking-[0.3em]">07</span>
            <div className="w-8 h-px bg-border" />
          </div>
          <div className="font-mono text-xs text-text-muted tracking-widest uppercase">Contact</div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...fadeUp(0.1)}
          className="text-4xl md:text-7xl font-black tracking-tight text-text-primary mb-4 leading-none"
        >
          LET'S BUILD
          <br />
          <span className="text-accent">SOMETHING.</span>
        </motion.h2>

        {/* Sub text */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-text-secondary text-base md:text-lg mb-12 max-w-xl mx-auto"
        >
          Have an opportunity, project, or interesting problem? I'd love to hear about it.
        </motion.p>

        {/* Contact buttons */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.primary ? undefined : '_blank'}
              rel={link.primary ? undefined : 'noopener noreferrer'}
              className={`flex items-center gap-2 font-mono text-sm tracking-widest px-6 py-3 transition-all duration-200 ${
                link.primary
                  ? 'bg-accent text-bg font-bold hover:bg-accent/90'
                  : 'border border-border text-text-secondary hover:border-accent/40 hover:text-accent'
              }`}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
