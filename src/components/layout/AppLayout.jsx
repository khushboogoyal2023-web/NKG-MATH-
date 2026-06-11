import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, Compass, Award, HelpCircle, 
  Settings, LayoutDashboard, Brain, Dna, 
  Lightbulb, TestTube, Menu, X, ChevronRight 
} from 'lucide-react';

const menuItems = [
  { path: '/', label: 'होम (Home)', icon: Compass },
  { path: '/classes', label: 'स्कूल क्लासेस', icon: BookOpen },
  { path: '/vedic-math', label: 'वैदिक गणित', icon: Brain },
  { path: '/math-tricks', label: 'मैथ ट्रिक्स', icon: Lightbulb },
  { path: '/formulas', label: 'सारे फॉर्मूले', icon: Dna },
  { path: '/quiz', label: 'क्विज़ चैलेंज', icon: HelpCircle },
  { path: '/ai-solver', label: 'AI मैथ सॉल्वर', icon: Sparkles },
  { path: '/virtual-lab', label: 'वर्चुअल लैब', icon: TestTube },
  { path: '/progress', label: 'आपकी प्रोग्रेस', icon: LayoutDashboard },
  { path: '/settings', label: 'सेटिंग्स', icon: Settings },
];

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background font-body text-foreground overflow-hidden">
      {/* मोबाइल के लिए साइडबार ओपन/क्लोज बटन */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-xl shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* साइडबार (Sidebar Navigation) */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border p-4 flex flex-col justify-between transition-transform duration-300
        md:translate-x-0 md:static md:inset-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* ऐप का लोगो और नाम */}
          <div className="flex items-center gap-3 px-2 py-4 mb-4 border-b">
            <span className="text-3xl">🔢</span>
            <div>
              <h1 className="font-heading text-xl text-primary tracking-wide">NKG MATH</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Universe</p>
            </div>
          </div>

          {/* मेनू लिंक्स */}
          <nav className="space-y-1 overflow-y-auto max-h-[70vh] pr-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' 
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? 'text-white' : 'text-primary'} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'text-white' : ''}`} />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* साइडबार का निचला हिस्सा */}
        <div className="p-2 bg-muted/50 rounded-2xl text-center border">
          <p className="text-xs font-bold text-foreground">🌟 NKG यूनिवर्स</p>
          <p className="text-[10px] text-muted-foreground">Version 1.0.0</p>
        </div>
      </div>

      {/* मुख्य कंटेंट एरिया (Main Content Area) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ऊपर का हेडर */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center justify-between px-6 md:px-8 shrink-0">
          <div className="hidden md:block">
            <p className="text-xs text-muted-foreground">स्वागत है आपका,</p>
            <h2 className="text-sm font-bold text-foreground">गणित की जादुई दुनिया में ✨</h2>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1.5 bg-secondary/10 text-secondary px-3 py-1.5 rounded-xl text-xs font-bold border border-secondary/20">
              <span>🔥</span> 0 Day Streak
            </div>
          </div>
        </header>

        {/* यहाँ आपके सारे अलग-अलग पेज लोड होंगे */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
