import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, ChevronRight, ArrowRight, Play } from 'lucide-react';
import FloatingEmojis from '../components/shared/FloatingEmojis';
import NKGLogo from '../components/shared/NKGLogo';

const features = [
  { to: '/classes', emoji: '📚', title: 'कक्षा 1 - 9', subtitle: 'सभी कक्षाओं का गणित', gradient: 'from-purple-500 to-purple-700', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80' },
  { to: '/tables', emoji: '🔢', title: 'पहाड़े', subtitle: '1 से 100 तक के पहाड़े', gradient: 'from-orange-400 to-orange-600', img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80' },
  { to: '/squares-cubes', emoji: '⭐', title: 'वर्ग और घन', subtitle: 'वर्ग (1-100) और घन (1-50)', gradient: 'from-pink-500 to-rose-600', img: 'https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400&q=80' },
  { to: '/formulas', emoji: '📐', title: 'सूत्र', subtitle: 'गणित के सभी महत्वपूर्ण सूत्र', gradient: 'from-teal-500 to-green-600', img: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&q=80' },
  { to: '/definitions', emoji: '📖', title: 'परिभाषाएं', subtitle: 'रेखा, कोण, मापन और बहुत कुछ', gradient: 'from-blue-500 to-indigo-600', img: 'https://images.unsplash.com/photo-1564932975-65a2be2c6fc3?w=400&q=80' },
  { to: '/games', emoji: '🎮', title: 'मज़ेदार खेल', subtitle: '20+ खेल-खेल में गणित सीखो', gradient: 'from-yellow-400 to-amber-600', img: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=400&q=80' },
  { to: '/quiz', emoji: '🧠', title: 'क्विज़', subtitle: '50+ सवाल — अपना ज्ञान परखो', gradient: 'from-red-400 to-rose-600', img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&q=80' },
  { to: '/general-math', emoji: '💡', title: 'सामान्य ज्ञान', subtitle: 'गणित का सामान्य ज्ञान', gradient: 'from-cyan-500 to-blue-600', img: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&q=80' },
  { to: '/daily-challenge', emoji: '🎯', title: 'डेली चैलेंज', subtitle: 'हर दिन 3 नए सवाल, पॉइंट्स जीतो!', gradient: 'from-green-500 to-teal-600', img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80' },
  { to: '/workbook', emoji: '📒', title: 'वर्कबुक', subtitle: 'सवाल हल करो + डिजिटल व्हाइटबोर्ड', gradient: 'from-violet-500 to-purple-700', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80' },
  { to: '/worksheets', emoji: '📄', title: 'वर्कशीट', subtitle: 'PDF डाउनलोड, ऑफलाइन अभ्यास', gradient: 'from-lime-500 to-emerald-600', img: 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=400&q=80' },
  { to: '/mathematicians', emoji: '🧑‍🔬', title: 'महान गणितज्ञ', subtitle: 'रामानुजन से मिर्ज़ाखानी — 20+ गणितज्ञ', gradient: 'from-orange-500 to-red-600', img: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=400&q=80' },
  { to: '/vedic-math', emoji: '🕉️', title: 'वैदिक गणित', subtitle: '16 सूत्र — तेज़ और आसान गणना', gradient: 'from-amber-500 to-yellow-600', img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80' },
  { to: '/math-tricks', emoji: '🎩', title: 'गणित ट्रिक्स', subtitle: 'जादुई ट्रिक्स, पैटर्न, रोचक तथ्य', gradient: 'from-cyan-500 to-blue-600', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80' },
  { to: '/math-models', emoji: '🏗️', title: 'गणित मॉडल', subtitle: 'विधि, सामग्री, कैसा दिखेगा + सावधानियाँ', gradient: 'from-fuchsia-500 to-pink-600', img: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&q=80' },
  { to: '/patravachan', emoji: '🎤', title: 'पत्रवाचन/भाषण', subtitle: '20 विषय — PPT + पूरी स्क्रिप्ट', gradient: 'from-rose-500 to-red-600', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80' },
];

const stats = [
  { num: '9', label: 'कक्षाएं', emoji: '📚', color: 'from-purple-500 to-purple-600' },
  { num: '100', label: 'पहाड़े', emoji: '🔢', color: 'from-orange-500 to-orange-600' },
  { num: '80+', label: 'सूत्र', emoji: '📐', color: 'from-teal-500 to-teal-600' },
  { num: '20+', label: 'खेल', emoji: '🎮', color: 'from-yellow-500 to-amber-500' },
  { num: '20+', label: 'गणितज्ञ', emoji: '🧑‍🔬', color: 'from-red-500 to-rose-500' },
  { num: '16', label: 'वैदिक सूत्र', emoji: '🕉️', color: 'from-amber-500 to-yellow-500' },
  { num: '50+', label: 'क्विज़/कक्षा', emoji: '🧠', color: 'from-blue-500 to-blue-600' },
  { num: '100+', label: 'डेली चैलेंज', emoji: '🎯', color: 'from-green-500 to-emerald-500' },
];

const mathFacts = [
  '🔢 शून्य (0) भारत की देन है!',
  '🌀 π = 3.14159265... कभी खत्म नहीं होता',
  '✨ 1729 = रामानुजन की Taxi संख्या',
  '🌻 सूरजमुखी में Fibonacci spiral होती है',
  '💎 Mona Lisa में Golden Ratio है',
  '🔑 RSA Encryption अभाज्य संख्याओं पर है',
  '🎵 संगीत के सुर गणितीय अनुपात में हैं',
  '♾️ अनंत के भी अलग-अलग आकार होते हैं',
];

const heroImages = [
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
  'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80',
];

function AnimatedCounter({ target, duration = 2 }) {
  const [count, setCount] = useState(0);
  const numTarget = parseInt(target.replace(/\D/g, ''));
  const suffix = target.replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const step = numTarget / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= numTarget) { setCount(numTarget); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [numTarget]);

  return <span>{count}{suffix}</span>;
}

function FeatureCard({ feature, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link to={feature.to} className="block group">
        <div className={`relative bg-gradient-to-br ${feature.gradient} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[4/3] sm:aspect-auto sm:h-36`}>
          {/* Background image overlay */}
          <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity">
            <img src={feature.img} alt="" className="w-full h-full object-cover" />
          </div>

          {/* Animated shine line */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={hovered ? { x: '200%' } : { x: '-100%' }}
            transition={{ duration: 0.6 }}
          />

          <div className="relative p-4 md:p-5 text-white h-full flex flex-col justify-between">
            <div>
              <motion.div
                className="text-3xl md:text-4xl mb-1.5 w-fit"
                animate={hovered ? { scale: 1.15, rotate: [0, -10, 10, 0] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {feature.emoji}
              </motion.div>
              <h3 className="font-extrabold text-base md:text-lg leading-tight mb-0.5 tracking-wide">{feature.title}</h3>
              <p className="text-[11px] md:text-xs opacity-85 font-medium leading-tight line-clamp-1">{feature.subtitle}</p>
            </div>
            <motion.div
              className="flex items-center gap-1 text-[10px] md:text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: -5 }}
              animate={hovered ? { x: 0 } : { x: -5 }}
            >
              शुरू करें <ChevronRight size={12} />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const [currentFact, setCurrentFact] = useState(0);
  const [heroImg, setHeroImg] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCurrentFact(f => (f + 1) % mathFacts.length), 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroImg(i => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <FloatingEmojis />

      {/* ── HERO SECTION ───────────────────────────────────── */}
      <div className="relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-800 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-950 transition-colors duration-300">
          <AnimatePresence mode="crossfade">
            <motion.img
              key={heroImg}
              src={heroImages[heroImg]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-10"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 0.1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            />
          </AnimatePresence>
          {/* Circular decorations */}
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} className="absolute rounded-full bg-white/5 dark:bg-indigo-500/5 border border-white/5"
              style={{ width: 100 + i * 70, height: 100 + i * 70, left: `${12 + i * 14}%`, top: `${15 + (i % 2) * 20}%` }}
              animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }} />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-12 md:py-18 text-white text-center">
          {/* App Logo */}
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8 }} className="flex justify-center mb-5">
            <NKGLogo size="xl" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-3 drop-shadow-md">
            NKG MATH UNIVERSE
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-base md:text-xl font-semibold opacity-90 max-w-xl mx-auto mb-6">
            कक्षा 1 से 9 तक — गणित की पूरी दुनिया एक जगह! 🎉
          </motion.p>

          {/* Fact ticker */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3.5 max-w-md mx-auto mb-6 shadow-inner">
            <AnimatePresence mode="wait">
              <motion.p key={currentFact} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="font-bold text-sm md:text-base text-center text-amber-100 tracking-wide">
                {mathFacts[currentFact]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Quick Concept Tags */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mb-6 max-w-3xl mx-auto">
            {['➕ जोड़', '➖ घटाव', '✖️ गुणा', '➗ भाग', '📐 ज्यामिति', '📏 मापन', '🔢 पहाड़े', '📊 सूत्र'].map((tag, i) => (
              <motion.span key={i} className="bg-white/15 dark:bg-slate-800/60 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs md:text-sm font-bold border border-white/5 shadow-sm"
                animate={{ y: [0, -4, 0] }} transition={{ duration: 2 + i * 0.15, repeat: Infinity, delay: i * 0.25 }}>
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Group */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Link to="/classes" className="w-full sm:w-auto">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto bg-white text-indigo-700 font-extrabold text-base px-7 py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2">
                <BookOpen size={18} /> सीखना शुरू करें
              </motion.button>
            </Link>
            <Link to="/games" className="w-full sm:w-auto">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white font-extrabold text-base px-7 py-3.5 rounded-2xl border border-white/20 flex items-center justify-center gap-2 shadow-md">
                <Play size={18} /> खेल खेलें 🎮
              </motion.button>
            </Link>
          </motion.div>

          {/* Animated Mascot Row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-3xl flex justify-center gap-4 mt-8">
            {['🦁', '🐯', '🐻', '🐼', '🦊'].map((e, i) => (
              <motion.span key={i} className="drop-shadow" animate={{ y: [0, -7, 0] }} transition={{ duration: 1.4 + i * 0.2, repeat: Infinity, delay: i * 0.3 }}>{e}</motion.span>
            ))}
          </motion.div>
        </div>

        {/* Dynamic Curved Wave Section divider */}
        <div className="h-10 bg-slate-50 dark:bg-slate-950 transition-colors" style={{ borderRadius: '100% 100% 0 0', marginTop: '-1px' }} />
      </div>

      {/* ── QUICK METRICS GRID ──────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={statsVisible ? { opacity: 1, y: 0 } : {}} className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.7 }} animate={statsVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.04, type: 'spring' }} whileHover={{ scale: 1.06, y: -4 }}
              className={`bg-gradient-to-br ${s.color} text-white rounded-2xl p-2.5 md:p-3 text-center shadow-md`}>
              <div className="text-lg md:text-xl mb-0.5">{s.emoji}</div>
              <div className="text-lg md:text-xl font-black tracking-tight">
                {statsVisible ? <AnimatedCounter target={s.num} /> : '0'}
              </div>
              <div className="text-[10px] md:text-xs font-bold opacity-90 leading-tight line-clamp-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── HIGHLIGHTED FEATURES / PROMO ────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Highlight 1 */}
          <Link to="/daily-challenge">
            <motion.div whileHover={{ scale: 1.02, y: -4 }} className="bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white rounded-3xl p-5 shadow-lg cursor-pointer h-full flex flex-col justify-between border border-emerald-400/20">
              <div className="flex items-center gap-3 mb-3">
                <motion.div className="text-3xl" animate={{ rotate: [0, 12, -12, 0] }} transition={{ duration: 2, repeat: Infinity }}>🎯</motion.div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider opacity-75 font-bold">आज का विशेष</p>
                  <h3 className="text-xl font-black tracking-wide">डेली चैलेंज</h3>
                </div>
              </div>
              <p className="text-sm opacity-90 mb-4 font-medium">हर दिन 3 नए सवाल — दैनिक स्ट्रीक बनाओ और ढेर सारे पॉइंट्स जीतो! 🔥</p>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                अभी खेलें <ArrowRight size={14} />
              </div>
            </motion.div>
          </Link>

          {/* Highlight 2 */}
          <Link to="/vedic-math">
            <motion.div whileHover={{ scale: 1.02, y: -4 }} className="bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700 text-white rounded-3xl p-5 shadow-lg cursor-pointer h-full flex flex-col justify-between border border-amber-400/20">
              <div className="flex items-center gap-3 mb-3">
                <motion.div className="text-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>🕉️</motion.div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider opacity-75 font-bold">प्राचीन विधा</p>
                  <h3 className="text-xl font-black tracking-wide">वैदिक गणित</h3>
                </div>
              </div>
              <p className="text-sm opacity-90 mb-4 font-medium">16 महासूत्र! मुश्किल गणनाएं जैसे 98×97 = 9506 करें सिर्फ 5 सेकंड में। 🧮</p>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                जादुई सूत्र सीखें <ArrowRight size={14} />
              </div>
            </motion.div>
          </Link>

          {/* Highlight 3 */}
          <Link to="/patravachan">
            <motion.div whileHover={{ scale: 1.02, y: -4 }} className="bg-gradient-to-br from-rose-500 to-pink-600 dark:from-rose-600 dark:to-pink-700 text-white rounded-3xl p-5 shadow-lg cursor-pointer h-full flex flex-col justify-between border border-rose-400/20">
              <div className="flex items-center gap-3 mb-3">
                <motion.div className="text-3xl" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>🎤</motion.div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider opacity-75 font-bold">प्रतियोगिता विशेष</p>
                  <h3 className="text-xl font-black tracking-wide">पत्रवाचन / भाषण</h3>
                </div>
              </div>
              <p className="text-sm opacity-90 mb-4 font-medium">20+ चुनिंदा विषय — स्कूल स्टेज के लिए तैयार शानदार PPT, स्क्रिप्ट और खास टिप्स! 🎭</p>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                तैयारी शुरू करें <ArrowRight size={14} />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* ── CORE MODULES GRID ────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex items-center gap-2 justify-center mb-6">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
            <Sparkles className="text-indigo-500" size={22} />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-black text-center text-slate-800 dark:text-white tracking-tight">क्या सीखना है आज?</h2>
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
            <Sparkles className="text-pink-500" size={22} />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {features.map((f, i) => <FeatureCard key={f.to} feature={f} index={i} />)}
        </div>
      </div>

      {/* ── BOTTOM MOTIVATIONAL HERO CARD ─────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-100 via-pink-50 to-orange-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 rounded-3xl p-6 md:p-8 border border-purple-200/40 dark:border-slate-800 text-center shadow-sm">
          <motion.div className="text-4xl mb-2.5" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>🌟</motion.div>
          <h3 className="text-xl md:text-2xl font-black text-purple-800 dark:text-indigo-400 mb-2 tracking-wide">गणित सबके लिए है!</h3>
          <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 mb-5 max-w-xl mx-auto leading-relaxed">
            रामानुजन, आर्यभट्ट, शकुंतला देवी — सबने एकदम बुनियादी शुरुआत की थी। आप भी अद्भुत कर सकते हैं, बस अभ्यास जारी रखें!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/mathematicians">
              <motion.button whileHover={{ scale: 1.05 }} className="bg-purple-600 dark:bg-purple-700 text-white font-extrabold text-xs md:text-sm px-5 py-3 rounded-xl shadow shadow-purple-500/20">
                🧑‍🔬 महान गणितज्ञों की जीवनी
              </motion.button>
            </Link>
            <Link to="/math-tricks">
              <motion.button whileHover={{ scale: 1.05 }} className="bg-orange-500 dark:bg-orange-600 text-white font-extrabold text-xs md:text-sm px-5 py-3 rounded-xl shadow shadow-orange-500/20">
                🎩 जादुई ट्रिक्स सीखें
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
