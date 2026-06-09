import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FunCard({ to, emoji, title, subtitle, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.4, 
        type: 'spring', 
        stiffness: 150, 
        damping: 15 
      }}
      whileHover={{ scale: 1.03, rotate: 0.5 }}
      whileTap={{ scale: 0.97 }}
      className="w-full"
    >
      <Link
        to={to}
        aria-label={`${title} - ${subtitle || 'खोलने के लिए क्लिक करें'}`}
        className={`block rounded-3xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 outline-hidden focus-visible:ring-4 focus-visible:ring-violet-400/70 focus-visible:ring-offset-2 ${gradient} text-white select-none will-change-transform`}
      >
        {/* Emoji Icon Badge */}
        <div 
          className="text-4xl md:text-5xl mb-3 filter drop-shadow-sm transform transition-transform duration-300 group-hover:scale-110"
          role="img" 
          aria-hidden="true"
        >
          {emoji}
        </div>
        
        {/* Card Title */}
        <h3 className="font-heading font-black text-base md:text-lg tracking-wide leading-tight">
          {title}
        </h3>
        
        {/* Optional Subtitle Description */}
        {subtitle && (
          <p className="text-xs md:text-sm opacity-90 mt-1.5 font-body font-medium leading-relaxed">
            {subtitle}
          </p>
        )}
      </Link>
    </motion.div>
  );
}
