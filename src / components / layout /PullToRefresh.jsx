import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const THRESHOLD = 80;

export default function PullToRefresh({ children }) {
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(null);

  const onTouchStart = (e) => {
    if (window.scrollY === 0) startY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e) => {
    if (startY.current === null || refreshing) return;
    const dy = e.touches[0].clientY - startY.current;
    if (dy > 0) setPullY(Math.min(dy, THRESHOLD + 20));
  };

  const onTouchEnd = () => {
    if (pullY >= THRESHOLD) {
      setRefreshing(true);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
    setPullY(0);
    startY.current = null;
  };

  const progress = Math.min(pullY / THRESHOLD, 1);

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="flex-1 flex flex-col w-full"
    >
      {/* Dynamic Animated Pull Indicator */}
      <motion.div
        /* 🔥 SUDHAAR: Background fixes for Dark mode and child friendly spring values */
        animate={{ 
          height: refreshing ? 56 : pullY > 0 ? pullY * 0.6 : 0, 
          opacity: pullY > 5 || refreshing ? 1 : 0 
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="flex items-center justify-center overflow-hidden bg-purple-500/10 dark:bg-slate-800 border-b-2 border-purple-400/20"
      >
        {refreshing ? (
          /* Spin loading state animation */
          <div className="flex items-center gap-2 font-body text-xs font-black text-purple-600 dark:text-purple-400">
            <div className="w-5 h-5 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <span>जादू हो रहा है... ✨</span>
          </div>
        ) : (
          /* 🔥 SUDHAAR: Simple arrow change with high-energy rotation emoji for kids layout */
          <motion.div
            animate={{ rotate: progress * 360, scale: 0.5 + progress * 0.5 }}
            className="text-xl select-none flex items-center justify-center"
            style={{ opacity: progress }}
          >
            🔄
          </motion.div>
        )}
      </motion.div>
      {children}
    </div>
  );
}
