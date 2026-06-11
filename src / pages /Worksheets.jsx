import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, CheckSquare } from 'lucide-react';
import { formulas } from '../lib/mathData';

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function generateTableRows(num, count = 20) {
  const lines = [];
  for (let i = 1; i <= count; i++) {
    lines.push(`${num} × ${i} = ${num * i}`);
  }
  return lines;
}

function generateSquares() {
  const rows = [];
  for (let i = 1; i <= 30; i++) rows.push(`${i}² = ${i * i}`);
  return rows;
}

function generateCubes() {
  const rows = [];
  for (let i = 1; i <= 20; i++) rows.push(`${i}³ = ${i * i * i}`);
  return rows;
}

// ──────────────────────────────────────────────
// Core PDF text builder
// ──────────────────────────────────────────────

function buildText(type, extra) {
  const LINE = '─'.repeat(52);
  const DLINE = '═'.repeat(52);

  let txt = '';
  txt += `${DLINE}\n`;
  txt += `      NKG MATH UNIVERSE — वर्कशीट\n`;
  txt += `${DLINE}\n\n`;

  if (type === 'tables') {
    const nums = extra || [2, 3, 4, 5];
    nums.forEach(n => {
      txt += `  ${n} का पहाड़ा\n${LINE}\n`;
      generateTableRows(n, 20).forEach(r => (txt += `  ${r}\n`));
      txt += '\n';
    });
  } else if (type === 'squares') {
    txt += `  वर्ग (Squares 1–30)\n${LINE}\n`;
    generateSquares().forEach(r => (txt += `  ${r}\n`));
    txt += '\n';
  } else if (type === 'cubes') {
    txt += `  घन (Cubes 1–20)\n${LINE}\n`;
    generateCubes().forEach(r => (txt += `  ${r}\n`));
    txt += '\n';
  } else if (type === 'formulas') {
    const cats = extra || formulas.map(c => c.category);
    formulas
      .filter(c => cats.includes(c.category))
      .forEach(cat => {
        txt += `  ${cat.category}\n${LINE}\n`;
        cat.items.forEach(item => (txt += `  ${item.name}  =  ${item.formula}\n`));
        txt += '\n';
      });
  } else if (type === 'practice') {
    txt += `  अभ्यास प्रश्न\n${LINE}\n\n`;
    const probs = extra || [];
    probs.forEach((p, i) => {
      txt += `  ${i + 1}.  ${p.question}\n`;
      txt += `      उत्तर: _______________________________\n\n`;
    });
  }

  txt += `${DLINE}\n`;
  txt += `  © NKG MATH UNIVERSE  |  nkg-math-universe.com\n`;
  txt += `${DLINE}\n`;
  return txt;
}

function downloadTxt(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ──────────────────────────────────────────────
// Worksheet cards config
// ──────────────────────────────────────────────

const PRESET_WORKSHEETS = [
  {
    id: 'tables-basic',
    title: '2 से 10 तक के पहाड़े',
    subtitle: 'प्राथमिक कक्षाओं के लिए',
    emoji: '🔢',
    gradient: 'from-orange-400 to-amber-500',
    download: () => downloadTxt('NKG_Pahade_2-10.txt', buildText('tables', [2,3,4,5,6,7,8,9,10])),
  },
  {
    id: 'tables-advanced',
    title: '11 से 20 तक के पहाड़े',
    subtitle: 'मध्य कक्षाओं के लिए',
    emoji: '📊',
    gradient: 'from-blue-500 to-indigo-600',
    download: () => downloadTxt('NKG_Pahade_11-20.txt', buildText('tables', [11,12,13,14,15,16,17,18,19,20])),
  },
  {
    id: 'squares',
    title: 'वर्ग (1 – 30)',
    subtitle: 'Perfect Squares याद करो',
    emoji: '⭐',
    gradient: 'from-pink-500 to-rose-600',
    download: () => downloadTxt('NKG_Varg_1-30.txt', buildText('squares')),
  },
  {
    id: 'cubes',
    title: 'घन (1 – 20)',
    subtitle: 'Perfect Cubes याद करो',
    emoji: '🟣',
    gradient: 'from-purple-500 to-violet-700',
    download: () => downloadTxt('NKG_Ghan_1-20.txt', buildText('cubes')),
  },
  {
    id: 'formulas-all',
    title: 'सभी गणित सूत्र',
    subtitle: 'कक्षा 4 – 9 के लिए',
    emoji: '📐',
    gradient: 'from-teal-500 to-green-600',
    download: () => downloadTxt('NKG_Suttra_All.txt', buildText('formulas', formulas.map(c => c.category))),
  },
  {
    id: 'formulas-algebra',
    title: 'बीजगणित सूत्र',
    subtitle: 'Algebra identities',
    emoji: '🔤',
    gradient: 'from-cyan-500 to-blue-600',
    download: () => downloadTxt('NKG_Algebra.txt', buildText('formulas', ['📐 बीजगणित (Algebra)'])),
  },
  {
    id: 'formulas-geo',
    title: 'ज्यामिति सूत्र',
    subtitle: 'क्षेत्रफल, परिमाप, आयतन',
    emoji: '🔷',
    gradient: 'from-green-500 to-teal-600',
    download: () => downloadTxt('NKG_Geometry.txt', buildText('formulas', ['🟥 ज्यामिति — क्षेत्रफल', '📏 ज्यामिति — परिमाप', '📦 आयतन (Volume)', '🏠 पृष्ठीय क्षेत्रफल'])),
  },
  {
    id: 'practice-basic',
    title: 'अभ्यास प्रश्न — प्राथमिक',
    subtitle: 'कक्षा 1-4 के लिए',
    emoji: '✏️',
    gradient: 'from-yellow-400 to-orange-500',
    download: () => downloadTxt('NKG_Abhyas_Prathamik.txt', buildText('practice', [
      { question: '25 + 37 = ?' },
      { question: '72 – 48 = ?' },
      { question: '8 × 9 = ?' },
      { question: '56 ÷ 7 = ?' },
      { question: '1 मीटर = ___ सेंटीमीटर' },
      { question: 'वर्ग की कितनी भुजाएं होती हैं?' },
      { question: '100 का 25% = ?' },
      { question: '½ + ¼ = ?' },
      { question: 'आयत का क्षेत्रफल (l=6, b=4) = ?' },
      { question: '48 ÷ 6 = ?' },
    ])),
  },
  {
    id: 'practice-advanced',
    title: 'अभ्यास प्रश्न — उच्च',
    subtitle: 'कक्षा 6-9 के लिए',
    emoji: '🧠',
    gradient: 'from-red-500 to-rose-600',
    download: () => downloadTxt('NKG_Abhyas_Uchch.txt', buildText('practice', [
      { question: '2x + 5 = 15, x = ?' },
      { question: '(a+b)² का विस्तार करो' },
      { question: 'वृत्त का क्षेत्रफल (r=7) = ?' },
      { question: 'LCM(12, 18) = ?' },
      { question: 'HCF(24, 36) = ?' },
      { question: 'a³ + b³ का गुणनखंड लिखो' },
      { question: 'घन का आयतन (a=5) = ?' },
      { question: 'पाइथागोरस प्रमेय लिखो' },
      { question: 'बेलन का आयतन (r=3, h=7) = ?' },
      { question: 'हीरोन सूत्र लिखो' },
    ])),
  },
];

// ──────────────────────────────────────────────
// Custom tables selector
// ──────────────────────────────────────────────

function CustomTableSelector() {
  const [selected, setSelected] = useState([2, 3, 4, 5]);

  const toggle = (n) =>
    setSelected(prev =>
      prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n].sort((a, b) => a - b)
    );

  return (
    <div className="bg-card border rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <CheckSquare size={20} className="text-primary" />
        <h3 className="font-heading text-lg">अपनी पसंद के पहाड़े चुनो</h3>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-4">
        {Array.from({ length: 30 }, (_, i) => i + 2).map(n => (
          <button
            key={n}
            onClick={() => toggle(n)}
            className={`rounded-xl py-1.5 font-bold font-body text-sm transition-all min-h-0 min-w-0 border ${
              selected.includes(n)
                ? 'bg-primary text-white border-primary scale-105'
                : 'bg-muted text-foreground border-transparent hover:border-primary'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <button
        disabled={selected.length === 0}
        onClick={() => downloadTxt(`NKG_Pahade_Custom.txt`, buildText('tables', selected))}
        className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white px-5 py-2.5 rounded-2xl font-body font-bold hover:scale-105 transition-transform shadow-md disabled:opacity-50 disabled:scale-100"
      >
        <Download size={18} />
        {selected.length === 0 ? 'कोई पहाड़ा चुनें' : `${selected.length} पहाड़े डाउनलोड करो`}
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────
// Main page
// ──────────────────────────────────────────────

export default function Worksheets() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl md:text-4xl mb-2"
        >
          📄 प्रिंटेबल वर्कशीट
        </motion.h1>
        <p className="text-muted-foreground font-body">
          डाउनलोड करो और ऑफलाइन अभ्यास करो!
        </p>
      </div>

      {/* Custom table selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <CustomTableSelector />
      </motion.div>

      {/* Preset worksheets grid */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-heading text-xl mb-4 flex items-center gap-2"
      >
        <FileText size={20} className="text-primary" />
        तैयार वर्कशीट
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {PRESET_WORKSHEETS.map((ws, i) => (
          <motion.button
            key={ws.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            onClick={ws.download}
            className={`bg-gradient-to-br ${ws.gradient} text-white rounded-2xl p-5 text-left hover:scale-105 transition-transform shadow-md min-h-0 min-w-0 w-full`}
          >
            <div className="text-4xl mb-2">{ws.emoji}</div>
            <div className="font-heading text-lg leading-tight">{ws.title}</div>
            <div className="font-body text-sm opacity-85 mt-1">{ws.subtitle}</div>
            <div className="flex items-center gap-1.5 mt-3 text-xs font-bold opacity-90">
              <Download size={14} /> TXT डाउनलोड
            </div>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-xs text-muted-foreground font-body mt-8"
      >
        💡 फ़ाइल डाउनलोड होगी — नोटपैड में खोलकर प्रिंट करें
      </motion.p>
    </div>
  );
}
