import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const glossaryData = [
  // Arithmetic
  { term: 'संख्या (Number)', definition: 'गिनती के लिए उपयोग किए जाने वाले प्रतीक। जैसे: 0,1,2,3...', formula: null, category: 'अंकगणित', class: '1', en: 'Number' },
  { term: 'सम संख्या (Even Number)', definition: '2 से पूरी तरह विभाज्य संख्याएं।', formula: '2, 4, 6, 8, 10...', category: 'अंकगणित', class: '1', en: 'Even Number' },
  { term: 'विषम संख्या (Odd Number)', definition: '2 से विभाज्य न होने वाली संख्याएं।', formula: '1, 3, 5, 7, 9...', category: 'अंकगणित', class: '1', en: 'Odd Number' },
  { term: 'अभाज्य संख्या (Prime Number)', definition: 'केवल 1 और खुद से विभाज्य संख्या।', formula: '2, 3, 5, 7, 11, 13...', category: 'अंकगणित', class: '4', en: 'Prime Number' },
  { term: 'भाज्य संख्या (Composite Number)', definition: '1 से अधिक गुणनखंड वाली संख्या।', formula: '4, 6, 8, 9, 10...', category: 'अंकगणित', class: '4', en: 'Composite Number' },
  { term: 'महत्तम समापवर्तक (HCF)', definition: 'दो या अधिक संख्याओं का सबसे बड़ा उभयनिष्ठ गुणनखंड।', formula: 'HCF(12,18) = 6', category: 'अंकगणित', class: '5', en: 'HCF' },
  { term: 'लघुत्तम समापवर्त्य (LCM)', definition: 'दो या अधिक संख्याओं का सबसे छोटा उभयनिष्ठ गुणज।', formula: 'LCM(4,6) = 12', category: 'अंकगणित', class: '5', en: 'LCM' },
  { term: 'भिन्न (Fraction)', definition: 'एक पूर्ण के भाग को दर्शाने वाली संख्या।', formula: 'p/q जहाँ q≠0', category: 'अंकगणित', class: '3', en: 'Fraction' },
  { term: 'दशमलव (Decimal)', definition: 'दशमलव बिंदु वाली संख्या।', formula: '3.14, 0.5, 2.75', category: 'अंकगणित', class: '4', en: 'Decimal' },
  { term: 'प्रतिशत (Percentage)', definition: '100 के अनुपात में व्यक्त संख्या।', formula: 'x% = x/100', category: 'अंकगणित', class: '5', en: 'Percentage' },
  { term: 'अनुपात (Ratio)', definition: 'दो राशियों की तुलना।', formula: 'a:b = a/b', category: 'अंकगणित', class: '6', en: 'Ratio' },
  { term: 'समानुपात (Proportion)', definition: 'दो अनुपातों की समानता।', formula: 'a:b = c:d → ad = bc', category: 'अंकगणित', class: '6', en: 'Proportion' },
  { term: 'पूर्णांक (Integer)', definition: 'सभी धनात्मक, शून्य और ऋणात्मक संख्याएं।', formula: '...-3,-2,-1,0,1,2,3...', category: 'अंकगणित', class: '6', en: 'Integer' },
  { term: 'परिमेय संख्या (Rational Number)', definition: 'p/q रूप में लिखी जा सकने वाली संख्या।', formula: 'p/q, q≠0', category: 'अंकगणित', class: '7', en: 'Rational Number' },
  { term: 'अपरिमेय संख्या (Irrational Number)', definition: 'p/q रूप में न लिखी जा सकने वाली संख्या।', formula: '√2, π, √3', category: 'अंकगणित', class: '9', en: 'Irrational Number' },
  { term: 'वर्गमूल (Square Root)', definition: 'वह संख्या जिसे खुद से गुणा करने पर दी गई संख्या मिले।', formula: '√25 = 5', category: 'अंकगणित', class: '7', en: 'Square Root' },
  { term: 'घनमूल (Cube Root)', definition: 'वह संख्या जिसे तीन बार गुणा करने पर दी गई संख्या मिले।', formula: '∛27 = 3', category: 'अंकगणित', class: '8', en: 'Cube Root' },
  { term: 'साधारण ब्याज (Simple Interest)', definition: 'मूलधन पर निश्चित दर से निश्चित समय का ब्याज।', formula: 'SI = (P×R×T)/100', category: 'अंकगणित', class: '7', en: 'Simple Interest' },
  { term: 'चक्रवृद्धि ब्याज (Compound Interest)', definition: 'प्रत्येक अवधि में ब्याज पर भी ब्याज।', formula: 'CI = P(1+R/100)ⁿ - P', category: 'अंकगणित', class: '8', en: 'Compound Interest' },
  { term: 'लाभ और हानि (Profit & Loss)', definition: 'क्रय मूल्य और विक्रय मूल्य का अंतर।', formula: 'Profit% = (Profit/CP)×100', category: 'अंकगणित', class: '7', en: 'Profit & Loss' },
  // Geometry
  { term: 'बिंदु (Point)', definition: 'स्थान का एक निश्चित स्थान जिसका कोई आयाम नहीं।', formula: '• P', category: 'ज्यामिति', class: '3', en: 'Point' },
  { term: 'रेखा (Line)', definition: 'दोनों दिशाओं में अनंत तक फैली सीधी रेखा।', formula: '←——→', category: 'ज्यामिति', class: '3', en: 'Line' },
  { term: 'रेखाखंड (Line Segment)', definition: 'दो बिंदुओं के बीच की निश्चित लंबाई।', formula: 'AB |——|', category: 'ज्यामिति', class: '3', en: 'Line Segment' },
  { term: 'किरण (Ray)', definition: 'एक बिंदु से शुरू होकर एक दिशा में अनंत तक।', formula: 'A•——→', category: 'ज्यामिति', class: '3', en: 'Ray' },
  { term: 'कोण (Angle)', definition: 'दो किरणों के मिलने पर बना झुकाव।', formula: '∠ABC', category: 'ज्यामिति', class: '4', en: 'Angle' },
  { term: 'न्यून कोण (Acute Angle)', definition: '0° से 90° के बीच का कोण।', formula: '0° < θ < 90°', category: 'ज्यामिति', class: '4', en: 'Acute Angle' },
  { term: 'समकोण (Right Angle)', definition: 'ठीक 90° का कोण।', formula: 'θ = 90°', category: 'ज्यामिति', class: '4', en: 'Right Angle' },
  { term: 'अधिक कोण (Obtuse Angle)', definition: '90° से 180° के बीच का कोण।', formula: '90° < θ < 180°', category: 'ज्यामिति', class: '4', en: 'Obtuse Angle' },
  { term: 'ऋजु कोण (Straight Angle)', definition: 'ठीक 180° का कोण।', formula: 'θ = 180°', category: 'ज्यामिति', class: '5', en: 'Straight Angle' },
  { term: 'प्रतिवर्त कोण (Reflex Angle)', definition: '180° से 360° के बीच का कोण।', formula: '180° < θ < 360°', category: 'ज्यामिति', class: '5', en: 'Reflex Angle' },
  { term: 'त्रिभुज (Triangle)', definition: 'तीन भुजाओं और तीन कोणों वाली बहुभुज।', formula: 'क्षेत्रफल = ½ × b × h', category: 'ज्यामिति', class: '4', en: 'Triangle' },
  { term: 'समबाहु त्रिभुज (Equilateral Triangle)', definition: 'तीनों भुजाएं बराबर।', formula: 'a = b = c, ∠A=∠B=∠C=60°', category: 'ज्यामिति', class: '5', en: 'Equilateral Triangle' },
  { term: 'समद्विबाहु त्रिभुज (Isosceles Triangle)', definition: 'दो भुजाएं बराबर।', formula: 'a = b ≠ c', category: 'ज्यामिति', class: '5', en: 'Isosceles Triangle' },
  { term: 'चतुर्भुज (Quadrilateral)', definition: 'चार भुजाओं वाली आकृति।', formula: 'कोणों का योग = 360°', category: 'ज्यामिति', class: '5', en: 'Quadrilateral' },
  { term: 'समांतर चतुर्भुज (Parallelogram)', definition: 'आमने-सामने की भुजाएं समानांतर और बराबर।', formula: 'Area = base × height', category: 'ज्यामिति', class: '6', en: 'Parallelogram' },
  { term: 'वृत्त (Circle)', definition: 'एक बिंदु से समान दूरी पर स्थित सभी बिंदुओं का समूह।', formula: 'C = 2πr, A = πr²', category: 'ज्यामिति', class: '5', en: 'Circle' },
  { term: 'त्रिज्या (Radius)', definition: 'केंद्र से परिधि तक की दूरी।', formula: 'r = d/2', category: 'ज्यामिति', class: '5', en: 'Radius' },
  { term: 'व्यास (Diameter)', definition: 'वृत्त को बीचों-बीच से काटने वाली सबसे लंबी जीवा।', formula: 'd = 2r', category: 'ज्यामिति', class: '5', en: 'Diameter' },
  { term: 'परिधि (Circumference)', definition: 'वृत्त की सीमा की लंबाई।', formula: 'C = 2πr = πd', category: 'ज्यामिति', class: '5', en: 'Circumference' },
  { term: 'पाइथागोरस प्रमेय (Pythagoras Theorem)', definition: 'समकोण त्रिभुज में: कर्ण² = भुजा₁² + भुजा₂²', formula: 'c² = a² + b²', category: 'ज्यामिति', class: '7', en: 'Pythagoras Theorem' },
  { term: 'सर्वांगसम (Congruent)', definition: 'एक ही आकार और साइज की आकृतियां।', formula: 'ΔABC ≅ ΔPQR', category: 'ज्यामिति', class: '7', en: 'Congruent' },
  { term: 'समरूप (Similar)', definition: 'एक ही आकार पर अलग साइज की आकृतियां।', formula: 'ΔABC ~ ΔPQR', category: 'ज्यामिति', class: '8', en: 'Similar' },
  // Algebra
  { term: 'चर (Variable)', definition: 'अज्ञात मान को दर्शाने वाला अक्षर।', formula: 'x, y, z, a, b', category: 'बीजगणित', class: '6', en: 'Variable' },
  { term: 'अचर (Constant)', definition: 'निश्चित मान जो बदलता नहीं।', formula: '5, -3, π, 100', category: 'बीजगणित', class: '6', en: 'Constant' },
  { term: 'समीकरण (Equation)', definition: 'दो व्यंजकों को बराबर करने वाला कथन।', formula: '2x + 3 = 11', category: 'बीजगणित', class: '6', en: 'Equation' },
  { term: 'बहुपद (Polynomial)', definition: 'एक या अधिक पदों का व्यंजक।', formula: 'ax² + bx + c', category: 'बीजगणित', class: '7', en: 'Polynomial' },
  { term: 'गुणनखंड (Factor)', definition: 'वह संख्या या व्यंजक जो किसी को पूरी तरह विभाजित करे।', formula: 'x²-4 = (x+2)(x-2)', category: 'बीजगणित', class: '7', en: 'Factor' },
  { term: 'रैखिक समीकरण (Linear Equation)', definition: 'चर की घात 1 वाला समीकरण।', formula: 'ax + b = c', category: 'बीजगणित', class: '8', en: 'Linear Equation' },
  { term: 'द्विघात समीकरण (Quadratic Equation)', definition: 'चर की घात 2 वाला समीकरण।', formula: 'ax² + bx + c = 0', category: 'बीजगणित', class: '9', en: 'Quadratic Equation' },
  { term: 'श्रेढी (Progression)', definition: 'संख्याओं का ऐसा क्रम जो एक नियम का पालन करे।', formula: 'AP: a, a+d, a+2d...', category: 'बीजगणित', class: '9', en: 'Progression' },
  { term: 'सर्वसमिका (Identity)', definition: 'हर मान के लिए सत्य समीकरण।', formula: '(a+b)² = a²+2ab+b²', category: 'बीजगणित', class: '8', en: 'Identity' },
  { term: 'निर्देशांक (Coordinate)', definition: 'कार्तीय तल पर बिंदु की स्थिति।', formula: '(x, y)', category: 'बीजगणित', class: '9', en: 'Coordinate' },
  // Mensuration
  { term: 'क्षेत्रफल (Area)', definition: 'किसी आकृति की सतह का माप।', formula: 'वर्ग: a², आयत: l×b', category: 'क्षेत्रमिति', class: '4', en: 'Area' },
  { term: 'परिमाप (Perimeter)', definition: 'किसी आकृति की सीमा की कुल लंबाई।', formula: 'आयत: 2(l+b)', category: 'क्षेत्रमिति', class: '4', en: 'Perimeter' },
  { term: 'आयतन (Volume)', definition: 'त्रि-आयामी वस्तु द्वारा घेरा गया स्थान।', formula: 'घन: a³, घनाभ: l×b×h', category: 'क्षेत्रमिति', class: '7', en: 'Volume' },
  { term: 'पृष्ठीय क्षेत्रफल (Surface Area)', definition: 'ठोस की बाहरी सतह का क्षेत्रफल।', formula: 'घन: 6a²', category: 'क्षेत्रमिति', class: '7', en: 'Surface Area' },
  { term: 'घन (Cube)', definition: 'छः बराबर वर्गाकार फलकों वाला ठोस।', formula: 'V=a³, SA=6a²', category: 'क्षेत्रमिति', class: '6', en: 'Cube' },
  { term: 'घनाभ (Cuboid)', definition: 'छः आयताकार फलकों वाला ठोस।', formula: 'V=lbh, SA=2(lb+bh+lh)', category: 'क्षेत्रमिति', class: '6', en: 'Cuboid' },
  { term: 'बेलन (Cylinder)', definition: 'दो समानांतर वृत्ताकार आधारों वाला ठोस।', formula: 'V=πr²h, CSA=2πrh', category: 'क्षेत्रमिति', class: '7', en: 'Cylinder' },
  { term: 'शंकु (Cone)', definition: 'एक वृत्ताकार आधार और एक शीर्ष वाला ठोस।', formula: 'V=⅓πr²h, CSA=πrl', category: 'क्षेत्रमिति', class: '7', en: 'Cone' },
  { term: 'गोला (Sphere)', definition: 'केंद्र से समान दूरी पर सभी बिंदुओं वाला ठोस।', formula: 'V=⁴⁄₃πr³, SA=4πr²', category: 'क्षेत्रमिति', class: '9', en: 'Sphere' },
  { term: 'त्रापेज़ियम (Trapezium)', definition: 'एक जोड़ी समानांतर भुजाओं वाला चतुर्भुज।', formula: 'A=½(a+b)×h', category: 'क्षेत्रमिति', class: '7', en: 'Trapezium' },
];

const categories = ['सभी', 'अंकगणित', 'ज्यामिति', 'बीजगणित', 'क्षेत्रमिति'];
const catColors = {
  'अंकगणित': 'from-purple-500 to-indigo-600',
  'ज्यामिति': 'from-teal-500 to-green-600',
  'बीजगणित': 'from-orange-500 to-red-500',
  'क्षेत्रमिति': 'from-blue-500 to-cyan-600',
};

export default function MathGlossary() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('सभी');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return glossaryData.filter(g => {
      const matchCat = cat === 'सभी' || g.category === cat;
      const matchQ = !q || 
        g.term.toLowerCase().includes(q) || 
        g.en.toLowerCase().includes(q) || 
        g.definition.toLowerCase().includes(q) || 
        (g.formula && g.formula.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [search, cat]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 selection:bg-primary/20">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <h1 className="font-heading text-3xl md:text-4xl mb-2 font-bold tracking-tight">📚 गणित शब्दकोश</h1>
        <p className="text-muted-foreground font-body text-sm">{glossaryData.length}+ परिभाषाएं — कक्षा 1 से 9 तक</p>
      </motion.div>

      {/* Search Input */}
      <div className="relative mb-5">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="खोजें: HCF, समकोण, Prime, Area..."
          className="w-full pl-10 pr-10 py-3 border-2 border-border focus:border-primary rounded-2xl font-body text-sm bg-background focus:outline-none transition-colors shadow-sm focus:shadow-md" 
        />
        {search && (
          <button 
            onClick={() => setSearch('')} 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xl font-medium"
          >
            ×
          </button>
        )}
      </div>

      {/* Category Tabs (Horizontal Scroll Hidden Scrollbars) */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map(c => (
          <button 
            key={c} 
            onClick={() => setCat(c)}
            className={`shrink-0 px-5 py-2 rounded-2xl font-body font-bold text-sm transition-all ${
              cat === c 
                ? 'bg-primary text-primary-foreground shadow-sm scale-[1.02]' 
                : 'bg-card border hover:border-primary/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Stats Counter */}
      <p className="font-body text-xs text-muted-foreground mb-4 font-medium pl-1">
        {filtered.length} {filtered.length === 1 ? 'परिभाषा मिली' : 'परिभाषाएं मिलीं'}
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((g, i) => (
            <motion.div 
              key={`${g.term}-${i}`} 
              layout // Smooth transition when grid rearranges
              initial={{ opacity: 0, scale: 0.92 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.92 }} 
              transition={{ duration: 0.2 }}
              className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${catColors[g.category] || 'from-gray-400 to-gray-500'} text-white px-4 py-2.5 flex items-center justify-between`}>
                  <span className="font-body text-xs font-semibold tracking-wide opacity-90">{g.category}</span>
                  <span className="font-body text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full font-medium">
                    कक्षा {g.class}+
                  </span>
                </div>
                
                {/* Card Body */}
                <div className="p-4">
                  <h3 className="font-heading text-base font-bold text-foreground mb-1.5">{g.term}</h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{g.definition}</p>
                </div>
              </div>

              {/* Card Footer (Formula) */}
              {g.formula && (
                <div className="px-4 pb-4 pt-0">
                  <div className="bg-primary/5 border border-primary/10 rounded-xl px-3 py-2 w-full">
                    <p className="font-body text-xs text-primary font-bold truncate">📐 {g.formula}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 bg-muted/20 rounded-2xl border-2 border-dashed mt-4">
          <div className="text-5xl mb-3 opacity-70">🔍</div>
          <p className="font-heading text-lg font-bold">कोई परिभाषा नहीं मिली</p>
          <p className="font-body text-sm text-muted-foreground mt-1">कुछ दूसरा शब्द या श्रेणी खोज कर देखें</p>
        </motion.div>
      )}
    </div>
  );
}
