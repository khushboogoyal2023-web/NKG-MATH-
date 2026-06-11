import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// ─── GAME 1: Speed Math ──────────────────────────────────────────
function SpeedMath() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState('');
  const [started, setStarted] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const generateProblem = useCallback(() => {
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, correct;
    if (op === '+') { a = Math.floor(Math.random() * 50) + 1; b = Math.floor(Math.random() * 50) + 1; correct = a + b; }
    else if (op === '-') { a = Math.floor(Math.random() * 50) + 10; b = Math.floor(Math.random() * a) + 1; correct = a - b; }
    else { a = Math.floor(Math.random() * 12) + 1; b = Math.floor(Math.random() * 12) + 1; correct = a * b; }
    setProblem({ a, b, op, correct });
    setAnswer('');
  }, []);

  useEffect(() => {
    if (started && timeLeft > 0) { const t = setTimeout(() => setTimeLeft(t => t - 1), 1000); return () => clearTimeout(t); }
    if (timeLeft === 0) setStarted(false);
  }, [started, timeLeft]);

  const start = () => { setScore(0); setTimeLeft(30); setStarted(true); setFeedback(null); generateProblem(); };
  const checkAnswer = () => {
    if (!answer) return;
    if (Number(answer) === problem.correct) { setScore(s => s + 1); setFeedback('✅ शाबाश!'); }
    else { setFeedback(`❌ सही: ${problem.correct}`); }
    setTimeout(() => { setFeedback(null); generateProblem(); }, 700);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-orange-200">
      <div className="text-3xl text-center mb-1">⚡</div>
      <h3 className="font-heading text-xl text-center mb-1">स्पीड गणित</h3>
      <p className="text-xs text-center text-muted-foreground font-body mb-3">30 सेकंड — जितना हल करो!</p>
      {!started && timeLeft === 30 && <Button onClick={start} className="rounded-2xl bg-orange-500 hover:bg-orange-600 font-heading text-lg w-full py-5">🚀 शुरू!</Button>}
      {!started && timeLeft === 0 && (
        <div className="text-center">
          <p className="font-heading text-4xl text-orange-600 mb-1">🏆 {score}</p>
          <p className="text-muted-foreground font-body mb-3">{score >= 10 ? '🌟 शानदार!' : score >= 5 ? '👍 अच्छा!' : '💪 और करो!'}</p>
          <Button onClick={start} className="rounded-2xl bg-orange-500 w-full">🔄 फिर खेलें</Button>
        </div>
      )}
      {started && problem && (
        <div>
          <div className="flex justify-between mb-3">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl font-bold text-sm">⭐ {score}</span>
            <span className={`px-3 py-1 rounded-xl font-bold text-sm ${timeLeft <= 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-100 text-blue-600'}`}>⏱️ {timeLeft}s</span>
          </div>
          <div className="text-center mb-3"><span className="font-heading text-4xl">{problem.a} {problem.op} {problem.b} = ?</span></div>
          <AnimatePresence>{feedback && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center font-bold mb-2">{feedback}</motion.div>}</AnimatePresence>
          <div className="flex gap-2">
            <Input type="number" value={answer} onChange={e => setAnswer(e.target.value)} onKeyDown={e => e.key === 'Enter' && checkAnswer()} placeholder="उत्तर..." className="text-center text-xl rounded-2xl h-12" autoFocus />
            <Button onClick={checkAnswer} className="rounded-2xl bg-green-500 hover:bg-green-600 h-12 px-5 font-heading text-xl">✓</Button>
          </div>
        </div>
      )}
    </Card>
  );
}

// ─── GAME 2: Number Guess ────────────────────────────────────────
function NumberGuess() {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState('');
  const [hint, setHint] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [won, setWon] = useState(false);
  const [range, setRange] = useState(100);

  const startNewGame = useCallback(() => {
    setTarget(Math.floor(Math.random() * range) + 1);
    setGuess('');
    setHint(`1 से ${range} के बीच मैंने एक नंबर सोचा है! 🤔`);
    setAttempts(0);
    setWon(false);
  }, [range]);

  useEffect(() => { startNewGame(); }, [range]);

  const makeGuess = () => {
    if (!guess) return;
    const g = Number(guess);
    setAttempts(a => a + 1);
    if (g === target) { setHint(`🎉 सही! ${attempts + 1} प्रयासों में जीत!`); setWon(true); }
    else if (g < target) setHint(`⬆️ और बड़ी! (${g} छोटी है)`);
    else setHint(`⬇️ और छोटी! (${g} बड़ी है)`);
    setGuess('');
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200">
      <div className="text-3xl text-center mb-1">🎯</div>
      <h3 className="font-heading text-xl text-center mb-1">संख्या पहचानो</h3>
      <div className="flex gap-2 justify-center mb-3">
        {[50, 100, 200].map(r => <button key={r} onClick={() => setRange(r)} className={`text-xs px-3 py-1 rounded-xl font-bold min-h-0 ${range === r ? 'bg-blue-500 text-white' : 'bg-white border'}`}>1-{r}</button>)}
      </div>
      <div className="bg-white dark:bg-card rounded-2xl p-3 mb-3 text-center border">
        <p className="font-body font-bold">{hint}</p>
        {!won && attempts > 0 && <p className="text-xs text-muted-foreground mt-1">प्रयास: {attempts}</p>}
      </div>
      {!won ? (
        <div className="flex gap-2">
          <Input type="number" value={guess} onChange={e => setGuess(e.target.value)} onKeyDown={e => e.key === 'Enter' && makeGuess()} placeholder="अंदाज़ा..." className="text-center text-xl rounded-2xl h-12" />
          <Button onClick={makeGuess} className="rounded-2xl bg-blue-500 h-12 px-5 text-xl">👁️</Button>
        </div>
      ) : (
        <Button onClick={startNewGame} className="w-full rounded-2xl bg-blue-500 py-5">🔄 नया खेल</Button>
      )}
    </Card>
  );
}

// ─── GAME 3: Table Quiz ──────────────────────────────────────────
function TableQuiz() {
  const [q, setQ] = useState(null);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const generateQ = useCallback(() => {
    const a = Math.floor(Math.random() * 12) + 2;
    const b = Math.floor(Math.random() * 12) + 1;
    const correct = a * b;
    const opts = new Set([correct]);
    while (opts.size < 4) opts.add(Math.max(1, correct + Math.floor(Math.random() * 21) - 10));
    setQ({ a, b, correct });
    setOptions([...opts].sort(() => Math.random() - 0.5));
    setAnswered(null);
  }, []);

  useEffect(() => { generateQ(); }, []);

  const pick = (val) => {
    if (answered !== null) return;
    setAnswered(val);
    setTotal(t => t + 1);
    if (val === q.correct) setScore(s => s + 1);
    setTimeout(generateQ, 1000);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-2 border-purple-200">
      <div className="text-3xl text-center mb-1">✖️</div>
      <h3 className="font-heading text-xl text-center mb-1">पहाड़ा क्विज़</h3>
      <div className="flex justify-between mb-3 text-sm font-bold">
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-xl">⭐ {score}/{total}</span>
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-xl">✅ {total > 0 ? Math.round(score/total*100) : 0}%</span>
      </div>
      {q && (
        <>
          <div className="text-center bg-white dark:bg-card rounded-2xl p-4 mb-3 border">
            <p className="font-heading text-4xl text-primary">{q.a} × {q.b} = ?</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {options.map((opt, i) => {
              let cls = 'bg-white dark:bg-card border-2 hover:bg-purple-50';
              if (answered !== null) {
                if (opt === q.correct) cls = 'bg-green-500 border-green-500 text-white';
                else if (opt === answered) cls = 'bg-red-400 border-red-400 text-white';
              }
              return <motion.button key={i} whileTap={{ scale: 0.95 }} onClick={() => pick(opt)} className={`${cls} rounded-2xl p-3 font-heading text-2xl transition-colors`}>{opt}</motion.button>;
            })}
          </div>
        </>
      )}
    </Card>
  );
}

// ─── GAME 4: Even/Odd ────────────────────────────────────────────
function EvenOdd() {
  const [num, setNum] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const next = () => setNum(Math.floor(Math.random() * 999) + 1);
  useEffect(() => { next(); }, []);

  const answer = (choice) => {
    const correct = num % 2 === 0 ? 'even' : 'odd';
    setTotal(t => t + 1);
    if (choice === correct) { setScore(s => s + 1); setFeedback('✅ सही!'); }
    else { setFeedback(`❌ ${num} ${correct === 'even' ? 'सम' : 'विषम'} है`); }
    setTimeout(() => { setFeedback(''); next(); }, 800);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200">
      <div className="text-3xl text-center mb-1">🔄</div>
      <h3 className="font-heading text-xl text-center mb-1">सम या विषम?</h3>
      <span className="block text-center bg-green-100 text-green-700 px-3 py-1 rounded-xl font-bold text-sm mb-3 w-fit mx-auto">⭐ {score}/{total}</span>
      <div className="text-center bg-white dark:bg-card rounded-2xl p-6 mb-3 border">
        <p className="font-heading text-6xl text-green-600">{num}</p>
        <AnimatePresence>{feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold mt-2">{feedback}</motion.p>}</AnimatePresence>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button onClick={() => answer('even')} className="rounded-2xl bg-blue-500 hover:bg-blue-600 font-heading text-lg py-5">सम ✌️</Button>
        <Button onClick={() => answer('odd')} className="rounded-2xl bg-pink-500 hover:bg-pink-600 font-heading text-lg py-5">विषम ✋</Button>
      </div>
    </Card>
  );
}

// ─── GAME 5: Missing Number ──────────────────────────────────────
function MissingNumber() {
  const [q, setQ] = useState(null);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const gen = () => {
    const types = ['ap', 'gp', 'square', 'custom'];
    const t = types[Math.floor(Math.random() * types.length)];
    let seq;
    if (t === 'ap') {
      const start = Math.floor(Math.random() * 20) + 1;
      const step = [2, 3, 4, 5, 10][Math.floor(Math.random() * 5)];
      seq = Array.from({ length: 5 }, (_, i) => start + i * step);
    } else if (t === 'gp') {
      const start = Math.floor(Math.random() * 3) + 1;
      const r = [2, 3][Math.floor(Math.random() * 2)];
      seq = Array.from({ length: 5 }, (_, i) => start * Math.pow(r, i));
    } else if (t === 'square') {
      const start = Math.floor(Math.random() * 5) + 1;
      seq = Array.from({ length: 5 }, (_, i) => (start + i) * (start + i));
    } else {
      const start = Math.floor(Math.random() * 10) + 2;
      seq = Array.from({ length: 5 }, (_, i) => start + i * 5);
    }
    const hideIdx = Math.floor(Math.random() * 5);
    const display = seq.map((n, i) => i === hideIdx ? '?' : n);
    setQ({ seq, hideIdx, answer: seq[hideIdx], display });
    setInput('');
    setFeedback('');
  };

  useEffect(() => { gen(); }, []);

  const check = () => {
    if (!input) return;
    if (Number(input) === q.answer) { setScore(s => s + 1); setFeedback('✅ शाबाश!'); }
    else setFeedback(`❌ सही: ${q.answer}`);
    setTimeout(gen, 1000);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-2 border-amber-200">
      <div className="text-3xl text-center mb-1">🔍</div>
      <h3 className="font-heading text-xl text-center mb-1">गायब संख्या</h3>
      <div className="text-center mb-3"><span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-xl font-bold text-sm">⭐ {score}</span></div>
      {q && (
        <>
          <div className="flex justify-center gap-2 mb-4 flex-wrap">
            {q.display.map((n, i) => (
              <div key={i} className={`w-14 h-14 rounded-2xl flex items-center justify-center font-heading text-xl shadow-sm
                ${n === '?' ? 'bg-amber-400 text-white animate-pulse' : 'bg-white dark:bg-card border-2 border-amber-200'}`}>{n}</div>
            ))}
          </div>
          <AnimatePresence>{feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-bold mb-2">{feedback}</motion.p>}</AnimatePresence>
          <div className="flex gap-2">
            <Input type="number" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()} placeholder="? = ?" className="text-center text-xl rounded-2xl h-12" />
            <Button onClick={check} className="rounded-2xl bg-amber-500 hover:bg-amber-600 h-12 px-5 text-xl">✓</Button>
          </div>
        </>
      )}
    </Card>
  );
}

// ─── GAME 6: Prime Checker ───────────────────────────────────────
function PrimeChecker() {
  const [num, setNum] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const isPrime = n => { if (n < 2) return false; for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false; return true; };
  const next = () => { setNum(Math.floor(Math.random() * 98) + 2); setFeedback(''); };
  useEffect(() => { next(); }, []);

  const answer = (choice) => {
    const correct = isPrime(num);
    setTotal(t => t + 1);
    if ((choice === 'prime') === correct) { setScore(s => s + 1); setFeedback(`✅ सही! ${num} ${correct ? 'अभाज्य' : 'भाज्य'} है`); }
    else { setFeedback(`❌ ${num} ${correct ? 'अभाज्य' : 'भाज्य'} है`); }
    setTimeout(next, 1200);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200">
      <div className="text-3xl text-center mb-1">🔑</div>
      <h3 className="font-heading text-xl text-center mb-1">अभाज्य या भाज्य?</h3>
      <span className="block text-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-xl font-bold text-sm mb-3 w-fit mx-auto">⭐ {score}/{total}</span>
      <div className="text-center bg-white dark:bg-card rounded-2xl p-6 mb-3 border">
        <p className="font-heading text-6xl text-indigo-600">{num}</p>
        <AnimatePresence>{feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold mt-2 text-sm">{feedback}</motion.p>}</AnimatePresence>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button onClick={() => answer('prime')} className="rounded-2xl bg-indigo-500 hover:bg-indigo-600 font-heading py-5">अभाज्य 🔑</Button>
        <Button onClick={() => answer('notprime')} className="rounded-2xl bg-orange-500 hover:bg-orange-600 font-heading py-5">भाज्य ÷</Button>
      </div>
    </Card>
  );
}

// ─── GAME 7: Math Chain ──────────────────────────────────────────
function MathChain() {
  const [chain, setChain] = useState([]);
  const [current, setCurrent] = useState(null);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const ops = [
    { sym: '+', fn: (a,b) => a+b }, { sym: '-', fn: (a,b) => a-b },
    { sym: '×', fn: (a,b) => a*b }, { sym: '÷', fn: (a,b) => Math.floor(a/b) }
  ];

  const newChain = () => {
    const start = Math.floor(Math.random() * 20) + 1;
    const steps = [];
    let val = start;
    for (let i = 0; i < 4; i++) {
      const op = ops[Math.floor(Math.random() * (i < 2 ? 3 : 2))];
      let b = Math.floor(Math.random() * 9) + 1;
      if (op.sym === '÷') { while (val % b !== 0) b = Math.floor(Math.random() * 9) + 1; }
      if (op.sym === '-' && b > val) b = Math.floor(val / 2) || 1;
      const result = op.fn(val, b);
      steps.push({ op: op.sym, b, from: val, result });
      val = result;
    }
    setChain(steps);
    setCurrent(0);
    setInput('');
    setFeedback('');
  };

  useEffect(() => { newChain(); }, []);

  const check = () => {
    if (!input || !chain[current]) return;
    if (Number(input) === chain[current].result) {
      setScore(s => s + 1);
      setFeedback('✅');
      if (current + 1 >= chain.length) { setTimeout(() => { setFeedback('🏆 Chain Complete!'); setTimeout(newChain, 1000); }, 300); }
      else { setTimeout(() => { setCurrent(c => c + 1); setInput(''); setFeedback(''); }, 500); }
    } else { setFeedback(`❌ सही: ${chain[current].result}`); setTimeout(() => { setInput(''); setFeedback(''); }, 800); }
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border-2 border-cyan-200">
      <div className="text-3xl text-center mb-1">⛓️</div>
      <h3 className="font-heading text-xl text-center mb-1">गणित श्रृंखला</h3>
      <span className="block text-center bg-cyan-100 text-cyan-700 px-3 py-1 rounded-xl font-bold text-sm mb-3 w-fit mx-auto">⭐ {score}</span>
      {chain.length > 0 && current !== null && current < chain.length && (
        <>
          <div className="flex gap-1 mb-3 justify-center flex-wrap">
            {chain.map((step, i) => (
              <div key={i} className={`px-2 py-1 rounded-lg text-xs font-bold ${i < current ? 'bg-green-200 text-green-800' : i === current ? 'bg-cyan-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                {i < current ? step.result : i === current ? `${step.from} ${step.op} ${step.b}` : '?'}
              </div>
            ))}
          </div>
          <div className="text-center bg-white dark:bg-card rounded-2xl p-3 mb-3 border">
            <p className="font-heading text-2xl">{chain[current].from} {chain[current].op} {chain[current].b} = ?</p>
          </div>
          <AnimatePresence>{feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-bold mb-2">{feedback}</motion.p>}</AnimatePresence>
          <div className="flex gap-2">
            <Input type="number" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()} placeholder="उत्तर..." className="text-center text-xl rounded-2xl h-12" autoFocus />
            <Button onClick={check} className="rounded-2xl bg-cyan-500 h-12 px-5 text-xl">✓</Button>
          </div>
        </>
      )}
    </Card>
  );
}

// ─── GAME 8: Fraction Match ──────────────────────────────────────
function FractionMatch() {
  const fractions = [
    { frac: '1/2', decimal: 0.5, percent: '50%' },
    { frac: '1/4', decimal: 0.25, percent: '25%' },
    { frac: '3/4', decimal: 0.75, percent: '75%' },
    { frac: '1/5', decimal: 0.2, percent: '20%' },
    { frac: '2/5', decimal: 0.4, percent: '40%' },
    { frac: '1/3', decimal: 0.333, percent: '33%' },
    { frac: '2/3', decimal: 0.667, percent: '67%' },
    { frac: '1/10', decimal: 0.1, percent: '10%' },
  ];

  const [q, setQ] = useState(null);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [mode, setMode] = useState('decimal'); // 'decimal' | 'percent'

  const gen = useCallback(() => {
    const correct = fractions[Math.floor(Math.random() * fractions.length)];
    const wrong = fractions.filter(f => f.frac !== correct.frac).sort(() => Math.random() - 0.5).slice(0, 3);
    const opts = [...wrong, correct].sort(() => Math.random() - 0.5);
    setQ(correct);
    setOptions(opts);
    setAnswered(null);
  }, [mode]);

  useEffect(() => { gen(); }, [mode]);

  const pick = (f) => {
    if (answered) return;
    setAnswered(f.frac);
    setTotal(t => t + 1);
    if (f.frac === q.frac) setScore(s => s + 1);
    setTimeout(gen, 1000);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border-2 border-rose-200">
      <div className="text-3xl text-center mb-1">🍕</div>
      <h3 className="font-heading text-xl text-center mb-1">भिन्न मिलाओ</h3>
      <div className="flex gap-2 justify-center mb-3">
        <button onClick={() => setMode('decimal')} className={`text-xs px-3 py-1 rounded-xl font-bold min-h-0 ${mode==='decimal'?'bg-rose-500 text-white':'bg-white border'}`}>दशमलव</button>
        <button onClick={() => setMode('percent')} className={`text-xs px-3 py-1 rounded-xl font-bold min-h-0 ${mode==='percent'?'bg-rose-500 text-white':'bg-white border'}`}>प्रतिशत</button>
      </div>
      <div className="flex justify-between mb-3 text-sm font-bold">
        <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-xl">⭐ {score}/{total}</span>
      </div>
      {q && (
        <>
          <div className="text-center bg-white dark:bg-card rounded-2xl p-4 mb-3 border">
            <p className="font-heading text-4xl text-rose-600">{mode === 'decimal' ? q.decimal : q.percent}</p>
            <p className="text-sm text-muted-foreground font-body mt-1">{mode === 'decimal' ? 'इस दशमलव का भिन्न क्या है?' : 'इस प्रतिशत का भिन्न क्या है?'}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {options.map((opt, i) => {
              let cls = 'bg-white dark:bg-card border-2 hover:bg-rose-50 rounded-2xl p-3 font-heading text-2xl transition-colors';
              if (answered) {
                if (opt.frac === q.frac) cls += ' !bg-green-500 !border-green-500 text-white';
                else if (opt.frac === answered) cls += ' !bg-red-400 !border-red-400 text-white';
              }
              return <button key={i} onClick={() => pick(opt)} className={cls}>{opt.frac}</button>;
            })}
          </div>
        </>
      )}
    </Card>
  );
}

// ─── GAME 9: Square Cube Quiz ────────────────────────────────────
function SquareCubeQuiz() {
  const [q, setQ] = useState(null);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const gen = useCallback(() => {
    const isCube = Math.random() > 0.5;
    const n = isCube ? Math.floor(Math.random() * 10) + 1 : Math.floor(Math.random() * 15) + 1;
    const correct = isCube ? n * n * n : n * n;
    const wrong = new Set([correct]);
    while (wrong.size < 4) wrong.add(Math.max(1, correct + Math.floor(Math.random() * (correct * 0.4)) - Math.floor(correct * 0.2)));
    setQ({ n, isCube, correct });
    setOptions([...wrong].sort(() => Math.random() - 0.5));
    setAnswered(null);
  }, []);

  useEffect(() => { gen(); }, []);

  const pick = (val) => {
    if (answered !== null) return;
    setAnswered(val);
    setTotal(t => t + 1);
    if (val === q.correct) setScore(s => s + 1);
    setTimeout(gen, 1000);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 border-2 border-violet-200">
      <div className="text-3xl text-center mb-1">⭐</div>
      <h3 className="font-heading text-xl text-center mb-1">वर्ग और घन</h3>
      <div className="flex justify-between mb-3 text-sm font-bold">
        <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-xl">⭐ {score}/{total}</span>
      </div>
      {q && (
        <>
          <div className="text-center bg-white dark:bg-card rounded-2xl p-4 mb-3 border">
            <p className="font-heading text-4xl text-violet-600">{q.n}{q.isCube ? '³' : '²'} = ?</p>
            <p className="text-sm text-muted-foreground font-body">{q.isCube ? `${q.n} का घन` : `${q.n} का वर्ग`}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {options.map((opt, i) => {
              let cls = 'bg-white dark:bg-card border-2 rounded-2xl p-3 font-heading text-xl transition-colors';
              if (answered !== null) {
                if (opt === q.correct) cls += ' !bg-green-500 !border-green-500 text-white';
                else if (opt === answered) cls += ' !bg-red-400 !border-red-400 text-white';
              } else cls += ' hover:bg-violet-50';
              return <button key={i} onClick={() => pick(opt)} className={cls}>{opt}</button>;
            })}
          </div>
        </>
      )}
    </Card>
  );
}

// ─── GAME 10: Time Quiz ───────────────────────────────────────────
function TimeQuiz() {
  const questions = [
    { q: '1 घंटा = ? मिनट', a: 60, opts: [30, 45, 60, 120] },
    { q: '1 मिनट = ? सेकंड', a: 60, opts: [30, 60, 90, 100] },
    { q: '1 दिन = ? घंटे', a: 24, opts: [12, 20, 24, 36] },
    { q: '1 सप्ताह = ? दिन', a: 7, opts: [5, 6, 7, 8] },
    { q: '1 वर्ष = ? महीने', a: 12, opts: [10, 11, 12, 13] },
    { q: '1 वर्ष = ? दिन', a: 365, opts: [300, 350, 365, 400] },
    { q: '1 दशक = ? वर्ष', a: 10, opts: [5, 10, 20, 100] },
    { q: '1 शताब्दी = ? वर्ष', a: 100, opts: [10, 50, 100, 1000] },
  ];

  const [qi, setQi] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);

  const pick = (val) => {
    if (answered !== null) return;
    setAnswered(val);
    if (val === questions[qi].a) setScore(s => s + 1);
    setTimeout(() => { setAnswered(null); setQi(q => (q + 1) % questions.length); }, 1000);
  };

  const q = questions[qi];
  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border-2 border-sky-200">
      <div className="text-3xl text-center mb-1">⏰</div>
      <h3 className="font-heading text-xl text-center mb-1">समय क्विज़</h3>
      <div className="flex justify-between mb-3 text-sm font-bold">
        <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-xl">⭐ {score}</span>
        <span className="text-muted-foreground text-xs font-body">{qi + 1}/{questions.length}</span>
      </div>
      <div className="text-center bg-white dark:bg-card rounded-2xl p-4 mb-3 border">
        <p className="font-heading text-2xl text-sky-600">{q.q}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {q.opts.map((opt, i) => {
          let cls = 'bg-white dark:bg-card border-2 rounded-2xl p-3 font-heading text-2xl transition-colors';
          if (answered !== null) {
            if (opt === q.a) cls += ' !bg-green-500 !border-green-500 text-white';
            else if (opt === answered) cls += ' !bg-red-400 !border-red-400 text-white';
          } else cls += ' hover:bg-sky-50';
          return <button key={i} onClick={() => pick(opt)} className={cls}>{opt}</button>;
        })}
      </div>
    </Card>
  );
}

// ─── GAME 11: Geometry Quick ─────────────────────────────────────
function GeometryQuick() {
  const questions = [
    { q: 'त्रिभुज के कोणों का योग?', a: '180°', opts: ['90°', '180°', '270°', '360°'] },
    { q: 'वर्ग की कितनी भुजाएं?', a: '4', opts: ['3', '4', '5', '6'] },
    { q: 'वृत्त का क्षेत्रफल सूत्र?', a: 'πr²', opts: ['2πr', 'πr²', 'πd', '4πr'] },
    { q: 'चतुर्भुज के कोणों का योग?', a: '360°', opts: ['180°', '270°', '360°', '540°'] },
    { q: 'समबाहु त्रिभुज का कोण?', a: '60°', opts: ['45°', '60°', '90°', '120°'] },
    { q: 'पाइथागोरस प्रमेय?', a: 'a²+b²=c²', opts: ['a+b=c', 'a²+b²=c²', 'a²-b²=c²', '2a+b=c'] },
    { q: 'वृत्त की परिधि?', a: '2πr', opts: ['πr²', '2πr', 'πd²', '4πr'] },
    { q: 'आयत का क्षेत्रफल?', a: 'l×b', opts: ['l+b', '2(l+b)', 'l×b', 'l²'] },
  ];

  const [qi, setQi] = useState(Math.floor(Math.random() * questions.length));
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const pick = (val) => {
    if (answered !== null) return;
    setAnswered(val);
    setTotal(t => t + 1);
    if (val === questions[qi].a) setScore(s => s + 1);
    setTimeout(() => { setAnswered(null); setQi(Math.floor(Math.random() * questions.length)); }, 1000);
  };

  const q = questions[qi];
  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-2 border-teal-200">
      <div className="text-3xl text-center mb-1">📐</div>
      <h3 className="font-heading text-xl text-center mb-1">ज्यामिति क्विज़</h3>
      <div className="flex justify-between mb-3 text-sm font-bold">
        <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-xl">⭐ {score}/{total}</span>
      </div>
      <div className="text-center bg-white dark:bg-card rounded-2xl p-4 mb-3 border">
        <p className="font-heading text-xl text-teal-600">{q.q}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {q.opts.map((opt, i) => {
          let cls = 'bg-white dark:bg-card border-2 rounded-2xl p-3 font-heading text-lg transition-colors';
          if (answered !== null) {
            if (opt === q.a) cls += ' !bg-green-500 !border-green-500 text-white';
            else if (opt === answered) cls += ' !bg-red-400 !border-red-400 text-white';
          } else cls += ' hover:bg-teal-50';
          return <button key={i} onClick={() => pick(opt)} className={cls}>{opt}</button>;
        })}
      </div>
    </Card>
  );
}

// ─── GAME 12: Mental Math Vedic ──────────────────────────────────
function VedicQuickGame() {
  const gen = () => {
    const n = Math.floor(Math.random() * 9) + 1;
    return { n, answer: (n * 10 + 5) * (n * 10 + 5), question: `${n}5 × ${n}5 = ?` };
  };

  const [q, setQ] = useState(gen());
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [hint, setHint] = useState(false);

  const check = () => {
    if (!input) return;
    if (Number(input) === q.answer) { setScore(s => s + 1); setFeedback('✅ वैदिक विजेता!'); }
    else { setFeedback(`❌ सही: ${q.answer}`); }
    setTimeout(() => { setQ(gen()); setInput(''); setFeedback(''); setHint(false); }, 1000);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-2 border-orange-200">
      <div className="text-3xl text-center mb-1">🕉️</div>
      <h3 className="font-heading text-xl text-center mb-1">वैदिक स्पीड</h3>
      <p className="text-xs text-center text-muted-foreground font-body mb-2">एकाधिकेन सूत्र — n5 × n5</p>
      <span className="block text-center bg-orange-100 text-orange-700 px-3 py-1 rounded-xl font-bold text-sm mb-3 w-fit mx-auto">⭐ {score}</span>
      <div className="text-center bg-white dark:bg-card rounded-2xl p-4 mb-2 border">
        <p className="font-heading text-3xl text-orange-600">{q.question}</p>
      </div>
      {hint && (
        <div className="bg-orange-100 rounded-xl p-2 mb-2 text-xs font-body text-orange-800">
          💡 संकेत: n={q.n}, {q.n}×{q.n+1}={q.n*(q.n+1)}, फिर 25 लगाओ = {q.n*(q.n+1)}25
        </div>
      )}
      <button onClick={() => setHint(!hint)} className="text-xs text-orange-500 underline mb-2 min-h-0 min-w-0 block mx-auto">{hint ? 'संकेत छुपाओ' : '💡 संकेत चाहिए?'}</button>
      <AnimatePresence>{feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-bold mb-2">{feedback}</motion.p>}</AnimatePresence>
      <div className="flex gap-2">
        <Input type="number" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()} placeholder="उत्तर..." className="text-center text-xl rounded-2xl h-12" autoFocus />
        <Button onClick={check} className="rounded-2xl bg-orange-500 h-12 px-5 text-xl">✓</Button>
      </div>
    </Card>
  );
}

// ─── GAME 13: Division Race ───────────────────────────────────────
function DivisionRace() {
  const gen = () => {
    const b = Math.floor(Math.random() * 9) + 2;
    const q2 = Math.floor(Math.random() * 12) + 1;
    const a = b * q2;
    return { a, b, answer: q2 };
  };
  const [q, setQ] = useState(gen());
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const check = () => {
    if (!input) return;
    if (Number(input) === q.answer) { setScore(s => s + 1); setFeedback('✅'); }
    else { setFeedback(`❌ ${q.answer}`); }
    setTimeout(() => { setQ(gen()); setInput(''); setFeedback(''); }, 800);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20 border-2 border-lime-200">
      <div className="text-3xl text-center mb-1">➗</div>
      <h3 className="font-heading text-xl text-center mb-1">भाग दौड़</h3>
      <span className="block text-center bg-lime-100 text-lime-700 px-3 py-1 rounded-xl font-bold text-sm mb-3 w-fit mx-auto">⭐ {score}</span>
      <div className="text-center bg-white dark:bg-card rounded-2xl p-4 mb-3 border">
        <p className="font-heading text-4xl">{q.a} ÷ {q.b} = ?</p>
      </div>
      <AnimatePresence>{feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-bold mb-2">{feedback}</motion.p>}</AnimatePresence>
      <div className="flex gap-2">
        <Input type="number" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()} placeholder="उत्तर..." className="text-center text-xl rounded-2xl h-12" autoFocus />
        <Button onClick={check} className="rounded-2xl bg-lime-600 h-12 px-5 text-xl">✓</Button>
      </div>
    </Card>
  );
}

// ─── GAME 14: Area Calculator Game ───────────────────────────────
function AreaGame() {
  const shapes = [
    { name: 'वर्ग', gen: () => { const s = Math.floor(Math.random()*10)+2; return { question: `वर्ग भुजा = ${s} cm, क्षेत्रफल?`, answer: s*s, hint: `भुजा² = ${s}² = ${s*s}` }; } },
    { name: 'आयत', gen: () => { const l = Math.floor(Math.random()*10)+2; const b = Math.floor(Math.random()*8)+2; return { question: `आयत l=${l}, b=${b}, क्षेत्रफल?`, answer: l*b, hint: `l×b = ${l}×${b} = ${l*b}` }; } },
    { name: 'त्रिभुज', gen: () => { const b = (Math.floor(Math.random()*5)+2)*2; const h = Math.floor(Math.random()*8)+2; return { question: `त्रिभुज आधार=${b}, ऊंचाई=${h}, क्षेत्रफल?`, answer: b*h/2, hint: `½×b×h = ½×${b}×${h} = ${b*h/2}` }; } },
  ];

  const genQ = () => { const s = shapes[Math.floor(Math.random()*shapes.length)]; return s.gen(); };
  const [q, setQ] = useState(genQ());
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const check = () => {
    if (!input) return;
    if (Number(input) === q.answer) { setScore(s => s + 1); setFeedback(`✅ ${q.answer} cm²`); }
    else { setFeedback(`❌ सही: ${q.answer} cm²`); }
    setTimeout(() => { setQ(genQ()); setInput(''); setFeedback(''); setShowHint(false); }, 1000);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-fuchsia-50 to-purple-50 dark:from-fuchsia-900/20 dark:to-purple-900/20 border-2 border-fuchsia-200">
      <div className="text-3xl text-center mb-1">📐</div>
      <h3 className="font-heading text-xl text-center mb-1">क्षेत्रफल खेल</h3>
      <span className="block text-center bg-fuchsia-100 text-fuchsia-700 px-3 py-1 rounded-xl font-bold text-sm mb-3 w-fit mx-auto">⭐ {score}</span>
      <div className="text-center bg-white dark:bg-card rounded-2xl p-4 mb-2 border">
        <p className="font-heading text-xl text-fuchsia-600">{q.question}</p>
      </div>
      {showHint && <div className="bg-fuchsia-100 rounded-xl p-2 mb-2 text-xs font-body text-fuchsia-800">💡 {q.hint}</div>}
      <button onClick={() => setShowHint(!showHint)} className="text-xs text-fuchsia-500 underline mb-2 min-h-0 min-w-0 block mx-auto">{showHint ? 'छुपाओ' : '💡 hint'}</button>
      <AnimatePresence>{feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-bold mb-2">{feedback}</motion.p>}</AnimatePresence>
      <div className="flex gap-2">
        <Input type="number" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()} placeholder="cm²..." className="text-center text-xl rounded-2xl h-12" autoFocus />
        <Button onClick={check} className="rounded-2xl bg-fuchsia-500 h-12 px-5 text-xl">✓</Button>
      </div>
    </Card>
  );
}

// ─── GAME 15: Percentage Blitz ────────────────────────────────────
function PercentageBlitz() {
  const gen = () => {
    const percents = [10, 20, 25, 50, 75, 5, 15, 30];
    const p = percents[Math.floor(Math.random() * percents.length)];
    const nums = [100, 200, 400, 500, 80, 60, 120, 300];
    const n = nums[Math.floor(Math.random() * nums.length)];
    return { p, n, answer: Math.round(n * p / 100) };
  };

  const [q, setQ] = useState(gen());
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const check = () => {
    if (!input) return;
    if (Number(input) === q.answer) { setScore(s => s + 1); setFeedback('✅ सटीक!'); }
    else { setFeedback(`❌ ${q.answer}`); }
    setTimeout(() => { setQ(gen()); setInput(''); setFeedback(''); }, 800);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-2 border-red-200">
      <div className="text-3xl text-center mb-1">💯</div>
      <h3 className="font-heading text-xl text-center mb-1">प्रतिशत ब्लिट्ज़</h3>
      <span className="block text-center bg-red-100 text-red-700 px-3 py-1 rounded-xl font-bold text-sm mb-3 w-fit mx-auto">⭐ {score}</span>
      <div className="text-center bg-white dark:bg-card rounded-2xl p-4 mb-3 border">
        <p className="font-heading text-3xl text-red-600">{q.p}% of {q.n} = ?</p>
      </div>
      <AnimatePresence>{feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-bold mb-2">{feedback}</motion.p>}</AnimatePresence>
      <div className="flex gap-2">
        <Input type="number" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()} placeholder="उत्तर..." className="text-center text-xl rounded-2xl h-12" autoFocus />
        <Button onClick={check} className="rounded-2xl bg-red-500 h-12 px-5 text-xl">✓</Button>
      </div>
    </Card>
  );
}

// ─── GAME 16: LCM HCF Quiz ───────────────────────────────────────
function LcmHcfGame() {
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const lcm = (a, b) => a * b / gcd(a, b);

  const gen = () => {
    const a = Math.floor(Math.random() * 10) + 2;
    const b = Math.floor(Math.random() * 10) + 2;
    const isLcm = Math.random() > 0.5;
    const answer = isLcm ? lcm(a, b) : gcd(a, b);
    return { a, b, isLcm, answer };
  };

  const [q, setQ] = useState(gen());
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const check = () => {
    if (!input) return;
    if (Number(input) === q.answer) { setScore(s => s + 1); setFeedback('✅'); }
    else { setFeedback(`❌ ${q.answer}`); }
    setTimeout(() => { setQ(gen()); setInput(''); setFeedback(''); }, 800);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 border-2 border-blue-200">
      <div className="text-3xl text-center mb-1">🔗</div>
      <h3 className="font-heading text-xl text-center mb-1">LCM & HCF खेल</h3>
      <span className="block text-center bg-blue-100 text-blue-700 px-3 py-1 rounded-xl font-bold text-sm mb-3 w-fit mx-auto">⭐ {score}</span>
      <div className="text-center bg-white dark:bg-card rounded-2xl p-4 mb-3 border">
        <p className="font-heading text-3xl text-blue-600">{q.isLcm ? 'LCM' : 'HCF'}({q.a}, {q.b}) = ?</p>
      </div>
      <AnimatePresence>{feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-bold mb-2">{feedback}</motion.p>}</AnimatePresence>
      <div className="flex gap-2">
        <Input type="number" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()} placeholder="उत्तर..." className="text-center text-xl rounded-2xl h-12" autoFocus />
        <Button onClick={check} className="rounded-2xl bg-blue-500 h-12 px-5 text-xl">✓</Button>
      </div>
    </Card>
  );
}

// ─── GAME 17: Algebra Solve ───────────────────────────────────────
function AlgebraSolve() {
  const gen = () => {
    const x = Math.floor(Math.random() * 10) + 1;
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const c = a * x + b;
    return { a, b, c, answer: x, question: `${a}x + ${b} = ${c}` };
  };

  const [q, setQ] = useState(gen());
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const check = () => {
    if (!input) return;
    if (Number(input) === q.answer) { setScore(s => s + 1); setFeedback(`✅ x = ${q.answer}`); }
    else { setFeedback(`❌ x = ${q.answer}`); }
    setTimeout(() => { setQ(gen()); setInput(''); setFeedback(''); }, 1000);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border-2 border-violet-200">
      <div className="text-3xl text-center mb-1">🔤</div>
      <h3 className="font-heading text-xl text-center mb-1">x निकालो</h3>
      <span className="block text-center bg-violet-100 text-violet-700 px-3 py-1 rounded-xl font-bold text-sm mb-3 w-fit mx-auto">⭐ {score}</span>
      <div className="text-center bg-white dark:bg-card rounded-2xl p-4 mb-3 border">
        <p className="font-heading text-3xl text-violet-600">{q.question}</p>
        <p className="text-sm text-muted-foreground font-body mt-1">x = ?</p>
      </div>
      <AnimatePresence>{feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-bold mb-2">{feedback}</motion.p>}</AnimatePresence>
      <div className="flex gap-2">
        <Input type="number" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()} placeholder="x = ?" className="text-center text-xl rounded-2xl h-12" autoFocus />
        <Button onClick={check} className="rounded-2xl bg-violet-500 h-12 px-5 text-xl">✓</Button>
      </div>
    </Card>
  );
}

// ─── GAME 18: Roman Numerals ──────────────────────────────────────
function RomanNumerals() {
  const toRoman = n => {
    const vals = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
    let res = '';
    vals.forEach(([v,s]) => { while (n >= v) { res += s; n -= v; } });
    return res;
  };

  const gen = () => {
    const n = Math.floor(Math.random() * 40) + 1;
    return { n, roman: toRoman(n) };
  };

  const [q, setQ] = useState(gen());
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState('toRoman'); // 'toRoman' | 'toNum'

  const check = () => {
    if (!input) return;
    if (mode === 'toRoman') {
      if (input.toUpperCase() === q.roman) { setScore(s => s + 1); setFeedback(`✅ ${q.roman}`); }
      else { setFeedback(`❌ ${q.roman}`); }
    } else {
      if (Number(input) === q.n) { setScore(s => s + 1); setFeedback(`✅ ${q.n}`); }
      else { setFeedback(`❌ ${q.n}`); }
    }
    setTimeout(() => { setQ(gen()); setInput(''); setFeedback(''); }, 1000);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200">
      <div className="text-3xl text-center mb-1">🏛️</div>
      <h3 className="font-heading text-xl text-center mb-1">रोमन संख्याएं</h3>
      <div className="flex gap-2 justify-center mb-3">
        <button onClick={() => setMode('toRoman')} className={`text-xs px-3 py-1 rounded-xl font-bold min-h-0 ${mode==='toRoman'?'bg-amber-500 text-white':'bg-white border'}`}>→ Roman</button>
        <button onClick={() => setMode('toNum')} className={`text-xs px-3 py-1 rounded-xl font-bold min-h-0 ${mode==='toNum'?'bg-amber-500 text-white':'bg-white border'}`}>Roman →</button>
      </div>
      <span className="block text-center bg-amber-100 text-amber-700 px-3 py-1 rounded-xl font-bold text-sm mb-3 w-fit mx-auto">⭐ {score}</span>
      <div className="text-center bg-white dark:bg-card rounded-2xl p-4 mb-3 border">
        <p className="font-heading text-4xl text-amber-600">{mode === 'toRoman' ? q.n : q.roman}</p>
        <p className="text-sm text-muted-foreground font-body">{mode === 'toRoman' ? 'Roman में लिखो' : 'अंक में लिखो'}</p>
      </div>
      <AnimatePresence>{feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-bold mb-2">{feedback}</motion.p>}</AnimatePresence>
      <div className="flex gap-2">
        <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()} placeholder={mode === 'toRoman' ? 'जैसे: XIV' : 'अंक...'} className="text-center text-xl rounded-2xl h-12" autoFocus />
        <Button onClick={check} className="rounded-2xl bg-amber-500 h-12 px-5 text-xl">✓</Button>
      </div>
    </Card>
  );
}

// ─── GAME 19: Word Problems ───────────────────────────────────────
function WordProblems() {
  const problems = [
    { q: 'राम के पास 45 आम थे। उसने 18 दिए। कितने बचे?', a: 27 },
    { q: 'एक दुकान में 12 पंक्तियाँ हैं, हर पंक्ति में 8 डिब्बे। कुल डिब्बे?', a: 96 },
    { q: '5 मित्रों ने ₹120 बराबर बाँटे। हर एक को कितना मिला?', a: 24 },
    { q: 'एक रेलगाड़ी 60 km/h की रफ्तार से 3 घंटे चली। दूरी?', a: 180 },
    { q: '24 बच्चों को 4 टीमों में बाँटना है। हर टीम में कितने?', a: 6 },
    { q: 'एक किताब ₹240 में मिली। 25% छूट पर कितने?', a: 180 },
    { q: 'पेड़ की ऊंचाई 15 m है। परछाई 20 m है। 9 m ऊंचे पेड़ की परछाई?', a: 12 },
    { q: '15 मीटर कपड़ा ₹1200 में। 1 मीटर कितने में?', a: 80 },
  ];

  const [qi, setQi] = useState(Math.floor(Math.random() * problems.length));
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const check = () => {
    if (!input) return;
    setTotal(t => t + 1);
    if (Number(input) === problems[qi].a) { setScore(s => s + 1); setFeedback(`✅ ${problems[qi].a}`); }
    else { setFeedback(`❌ सही: ${problems[qi].a}`); }
    setTimeout(() => { setQi(Math.floor(Math.random() * problems.length)); setInput(''); setFeedback(''); }, 1200);
  };

  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-2 border-green-200">
      <div className="text-3xl text-center mb-1">📖</div>
      <h3 className="font-heading text-xl text-center mb-1">शब्द समस्याएं</h3>
      <div className="flex justify-between mb-3 text-sm font-bold">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl">⭐ {score}/{total}</span>
      </div>
      <div className="bg-white dark:bg-card rounded-2xl p-4 mb-3 border">
        <p className="font-body text-sm leading-relaxed">{problems[qi].q}</p>
      </div>
      <AnimatePresence>{feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-bold mb-2">{feedback}</motion.p>}</AnimatePresence>
      <div className="flex gap-2">
        <Input type="number" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()} placeholder="उत्तर..." className="text-center text-xl rounded-2xl h-12" autoFocus />
        <Button onClick={check} className="rounded-2xl bg-green-500 h-12 px-5 text-xl">✓</Button>
      </div>
    </Card>
  );
}

// ─── GAME 20: Math Trivia ─────────────────────────────────────────
function MathTrivia() {
  const trivia = [
    { q: '1729 किस गणितज्ञ से जुड़ी है?', a: 'रामानुजन', opts: ['यूलर', 'रामानुजन', 'गॉस', 'Newton'] },
    { q: 'π का मान किसने 3.1416 दिया?', a: 'आर्यभट्ट', opts: ['यूक्लिड', 'पाइथागोरस', 'आर्यभट्ट', 'आर्किमिडीज़'] },
    { q: 'Fields Medal किसे मिलती है?', a: 'गणितज्ञ को', opts: ['भौतिकशास्त्री', 'रसायनशास्त्री', 'गणितज्ञ को', 'इंजीनियर'] },
    { q: 'eⁱπ + 1 = ? (Euler\'s Identity)', a: '0', opts: ['1', '0', 'e', 'π'] },
    { q: 'Fibonacci श्रेणी का 8वाँ पद?', a: '21', opts: ['13', '21', '34', '8'] },
    { q: 'सबसे छोटी सम अभाज्य संख्या?', a: '2', opts: ['0', '1', '2', '4'] },
    { q: 'पाइथागोरस त्रिक (3,4,?)', a: '5', opts: ['6', '5', '7', '8'] },
    { q: '(a+b)² का विस्तार?', a: 'a²+2ab+b²', opts: ['a²+b²', 'a²+2ab+b²', 'a²-2ab+b²', '2a+2b'] },
  ];

  const [qi, setQi] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const pick = (val) => {
    if (answered) return;
    setAnswered(val);
    setTotal(t => t + 1);
    if (val === trivia[qi].a) setScore(s => s + 1);
    setTimeout(() => { setAnswered(null); setQi(q => (q + 1) % trivia.length); }, 1200);
  };

  const q = trivia[qi];
  return (
    <Card className="p-5 rounded-3xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-200">
      <div className="text-3xl text-center mb-1">🧩</div>
      <h3 className="font-heading text-xl text-center mb-1">गणित त्रिविया</h3>
      <div className="flex justify-between mb-3 text-sm font-bold">
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-xl">⭐ {score}/{total}</span>
        <span className="text-xs text-muted-foreground font-body">{qi + 1}/{trivia.length}</span>
      </div>
      <div className="text-center bg-white dark:bg-card rounded-2xl p-4 mb-3 border">
        <p className="font-heading text-lg text-yellow-700">{q.q}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {q.opts.map((opt, i) => {
          let cls = 'bg-white dark:bg-card border-2 rounded-2xl p-3 font-body text-sm font-bold transition-colors text-left';
          if (answered) {
            if (opt === q.a) cls += ' !bg-green-500 !border-green-500 text-white';
            else if (opt === answered) cls += ' !bg-red-400 !border-red-400 text-white';
          } else cls += ' hover:bg-yellow-50';
          return <button key={i} onClick={() => pick(opt)} className={cls}>{opt}</button>;
        })}
      </div>
    </Card>
  );
}

// ─── GAME REGISTRY ────────────────────────────────────────────────
const ALL_GAMES = [
  { id: 'speed', name: '⚡ स्पीड गणित', comp: SpeedMath, cat: 'जोड़-घटाव' },
  { id: 'guess', name: '🎯 संख्या पहचानो', comp: NumberGuess, cat: 'तर्क' },
  { id: 'table', name: '✖️ पहाड़ा क्विज़', comp: TableQuiz, cat: 'गुणा' },
  { id: 'evenodd', name: '🔄 सम/विषम', comp: EvenOdd, cat: 'संख्या' },
  { id: 'missing', name: '🔍 गायब संख्या', comp: MissingNumber, cat: 'पैटर्न' },
  { id: 'prime', name: '🔑 अभाज्य चेकर', comp: PrimeChecker, cat: 'संख्या' },
  { id: 'chain', name: '⛓️ गणित श्रृंखला', comp: MathChain, cat: 'मिक्स' },
  { id: 'fraction', name: '🍕 भिन्न मिलाओ', comp: FractionMatch, cat: 'भिन्न' },
  { id: 'sqcube', name: '⭐ वर्ग-घन', comp: SquareCubeQuiz, cat: 'शक्ति' },
  { id: 'time', name: '⏰ समय क्विज़', comp: TimeQuiz, cat: 'मापन' },
  { id: 'geo', name: '📐 ज्यामिति', comp: GeometryQuick, cat: 'आकृति' },
  { id: 'vedic', name: '🕉️ वैदिक स्पीड', comp: VedicQuickGame, cat: 'वैदिक' },
  { id: 'division', name: '➗ भाग दौड़', comp: DivisionRace, cat: 'भाग' },
  { id: 'area', name: '📏 क्षेत्रफल खेल', comp: AreaGame, cat: 'ज्यामिति' },
  { id: 'percent', name: '💯 प्रतिशत ब्लिट्ज़', comp: PercentageBlitz, cat: '% & ₹' },
  { id: 'lcmhcf', name: '🔗 LCM & HCF', comp: LcmHcfGame, cat: 'कारक' },
  { id: 'algebra', name: '🔤 x निकालो', comp: AlgebraSolve, cat: 'बीजगणित' },
  { id: 'roman', name: '🏛️ रोमन संख्याएं', comp: RomanNumerals, cat: 'इतिहास' },
  { id: 'word', name: '📖 शब्द समस्याएं', comp: WordProblems, cat: 'व्यावहारिक' },
  { id: 'trivia', name: '🧩 गणित त्रिविया', comp: MathTrivia, cat: 'GK' },
];

export default function Games() {
  const [activeGame, setActiveGame] = useState(null);
  const [filterCat, setFilterCat] = useState('सभी');

  const cats = ['सभी', 'जोड़-घटाव', 'गुणा', 'भाग', 'संख्या', 'पैटर्न', 'भिन्न', 'ज्यामिति', 'बीजगणित', 'मापन', 'वैदिक', '% & ₹', 'GK'];
  const filtered = filterCat === 'सभी' ? ALL_GAMES : ALL_GAMES.filter(g => g.cat === filterCat);
  const Active = activeGame ? ALL_GAMES.find(g => g.id === activeGame)?.comp : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl md:text-4xl text-center mb-1">🎮 गणित के खेल</h1>
        <p className="text-center text-muted-foreground font-body mb-6">20 से ज़्यादा खेल — खेल-खेल में गणित सीखो! 🎉</p>
      </motion.div>

      {!activeGame ? (
        <>
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {cats.map(c => (
              <button key={c} onClick={() => setFilterCat(c)}
                className={`px-3 py-1.5 rounded-xl font-body font-bold text-xs min-h-0 transition-all ${filterCat === c ? 'bg-primary text-primary-foreground' : 'bg-card border hover:border-primary'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filtered.map((game, i) => (
              <motion.button
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setActiveGame(game.id)}
                className="bg-card border-2 hover:border-primary rounded-2xl p-4 text-left transition-all hover:shadow-md min-h-0"
              >
                <div className="text-2xl mb-2">{game.name.split(' ')[0]}</div>
                <p className="font-heading text-sm leading-tight">{game.name.split(' ').slice(1).join(' ')}</p>
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full font-body mt-1 inline-block">{game.cat}</span>
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-lg mx-auto">
          <button onClick={() => setActiveGame(null)} className="flex items-center gap-2 mb-4 text-sm font-body font-bold text-primary hover:underline min-h-0 min-w-0">
            ← सभी खेल
          </button>
          {Active && <Active />}
        </div>
      )}
    </div>
  );
}
