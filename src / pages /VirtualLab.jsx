import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskRound, Play, ArrowLeft, Download, RotateCcw } from 'lucide-react';
import PiExperiment from '../components/lab/PiExperiment';
import PythagorasExperiment from '../components/lab/PythagorasExperiment';
import LinearGraphExperiment from '../components/lab/LinearGraphExperiment';
import ProbabilityExperiment from '../components/lab/ProbabilityExperiment';

const experiments = [
  { id: 1, title: 'π (Pi) का प्रायोगिक सत्यापन', subtitle: 'C ÷ d = 3.14', level: 'कक्षा 7-9', emoji: '⭕', color: 'from-purple-500 to-indigo-600', description: 'तीन गोल वस्तुओं की परिधि और व्यास मापकर π = 3.14 सिद्ध करो', interactive: true },
  { id: 2, title: 'पाइथागोरस प्रमेय — वर्ग विधि', subtitle: 'a² + b² = c²', level: 'कक्षा 7-9', emoji: '📐', color: 'from-teal-500 to-green-600', description: 'समकोण त्रिभुज की तीन भुजाओं पर वर्ग बनाकर प्रमेय सिद्ध करो', interactive: true },
  { id: 3, title: 'रैखिक समीकरण — ग्राफ पर', subtitle: 'y = mx + c', level: 'कक्षा 8-9', emoji: '📈', color: 'from-orange-500 to-red-500', description: 'y = 2x + 3 को ग्राफ पर plot करके देखो — सब बिंदु एक सीधी रेखा पर हैं!', interactive: true },
  { id: 4, title: 'प्रायिकता — पासा और सिक्का', subtitle: 'P(event) = अनुकूल/कुल', level: 'कक्षा 6-9', emoji: '🎲', color: 'from-pink-500 to-rose-600', description: 'पासा फेंको, सिक्का उछालो — 20 प्रयासों में probability देखो!', interactive: true },
  { id: 5, title: 'कागज़ मोड़कर भिन्न', subtitle: '1/2, 1/4, 3/4...', level: 'कक्षा 3-5', emoji: '📄', color: 'from-yellow-500 to-amber-500', description: 'कागज़ को 2, 4, 8 बराबर भागों में मोड़कर भिन्न समझो', interactive: false },
  { id: 6, title: 'त्रिभुज के कोणों का योग', subtitle: '∠A + ∠B + ∠C = 180°', level: 'कक्षा 5-7', emoji: '📐', color: 'from-blue-500 to-cyan-600', description: 'त्रिभुज के तीनों कोणों को एक सीधी रेखा पर जोड़कर 180° सिद्ध करो', interactive: false },
  { id: 7, title: 'सीधा और उलटा अनुपात', subtitle: 'x/y = k | x×y = k', level: 'कक्षा 7-8', emoji: '⚖️', color: 'from-violet-500 to-purple-600', description: 'तुला पर बाट रखकर सीधा और उलटा अनुपात देखो', interactive: false },
  { id: 8, title: 'वृत्त का क्षेत्रफल — Sector विधि', subtitle: 'A = πr²', level: 'कक्षा 7-9', emoji: '🍰', color: 'from-rose-500 to-pink-500', description: 'वृत्त को 16 sectors में काटकर rectangle बनाओ और Area = πr² सिद्ध करो', interactive: false },
  { id: 9, title: '3D आकृतियों के Net', subtitle: 'घन, प्रिज्म, पिरामिड', level: 'कक्षा 4-6', emoji: '📦', color: 'from-indigo-500 to-blue-600', description: '2D Net को मोड़कर 3D ठोस बनाओ — Cube, Prism, Pyramid', interactive: false },
  { id: 10, title: 'स्थानीय मान — नोट विधि', subtitle: 'सैकड़ा, दहाई, इकाई', level: 'कक्षा 1-3', emoji: '💰', color: 'from-green-500 to-emerald-600', description: '₹100, ₹10, ₹1 के नोट से संख्या बनाओ और स्थानीय मान सीखो', interactive: false },
  { id: 11, title: 'बार चार्ट और चित्रलेख', subtitle: 'Data Representation', level: 'कक्षा 3-5', emoji: '📊', color: 'from-amber-500 to-orange-500', description: 'डेटा तालिका से bar graph और pictograph बनाओ', interactive: false },
  { id: 12, title: 'दर्पण सममिति (Mirror Symmetry)', subtitle: 'Line of Symmetry', level: 'कक्षा 2-5', emoji: '🪞', color: 'from-cyan-500 to-teal-600', description: 'आधी आकृति बनाओ, mirror line से दूसरा हिस्सा reflect करो', interactive: false },
  { id: 13, title: 'बेलन का पृष्ठीय क्षेत्रफल', subtitle: 'TSA = 2πr(r+h)', level: 'कक्षा 8-9', emoji: '🥫', color: 'from-teal-600 to-green-700', description: 'बेलन को खोलकर flat sheet बनाओ और SA = 2πrh + 2πr² सिद्ध करो', interactive: false },
  { id: 14, title: 'गुणनखंड वृक्ष', subtitle: 'Prime Factorization', level: 'कक्षा 4-6', emoji: '🌳', color: 'from-green-600 to-teal-600', description: 'किसी संख्या को factor tree से prime में तोड़ो और LCM/HCF निकालो', interactive: false },
  { id: 15, title: 'सर्वांगसमता (Congruence)', subtitle: 'SSS, SAS, ASA', level: 'कक्षा 7-9', emoji: '🔷', color: 'from-blue-600 to-indigo-700', description: 'दो त्रिभुजों को SSS, SAS, ASA rules से मिलाकर congruence सिद्ध करो', interactive: false },
  { id: 16, title: 'संख्या क्रम और पैटर्न', subtitle: '2, 4, 8, 16, ___', level: 'कक्षा 1-4', emoji: '🔢', color: 'from-purple-400 to-pink-500', description: 'संख्याओं का pattern पहचानो और अगला भाग भरो', interactive: false },
  { id: 17, title: 'निर्देशांक — खज़ाना ढूंढो', subtitle: '(x, y) Coordinates', level: 'कक्षा 5-7', emoji: '🗺️', color: 'from-amber-600 to-yellow-600', description: 'Cartesian plane पर coordinate (3,4) डालकर खज़ाना ढूंढो!', interactive: false },
  { id: 18, title: 'शंकु और बेलन का आयतन', subtitle: 'V(cone) = ⅓ πr²h', level: 'कक्षा 8-9', emoji: '🍦', color: 'from-orange-600 to-red-600', description: 'शंकु से पानी भरकर बेलन में डालो — 3 बार लगता है! V(cone) = ⅓ V(cylinder)', interactive: false },
  { id: 19, title: 'लंबाई मापना और रूपांतरण', subtitle: 'mm → cm → m → km', level: 'कक्षा 3-5', emoji: '📏', color: 'from-slate-500 to-gray-600', description: 'अलग-अलग वस्तुओं को mm, cm, m से मापो और convert करो', interactive: false },
  { id: 20, title: 'परिमाप और क्षेत्रफल Sandbox', subtitle: 'Perimeter ≠ Area', level: 'कक्षा 4-7', emoji: '🏗️', color: 'from-lime-500 to-green-600', description: 'Same perimeter पर different area — यह confusion हमेशा के लिए दूर करो!', interactive: false },
];

function downloadExperimentDoc(exp) {
  const content = `NKG MATH UNIVERSE — वर्चुअल लैब प्रयोग
${'='.repeat(50)}

प्रयोग: ${exp.title}
कक्षा: ${exp.level}
सूत्र: ${exp.subtitle}

${exp.description}

निष्कर्ष: इस प्रयोग से ${exp.title} की अवधारणा सिद्ध होती है।

${'='.repeat(50)}
🔢 NKG MATH UNIVERSE © 2026 | गणित सीखो, मज़े करो!`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Experiment_${exp.id}_${exp.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function VirtualLab() {
  const [activeExp, setActiveExp] = useState(null);
  const [started, setStarted] = useState(false);

  const exp = experiments.find(e => e.id === activeExp);

  const renderExperiment = () => {
    switch (activeExp) {
      case 1: return <PiExperiment />;
      case 2: return <PythagorasExperiment />;
      case 3: return <LinearGraphExperiment />;
      case 4: return <ProbabilityExperiment />;
      default: return null;
    }
  };

  if (activeExp && started) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => { setActiveExp(null); setStarted(false); }}
            className="flex items-center gap-1 text-sm font-body font-bold text-primary hover:underline min-h-0 min-w-0">
            <ArrowLeft size={16} /> वापस जाएं
          </button>
          <div className={`bg-gradient-to-r ${exp.color} text-white px-3 py-1 rounded-xl text-xs font-body font-bold`}>{exp.level}</div>
          <button onClick={() => downloadExperimentDoc(exp)}
            className="ml-auto flex items-center gap-1.5 bg-green-100 text-green-700 hover:bg-green-200 border border-green-300 px-3 py-1.5 rounded-xl font-body font-bold text-xs min-h-0 transition-all">
            <Download size={14} /> डाउनलोड प्रयोग फ़ाइल
          </button>
        </div>
        <div className={`bg-gradient-to-r ${exp.color} text-white rounded-2xl p-4 mb-5`}>
          <div className="text-3xl mb-1">{exp.emoji}</div>
          <h2 className="font-heading text-xl">{exp.title}</h2>
          <p className="font-body text-sm opacity-80">{exp.subtitle}</p>
        </div>
        {renderExperiment()}
      </div>
    );
  }

  if (activeExp && !started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <button onClick={() => setActiveExp(null)} className="flex items-center gap-1 text-sm font-body font-bold text-primary hover:underline mb-6 min-h-0 min-w-0 mx-auto">
          <ArrowLeft size={16} /> सभी प्रयोग
        </button>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="text-6xl mb-4">{exp.emoji}</div>
          <h2 className="font-heading text-2xl mb-2">{exp.title}</h2>
          <p className="font-body text-sm text-muted-foreground mb-1">{exp.level}</p>
          <p className="font-body text-sm mb-2"><strong className="text-primary">{exp.subtitle}</strong></p>
          <p className="font-body text-sm text-muted-foreground mb-6 max-w-md mx-auto">{exp.description}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setStarted(true)}
              className={`bg-gradient-to-r ${exp.color} text-white px-8 py-4 rounded-2xl font-heading text-lg flex items-center gap-2 mx-auto sm:mx-0 shadow-xl hover:scale-105 transition-transform`}>
              <Play size={22} fill="white" /> प्रयोग शुरू करें
            </button>
            <button onClick={() => downloadExperimentDoc(exp)}
              className="border-2 border-green-400 text-green-600 hover:bg-green-50 px-6 py-4 rounded-2xl font-body font-bold flex items-center gap-2 mx-auto sm:mx-0 transition-all">
              <Download size={18} /> डाउनलोड प्रयोग फ़ाइल
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <div className="bg-gradient-to-br from-teal-500 to-green-600 text-white rounded-3xl p-4 shadow-xl">
            <FlaskRound size={36} />
          </div>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl mb-1">🧪 वर्चुअल मैथ लैब</h1>
        <p className="text-muted-foreground font-body text-sm">20 प्रयोग — कक्षा 1 से 9 तक | 4 Interactive + 16 Step-by-Step</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {experiments.map((exp, i) => (
          <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.05, 0.5) }}
            whileHover={{ y: -3, scale: 1.02 }} className="cursor-pointer" onClick={() => { setActiveExp(exp.id); setStarted(false); }}>
            <div className={`bg-gradient-to-br ${exp.color} text-white rounded-2xl p-4 shadow-lg h-full`}>
              <div className="flex items-start justify-between mb-1">
                <span className="text-3xl">{exp.emoji}</span>
                <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full font-body">{exp.interactive ? '🎮 Interactive' : '📖 Step-by-step'}</span>
              </div>
              <div className="text-xs font-body opacity-70 mb-0.5">{exp.level}</div>
              <h3 className="font-heading text-base mb-1">{exp.title}</h3>
              <p className="font-body text-xs opacity-75 mb-2 leading-relaxed line-clamp-2">{exp.description}</p>
              <div className="bg-white/20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-body font-bold">
                <Play size={10} fill="white" /> शुरू करें
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
