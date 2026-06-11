import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Bookmark, BookmarkCheck, StickyNote } from 'lucide-react';
import { formulas } from '../lib/mathData';
import { useBookmarks } from '../hooks/useBookmarks';

function downloadFormulasTXT() {
  let content = 'गणित के महत्वपूर्ण सूत्र / Math Formulas\n========================================\n\n';
  formulas.forEach(cat => {
    content += `\n${cat.category}\n${'-'.repeat(40)}\n`;
    cat.items.forEach(item => {
      content += `${item.name} = ${item.formula}\n`;
    });
  });
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Math_Formulas_List.txt';
  a.click();
  URL.revokeObjectURL(url);
}

const catColors = [
  'from-purple-500 to-indigo-600',
  'from-orange-500 to-red-600',
  'from-teal-500 to-emerald-600',
  'from-pink-500 to-rose-600',
  'from-blue-500 to-cyan-600',
];

export default function Formulas() {
  const { bookmarks, notes, toggleBookmark, setNote } = useBookmarks('formulas');
  const [openNoteId, setOpenNoteId] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Top Header & Download Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
          📐 गणित के सूत्र / Formulas
        </h1>
        <button 
          onClick={downloadFormulasTXT}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-2xl font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-sm md:text-base w-full sm:w-auto justify-center"
        >
          <Download size={18} /> सूत्र सूची डाउनलोड करें
        </button>
      </div>
      <p className="text-center sm:text-left text-slate-500 dark:text-slate-400 font-medium mb-10 text-sm md:text-base pl-1">
        सभी महत्वपूर्ण सूत्र एक ही स्थान पर — याद करें और अभ्यास करें!
      </p>

      {/* Formulas Container */}
      <div className="space-y-10">
        {formulas.map((cat, ci) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.08, type: 'spring', stiffness: 80 }}
          >
            {/* Category Banner */}
            <div className={`bg-gradient-to-r ${catColors[ci % catColors.length]} rounded-2xl p-4 mb-4 shadow-sm`}>
              <h2 className="text-xl font-black text-white tracking-wide">{cat.category}</h2>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.items.map((item, i) => {
                const id = `${ci}-${i}`;
                const isBookmarked = !!bookmarks[id];
                const isNoteOpen = openNoteId === id;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: ci * 0.08 + i * 0.04 }}
                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-3 w-full">
                      {/* Name tag */}
                      <div className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs md:text-sm px-3 py-2 rounded-xl shrink-0 border border-indigo-100/30">
                        {item.name}
                      </div>
                      
                      {/* Formula representation */}
                      <div className="font-extrabold text-slate-800 dark:text-slate-200 flex-1 break-words text-sm md:text-base">
                        = &nbsp;{item.formula}
                      </div>

                      {/* Control Buttons (Note & Bookmark) */}
                      <div className="flex items-center gap-1 shrink-0">
                        {/* Note toggle button */}
                        <button
                          onClick={() => setOpenNoteId(isNoteOpen ? null : id)}
                          className={`p-2 rounded-xl transition-colors ${notes[id] ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' : 'text-slate-400 hover:text-amber-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                          title="नोट लिखें"
                        >
                          <StickyNote size={18} />
                        </button>
                        
                        {/* Bookmark toggle button */}
                        <button
                          onClick={() => toggleBookmark(id)}
                          className={`p-2 rounded-xl transition-colors ${isBookmarked ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40' : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                          title={isBookmarked ? 'बुकमार्क हटाएँ' : 'बुकमार्क जोड़ें'}
                        >
                          {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Note Textarea */}
                    {isNoteOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 border-t border-slate-50 dark:border-slate-800 pt-3"
                      >
                        <textarea
                          className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium"
                          rows={2}
                          placeholder="इस सूत्र के बारे में अपनी खुद की याद रखने की ट्रिक या नोट्स यहाँ लिखें..."
                          value={notes[id] || ''}
                          onChange={(e) => setNote(id, e.target.value)}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
