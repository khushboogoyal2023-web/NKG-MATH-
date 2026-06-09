import { useState } from 'react';
import { motion } from 'framer-motion';

function getAngleType(deg) {
  if (deg === 0 || deg === 360) return { name: 'शून्य कोण (Zero Angle)', color: '#94a3b8', en: '0°' };
  if (deg < 90) return { name: 'न्यून कोण (Acute Angle)', color: '#22c55e', en: 'Acute Angle' };
  if (deg === 90) return { name: 'समकोण (Right Angle)', color: '#3b82f6', en: 'Right Angle' };
  if (deg < 180) return { name: 'अधिक कोण (Obtuse Angle)', color: '#f59e0b', en: 'Obtuse Angle' };
  if (deg === 180) return { name: 'ऋजु कोण (Straight Angle)', color: '#ef4444', en: 'Straight Angle' };
  if (deg < 360) return { name: 'प्रतिवर्त कोण (Reflex Angle)', color: '#8b5cf6', en: 'Reflex Angle' };
  return { name: 'पूर्ण कोण (Complete Angle)', color: '#ec4899', en: 'Complete Angle' };
}

export default function AngleDial() {
  const [angle, setAngle] = useState(45);
  const info = getAngleType(angle);
  const rad = (angle * Math.PI) / 180;
  const cx = 120, cy = 120, r = 90;
  const x = cx + r * Math.cos(-rad);
  const y = cy + r * Math.sin(-rad);
  const largeArc = angle > 180 ? 1 : 0;

  // 🔥 SUDHAAR: Voice Output system for Kids interactive layout
  const speakAngle = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.pitch = 1.3; // Cute kid friendly tone
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAngleChange = (newAngle) => {
    setAngle(newAngle);
    // Jab baccha kisi main angle benchmark par ruka to automatic aawaz aayegi
    if (newAngle % 45 === 0 || newAngle === 90 || newAngle === 180 || newAngle === 270 || newAngle === 360) {
      const currentInfo = getAngleType(newAngle);
      speakAngle(`${newAngle} डिग्री, ${currentInfo.name}`);
    }
  };

  return (
    <div className="space-y-4 my-2 p-2 max-w-sm mx-auto">
      {/* Interactive SVG Display Area */}
      <div className="flex justify-center bg-slate-50 dark:bg-slate-800 rounded-3xl p-4 border-4 border-purple-400 shadow-inner">
        <svg width={240} height={240} className="drop-shadow-md select-none">
          {/* Background circle - 🔥 SUDHAAR: Added Dark Mode visibility stroke values */}
          <circle cx={cx} cy={cy} r={r} fill="currentColor" className="text-white dark:text-slate-900" stroke="#cbd5e1" strokeWidth={2} />

          {/* Degree marks and lines */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(d => {
            const a = (-d * Math.PI) / 180;
            const x1 = cx + (r - 10) * Math.cos(a), y1 = cy + (r - 10) * Math.sin(a);
            const x2 = cx + r * Math.cos(a), y2 = cy + r * Math.sin(a);
            const lx = cx + (r + 14) * Math.cos(a), ly = cy + (r + 14) * Math.sin(a);
            return (
              <g key={d}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={d % 90 === 0 ? '#64748b' : '#94a3b8'} strokeWidth={d % 90 === 0 ? 2.5 : 1} />
                <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={d % 90 === 0 ? 10 : 8} className="fill-slate-500 dark:fill-slate-400 font-bold">{d}°</text>
              </g>
            );
          })}

          {/* Color filled Arc */}
          {angle > 0 && (
            <path d={`M ${cx} ${cy} L ${cx + r} ${cy} A ${r} ${r} 0 ${largeArc} 0 ${x} ${y} Z`}
              fill={info.color + '3b'} stroke={info.color} strokeWidth={2.5} />
          )}

          {/* Base and Rotating Arms */}
          <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#475569" strokeWidth={3} strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={x} y2={y} stroke={info.color} strokeWidth={4} strokeLinecap="round" />
          <circle cx={cx} cy={cy} r={7} fill={info.color} />
          {/* Knob pointer circle */}
          <circle cx={x} cy={y} r={9} fill={info.color} stroke="white" strokeWidth={2.5} className="cursor-pointer" />
        </svg>
      </div>

      {/* Control Slider System */}
      <div className="px-2">
        <input 
          type="range" 
          min={0} 
          max={360} 
          step={1} 
          value={angle} 
          onChange={e => handleAngleChange(Number(e.target.value))}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" 
          style={{ accentColor: info.color }} 
        />
        <div className="flex justify-between text-xs font-black text-muted-foreground dark:text-slate-400 font-body mt-1">
          <span>0°</span>
          <span>180° (ऋजु)</span>
          <span>360° (पूर्ण)</span>
        </div>
      </div>

      {/* Info Content Block */}
      <motion.div 
        key={info.name} 
        initial={{ opacity: 0, scale: 0.93 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl p-4 text-center text-white border-b-4 border-black/20 shadow-lg cursor-pointer" 
        style={{ background: `linear-gradient(135deg, ${info.color}, ${info.color}cc)` }}
        onClick={() => speakAngle(`${angle} डिग्री, ${info.name}`)}
      >
        <p className="font-heading text-4xl font-black mb-0.5">{angle}°</p>
        <p className="font-heading text-lg font-bold tracking-wide">{info.name}</p>
        <p className="font-body text-xs opacity-90 font-medium">{info.en} 🔊</p>
      </motion.div>
    </div>
  );
}
