import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Code2, Trophy, Award } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import { profile } from '../../data/profile';

// ============================================================
// VERIFIED STATS — Last updated: August 2026
// Source: Public profiles
// ============================================================

const PLATFORMS = [
  {
    name: 'LeetCode',
    handle: 'saksham_287',
    url: profile.leetcode,
    icon: <Code2 size={20} />,
    color: 'text-yellow-400',
    borderColor: 'border-yellow-400/20',
    badge: '50 Days Badge 2026',
    badgeColor: 'text-yellow-400 border-yellow-400/30',
    // Problems Solved total is not displayed — language counts may overlap.
    // Showing language breakdown instead.
    //kbjkbjlblj
    stats: [
      { label: 'Global Rank', value: '1.49M' },
      { label: 'Solved (C++)', value: '86' },
      { label: 'Solved (Java)', value: '30' },
    ],
    extraStat: { label: 'Solved (MySQL)', value: '8' },
    note: 'Current public profile',
  },
  {
    name: 'Codeforces',
    handle: 'Saksham-bit',
    url: profile.codeforces,
    icon: <Trophy size={20} />,
    color: 'text-blue-400',
    borderColor: 'border-blue-400/20',
    badge: 'Newbie',
    badgeColor: 'text-blue-400 border-blue-400/30',
    stats: [
      { label: 'Max Rating', value: '650' },
      { label: 'Problems', value: '4' },
      { label: 'Contests', value: '—' },
    ],
    extraStat: null,
    note: 'Current public profile',
  },
];

// Verified LeetCode topic breakdown (from public profile)
const LEETCODE_TOPICS = [
  { tier: 'Fundamental', name: 'Array', count: 53 },
  { tier: 'Intermediate', name: 'Hash Table', count: 19 },
  { tier: 'Fundamental', name: 'Two Pointers', count: 19 },
  { tier: 'Fundamental', name: 'Sorting', count: 18 },
  { tier: 'Intermediate', name: 'Math', count: 18 },
  { tier: 'Intermediate', name: 'Binary Search', count: 11 },
  { tier: 'Advanced', name: 'Dynamic Programming', count: 9 },
  { tier: 'Advanced', name: 'Backtracking', count: 4 },
  { tier: 'Advanced', name: 'Divide & Conquer', count: 3 },
];

const TIER_COLORS = {
  Fundamental: 'text-accent border-accent/20',
  Intermediate: 'text-yellow-400 border-yellow-400/20',
  Advanced: 'text-blue-400 border-blue-400/20',
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function DSA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="dsa" className="py-24 md:py-36 px-6 md:px-10 relative" ref={ref}>
      {/* Subtle bg accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(57,255,126,0.025) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="font-mono text-xs text-accent tracking-[0.3em]">03</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-6">
            DSA / Competitive Programming
          </div>
        </motion.div>

        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-6xl font-black tracking-tight text-text-primary mb-3">
            THE GRIND
          </h2>
          <p className="text-text-secondary text-base max-w-xl">
            Problems solved. Concepts learned. Still going.
          </p>
        </motion.div>

        {/* Platform cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {PLATFORMS.map((platform, pi) => (
            <motion.div
              key={platform.name}
              custom={pi + 1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className={`border ${platform.borderColor} bg-bg-elevated p-6 group hover:border-opacity-50 transition-all duration-300 relative overflow-hidden`}
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className={platform.color}>{platform.icon}</span>
                  <div>
                    <div className="text-text-primary font-semibold">{platform.name}</div>
                    <div className="font-mono text-xs text-text-muted">@{platform.handle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Badge */}
                  <span
                    className={`font-mono text-xs border px-2 py-0.5 flex items-center gap-1 ${platform.badgeColor}`}
                  >
                    <Award size={10} />
                    {platform.badge}
                  </span>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${platform.color} opacity-60 hover:opacity-100 transition-opacity`}
                    aria-label={`Open ${platform.name} profile`}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Main stats grid */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                {platform.stats.map((stat) => (
                  <div key={stat.label} className="border border-border p-3">
                    <div className="font-mono text-base font-bold text-text-primary mb-1 leading-tight">
                      {stat.value}
                    </div>
                    <div className="font-mono text-xs text-text-muted leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Extra stat row (MySQL for LC) */}
              {platform.extraStat && (
                <div className="border border-border p-3 mb-3 inline-flex flex-col">
                  <div className="font-mono text-base font-bold text-text-primary mb-0.5">
                    {platform.extraStat.value}
                  </div>
                  <div className="font-mono text-xs text-text-muted">{platform.extraStat.label}</div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="font-mono text-xs text-text-muted">{platform.note}</span>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 font-mono text-xs ${platform.color} hover:opacity-70 transition-opacity`}
                >
                  VIEW PROFILE <ExternalLink size={11} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LeetCode topic breakdown */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="border border-border bg-bg-elevated p-6 mb-4"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="font-mono text-xs text-text-muted tracking-widest uppercase">
              LeetCode — Topic Breakdown
            </div>
            <div className="flex items-center gap-3 font-mono text-xs">
              {Object.entries(TIER_COLORS).map(([tier, cls]) => (
                <span key={tier} className={`${cls} border px-2 py-0.5`}>{tier}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {LEETCODE_TOPICS.map((topic, i) => {
              const cls = TIER_COLORS[topic.tier] || 'text-text-secondary border-border';
              return (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
                  className={`flex items-center gap-2 font-mono text-xs border px-3 py-1.5 ${cls} cursor-default`}
                >
                  <span>{topic.name}</span>
                  <span className="opacity-50">×{topic.count}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* LeetCode Solutions repo */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="border border-border bg-bg-elevated p-5 flex items-center justify-between group hover:border-accent/30 transition-colors duration-300"
        >
          <div className="flex items-center gap-3">
            <GithubIcon
              size={16}
              className="text-text-muted group-hover:text-accent transition-colors duration-300"
            />
            <div>
              <div className="text-text-primary text-sm font-medium">LeetCode Solutions</div>
              <div className="font-mono text-xs text-text-muted">
                LeetCode solutions synced to GitHub.
              </div>
            </div>
          </div>
          <a
            href={profile.leetcodeSolutions}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent transition-colors duration-200"
            aria-label="LeetCode solutions repository"
          >
            VIEW REPO <ExternalLink size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
