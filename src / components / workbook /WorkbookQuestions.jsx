import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const questionSets = [
  {
    grade: 'कक्षा 1-2', emoji: '🌱', color: 'from-green-400 to-teal-500 shadow-green-500/20',
    questions: [
      { q: '5 + 3 = ?', ans: '8' },
      { q: '9 - 4 = ?', ans: '5' },
      { q: '2 × 3 = ?', ans: '6' },
      { q: '10 ÷ 2 = ?', ans: '5' },
    ]
  },
  {
    grade: 'कक्षा 3-4', emoji: '🌿', color: 'from-blue-400 to-indigo-500 shadow-indigo-500/20',
    questions: [
      { q: '12 × 7 = ?', ans: '84' },
      { q: '144 ÷ 12 = ?', ans: '12' },
      { q: '256 + 378 = ?', ans: '634' },
      { q: '500 - 237 = ?', ans: '263' },
    ]
  },
  {
    grade: 'कक्षा 5-6', emoji: '🌳', color: 'from-purple-400 to-pink-500 shadow-purple-500/20',
    questions: [
      { q: '15² = ?', ans: '225' },
      { q: '√169 = ?', ans: '13' },
      { q: '2/3 + 1/6 = ?', ans: '5/6' },
      { q: 'LCM(8, 12) = ?', ans: '24' },
    ]
  },
  {
    grade: 'कक्षा 7-9', emoji: '🏔️', color: 'from-orange-400 to-red-500 shadow-orange-500/20',
    questions: [
      { q: '(a+b)² = ?', ans: 'a²+2ab+b²' },
      { q: 'वृत्त का क्षेत्रफल = ?', ans: 'πr²' },
      { q: '3x + 7 = 22, x = ?', ans: '5' },
      { q: 'sin 30° = ?', ans: '1/2' },
    ]
  },
];

export default function WorkbookQuestions() {
  const [selectedSet, setSelectedSet] = useState(null);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(null);

  const handleCheck = () => {
    const qs = questionSets[selectedSet].questions;
    let correct = 0;
    qs.forEach((q, i) => {
      if ((answers[i] || '').trim().toLowerCase() === q.ans.toLowerCase()) correct++;
    });
    setScore(correct);
    setChecked(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setScore(null);
  };

  if (selectedSet === null) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full select-none">
        {questionSets.map((set, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSet(i)}
            className={`bg-gradient-to-br ${set.color} text-white rounded-3xl p-5 text-center shadow-lg cursor-pointer transition-all border-none`}
          >
            <div className="text-4xl mb-2">{set.emoji}</div>
            <div className="font-heading font-black text-base sm:text-lg tracking-wide">{set.grade}</div>
            <div className="text-xs font-bold opacity-90 mt-1 font-body">{set.questions.length} सवाल</div>
          </motion.button>
        ))}
      </div>
    );
  }

  const set = questionSets[selectedSet];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <div className="flex items-center justify-between mb-5 select-none">
        <button onClick={() => { setSelectedSet(null); handleReset(); }}
          className="text-violet-600 dark:text-violet-400 font-black font-body hover:underline flex items-center gap-1 cursor-pointer border-none bg-transparent text-sm sm:text-base">
          ← वापस जाएं
        </button>
        <div className={`bg-gradient-to-r ${set.color} text-white px-4 py-1.5 rounded-full font-heading font-black text-xs sm:text-sm shadow-xs`}>
          {set.emoji} {set.grade}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {set.questions.map((q, i) => {
          const userAns = (answers[i] || '').trim().toLowerCase();
          const correct = userAns === q.ans.toLowerCase();
          return (
            <div key={i} className={`bg-card border-2 rounded-2xl p-4 sm:p-5 transition-all text-left shadow-xs ${
              checked 
                ? (correct ? 'border-green-400 bg-green-50/40 dark:bg-green-950/10' : 'border-red-300 bg-red-50/40 dark:bg-red-950/10') 
                : 'border-violet-100 dark:border-violet-900/40'
            }`}>
              <div className="flex items-center gap-3 mb-3.5">
                <span className="bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-heading font-black rounded-xl px-3 py-1 text-xs sm:text-sm select-none border border-violet-200/40">Q{i + 1}</span>
                <span className="font-heading font-black text-base sm:text-lg text-foreground tracking-wide">{q.q}</span>
                {checked && (correct
                  ? <CheckCircle className="ml-auto text-green-500 shrink-0" size={22} />
                  : <XCircle className="ml-auto text-red-400 shrink-0" size={22} />
                )}
              </div>
              <input
                type="text"
                value={answers[i] || ''}
                onChange={e => setAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                disabled={checked}
                placeholder="अपना जवाब लिखो..."
                className="w-full border-2 border-violet-100 dark:border-violet-900/40 rounded-xl px-4 py-2.5 font-body font-semibold text-sm sm:text-base focus:outline-hidden focus:border-violet-500 dark:focus:border-violet-400 bg-background disabled:opacity-50 transition-all shadow-inner"
              />
              {checked && !correct && (
                <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-2 font-body font-bold">
                  ✅ सही उत्तर: <span className="font-heading font-black tracking-wide bg-green-100 dark:bg-green-950/40 px-2 py-0.5 rounded-md border border-green-200/30">{q.ans}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {score !== null && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl p-5 text-center mb-5 select-none ${score === set.questions.length ? 'bg-green-100 dark:bg-green-950/20 border-2 border-green-400 text-green-800 dark:text-green-300' : 'bg-orange-50 dark:bg-orange-950/20 border-2 border-orange-300 text-orange-800 dark:text-orange-300'}`}>
            <div className="text-4xl mb-1">{score === set.questions.length ? '🏆' : score >= 2 ? '👍' : '💪'}</div>
            <p className="font-heading font-black text-xl sm:text-2xl">{score}/{set.questions.length} सही</p>
            <p className="font-body font-bold text-xs sm:text-sm mt-1 opacity-90">
              {score === set.questions.length ? 'शाबाश! सभी सही!' : 'अच्छी कोशिश, दोबारा प्रयास करो!'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3 select-none">
        {!checked
          ? <button onClick={handleCheck}
              className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-2xl font-heading font-black text-base sm:text-lg hover:scale-102 transition-transform shadow-md cursor-pointer border-none active:scale-98">
              ✅ जाँचो
            </button>
          : <button onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 py-3 rounded-2xl font-heading font-black text-base sm:text-lg hover:bg-violet-200/70 dark:hover:bg-violet-900/50 transition cursor-pointer border-none active:scale-98">
              <RotateCcw size={18} className="stroke-[2.5]" /> फिर से करो
            </button>
        }
      </div>
    </motion.div>
  );
}
