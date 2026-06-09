import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Square, Volume2, ChevronDown, Mic } from 'lucide-react';

// Strip markdown symbols for clean TTS text
function cleanForSpeech(text) {
  return text
    .replace(/\*\*/g, '')
    .replace(/---/g, '. ')
    .replace(/\[.*?\]/g, '')   // remove stage directions
    .replace(/•/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s*[-*]\s/gm, '')
    .trim();
}

export default function SpeechPlayer({ script, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(0.85);
  const [pitch, setPitch] = useState(1.05);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const chunksRef = useRef([]);
  const currentChunkRef = useRef(0);
  const isInternalCancelRef = useRef(false);

  // Load available voices seamlessly
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices() || [];
      if (allVoices.length === 0) return;
      
      setVoices(allVoices);
      // Fallback architecture to grab Hindi engine at first availability
      const hindiVoice = allVoices.find(v => v.lang.startsWith('hi')) || allVoices[0];
      setSelectedVoice(prev => prev || hindiVoice || null);
    };

    loadVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Split text into speakable sentence chunks
  const buildChunks = useCallback(() => {
    const clean = cleanForSpeech(script);
    return clean.split(/(?<=[।.!?])\s+/).filter(s => s.trim().length > 2);
  }, [script]);

  const speakChunk = useCallback((index) => {
    const chunks = chunksRef.current;
    if (index >= chunks.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
      currentChunkRef.current = 0;
      return;
    }

    window.speechSynthesis.cancel();

    const utt = new SpeechSynthesisUtterance(chunks[index]);
    utt.rate = rate;
    utt.pitch = pitch;
    utt.lang = 'hi-IN';
    if (selectedVoice) utt.voice = selectedVoice;

    utt.onend = () => {
      // Catch trigger to block automated loops during parameter updates
      if (isInternalCancelRef.current) {
        isInternalCancelRef.current = false;
        return;
      }
      currentChunkRef.current = index + 1;
      setProgress(Math.round(((index + 1) / chunks.length) * 100));
      speakChunk(index + 1);
    };

    utt.onerror = (e) => {
      if (e.error !== 'interrupted') {
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    window.speechSynthesis.speak(utt);
  }, [rate, pitch, selectedVoice]);

  // 🔥 SUDHAAR: On-The-Fly settings change live hot-reloader 
  useEffect(() => {
    if (isPlaying && !isPaused && chunksRef.current.length > 0) {
      isInternalCancelRef.current = true;
      speakChunk(currentChunkRef.current);
    }
  }, [rate, pitch, selectedVoice, isPlaying, isPaused, speakChunk]);

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }
    
    window.speechSynthesis.cancel();
    const chunks = buildChunks();
    chunksRef.current = chunks;
    currentChunkRef.current = 0;
    setProgress(0);
    setIsPlaying(true);
    setIsPaused(false);
    speakChunk(0);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    currentChunkRef.current = 0;
    chunksRef.current = [];
  };

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const hindiVoices = voices.filter(v => v.lang.startsWith('hi'));
  const otherVoices = voices.filter(v => !v.lang.startsWith('hi'));

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20 border border-violet-200 dark:border-violet-800/60 rounded-2xl p-4 w-full max-w-xl mx-auto my-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center shrink-0 shadow-sm">
          <Mic size={15} className="text-white" />
        </div>
        <div>
          <h3 className="font-heading text-sm font-black text-violet-800 dark:text-violet-300">🔊 सुनकर सीखें — Text to Speech</h3>
          <p className="text-[11px] text-muted-foreground font-body">स्क्रिप्ट सुनें और उसके साथ बोलने का अभ्यास करें</p>
        </div>
      </div>

      {/* Progress tracking line */}
      <div className="h-2 bg-violet-100 dark:bg-violet-950 rounded-full mb-3 overflow-hidden border border-violet-200/20">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Control Actions Deck */}
      <div className="flex items-center gap-2 mb-2">
        {!isPlaying ? (
          <button
            onClick={handlePlay}
            className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white px-3.5 py-2 rounded-xl font-body font-black text-xs transition-all active:scale-95 shadow-xs"
          >
            <Play size={13} fill="white" />
            {isPaused ? 'जारी रखें' : 'सुनना शुरू करें'}
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-2 rounded-xl font-body font-black text-xs transition-all active:scale-95 shadow-xs"
          >
            <Pause size={13} fill="white" />
            रोकें
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl font-body font-bold text-xs transition-all active:scale-95 shadow-xs"
          >
            <Square size={11} fill="white" />
            बंद करें
          </button>
        )}

        <span className="ml-auto text-xs font-body font-bold text-muted-foreground">{progress}%</span>

        <button
          onClick={() => setShowSettings(s => !s)}
          className="flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 font-body font-black hover:underline select-none"
        >
          <Volume2 size={13} />
          आवाज़ सेटिंग
          <ChevronDown size={11} className={`transition-transform duration-200 ${showSettings ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Parameter Settings Container */}
      {showSettings && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 mt-2 space-y-3.5 border border-violet-100 dark:border-violet-900/60 shadow-xs">
          {/* Speed slider */}
          <div>
            <label className="flex justify-between text-xs font-body font-black text-foreground mb-1">
              <span>🐢 गति (Speed)</span>
              <span className="text-violet-600 font-bold">{rate === 1 ? 'सामान्य' : rate < 1 ? 'धीरे' : 'तेज़'} ({rate}x)</span>
            </label>
            <input
              type="range" min="0.5" max="1.5" step="0.05"
              value={rate}
              onChange={e => setRate(Number(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer h-1 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          {/* Pitch control configuration */}
          <div>
            <label className="flex justify-between text-xs font-body font-black text-foreground mb-1">
              <span>🎵 आवाज़ की ऊँचाई (Pitch)</span>
              <span className="text-violet-600 font-bold">{pitch}x</span>
            </label>
            <input
              type="range" min="0.7" max="1.3" step="0.05"
              value={pitch}
              onChange={e => setPitch(Number(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer h-1 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          {/* Localized Browser engine audio selectors */}
          {voices.length > 0 && (
            <div>
              <label className="text-xs font-body font-black text-foreground mb-1 block">🗣️ आवाज़ इंजन चुनें</label>
              <select
                value={selectedVoice?.name || ''}
                onChange={e => setSelectedVoice(voices.find(v => v.name === e.target.value) || null)}
                className="w-full text-xs font-body border border-border rounded-xl px-2 py-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-violet-500 text-foreground font-medium"
              >
                {hindiVoices.length > 0 && (
                  <optgroup label="Native हिंदी आवाज़ें" className="font-bold text-purple-600">
                    {hindiVoices.map(v => (
                      <option key={v.name} value={v.name} className="text-foreground font-medium">{v.name} ({v.lang})</option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="System Global Voices" className="opacity-60">
                  {otherVoices.slice(0, 15).map(v => (
                    <option key={v.name} value={v.name} className="text-foreground font-medium">{v.name} ({v.lang})</option>
                  ))}
                </optgroup>
              </select>
            </div>
          )}

          <p className="text-[11px] text-violet-700 dark:text-violet-300 font-body bg-violet-50 dark:bg-violet-950/40 rounded-xl p-2.5 border border-violet-100/30">
            💡 <strong>अभ्यास Tip:</strong> पहले ध्यान से उच्चारण सुनें, फिर रोककर खुद दोहराएं। स्पीड <strong>0.8x</strong> रखने से कठिन शब्द स्पष्ट समझ आते हैं।
          </p>
        </div>
      )}

      {/* Animated Sound Wave Indicator */}
      {isPlaying && (
        <div className="flex items-center gap-1.5 mt-2.5 px-1 animate-fadeIn">
          <div className="flex gap-0.5 items-end h-3.5 w-6">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                className="w-0.5 bg-violet-500 rounded-full animate-bounce"
                style={{ 
                  height: `${6 + i * 2}px`, 
                  animationDuration: `${0.4 + i * 0.15}s`,
                  animationDelay: `${i * 0.1}s` 
                }} 
              />
            ))}
          </div>
          <span className="text-[11px] font-body text-violet-600 dark:text-violet-400 font-black animate-pulse">स्क्रिप्ट वाचन सक्रिय है...</span>
        </div>
      )}
    </div>
  );
}
