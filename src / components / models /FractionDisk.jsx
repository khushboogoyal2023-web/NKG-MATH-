import { useState } from 'react';
import { motion } from 'framer-motion';

const SLICE_OPTIONS = [2, 3, 4, 5, 6, 8, 10, 12];
const COLORS = ['#ef4444','#f59e0b','#22c55e','#3b82f6','#8b5cf6','#ec4899','#14b8a6','#f97316','#6366f1','#84cc16','#06b6d4','#e11d48'];

function PizzaSlice({ total, colored, r = 90 }) {
  const cx = r, cy = r;
  const slices = [];
  for (let i = 0; i < total; i++) {
    const startAngle = ((i / total) * 360 - 90) * (Math.PI / 180);
    const endAngle = (((i + 1) / total) * 360 - 90) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(startAngle), y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle), y2 = cy + r * Math.sin(endAngle);
    const largeArc = total === 1 ? 1 : 0;
    
    // 🔥 SUDHAAR: Uncolored areas dark mode support ke sath light neutral text dynamic fill leti hain
    const fill = i < colored ? COLORS[i % COLORS.length] : 'currentColor';
    
    slices.push(
      <path 
        key={i} 
        d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
        fill={fill} 
        className={i < colored ? "" : "text-slate-200 dark:text-slate-700"}
        stroke="currentColor" 
        strokeWidth={2} 
        className={`${i < colored ? "" : "text-slate-200 dark:text-slate-700"} text-white dark:text-slate-900`}
      />
    );
  }
  return (
    <svg width={r * 2} height={r * 2} className="drop-shadow-lg">
      {slices}
      <circle cx={cx} cy={cy} r={5} className="fill-slate-700 dark:fill-slate-300" />
    </svg>
  );
}

export default function FractionDisk() {
  const [parts, setParts] = useState(4);
  const [colored, setColored] = useState(1);

  // 🔥 SUDHAAR: Voice feedback mechanism for kids mathematical tracking
  const speakFraction = (num, den) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = num === 0 ? "शून्य" : `${den} टुकड़ों में से ${num} रंगीन भाग`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.pitch = 1.3;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePartsChange = (n) => {
    setParts(n);
    const newColored = Math.min(colored, n);
    setColored(newColored);
    speakFraction(newColored, n);
  };

  const handleColoredChange = (val) => {
    setColored(val);
    speakFraction(val, parts);
  };

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const g = gcd(colored, parts);
  const simplified = colored === 0 ? '0' : `${colored / g}/${parts / g}`;
  const decimal = (colored / parts).toFixed(2);
  const percent = ((colored / parts) * 100).toFixed(0);

  return (
    <div className="space-y-4 my-2 p-2 max-w-sm mx-auto">
      {/* Pizza Visual Renderizer Wrapper */}
      <div className="flex justify-center bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 border-4 border-orange-400/30 shadow-inner">
        <motion.div key={parts} initial={{ rotate: -15, opacity: 0, scale: 0.9 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <PizzaSlice total={parts} colored={colored} />
        </motion.div>
      </div>

      {/* Parts selector */}
      <div className="bg-card dark:bg-slate-800 border-2 border-border rounded-3xl p-4 shadow-xs">
        <p className="font-body text-xs font-black text-muted-foreground dark:text-slate-300 mb-2">🍕 कुल बराबर टुकड़े (Denominator): <span className="text-orange-500 font-bold text-sm">{parts}</span></p>
        <div className="flex flex-wrap gap-2">
          {SLICE_OPTIONS.map(n => (
            <button 
              key={n} 
              onClick={() => handlePartsChange(n)}
              className={`w-10 h-10 rounded-xl font-black font-body transition-all active:scale-90 min-h-0 min-w-0 ${parts === n ? 'bg-orange-500 text-white shadow-md' : 'bg-muted text-foreground hover:bg-orange-500/10'}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Colored slider */}
      <div className="bg-card dark:bg-slate-800 border-2 border-border rounded-3xl p-4 shadow-xs">
        <p className="font-body text-xs font-black text-muted-foreground dark:text-slate-300 mb-2">🎨 चुने गए रंगीन भाग (Numerator): <span className="text-red-500 font-bold text-sm">{colored}</span></p>
        <input 
          type="range" 
          min={0} 
          max={parts} 
          step={1} 
          value={colored} 
          onChange={e => handleColoredChange(Number(e.target.value))} 
          className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500" 
        />
        <div className="flex justify-between text-xs font-bold text-muted-foreground dark:text-slate-400 font-body mt-1">
          <span>0</span>
          <span>{parts} (पूरा)</span>
        </div>
      </div>

      {/* Result Display Metrics */}
      <motion.div 
        key={`${colored}-${parts}`} 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => speakFraction(colored, parts)}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-3xl p-4 text-center shadow-lg border-b-4 border-black/20 cursor-pointer"
      >
        <p className="font-heading text-4xl font-black mb-0.5">{colored}/{parts}</p>
        {g > 1 && colored > 0 && (
          <p className="font-body text-xs opacity-95 mb-1 bg-white/10 py-0.5 rounded-full max-w-[180px] mx-auto font-bold">
            = {simplified} (छोटा रूप)
          </p>
        )}
        <p className="font-body text-xs font-bold opacity-90 tracking-wide">दशमलव: {decimal} | प्रतिशत: {percent}% 🔊</p>
      </motion.div>
    </div>
  );
}
