import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { useTerminal } from '../../hooks/useTerminal';

export default function Terminal({ isOpen, onClose }) {
  const { lines, input, setInput, handleKeyDown, inputRef } = useTerminal();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay prevents keyboard jump on iOS
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Terminal window — full width on mobile, max-w on desktop */}
          <motion.div
            className="relative w-full sm:max-w-3xl bg-bg-surface border border-border-strong overflow-hidden shadow-2xl flex flex-col"
            style={{
              height: '85vh',
              maxHeight: '85vh',
              boxShadow: '0 0 60px rgba(57,255,126,0.05), 0 25px 60px rgba(0,0,0,0.8)',
            }}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          >
            {/* Drag handle (mobile) */}
            <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-border-strong" />
            </div>

            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-elevated shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-text-muted min-w-0">
                  <TerminalIcon size={11} className="shrink-0" />
                  <span className="truncate">saksham@portfolio:~$</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text-primary active:text-accent transition-colors p-1 touch-manipulation shrink-0 ml-2"
                aria-label="Close terminal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Output area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 font-mono text-xs sm:text-sm no-scrollbar"
            >
              {lines.map((line, i) => (
                <div key={i} className="mb-2 leading-relaxed">
                  {line.type === 'input' ? (
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-accent select-none shrink-0 text-xs">
                        saksham@portfolio:~$
                      </span>
                      <span className="text-text-primary break-all">{line.content}</span>
                    </div>
                  ) : line.type === 'error' ? (
                    <div
                      className="text-red-400 pl-2 sm:pl-4 whitespace-pre-wrap break-words"
                      dangerouslySetInnerHTML={{ __html: line.content }}
                    />
                  ) : (
                    <div
                      className="text-text-secondary whitespace-pre-wrap break-words"
                      dangerouslySetInnerHTML={{ __html: line.content }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Input row */}
            <div className="border-t border-border px-3 sm:px-4 py-3 flex items-center gap-2 font-mono text-xs sm:text-sm shrink-0">
              <span className="text-accent shrink-0 select-none text-xs">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-text-primary outline-none caret-accent min-w-0"
                placeholder="type a command..."
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="off"
                spellCheck="false"
                inputMode="text"
                aria-label="Terminal input"
              />
              <span className="terminal-cursor shrink-0" aria-hidden="true" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
