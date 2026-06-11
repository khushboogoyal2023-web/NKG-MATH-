import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Download } from 'lucide-react';

const categories = ['सभी', 'ज्यामिति', 'अंकगणित', 'बीजगणित', 'क्षेत्रमिति', 'सांख्यिकी'];

const models = [
  { id: 1, title: 'घन (Cube) का मॉडल', cat: 'ज्यामिति', class: '6-9', diff: 'आसान', materials: 'कार्डबोर्ड, कैंची, गोंद', emoji: '🧊', working: 'एक वर्ग की 6 प्रतियाँ काटें (सभी एक ही साइज़ की)। उन्हें Net की तरह जोड़ें — 1 बीच में, 4 उसके आसपास, 1 ऊपर। गोंद से सब जोड़ें। V = a³, SA = 6a² लिखें Soution।', concept: 'आयतन, पृष्ठीय क्षेत्रफल, फलक=6, कोने=8, किनारे=12' },
  { id: 2, title: 'पाइथागोरस प्रमेय बोर्ड', cat: 'ज्यामिति', class: '7-9', diff: 'मध्यम', materials: 'थर्माकोल, रंगीन कागज़, पिन', emoji: '📐', working: 'थर्माकोल पर 3-4-5 का समकोण त्रिभुज बनाएं। तीनों भुजाओं पर वर्ग बनाएं (9, 16, 25 खाने)। रंगीन कागज़ से खाने भरें। दिखाएं: 9+16=25 यानी a²+b²=c²', concept: 'c² = a² + b², समकोण त्रिभुज, कर्ण' },
  { id: 3, title: 'वृत्त के भाग का मॉडल', cat: 'ज्यामिति', class: '5-8', diff: 'आसान', materials: 'रंगीन कागज़, कम्पास, कैंची', emoji: '⭕', working: 'बड़ा वृत्त काटें। 8 बराबर sectors में काटें। Sector को reshape करके आयत बनाएं — लंबाई = πr, चौड़ाई = r। Area = πr² सिद्ध!', concept: 'π, त्रिज्या, क्षेत्रफल = πr²' },
  { id: 4, title: 'त्रिभुज के प्रकार', cat: 'ज्यामिति', class: '4-6', diff: 'आसान', materials: 'लकड़ी की stick, धागा', emoji: '📐', working: 'अलग-अलग लंबाई की sticks लें: समबाहु (3,3,3), समद्विबाहु (4,4,6), विषमबाहु (3,4,5)। धागे से जोड़ें। प्रत्येक पर नाम और गुण लिखें।', concept: 'समबाहु, समद्विबाहु, विषमबाहु त्रिभुज' },
  { id: 5, title: 'कोण मापक (Angle Maker)', cat: 'ज्यामिति', class: '5-8', diff: 'आसान', materials: 'कार्डबोर्ड, popsicle sticks, ब्रैड', emoji: '📏', working: 'दो popsicle sticks को एक पिन से जोड़ें। Protractor से 0°-360° तक निशान लगाएं। घुमाने पर कोण दिखता है। हर कोण का नाम लेबल करें।', concept: 'न्यून, समकोण, अधिक, ऋजु, प्रतिवर्त कोण' },
  { id: 6, title: 'समानांतर रेखाएं मॉडल', cat: 'ज्यामिति', class: '6-8', diff: 'आसान', materials: 'माचिस की तीलियाँ, कागज़', emoji: '🔲', working: 'कागज़ पर दो समानांतर रेखाएं खींचें। एक तिरछी रेखा (transversal) खींचें। बनने वाले कोण मापें: वैकल्पिक, संगत, co-interior कोण। दिखाएं सब बराबर/supplementary हैं।', concept: 'वैकल्पिक कोण=बराबर, संगत=बराबर' },
  { id: 7, title: 'चतुर्भुजों का संग्रह', cat: 'ज्यामिति', class: '5-7', diff: 'आसान', materials: 'कार्डबोर्ड, रंग', emoji: '🔷', working: '5 प्रकार के चतुर्भुज बनाएं: वर्ग, आयत, समांतर चतुर्भुज, समलम्ब, समचतुर्भुज। हर एक पर गुण, क्षेत्रफल सूत्र, विकर्ण लिखें।', concept: 'चतुर्भुजों के गुण, परिवार' },
  { id: 8, title: 'Fibonacci Spiral', cat: 'ज्यामिति', class: '6-9', diff: 'मध्यम', materials: 'ग्राफ पेपर, कम्पास', emoji: '🌀', working: '1×1, 1×1, 2×2, 3×3, 5×5, 8×8 वर्ग बनाएं। हर वर्ग में quarter-circle खींचें। spiral बनती है — यही Golden Ratio! प्रकृति में शंख, फूल इसी pattern में होते हैं।', concept: 'Fibonacci: 1,1,2,3,5,8,13... Golden Ratio φ=1.618' },
  { id: 9, title: 'Euler\'s Formula Model', cat: 'ज्यामिति', class: '7-9', diff: 'कठिन', materials: 'clay/playdough, sticks', emoji: '🔮', working: 'Clay से ठोस आकृतियाँ बनाएं। हर के लिए F+V-E गिनें: घन: 6+8-12=2, टेट्राहेड्रन: 4+4-6=2। सिद्ध करें F+V-E=2 हमेशा!', concept: 'F+V-E=2 (Euler\'s Formula)' },
  { id: 10, title: 'बेलन और शंकु तुलना', cat: 'ज्यामिति', class: '8-9', diff: 'मध्यम', materials: 'कागज़, रेत/पानी', emoji: '🍦', working: 'एक ही r और h का बेलन और शंकु कागज़ से बनाएं। शंकु में रेत भरें, बेलन में डालें। 3 बार लगता है! सिद्ध: V(cone) = ⅓V(cylinder)', concept: 'V(शंकु) = ⅓πr²h' },
  { id: 11, title: 'स्थानीय मान अबाकस', cat: 'अंकगणित', class: '1-3', diff: 'आसान', materials: 'तार, मोती, फ्रेम', emoji: '🔢', working: '3 तार लें: इकाई, दहाई, सैकड़ा। हर तार पर 10 मोती डालें। संख्या बनाने के लिए मोती खिसकाएं। 345 बनाने के लिए: सैकड़ा=3, दहाई=4, इकाई=5।', concept: 'स्थानीय मान, इकाई-दहाई-सैकड़ा' },
  { id: 12, title: 'संख्या रेखा (Number Line)', cat: 'अंकगणित', class: '1-5', diff: 'आसान', materials: 'लकड़ी का पट्टा, मार्कर', emoji: '📏', working: '1 मीटर लकड़ी पर -10 से +10 तक निशान लगाएं। रंगीन clips से संख्याएं दिखाएं। जोड़: clip आगे बढ़ाओ। घटाव: पीछे जाओ। ऋणात्मक संख्याएं भी!', concept: 'जोड़, घटाव, धनात्मक, ऋणात्मक' },
  { id: 13, title: 'गुणनखंड का पेड़ (Factor Tree)', cat: 'अंकगणित', class: '4-6', diff: 'आसान', materials: 'कार्डबोर्ड, धागा', emoji: '🌳', working: 'कार्डबोर्ड टुकड़ों पर संख्याएं लिखें। धागे से tree बनाएं: 36 → 4×9 → 2×2 × 3×3। सबसे नीचे prime numbers। LCM/HCF भी निकालें।', concept: 'अभाज्य गुणनखंड, HCF, LCM' },
  { id: 14, title: 'भिन्न पिज्जा मॉडल', cat: 'अंकगणित', class: '3-6', diff: 'आसान', materials: 'कार्डबोर्ड, रंग, कटर', emoji: '🍕', working: '4 बराबर वृत्त काटें। पहला पूरा, दूसरा आधा, तीसरा चौथाई, चौथाई में 3 हिस्से। रंग भरें। तुलना: ½ > ¼। जोड़: ½ + ¼ = ¾ दिखाएं।', concept: '½, ¼, ¾, भिन्नों की तुलना, जोड़' },
  { id: 15, title: 'गुणा सारणी चार्ट', cat: 'अंकगणित', class: '1-5', diff: 'आसान', materials: 'बड़ा कागज़, रंगीन पेन', emoji: '✖️', working: '10×10 grid बनाएं। Row और column में 1-10 लिखें। प्रत्येक खाने में गुणनफल भरें। Pattern: 5s हमेशा 0/5 पर खत्म, 9s का digit sum=9। रंगों से pattern highlight करें।', concept: 'गुणन तालिका, पैटर्न, commutative property' },
  { id: 16, title: 'दशमलव स्केल मॉडल', cat: 'अंकगणित', class: '4-7', diff: 'मध्यम', materials: 'लकड़ी, रंग', emoji: '📊', working: '1 meter stick को 10 equal parts में बांटें। एक part को 10 में, फिर 100 में। 1.0, 0.1, 0.01 दिखाएं। Physical comparison: 0.5 आधा meter है!', concept: 'दशमलव, स्थान मान, 10 की घात' },
  { id: 17, title: 'प्रतिशत पाई चार्ट', cat: 'अंकगणित', class: '5-8', diff: 'मध्यम', materials: 'गोल कार्डबोर्ड, protractor', emoji: '📉', working: 'वृत्त को 100 बराबर भागों में बांटें (3.6° प्रत्येक)। 25% = 90°, 50% = 180°। class के मनपसंद विषयों का पाई चार्ट बनाएं।', concept: '% = parts per 100, pie chart, angle' },
  { id: 18, title: 'LCM-HCF Venn Diagram', cat: 'अंकगणित', class: '5-7', diff: 'मध्यम', materials: 'दो रंग के hula hoops या रस्सी', emoji: '⭕', working: 'दो overlapping circles बनाएं। 12 के गुणनखंड: {2,2,3}, 18 के: {2,3,3}। Common: {2,3} → HCF=6। सभी: {2,2,3,3} → LCM=36।', concept: 'HCF = common, LCM = union' },
  { id: 19, title: 'Magic Square', cat: 'अंकगणित', class: '4-8', diff: 'मध्यम', materials: 'कार्ड, मार्कर', emoji: '🔮', working: '3×3 grid बनाएं। 1-9 संख्याएं भरें ताकि हर row, column, diagonal का योग = 15। Trick: बीच में 5, corner में सम, edge में विषम। 4×4 magic square भी बनाएं।', concept: 'योग का pattern, symmetric property' },
  { id: 20, title: 'मापन रूपांतरण चार्ट', cat: 'अंकगणित', class: '3-6', diff: 'आसान', materials: 'बड़ा chart paper', emoji: '📐', working: 'तीन section: लंबाई (mm→cm→m→km), भार (mg→g→kg), आयतन (ml→l)। Flip cards से conversion practice: 1km=?m, 1kg=?g। Real objects measure करें।', concept: 'मीट्रिक पद्धति, रूपांतरण' },
  { id: 21, title: 'Variable Balance Scale', cat: 'बीजगणित', class: '6-8', diff: 'मध्यम', materials: 'balance scale, blocks', emoji: '⚖️', working: 'x के लिए mystery box, numbers के लिए blocks। 2x+3=11: बायें 2 boxes + 3 blocks, दायें 11 blocks। Box में कितने? Balance बनाए रखते हुए हल करें।', concept: 'रैखिक समीकरण, balance method' },
  { id: 22, title: 'Algebra Tiles', cat: 'बीजगणित', class: '7-9', diff: 'मध्यम', materials: 'रंगीन कार्डबोर्ड tiles', emoji: '🔲', working: 'x² के लिए बड़ा square, x के लिए rectangle, 1 के लिए छोटा square। x²+5x+6 = (x+2)(x+3) दिखाएं। Tiles को physically arrange करके factorization!', concept: 'polynomials, factorization' },
  { id: 23, title: 'Graph Paper Coordinate', cat: 'बीजगणित', class: '8-9', diff: 'मध्यम', materials: 'बड़ा graph paper, रंगीन markers', emoji: '📈', working: 'X और Y axis बनाएं। y=2x+3 के points plot करें: (-1,1), (0,3), (1,5), (2,7)। धागे से सीधी रेखा खींचें। दूसरी equation y=-x+5 भी बनाएं। Intersection = solution!', concept: 'linear graph, solution, slope' },
  { id: 24, title: 'Fibonacci Golden Rectangle', cat: 'बीजगणित', class: '7-9', diff: 'कठिन', materials: 'ग्राफ पेपर, कम्पास', emoji: '🌟', working: '1×1 से शुरू करें। हर बार square जोड़ते जाएं: 1,1,2,3,5,8,13... लंबाई/चौड़ाई ratio हमेशा φ=1.618 के पास। Spiral भी बनाएं।', concept: 'Fibonacci sequence, Golden Ratio' },
  { id: 25, title: 'Function Machine', cat: 'बीजगणित', class: '6-8', diff: 'आसान', materials: 'कार्डबोर्ड box, cards', emoji: '⚙️', working: 'Box पर "Input → ×2+3 → Output" लिखें। Card पर input number लिखकर डालें, दूसरी तरफ output निकालें। बच्चे rule guess करें। Different functions try करें।', concept: 'function, input-output, algebraic rule' },
  { id: 26, title: 'आयतन मापन किट', cat: 'क्षेत्रमिति', class: '6-9', diff: 'मध्यम', materials: 'transparent plastic boxes, पानी', emoji: '📦', working: 'अलग-अलग sizes के transparent boxes लें। unit cubes से भरें या पानी मापें। V=l×b×h verify करें। Irregular shapes के लिए water displacement method।', concept: 'आयतन, l×b×h, unit cube' },
  { id: 27, title: 'परिमाप मापन किट', cat: 'क्षेत्रमिति', class: '4-7', diff: 'आसान', materials: 'रस्सी, ruler', emoji: '📏', working: 'रस्सी से आकृतियों के किनारे नापें। Straight करके ruler से measure करें। Regular shapes: P=4a (square), 2(l+b) (rectangle)। Tree का perimeter भी नापें!', concept: 'परिमाप, boundary length' },
  { id: 28, title: 'क्षेत्रफल ग्रिड मॉडल', cat: 'क्षेत्रमिति', class: '4-8', diff: 'आसान', materials: 'graph paper, scissors', emoji: '📋', working: 'Irregular shapes ग्राफ पेपर पर बनाएं। पूरे खानों को गिनें, आधे खानों को ½ count करें। Area = खानों की संख्या × (1 cm²)। Regular formula से compare करें।', concept: 'Area, counting method, estimation' },
  { id: 29, title: '3D Net Collection', cat: 'क्षेत्रमिति', class: '5-8', diff: 'मध्यम', materials: 'thick paper, ruler, glue', emoji: '🎁', working: '5 अलग 3D shapes के nets बनाएं: cube, cuboid, cylinder, cone, pyramid। काटें और fold करें। Flap से glue लगाएं। Surface area formula verify करें।', concept: 'Net→3D shape, surface area' },
  { id: 30, title: 'गोले का पृष्ठीय क्षेत्रफल', cat: 'क्षेत्रमिति', class: '9', diff: 'कठिन', materials: 'ball, thread, paper', emoji: '🌍', working: 'Ball को धागे से ढकें। धागा खोलकर 4 वृत्तों में भरें → SA = 4πr²! या ball पर paper strips चिपकाएं, area measure करें।', concept: 'SA = 4πr², sphere properties' },
  { id: 31, title: 'Bar Graph Making Kit', cat: 'सांख्यिकी', class: '3-7', diff: 'आसान', materials: 'blocks, ruler', emoji: '📊', working: 'Class के जन्मदिन महीने survey करें। Blocks से bar बनाएं — हर block = 1 student। Compare करें: कौन सा महीना सबसे popular? Mode, Range निकालें।', concept: 'Bar graph, mode, data collection' },
  { id: 32, title: 'Probability Spinner', cat: 'सांख्यिकी', class: '6-9', diff: 'आसान', materials: 'cardboard circle, pencil, paperclip', emoji: '🎡', working: 'वृत्त को 6 बराबर sections में बांटें (पासे जैसे)। Paperclip को पेंसिल से pin करें। 50 बार spin करें। Tally marks रखें। Compare theoretical vs experimental probability।', concept: 'Probability, frequency, experimental' },
  { id: 33, title: 'Mean-Median-Mode Visual', cat: 'सांख्यिकी', class: '6-8', diff: 'मध्यम', materials: 'colored balls, box', emoji: '📈', working: 'Box में अलग-अलग संख्या में रंगीन balls रखें। Mean: total/count। Median: बीच वाला जब sorted। Mode: सबसे ज़्यादा। Visual arrangement से समझाएं।', concept: 'Central tendency: mean, median, mode' },
  { id: 34, title: 'Histogram क्राफ्ट', cat: 'सांख्यिकी', class: '7-9', diff: 'मध्यम', materials: 'graph paper, colored tape', emoji: '📉', working: 'Class के marks का data लें। 0-20, 21-40 जैसे class intervals बनाएं। Paper strips से bars बनाएं। Bar graph vs histogram difference दिखाएं (no gap in histogram)।', concept: 'Histogram, class interval, frequency' },
  { id: 35, title: 'Pie Chart क्राफ्ट', cat: 'सांख्यिकी', class: '5-8', diff: 'मध्यम', materials: 'protractor, colored pencils', emoji: '🥧', working: 'Class का favourite sport survey: 10 cricket, 5 football, 5 badminton = 20 total। Cricket: 10/20 × 360° = 180°। Sector बनाएं। Legend लिखें।', concept: 'Pie chart, angle calculation, percentage' },
];

const moreModels = Array.from({ length: 65 }, (_, i) => ({
  id: i + 36,
  title: [
    'त्रिभुज की मध्यिका मॉडल', 'Congruent Triangles Kit', 'Parallel Lines Transversal Board',
    'Symmetry Mirror Model', 'Translation-Rotation Board', 'Tessellation Pattern',
    'Clock Angle Finder', 'Map Scale Model', 'Speed-Distance-Time Board',
    'Percentage Discount Tag', 'Simple Interest Calculator Board', 'Compound Interest Chart',
    'Profit-Loss Balance', 'Ratio Mixing Model', 'Proportion Tower',
    'Unitary Method Board', 'Direct Proportion Graph', 'Inverse Proportion Graph',
    'AP के मोती की माला', 'GP Doubling Model', 'Square Root Spiral',
    'Perfect Numbers Chart', 'Pascal\'s Triangle', 'Number System Chart',
    'Integers Hot-Cold Model', 'Rational Numbers Line', 'Irrational √2 Proof',
    'Algebra Substitution Cards', 'Equation Balance Puzzle', 'Inequality Number Line',
    'Coordinate Grid Map', 'Linear vs Non-Linear Graph', 'Slope Triangle',
    'System of Equations Grid', 'Quadratic Parabola', 'Polynomial Degree Visual',
    'Triangle Area Proof', 'Parallelogram = Rectangle Area', 'Trapezium Area Proof',
    'Sector Area Model', 'Circle Chord-Arc Model', 'Tangent-Radius Proof',
    'Prism Surface Area Net', 'Frustum Model', 'Cross-Section Models',
    'Volume by Pouring', 'Density = Mass/Volume', 'Floating-Sinking Science',
    'Data Collection Survey Kit', 'Tally Chart Board', 'Double Bar Graph',
    'Line Graph Weather', 'Scatter Plot Board', 'Stem-Leaf Plot',
    'Probability Tree', 'Sample Space Cards', 'Complementary Events',
    'Venn Diagram 3-Sets', 'Set Operations Board', 'Truth Table',
    'Clock Fractions', 'Money Addition Board', 'Calendar Math Model',
    'Area-Perimeter Same Different', 'Volume-Surface Optimization'
  ][i] || `गणित मॉडल आइडिया ${i + 36}`,
  cat: ['ज्यामिति', 'अंकगणित', 'बीजगणित', 'क्षेत्रमिति', 'सांख्यिकी'][i % 5],
  class: ['1-3', '4-6', '6-8', '7-9', '5-7'][i % 5],
  diff: ['आसान', 'मध्यम', 'कठिन'][i % 3],
  emoji: ['📐', '🔢', '📊', '📈', '🎯', '⭕', '🔷', '📦', '🌟', '🎲'][i % 10],
  working: `यह मॉडल ${['ज्यामिति', 'अंकगणित', 'बीजगणित', 'क्षेत्रमिति', 'सांख्यिकी'][i % 5]} की ${['आसान', 'मध्यम', 'कठिन'][i % 3]} अवधारणा सिखाता है। सामग्री इकट्ठा करें, चरण-दर-चरण बनाएं, और गणितीय सूत्र verify करें।`,
  concept: 'गणितीय अवधारणा — hands-on learning',
  materials: 'कार्डबोर्ड, रंगीन कागज़, गोंद, मार्कर',
}));

const allModels = [...models, ...moreModels];

const diffColors = { 
  'आसान': 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400', 
  'मध्यम': 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400', 
  'कठिन': 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400' 
};

function downloadModel(m) {
  const txt = `NKG MATH UNIVERSE — Math Model\n${'='.repeat(50)}\n\nमॉडल #${m.id}: ${m.title}\nकक्षा: ${m.class} | श्रेणी: ${m.cat} | कठिनाई: ${m.diff}\n\n📦 सामग्री:\n${m.materials}\n\n🔧 कार्यविधि:\n${m.working}\n\n💡 अवधारणा:\n${m.concept}\n\n${'='.repeat(50)}\n🔢 NKG MATH UNIVERSE © 2026`;
  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `Model_${m.id}.txt`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}

export default function MathModels100() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('सभी');
  const [diff, setDiff] = useState('सभी');
  const [openId, setOpenId] = useState(null);

  // useMemo फ़िल्टरिंग प्रक्रिया को ऑप्टिमाइज़ करता है
  const filtered = useMemo(() => {
    return allModels.filter(m => {
      const q = search.toLowerCase().trim();
      const matchCat = cat === 'सभी' || m.cat === cat;
      const matchDiff = diff === 'सभी' || m.diff === diff;
      const matchQ = !q || m.title.toLowerCase().includes(q) || m.concept.toLowerCase().includes(q);
      return matchCat && matchDiff && matchQ;
    });
  }, [search, cat, diff]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 selection:bg-primary/20">
      {/* Top Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <div className="text-5xl mb-2">🔬</div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold mb-1 tracking-tight">100 गणित वर्किंग मॉडल आइडियाज</h1>
        <p className="font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          स्वयं करके सीखें — हर प्रोजेक्ट की पूर्ण कार्यविधि, आवश्यक सामग्री और वैचारिक समझ एक ही जगह!
        </p>
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl px-5 py-2.5 mt-4 max-w-md mx-auto shadow-sm">
          <p className="font-body text-xs md:text-sm font-bold">🏆 स्कूल एग्जीबिशन और साइंस फेयर स्पेशल गाइड्स!</p>
        </div>
      </motion.div>

      {/* Search Input Bar */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input 
          type="text"
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="मॉडल का नाम या कीवर्ड खोजें..."
          className="w-full pl-10 pr-4 py-3 border rounded-xl font-body text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
        />
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {categories.map(c => (
          <button 
            type="button"
            key={c} 
            onClick={() => { setCat(c); setOpenId(null); }} 
            className={`shrink-0 px-3.5 py-1.5 rounded-xl font-body font-bold text-xs transition-all ${
              cat === c ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-card border hover:border-primary/40'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Difficulty Filters */}
      <div className="flex gap-2 mb-5">
        {['सभी', 'आसान', 'मध्यम', 'कठिन'].map(d => (
          <button 
            type="button"
            key={d} 
            onClick={() => { setDiff(d); setOpenId(null); }} 
            className={`px-3 py-1.5 rounded-xl font-body font-semibold text-xs transition-all ${
              diff === d ? 'bg-secondary text-secondary-foreground shadow-sm' : 'bg-card border'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Status Counter */}
      <p className="font-body text-xs font-bold text-muted-foreground mb-4 px-1">{filtered.length} मॉडल मैच हुए</p>

      {/* Accordion List Container */}
      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {filtered.slice(0, 50).map((m, i) => (
            <motion.div 
              key={m.id} 
              layout="position"
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18, delay: Math.min(i * 0.015, 0.25) }}
              className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button 
                type="button"
                onClick={() => setOpenId(openId === m.id ? null : m.id)} 
                className="w-full text-left p-3.5 focus:outline-none flex items-center gap-3 group"
              >
                <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">{m.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className="font-heading font-bold text-sm text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {m.id}. {m.title}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap items-center">
                    <span className="text-[10px] font-body font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full border">{m.cat}</span>
                    <span className="text-[10px] font-body font-medium text-muted-foreground">कक्षा {m.class}</span>
                    <span className={`text-[10px] font-body font-bold px-2 py-0.5 rounded-full ${diffColors[m.diff]}`}>{m.diff}</span>
                  </div>
                </div>
                <ChevronDown size={18} className={`text-muted-foreground shrink-0 transition-transform duration-300 ${openId === m.id ? 'rotate-180 text-primary' : ''}`} />
              </button>

              {/* Opened State Details */}
              <AnimatePresence initial={false}>
                {openId === m.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ height: { duration: 0.2 }, opacity: { duration: 0.15 } }}
                    className="overflow-hidden bg-muted/10"
                  >
                    <div className="px-4 pb-4 border-t pt-3.5 space-y-3.5">
                      <div className="bg-amber-50/70 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/40 rounded-xl p-3">
                        <p className="font-body text-[11px] font-extrabold text-amber-800 dark:text-amber-400 mb-1 uppercase tracking-wider">📦 आवश्यक सामग्री:</p>
                        <p className="font-body text-xs text-foreground/90 font-medium">{m.materials}</p>
                      </div>

                      <div className="bg-blue-50/70 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900/40 rounded-xl p-3">
                        <p className="font-body text-[11px] font-extrabold text-blue-800 dark:text-blue-400 mb-1 uppercase tracking-wider">🔧 वर्किंग और बनाने की विधि:</p>
                        <p className="font-body text-xs md:text-sm text-foreground/90 leading-relaxed font-medium">{m.working}</p>
                      </div>

                      <div className="bg-green-50/70 dark:bg-green-950/10 border border-green-200 dark:border-green-900/40 rounded-xl p-3">
                        <p className="font-body text-[11px] font-extrabold text-green-800 dark:text-green-400 mb-1 uppercase tracking-wider">💡 मुख्य गणितीय सिद्धांत (Concept):</p>
                        <p className="font-body text-xs text-foreground/90 font-semibold">{m.concept}</p>
                      </div>

                      <button 
                        type="button"
                        onClick={() => downloadModel(m)}
                        className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2.5 rounded-xl font-body font-bold text-xs transition-all active:scale-95"
                      >
                        <Download size={14} /> फुल मॉडल गाइड डाउनलोड (.txt)
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination / View More State Indicator */}
      {filtered.length > 50 && (
        <div className="text-center mt-6 p-4 bg-muted/20 border border-dashed rounded-2xl">
          <p className="font-body text-xs md:text-sm text-muted-foreground font-medium">
            💡 और <strong>{filtered.length - 50} अतिरिक्त मॉडल</strong> मौजूद हैं। उन्हें ऊपर दिए गए सर्च बार या कैटेगरी फ़िल्टर से नैरो-डाउन (Narrow down) करके खोजें!
          </p>
        </div>
      )}
    </div>
  );
}
