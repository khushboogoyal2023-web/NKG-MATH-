import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProbabilityExperiment() {
  const [mode, setMode] = useState('dice'); // dice or coin
  const [results, setResults] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState(null);

  const rollOnce = () => {
    if (rolling) return;
    setRolling(true);
    const result = mode === 'dice' ? Math.floor(Math.random() * 6) + 1 : Math.random() < 0.5 ? 'H' : 'T';
    setCurrentRoll(result);
    setTimeout(() => {
      setResults(r => [...r, result]);
      setRolling(false);
    }, 600);
  };

  const rollMany = async () => {
    if (rolling) return;
    const newResults = [];
    for (let i = 0; i < 20; i++) {
      const result = mode === 'dice' ? Math.floor(Math.random() * 6) + 1 : Math.random() < 0.5 ? 'H' : 'T';
      newResults.push(result);
    }
    setResults(r => [...r, ...newResults]);
  };

  const reset = () => { setResults([]); setCurrentRoll(null); };

  const diceFaces = ['⚀','⚁','⚂','⚃','⚄','⚅'];

  // Count occurrences
  const counts = {};
  if (mode === 'dice') {
    [1,2,3,4,5,6].forEach(n => { counts[n] = results.filter(r => r === n).length; });
  } else {
    counts['H'] = results.filter(r => r === 'H').length;
    counts['T'] = results.filter(r => r === 'T').length;
  }

  const maxCount = Math.max(...Object.values(counts), 1);
  const total = results.length;
  const theoretical = mode === 'dice' ? (1/6*100).toFixed(1) : '50.0';

  /* 🔥 SUDHAAR: Asli Practical Average nikalne ke liye formula fix kiya 
     (Standard Deviation aur variance ads loading ke dauran ui lag nahi karega)
  */
  const practicalAvg = total > 0 
    ? (Object.values(counts).reduce((sum, val) => sum + Math.abs((val / total * 100) - (100 / (mode === 'dice' ? 6 : 2))), 0) / (mode === 'dice' ? 6 : 2)).toFixed(1)
    : '0.0';

  const keys = mode === 'dice' ? [1,2,3,4,5,6] : ['H','T'];
  const colors = mode === 'dice'
    ? ['bg-red-400','bg-orange-400','bg-yellow-400','bg-green-400','bg-blue-400','bg-purple-400']
    : ['bg-blue-500','bg-orange-500'];

  return (
    /* 🔥 Safety spacing (my-6 p-2) taaki ads container se na chipke */
    <div className="space-y-4 my-6 p-2">
      <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 rounded-2xl p-4">
        <h3 className="font-heading text-base mb-1 text-pink-700">🎲 प्रायिकता प्रयोग</h3>
        <p className="font-body text-sm">पासा फेंको या सिक्का उछालो — बड़ी संख्या में theoretical probability मिलती है!</p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 bg-muted rounded-2xl p-1">
        <button onClick={() => { setMode('dice'); reset(); }}
          className={`flex-1 py-2 rounded-xl font-body font-bold text-sm min-h-0 transition-all ${mode === 'dice' ? 'bg-card shadow text-primary' : 'text-muted-foreground'}`}>
          🎲 पासा (Dice)
        </button>
        <button onClick={() => { setMode('coin'); reset(); }}
          className={`flex-1 py-2 rounded-xl font-body font-bold text-sm min-h-0 transition-all ${mode === 'coin' ? 'bg-card shadow text-primary' : 'text-muted-foreground'}`}>
          🪙 सिक्का (Coin)
        </button>
      </div>

      {/* Current Roll display */}
      <div className="flex items-center justify-center py-2">
        <AnimatePresence mode="wait">
          <motion.div key={rolling ? 'rolling' : String(currentRoll)}
            initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 180, scale: 0.5, opacity: 0 }}
            className="text-7xl select-none"
          >
            {rolling ? (mode === 'dice' ? '🎲' : '🪙') : currentRoll ? (mode === 'dice' ? diceFaces[currentRoll - 1] : currentRoll === 'H' ? '🪙' : '🟤') : (mode === 'dice' ? '🎲' : '🪙')}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2">
        <button onClick={rollOnce} disabled={rolling}
          className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 rounded-2xl font-heading text-base min-h-0 disabled:opacity-50 hover:scale-105 transition-transform">
          {mode === 'dice' ? '🎲 पासा फेंको' : '🪙 सिक्का उछालो'}
        </button>
        <button onClick={rollMany} disabled={rolling}
          className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-2xl font-heading text-base min-h-0 disabled:opacity-50 hover:scale-105 transition-transform">
          ⚡ 20 बार
        </button>
      </div>

      {total > 0 && (
        <div className="space-y-3">
          {/* Bar chart */}
          <div className="bg-card border rounded-2xl p-4">
            <p className="font-body text-xs font-bold text-muted-foreground mb-3">📊 परिणाम — कुल: {total} प्रयास</p>
            <div className="flex items-end gap-2 h-24">
              {keys.map((k, i) => {
                const count = counts[k] || 0;
                const pct = total > 0 ? (count / maxCount * 100) : 0;
                return (
                  <div key={k} className="flex-1 flex flex-col items-center gap-1">
                    <span className="font-body text-xs text-muted-foreground">{count}</span>
                    <motion.div className={`w-full ${colors[i]} rounded-t-lg`} animate={{ height: `${Math.max(pct, 4)}%` }} style={{ minHeight: 4 }} />
                    <span className="font-body text-xs font-bold">{mode === 'dice' ? diceFaces[k-1] : k}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Probability table */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-2xl p-4">
            <p className="font-heading text-sm text-amber-700 mb-2">📐 Theoretical vs Practical Deviation</p>
            <div className="grid grid-cols-2 gap-2 text-sm font-body">
              <div className="text-center bg-white dark:bg-card rounded-xl p-2">
                <p className="text-xs text-muted-foreground">Theoretical Target</p>
                <p className="font-bold text-primary">{theoretical}%</p>
              </div>
              <div className="text-center bg-white dark:bg-card rounded-xl p-2">
                <p className="text-xs text-muted-foreground">Avg. Variance</p>
                <p className="font-bold text-orange-500">{practicalAvg}%</p>
              </div>
            </div>
            {total >= 20 && <p className="font-body text-xs text-amber-600 mt-2">💡 ज़्यादा trials → Variance कम होगी और ग्राफ theoretical value के करीब आएगा (Law of Large Numbers)</p>}
          </div>

          <button onClick={reset} className="w-full border border-dashed border-border rounded-2xl py-2 font-body text-sm text-muted-foreground hover:text-primary hover:border-primary transition-all min-h-0">
            🔄 रीसेट करो
          </button>
        </div>
      )}
    </div>
  );
}
