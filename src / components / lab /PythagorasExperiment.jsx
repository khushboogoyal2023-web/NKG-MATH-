import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PythagorasExperiment() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const c = Math.sqrt(a * a + b * b);
  const isWhole = Math.abs(c - Math.round(c)) < 0.001;

  const scale = 20;

  return (
    /* 🔥 Safety padding aur margin taaki ads isse touch na hon */
    <div className="space-y-4 my-6 p-2">
      <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 rounded-2xl p-4">
        <h3 className="font-heading text-base mb-1 text-teal-700">📐 प्रमेय: a² + b² = c²</h3>
        <p className="font-body text-sm text-foreground">दो भुजाएं बदलकर देखो — तीसरी भुजा (कर्ण) खुद calculate होगी!</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border rounded-2xl p-3">
          <label className="font-body text-xs font-bold text-primary block mb-1">भुजा a = {a} cm</label>
          <input type="range" min="1" max="10" value={a} onChange={e => setA(Number(e.target.value))} className="w-full accent-primary" />
        </div>
        <div className="bg-card border rounded-2xl p-3">
          <label className="font-body text-xs font-bold text-teal-600 block mb-1">भुजा b = {b} cm</label>
          <input type="range" min="1" max="10" value={b} onChange={e => setB(Number(e.target.value))} className="w-full accent-teal-500" />
        </div>
      </div>

      {/* Visual Triangle */}
      <div className="bg-card border rounded-2xl p-4 flex items-center justify-center overflow-hidden" style={{ minHeight: 200 }}>
        {/* 🔥 SUDHAAR: SVG ko responsive banaya gaya hai taaki ads aane par layout crash na ho */}
        <svg 
          className="w-full h-auto max-w-[300px]" 
          viewBox={`-10 -10 ${a * scale + 70} ${b * scale + 70}`}
        >
          {/* Squares on sides */}
          <rect x={0} y={0} width={a * scale} height={a * scale} fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="2" transform={`translate(0,${b * scale}) rotate(-90,0,0)`} />
          <rect x={0} y={b * scale} width={a * scale} height={a * scale} fill="rgba(139,92,246,0.12)" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4" transform={`translate(0,${b * scale})`} />
          <text x={a * scale / 2} y={b * scale + a * scale / 2 + 5} textAnchor="middle" fontSize="11" fill="#8b5cf6" fontWeight="bold">a² = {a*a}</text>

          <rect x={a * scale} y={0} width={b * scale} height={b * scale} fill="rgba(20,184,166,0.15)" stroke="#14b8a6" strokeWidth="2" />
          <text x={a * scale + b * scale / 2} y={b * scale / 2 + 5} textAnchor="middle" fontSize="11" fill="#14b8a6" fontWeight="bold">b² = {b*b}</text>

          {/* Triangle */}
          <polygon points={`0,${b * scale} ${a * scale},${b * scale} ${a * scale},0`} fill="rgba(99,102,241,0.2)" stroke="#6366f1" strokeWidth="2.5" />
          {/* Right angle marker */}
          <rect x={a * scale - 10} y={b * scale - 10} width="10" height="10" fill="none" stroke="#6366f1" strokeWidth="1.5" />

          {/* Labels */}
          <text x={a * scale / 2} y={b * scale + 16} textAnchor="middle" fontSize="12" fill="#6366f1" fontWeight="bold">a={a}</text>
          <text x={a * scale + 14} y={b * scale / 2} fontSize="12" fill="#6366f1" fontWeight="bold">b={b}</text>
          {/* Hypotenuse label */}
          <text x={a * scale / 2 - 10} y={b * scale / 2 - 8} fontSize="11" fill="#f59e0b" fontWeight="bold">c≈{c.toFixed(2)}</text>
        </svg>
      </div>

      {/* Proof */}
      <motion.div key={`${a}-${b}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-2xl p-4 text-center">
        <p className="font-body text-sm mb-2">a² + b² = c²</p>
        <p className="font-heading text-2xl">{a}² + {b}² = {(a*a + b*b)}</p>
        <p className="font-heading text-2xl mt-1">c = √{a*a+b*b} = <span className="text-yellow-300">{c.toFixed(2)}</span></p>
        {isWhole && <div className="mt-2 bg-white/20 rounded-xl px-3 py-1 inline-block font-body text-sm">🌟 यह एक Pythagorean Triple है!</div>}
      </motion.div>
    </div>
  );
}
