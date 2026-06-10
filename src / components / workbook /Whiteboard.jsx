import { useRef, useState, useEffect, useCallback } from 'react';
import { Trash2, Download, Pen, Eraser, Minus, Plus } from 'lucide-react';

const COLORS = ['#1e1e1e', '#7c3aed', '#ef4444', '#f97316', '#22c55e', '#3b82f6', '#ec4899', '#ffffff'];

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState('pen'); // 'pen' | 'eraser'
  const [color, setColor] = useState('#7c3aed'); // डिफ़ॉल्ट कलर बैंगनी (violet) रखा है
  const [size, setSize] = useState(4);
  const lastPos = useRef(null);

  // कैनवास को इनिशियलाइज और रीसाइज हैंडल करने का फंक्शन
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      // पुरानी ड्राइंग को अस्थायी रूप से सेव करना ताकि रीसाइज पर डिलीट न हो
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(canvas, 0, 0);

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = useCallback((e) => {
    if (e.type === 'touchstart') {
      // मोबाइल पर स्क्रॉलिंग रोकने के लिए
      if (e.cancelable) e.preventDefault();
    }
    setDrawing(true);
    const canvas = canvasRef.current;
    lastPos.current = getPos(e, canvas);
  }, []);

  const draw = useCallback((e) => {
    if (!drawing) return;
    if (e.type === 'touchmove' && e.cancelable) {
      e.preventDefault();
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === 'eraser' ? '#fafafa' : color;
    ctx.lineWidth = tool === 'eraser' ? size * 6 : size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    lastPos.current = pos;
  }, [drawing, tool, color, size]);

  const stopDraw = useCallback(() => {
    setDrawing(false);
    lastPos.current = null;
  }, []);

  const clearBoard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadBoard = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'NKG_Whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto p-1">
      {/* Toolbar */}
      <div className="bg-card border-2 border-violet-100 dark:border-violet-900/40 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        
        {/* Tool toggle (Pen / Eraser) */}
        <div className="flex gap-1.5 bg-violet-50 dark:bg-violet-950/40 rounded-xl p-1 border border-violet-100/50">
          <button 
            onClick={() => setTool('pen')}
            className={`p-2.5 rounded-lg transition-all cursor-pointer ${tool === 'pen' ? 'bg-violet-600 text-white shadow-md scale-105' : 'text-violet-600 dark:text-violet-400 hover:bg-violet-100/50'}`}
            title="पेन"
          >
            <Pen size={18} className="stroke-[2.5]" />
          </button>
          <button 
            onClick={() => setTool('eraser')}
            className={`p-2.5 rounded-lg transition-all cursor-pointer ${tool === 'eraser' ? 'bg-violet-600 text-white shadow-md scale-105' : 'text-violet-600 dark:text-violet-400 hover:bg-violet-100/50'}`}
            title="इरेज़र"
          >
            <Eraser size={18} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Colors Palette */}
        <div className="flex gap-2 flex-wrap items-center">
          {COLORS.map(c => (
            <button 
              key={c} 
              onClick={() => { setColor(c); setTool('pen'); }}
              className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer hover:scale-110 active:scale-95 ${color === c && tool === 'pen' ? 'border-violet-600 scale-115 shadow-sm ring-2 ring-violet-500/20' : 'border-neutral-300 dark:border-neutral-700'}`}
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>

        {/* Brush Size Adjustment */}
        <div className="flex items-center gap-2 bg-violet-50 dark:bg-violet-950/40 rounded-xl p-1 border border-violet-100/50">
          <button 
            onClick={() => setSize(s => Math.max(1, s - 1))}
            className="p-1.5 rounded-lg text-violet-600 dark:text-violet-400 hover:bg-violet-100/50 cursor-pointer"
          >
            <Minus size={15} className="stroke-[2.5]" />
          </button>
          <span className="font-body font-black text-xs w-6 text-center text-violet-700 dark:text-violet-300">{size}</span>
          <button 
            onClick={() => setSize(s => Math.min(20, s + 1))}
            className="p-1.5 rounded-lg text-violet-600 dark:text-violet-400 hover:bg-violet-100/50 cursor-pointer"
          >
            <Plus size={15} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Action Buttons (Save / Clear) */}
        <div className="flex gap-2">
          <button 
            onClick={downloadBoard}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 rounded-xl font-body font-black text-xs tracking-wide uppercase hover:bg-indigo-100 dark:hover:bg-indigo-950/60 transition cursor-pointer active:scale-98"
          >
            <Download size={15} className="stroke-[2.5]" /> सेव
          </button>
          <button 
            onClick={clearBoard}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 border border-red-100 dark:border-red-900/40 rounded-xl font-body font-black text-xs tracking-wide uppercase hover:bg-red-100 dark:hover:bg-red-950/60 transition cursor-pointer active:scale-98"
          >
            <Trash2 size={15} className="stroke-[2.5]" /> साफ़
          </button>
        </div>
      </div>

      {/* Canvas Wrapper */}
      <div 
        className="relative rounded-2xl overflow-hidden border-2 border-violet-100 dark:border-violet-900/40 bg-[#fafafa] shadow-xs"
        style={{ height: '55vh', minHeight: '350px' }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none block"
          style={{ cursor: tool === 'eraser' ? 'cell' : 'crosshair' }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-violet-900/10 dark:bg-violet-100/10 backdrop-blur-xs text-[11px] font-black tracking-wide uppercase text-violet-800 dark:text-violet-300 px-3 py-1 rounded-full font-body pointer-events-none border border-violet-500/10">
          ✏️ यहाँ रफ काम करो
        </div>
      </div>
    </div>
  );
}
