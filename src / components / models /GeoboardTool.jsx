import { useState } from 'react';
import { motion } from 'framer-motion';

const GRID = 5;
const CELL = 44;
const PAD = 20;
const SIZE = GRID * CELL + PAD * 2;

function dist(a, b) { return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2); }
function perimeter(pts) {
  if (pts.length < 2) return 0;
  let p = 0;
  for (let i = 0; i < pts.length; i++) p += dist(pts[i], pts[(i+1)%pts.length]);
  return p;
}
function area(pts) {
  // Shoelace formula
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    a += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1];
  }
  return Math.abs(a / 2);
}

export default function GeoboardTool() {
  const [selected, setSelected] = useState([]);

  // 🔥 SUDHAAR: Voice feedback speech synthesizer for geometry shapes
  const speakGeometry = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.pitch = 1.3; // Chattering cartoon sound pitch
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggle = (r, c) => {
    setSelected(s => {
      const isExist = s.find(p => p[0] === r && p[1] === c);
      const nextState = isExist 
        ? s.filter(p => !(p[0] === r && p[1] === c)) 
        : [...s, [r, c]];

      // Dynamic calculations for immediate audio feedback
      if (nextState.length === 0) {
        speakGeometry("बोर्ड साफ हो गया");
      } else if (nextState.length === 1) {
        speakGeometry("पहला बिंदु");
      } else {
        const nextPts = nextState.map(([row, col]) => [PAD + col * CELL, PAD + row * CELL]);
        const calculatedArea = nextState.length >= 3 ? (area(nextPts) / (CELL * CELL)).toFixed(1) : "0";
        if (Number(calculatedArea) > 0) {
          speakGeometry(`क्षेत्रफल ${calculatedArea} वर्ग इकाई`);
        } else {
          speakGeometry(`${nextState.length} बिंदु जुड़े`);
        }
      }
      return nextState;
    });
  };

  const pts = selected.map(([r, c]) => [PAD + c * CELL, PAD + r * CELL]);
  const perim = selected.length >= 2 ? (perimeter(pts) / CELL).toFixed(1) : "0.0";
  const ar = selected.length >= 3 ? (area(pts) / (CELL * CELL)).toFixed(1) : "0.0";

  return (
    <div className="space-y-4 my-2 p-2 max-w-sm mx-auto">
      {/* Informative Header Badge */}
      <div className="bg-teal-50 dark:bg-teal-950/40 border-2 border-teal-300 rounded-2xl p-3 text-center">
        <p className="font-body text-xs font-bold text-teal-700 dark:text-teal-300">
          📌 कीलों पर क्लिक करके रबर बैंड खींचो और जादुई आकृतियाँ बनाओ!
        </p>
      </div>

      {/* Main Vector Grid Geoboard */}
      <div className="flex justify-center bg-white dark:bg-slate-900 rounded-3xl p-4 border-4 border-amber-500/40 shadow-inner">
        <svg width={SIZE} height={SIZE} className="bg-amber-50/60 dark:bg-slate-950/80 rounded-2xl border-2 border-amber-200 dark:border-slate-800 select-none">
          {/* Grid lines - 🔥 SUDHAAR: Enhanced visibility stroke lines for modern devices */}
          {Array.from({ length: GRID }).map((_, i) =>
            Array.from({ length: GRID }).map((_, j) => (
              <g key={`${i},${j}`}>
                {j < GRID - 1 && <line x1={PAD+j*CELL} y1={PAD+i*CELL} x2={PAD+(j+1)*CELL} y2={PAD+i*CELL} className="stroke-amber-600/30 dark:stroke-slate-700" strokeWidth={1} strokeDasharray="3,3" />}
                {i < GRID - 1 && <line x1={PAD+j*CELL} y1={PAD+i*CELL} x2={PAD+j*CELL} y2={PAD+(i+1)*CELL} className="stroke-amber-600/30 dark:stroke-slate-700" strokeWidth={1} strokeDasharray="3,3" />}
              </g>
            ))
          )}

          {/* Rubber band polygon mesh */}
          {selected.length >= 2 && (
            <polygon 
              points={pts.map(p=>p.join(',')).join(' ')} 
              fill="rgba(147, 51, 234, 0.15)" 
              className="stroke-purple-500 dark:stroke-purple-400"
              strokeWidth={3.5} 
              strokeLinejoin="round" 
              strokeDasharray={selected.length >= 3 ? '' : '6,4'} 
            />
          )}

          {/* Peg Board Pins - Animated with high-contrast target hits */}
          {Array.from({ length: GRID }).map((_, r) =>
            Array.from({ length: GRID }).map((_, c) => {
              const isSelected = selected.find(p => p[0]===r&&p[1]===c);
              return (
                <circle 
                  key={`${r},${c}`} 
                  cx={PAD+c*CELL} 
                  cy={PAD+r*CELL} 
                  r={isSelected ? 9 : 6}
                  fill={isSelected ? '#a855f7' : '#d97706'} 
                  stroke={isSelected ? 'white' : '#fef3c7'} 
                  strokeWidth={2}
                  className="cursor-pointer transition-all duration-150 active:scale-150"
                  onClick={() => toggle(r, c)} 
                />
              );
            })
          )}
        </svg>
      </div>

      {/* Geometry Stats Matrix Board Dashboard */}
      <div className="grid grid-cols-3 gap-2.5 text-center">
        <div className="bg-card dark:bg-slate-800 border-2 border-border rounded-2xl p-2.5 shadow-xs">
          <p className="font-body text-[11px] font-bold text-muted-foreground dark:text-slate-400">बिंदु (Pegs)</p>
          <p className="font-heading text-xl font-black text-purple-500">{selected.length}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-200 dark:border-blue-900/60 rounded-2xl p-2.5 shadow-xs">
          <p className="font-body text-[11px] font-bold text-blue-600 dark:text-blue-400">परिमाप (P)</p>
          <p className="font-heading text-xl font-black text-blue-600 dark:text-blue-300">{perim}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-950/40 border-2 border-green-200 dark:border-green-900/60 rounded-2xl p-2.5 shadow-xs">
          <p className="font-body text-[11px] font-bold text-green-600 dark:text-green-400">क्षेत्रफल (A)</p>
          <p className="font-heading text-xl font-black text-green-600 dark:text-green-300">{ar}</p>
        </div>
      </div>

      {/* Clear Action Button */}
      <button 
        onClick={() => { setSelected([]); speakGeometry("साफ हो गया"); }} 
        className="w-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl py-2.5 font-body text-sm font-bold text-muted-foreground dark:text-slate-300 hover:text-purple-500 hover:border-purple-400 transition-all active:scale-98"
      >
        🔄 बोर्ड साफ़ करो (Clear Board)
      </button>
    </div>
  );
}
