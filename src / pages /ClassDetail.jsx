import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Download, Bookmark, BookmarkCheck, StickyNote } from 'lucide-react';
import { classTopics } from '../lib/mathData';
import { useBookmarks } from '../hooks/useBookmarks';

function downloadClassNotes(data, classNum) {
  let content = `कक्षा ${classNum} - ${data.name}\n${'='.repeat(30)}\n\n`;
  data.topics.forEach(topic => {
    content += `\n${topic.title}\n${'-'.repeat(25)}\n${topic.content}\n`;
  });
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Class${classNum}_Notes.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ClassDetail() {
  const { classNum } = useParams();
  const data = classTopics[classNum];
  const { bookmarks, notes, toggleBookmark, setNote } = useBookmarks(`class-${classNum}`);
  const [openNoteId, setOpenNoteId] = useState(null);

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-2xl font-bold text-slate-700">❌ कक्षा नहीं मिली</p>
        <Link to="/classes" className="text-indigo-600 underline mt-4 inline-block font-medium">
          वापस जाएं
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link to="/classes" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-bold transition-colors">
        <ArrowLeft size={18} /> सभी कक्षाएं
      </Link>
      
      {/* Class Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-4">
            <span className="text-5xl role='img' aria-label='class emoji'">{data.emoji}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{data.name}</h1>
              <p className="text-slate-500 text-sm mt-0.5">इस कक्षा के सभी गणित के विषय</p>
            </div>
          </div>
          <button 
            onClick={() => downloadClassNotes(data, classNum)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-3 rounded-2xl font-bold hover:opacity-95 transition-all shadow-md shadow-emerald-100 active:scale-95 self-start sm:self-auto"
          >
            <Download size={18} /> नोट्स डाउनलोड
          </button>
        </div>
      </motion.div>

      {/* Topics List */}
      <div className="space-y-5">
        {data.topics.map((topic, i) => {
          const id = `topic-${i}`;
          const isBookmarked = !!bookmarks[id];
          const isNoteOpen = openNoteId === id;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all dark:bg-slate-900 dark:border-slate-800"
            >
              {/* Topic Header bar */}
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3.5 flex items-center justify-between text-white shadow-sm">
                <div className="flex items-center gap-2.5">
                  <BookOpen size={18} className="opacity-90" />
                  <h3 className="font-bold text-base md:text-lg tracking-wide">{topic.title}</h3>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* Note Toggle Button */}
                  <button
                    onClick={() => setOpenNoteId(isNoteOpen ? null : id)}
                    className={`p-2 rounded-xl transition-colors min-h-0 min-w-0 ${notes[id] ? 'bg-white/20 text-amber-300' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                    title="नोट लिखें"
                  >
                    <StickyNote size={18} />
                  </button>
                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(id)}
                    className={`p-2 rounded-xl transition-colors min-h-0 min-w-0 ${isBookmarked ? 'bg-white/20 text-amber-300' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                    title={isBookmarked ? 'बुकमार्क हटाएं' : 'बुकमार्क करें'}
                  >
                    {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  </button>
                </div>
              </div>

              {/* Topic Content Body */}
              <div className="p-6">
                <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed break-words font-normal">
                  {topic.content}
                </div>

                {/* Personal Notes Section */}
                {isNoteOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800"
                  >
                    <label htmlFor={`textarea-${id}`} className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                      📝 मेरा पर्सनल नोट:
                    </label>
                    <textarea
                      id={`textarea-${id}`}
                      className="w-full text-sm border border-slate-200 rounded-xl p-3 bg-slate-50/50 dark:bg-slate-950 dark:border-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 dark:text-slate-300 transition-all"
                      rows={3}
                      placeholder="इस चैप्टर के बारे में अपने खुद के शब्द या जरूरी फॉर्मूला यहाँ लिखें..."
                      value={notes[id] || ''}
                      onChange={(e) => setNote(id, e.target.value)}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Play Quiz Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <Link
          to={`/quiz?class=${classNum}`}
          className="inline-flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-bold text-lg md:text-xl hover:shadow-lg hover:shadow-orange-100 dark:hover:shadow-none transition-all active:scale-95 shadow-md"
        >
          🧠 कक्षा {classNum} का क्विज़ खेलें!
        </Link>
      </motion.div>
    </div>
  );
}
