import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const numberNames = [
  { n: '1', hindi: 'एक' }, { n: '2', hindi: 'दो' }, { n: '3', hindi: 'तीन' },
  { n: '4', hindi: 'चार' }, { n: '5', hindi: 'पाँच' }, { n: '6', hindi: 'छः' },
  { n: '7', hindi: 'सात' }, { n: '8', hindi: 'आठ' }, { n: '9', hindi: 'नौ' },
  { n: '10', hindi: 'दस' }, { n: '20', hindi: 'बीस' }, { n: '30', hindi: 'तीस' },
  { n: '40', hindi: 'चालीस' }, { n: '50', hindi: 'पचास' }, { n: '60', hindi: 'साठ' },
  { n: '70', hindi: 'सत्तर' }, { n: '80', hindi: 'अस्सी' }, { n: '90', hindi: 'नब्बे' },
  { n: '100', hindi: 'सौ' }, { n: '1,000', hindi: 'हज़ार' }, { n: '1,00,000', hindi: 'लाख' },
  { n: '1,00,00,000', hindi: 'करोड़' },
];

const shapes = [
  { name: 'वृत्त (Circle)', emoji: '⭕', props: 'कोई भुजा नहीं, 1 वक्र किनारा' },
  { name: 'त्रिभुज (Triangle)', emoji: '🔺', props: '3 भुजाएं, 3 कोण, कोणों का योग = 180°' },
  { name: 'वर्ग (Square)', emoji: '🟧', props: '4 समान भुजाएं, 4 समकोण (90°)' },
  { name: 'आयत (Rectangle)', emoji: '🟦', props: 'आमने-सामने की भुजाएं समान, 4 समकोण' },
  { name: 'समांतर चतुर्भुज', emoji: '🔷', props: 'आमने-सामने की भुजाएं समांतर और समान' },
  { name: 'समचतुर्भुज (Rhombus)', emoji: '💎', props: '4 समान भुजाएं, विकर्ण लम्बवत' },
  { name: 'समलंब (Trapezium)', emoji: '⬛', props: 'एक जोड़ी समांतर भुजाएं' },
  { name: 'पंचभुज (Pentagon)', emoji: '⬠', props: '5 भुजाएं, आंतरिक कोणों का योग = 540°' },
  { name: 'षट्भुज (Hexagon)', emoji: '⬡', props: '6 भुजाएं, आंतरिक कोणों का योग = 720°' },
];

const mathFacts = [
  '0 न तो धनात्मक (Positive) है और न ही ऋणात्मक (Negative)।',
  'π (पाई) = 3.14159... यह एक अपरिमेय संख्या है जो कभी खत्म नहीं होती।',
  '1 अकेली ऐसी संख्या है जो न तो अभाज्य (Prime) है और न ही भाज्य (Composite)।',
  '111,111,111 × 111,111,111 = 12,345,678,987,654,321 (एक अनोखा पिरामिड पैटर्न!)',
  'रोमन अंकों (Roman Numerals) में शून्य (0) लिखने के लिए कोई चिन्ह नहीं होता।',
  'गोलाकार (Sphere) आकृति का कोई भी किनारा या कोना (Vertex) नहीं होता।',
  '2 पूरे ब्रह्मांड में एकमात्र ऐसी संख्या है जो सम (Even) भी है और अभाज्य (Prime) भी।',
  '"FOUR" अंग्रेजी की एकमात्र संख्या है जिसमें उतने ही अक्षर हैं जितना उसका मान है।',
  'एक गूगोल (Googol) का मतलब 1 के पीछे 100 शून्य (10¹⁰⁰) होता है। इसी से "Google" नाम पड़ा।',
  'पाइथागोरस प्रमेय (Pythagoras Theorem) का इतिहास 2500 से भी ज़्यादा साल पुराना है।',
];

const placeValues = [
  { place: 'इकाई (Ones)', value: '1', example: '5' },
  { place: 'दहाई (Tens)', value: '10', example: '50' },
  { place: 'सैकड़ा (Hundreds)', value: '100', example: '500' },
  { place: 'हज़ार (Thousands)', value: '1,000', example: '5,000' },
  { place: 'दस हज़ार (Ten Thousands)', value: '10,000', example: '50,000' },
  { place: 'लाख (Lakhs)', value: '1,00,000', example: '5,00,00,000' },
  { place: 'दस लाख (Ten Lakhs)', value: '10,00,000', example: '50,00,00,000' },
  { place: 'करोड़ (Crores)', value: '1,00,00,000', example: '5,00,00,00,000' },
];

export default function GeneralMath() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-2">
          💡 गणित का सामान्य ज्ञान / General Knowledge
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">
          गणित से जुड़ी दिलचस्प बातें, सुंदर आकृतियाँ और ज़रूरी नियम!
        </p>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="facts" className="w-full">
        <div className="w-full max-w-2xl mx-auto mb-8 overflow-x-auto no-scrollbar">
          <TabsList className="flex w-full bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl min-w-[400px]">
            <TabsTrigger value="facts" className="flex-1 rounded-xl font-bold text-xs md:text-sm py-2.5 transition-all">
              🌟 रोचक तथ्य
            </TabsTrigger>
            <TabsTrigger value="shapes" className="flex-1 rounded-xl font-bold text-xs md:text-sm py-2.5 transition-all">
              🔷 आकृतियाँ
            </TabsTrigger>
            <TabsTrigger value="numbers" className="flex-1 rounded-xl font-bold text-xs md:text-sm py-2.5 transition-all">
              🔢 हिंदी गिनती
            </TabsTrigger>
            <TabsTrigger value="places" className="flex-1 rounded-xl font-bold text-xs md:text-sm py-2.5 transition-all">
              📊 स्थानीय मान
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Math Facts */}
        <TabsContent value="facts" className="focus-visible:outline-none">
          <div className="space-y-4">
            {mathFacts.map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 100 }}
                className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-900 border border-amber-100 dark:border-slate-800 rounded-2xl p-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span className="text-2xl shrink-0 p-1 bg-amber-100 dark:bg-slate-800 rounded-xl" role="img" aria-label="light bulb">
                  💡
                </span>
                <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm md:text-base pt-1 leading-relaxed">
                  {fact}
                </p>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Tab 2: Shapes */}
        <TabsContent value="shapes" className="focus-visible:outline-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shapes.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md hover:border-indigo-100 dark:hover:border-slate-700 transition-all text-center flex flex-col justify-center items-center"
              >
                <div className="text-5xl mb-3 drop-shadow-sm" role="img" aria-label={s.name}>
                  {s.emoji}
                </div>
                <h3 className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                  {s.name}
                </h3>
                <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 max-w-[200px]">
                  {s.props}
                </p>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Tab 3: Hindi Counting */}
        <TabsContent value="numbers" className="focus-visible:outline-none">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {numberNames.map((n, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white rounded-2xl p-4 text-center shadow-sm hover:scale-[1.03] transition-transform duration-200"
              >
                <div className="text-2xl font-black tracking-tight mb-0.5">{n.n}</div>
                <div className="text-xs font-bold text-emerald-50 dark:text-teal-100 opacity-90">{n.hindi}</div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Tab 4: Place Values */}
        <TabsContent value="places" className="focus-visible:outline-none">
          <div className="space-y-3">
            {placeValues.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:border-indigo-100 dark:hover:border-slate-700 transition-all"
              >
                <div>
                  <h3 className="text-base md:text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
                    {p.place}
                  </h3>
                  <p className="text-xs md:text-sm font-bold text-slate-400 dark:text-slate-500 mt-0.5">
                    गुणक मान: {p.value}
                  </p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl px-4 py-2 font-black text-sm md:text-base border border-indigo-100/30">
                  उदाहरण: {p.example}
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
