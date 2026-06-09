import { motion } from 'framer-motion';

const emojis = ['➕', '➖', '✖️', '➗', '🔢', '📐', '📏', '🧮', '⭐', '🎯', '🏆', '💡'];

export default function FloatingEmojis() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {emojis.map((emoji, i) => {
        // Emojis को स्क्रीन पर बेहतर तरीके से बांटने के लिए staggered horizontal start
        const startingX = `${(i * 9.5) % 90 + 5}%`; 

        return (
          <motion.div
            key={i}
            className="absolute text-xl sm:text-2xl opacity-[0.06] dark:opacity-[0.04] will-change-transform"
            initial={{
              x: startingX,
              y: '115%',
            }}
            animate={{
              y: '-15%',
              // 🔥 SUDHAAR: Emojis को सीधा ऊपर भेजने के बजाय हल्का लहराता हुआ (sway) प्रभाव देना
              x: [
                startingX, 
                `${parseFloat(startingX) + 4}%`, 
                `${parseFloat(startingX) - 4}%`, 
                startingX
              ],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 18 + (i * 2.5), // थोड़ा धीमा किया ताकि background शांत लगे
              repeat: Infinity,
              delay: i * 1.2,
              ease: 'linear',
            }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
}
