import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download } from 'lucide-react';
import AbacusTool from '../components/models/AbacusTool';
import GeoboardTool from '../components/models/GeoboardTool';
import AngleDial from '../components/models/AngleDial';
import FractionDisk from '../components/models/FractionDisk';
import GeometryWorkspace from '../components/models/GeometryWorkspace';

const models = [
  { id: 1, title: '3D ज्यामिति वर्कस्पेस', subtitle: 'घन और बेलन घुमाओ', level: 'कक्षा 6-9', emoji: '🧊', color: 'from-indigo-500 to-purple-600', desc: 'घन को 360° घुमाओ, फलक, किनारे और कोने गिनो। सूत्र live दिखते हैं!' },
  { id: 2, title: 'डिजिटल अबाकस', subtitle: 'मोती खिसकाकर गिनती सीखो', level: 'कक्षा 1-3', emoji: '🔢', color: 'from-orange-400 to-amber-500', desc: 'मोती खिसकाओ — इकाई, दहाई, सैकड़ा live calculate होगा!' },
  { id: 3, title: 'जियोबोर्ड', subtitle: 'रबर बैंड से आकृतियां बनाओ', level: 'कक्षा 4-7', emoji: '📌', color: 'from-teal-500 to-green-500', desc: 'कीलों पर रबर बैंड खींचो — परिमाप और क्षेत्रफल अपने-आप निकलेगा!' },
  { id: 4, title: 'कोण चक्र', subtitle: 'कोण घुमाओ, नाम देखो', level: 'कक्षा 5-8', emoji: '🎯', color: 'from-pink-500 to-rose-600', desc: 'डायल घुमाओ — 0° से 360° तक, हर कोण का नाम live दिखेगा!' },
  { id: 5, title: 'भिन्न चक्र', subtitle: 'पिज्जा काटकर भिन्न सीखो', level: 'कक्षा 3-6', emoji: '🍕', color: 'from-red-500 to-orange-500', desc: 'पिज्जा को ½, ¼, ⅛ में काटो और रंगीन भिन्न समझो!' },
];

function downloadModelDoc(m) {
  const content = `NKG MATH UNIVERSE — Interactive Math Model\n${'='.repeat(50)}\n\nमॉडल: ${m.title}\nकक्षा: ${m.level}\n\nविवरण: ${m.desc}\n\n${'='.repeat(50)}\n🔢 NKG MATH UNIVERSE © 2026`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Model_${m.id}_${m.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
  document.body.appendChild(a); 
  a.click(); 
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function renderModel(id) {
  switch (id) {
    case 1: return <GeometryWorkspace />;
    case 2: return <AbacusTool />;
    case 3: return <GeoboardTool />;
    case 4: return <AngleDial />;
    case 5: return <FractionDisk />;
    default: return null;
  }
}

export default function InteractiveModels() {
  const [active, setActive] = useState(null);
  const m = models.find(x => x.id === active);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-8 px-4">
      <AnimatePresence mode="wait">
        {active ? (
          /* ── ACTIVE TOOL WORKSPACE ──────────────────────── */
          <motion.div
            key="workspace"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-4xl mx-auto"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <button 
                onClick={() => setActive(null)} 
                className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
              >
                <ArrowLeft size={16} /> पीछे जाएं
              </button>
              
              <div className="flex items-center gap-3">
                <span className={`bg-gradient-to-r ${m.color} text-white px-3 py-1 rounded-xl text-xs font-bold shadow-sm`}>
                  {m.level}
                </span>
                <button 
                  onClick={() => downloadModelDoc(m)} 
                  className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 border border-emerald-200/40 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm"
                >
                  <Download size={14} /> गाइड डाउनलोड
                </button>
              </div>
            </div>

            {/* Tool Banner */}
            <div className={`bg-gradient-to-r ${m.color} text-white rounded-3xl p-5 mb-6 flex items-center gap-4 shadow-md`}>
              <span className="text-5xl drop-shadow-sm p-2 bg-white/10 rounded-2xl" role="img" aria-label={m.title}>
                {m.emoji}
              </span>
              <div>
                <h2 className="text-xl md:text-2xl font-black tracking-wide">{m.title}</h2>
                <p className="text-xs md:text-sm font-medium opacity-90">{m.subtitle}</p>
              </div>
            </div>

            {/* Interactive Component Mount */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-5 shadow-xl">
              {renderModel(active)}
            </div>
          </motion.div>
        ) : (
          /* ── MODELS GRID DASHBOARD ──────────────────────── */
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto"
          >
            {/* Header Section */}
            <div className="text-center mb-10">
              <motion.h1 
                initial={{ opacity: 0, y: -15 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-2 tracking-tight"
              >
                🎮 वर्चुअल गणित लैबोरेटरी
              </motion.h1>
              <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm md:text-base">
                5 अद्भुत इंटरैक्टिव टूल्स — बिना रटे, बस छूकर और खेलकर सीखो!
              </p>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {models.map((m, i) => (
                <motion.div 
                  key={m.id} 
                  initial={{ opacity: 0, y: 25 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.04, type: 'spring', stiffness: 90 }}
                  whileHover={{ y: -6, scale: 1.02 }} 
                  onClick={() => setActive(m.id)} 
                  className="cursor-pointer group"
                >
                  <div className={`relative bg-gradient-to-br ${m.color} text-white rounded-3xl p-5 md:p-6 shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between overflow-hidden`}>
                    {/* Decorative radial ambient flare */}
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />

                    <div>
                      <div className="text-4xl md:text-5xl mb-3 drop-shadow-sm w-fit" role="img" aria-label={m.title}>
                        {m.emoji}
                      </div>
                      <div className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-md w-fit mb-2">
                        {m.level}
                      </div>
                      <h3 className="text-lg md:text-xl font-black mb-1.5 tracking-wide">{m.title}</h3>
                      <p className="text-xs opacity-90 font-medium leading-relaxed mb-4 line-clamp-3">{m.desc}</p>
                    </div>

                    <div className="bg-white text-slate-900 group-hover:bg-slate-900 group-hover:text-white font-black text-xs px-4 py-2 rounded-xl w-fit flex items-center gap-1.5 shadow-sm transition-colors duration-200">
                      <span>▶</span> सिमुलेटर खोलें
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
