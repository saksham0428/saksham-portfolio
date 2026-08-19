import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Only mount on true pointer/hover capable devices
function useIsPointerDevice() {
  const [isPointer, setIsPointer] = useState(false);
  useEffect(() => {
    setIsPointer(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);
  return isPointer;
}

export default function CustomCursor() {
  const isPointer = useIsPointerDevice();
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!isPointer) return;

    const move = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      if (!visible) setVisible(true);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const checkHover = (e) => {
      const el = e.target;
      const isInteractive = el.closest('a, button, [data-magnetic], input, textarea');
      setHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mousemove', checkHover, { passive: true });
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.body.style.cursor = 'auto';
    };
  }, [isPointer, visible]);

  // Don't render on touch/mobile devices
  if (!isPointer) return null;

  return (
    <>
      {/* Ring */}
      <motion.div
        className="fixed pointer-events-none z-[99999]"
        style={{ x: smoothX, y: smoothY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.7 : hovering ? 1.5 : 1,
        }}
        transition={{ scale: { duration: 0.15 }, opacity: { duration: 0.3 } }}
      >
        <div
          className={`w-8 h-8 rounded-full border transition-colors duration-200 ${
            hovering
              ? 'border-accent bg-accent/10'
              : 'border-white/30 bg-transparent'
          }`}
        />
      </motion.div>

      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-[99999]"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
      </motion.div>
    </>
  );
}
