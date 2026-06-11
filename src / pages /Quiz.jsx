import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { quizQuestions } from '../lib/mathData';
import { Link } from 'react-router-dom';
import { saveScore } from '../components/quiz/QuizLeaderboard';
import QuizLeaderboard from '../components/quiz/QuizLeaderboard';

const LEVELS = [
  { id: 'beginner', label: '🌱 Beginner', desc: 'आसान प्रश्न — कक्षा 1-3', points: 10, color: 'from-green-400 to-teal-500' },
  { id: 'intermediate', label: '⭐ Intermediate', desc: 'मध्यम प्रश्न — कक्षा 4-6', points: 20, color: 'from-blue-400 to-indigo-500' },
  { id: 'expert', label: '🏆 Expert', desc: 'कठिन प्रश्न — कक्षा 7-9', points: 30, color: 'from-red-500 to-orange-500' },
];

// Fisher-Yates shuffle
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick 10 random questions, avoiding recent ones if possible
function pickQuestions(pool, prevIndices) {
  const shuffled = shuffleArray(pool.map((q, i) => ({ ...q, origIdx: i })));
  // prefer unseen questions first
  const unseen = shuffled.filter(q => !prevIndices.includes(q.origIdx));
  const seen = shuffled.filter(q => prevIndices.includes(q.origIdx));
  const ordered = [...unseen, ...seen];
  return ordered.slice(0, 10);
}

export default function Quiz() {
  const urlParams = new URLSearchParams(window.location.search);
  const preClass = urlParams.get('class');

  const [selectedClass, setSelectedClass] = useState(preClass ? Number(preClass) : null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('nkg_player_name') || '');
  const [showLB, setShowLB] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [shuffling, setShuffling] = useState(false);
  const prevIndices = useRef([]);

  // Save score when quiz finishes
  useEffect(() => {
    if (finished && questions.length > 0) {
      const lv = LEVELS.find(l => l.id === selectedLevel) || LEVELS[0];
      saveScore(playerName || 'अज्ञात', score, questions.length, lv.id, `कक्षा ${selectedClass} क्विज़`);
    }
  }, [finished]);

  const loadQuestions = (cls, showAnim = false) => {
    const pool = quizQuestions[cls] || [];
    if (showAnim) {
      setShuffling(true);
      setTimeout(() => {
        const qs = pickQuestions(pool, prevIndices.current);
        prevIndices.current = qs.map(q => q.origIdx);
        setQuestions(qs);
        setShuffling(false);
      }, 600);
    } else {
      const qs = pickQuestions(pool, prevIndices.current);
      prevIndices.current = qs.map(q => q.origIdx);
      setQuestions(qs);
    }
  };

  useEffect(() => {
    if (selectedClass) loadQuestions(selectedClass);
  }, [selectedClass]);

  const selectAnswer = (idx) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === questions[currentQ].answer) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(c => c + 1);
        setAnswered(null);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setAnswered(null);
    setFinished(false);
    loadQuestions(selectedClass, true);
  };

  const changeClass = () => {
    setSelectedClass(null);
    setCurrentQ(0);
    setScore(0);
    setAnswered(null);
    setFinished(false);
    setQuestions([]);
  };

  if (!selectedClass) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-heading text-3xl md:text-4xl text-center mb-2">🧠 क्विज़</h1>

        {/* Leaderboard button */}
        <div className="flex justify-center gap-3 mb-6">
          <button onClick={() => setShowLB(!showLB)} className="flex items-center gap-2 bg-amber-100 text-amber-700 border border-amber-300 px-4 py-2 rounded-xl font-body font-bold text-sm min-h-0">
            🏆 Leaderboard
          </button>
        </div>
        {showLB && <div className="mb-6"><QuizLeaderboard onClose={() => setShowLB(false)} /></div>}

        {/* Level Selection */}
        <div className="mb-6">
          <p className="font-heading text-center text-lg mb-3">Level चुनो</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {LEVELS.map(lv => (
              <motion.button key={lv.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedLevel(lv.id)}
                className={`bg-gradient-to-br ${lv.color} text-white rounded-2xl p-4 text-left shadow-lg border-4 ${selectedLevel === lv.id ? 'border-yellow-400' : 'border-transparent'}`}>
                <p className="font-heading text-lg">{lv.label}</p>
                <p className="font-body text-xs opacity-80 mt-1">{lv.desc}</p>
                <p className="font-body text-xs mt-1 bg-white/20 inline-block px-2 py-0.5 rounded-full">+{lv.points} pts/सही</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Player Name */}
        <div className="mb-6 max-w-xs mx-auto">
          <input value={playerName} onChange={e => { setPlayerName(e.target.value); localStorage.setItem('nkg_player_name', e.target.value); }}
            placeholder="तुम्हारा नाम (leaderboard के लिए)"
            className="w-full px-4 py-2.5 border rounded-xl font-body text-sm focus:outline-none focus:border-primary text-center" />
        </div>

        <p className="text-center text-muted-foreground font-body mb-4">अपनी कक्षा चुनें और क्विज़ खेलें!</p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {Array.from({ length: 9 }, (_, i) => i + 1).map(n => (
            <motion.button key={n} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedClass(n)}
              className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-3xl p-6 text-center shadow-lg">
              <div className="font-heading text-3xl">📝</div>
              <div className="font-heading text-xl mt-2">कक्षा {n}</div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  if (shuffling) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.6, ease: 'easeInOut' }} className="text-6xl mb-4">🃏</motion.div>
        <p className="font-heading text-xl text-primary">नए सवाल चुन रहे हैं...</p>
      </div>
    );
  }

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    const emoji = percent === 100 ? '🏆' : percent >= 60 ? '⭐' : '💪';
    const msg = percent === 100 ? 'उत्कृष्ट! सब सही!' : percent >= 60 ? 'बहुत अच्छा!' : 'और प्रयास करो!';
    const lv = LEVELS.find(l => l.id === selectedLevel) || LEVELS[0];
    const totalPoints = score * lv.points;

    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <div className="text-8xl mb-4">{emoji}</div>
          <h2 className="font-heading text-3xl mb-2">क्विज़ पूरा!</h2>
          <p className="font-heading text-5xl text-primary mb-2">{score}/{questions.length}</p>
          <p className="text-muted-foreground font-body text-lg mb-2">{msg}</p>
          <div className={`bg-gradient-to-r ${lv.color} text-white rounded-2xl p-3 mb-4 inline-block`}>
            <p className="font-heading text-lg">{lv.label} • +{totalPoints} Points 🎯</p>
          </div>
          
          <div className="w-full bg-muted rounded-full h-4 mb-6">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={restart} className="rounded-2xl font-heading text-lg py-6 bg-primary">
              🔄 फिर से खेलें
            </Button>
            <Button onClick={changeClass} variant="outline" className="rounded-2xl font-heading text-lg py-6">
              📚 कक्षा बदलें
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={changeClass} variant="ghost" className="font-body font-bold">
          ← कक्षा बदलें
        </Button>
        <span className="bg-primary/10 text-primary px-4 py-1 rounded-xl font-bold font-body">
          ⭐ {score}/{questions.length}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-muted-foreground font-body mb-1">
          <span>प्रश्न {currentQ + 1}/10</span>
          <span>कक्षा {selectedClass}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-3xl p-6 mb-6 text-center shadow-xl">
            <p className="font-heading text-2xl md:text-3xl">{q.q}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt, idx) => {
              let bg = 'bg-card border hover:bg-muted';
              if (answered !== null) {
                if (idx === q.answer) bg = 'bg-green-500 text-white border-green-500';
                else if (idx === answered) bg = 'bg-red-400 text-white border-red-400';
              }
              return (
                <motion.button
                  key={idx}
                  whileHover={answered === null ? { scale: 1.03 } : {}}
                  whileTap={answered === null ? { scale: 0.97 } : {}}
                  onClick={() => selectAnswer(idx)}
                  className={`${bg} rounded-2xl p-4 text-center font-heading text-xl transition-colors shadow-sm`}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
