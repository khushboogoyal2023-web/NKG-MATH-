import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Calendar, CheckCircle, XCircle } from 'lucide-react';

// Pool of 100 daily challenge questions — rotates every day
const challengePool = [
  { q: '15 × 15 = ?', options: ['215', '225', '235', '245'], ans: 1, hint: '15² = 225' },
  { q: '√144 = ?', options: ['11', '12', '13', '14'], ans: 1, hint: '12 × 12 = 144' },
  { q: '2³ = ?', options: ['6', '8', '10', '12'], ans: 1, hint: '2 × 2 × 2 = 8' },
  { q: 'एक त्रिभुज के तीनों कोणों का योग = ?', options: ['90°', '180°', '270°', '360°'], ans: 1, hint: 'सभी त्रिभुजों में कोणों का योग 180° होता है' },
  { q: '(a+b)² = ?', options: ['a²+b²', 'a²+2ab+b²', 'a²-2ab+b²', '2a+2b'], ans: 1, hint: 'यह बीजगणित का महत्वपूर्ण सूत्र है' },
  { q: '999 + 1 = ?', options: ['1000', '1001', '999', '998'], ans: 0, hint: '9+1=10, आगे हासिल जोड़ें' },
  { q: '7 × 8 = ?', options: ['54', '56', '58', '64'], ans: 1, hint: '7 का 8वाँ पहाड़ा' },
  { q: 'वृत्त की परिधि = ?', options: ['πr²', '2πr', 'πr', '4πr'], ans: 1, hint: 'C = 2πr' },
  { q: '100 का 25% = ?', options: ['20', '25', '30', '35'], ans: 1, hint: '100 × 25/100' },
  { q: '3² + 4² = ?', options: ['25', '49', '7', '12'], ans: 0, hint: 'पाइथागोरस: 9 + 16' },
  { q: 'LCM(4, 6) = ?', options: ['12', '24', '6', '18'], ans: 0, hint: 'लघुत्तम समापवर्त्य' },
  { q: '(-3) × (-4) = ?', options: ['-12', '12', '-7', '7'], ans: 1, hint: 'ऋण × ऋण = धन' },
  { q: 'आयत का क्षेत्रफल = ?', options: ['l+b', '2(l+b)', 'l×b', 'l²'], ans: 2, hint: 'A = l × b' },
  { q: '5! = ?', options: ['25', '60', '120', '100'], ans: 2, hint: '5×4×3×2×1' },
  { q: '0.5 × 0.5 = ?', options: ['1', '0.25', '0.5', '0.025'], ans: 1, hint: '½ × ½ = ¼' },
  { q: '√225 = ?', options: ['13', '14', '15', '16'], ans: 2, hint: '15 × 15 = 225' },
  { q: '45² = ?', options: ['1825', '2025', '2125', '2225'], ans: 1, hint: 'एकाधिकेन विधि: 4×5=20 और 25 → 2025' },
  { q: '12 × 13 = ?', options: ['144', '152', '156', '168'], ans: 2, hint: '12×13 = 12×10 + 12×3' },
  { q: 'HCF(36, 48) = ?', options: ['6', '9', '12', '18'], ans: 2, hint: 'महत्तम समापवर्तक' },
  { q: 'वर्ग का क्षेत्रफल (भुजा=9) = ?', options: ['36', '54', '72', '81'], ans: 3, hint: 'A = भुजा²' },
  { q: 'π का मान (लगभग) = ?', options: ['3.14159', '3.14169', '3.15149', '3.14259'], ans: 0, hint: 'π = 22/7 ≈ 3.14159' },
  { q: '35² = ?', options: ['1125', '1225', '1325', '1425'], ans: 1, hint: '3×4=12 और 25 → 1225' },
  { q: 'a² - b² = ?', options: ['(a-b)²', '(a+b)(a-b)', '(a-b)(a-b)', 'a²+b²'], ans: 1, hint: 'अंतर का गुणनफल' },
  { q: '1729 को __ घनों का योग कहते हैं?', options: ['एक तरह', 'दो तरह', 'तीन तरह', 'चार तरह'], ans: 1, hint: '1³+12³ = 9³+10³ = 1729' },
  { q: 'LCM(12, 18) = ?', options: ['6', '18', '36', '216'], ans: 2, hint: '12=2²×3, 18=2×3²' },
  { q: '(-2)⁴ = ?', options: ['-16', '-8', '8', '16'], ans: 3, hint: 'सम घात हमेशा धनात्मक होती है' },
  { q: 'घन का आयतन (भुजा=5) = ?', options: ['25', '75', '125', '150'], ans: 2, hint: 'V = a³' },
  { q: '98 × 102 = ?', options: ['9796', '9996', '10004', '9904'], ans: 1, hint: '(100-2)(100+2) = 10000-4' },
  { q: 'समबाहु त्रिभुज का क्षेत्रफल (भुजा a) = ?', options: ['√3/2 a²', '√3/4 a²', '√3 a²', 'a²'], ans: 1, hint: 'A = (√3/4)a²' },
  { q: 'बेलन का आयतन (r=7, h=10) = ?', options: ['490π', '1540', '220π', '140π'], ans: 1, hint: 'V=πr²h = (22/7)×49×10 = 1540' },
  { q: '25 × 25 = ?', options: ['525', '600', '625', '650'], ans: 2, hint: '2×3=6 और 25 → 625' },
  { q: 'HCF(24, 36, 48) = ?', options: ['4', '6', '8', '12'], ans: 3, hint: '24=2³×3, 36=2²×3², 48=2⁴×3' },
  { q: 'शंकु का आयतन = ?', options: ['πr²h', '⅓πr²h', '2πrh', '4πr³'], ans: 1, hint: 'शंकु का आयतन = ⅓ × बेलन का आयतन' },
  { q: '√2 = ?', options: ['1.214', '1.414', '1.441', '1.144'], ans: 1, hint: '√2 ≈ 1.41421...' },
  { q: '55² = ?', options: ['2925', '3025', '3125', '3225'], ans: 1, hint: '5×6=30 और 25 → 3025' },
  { q: 'गोले का पृष्ठीय क्षेत्रफल = ?', options: ['2πr²', '4πr²', 'πr²', '6πr²'], ans: 1, hint: 'SA = 4πr²' },
  { q: '(a+b)³ = ?', options: ['a³+3a²b+3ab²+b³', 'a³+b³', 'a³+2ab+b³', 'a³-b³'], ans: 0, hint: 'घन विस्तार' },
  { q: '999 × 999 = ?', options: ['998001', '999001', '997001', '998101'], ans: 0, hint: '(1000-1)² = 10⁶ - 2000 + 1' },
  { q: 'समलंब का क्षेत्रफल (a=5,b=9,h=4)?', options: ['28', '56', '18', '24'], ans: 0, hint: 'A = ½(a+b)×h = ½×14×4' },
  { q: '75 × 75 = ?', options: ['5525', '5625', '5725', '5825'], ans: 1, hint: '7×8=56 और 25 → 5625' },
  { q: 'a³ + b³ = ?', options: ['(a+b)(a²+ab+b²)', '(a+b)(a²-ab+b²)', '(a-b)(a²+ab+b²)', '(a+b)²(a-b)'], ans: 1, hint: 'घनों का योग' },
  { q: 'LCM(5,7,11) = ?', options: ['23', '77', '385', '770'], ans: 2, hint: 'सभी अभाज्य संख्याएं हैं, इसलिए केवल गुणनफल निकालें' },
  { q: '(-1)¹⁰⁰ = ?', options: ['-1', '0', '1', '100'], ans: 2, hint: 'सम घात हमेशा धनात्मक (+1) परिणाम देती है' },
  { q: 'हीरोन सूत्र: a=3,b=4,c=5, A=?', options: ['4', '6', '8', '12'], ans: 1, hint: 's=6, A=√(6×3×2×1) = 6' },
  { q: '65 × 65 = ?', options: ['4125', '4225', '4325', '4025'], ans: 1, hint: '6×7=42 और 25 → 4225' },
  { q: 'चतुर्भुज के कोणों का योग = ?', options: ['180°', '270°', '360°', '540°'], ans: 2, hint: '2 त्रिभुज बन सकते हैं → 2×180°' },
  { q: 'रामानुजन संख्या 1729 = 1³ + ?', options: ['9³', '10³', '12³', '15³'], ans: 2, hint: '1 + 1728 = 1729' },
  { q: '0.1² = ?', options: ['0.01', '0.1', '0.001', '1'], ans: 0, hint: '0.1 × 0.1 = 0.01' },
  { q: 'गोले का आयतन (r=3) = ?', options: ['12π', '36π', '108π', '4π'], ans: 1, hint: '⁴⁄₃πr³ = ⁴⁄₃π×27 = 36π' },
  { q: '85 × 85 = ?', options: ['7125', '7225', '7325', '7025'], ans: 1, hint: '8×9=72 और 25 → 7225' },
  { q: 'शेषफल प्रमेय: p(x)=(x²+2x+3), p(1)=?', options: ['4', '5', '6', '7'], ans: 2, hint: 'p(1) = 1 + 2 + 3 = 6' },
  { q: 'Fibonacci: 1,1,2,3,5,8,__?', options: ['10', '12', '13', '15'], ans: 2, hint: 'पिछली दो संख्याओं का योग: 5+8' },
  { q: 'Golden Ratio φ ≈ ?', options: ['1.414', '1.618', '1.732', '2.236'], ans: 1, hint: 'φ = (1+√5)/2' },
  { q: '95 × 95 = ?', options: ['9025', '9125', '9225', '8925'], ans: 0, hint: '9×10=90 और 25 → 9025' },
  { q: 'पाइथागोरस त्रिक (5,12,?)?', options: ['11', '12', '13', '14'], ans: 2, hint: '5² + 12² = 25 + 144 = 169 = 13²' },
  { q: 'a⁰ = ? (a≠0)', options: ['0', '1', 'a', '∞'], ans: 1, hint: 'किसी भी अशून्य संख्या की घात 0 हमेशा 1 होती है' },
  { q: 'LCM × HCF = ?', options: ['a+b', 'a-b', 'a×b', 'a÷b'], ans: 2, hint: 'दो दी गई संख्याओं का गुणनफल' },
  { q: '(2x+3)(2x-3) = ?', options: ['4x²+9', '4x²-9', '4x+9', '4x-6'], ans: 1, hint: '(a+b)(a-b) = a² - b²' },
  { q: '2¹⁰ = ?', options: ['512', '1024', '2048', '4096'], ans: 1, hint: '2 को खुद से 10 बार गुणा करें' },
  { q: 'समांतर श्रेणी का n वाँ पद = ?', options: ['a+nd', 'a+(n-1)d', 'a+2nd', 'nd+a'], ans: 1, hint: 'Tₙ = a + (n-1)d' },
  { q: '7² + 24² = ?', options: ['49+576', '625', '529', '576'], ans: 1, hint: '49 + 576 = 625 = 25²' },
  { q: 'HCF(100, 150) = ?', options: ['10', '25', '50', '100'], ans: 2, hint: '100 और 150 का सबसे बड़ा साझा विभाजक' },
  { q: '(1+2+3+...+10) = ?', options: ['45', '50', '55', '60'], ans: 2, hint: 'सूत्र n(n+1)/2 का प्रयोग करें: 10×11/2' },
  { q: '√3 ≈ ?', options: ['1.412', '1.632', '1.732', '1.832'], ans: 2, hint: '√3 ≈ 1.73205...' },
  { q: 'Fibonacci: 1,1,2,3,5,8,13,21,_?', options: ['28', '32', '34', '36'], ans: 2, hint: '13 + 21 का योग निकालें' },
  { q: '98 × 97 (वैदिक गणित) = ?', options: ['9406', '9506', '9606', '9006'], ans: 1, hint: 'आधार 100 से विचलन: (-2) और (-3) → 95|06' },
  { q: 'शून्य (0) की खोज किसने की?', options: ['यूक्लिड', 'पाइथागोरस', 'ब्रह्मगुप्त/आर्यभट्ट', 'न्यूटन'], ans: 2, hint: 'महान प्राचीन भारतीय गणितज्ञ' },
  { q: '4! = ?', options: ['8', '16', '24', '32'], ans: 2, hint: '4 × 3 × 2 × 1 = 24' },
  { q: 'BPT में यदि DE ∥ BC तो AD/DB = ?', options: ['DE/BC', 'AE/EC', 'AB/AC', 'AD/AB'], ans: 1, hint: 'आधारभूत आनुपातिकता प्रमेय (Thales Theorem)' },
  { q: '99 × 101 = ?', options: ['9799', '9899', '9999', '10001'], ans: 2, hint: '(100-1)(100+1) = 10000 - 1' },
  { q: 'HCF(18, 27) = ?', options: ['3', '6', '9', '18'], ans: 2, hint: '18 = 2×3², 27 = 3³' },
  { q: 'वर्गमूल: √0.0025 = ?', options: ['0.005', '0.05', '0.5', '5'], ans: 1, hint: '√(25/10000) = 5/100' },
  { q: '11 × 11 = ?', options: ['111', '121', '131', '141'], ans: 1, hint: '11² = 121' },
  { q: 'घनमूल: ∛64 = ?', options: ['3', '4', '5', '8'], ans: 1, hint: '4³ = 64' },
  { q: '(a-b)² + 4ab = ?', options: ['(a+b)²', '(a-b)²', 'a²+b²', '4ab'], ans: 0, hint: 'विस्तार करें: a²-2ab+b²+4ab = a²+2ab+b²' },
  { q: 'LCM(15, 20, 25) = ?', options: ['100', '150', '200', '300'], ans: 3, hint: '15=3×5, 20=2²×5, 25=5²' },
  { q: '√169 = ?', options: ['11', '12', '13', '14'], ans: 2, hint: '13² = 169' },
  { q: 'माध्यिका: 3,5,7,9,11 = ?', options: ['5', '6', '7', '8'], ans: 2, hint: 'पदों की संख्या n=5 (विषम), बिल्कुल बीच का पद चुनें' },
  { q: 'सबसे छोटी अभाज्य संख्या कौन सी है?', options: ['0', '1', '2', '3'], ans: 2, hint: '2 एकमात्र सम अभाज्य संख्या (Even Prime Number) है' },
  { q: '10³ = ?', options: ['30', '300', '1000', '100'], ans: 2, hint: '10 × 10 × 10' },
  { q: 'समांतर श्रेणी: a=2, d=3, n=5, Sₙ=?', options: ['35', '40', '45', '50'], ans: 1, hint: 'Sₙ = n/2[2a+(n-1)d] = 5/2[4+12]' },
  { q: '√256 = ?', options: ['14', '15', '16', '17'], ans: 2, hint: '16² = 256' },
  { q: 'RSA Encryption किस पर आधारित है?', options: ['वर्गमूल', 'अभाज्य संख्याएं', 'π', 'Fibonacci'], ans: 1, hint: 'बड़ी अभाज्य संख्याओं के गुणनफल को डिकोड करने की कठिनाई पर' },
  { q: '99² = ?', options: ['9701', '9801', '9901', '10001'], ans: 1, hint: '(100-1)² = 10000 - 200 + 1' },
  { q: 'संपूरक कोणों का योग = ?', options: ['90°', '180°', '270°', '360°'], ans: 1, hint: 'संपूरक कोण मिलकर एक सीधी रेखा बनाते हैं' },
  { q: '(-3)³ = ?', options: ['-27', '-9', '9', '27'], ans: 0, hint: 'ऋणात्मक संख्या की विषम घात हमेशा ऋणात्मक होती है' },
  { q: 'p(x)=x²-5x+6, p(2)=?', options: ['0', '2', '4', '8'], ans: 0, hint: 'मान रखने पर: 4 - 10 + 6' },
  { q: 'आर्यभट्ट ने π का मान क्या बताया था?', options: ['3.14', '3.1416', '22/7', '3.1'], ans: 1, hint: 'आर्यभट्टीयम ग्रंथ के अनुसार: 62832 / 20000' },
  { q: '8! / 6! = ?', options: ['2', '8', '56', '64'], ans: 2, hint: '8 × 7 = 56' },
  { q: 'Fibonacci श्रेणी में 13वाँ पद क्या होगा?', options: ['144', '233', '377', '610'], ans: 1, hint: 'श्रेणी: 1,1,2,3,5,8,13,21,34,55,89,144,233...' },
  { q: '√(a²b²) = ?', options: ['ab', 'a²b', 'ab²', 'a+b'], ans: 0, hint: 'वर्ग और वर्गमूल एक दूसरे को निरस्त करते हैं' },
  { q: '1 + 2 + 3 + ... + 100 = ?', options: ['4950', '5000', '5050', '5100'], ans: 2, hint: 'गॉस विधि: 100 × 101 / 2 = 5050' },
  { q: 'घनमूल: ∛(-125) = ?', options: ['-25', '-5', '5', '25'], ans: 1, hint: '(-5)³ = -125' },
  { q: 'किन्हीं दो परिमेय संख्याओं के बीच कितनी संख्याएं होती हैं?', options: ['एक परिमेय', 'कोई नहीं', 'अनंत परिमेय', 'केवल अपरिमेय'], ans: 2, hint: 'संख्याओं का घनत्व गुण (Density Property)' },
  { q: "e^(iπ) + 1 = ? (Euler's Identity)", options: ['-1', '0', '1', 'π'], ans: 1, hint: 'चूंकि e^(iπ) = -1 होता है, इसलिए उसमें 1 जोड़ने पर शून्य मिलेगा' },
  { q: 'किन्हीं भी संख्याओं का HCF और LCM में क्या संबंध है?', options: ['HCF > LCM', 'HCF = LCM', 'HCF ≤ LCM', 'हमेशा अलग'], ans: 2, hint: 'HCF हमेशा LCM को पूरी तरह विभाजित करता है' },
  { q: '√5 ≈ ?', options: ['2.135', '2.236', '2.314', '2.415'], ans: 1, hint: '√5 ≈ 2.2360679...' },
  { q: 'n! / (n-1)! = ?', options: ['1', 'n-1', 'n', 'n²'], ans: 2, hint: 'n! को n × (n-1)! लिखा जा सकता है' },
  { q: 'पाइथागोरस त्रिक (8,15,?) = ?', options: ['16', '17', '18', '19'], ans: 1, hint: '8² + 15² = 64 + 225 = 289 = 17²' },
  { q: 'माध्य: 2,4,6,8,10 = ?', options: ['5', '6', '7', '8'], ans: 1, hint: 'कुल योग / पदों की संख्या = 30 / 5' },
  { q: '99 × 99 = ?', options: ['9601', '9701', '9801', '9901'], ans: 2, hint: '(100-1)² = 10000 - 200 + 1' },
];

function getTodayIndices() {
  const start = new Date('2026-01-01');
  const today = new Date();
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const base = (diff * 3) % challengePool.length;
  return [
    base % challengePool.length,
    (base + 1) % challengePool.length,
    (base + 2) % challengePool.length,
  ];
}

function getTodayKey() {
  const d = new Date();
  return `dc_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
}

const BADGES = [
  { min: 1,  emoji: '🌟', label: 'शुरुआत', color: 'from-yellow-400 to-amber-500' },
  { min: 3,  emoji: '🔥', label: 'तेज़ दिमाग', color: 'from-orange-400 to-red-500' },
  { min: 7,  emoji: '🏆', label: 'चैंपियन', color: 'from-purple-500 to-indigo-600' },
  { min: 14, emoji: '💎', label: 'गणित गुरु', color: 'from-teal-500 to-cyan-600' },
  { min: 30, emoji: '👑', label: 'महारथी', color: 'from-pink-500 to-rose-600' },
];

function getCurrentBadge(streak) {
  let badge = null;
  for (const b of BADGES) {
    if (streak >= b.min) badge = b;
  }
  return badge;
}

export default function DailyChallenge() {
  const todayKey = getTodayKey();
  const todayIndices = getTodayIndices();
  const questions = todayIndices.map(i => challengePool[i]);

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [points, setPoints] = useState(() => parseInt(localStorage.getItem('dc_points') || '0'));
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('dc_streak') || '0'));
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const savedToday = localStorage.getItem(todayKey);
    if (savedToday) {
      try {
        const saved = JSON.parse(savedToday);
        setAnswers(saved);
        setCompleted(true);
        setCurrentQ(questions.length - 1);
      } catch {}
    }
  }, []);

  const handleAnswer = (idx) => {
    if (answers[currentQ] !== undefined) return;
    const newAnswers = { ...answers, [currentQ]: idx };
    setAnswers(newAnswers);

    const isCorrect = idx === questions[currentQ].ans;
    if (isCorrect) {
      const newPoints = points + 10;
      setPoints(newPoints);
      localStorage.setItem('dc_points', String(newPoints));
    }

    // Move to next or complete
    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(q => q + 1);
      } else {
        // All done
        const correctCount = Object.entries(newAnswers).filter(([qi, ai]) => ai === questions[Number(qi)].ans).length;
        if (correctCount === questions.length) {
          const newStreak = streak + 1;
          setStreak(newStreak);
          localStorage.setItem('dc_streak', String(newStreak));
        } else {
          localStorage.setItem('dc_streak', '0');
          setStreak(0);
        }
        localStorage.setItem(todayKey, JSON.stringify(newAnswers));
        setCompleted(true);
      }
    }, 1200);
  };

  const badge = getCurrentBadge(streak);
  const today = new Date();
  const dateStr = today.toLocaleDateString('hi-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const correctCount = Object.entries(answers).filter(([qi, ai]) => Number(ai) === questions[Number(qi)].ans).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-1">🎯 डेली चैलेंज</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-2 text-sm">
          <Calendar size={16} /> {dateStr}
        </p>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1.5">आज के 3 सवाल — हर दिन नए!</p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-amber-50/60 border border-amber-200/60 dark:bg-amber-950/10 dark:border-amber-900/30 rounded-2xl p-3 text-center shadow-sm">
          <div className="text-2xl mb-0.5">⭐</div>
          <div className="text-xl font-black text-amber-600 dark:text-amber-400">{points}</div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wide">पॉइंट्स</div>
        </div>
        <div className="bg-orange-50/60 border border-orange-200/60 dark:bg-orange-950/10 dark:border-orange-900/30 rounded-2xl p-3 text-center shadow-sm">
          <div className="text-2xl mb-0.5">🔥</div>
          <div className="text-xl font-black text-orange-500 dark:text-orange-400">{streak}</div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wide">स्ट्रीक (दिन)</div>
        </div>
        <div className="bg-purple-50/60 border border-purple-200/60 dark:bg-purple-950/10 dark:border-purple-900/30 rounded-2xl p-3 text-center shadow-sm">
          <div className="text-2xl mb-0.5">{badge ? badge.emoji : '🌱'}</div>
          <div className="text-sm font-black text-purple-600 dark:text-purple-400 truncate">{badge ? badge.label : 'नया'}</div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wide">बैज</div>
        </div>
      </motion.div>

      {/* Progress dots */}
      <div className="flex justify-center gap-3 mb-6">
        {questions.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${
            i < currentQ || completed ? (answers[i] === questions[i].ans ? 'bg-emerald-500' : 'bg-red-500')
            : i === currentQ ? 'bg-indigo-600 scale-125 ring-4 ring-indigo-100 dark:ring-indigo-950' : 'bg-slate-200 dark:bg-slate-800'
          }`} />
        ))}
      </div>

      {/* All done view */}
      {completed ? (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-3xl p-8 mb-6 shadow-xl shadow-indigo-100 dark:shadow-none">
          <div className="text-6xl mb-4">{correctCount === 3 ? '🏆' : correctCount >= 2 ? '⭐' : '💪'}</div>
          <h2 className="text-2xl font-extrabold mb-1">आज का चैलेंज पूरा हुआ!</h2>
          <p className="text-4xl font-black mb-3">{correctCount}/3 सही</p>
          <p className="text-sm font-medium opacity-95">{correctCount === 3 ? 'शानदार! आपने सारे उत्तर सही दिए! 🎉' : correctCount === 2 ? 'बहुत अच्छा प्रयास! कल फिर से कोशिश करें!' : 'और अभ्यास करें — कल नए सवाल आपका इंतज़ार कर रहे हैं!'}</p>
          <p className="text-xs opacity-75 mt-4 bg-white/10 inline-block px-4 py-1.5 rounded-full font-semibold">🔄 कल 3 नए सवाल आएंगे!</p>
        </motion.div>
      ) : (
        <>
          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              transition={{ delay: 0.1 }}>
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 md:p-8 text-white text-center mb-6 shadow-lg shadow-indigo-100 dark:shadow-none">
                <p className="text-xs font-bold opacity-75 mb-1.5 uppercase tracking-wider">सवाल {currentQ + 1} / {questions.length}</p>
                <h2 className="text-2xl md:text-3xl font-extrabold leading-snug">{questions[currentQ].q}</h2>
              </div>

              {/* Options Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {questions[currentQ].options.map((opt, i) => {
                  const ans = answers[currentQ];
                  let cls = 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-500 hover:bg-indigo-50/20 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-indigo-500';
                  if (ans !== undefined) {
                    if (i === questions[currentQ].ans) cls = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-700 font-bold dark:bg-emerald-950/20 dark:text-emerald-400';
                    else if (i === ans) cls = 'bg-red-50 border-2 border-red-400 text-red-600 font-bold dark:bg-red-950/20 dark:text-red-400';
                    else cls = 'bg-white border border-slate-100 opacity-40 text-slate-400 dark:bg-slate-900 dark:border-slate-800';
                  }
                  return (
                    <motion.button 
                      key={i} 
                      whileHover={ans === undefined ? { scale: 1.02, y: -1 } : {}} 
                      whileTap={ans === undefined ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswer(i)}
                      className={`rounded-2xl p-4 text-base md:text-lg text-left transition-all font-bold flex items-center shadow-sm ${cls}`}
                      disabled={ans !== undefined}
                    >
                      <span className="mr-2.5 text-slate-400 font-semibold text-xs bg-slate-50 dark:bg-slate-950 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800">
                        {['A', 'B', 'C', 'D'][i]}
                      </span>
                      <span className="truncate">{opt}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback Animation Area */}
              <AnimatePresence>
                {answers[currentQ] !== undefined && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl p-5 text-center border shadow-sm ${answers[currentQ] === questions[currentQ].ans ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800 dark:bg-emerald-950/10 dark:border-emerald-900/30 dark:text-emerald-400' : 'bg-red-50/70 border-red-200 text-red-800 dark:bg-red-950/10 dark:border-red-900/30 dark:text-red-400'}`}
                  >
                    {answers[currentQ] === questions[currentQ].ans ? (
                      <p className="text-lg font-black flex items-center justify-center gap-2">🎉 शाबाश! सही जवाब (+10 पॉइंट्स)</p>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-lg font-black flex items-center justify-center gap-2">❌ गलत जवाब</p>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">💡 हिंट: {questions[currentQ].hint}</p>
                        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                          सही उत्तर: <strong className="underline underline-offset-4">{questions[currentQ].options[questions[currentQ].ans]}</strong>
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </>
      )}

      {/* Badges Collection Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-10 border-t border-slate-100 dark:border-slate-800 pt-8">
        <h3 className="text-xl font-extrabold text-slate-800 dark:text-white text-center mb-5">🏅 बैज संग्रह / Badge Milestones</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BADGES.map((b) => (
            <div key={b.min}
              className={`rounded-2xl p-3 text-center border transition-all duration-300 flex flex-col justify-center items-center shadow-sm ${streak >= b.min ? `bg-gradient-to-br ${b.color} text-white border-transparent font-bold` : 'bg-slate-50/50 border-slate-100 dark:bg-slate-900/30 dark:border-slate-800/50 text-slate-400 opacity-60'}`}>
              <div className="text-3xl drop-shadow-sm mb-1">{b.emoji}</div>
              <div className="text-xs font-bold truncate max-w-full tracking-tight">{b.label}</div>
              <div className="text-[10px] opacity-80 mt-0.5 font-semibold">{b.min}+ दिन</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
