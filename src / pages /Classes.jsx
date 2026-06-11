import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const classData = [
  { num: 1, emoji: '🐣', color: 'from-amber-400 to-orange-500', topics: 'गिनती, जोड़, घटाव' },
  { num: 2, emoji: '🌟', color: 'from-green-400 to-emerald-600', topics: 'जोड़, घटाव, आकृतियाँ' },
  { num: 3, emoji: '🦋', color: 'from-blue-400 to-indigo-500', topics: 'गुणा, भाग, समय' },
  { num: 4, emoji: '🚀', color: 'from-purple-400 to-violet-600', topics: 'भिन्न, दशमलव, ज्यामिति' },
  { num: 5, emoji: '🏆', color: 'from-pink-400 to-rose-600', topics: 'LCM, HCF, प्रतिशत' },
  { num: 6, emoji: '🔥', color: 'from-red-400 to-orange-600', topics: 'बीजगणित, अनुपात, क्षेत्रफल' },
  { num: 7, emoji: '💎', color: 'from-indigo-400 to-blue-600', topics: 'पूर्णांक, समीकरण, त्रिभुज' },
  { num: 8, emoji: '⚡', color: 'from-yellow-400 to-amber-600', topics: 'घातांक, बहुपद, ग्राफ' },
  { num: 9, emoji: '🧠', color: 'from-teal-400 to-cyan-600', topics: 'संख्या पद्धति, सांख्यिकी, प्रमेय' },
];

export default function Classes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-2">
          📚 कक्षाएं चुनें / Select Class
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
          कक्षा 1 से 9 — अपनी कक्षा चुनें और गणित के ब्रह्मांड में कदम रखें!
        </p>
      </div>
      
      {/* Classes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classData.map((c, i) => (
          <motion.div
            key={c.num}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={`/class/${c.num}`}
              className={`block bg-gradient-to-br ${c.color} rounded-3xl p-6 text-white shadow-md hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-none transition-all duration-200`}
            >
              {/* Card Content */}
              <div className="flex items-center gap-5">
                <div className="text-5xl shrink-0 drop-shadow-sm" role="img" aria-label={`class ${c.num} emoji`}>
                  {c.emoji}
                </div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-black tracking-tight">कक्षा {c.num}</h3>
                  <p className="text-sm opacity-95 font-medium truncate mt-1 text-white/90">
                    {c.topics}
                  </p>
                </div>
              </div>
              
              {/* Progress Indicator (Fun visual element for kids) */}
              <div className="mt-5 bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="bg-white rounded-full h-2" 
                  initial={{ width: 0 }}
                  animate={{ width: `${(c.num / 9) * 100}%` }}
                  transition={{ delay: i * 0.05 + 0.2, duration: 0.8 }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
