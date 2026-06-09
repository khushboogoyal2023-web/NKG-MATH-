import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';

const STORAGE_KEY = 'nkg_leaderboard';

// Helper: Save Score safely with calculated points
export function saveScore(name, score, total, level, topic) {
  if (typeof window === 'undefined') return;
  
  const lb = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  
  // Dynamic Point allocation system
  const points = level === 'expert' ? score * 30 : level === 'intermediate' ? score * 20 : score * 10;
  
  lb.push({ 
    name: name || 'अनाम छात्र', 
    score, 
    total, 
    level, 
    topic, 
    points, 
    date: new Date().toLocaleDateString('hi-IN') 
  });
  
  // Sort by points descending and slice top 20
  lb.sort((a, b) => b.points - a.points);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lb.slice(0, 20)));
}

// Helper: Get leaderboard safely
export function getLeaderboard() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export default function QuizLeaderboard({ onClose }) {
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Load fresh data on component mount
  useEffect(() => {
    setLeaderboardData(getLeaderboard());
  }, []);

  const icons = [
    <Trophy size={18} className="text-yellow-500 drop-shadow-xs inline" />, 
    <Medal size={18} className="text-slate-400 drop-shadow-xs inline" />, 
    <Medal size={18} className="text-amber-700 drop-shadow-xs inline" />
  ];

  // Dark mode safe badge styling
  const levelColors = { 
    expert: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400', 
    intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400', 
    beginner: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' 
  };
  
  const levelLabels = { expert: 'एक्सपर्ट', intermediate: 'इंटरमीडिएट', beginner: 'बिगिनर' };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-xl w-full max-w-md mx-auto"
    >
      {/* Header Deck */}
      <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white p-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <Trophy size={20} className="animate-pulse" />
          <h2 className="font-heading font-black text-base tracking-wide">🏆 लीडरबोर्ड (Top Scores)</h2>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white font-body font-black text-base cursor-pointer p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Leaderboard Entries */}
      {leaderboardData.length === 0 ? (
        <div className="p-8 text-center bg-radial from-transparent to-muted/5">
          <div className="text-4xl mb-2 animate-bounce">🎯</div>
          <p className="font-body text-xs font-bold text-muted-foreground">अभी कोई स्कोर रिकॉर्ड नहीं हुआ है।</p>
          <p className="font-body text-[11px] text-muted-foreground/80 mt-1">पहला क्विज़ खेलें और यहाँ अपना नाम लाएँ!</p>
        </div>
      ) : (
        <div className="divide-y divide-border/60 max-h-[400px] overflow-y-auto subtle-scrollbar">
          {leaderboardData.slice(0, 10).map((entry, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-3 p-3 transition-colors ${i < 3 ? 'bg-amber-50/40 dark:bg-yellow-950/5' : 'hover:bg-muted/30'}`}
            >
              {/* Rank Position */}
              <div className="w-7 shrink-0 text-center flex items-center justify-center">
                {i < 3 ? icons[i] : <span className="font-heading text-xs font-bold text-muted-foreground">{i + 1}</span>}
              </div>

              {/* Student Metadata */}
              <div className="flex-1 min-w-0">
                <p className="font-body font-black text-xs text-foreground truncate">{entry.name}</p>
                <p className="font-body text-[11px] text-muted-foreground truncate mt-0.5">
                  {entry.topic} <span className="opacity-40">•</span> {entry.date}
                </p>
              </div>

              {/* Difficulty Level Tag */}
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-body font-black shrink-0 ${levelColors[entry.level] || 'bg-muted text-muted-foreground'}`}>
                {levelLabels[entry.level] || entry.level}
              </span>

              {/* Score Statistics */}
              <div className="text-right shrink-0 min-w-[50px]">
                <p className="font-heading text-sm font-black text-amber-600 dark:text-amber-400">{entry.points} pts</p>
                <p className="font-body text-[10px] font-bold text-muted-foreground mt-0.5">{entry.score}/{entry.total}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
