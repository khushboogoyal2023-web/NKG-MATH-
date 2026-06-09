import { useState } from 'react';
import { motion } from 'framer-motion';

const MAX = [9, 9, 9]; // units, tens, hundreds
const COLORS = ['#ef4444', '#f59e0b', '#22c55e'];
const LABELS = ['इकाई\n(Units)', 'दहाई\n(Tens)', 'सैकड़ा\n(Hundreds)'];

export default function AbacusTool() {
  const [beads, setBeads] = useState([0, 0, 0]);

  // Voice Speech Feature for Kids Math Exercise
  const speakCount = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.pitch = 1.4; // High pitch kid voice feel
      window.speechSynthesis.speak(utterance);
    }
  };

  const change = (col, delta) => {
    setBeads(b => {
      const n = [...b];
      const nextVal = Math.max(0, Math.min(MAX[col], n[col] + delta));
      if (nextVal !== n[col]) {
        n[col] = nextVal;
        const currentTotal = n[2] * 100 + n[1] * 10 + n[0];
        speakCount(`${currentTotal}`);
      }
      return n;
    });
  };

  const total = beads[2] * 100 + beads[1] * 10 + beads[0];

  return (
    <div className="space-y-4 my-4 p-2">
      {/* Dynamic Display Board - Fixes for Dark Mode text hiding */}
      <div className="bg-amber-100 dark:bg-amber-950/40 border-4 border-amber-400 rounded-3xl p-4 text-center shadow-md">
        <p className="font-body text-xs text-amber-700 dark:text-amber-300 mb-1 font-bold">🧮 ऊपर/नीचे बटन से मोती खिसकाओ!</p>
        <p className="font-heading text-5xl font-black text-amber-800 dark:text-amber-200 transition-all">{total}</p>
        <p className="font-body text-sm font-bold text-amber-600 dark:text-amber-300 mt-1">
          {beads[2] > 0 ? `${beads[2]} सैकड़ा ` : ''}
          {beads[1] > 0 ? `${beads[1]} दहाई ` : ''}
          {beads[0] > 0 ? `${beads[0]} इकाई` : total === 0 ? 'शून्य (Zero)' : ''}
        </p>
      </div>

      {/* Main Abacus Interactive Zone */}
      <div className="flex justify-center gap-6 py-4 bg-white dark:bg-slate-800 rounded-3xl border-4 border-purple-300 p-4 shadow-inner">
        {[2, 1, 0].map(col => (
          <div key={col} className="flex flex-col items-center gap-2">
            
            {/* Plus Button */}
            <button 
              onClick={() => change(col, 1)} 
              disabled={beads[col] >= MAX[col]}
              className="w-11 h-11 rounded-2xl font-black text-xl bg-slate-100 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-foreground dark:text-white shadow-xs hover:border-purple-400 disabled:opacity-30 min-h-0 min-w-0 transition-all active:scale-90 flex items-center justify-center"
            >
              +
            </button>

            {/* Bead column container */}
            <div className="relative w-12" style={{ height: 180 }}>
              {/* Rod */}
              <div className="absolute left-1/2 -translate-x-1/2 w-2 h-full rounded-full bg-amber-400 shadow-inner" />
              
              {/* Render Beads */}
              {Array.from({ length: MAX[col] }).map((_, bi) => {
                const isActive = bi < beads[col];
                return (
                  <motion.div 
                    key={bi} 
                    className="absolute left-1/2 -translate-x-1/2 w-9 h-5 rounded-full cursor-pointer shadow-md"
                    style={{ bottom: bi * 18 + 4, backgroundColor: isActive ? COLORS[col] : '#cbd5e1' }}
                    animate={{ scale: isActive ? [1, 1.15, 1.1] : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => setBeads(b => { 
                      const n = [...b]; 
                      n[col] = bi + 1; 
                      const newTotal = n[2] * 100 + n[1] * 10 + n[0];
                      speakCount(`${newTotal}`);
                      return n; 
                    })}
                  />
                );
              })}
            </div>

            {/* Minus Button */}
            <button 
              onClick={() => change(col, -1)} 
              disabled={beads[col] <= 0}
              className="w-11 h-11 rounded-2xl font-black text-xl bg-slate-100 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-foreground dark:text-white shadow-xs hover:border-purple-400 disabled:opacity-30 min-h-0 min-w-0 transition-all active:scale-90 flex items-center justify-center"
            >
              −
            </button>

            {/* Labels and values display fixed for high contrast */}
            <p className="font-body text-[11px] font-bold text-center text-muted-foreground dark:text-slate-400 whitespace-pre-line mt-1">{LABELS[col]}</p>
            <div className="font-heading text-2xl font-black" style={{ color: COLORS[col] }}>{beads[col]}</div>
          </div>
        ))}
      </div>

      {/* Back / Reset Action Trigger */}
      <button 
        onClick={() => { setBeads([0, 0, 0]); speakCount("शून्य"); }}
        className="w-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl py-3 font-body text-sm font-bold text-muted-foreground dark:text-slate-300 hover:text-primary hover:border-primary transition-all active:scale-98"
      >
        🔄 मोती रीसेट करें (Reset)
      </button>
    </div>
  );
}
