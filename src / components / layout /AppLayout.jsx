import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, BookOpen, Calculator, Gamepad2, HelpCircle, Star, Menu, X, 
  Trophy, FileText, Lightbulb, ChevronLeft, BookCopy, FileDown, 
  FlaskConical, Wand2, Blocks, Brain, FlaskRound, User, LayoutDashboard, 
  Settings, Headphones, TrendingUp, Grid, Edit3, LogIn 
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NKGLogo from '../shared/NKGLogo';
import { useIsMobile } from '@/hooks/use-mobile';
import PullToRefresh from './PullToRefresh';
import PageTransition from './PageTransition';
import { useScrollPreservation } from '@/hooks/useScrollPreservation';

// All Application Navigation paths synced with child views
const navItems = [
  { path: '/', label: 'होम', icon: Home },
  { path: '/dashboard-planner', label: 'डैशबोर्ड प्लानर', icon: LayoutDashboard },
  { path: '/coordinate-geometry', label: 'निर्देशांक ज्यामिति', icon: Grid },
  { path: '/math-notepad', label: 'मैथ नोटपैड', icon: Edit3 },
  { path: '/classes', label: 'कक्षाएं', icon: BookOpen },
  { path: '/tables', label: 'पहाड़े', icon: Calculator },
  { path: '/games', label: '500 Levels खेल', icon: Gamepad2 },
  { path: '/quiz', label: 'क्विज़ गेम', icon: HelpCircle },
  { path: '/daily-challenge', label: 'चैलेंज', icon: Trophy },
  { path: '/formulas', label: 'सूत्र बुक', icon: FileText },
  { path: '/general-math', label: 'सामान्य गणित', icon: Lightbulb },
  { path: '/workbook', label: 'वर्कबुक', icon: BookCopy },
  { path: '/worksheets', label: 'वर्कशीट डाउनलोड', icon: FileDown },
  { path: '/mathematicians', label: 'गणितज्ञ जीवनी', icon: FlaskConical },
  { path: '/math-puzzles', label: '200+ पहेलियाँ', icon: Brain },
  { path: '/math-tricks', label: 'दिमागी ट्रिक्स', icon: Star },
  { path: '/math-models', label: 'मैथ मॉडल्स लैब', icon: Blocks },
  { path: '/ai-solver', label: 'AI कैमरा सॉल्वर', icon: Brain },
  { path: '/virtual-lab', label: 'वर्चुअल प्रयोग', icon: FlaskRound },
  { path: '/settings', label: 'सेटिंग्स', icon: Settings },
];

// Fixed Help & Support mapping and added custom login triggers
const drawerMenuItems = [
  { path: '/', label: 'होम', icon: Home },
  { path: '/dashboard-planner', label: 'Kids Core Dashboard', icon: LayoutDashboard },
  { path: '/ai-solver', label: 'AI Math Scanner', icon: Brain },
  { path: '/virtual-lab', label: 'वर्चुअल लैब प्रयोग', icon: FlaskRound },
  { path: '/coordinate-geometry', label: 'Coordinate Graph Board', icon: Grid },
  { path: '/math-puzzles', label: '200 Math Brain Exercises', icon: Brain },
  { path: '/math-notepad', label: 'Student Notebook/Notepad', icon: Edit3 },
  { path: '/math-models', label: 'Math Lab / मॉडल', icon: Blocks },
  { path: '/login', label: 'Custom Login / प्रोफाइल', icon: LogIn },
  { path: '/settings', label: 'Settings / सेटिंग्स', icon: Settings },
  { path: '/help-support', label: 'Help & Support (सहायता)', icon: Headphones }, // Fixed from general-math mapping issue
];

const bottomNavItems = [
  { path: '/', label: 'होम', icon: Home },
  { path: '/dashboard-planner', label: 'प्लानर', icon: LayoutDashboard },
  { path: '/games', label: 'खेल', icon: Gamepad2 },
  { path: '/ai-solver', label: 'AI सॉल्वर', icon: Brain },
  { path: '/math-notepad', label: 'नोटपैड', icon: Edit3 }
];

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isHome = location.pathname === '/';
  useScrollPreservation();

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300" style={{ overscrollBehavior: 'none' }}>
      {/* Dynamic Header with Cartoon Accent Borders */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg select-none border-b-4 border-purple-500/30" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          
          {/* Back button configuration with enhanced touch targets */}
          {isMobile && !isHome ? (
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-white/10 transition min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
              aria-label="वापस जाएं"
            >
              <ChevronLeft size={24} />
            </button>
          ) : (
            <Link to="/" className="flex items-center gap-2" aria-label="NKG Math Universe Home">
              <NKGLogo size="sm" />
              <div>
                <h1 className="font-heading text-xl md:text-2xl leading-tight tracking-wide">NKG MATH UNIVERSE</h1>
                <p className="text-[10px] md:text-xs opacity-90 font-body">गणित की अनोखी दुनिया! 🎉</p>
              </div>
            </Link>
          )}

          {isMobile && !isHome && (
            <Link to="/" className="flex items-center gap-1.5 flex-1 justify-center mr-6">
              <NKGLogo size="sm" />
              <span className="font-heading text-lg truncate">NKG MATH</span>
            </Link>
          )}

          <div className="flex items-center gap-1 ml-auto">
            {/* Morphing Hamburger Menu Controls */}
            <button
              className="p-2.5 rounded-xl hover:bg-white/10 transition min-w-[44px] min-h-[44px] flex items-center justify-center relative"
              onClick={() => setDrawerOpen(o => !o)}
              aria-label={drawerOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
              aria-expanded={drawerOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {drawerOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Desktop Navigation Systems */}
            <nav className="hidden md:flex items-center gap-1 flex-wrap" aria-label="मुख्य नेविगेशन">
              {navItems.slice(0, 8).map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}
                    className={`px-3 py-2 rounded-xl text-xs font-bold font-body transition-all select-none min-h-[40px] flex items-center ${isActive ? 'bg-white/20 scale-105 shadow-inner' : 'hover:bg-white/10'}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="flex items-center gap-1.5">
                      <item.icon size={14} aria-hidden="true" />
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Navigation Drawer Layout Drawer Panel */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
              onClick={closeDrawer}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 bg-card border-l border-border shadow-2xl flex flex-col"
              style={{ paddingTop: 'env(safe-area-inset-top)' }}
            >
              <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <NKGLogo size="sm" />
                  <span className="font-heading text-lg">किड्स मेनू 🧸</span>
                </div>
                <button onClick={closeDrawer} className="p-2 rounded-xl hover:bg-white/10 min-w-[40px] min-h-[40px] flex items-center justify-center">
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Drawer Links Context */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin">
                {drawerMenuItems.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div key={item.path} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.03 }}>
                      <Link
                        to={item.path}
                        onClick={closeDrawer}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-body font-bold transition-all min-h-[52px] ${isActive ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-muted text-foreground'}`}
                      >
                        <item.icon size={19} aria-hidden="true" />
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="border-t my-3 border-border" />
                <p className="text-xs text-muted-foreground font-body px-4 mb-2 font-bold uppercase tracking-wider">अतिरिक्त टूल्स और कक्षाएं</p>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link key={item.path} to={item.path} onClick={closeDrawer}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm transition-all min-h-[44px] ${isActive ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted/60 text-foreground'}`}
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-border text-center bg-muted/30">
                <p className="text-xs text-muted-foreground font-body">🔢 NKG MATH UNIVERSE © 2026</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Container Viewport Injection */}
      <PullToRefresh>
        <main
          className="flex-1 overflow-hidden"
          style={{ paddingBottom: isMobile ? 'calc(64px + env(safe-area-inset-bottom))' : undefined }}
        >
          <AnimatePresence mode="wait">
            <PageTransition locationKey={location.pathname}>
              {/* Ensures text content is strictly visible in custom dark mode scenarios */}
              <div className="text-foreground dark:text-slate-100 min-h-full">
                <Outlet />
              </div>
            </PageTransition>
          </AnimatePresence>
        </main>
      </PullToRefresh>

      {/* Desktop Persistent Footer View */}
      {!isMobile && (
        <footer className="bg-primary/5 border-t border-border text-center py-3 px-4" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <p className="text-sm text-muted-foreground font-body font-medium">🔢 NKG MATH UNIVERSE © 2026 | खेलो, सीखो और जीतो! 🏆</p>
        </footer>
      )}

      {/* Mobile Sticky Bottom Tab Bar */}
      {isMobile && (
        <nav aria-label="बॉटम नेविगेशन" className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-2xl select-none" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <div className="flex items-stretch h-14">
            {bottomNavItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <button key={item.path} onClick={() => { if (!isActive) navigate(item.path); }}
                  aria-current={isActive ? 'page' : undefined} aria-label={item.label}
                  className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-1 transition-transform active:scale-95 duration-150 relative ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {isActive && (
                    <motion.div layoutId="bottomNavIndicator" className="absolute top-0 h-1 w-12 bg-primary rounded-full shadow-xs" />
                  )}
                  <item.icon size={20} aria-hidden="true" className={isActive ? "scale-110" : ""} />
                  <span className="text-[10px] font-black font-body leading-none mt-0.5">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
