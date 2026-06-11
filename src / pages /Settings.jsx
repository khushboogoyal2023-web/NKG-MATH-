import { motion } from 'framer-motion';
import { Settings2, Globe, Check, Moon, Sun, Info } from 'lucide-react';
import { useLang } from '../lib/LanguageContext';
import { useState, useEffect } from 'react';

export default function Settings() {
  const { lang, t, setLang } = useLang();
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(d => !d);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <div className="bg-gradient-to-br from-slate-600 to-gray-800 text-white rounded-3xl p-4 shadow-xl">
            <Settings2 size={36} />
          </div>
        </div>
        <h1 className="font-heading text-3xl mb-1">⚙️ {t.settingsTitle}</h1>
      </motion.div>

      {/* Language Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-card border rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={20} className="text-primary" />
          <h2 className="font-heading text-lg">App Language / {t.langSection}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { code: 'hi', label: 'हिंदी', sublabel: 'शुद्ध और सरल हिंदी', flag: '🇮🇳' },
            { code: 'en', label: 'English', sublabel: 'Universal Technical English', flag: '🇬🇧' },
          ].map(option => (
            <motion.button key={option.code} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => setLang(option.code)}
              className={`relative p-4 rounded-2xl border-2 text-left transition-all ${lang === option.code ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
              {lang === option.code && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                  <Check size={12} />
                </div>
              )}
              <div className="text-3xl mb-2">{option.flag}</div>
              <p className="font-heading text-base">{option.label}</p>
              <p className="font-body text-xs text-muted-foreground">{option.sublabel}</p>
            </motion.button>
          ))}
        </div>
        <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
          <p className="font-body text-xs text-blue-600 dark:text-blue-400">
            ✅ {lang === 'hi' ? 'भाषा तुरंत बदल जाएगी — App restart की ज़रूरत नहीं!' : 'Language changes instantly — no app restart needed!'}
          </p>
        </div>
      </motion.div>

      {/* Dark Mode */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="bg-card border rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {darkMode ? <Moon size={20} className="text-primary" /> : <Sun size={20} className="text-amber-500" />}
            <div>
              <h2 className="font-heading text-base">{lang === 'hi' ? 'डार्क मोड' : 'Dark Mode'}</h2>
              <p className="font-body text-xs text-muted-foreground">{lang === 'hi' ? 'आँखों के लिए आरामदायक' : 'Easy on the eyes'}</p>
            </div>
          </div>
          <button onClick={toggleDark}
            className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${darkMode ? 'left-6' : 'left-0.5'}`} />
          </button>
        </div>
      </motion.div>

      {/* About */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-5 text-center">
        <div className="text-3xl mb-2">🔢</div>
        <h2 className="font-heading text-lg">NKG MATH UNIVERSE</h2>
        <p className="font-body text-sm opacity-80">© 2026 | Version 2.0</p>
        <p className="font-body text-xs opacity-60 mt-1">{lang === 'hi' ? 'कक्षा 1-9 | गणित सीखो, मज़े करो!' : 'Class 1-9 | Learn Math, Have Fun!'}</p>
      </motion.div>
    </div>
  );
}
