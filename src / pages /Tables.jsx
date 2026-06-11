import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const numColors = [
  'from-red-400 to-rose-500',
  'from-orange-400 to-amber-500',
  'from-yellow-400 to-orange-400',
  'from-green-400 to-emerald-500',
  'from-teal-400 to-cyan-500',
  'from-blue-400 to-indigo-500',
  'from-purple-400 to-violet-500',
  'from-pink-400 to-rose-500',
  'from-red-500 to-orange-600',
  'from-lime-400 to-green-500',
];

export default function Tables() {
  const [selectedNum, setSelectedNum] = useState(null);
  const [search, setSearch] = useState('');

  const getTable = (n) =>
    Array.from({ length: 10 }, (_, i) => ({ multiplier: i + 1, result: n * (i + 1) }));

  const allNums = Array.from({ length: 100 }, (_, i) => i + 1);
  const filtered = search
    ? allNums.filter(n => String(n).includes(search))
    : allNums;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl md:text-4xl text-center mb-1">🔢 पहाड़े</h1>
        <p className="text-center text-muted-foreground font-body mb-6">
          1 से 100 तक — किसी भी नंबर पर टच करो और पहाड़ा देखो! 🎉
        </p>
      </motion.div>

      {/* Search */}
      <div className="max-w-xs mx-auto mb-6">
        <Input
          type="number"
          placeholder="🔍 नंबर खोजें..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="text-center text-lg rounded-2xl h-12 font-body border-2 border-primary/30 focus:border-primary"
        />
      </div>

      {/* Number Grid Dashboard */}
      <AnimatePresence mode="wait">
        {!selectedNum ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 mb-6">
              {filtered.map((n, i) => (
                <motion.button
                  key={n}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.min(i * 0.01, 0.3), type: 'spring' }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedNum(n)}
                  className={`bg-gradient-to-br ${numColors[(n - 1) % numColors.length]} text-white rounded-2xl p-2 md:p-3 font-heading text-lg md:text-xl shadow-md hover:shadow-xl transition-shadow aspect-square flex items-center justify-center`}
                >
                  {n}
                </motion.button>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <span className="text-5xl block mb-3">😕</span>
                <p className="font-body">कोई नंबर नहीं मिला!</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="max-w-md mx-auto"
          >
            <Button
              variant="outline"
              onClick={() => { setSelectedNum(null); }}
              className="mb-4 rounded-2xl font-body font-bold"
            >
              ← वापस जाओ
            </Button>

            <div className={`bg-gradient-to-br ${numColors[(selectedNum - 1) % numColors.length]} rounded-3xl p-6 text-white shadow-2xl`}>
              <motion.h2
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
                className="font-heading text-4xl text-center mb-5"
              >
                ✨ {selectedNum} का पहाड़ा ✨
              </motion.h2>
              <div className="space-y-2">
                {getTable(selectedNum).map(({ multiplier, result }) => (
                  <motion.div
                    key={multiplier}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: multiplier * 0.07 }}
                    className="bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center justify-between hover:bg-white/25 transition-colors"
                  >
                    <span className="font-body font-bold text-xl">
                      {selectedNum} × {multiplier}
                    </span>
                    <span className="text-2xl">＝</span>
                    <span className="font-heading text-3xl">{result}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Prev / Next */}
            <div className="flex justify-center gap-4 mt-5">
              {selectedNum > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedNum(selectedNum - 1)}
                  className="rounded-2xl font-body font-bold px-6"
                >
                  ← {selectedNum - 1}
                </Button>
              )}
              {selectedNum < 100 && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedNum(selectedNum + 1)}
                  className="rounded-2xl font-body font-bold px-6"
                >
                  {selectedNum + 1} →
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
