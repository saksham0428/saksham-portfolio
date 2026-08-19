import { useState, useRef } from 'react';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { profile } from '../data/profile';

const COMMANDS = {
  help: () => ({
    type: 'output',
    content: `
<span class="text-accent">Available commands:</span>

  about       — Who am I
  skills      — Technical skills
  projects    — My projects
  dsa         — DSA & competitive programming
  contact     — Get in touch
  resume      — Download resume
  github      — Open GitHub profile
  clear       — Clear terminal
  help        — Show this help message
`,
  }),

  about: () => ({
    type: 'output',
    content: `
<span class="text-accent">$ whoami</span>

  <strong>Saksham</strong> — Computer Science student at Chandigarh University.

  Currently focused on:
  ▸ Data Structures & Algorithms
  ▸ Competitive Programming
  ▸ Software Development
  ▸ AI / Computer Vision
  ▸ IoT Projects

  Graduation: ${profile.graduation}
`,
  }),

  skills: () => ({
    type: 'output',
    content: `
<span class="text-accent">$ cat skills.json</span>

  Languages    →  C++, Java, Python, C
  Development  →  React, HTML, CSS, JavaScript
  Data         →  SQL, Tableau
  AI/CV        →  Computer Vision, ML, OpenCV
  IoT          →  Arduino, ESP8266, ThingSpeak
  Tools        →  Git, GitHub, VS Code
`,
  }),

  projects: () => ({
    type: 'output',
    content: `
<span class="text-accent">$ ls ./projects</span>

${projects.map(p => `  <span class="text-accent">${p.id}</span>  ${p.title.padEnd(30)} [${p.subtitle}]`).join('\n')}

  Type <span class="text-accent">project [id]</span> for details  (e.g. project 01)
`,
  }),

  dsa: () => ({
    type: 'output',
    content: `
<span class="text-accent">$ cat dsa_profile.txt</span>

  LeetCode     →  ${profile.leetcode}
  Codeforces   →  ${profile.codeforces}
  LC Solutions →  ${profile.leetcodeSolutions}

  Focus Areas:
  ▸ Arrays & Strings
  ▸ Trees & Graphs
  ▸ Dynamic Programming
  ▸ Sliding Window / Two Pointer
  ▸ Recursion & Backtracking
`,
  }),

  contact: () => ({
    type: 'output',
    content: `
<span class="text-accent">$ cat contact.txt</span>

  Email      →  ${profile.email}
  GitHub     →  ${profile.github}
  LinkedIn   →  ${profile.linkedin}
  LeetCode   →  ${profile.leetcode}
  Codeforces →  ${profile.codeforces}

  <span class="text-secondary">Open to opportunities, collaborations, and interesting problems.</span>
`,
  }),

  resume: () => ({
    type: 'link',
    content: `
<span class="text-accent">$ open resume.pdf</span>

  Attempting to open resume...
  <a href="${profile.resume}" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:opacity-70 transition-opacity">Click here if it doesn't open automatically.</a>
`,
    action: () => window.open(profile.resume, '_blank'),
  }),

  github: () => ({
    type: 'link',
    content: `
<span class="text-accent">$ open github.com</span>

  Opening GitHub profile...
  <a href="${profile.github}" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:opacity-70 transition-opacity">${profile.github}</a>
`,
    action: () => window.open(profile.github, '_blank'),
  }),

  clear: () => ({
    type: 'clear',
  }),
};

export function useTerminal() {
  const [lines, setLines] = useState([
    {
      type: 'system',
      content: `<span class="text-accent">SAKSHAM.EXE</span> — Interactive Terminal
Type <span class="text-accent">help</span> to see available commands.
`,
    },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

  const execute = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLines = [...lines, { type: 'input', content: trimmed }];

    let result;
    if (trimmed.startsWith('project ')) {
      const id = trimmed.split(' ')[1]?.padStart(2, '0');
      const project = projects.find(p => p.id === id);
      if (project) {
        const githubLine = project.github
          ? `  GitHub: <a href="${project.github}" target="_blank" class="text-accent underline">${project.github}</a>`
          : `  GitHub: <span class="text-text-muted">Repository unavailable</span>`;

        result = {
          type: 'output',
          content: `
<span class="text-accent">$ cat projects/${project.slug}.md</span>

  <strong>${project.id} — ${project.title}</strong>
  ${project.subtitle}

  ${project.tagline}

  Tech: ${project.tech.join(', ')}

  Features:
${project.features.map(f => `  ▸ ${f}`).join('\n')}

${githubLine}
`,
        };
      } else {
        result = { type: 'error', content: `  Project "${id}" not found. Type <span class="text-accent">projects</span> to list all.` };
      }
    } else if (COMMANDS[trimmed]) {
      result = COMMANDS[trimmed]();
      if (result.action) result.action();
    } else {
      result = {
        type: 'error',
        content: `  Command not found: <span class="text-red-400">${trimmed}</span>
  Type <span class="text-accent">help</span> for available commands.`,
      };
    }

    if (result.type === 'clear') {
      setLines([
        {
          type: 'system',
          content: `Terminal cleared. Type <span class="text-accent">help</span> for commands.`,
        },
      ]);
    } else {
      setLines([...newLines, result]);
    }

    setHistory(prev => [trimmed, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      execute(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setInput(nextIndex === -1 ? '' : history[nextIndex]);
    }
  };

  return { lines, input, setInput, handleKeyDown, inputRef };
}
