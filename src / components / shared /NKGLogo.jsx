export default function NKGLogo({ size = 'md' }) {
  // साइज के अनुसार सब कुछ (सर्कल्स, टेक्स्ट और डेकोरेटिव डॉट्स) आनुपातिक रूप से स्केल होगा
  const sizes = {
    sm: { 
      outer: 'w-10 h-10', 
      text: 'text-xs', 
      sub: 'text-[7px]',
      dotTop: 'w-2 h-2 -top-0.5 -right-0.5',
      dotBottom: 'w-1.5 h-1.5 -bottom-0.5 -left-0.5'
    },
    md: { 
      outer: 'w-14 h-14', 
      text: 'text-sm', 
      sub: 'text-[9px]',
      dotTop: 'w-2.5 h-2.5 -top-0.5 -right-0.5',
      dotBottom: 'w-2 h-2 -bottom-0.5 -left-0.5'
    },
    lg: { 
      outer: 'w-20 h-20', 
      text: 'text-xl', 
      sub: 'text-[11px]',
      dotTop: 'w-3.5 h-3.5 -top-1 -right-1 border-2',
      dotBottom: 'w-2.5 h-2.5 -bottom-0.5 -left-0.5'
    },
    xl: { 
      outer: 'w-28 h-28', 
      text: 'text-3xl', 
      sub: 'text-sm tracking-wider',
      dotTop: 'w-4 h-4 -top-1 -right-1 border-2',
      dotBottom: 'w-3.5 h-3.5 -bottom-1 -left-1 border-2'
    },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`${s.outer} relative flex-shrink-0 select-none`}>
      {/* Outer Gradient Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 shadow-md flex items-center justify-center p-[8%]">
        
        {/* Inner Context Circle */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex flex-col items-center justify-center shadow-inner">
          {/* Main Brand Initial */}
          <span className={`font-heading font-black text-white ${s.text} leading-none tracking-tight`}>
            NKG
          </span>
          {/* Niche Category Tag */}
          <span className={`font-body text-yellow-300 font-extrabold ${s.sub} leading-none mt-0.5 uppercase`}>
            Math
          </span>
        </div>

      </div>

      {/* Top Right Decorative Spark Dot */}
      <div className={`absolute ${s.dotTop} bg-gradient-to-tr from-yellow-400 to-amber-300 rounded-full border border-white shadow-xs`} />
      
      {/* Bottom Left Decorative Spark Dot */}
      <div className={`absolute ${s.dotBottom} bg-gradient-to-tr from-pink-400 to-rose-400 rounded-full border border-white shadow-xs`} />
    </div>
  );
}
