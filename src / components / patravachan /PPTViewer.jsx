import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, FileDown } from 'lucide-react';

// 🔥 SUDHAAR: Tailwind safe mapping configuration block objects 
const GRADIENT_CLASSES = {
  'from-purple-500 to-indigo-600': 'from-purple-500 to-indigo-600 text-white',
  'from-orange-500 to-red-500': 'from-orange-500 to-red-500 text-white',
  'from-teal-500 to-green-600': 'from-teal-500 to-green-600 text-white',
  'from-amber-500 to-orange-500': 'from-amber-500 to-orange-500 text-white',
  'from-green-500 to-teal-600': 'from-green-500 to-teal-600 text-white',
  'from-pink-500 to-rose-600': 'from-pink-500 to-rose-600 text-white',
  'from-blue-500 to-cyan-600': 'from-blue-500 to-cyan-600 text-white',
  'from-violet-500 to-purple-600': 'from-violet-500 to-purple-600 text-white',
  'from-indigo-500 to-blue-600': 'from-indigo-500 to-blue-600 text-white',
  'from-cyan-500 to-sky-600': 'from-cyan-500 to-sky-600 text-white',
};

function downloadPPTAsHTML(slides, title) {
  const gradientMap = {
    'from-purple-500 to-indigo-600': 'linear-gradient(135deg,#8b5cf6,#4f46e5)',
    'from-orange-500 to-red-500': 'linear-gradient(135deg,#f97316,#ef4444)',
    'from-teal-500 to-green-600': 'linear-gradient(135deg,#14b8a6,#16a34a)',
    'from-amber-500 to-orange-500': 'linear-gradient(135deg,#f59e0b,#f97316)',
    'from-green-500 to-teal-600': 'linear-gradient(135deg,#22c55e,#0d9488)',
    'from-pink-500 to-rose-600': 'linear-gradient(135deg,#ec4899,#e11d48)',
    'from-blue-500 to-cyan-600': 'linear-gradient(135deg,#3b82f6,#0891b2)',
    'from-violet-500 to-purple-600': 'linear-gradient(135deg,#8b5cf6,#9333ea)',
    'from-indigo-500 to-blue-600': 'linear-gradient(135deg,#6366f1,#2563eb)',
    'from-cyan-500 to-sky-600': 'linear-gradient(135deg,#06b6d4,#0284c7)',
  };

  const getGrad = (bg) => gradientMap[bg] || 'linear-gradient(135deg,#7c3aed,#4f46e5)';

  const slideHTML = slides.map((slide, idx) => {
    const grad = getGrad(slide.bg);
    let inner = '';

    if (slide.type === 'title' || slide.type === 'end') {
      inner = `
        <div style="background:${grad};height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;text-align:center;padding:40px;border-radius:12px">
          <div style="font-size:64px;margin-bottom:16px">${slide.emoji || '🏆'}</div>
          <h1 style="font-size:28px;font-weight:900;margin:0 0 12px;line-height:1.3">${slide.title}</h1>
          <p style="font-size:13px;opacity:0.85;background:rgba(255,255,255,0.2);padding:8px 18px;border-radius:20px;margin-bottom:10px">${slide.subtitle || ''}</p>
          ${slide.quote ? `<p style="font-size:12px;opacity:0.7;font-style:italic;margin-top:10px">${slide.quote}</p>` : ''}
          <p style="font-size:10px;opacity:0.5;margin-top:16px">NKG MATH UNIVERSE | पत्रवाचन</p>
        </div>`;
    } else if (slide.type === 'prep') {
      const lines = slide.content.split('\n').filter(l => l.trim());
      inner = `
        <div style="background:linear-gradient(135deg,#f1f5f9,#eff6ff);height:100%;border-radius:12px;padding:30px;box-sizing:border-box">
          <div style="background:${grad};color:white;padding:12px 20px;border-radius:10px;margin-bottom:20px">
            <h2 style="margin:0;font-size:18px;font-weight:900">${slide.title}</h2>
          </div>
          ${lines.map(l => l.startsWith('•')
            ? `<div style="display:flex;gap:8px;margin-bottom:8px;align-items:flex-start"><span style="color:#7c3aed;font-size:16px">✦</span><p style="margin:0;font-size:12px;color:#374151">${l.slice(1).trim()}</p></div>`
            : `<p style="font-size:12px;font-weight:700;color:#111827;margin:10px 0 4px">${l}</p>`
          ).join('')}
        </div>`;
    } else if (slide.type === 'content') {
      const lines = slide.content.split('\n').filter(l => l.trim());
      inner = `
        <div style="background:white;height:100%;border-radius:12px;overflow:hidden;display:flex;flex-direction:column">
          <div style="background:${grad};color:white;padding:14px 22px">
            <p style="margin:0;font-size:10px;opacity:0.7">भाग ${slide.slideNum}</p>
            <h2 style="margin:4px 0 0;font-size:17px;font-weight:900">${slide.title}</h2>
          </div>
          <div style="padding:16px 22px;flex:1;overflow:hidden">
            ${lines.map(l => {
              if (l.startsWith('**') && l.endsWith('**'))
                return `<p style="font-size:12px;font-weight:900;color:#7c3aed;margin:8px 0 3px">${l.replace(/\*\*/g,'')}</p>`;
              if (l.startsWith('•') || l.startsWith('-'))
                return `<p style="font-size:11px;color:#374151;margin:3px 0;padding-left:12px">• ${l.slice(1).trim()}</p>`;
              if (l.startsWith('['))
                return `<p style="font-size:10px;color:#9ca3af;font-style:italic;margin:3px 0">${l}</p>`;
              return `<p style="font-size:11px;color:#374151;margin:3px 0">${l.replace(/\*\*/g,'')}</p>`;
            }).join('')}
          </div>
        </div>`;
    } else if (slide.type === 'dos') {
      inner = `
        <div style="background:white;height:100%;border-radius:12px;overflow:hidden;display:flex;flex-direction:column">
          <div style="background:${grad};color:white;padding:14px 22px">
            <h2 style="margin:0;font-size:17px;font-weight:900">${slide.title}</h2>
          </div>
          <div style="padding:14px;flex:1;display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div style="background:#f0fdf4;border-radius:10px;padding:14px">
              <p style="font-size:13px;font-weight:900;color:#15803d;margin:0 0 10px">✅ ज़रूर करें</p>
              ${(slide.doList||[]).slice(0,5).map(d=>`<p style="font-size:11px;color:#374151;margin:4px 0;display:flex;gap:6px"><span style="color:#22c55e">✓</span>${d}</p>`).join('')}
            </div>
            <div style="background:#fff1f2;border-radius:10px;padding:14px">
              <p style="font-size:13px;font-weight:900;color:#dc2626;margin:0 0 10px">❌ यह न करें</p>
              ${(slide.doNotList||[]).slice(0,5).map(d=>`<p style="font-size:11px;color:#374151;margin:4px 0;display:flex;gap:6px"><span style="color:#ef4444">✗</span>${d}</p>`).join('')}
            </div>
          </div>
        </div>`;
    } else if (slide.type === 'lines') {
      inner = `
        <div style="background:${grad};height:100%;border-radius:12px;padding:30px;box-sizing:border-box;color:white;display:flex;flex-direction:column">
          <h2 style="font-size:20px;font-weight:900;margin:0 0 20px">${slide.title}</h2>
          <div style="background:rgba(255,255,255,0.2);border-radius:12px;padding:16px;margin-bottom:14px">
            <p style="font-size:10px;opacity:0.7;margin:0 0 6px">🟢 Opening — शुरुआत</p>
            <p style="font-size:12px;font-style:italic;margin:0">"${slide.opening}"</p>
          </div>
          <div style="background:rgba(255,255,255,0.2);border-radius:12px;padding:16px">
            <p style="font-size:10px;opacity:0.7;margin:0 0 6px">🔴 Closing — समापन</p>
            <p style="font-size:12px;font-style:italic;margin:0">"${slide.closing}"</p>
          </div>
        </div>`;
    } else if (slide.type === 'tips') {
      inner = `
        <div style="background:#eff6ff;height:100%;border-radius:12px;padding:24px;box-sizing:border-box">
          <h2 style="font-size:18px;font-weight:900;color:#1d4ed8;margin:0 0 16px">${slide.title}</h2>
          ${(slide.tips||[]).map((tip,i)=>`
            <div style="display:flex;gap:10px;margin-bottom:10px;align-items:flex-start">
              <span style="background:#3b82f6;color:white;border-radius:50%;width:22px;height:22px;min-width:22px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700">${i+1}</span>
              <p style="font-size:11px;color:#374151;margin:0;line-height:1.5">${tip}</p>
            </div>`).join('')}
        </div>`;
    } else if (slide.type === 'keypoints') {
      inner = `
        <div style="background:${grad};height:100%;border-radius:12px;padding:28px;box-sizing:border-box;color:white">
          <h2 style="font-size:20px;font-weight:900;margin:0 0 16px">${slide.title}</h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${(slide.points||[]).map(pt=>`
              <div style="background:rgba(255,255,255,0.2);border-radius:10px;padding:12px;display:flex;gap:8px;align-items:center">
                <span style="font-size:18px">⭐</span>
                <p style="font-size:11px;font-weight:700;margin:0">${pt}</p>
              </div>`).join('')}
          </div>
        </div>`;
    }

    return `
      <div class="slide-page">
        <div class="slide-number">स्लाइड ${idx + 1} / ${slides.length}</div>
        <div class="slide-inner">${inner}</div>
      </div>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<title>${title} — PPT | NKG MATH UNIVERSE</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Nunito', sans-serif; background: #f3f4f6; }
  .cover { background: linear-gradient(135deg,#7c3aed,#4f46e5); color: white; text-align:center; padding: 60px 40px; }
  .cover h1 { font-size: 36px; font-weight: 900; margin-bottom: 10px; }
  .cover p { font-size: 15px; opacity: 0.85; }
  .cover .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 6px 16px; border-radius: 20px; font-size: 13px; margin-top: 12px; }
  .slide-page { background: white; margin: 20px auto; max-width: 900px; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); page-break-after: always; }
  .slide-number { background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 8px 20px; font-size: 11px; color: #94a3b8; font-weight: 700; }
  .slide-inner { height: 420px; padding: 0; }
  .slide-inner > div { font-family: 'Nunito', sans-serif !important; }
  .footer { text-align:center; padding: 30px; color: #6b7280; font-size:12px; }
  @media print {
    body { background: white; }
    .slide-page { margin: 0; box-shadow: none; border-radius: 0; border: 1px solid #e5e7eb; }
    .cover { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .slide-inner > div { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<div class="cover">
  <div style="font-size:60px;margin-bottom:16px">🎤</div>
  <h1>${title}</h1>
  <p>NKG MATH UNIVERSE — पत्रवाचन PPT</p>
  <div class="badge">📥 Download करें → File > Print → Save as PDF</div>
</div>
${slideHTML}
<div class="footer">
  🔢 NKG MATH UNIVERSE © 2026 | गणित सीखो, मज़े करो!<br>
  <small>Save as PDF: Ctrl+P → Save as PDF</small>
</div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/[^a-zA-Z0-9\u0900-\u097F]/g, '_')}_PPT.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateSlides(topic, detail) {
  const slides = [];

  slides.push({
    type: 'title',
    title: detail.title,
    subtitle: `${detail.type} | ${detail.level} | ${detail.duration}`,
    bg: detail.color,
    emoji: topic.type?.includes('भाषण') ? '🎤' : topic.type?.includes('नाटक') ? '🎭' : topic.type?.includes('कविता') ? '📖' : topic.type?.includes('प्रस्तुति') ? '📊' : '📝',
  });

  slides.push({
    type: 'prep',
    title: '📋 तैयारी कैसे करें?',
    content: detail.preparation,
    bg: detail.color,
  });

  const sections = detail.fullScript.split('\n---\n');
  sections.forEach((section, i) => {
    if (!section.trim()) return;
    const lines = section.trim().split('\n');
    const heading = lines[0]?.replace(/\*\*/g, '') || `भाग ${i + 1}`;
    const body = lines.slice(1).join('\n').trim();
    if (body) {
      slides.push({
        type: 'content',
        title: heading,
        content: body,
        bg: detail.color,
        slideNum: i + 1,
      });
    }
  });

  if (topic.keyPoints?.length > 0) {
    slides.push({
      type: 'keypoints',
      title: '🎯 मुख्य बिंदु',
      points: topic.keyPoints,
      bg: detail.color,
    });
  }

  slides.push({
    type: 'dos',
    title: "✅ करें / ❌ न करें",
    doList: detail.doList || [],
    doNotList: detail.doNotList || [],
    bg: detail.color,
  });

  slides.push({
    type: 'lines',
    title: '🗣️ Opening & Closing Lines',
    opening: detail.sampleOpening,
    closing: detail.sampleClosing,
    bg: detail.color,
  });

  if (detail.stageTips?.length > 0) {
    slides.push({
      type: 'tips',
      title: '🎬 Stage Tips',
      tips: detail.stageTips,
      bg: detail.color,
    });
  }

  slides.push({
    type: 'end',
    title: '🏆 All The Best!',
    subtitle: detail.title,
    quote: '"आत्मविश्वास के साथ बोलो — तुम सबसे अच्छे हो!"',
    bg: detail.color,
  });

  return slides;
}

function SlideContent({ slide }) {
  // 🔥 SUDHAAR: Safeguarded gradient extraction setup
  const bgGradClass = GRADIENT_CLASSES[slide.bg] || 'from-purple-500 to-indigo-600 text-white';

  if (slide.type === 'title') return (
    <div className={`bg-gradient-to-br ${bgGradClass} h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl shadow-inner`}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="text-6xl mb-4">{slide.emoji}</motion.div>
      <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="font-heading text-xl md:text-2xl font-black mb-3 leading-tight text-white">{slide.title}</motion.h1>
      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="font-body text-xs font-bold bg-white/20 text-white px-4 py-1.5 rounded-xl">{slide.subtitle}</motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-4 text-[10px] opacity-70 font-body text-white">NKG MATH UNIVERSE | पत्रवाचन</motion.div>
    </div>
  );

  if (slide.type === 'prep') return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/60 dark:to-blue-900/20 rounded-2xl p-5 overflow-auto border border-border">
      <motion.h2 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="font-heading text-base font-black text-foreground border-b-2 border-purple-500/20 pb-2 mb-3">{slide.title}</motion.h2>
      <div className="flex-1 space-y-2">
        {slide.content.split('\n').filter(l => l.trim()).map((line, i) => (
          <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
            className={`flex items-start gap-2 ${line.startsWith('•') ? '' : 'font-black text-purple-600 mt-2'}`}>
            {line.startsWith('•') ? (
              <><span className="text-purple-500 font-bold mt-0.5 shrink-0">✦</span><p className="font-body text-xs text-muted-foreground dark:text-slate-300">{line.slice(1).trim()}</p></>
            ) : (
              <p className="font-body text-xs font-black text-foreground">{line}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (slide.type === 'content') return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 border border-border rounded-2xl overflow-hidden">
      <div className={`bg-gradient-to-r ${bgGradClass} px-5 py-3.5`}>
        <motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-body text-[10px] text-white/80 font-bold">भाग {slide.slideNum}</motion.p>
        <motion.h2 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="font-heading text-base font-black text-white">{slide.title}</motion.h2>
      </div>
      <div className="flex-1 p-5 overflow-auto space-y-1.5">
        {slide.content.split('\n').filter(l => l.trim()).map((line, i) => (
          <motion.p key={i} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}
            className={`font-body text-xs leading-relaxed ${
              line.startsWith('**') ? 'font-black text-purple-600 dark:text-purple-400 mt-2' :
              line.startsWith('•') || line.startsWith('-') ? 'ml-3 text-slate-700 dark:text-slate-300 list-item' :
              line.startsWith('[') ? 'text-muted-foreground italic bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg' :
              'text-foreground'
            }`}>
            {line.replace(/\*\*/g, '')}
          </motion.p>
        ))}
      </div>
    </div>
  );

  if (slide.type === 'keypoints') return (
    <div className={`bg-gradient-to-br ${bgGradClass} h-full flex flex-col rounded-2xl p-6 shadow-inner`}>
      <motion.h2 initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-heading text-base font-black mb-4 text-white">{slide.title}</motion.h2>
      <div className="grid grid-cols-2 gap-2.5 flex-1 overflow-auto">
        {slide.points.map((pt, i) => (
          <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.06, type: 'spring' }}
            className="bg-white/15 backdrop-blur-md rounded-xl p-3 flex items-center gap-2 border border-white/10">
            <span className="text-lg shrink-0">⭐</span>
            <p className="font-body text-xs font-black text-white leading-snug">{pt}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (slide.type === 'dos') return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 border border-border rounded-2xl overflow-hidden">
      <div className={`bg-gradient-to-r ${bgGradClass} px-5 py-3.5`}>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading text-base font-black text-white">{slide.title}</motion.h2>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-3 p-4 overflow-auto">
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200/50 rounded-xl p-3">
          <p className="font-heading text-xs font-black text-green-700 dark:text-green-400 mb-2">✅ ज़रूर करें</p>
          {slide.doList.slice(0, 5).map((d, i) => (
            <motion.p key={i} initial={{ x: -15, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="font-body text-[11px] text-foreground mb-1.5 flex gap-1.5 items-start">
              <span className="text-green-500 font-bold shrink-0">✓</span><span>{d}</span>
            </motion.p>
          ))}
        </div>
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200/50 rounded-xl p-3">
          <p className="font-heading text-xs font-black text-red-600 dark:text-red-400 mb-2">❌ यह न करें</p>
          {slide.doNotList.slice(0, 5).map((d, i) => (
            <motion.p key={i} initial={{ x: 15, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="font-body text-[11px] text-foreground mb-1.5 flex gap-1.5 items-start">
              <span className="text-red-400 font-bold shrink-0">✗</span><span>{d}</span>
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );

  if (slide.type === 'lines') return (
    <div className={`bg-gradient-to-br ${bgGradClass} h-full flex flex-col rounded-2xl p-6 shadow-inner`}>
      <motion.h2 initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-heading text-base font-black mb-4 text-white">{slide.title}</motion.h2>
      <div className="space-y-3 flex-1 overflow-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white/15 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
          <p className="font-body text-[10px] text-white/70 font-bold mb-1">🟢 Opening — शुरुआत</p>
          <p className="font-body text-xs italic text-white font-medium">"{slide.opening}"</p>
        </motion.div>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white/15 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
          <p className="font-body text-[10px] text-white/70 font-bold mb-1">🔴 Closing — समापन</p>
          <p className="font-body text-xs italic text-white font-medium">"{slide.closing}"</p>
        </motion.div>
      </div>
    </div>
  );

  if (slide.type === 'tips') return (
    <div className="h-full flex flex-col bg-blue-50 dark:bg-blue-950/40 rounded-2xl p-5 border border-blue-200/40">
      <motion.h2 initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-heading text-base font-black text-blue-700 dark:text-blue-400 mb-4">{slide.title}</motion.h2>
      <div className="flex-1 space-y-2 overflow-auto">
        {slide.tips.map((tip, i) => (
          <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.06 }}
            className="flex items-start gap-2.5 bg-white dark:bg-slate-900 rounded-xl p-3 shadow-xs border border-slate-100 dark:border-slate-800">
            <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{i + 1}</span>
            <p className="font-body text-xs font-medium text-foreground">{tip}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (slide.type === 'end') return (
    <div className={`bg-gradient-to-br ${bgGradClass} h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl shadow-inner`}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="text-6xl mb-4">🏆</motion.div>
      <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="font-heading text-2xl font-black mb-2 text-white">{slide.title}</motion.h1>
      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="font-body text-xs text-white/80 mb-2 font-bold">{slide.subtitle}</motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="font-body text-xs italic bg-white/20 text-white px-4 py-2 rounded-xl font-medium">{slide.quote}</motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-5 text-[9px] opacity-60 font-body text-white">NKG MATH UNIVERSE</motion.div>
    </div>
  );

  return null;
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
};

export default function PPTViewer({ topic, detail }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const slides = generateSlides(topic, detail);

  const go = (d) => {
    setDir(d);
    setCurrent(c => Math.max(0, Math.min(slides.length - 1, c + d)));
  };

  // 🔥 SUDHAAR: Keyboard arrow keys navigation hooks injection
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (current < slides.length - 1) go(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (current > 0) go(-1);
      } else if (e.key === 'Escape' && fullscreen) {
        setFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, fullscreen, slides.length]);

  return (
    <div className={`${fullscreen ? 'fixed inset-0 z-50 bg-slate-950 flex flex-col p-4' : 'relative w-full max-w-xl mx-auto my-2'}`}>
      {/* Controls Dashboard Header */}
      <div className={`flex items-center justify-between mb-2.5 ${fullscreen ? 'text-white' : 'text-foreground'}`}>
        <span className="font-body text-xs font-black flex items-center gap-1">
          🎞️ {fullscreen ? 'PPT Fullscreen Mode' : 'PPT व्यूअर (Slides)'}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="font-body text-xs font-bold opacity-75">{current + 1} / {slides.length}</span>
          <button
            onClick={() => downloadPPTAsHTML(slides, detail.title)}
            title="Download Presentation Template"
            className="flex items-center gap-1 px-2.5 py-1.5 bg-green-600 dark:bg-green-700 hover:bg-green-700 text-white rounded-xl font-body font-black text-[11px] transition-all active:scale-95 shadow-xs"
          >
            <FileDown size={13} /> डाउनलोड HTML
          </button>
          <button 
            onClick={() => setFullscreen(!fullscreen)} 
            className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-foreground rounded-xl transition-all active:scale-90"
          >
            {fullscreen ? <X size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* Primary Slide Display Arena */}
      <div className={`relative overflow-hidden rounded-2xl border-2 border-border ${fullscreen ? 'flex-1 my-2' : 'aspect-[16/10] w-full'} bg-slate-100 dark:bg-slate-950 shadow-md`}>
        <AnimatePresence custom={dir} mode="wait">
          <motion.div 
            key={current} 
            custom={dir} 
            variants={slideVariants} 
            initial="enter" 
            animate="center" 
            exit="exit"
            transition={{ type: 'tween', duration: 0.25 }} 
            className="absolute inset-0 p-1"
          >
            <SlideContent slide={slides[current]} />
          </motion.div>
        </AnimatePresence>

        {/* Direction Navigation Overlay Arrows */}
        <button 
          onClick={() => go(-1)} 
          disabled={current === 0}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 disabled:opacity-10 transition-all active:scale-90"
        >
          <ChevronLeft size={18} />
        </button>
        <button 
          onClick={() => go(1)} 
          disabled={current === slides.length - 1}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 disabled:opacity-10 transition-all active:scale-90"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Radial Dot Tracking Bar */}
      <div className="flex justify-center gap-1 mt-2.5 flex-wrap">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
            className={`rounded-full transition-all duration-150 ${i === current ? 'w-4 h-1.5 bg-purple-600' : 'w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700'}`} 
          />
        ))}
      </div>

      {/* Horizontal Strip Thumbnails Carousel */}
      {!fullscreen && (
        <div className="flex gap-1.5 mt-2.5 overflow-x-auto pb-1 scrollbar-none select-none">
          {slides.map((slide, i) => {
            const thumbGrad = GRADIENT_CLASSES[slide.bg] || 'from-purple-500 to-indigo-600';
            return (
              <button 
                key={i} 
                onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                className={`shrink-0 w-12 h-8 rounded-lg overflow-hidden border-2 transition-all ${i === current ? 'border-purple-600 scale-102 shadow-xs' : 'border-transparent opacity-65 hover:opacity-100'}`}
              >
                <div className={`w-full h-full bg-gradient-to-br ${thumbGrad} flex items-center justify-center text-white text-[10px] font-black`}>
                  {i + 1}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
