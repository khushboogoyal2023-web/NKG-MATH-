import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, BookOpen, Target, Award, TrendingUp, Zap, RotateCcw } from 'lucide-react';
import QuizLeaderboard, { getLeaderboard } from '../components/quiz/QuizLeaderboard';

const PROGRESS_KEY = 'nkg_progress';

function getProgress() {
  return JSON.parse(localStorage.getItem(PROGRESS_KEY) || JSON.stringify({
    chaptersCompleted: [],
    quizzesDone: 0,
    totalPoints: 0,
    streak: 0,
    lastVisit: null,
    badges: [],
    level: 'beginner',
  }));
}

const allBadges = [
  { id: 'first_quiz', label: 'पहला क्विज़ 🎯', desc: '1 क्विज़ पूरा करो', icon: '🎯', req: (p) => p.quizzesDone >= 1 },
  { id: 'ten_quizzes', label: 'क्विज़ मास्टर 🏅', desc: '10 क्विज़ पूरे करो', icon: '🏅', req: (p) => p.quizzesDone >= 10 },
  { id: 'hundred_points', label: 'शतक 💯', desc: '100 points कमाओ', icon: '💯', req: (p) => p.totalPoints >= 100 },
  { id: 'five_chapters', label: 'अध्यायी 📚', desc: '5 अध्याय पूरे करो', icon: '📚', req: (p) => p.chaptersCompleted.length >= 5 },
  { id: 'streak_3', label: 'हैट्रिक 🔥', desc: '3 दिन लगातार', icon: '🔥', req: (p) => p.streak >= 3 },
  { id: 'math_wizard', label: 'Math Wizard 🧙', desc: '500 points', icon: '🧙', req: (p) => p.totalPoints >= 500 },
];

const topics = [
  { id: 'vedic', label: 'वैदिक गणित', icon: '🕉️', total: 16, color: 'from-purple-500 to-indigo-600' },
  { id: 'quiz', label: 'क्विज़', icon: '🧠', total: 9, color: 'from-blue-500 to-cyan-600' },
  { id: 'models', label: 'Math Models', icon: '🔬', total: 100, color: 'from-orange-500 to-amber-500' },
  { id: 'lab', label: 'Virtual Lab', icon: '🧪', total: 20, color: 'from-teal-500 to-green-600' },
  { id: 'glossary', label: 'शब्दकोश', icon: '📚', total: 65, color: 'from-rose-500 to-pink-600' },
  { id: 'games', label: 'खेल', icon: '🎮', total: 20, color: 'from-amber-500 to-yellow-500' },
];

function RadialProgress({ percent, color, size = 80, label }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={8} />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={circ} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.5, ease: 'easeOut' }} strokeLinecap="round" />
      </svg>
      <span className="font-heading text-base -mt-1 absolute" style={{ marginTop: size / 2 - 10 }}>{percent}%</span>
      {label && <p className="font-body text-xs text-muted-foreground text-center">{label}</p>}
    </div>
  );
}

export default function ProgressDashboard() {
  const [progress, setProgress] = useState(getProgress());
  const [lb] = useState(getLeaderboard());
  const [showLB, setShowLB] = useState(false);
  const [demoAdded, setDemoAdded] = useState(false);

  // Update streak
  useEffect(() => {
    const p = { ...progress };
    const today = new Date().toDateString();
    if (p.lastVisit !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      p.streak = p.lastVisit === yesterday ? (p.streak || 0) + 1 : 1;
      p.lastVisit = today;
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
      setProgress(p);
    }
  }, []);

  const earnedBadges = allBadges.filter(b => b.req(progress));
  const mathLevel = progress.totalPoints < 100 ? 'Beginner' : progress.totalPoints < 500 ? 'Intermediate' : 'Expert';
  const levelEmoji = mathLevel === 'Expert' ? '🏆' : mathLevel === 'Intermediate' ? '⭐' : '🌱';
  const overallPercent = Math.min(100, Math.round((progress.quizzesDone / 50) * 100));

  const addDemoProgress = () => {
    const p = { ...progress, quizzesDone: progress.quizzesDone + 3, totalPoints: progress.totalPoints + 60, chaptersCompleted: [...new Set([...progress.chaptersCompleted, 'vedic-1', 'vedic-2', 'quiz-1'])] };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
    setProgress(p);
    setDemoAdded(true);
  };

  const reset = () => {
    const fresh = { chaptersCompleted: [], quizzesDone: 0, totalPoints: 0, streak: 1, lastVisit: new Date().toDateString(), badges: [], level: 'beginner' };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(fresh));
    setProgress(fresh);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="font-heading text-3xl md:text-4xl mb-1">📊 मेरी प्रगति</h1>
        <p className="font-body text-sm text-muted-foreground">तुम्हारी गणित यात्रा का पूरा हिसाब!</p>
      </motion.div>

      {/* Hero Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-3xl p-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">{levelEmoji}</div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">{progress.streak}🔥</div>
          </div>
          <div className="flex-1">
            <p className="font-body text-sm opacity-80">तुम्हारा Level</p>
            <h2 className="font-heading text-2xl">{mathLevel}</h2>
            <div className="flex gap-4 mt-2">
              <div><p className="font-body text-xs opacity-70">Points</p><p className="font-heading text-xl">{progress.totalPoints}</p></div>
              <div><p className="font-body text-xs opacity-70">क्विज़</p><p className="font-heading text-xl">{progress.quizzesDone}</p></div>
              <div><p className="font-body text-xs opacity-70">Streak</p><p className="font-heading text-xl">{progress.streak} दिन</p></div>
            </div>
          </div>
          <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
            <svg width={80} height={80} className="-rotate-90 absolute">
              <circle cx={40} cy={40} r={32} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={8} />
              <motion.circle cx={40} cy={40} r={32} fill="none" stroke="white" strokeWidth={8}
                strokeDasharray={201} initial={{ strokeDashoffset: 201 }} animate={{ strokeDashoffset: 201 - (overallPercent / 100) * 201 }}
                transition={{ duration: 1.5 }} strokeLinecap="round" />
            </svg>
            <span className="font-heading text-lg text-white z-10">{overallPercent}%</span>
          </div>
        </div>

        {/* Level progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs opacity-70 mb-1 font-body">
            <span>Beginner</span><span>Intermediate</span><span>Expert</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div className="h-full bg-yellow-400 rounded-full"
              initial={{ width: 0 }} animate={{ width: `${Math.min(100, (progress.totalPoints / 500) * 100)}%` }}
              transition={{ duration: 1.5 }} />
          </div>
          <p className="text-xs opacity-70 font-body mt-1">अगले level के लिए {Math.max(0, mathLevel === 'Beginner' ? 100 - progress.totalPoints : mathLevel === 'Intermediate' ? 500 - progress.totalPoints : 0)} points चाहिए</p>
        </div>
      </motion.div>

      {/* Topic Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-card border rounded-2xl p-4 shadow-sm">
        <h2 className="font-heading text-lg mb-3 flex items-center gap-2"><TrendingUp size={18} className="text-primary" /> विषयवार प्रगति</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {topics.map(t => {
            const done = progress.chaptersCompleted.filter(c => c.startsWith(t.id)).length;
            const pct = Math.min(100, Math.round((done / t.total) * 100));
            return (
              <div key={t.id} className="bg-muted/40 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{t.icon}</span>
                  <p className="font-body text-xs font-bold truncate">{t.label}</p>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-1">
                  <motion.div className={`h-full bg-gradient-to-r ${t.color} rounded-full`}
                    initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1 }} />
                </div>
                <p className="font-body text-xs text-muted-foreground">{done}/{t.total} • {pct}%</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-card border rounded-2xl p-4 shadow-sm">
        <h2 className="font-heading text-lg mb-3 flex items-center gap-2"><Award size={18} className="text-primary" /> Badges & Achievements</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {allBadges.map(b => {
            const earned = b.req(progress);
            return (
              <motion.div key={b.id} whileHover={{ scale: 1.05 }}
                className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all ${earned ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' : 'border-border bg-muted/30 opacity-50'}`}>
                <span className="text-2xl mb-1">{b.icon}</span>
                <p className="font-body text-xs text-center leading-tight">{b.label.split(' ')[0]}</p>
                {earned && <span className="text-xs text-yellow-600 font-bold">✓</span>}
              </motion.div>
            );
          })}
        </div>
        {earnedBadges.length > 0 && (
          <p className="font-body text-xs text-green-600 mt-2">🎉 {earnedBadges.length} badges earned!</p>
        )}
      </motion.div>

      {/* Leaderboard toggle */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <button onClick={() => setShowLB(!showLB)} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-3 rounded-2xl font-heading text-base shadow-lg hover:scale-105 transition-transform min-h-0">
          <Trophy size={20} /> 🏆 Leaderboard देखो
        </button>
        {showLB && <div className="mt-3"><QuizLeaderboard onClose={() => setShowLB(false)} /></div>}
      </motion.div>

      {/* Demo + Reset */}
      <div className="flex gap-3">
        <button onClick={addDemoProgress} disabled={demoAdded}
          className="flex-1 flex items-center justify-center gap-2 bg-primary/10 text-primary border border-primary/30 py-2.5 rounded-xl font-body font-bold text-sm min-h-0 hover:bg-primary/20 disabled:opacity-50 transition-all">
          <Zap size={16} /> Demo Progress जोड़ो
        </button>
        <button onClick={reset} className="flex items-center gap-1.5 bg-muted text-muted-foreground px-4 py-2.5 rounded-xl font-body text-sm min-h-0 hover:text-destructive transition-all">
          <RotateCcw size={14} /> रीसेट
        </button>
      </div>
    </div>
  );
}
