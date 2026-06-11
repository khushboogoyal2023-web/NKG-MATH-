import { motion } from 'framer-motion';
import { definitions } from '../lib/mathData';

const catEmojis = ['📏', '📐', '🔷', '🎯'];
const catColors = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-violet-600',
  'from-orange-500 to-amber-600',
];

export default function Definitions() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-2">
          📖 परिभाषाएं / Definitions
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">
          रेखा, भुजा, कोण, मापन — सब कुछ आसान शब्दों में!
        </p>
      </div>

      {/* Categories Wrapper */}
      <div className="space-y-10">
        {definitions.map((cat, ci) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.08, type: 'spring', stiffness: 80 }}
          >
            {/* Category Header Card */}
            <div className={`bg-gradient-to-r ${catColors[ci % catColors.length]} rounded-2xl p-4 mb-4 flex items-center gap-3 shadow-sm`}>
              <span className="text-2xl drop-shadow-sm" role="img" aria-label="category emoji">
                {catEmojis[ci % catEmojis.length]}
              </span>
              <h2 className="text-xl font-black text-white tracking-wide">
                {cat.category}
              </h2>
            </div>
            
            {/* Items Inside Category */}
            <div className="space-y-4">
              {cat.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: ci * 0.08 + i * 0.04 }}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-100 dark:hover:border-slate-700 transition-all duration-200"
                >
                  <h3 className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-indigo-500 rounded-full inline-block" />
                    {item.term}
                  </h3>
                  <div className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-medium leading-relaxed whitespace-pre-line pl-3">
                    {item.def}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
