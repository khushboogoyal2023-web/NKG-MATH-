import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LinearGraphExperiment() {
  const [m, setM] = useState(2);
  const [c, setC] = useState(3);
  const [xVals] = useState([-2, -1, 0, 1, 2, 3]);
  const [plotted, setPlotted] = useState([]);
  const [lineDone, setLineDone] = useState(false);

  const yVals = xVals.map(x => m * x + c);

  const plotPoint = (i) => {
    if (!plotted.includes(i)) {
      const np = [...plotted, i];
      setPlotted(np);
      if (np.length >= 3) setTimeout(() => setLineDone(true), 500);
    }
  };

  const reset = () => { setPlotted([]); setLineDone(false); };

  // SVG coordinate mapping
  const W = 260, H = 220, ox = 110, oy = 110, unit = 30;
  const tx = x => ox + x * unit;
  const ty = y => oy - y * unit;

  const plottedPoints = plotted.map(i => ({ x: xVals[i], y: yVals[i] }));

  return (
    /* 🔥 Sudhaar: 'my-6' (vertical margin) joda hai taaki agar iske 
      upar ya niche koi Ad aaye, to code usse chipke nahi aur layout kharab na ho.
    */
    <div className="space-y-4 my-6 p-1">
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 rounded-2xl p-4">
        <h3 className="font-heading text-base mb-1 text-orange-700">📈 समीकरण: y = mx + c</h3>
        <p className="font-body text-sm">m (ढाल) और c (y-intercept) बदलो, फिर बिंदु plot करो!</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border rounded-2xl p-3">
          <label className="font-body text-xs font-bold text-orange-600 block mb-1">ढाल m = {m}</label>
          <input type="range" min="-3" max="3" step="1" value={m} onChange={e => { setM(Number(e.target.value)); reset(); }} className="w-full accent-orange-500" />
        </div>
        <div className="bg-card border rounded-2xl p-3">
          <label className="font-body text-xs font-bold text-pink-600 block mb-1">c = {c}</label>
          <input type="range" min="-4" max="4" step="1" value={c} onChange={e => { setC(Number(e.target.value)); reset(); }} className="w-full accent-pink-500" />
        </div>
      </div>

      <div className="font-heading text-center text-lg text-primary">y = {m === 1 ? '' : m === -1 ? '-' : m}x {c >= 0 ? '+' : ''} {c}</div>

      {/* Table */}
      <div className="bg-card border rounded-2xl p-3 overflow-x-auto">
        <p className="font-body text-xs font-bold text-muted-foreground mb-2">x और y की तालिका — बिंदु plot करने के लिए क्लिक करो:</p>
        <div className="flex gap-2">
          {xVals.map((x, i) => (
            <motion.button key={i} onClick={() => plotPoint(i)} whileTap={{ scale: 0.9 }}
              className={`flex-1 rounded-xl p-2 text-center min-h-0 transition-all border-2 ${plotted.includes(i) ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-transparent hover:border-primary'}`}>
              <p className="font-body text-xs">x={x}</p>
              <p className="font-heading text-sm">y={yVals[i]}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Graph */}
      <div className="bg-white dark:bg-card border rounded-2xl p-3 flex justify-center">
        <svg width={W} height={H}>
          {/* Grid */}
          {[-3,-2,-1,0,1,2,3].map(g => (
            <g key={g}>
              <line x1={tx(g)} y1={0} x2={tx(g)} y2={H} stroke="#e5e7eb" strokeWidth="1" />
              <line x1={0} y1={ty(g)} x2={W} y2={ty(g)} stroke="#e5e7eb" strokeWidth="1" />
            </g>
          ))}
          {/* Axes */}
          <line x1={0} y1={oy} x2={W} y2={oy} stroke="#374151" strokeWidth="2" />
          <line x1={ox} y1={0} x2={ox} y2={H} stroke="#374151" strokeWidth="2" />
          {/* Labels */}
          {[-3,-2,-1,1,2,3].map(n => (
            <g key={n}>
              <text x={tx(n)} y={oy + 15} textAnchor="middle" fontSize="9" fill="#6b7280">{n}</text>
              <text x={ox - 14} y={ty(n) + 3} textAnchor="middle" fontSize="9" fill="#6b7280">{n}</text>
            </g>
          ))}
          <text x={W - 12} y={oy - 5} fontSize="11" fill="#374151" fontWeight="bold">x</text>
          <text x={ox + 5} y={12} fontSize="11" fill="#374151" fontWeight="bold">y</text>

          {/* Line */}
          {lineDone && (
            <motion.line
              x1={tx(-3)} y1={ty(m * -3 + c)} x2={tx(3)} y2={ty(m * 3 + c)}
              stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8 }}
            />
          )}

          {/* Plotted points */}
          {plottedPoints.map((pt, i) => (
            <motion.circle key={i} cx={tx(pt.x)} cy={ty(pt.y)} r={6} fill="#f97316" stroke="white" strokeWidth="2"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} />
          ))}
        </svg>
      </div>

      {lineDone && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-4 text-center">
          <p className="font-heading text-lg">🎉 निष्कर्ष!</p>
          <p className="font-body text-sm mt-1">y = {m}x + {c} के सभी बिंदु एक सीधी रेखा पर हैं!</p>
          <p className="font-body text-xs mt-1 opacity-80">इसीलिए इसे "रैखिक समीकरण" (Linear Equation) कहते हैं।</p>
        </motion.div>
      )}
    </div>
  );
}
