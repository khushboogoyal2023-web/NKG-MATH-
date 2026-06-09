import { useState } from 'react';
import { motion } from 'framer-motion';

const objects = [
  { name: 'सिक्का (Coin)', diameter: 2.4, icon: '🪙', color: 'from-yellow-400 to-amber-500' },
  { name: 'पहिया (Wheel)', diameter: 8, icon: '🎡', color: 'from-blue-400 to-indigo-500' },
  { name: 'थाली (Plate)', diameter: 24, icon: '🍽️', color: 'from-green-400 to-teal-500' },
];

export default function PiExperiment() {
  const [measured, setMeasured] = useState([false, false, false]);
  const [revealed, setRevealed] = useState([false, false, false]);

  const measure = (i) => {
    const m = [...measured]; m[i] = true; setMeasured(m);
    setTimeout(() => {
      const r = [...revealed]; r[i] = true; setRevealed(r);
    }, 1500);
  };

  const allDone = measured.every(Boolean);

  return (
    /* 🔥 Sudhaar: 'my-6 p-2' add kiya hai taaki Google Ads ke 
      auto-ads layout ke sath yeh component overlap na kare.
    */
    <div className="space-y-4 my-6 p-2">
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 rounded-2xl p-4">
        <h3 className="font-heading text-base mb-1 text-purple-700">🧵 प्रयोग विधि</h3>
        <p className="font-body text-sm text-foreground">हर गोल वस्तु की परिधि (C) और व्यास (d) मापो, फिर C ÷ d = π देखो!</p>
      </div>

      <div className="space-y-3">
        {objects.map((obj, i) => {
          const C = (Math.PI * obj.diameter).toFixed(2);
          const ratio = (C / obj.diameter).toFixed(4);
          return (
            <motion.div key={i} className="bg-card border rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className={`bg-gradient-to-br ${obj.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0`}>{obj.icon}</div>
                <div>
                  <h4 className="font-heading text-base">{obj.name}</h4>
                  <p className="font-body text-xs text-muted-foreground">व्यास (d) = {obj.diameter} cm</p>
                </div>
              </div>

              {!measured[i] ? (
                <button onClick={() => measure(i)}
                  className={`w-full bg-gradient-to-r ${obj.color} text-white py-2.5 rounded-xl font-body font-bold text-sm min-h-0 hover:scale-105 transition-transform`}>
                  🧵 धागे से परिधि मापो
                </button>
              ) : !revealed[i] ? (
                <div className="flex items-center gap-2 py-2">
                  <motion.div className="h-2 bg-primary rounded-full" animate={{ width: ['0%', '100%'] }} transition={{ duration: 1.5 }}>
                    <div className="h-2 bg-primary rounded-full w-full" />
                  </motion.div>
                  <span className="font-body text-xs text-muted-foreground shrink-0">माप रहे हैं...</span>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-2">
                    <p className="font-body text-xs text-muted-foreground">परिधि (C)</p>
                    <p className="font-heading text-lg text-blue-600">{C} cm</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-2">
                    <p className="font-body text-xs text-muted-foreground">व्यास (d)</p>
                    <p className="font-heading text-lg text-green-600">{obj.diameter} cm</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-2">
                    <p className="font-body text-xs text-muted-foreground">C ÷ d</p>
                    <p className="font-heading text-lg text-purple-600">{ratio}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {allDone && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-5 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="font-heading text-xl mb-2">निष्कर्ष (Conclusion)</h3>
          <p className="font-body text-sm mb-3">तीनों वस्तुओं के लिए C ÷ d ≈ <strong>3.14</strong></p>
          <div className="bg-white/20 rounded-xl p-3">
            <p className="font-heading text-2xl">π = C/d ≈ 3.14159...</p>
            <p className="font-body text-xs mt-1 opacity-80">यह एक constant hai — हर वृत्त के लिए!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
