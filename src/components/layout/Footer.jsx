import { Code2, Trophy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { profile } from '../../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: 'GitHub', href: profile.github, icon: <GithubIcon size={14} /> },
    { label: 'LinkedIn', href: profile.linkedin, icon: <LinkedinIcon size={14} /> },
    { label: 'LeetCode', href: profile.leetcode, icon: <Code2 size={14} /> },
    { label: 'Codeforces', href: profile.codeforces, icon: <Trophy size={14} /> },
  ];

  return (
    <footer className="border-t border-border bg-bg-surface py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Wordmark */}
          <div>
            <div className="font-mono text-sm font-bold tracking-widest text-text-primary mb-1">
              SAKSHAM<span className="text-accent">.EXE</span>
            </div>
            <div className="font-mono text-xs text-text-muted tracking-wider">
              CSE <span className="text-accent">•</span> {profile.graduation}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-accent transition-colors duration-200"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-text-muted font-mono text-xs">
          <div>© {year} {profile.name}. All rights reserved.</div>
          <div>
            Built with <span className="text-text-secondary">React</span> <span className="text-accent">•</span>{' '}
            <span className="text-text-secondary">Vite</span> <span className="text-accent">•</span>{' '}
            <span className="text-text-secondary">Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
