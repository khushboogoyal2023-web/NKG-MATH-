import { useState } from 'react';
import { motion } from 'framer-motion';

const SHAPES = [
  { id: 'cube', label: 'घन (Cube)', formula: 'V = a³ | SA = 6a²', color: '#6366f1' },
  { id: 'cylinder', label: 'बेलन (Cylinder)', formula: 'V = πr²h | CSA = 2πrh', color: '#14b8a6' },
];

function CubeSVG({ a }) {
  // Scaling factors based on dynamic 'a' state input values
  const baseD = 40;
  const d = baseD + (a * 3.5); 
  const ox = 120, oy = 95 - (a * 1.5);
  const cos30 = Math.cos(Math.PI/6), sin30 = Math.sin(Math.PI/6);
  
  // top face matrix
  const top = [[0,-d],[d*cos30,-d+d*sin30],[0,-d+2*d*sin30],[-d*cos30,-d+d*sin30]];
  // right face matrix
  const right = [[d*cos30,-d+d*sin30],[d*cos30,d*sin30],[0,d*2*sin30],[0,-d+2*d*sin30]];
  // left face matrix
  const left = [[0,-d+2*d*sin30],[0,2*d*sin30],[-d*cos30,d*sin30],[-d*cos30,-d+d*sin30]];
  
  const toStr = (pts) => pts.map(([x,y])=>`${ox+x},${oy+y}`).join(' ');

  return (
    <svg width={240} height={220} className="mx-auto select-none">
      <polygon points={toStr(top)} fill="#818cf8" fillOpacity={0.85} stroke="#4338ca" strokeWidth={2.5} />
      <polygon points={toStr(right)} fill="#6366f1" fillOpacity={0.85} stroke="#4338ca" strokeWidth={2.5} />
      <polygon points={toStr(left)} fill="#4338ca" fillOpacity={0.85} stroke="#3730a3" strokeWidth={2.5} />
      
      {/* Dynamic Edge labels */}
      <text x={ox+d*cos30/2+10} y={oy-d+d*sin30/2} fontSize={12} fill="white" fontWeight="black">a</text>
      <text x={ox+d*cos30+6} y={oy} fontSize={12} fill="white" fontWeight="black">h</text>
      
      {/* Formula helper tag baseline */}
      <text x={ox} y={205} textAnchor="middle" fontSize={12} className="fill-indigo-300 font-bold">सूत्र: V = a³ | SA = 6a²</text>
    </svg>
  );
}

function CylinderSVG({ r, h }) {
  const cx = 120;
  // Scaled dimensions dynamically calculated
  const rx = 35 + (r * 4.5);
  const ry = 12 + (r * 1.2);
  const cylH = 50 + (h * 8);
  const cy = 110 - (cylH / 2);

  return (
    <svg width={240} height={220} className="mx-auto select-none">
      {/* Bottom ellipse element */}
      <ellipse cx={cx} cy={cy+cylH} rx={rx} ry={ry} fill="#0d9488" fillOpacity={0.75} stroke="#0f766e" strokeWidth={2.5} />
      {/* Responsive Body rectangle mesh */}
      <rect x={cx-rx} y={cy} width={rx*2} height={cylH} fill="#14b8a6" fillOpacity={0.7} />
      <line x1={cx-rx} y1={cy} x2={cx-rx} y2={cy+cylH} stroke="#0f766e" strokeWidth={2.5} />
      <line x1={cx+rx} y1={cy} x2={cx+rx} y2={cy+cylH} stroke="#0f766e" strokeWidth={2.5} />
      {/* Top ellipse closure */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#2dd4bf" fillOpacity={0.9} stroke="#0f766e" strokeWidth={2.5} />
      
      {/* Radius guidelines */}
      <line x1={cx} y1={cy} x2={cx+rx} y2={cy} stroke="white" strokeWidth={2} strokeDasharray="4,3" />
      <text x={cx+rx/2} y={cy-5} fontSize={11} fill="white" fontWeight="black" textAnchor="middle">r</text>
      
      {/* Height labels rules indicators */}
      <line x1={cx-rx-10} y1={cy} x2={cx-rx-10} y2={cy+cylH} stroke="white" strokeWidth={1.5} strokeDasharray="4,3" />
      <text x={cx-rx-22} y={cy+cylH/2+4} fontSize={11} fill="white" fontWeight="black" textAnchor="middle">h</text>
      
      <text x={cx} y={205} textAnchor="middle" fontSize={12} className="fill-teal-300 font-bold">सूत्र: V = πr²h</text>
    </svg>
  );
}

export default function GeometryWorkspace() {
  const [shape, setShape] = useState('cube');
  const [a, setA] = useState(5);
  // 🔥 SUDHAAR: Active state management hooks added for dynamic Cylinder inputs
  const [r, setR] = useState(4);
  const [h, setH] = useState(6);

  // Kid friendly voice synthesizer trigger
  const speakGeometry = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.pitch = 1.35;
      window.speechSynthesis.speak(utterance);
    }
  };

  const cubeV = (a**3).toFixed(0);
  const cubeSA = (6*(a**2)).toFixed(0);
  
  const cylV = (Math.PI * (r**2) * h).toFixed(0);
  const cylCSA = (2 * Math.PI * r * h).toFixed(0);
  const cylTSA = (2 * Math.PI * r * (r + h)).toFixed(0);

  return (
    <div className="space-y-4 my-2 p-2 max-w-sm mx-auto">
      {/* Shape Tab Selection Controllers */}
      <div className="flex gap-2 bg-muted dark:bg-slate-800 border-2 border-border p-1.5 rounded-2xl shadow-inner">
        {SHAPES.map(s => (
          <button 
            key={s.id} 
            onClick={() => { setShape(s.id); speakGeometry(s.label); }}
            className={`flex-1 py-2.5 rounded-xl font-body font-black text-sm min-h-0 transition-all active:scale-95 ${shape === s.id ? 'bg-white dark:bg-slate-700 shadow-md text-purple-600 dark:text-purple-300' : 'text-muted-foreground'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Render Canvas Area viewbox viewport */}
      <div className="bg-slate-900 rounded-3xl p-4 shadow-xl border-b-4 border-black/30 overflow-hidden">
        <motion.div key={shape} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 20 }}>
          {shape === 'cube' ? <CubeSVG a={a} /> : <CylinderSVG r={r} h={h} />}
        </motion.div>
      </div>

      {/* Conditional Parametric Sliders Controllers panels */}
      {shape === 'cube' ? (
        <>
          <div className="bg-card dark:bg-slate-800 border-2 border-border rounded-2xl p-3.5 shadow-xs">
            <label className="font-body text-xs font-black text-purple-600 dark:text-purple-400 block mb-1">📐 घन की भुजा (Edge a) = {a} cm</label>
            <input 
              type="range" 
              min={2} 
              max={10} 
              value={a} 
              onChange={e => { setA(Number(e.target.value)); if(e.target.value % 2 === 0) speakGeometry(`भुजा ${e.target.value}`); }} 
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
            />
          </div>
          
          {/* Cube Math output readout matrix */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl p-3 text-center shadow-xs">
              <p className="font-body text-xs font-bold text-indigo-600 dark:text-indigo-400">आयतन (Volume)</p>
              <p className="font-heading text-2xl font-black text-indigo-700 dark:text-indigo-300">{cubeV}</p>
              <p className="font-body text-[10px] text-muted-foreground font-medium">cm³</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 rounded-2xl p-3 text-center shadow-xs">
              <p className="font-body text-xs font-bold text-purple-600 dark:text-purple-400">कुल क्षेत्रफल (TSA)</p>
              <p className="font-heading text-2xl font-black text-purple-700 dark:text-purple-300">{cubeSA}</p>
              <p className="font-body text-[10px] text-muted-foreground font-medium">cm²</p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 🔥 SUDHAAR: Cylinder control layout with dual sliders panel sync updates */}
          <div className="bg-card dark:bg-slate-800 border-2 border-border rounded-2xl p-3.5 space-y-3 shadow-xs">
            <div>
              <label className="font-body text-xs font-black text-teal-600 dark:text-teal-400 block mb-1">⭕ त्रिज्या (Radius r) = {r} cm</label>
              <input 
                type="range" 
                min={2} 
                max={8} 
                value={r} 
                onChange={e => { setR(Number(e.target.value)); if(e.target.value % 2 === 0) speakGeometry(`त्रिज्या ${e.target.value}`); }} 
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500" 
              />
            </div>
            <div>
              <label className="font-body text-xs font-black text-emerald-600 dark:text-emerald-400 block mb-1">📏 ऊँचाई (Height h) = {h} cm</label>
              <input 
                type="range" 
                min={3} 
                max={12} 
                value={h} 
                onChange={e => { setH(Number(e.target.value)); if(e.target.value % 2 === 0) speakGeometry(`ऊँचाई ${e.target.value}`); }} 
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
              />
            </div>
          </div>
          
          {/* Cylinder calculation dashboard cells metrics */}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/40 rounded-2xl p-2 text-center shadow-xs">
              <p className="font-body text-[10px] font-bold text-teal-600 dark:text-teal-400">आयतन (Vol)</p>
              <p className="font-heading text-lg font-black text-teal-700 dark:text-teal-300">{cylV}</p>
              <p className="font-body text-[9px] text-muted-foreground font-medium">cm³</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/40 border border-green-100 dark:border-green-900/40 rounded-2xl p-2 text-center shadow-xs">
              <p className="font-body text-[10px] font-bold text-green-600 dark:text-green-400">वक्र (CSA)</p>
              <p className="font-heading text-lg font-black text-green-700 dark:text-green-300">{cylCSA}</p>
              <p className="font-body text-[9px] text-muted-foreground font-medium">cm²</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl p-2 text-center shadow-xs">
              <p className="font-body text-[10px] font-bold text-emerald-600 dark:text-emerald-400">कुल (TSA)</p>
              <p className="font-heading text-lg font-black text-emerald-700 dark:text-emerald-300">{cylTSA}</p>
              <p className="font-body text-[9px] text-muted-foreground font-medium">cm²</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
