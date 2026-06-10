import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, Sparkles, RotateCcw, ChevronRight, Camera, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const exampleQueries = [
  '98 × 97 = ?',
  '15² = ?',
  'एक आयत की लंबाई 8 cm और चौड़ाई 5 cm है। क्षेत्रफल और परिमाप निकालो।',
  '½ + ¾ = ?',
  '2x + 5 = 11, x का मान निकालो',
  '√144 = ?',
];

function ThinkingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <motion.div 
            key={i} 
            className="absolute w-3 h-3 bg-indigo-600 rounded-full"
            style={{ 
              left: Math.cos((i / 6) * Math.PI * 2) * 30 + 32, 
              top: Math.sin((i / 6) * Math.PI * 2) * 30 + 32 
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
        <motion.div 
          className="w-16 h-16 flex items-center justify-center bg-indigo-50 rounded-full shadow-inner"
          animate={{ rotate: 360 }} 
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          <Brain size={28} className="text-indigo-600" />
        </motion.div>
      </div>
      <p className="font-medium text-sm text-slate-500 animate-pulse">AI सवाल को हल कर रहा है... 🤔</p>
    </div>
  );
}

function StepBlock({ step, index, total }) {
  const isLast = index === total - 1;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.15 }}
      className={`rounded-2xl p-5 border transition-all duration-200 shadow-sm ${
        isLast 
          ? 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800' 
          : 'bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
          isLast ? 'bg-emerald-500 text-white' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
        }`}>
          {isLast ? '✓' : index + 1}
        </div>
        <div className="flex-1 min-w-0 space-y-1.5">
          {step?.label && (
            <p className={`text-xs font-bold uppercase tracking-wider ${isLast ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`}>
              {step.label}
            </p>
          )}
          <p className={`leading-relaxed ${
            isLast 
              ? 'font-bold text-emerald-800 dark:text-emerald-300 text-lg' 
              : 'text-slate-700 dark:text-slate-300 text-sm'
          }`}>
            {step?.content}
          </p>
          {step?.formula && (
            <div className="mt-2 inline-block bg-indigo-50/60 border border-indigo-100 dark:bg-indigo-950/30 dark:border-indigo-900/50 rounded-xl px-3.5 py-1.5 text-xs text-indigo-700 dark:text-indigo-300 font-bold">
              📐 सूत्र: {step.formula}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AISolver() {
  const [query, setQuery] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const solve = async (textQuery, imageSrc) => {
    if (!textQuery.trim() && !imageSrc) return;
    setLoading(true);
    setResult(null);
    
    const prompt = `तुम एक expert math teacher हो जो कक्षा 1-9 के students को पढ़ाते हो। 
${imageSrc ? 'तुम्हें एक इमेज दी गई है जिसमें गणित का सवाल है। इस इमेज को ध्यान से देखो और सवाल पहचानकर हल करो।' : ''}
सवाल: "${textQuery || 'इमेज में दिया गया सवाल'}"

Response को EXACTLY इस JSON format में दो:
{
  "steps": [
    {"label": "दिए गए", "content": "...", "formula": null},
    {"label": "सूत्र/विधि", "content": "...", "formula": "सूत्र यहाँ लिखो"},
    {"label": "हल", "content": "step by step calculation...", "formula": null},
    {"label": "अंतिम उत्तर", "content": "उत्तर = ...", "formula": null}
  ],
  "why": "यह विधि क्यों काम करती है — एक-दो वाक्यों में सरल भाषा में",
  "concept": "गणितीय अवधारणा का नाम (जैसे: गुणा, क्षेत्रफल, LCM, etc.)"
}

Steps 3-5 रखो। हिंदी में जवाब दो। Simple और clear रखो।`;

    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt,
        images: imageSrc ? [imageSrc] : undefined,
        response_json_schema: {
          type: 'object',
          properties: {
            steps: { 
              type: 'array', 
              items: { 
                type: 'object', 
                properties: { 
                  label: { type: 'string' }, 
                  content: { type: 'string' }, 
                  formula: { type: 'string' } 
                } 
              } 
            },
            why: { type: 'string' },
            concept: { type: 'string' },
          },
        },
      });
      setResult({ query: textQuery || '📸 स्कैन किया गया सवाल', ...res });
    } catch (e) {
      setResult({ query: textQuery, error: 'कुछ गड़बड़ हुई। कृपया साफ फोटो खींचें या दोबारा कोशिश करें।' });
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    solve(query, image);
  };

  const reset = () => {
    setResult(null);
    setQuery('');
    setImage(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-3xl p-4 shadow-lg shadow-indigo-100">
            <Brain size={36} />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">🤖 AI Math Solver</h1>
        <p className="text-slate-500 text-sm">कोई भी गणित सवाल लिखो या फोटो खींचो — step-by-step हल पाओ!</p>
      </motion.div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <AnimatePresence>
          {image && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative inline-block border-2 border-indigo-500/30 rounded-2xl p-1 bg-white shadow-sm"
            >
              <img src={image} alt="Preview" className="max-h-40 rounded-xl object-contain" />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2 items-center">
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            capture="environment" 
            onChange={handleImageChange} 
            className="hidden" 
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 p-3.5 rounded-2xl border border-slate-200 transition-all active:scale-95 flex items-center justify-center shrink-0"
            title="फोटो खींचें या अपलोड करें"
          >
            <Camera size={22} />
          </button>

          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={image ? "फोटो अटैच है, कुछ पूछना है तो लिखें या सीधे हल करें..." : "जैसे: 98 × 97 = ? या फोटो खींचें 📸"}
            className="flex-1 border border-slate-200 focus:border-indigo-500 rounded-2xl px-4 py-3.5 text-sm bg-white focus:outline-none shadow-sm transition-all dark:bg-slate-900 dark:border-slate-800"
          />

          <button 
            type="submit" 
            disabled={loading || (!query.trim() && !image)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3.5 rounded-2xl font-bold flex items-center gap-2 disabled:opacity-50 transition-all active:scale-95 shadow-md shadow-indigo-100 min-h-0 shrink-0"
          >
            <Send size={18} />
            <span className="hidden sm:block">हल करो</span>
          </button>
        </div>
      </form>

      {/* Example queries */}
      {!result && !loading && !image && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">💡 उदाहरण सवाल — क्लिक करो:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {exampleQueries.map((eq, i) => (
              <button 
                key={i} 
                type="button"
                onClick={() => { setQuery(eq); solve(eq, null); }}
                className="bg-slate-50 hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-100 text-slate-700 px-4 py-3 rounded-xl text-xs transition-all text-left shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300"
              >
                {eq}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Loading */}
      {loading && <ThinkingAnimation />}

      {/* Result */}
      <AnimatePresence mode="wait">
        {result && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl px-5 py-4 flex items-center gap-3 shadow-md shadow-indigo-100">
              <Sparkles size={18} className="animate-pulse" />
              <p className="font-bold text-sm flex-1">"{result.query}"</p>
            </div>

            {result.error ? (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 text-sm font-medium">
                {result.error}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  {(result.steps || []).map((step, i) => (
                    <StepBlock key={i} step={step} index={i} total={result.steps.length} />
                  ))}
                </div>

                {result.why && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.4 }}
                    className="bg-amber-50/80 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50 rounded-2xl p-5 shadow-sm"
                  >
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-1.5 flex items-center gap-2">
                      🧠 यह विधि क्यों काम करती है?
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{result.why}</p>
                  </motion.div>
                )}

                {result.concept && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 pl-1">
                    <ChevronRight size={14} />
                    <span>अवधारणा: <strong className="text-indigo-600 dark:text-indigo-400">{result.concept}</strong></span>
                  </div>
                )}
              </div>
            )}

            <button 
              onClick={reset} 
              className="mt-2 w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-2xl py-3.5 font-bold text-sm text-slate-400 hover:text-indigo-600 transition-all dark:border-slate-800"
            >
              <RotateCcw size={16} /> नया सवाल पूछो
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
