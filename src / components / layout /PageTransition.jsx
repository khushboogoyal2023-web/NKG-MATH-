import { motion } from 'framer-motion';

export default function PageTransition({ children, locationKey }) {
  return (
    <motion.div
      key={locationKey}
      /* 🔥 SUDHAAR: Cartoonish/Kid-friendly bouncy animation effects lagaye gaye hain */
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -15 }}
      /* Spring physics se transition bohot bouncy aur smooth lagega */
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.25
      }}
      className="flex-1 w-full h-full"
    >
      {children}
    </motion.div>
  );
}
