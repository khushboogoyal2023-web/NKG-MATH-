import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X, AlertTriangle, LogOut } from 'lucide-react';
import { clearSession } from '@/lib/otpAuth';

export default function DeleteAccountModal({ onClose, onLogout }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    clearSession();
    if (onLogout) onLogout();
  };

  const handleLogout = () => {
    clearSession();
    if (onLogout) onLogout();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          /* 🔥 SUDHAAR: Border-4 controls aur dark mode text clarity fix ki gayi hai */
          className="bg-card dark:bg-slate-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl border-4 border-rose-400"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl text-foreground dark:text-white flex items-center gap-2 font-black">
              ⚙️ सेटिंग्स & प्रोफाइल
            </h2>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted min-w-[40px] min-h-[40px] flex items-center justify-center">
              <X size={18} className="text-foreground dark:text-white" />
            </button>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full mb-4 py-3 rounded-2xl bg-primary/10 text-primary dark:bg-white/10 dark:text-purple-300 font-heading flex items-center justify-center gap-2 hover:bg-primary/20 transition-all font-bold active:scale-95"
          >
            <LogOut size={16} /> लॉग आउट (Sign Out)
          </button>
          <hr className="border-border dark:border-slate-700 mb-4" />

          {!confirming ? (
            <>
              {/* 🔥 Dark mode fix text helper class */}
              <p className="font-body text-muted-foreground dark:text-slate-300 mb-6 text-sm font-medium">
                क्या आप सच में अपना अकाउंट डिलीट करना चाहते हैं? आपकी जीती हुई सभी कॉइन्स और लेवल प्रोग्रेस मिट जाएगी।
              </p>
              <div className="flex gap-3">
                <button onClick={onClose}
                  className="flex-1 py-3 rounded-2xl border-2 border-border dark:border-slate-600 text-foreground dark:text-white font-heading hover:bg-muted transition font-bold active:scale-95">
                  रद्द करें
                </button>
                <button onClick={() => setConfirming(true)}
                  className="flex-1 py-3 rounded-2xl bg-rose-500 text-white font-heading hover:opacity-90 transition flex items-center justify-center gap-2 font-bold active:scale-95 shadow-md">
                  <Trash2 size={16} /> हाँ, मिटाएं
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-rose-50 dark:bg-rose-950/40 p-3 rounded-2xl mb-4 border border-rose-200">
                <p className="font-body text-sm text-rose-700 dark:text-rose-300">
                  ⚠️ <strong>अंतिम चेतावनी:</strong> "हाँ, मेरा अकाउंट डिलीट करें" दबाने पर आपका सारा डेटा हमेशा के लिए साफ हो जाएगा।
                </p>
              </div>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-destructive text-destructive-foreground font-heading hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60 font-black active:scale-95 shadow-lg"
              >
                {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Trash2 size={16} />}
                हाँ, मेरा अकाउंट डिलीट करें
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
