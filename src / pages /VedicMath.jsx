import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, HelpCircle, CheckCircle, XCircle } from 'lucide-react';

const vedicSutras = [
  {
    no: 1,
    sutra: 'एकाधिकेन पूर्वेण',
    meaning: 'एक अधिक पिछले से',
    color: 'from-purple-500 to-indigo-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    intro: `यह सूत्र कहता है "पिछले अंक में एक जोड़ो"। यह सबसे अधिक उपयोगी सूत्रों में से एक है, विशेषकर जब किसी संख्या को ऐसी संख्या से गुणा करना हो जिसका योग 10 हो।`,
    uses: [
      'n5 × n5 प्रकार की गुणा (जैसे 25×25, 35×35)',
      '1/19, 1/29 जैसे भिन्नों का दशमलव',
      'वर्ग निकालना (आसान)',
    ],
    steps: [
      { label: 'नियम', text: 'n5 × n5 = [n × (n+1)] के बाद 25 लिखो' },
      { label: 'उदाहरण 1', text: '25 × 25:\n• पहला अंक n = 2\n• n+1 = 3\n• n × (n+1) = 2 × 3 = 6\n• अंत में 25 जोड़ो\n• उत्तर = 625 ✅' },
      { label: 'उदाहरण 2', text: '35 × 35:\n• n = 3, n+1 = 4\n• 3 × 4 = 12\n• अंत में 25 जोड़ो\n• उत्तर = 1225 ✅' },
      { label: 'उदाहरण 3', text: '75 × 75:\n• n = 7, n+1 = 8\n• 7 × 8 = 56\n• अंत में 25 जोड़ो\n• उत्तर = 5625 ✅' },
      { label: 'उदाहरण 4', text: '105 × 105:\n• n = 10, n+1 = 11\n• 10 × 11 = 110\n• अंत में 25 जोड़ो\n• उत्तर = 11025 ✅' },
    ],
    why: 'क्यों काम करता है: (10n+5)² = 100n²+100n+25 = 100n(n+1)+25। इसीलिए n(n+1) के बाद 25 लिखते हैं!',
    practice: '45 × 45 = ? → n=4, 4×5=20, उत्तर = 2025',
    quiz: [
      { q: '15 × 15 = ?', options: ['125', '225', '325', '215'], ans: 1 },
      { q: '45 × 45 = ?', options: ['1825', '2025', '2125', '2025'], ans: 1 },
      { q: '65 × 65 = ?', options: ['3925', '4025', '4225', '4125'], ans: 2 },
      { q: '95 × 95 = ?', options: ['9025', '9125', '9225', '8925'], ans: 0 },
    ],
  },
  {
    no: 2,
    sutra: 'निखिलं नवतश्चरमं दशतः',
    meaning: 'सभी 9 से, अंतिम 10 से',
    color: 'from-red-500 to-orange-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    intro: `यह सूत्र 10, 100, 1000 जैसी संख्याओं से घटाने का सबसे तेज़ तरीका बताता है। बड़ी-बड़ी संख्याओं का घटाव सेकंडों में हो जाता है। इसे "Nikhilam Sutra" भी कहते हैं।`,
    uses: [
      '10ⁿ में से किसी भी संख्या को घटाना',
      '9, 99, 999... के पास की गुणा',
      'बड़ी संख्याओं का पूरक (Complement) निकालना',
    ],
    steps: [
      { label: 'नियम', text: '100 या 1000 से घटाने पर:\n• प्रत्येक अंक को 9 में से घटाओ\n• अंतिम अंक को 10 में से घटाओ' },
      { label: 'उदाहरण 1', text: '1000 - 357:\n• 9-3=6, 9-5=4, 10-7=3\n• उत्तर = 643 ✅\nजाँच: 357 + 643 = 1000 ✅' },
      { label: 'उदाहरण 2', text: '100 - 67:\n• 9-6=3, 10-7=3\n• उत्तर = 33 ✅\nजाँच: 67 + 33 = 100 ✅' },
      { label: 'उदाहरण 3', text: '10000 - 2468:\n• 9-2=7, 9-4=5, 9-6=3, 10-8=2\n• उत्तर = 7532 ✅' },
      { label: 'गुणा में उपयोग', text: '98 × 97:\n• आधार = 100\n• 98 = 100-2 (कमी = 2)\n• 97 = 100-3 (कमी = 3)\n• बायाँ: 98-3 = 95 (या 97-2 = 95)\n• दायाँ: 2×3 = 06\n• उत्तर = 9506 ✅' },
    ],
    why: 'क्यों काम करता है: यदि a = (100-x) और b = (100-y) तो a×b = 100(a-y) + xy। इसीलिए बायाँ भाग (a-y) और दायाँ xy है!',
    practice: '1000 - 429 = ? → 9-4=5, 9-2=7, 10-9=1 → 571',
    quiz: [
      { q: '100 - 43 = ?', options: ['57', '67', '47', '53'], ans: 0 },
      { q: '1000 - 756 = ?', options: ['244', '254', '234', '264'], ans: 0 },
      { q: '99 × 97 = ?', options: ['9603', '9503', '9703', '9403'], ans: 0 },
      { q: '10000 - 3789 = ?', options: ['6211', '6311', '6111', '7211'], ans: 0 },
    ],
  },
  {
    no: 3,
    sutra: 'ऊर्ध्वतिर्यग्भ्याम्',
    meaning: 'ऊपर-नीचे और तिरछे से',
    color: 'from-blue-500 to-cyan-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    intro: `यह वैदिक गणित का सबसे महत्वपूर्ण सूत्र है। इससे 2×2, 3×3, यहाँ तक कि बड़ी संख्याओं की गुणा बहुत तेज़ी से होती है। "ऊर्ध्व" मतलब ऊपर-नीचे, "तिर्यक" मतलब तिरछा/क्रॉस।`,
    uses: [
      '2 अंक × 2 अंक की गुणा',
      '3 अंक × 3 अंक की गुणा',
      'बीजगणितीय गुणनखंड (x+a)(x+b)',
    ],
    steps: [
      { label: '2×2 गुणा नियम', text: 'AB × CD:\n• इकाई: B×D\n• दहाई: A×D + B×C\n• सैकड़ा: A×C\n(बायें से दायें लिखो, हासिल जोड़ो)' },
      { label: 'उदाहरण 1', text: '12 × 13:\n• इकाई: 2×3 = 6\n• दहाई: 1×3 + 2×1 = 3+2 = 5\n• सैकड़ा: 1×1 = 1\n• उत्तर = 156 ✅' },
      { label: 'उदाहरण 2', text: '23 × 32:\n• इकाई: 3×2 = 6\n• दहाई: 2×2 + 3×3 = 4+9 = 13 → 3, हासिल 1\n• सैकड़ा: 2×3 + 1(हासिल) = 7\n• उत्तर = 736 ✅' },
      { label: 'उदाहरण 3', text: '45 × 67:\n• इकाई: 5×7 = 35 → 5, हासिल 3\n• दहाई: 4×7 + 5×6 + 3 = 28+30+3 = 61 → 1, हासिल 6\n• सैकड़ा: 4×6 + 6 = 30\n• उत्तर = 3015 ✅' },
      { label: 'उदाहरण 4', text: '11 × 11:\n• 1|1+1|1 = 1|2|1 = 121 ✅\n\n12 × 11:\n• 1|1+2|2 = 1|3|2 = 132 ✅' },
    ],
    why: 'क्यों काम करता है: (10a+b)(10c+d) = 100ac + 10(ad+bc) + bd। यही तीन भाग हैं — सैकड़ा, दहाई, इकाई!',
    practice: '34 × 21 = ? → इकाई:4×1=4, दहाई:3×1+4×2=11→1 हासिल1, सैकड़ा:3×2+1=7 → 714',
    quiz: [
      { q: '11 × 13 = ?', options: ['133', '143', '123', '153'], ans: 1 },
      { q: '12 × 14 = ?', options: ['158', '168', '178', '148'], ans: 1 },
      { q: '21 × 23 = ?', options: ['473', '483', '463', '493'], ans: 1 },
      { q: '32 × 13 = ?', options: ['406', '416', '396', '426'], ans: 1 },
    ],
  },
  {
    no: 4,
    sutra: 'परावर्त्य योजयेत्',
    meaning: 'स्थानांतरित करो और जोड़ो',
    color: 'from-green-500 to-teal-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    intro: `"परावर्त्य" का अर्थ है "पलटना" या "उलटना"। यह सूत्र भाग (Division) की एक बहुत तेज़ विधि है। जब भाजक (divisor) 9 के पास हो तो यह विधि बहुत उपयोगी है।`,
    uses: [
      '9, 8, 7 जैसे भाजकों से भाग',
      'बीजगणित में भाग (Algebraic Division)',
      '11, 12 जैसे भाजकों से भाग',
    ],
    steps: [
      { label: 'नियम (÷9)', text: 'अंकों को एक-एक आगे जोड़ते जाओ:\nभागफल = क्रमशः बढ़ता जाता है\nशेषफल = अंतिम राशि' },
      { label: 'उदाहरण 1', text: '12 ÷ 9:\n1 | 2\n↓ + ↓\n1 | 3\nभागफल = 1, शेषफल = 3\nजाँच: 9×1+3 = 12 ✅' },
      { label: 'उदाहरण 2', text: '123 ÷ 9:\n1 | 2 | 3\n1 | 3 | 6\nभागफल = 13, शेषफल = 6\nजाँच: 9×13+6 = 117+6 = 123 ✅' },
      { label: 'उदाहरण 3', text: '1234 ÷ 9:\n1|2|3|4\n1|3|6|10 → 6+1=7, हासिल 1\n= 1|3|7|1\nभागफल = 137, शेषफल = 1\nजाँच: 9×137+1 = 1233+1 = 1234 ✅' },
      { label: '÷ 8 उदाहरण', text: '132 ÷ 8:\nपूरक = 10-8=2\n1 | 3 | 2\n+ 2+2×1=2+2=4...\nभागफल = 16, शेषफल = 4\nजाँच: 8×16+4 = 128+4 = 132 ✅' },
    ],
    why: 'क्यों काम करता है: 9 = 10-1, इसलिए हर बार आगे का अंक जोड़ना = 10 की जगह 9 से भाग का प्रभाव!',
    practice: '111 ÷ 9 = ? → 1|1|1 → 1|2|3 → भागफल=12, शेषफल=3',
    quiz: [
      { q: '13 ÷ 9 का भागफल और शेषफल?', options: ['1 शेष 3', '1 शेष 4', '2 शेष 1', '1 शेष 5'], ans: 1 },
      { q: '45 ÷ 9 = ?', options: ['4 शेष 9', '5 शेष 0', '4 शेष 0', '5 शेष 9'], ans: 1 },
      { q: '121 ÷ 9 का शेषफल?', options: ['3', '4', '2', '1'], ans: 1 },
      { q: '99 ÷ 9 = ?', options: ['10 शेष 9', '11 शेष 0', '10 शेष 0', '9 शेष 9'], ans: 1 },
    ],
  },
  {
    no: 5,
    sutra: 'शून्यं साम्यसमुच्चये',
    meaning: 'बराबर होने पर शून्य होता है',
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    border: 'border-pink-200 dark:border-pink-800',
    intro: `"साम्यसमुच्चय" का अर्थ है "समान समूह"। जब समीकरण के दोनों तरफ कोई राशि (expression) समान हो, तो वह शून्य होती है। इससे जटिल समीकरण तुरंत हल हो जाते हैं।`,
    uses: [
      'रैखिक समीकरण (Linear Equations) हल करना',
      'भिन्न वाले समीकरण हल करना',
      'बहुपद समीकरणों का हल',
    ],
    steps: [
      { label: 'नियम', text: 'यदि दोनों तरफ (ax+b) है तो ax+b = 0\nअर्थात: x = -b/a' },
      { label: 'उदाहरण 1', text: 'x/(x+3) + x/(x+3) = 0 हल करो:\nसमान भाग (x+3) = 0\nx = -3 ✅' },
      { label: 'उदाहरण 2', text: '(x+1)/(x+2) = (x+3)/(x+4) हल करो:\nक्रॉस गुणा: (x+1)(x+4) = (x+2)(x+3)\nx² + 5x + 4 = x² + 5x + 6\n4 = 6 → कोई हल नहीं ✅' },
      { label: 'उदाहरण 3', text: '3x + 2 = 2 + 3x:\nदोनों तरफ 3x और 2 है\nयह हमेशा सत्य है → अनंत हल ✅' },
      { label: 'उदाहरण 4', text: '(x+7)(x-3) = (x+7)(2x-1):\nदोनों तरफ (x+7) है\nया (x+7) = 0 → x = -7\nया (x-3) = (2x-1) → x = -2\nउत्तर: x = -7 या x = -2 ✅' },
    ],
    why: 'क्यों काम करता है: a×b = a×c का मतलब a = 0 या b = c। जब दोनों तरफ समान गुणनखंड हो, वह शून्य होता है!',
    practice: '(2x+5)/(x+1) + 3/(x+1) = 0 → x+1=0 → x=-1 नहीं! हर = 0 नहीं होता।',
    quiz: [
      { q: '5x + 3 = 3 + 5x में x = ?', options: ['0', '1', 'अनंत हल', 'कोई हल नहीं'], ans: 2 },
      { q: 'x(x-4) = 2(x-4) में x = ?', options: ['4 या 2', '4 या -2', '-4 या 2', '2 या -4'], ans: 0 },
      { q: '3(x+2) = 5(x+2), x = ?', options: ['2', '0', '-2', 'x+2=0 → x=-2'], ans: 3 },
      { q: '(x-1)/(x+2) = (x-1)/(x-3) → x = ?', options: ['x=1 या x=2', 'x=1', 'x=-2', 'x=3'], ans: 1 },
    ],
  },
  {
    no: 6,
    sutra: 'आनुरूप्येण',
    meaning: 'अनुपात/समानुपात से',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    border: 'border-violet-200 dark:border-violet-800',
    intro: `"आनुरूप्य" का अर्थ है "अनुरूप" या "समानुपाती"। यह सूत्र अनुपात और समानुपात की शक्ति का उपयोग करता है। बड़ी संख्याओं को आसान संख्याओं में बदलकर गणना करो।`,
    uses: [
      '25, 125, 625 जैसी संख्याओं से गुणा',
      'समानुपात (Proportion) के प्रश्न',
      'एकात्मक विधि (Unitary Method)',
    ],
    steps: [
      { label: 'नियम', text: '25 = 100÷4, 125 = 1000÷8, 625 = 10000÷16\nगुणा करने की जगह पहले 100/1000 से गुणा करो, फिर 4/8 से भाग दो।' },
      { label: 'उदाहरण 1', text: '48 × 25:\n= 48 × 100 ÷ 4\n= 4800 ÷ 4\n= 1200 ✅' },
      { label: 'उदाहरण 2', text: '36 × 125:\n= 36 × 1000 ÷ 8\n= 36000 ÷ 8\n= 4500 ✅' },
      { label: 'उदाहरण 3', text: '64 × 625:\n= 64 × 10000 ÷ 16\n= 640000 ÷ 16\n= 40000 ✅' },
      { label: 'उदाहरण 4', text: '32 × 3125:\n= 32 × 100000 ÷ 32\n= 100000 ✅\n\nयहाँ 3125 = 100000÷32' },
    ],
    why: 'क्यों काम करता है: 25 = 10²÷4, इसलिए ×25 = ×100 ÷4। अनुपात बदलने से गणना आसान हो जाती है!',
    practice: '56 × 25 = 56 × 100 ÷ 4 = 5600 ÷ 4 = 1400',
    quiz: [
      { q: '44 × 25 = ?', options: ['1000', '1050', '1100', '1150'], ans: 2 },
      { q: '24 × 125 = ?', options: ['2800', '3000', '3200', '2900'], ans: 1 },
      { q: '16 × 625 = ?', options: ['9000', '10000', '11000', '8000'], ans: 1 },
      { q: '72 × 25 = ?', options: ['1700', '1800', '1850', '1750'], ans: 1 },
    ],
  },
  {
    no: 7,
    sutra: 'संकलन-व्यवकलनाभ्याम्',
    meaning: 'जोड़ और घटाव के द्वारा',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    intro: `यह सूत्र बताता है कि जटिल गुणा को जोड़ और घटाव में तोड़ा जा सकता है। 100 के पास की संख्याओं (97, 98, 102, 103...) को गुणा करना बहुत आसान हो जाता है।`,
    uses: [
      '100 के आसपास की संख्याओं की गुणा',
      '1000 के पास की संख्याओं की गुणा',
      'वर्ग निकालना',
    ],
    steps: [
      { label: 'नियम', text: 'यदि a = 100-x और b = 100-y\na × b = 100×(a-y) + xy\nया = 100×(b-x) + xy' },
      { label: 'उदाहरण 1', text: '97 × 98:\n• 97 = 100-3, 98 = 100-2\n• बायाँ: 97-2 = 95 (या 98-3 = 95)\n• दायाँ: 3×2 = 06\n• उत्तर = 9506 ✅' },
      { label: 'उदाहरण 2', text: '102 × 104:\n• 102 = 100+2, 104 = 100+4\n• बायाँ: 102+4 = 106\n• दायाँ: 2×4 = 08\n• उत्तर = 10608 ✅' },
      { label: 'उदाहरण 3', text: '96 × 103:\n• 96 = 100-4, 103 = 100+3\n• बायाँ: 96+3 = 99 (या 103-4 = 99)\n• दायाँ: (-4)×3 = -12\n• 9900 - 12 = 9888 ✅' },
      { label: 'उदाहरण 4', text: '998 × 997:\n• आधार = 1000\n• 998=1000-2, 997=1000-3\n• बायाँ: 998-3=995\n• दायाँ: 2×3=006\n• उत्तर = 995006 ✅' },
    ],
    why: 'क्यों काम करता है: (100-a)(100-b) = 10000 - 100(a+b) + ab = 100(100-a-b) + ab = 100(b की कमी से घटाओ) + ab',
    practice: '96 × 97 = ? → 96-3=93, 4×3=12 → 9312',
    quiz: [
      { q: '98 × 99 = ?', options: ['9600', '9702', '9800', '9702'], ans: 1 },
      { q: '103 × 102 = ?', options: ['10506', '10406', '10606', '10306'], ans: 0 },
      { q: '997 × 998 = ?', options: ['995006', '994006', '996006', '993006'], ans: 0 },
      { q: '95 × 96 = ?', options: ['9020', '9120', '9220', '8920'], ans: 1 },
    ],
  },
  {
    no: 8,
    sutra: 'पूरणापूरणाभ्याम्',
    meaning: 'पूर्ण और अपूर्ण के द्वारा',
    color: 'from-lime-500 to-green-600',
    bg: 'bg-lime-50 dark:bg-lime-900/20',
    border: 'border-lime-200 dark:border-lime-800',
    intro: `यह सूत्र वर्ग निकालने की सबसे शक्तिशाली विधि है। किसी संख्या के नज़दीकी आसान संख्या (जैसे 100, 50, 1000) को आधार बनाकर वर्ग निकालते हैं। इसे "Base Method for Squares" कहते हैं।`,
    uses: [
      'किसी भी संख्या का वर्ग',
      'समीकरण पूर्ण करना (Completing the Square)',
      'd²-b² प्रकार की गणना',
    ],
    steps: [
      { label: 'नियम', text: 'n² = (n+d)(n-d) + d²\nजहाँ d = n को आसान संख्या से दूरी\nया: n² = आधार × (n+d) + d²' },
      { label: 'उदाहरण 1', text: '104²:\n• आधार = 100, d = +4\n• (104+4) × 100 + 4²\n• 108 × 100 + 16\n• 10800 + 16 = 10816 ✅' },
      { label: 'उदाहरण 2', text: '96²:\n• आधार = 100, d = -4\n• (96-4) × 100 + 4²\n• 92 × 100 + 16\n• 9200 + 16 = 9216 ✅' },
      { label: 'उदाहरण 3', text: '52²:\n• आधार = 50, d = +2\n• (52+2) × 50 + 2²\n• 54 × 50 + 4\n• 2700 + 4 = 2704 ✅' },
      { label: 'उदाहरण 4', text: '998²:\n• आधार = 1000, d = -2\n• (998-2) × 1000 + 2²\n• 996000 + 4 = 996004 ✅' },
    ],
    why: 'क्यों काम करता है: n² = (n+d)(n-d) + d² यह बीजगणितीय सर्वसमिका a²-b²=(a+b)(a-b) से आती है!',
    practice: '105² = (105+5)×100 + 5² = 110×100 + 25 = 11025',
    quiz: [
      { q: '103² = ?', options: ['10609', '10509', '10709', '10409'], ans: 0 },
      { q: '98² = ?', options: ['9404', '9604', '9504', '9304'], ans: 1 },
      { q: '1005² = ?', options: ['1010025', '1001025', '1005025', '1000025'], ans: 0 },
      { q: '48² = ?', options: ['2204', '2304', '2104', '2404'], ans: 1 },
    ],
  },
  {
    no: 9,
    sutra: 'चलनकलनाभ्याम्',
    meaning: 'अंतरों और गुणांकों से',
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    border: 'border-sky-200 dark:border-sky-800',
    intro: `"चलन" का अर्थ चलना और "कलन" का अर्थ गणना। यह सूत्र समांतर श्रेणी (AP) और गुणोत्तर श्रेणी (GP) तथा अंतरों के पैटर्न को समझने में मदद करता है।`,
    uses: [
      'समांतर श्रेणी (AP) के सूत्र',
      'वर्गों का अंतर',
      'n-वाँ पद निकालना',
    ],
    steps: [
      { label: 'AP नियम', text: 'a, a+d, a+2d, a+3d...\nn-वाँ पद = a + (n-1)d\nयोग = n/2 × [2a + (n-1)d]' },
      { label: 'उदाहरण 1', text: '5, 8, 11, 14, ... का 10वाँ पद:\nd = 3, a = 5\n10वाँ पद = 5 + 9×3 = 32 ✅' },
      { label: 'उदाहरण 2', text: 'वर्गों का अंतर:\n6² - 5² = (6+5)(6-5) = 11\n10² - 9² = 19\n20² - 19² = 39\nपैटर्न: n² - (n-1)² = 2n-1' },
      { label: 'उदाहरण 3', text: '1²+2²+3²+...+n²:\n= n(n+1)(2n+1)/6\n\n1²+2²+3²+4²+5²\n= 5×6×11/6 = 55 ✅' },
      { label: 'उदाहरण 4', text: 'GP: 2, 6, 18, 54...\nर = 3, a = 2\nn-वाँ पद = 2 × 3^(n-1)\nयोग = 2(3ⁿ-1)/2 = 3ⁿ-1' },
    ],
    why: 'क्यों काम करता है: अंकों के बीच का अंतर (difference) एक पैटर्न बनाता है, जिससे अगले पद की गणना आसान होती है!',
    practice: '2, 5, 8, 11... का 15वाँ पद = 2 + 14×3 = 44',
    quiz: [
      { q: '3, 7, 11, 15... का 8वाँ पद?', options: ['29', '31', '33', '27'], ans: 1 },
      { q: 'n² - (n-1)² = ?', options: ['n+1', '2n', '2n-1', 'n-1'], ans: 2 },
      { q: '1+2+3+...+10 = ?', options: ['50', '55', '60', '45'], ans: 1 },
      { q: 'AP 4, 7, 10... का 5वाँ पद?', options: ['16', '17', '15', '18'], ans: 0 },
    ],
  },
  {
    no: 10,
    sutra: 'याव्दुनं तावदुनीकृत्य',
    meaning: 'जितना कम, उतना ही कम करके',
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    border: 'border-teal-200 dark:border-teal-800',
    intro: `यह सूत्र वर्ग निकालने का एक और तरीका है। संख्या और आधार के बीच के अंतर को "ऊपर-नीचे" दोनों तरफ लगाओ। यह 9 के पास की संख्याओं के लिए विशेष रूप से उपयोगी है।`,
    uses: [
      '8, 9, 7 जैसी संख्याओं का वर्ग',
      '98, 99, 97 जैसी संख्याओं का वर्ग',
      'किसी भी संख्या के पास आधार से',
    ],
    steps: [
      { label: 'नियम', text: 'n² निकालने के लिए:\nआधार = b (जैसे 10)\nअंतर = d = n - b\nn² = (n+d) × b + d²' },
      { label: 'उदाहरण 1', text: '9²:\n• आधार = 10, d = -1\n• (9-1)×10 + 1² = 80+1 = 81 ✅' },
      { label: 'उदाहरण 2', text: '8²:\n• आधार = 10, d = -2\n• (8-2)×10 + 2² = 60+4 = 64 ✅' },
      { label: 'उदाहरण 3', text: '7²:\n• आधार = 10, d = -3\n• (7-3)×10 + 3² = 40+9 = 49 ✅' },
      { label: 'उदाहरण 4', text: '97²:\n• आधार = 100, d = -3\n• (97-3)×100 + 3² = 9400+9 = 9409 ✅' },
    ],
    why: 'क्यों काम करता है: n² = (n-d)(n+d) + d² = b×(n+d) + d² यही सर्वसमिका a²-b²=(a+b)(a-b) का उपयोग है!',
    practice: '6² = (6-4)×10 + 4² = 20+16 = 36 ✅',
    quiz: [
      { q: '7² = ? (आधार 10 से)', options: ['47', '49', '51', '45'], ans: 1 },
      { q: '98² = ?', options: ['9404', '9604', '9204', '9804'], ans: 1 },
      { q: '995² = ?', options: ['990025', '990225', '989025', '990125'], ans: 0 },
      { q: 'आधार 10 से 6² = (6-4)×10 + ?', options: ['4', '9', '16', '36'], ans: 2 },
    ],
  },
  {
    no: 11,
    sutra: 'व्यष्टिसमष्टिः',
    meaning: 'व्यक्तिगत और सामूहिक',
    color: 'from-fuchsia-500 to-pink-600',
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20',
    border: 'border-fuchsia-200 dark:border-fuchsia-800',
    intro: `"व्यष्टि" का अर्थ है व्यक्तिगत (Individual) और "समष्टि" का अर्थ है समूह (Group/Whole)। यह सूत्र बताता है कि कभी-कभी पूरे समूह को देखना आसान होता है, कभी-कभी व्यक्तिगत रूप से।`,
    uses: [
      'औसत निकालना',
      'AP और GP का योग',
      'समरूप समीकरण हल करना',
    ],
    steps: [
      { label: 'नियम', text: 'समांतर श्रेणी में:\nयोग = पदों की संख्या × मध्य पद\nया = n/2 × (प्रथम + अंतिम)' },
      { label: 'उदाहरण 1', text: '5, 7, 9, 11, 13 का योग:\nमध्य पद = 9\nयोग = 5 × 9 = 45 ✅\nजाँच: 5+7+9+11+13 = 45 ✅' },
      { label: 'उदाहरण 2', text: '1+2+3+...+100:\nमध्य = (1+100)/2 = 50.5\nयोग = 100 × 50.5 = 5050 ✅\n(गॉस की विधि!)' },
      { label: 'उदाहरण 3', text: 'GP योग: 2+4+8+16+32:\nr = 2, a = 2, n = 5\nयोग = 2(2⁵-1)/(2-1) = 2×31 = 62 ✅' },
      { label: 'उदाहरण 4', text: 'a+b=5, ab=6 तो a²+b²:\n= (a+b)² - 2ab = 25-12 = 13 ✅\nव्यष्टि (a², b²) से नहीं, समष्टि (a+b) से!!' },
    ],
    why: 'क्यों काम करता है: समूह का गुण (जैसे योग, गुणनफल) अक्सर व्यक्तिगत गुणों से आसानी से निकलता है!',
    practice: '1+3+5+7+9+11 (6 विषम संख्याओं का योग) = 6² = 36',
    quiz: [
      { q: '2+4+6+8+10 = ?', options: ['28', '30', '32', '26'], ans: 1 },
      { q: 'AP: 3,5,7,9,11 का मध्य पद?', options: ['5', '7', '9', '6'], ans: 1 },
      { q: '1+2+...+20 = ?', options: ['200', '210', '190', '220'], ans: 1 },
      { q: 'a+b=7, ab=12 → a²+b² = ?', options: ['23', '25', '21', '27'], ans: 1 },
    ],
  },
  {
    no: 12,
    sutra: 'शेषाण्यङ्केन चरमेण',
    meaning: 'शेषफल अंतिम अंक से',
    color: 'from-orange-400 to-red-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-800',
    intro: `यह सूत्र बताता है कि घातांकों (powers) का अंतिम अंक (Unit Digit) एक चक्रीय (cyclic) पैटर्न में दोहराता है। इससे बड़े-बड़े घातांकों का इकाई अंक तुरंत पता चलता है।`,
    uses: [
      'bड़े घातांकों का इकाई अंक',
      'n से भाग पर शेषफल',
      'विभाज्यता परीक्षण',
    ],
    steps: [
      { label: '2 का चक्र', text: '2¹=2, 2²=4, 2³=8, 2⁴=16(→6), 2⁵=32(→2)\nचक्र: 2,4,8,6 (4 का cycle)\n\n2¹⁰⁰ का इकाई:\n100 ÷ 4 = 25 शेष 0 → 4वाँ = 6 ✅' },
      { label: '3 का चक्र', text: '3¹=3, 3²=9, 3³=27(→7), 3⁴=81(→1)\nचक्र: 3,9,7,1 (4 का cycle)\n\n3²³ का इकाई:\n23 ÷ 4 = 5 शेष 3 → 3वाँ = 7 ✅' },
      { label: '7 का चक्र', text: '7¹=7, 7²=49(→9), 7³=343(→3), 7⁴→1\nचक्र: 7,9,3,1 (4 का cycle)\n\n7¹⁰⁰ का इकाई:\n100÷4=25 शेष 0 → 4वाँ = 1 ✅' },
      { label: '9 का चक्र', text: '9¹=9, 9²=81(→1), 9³→9, 9⁴→1\nचक्र: 9,1 (2 का cycle)\n\n9⁹⁹ का इकाई:\n99 विषम → 1वाँ = 9 ✅' },
      { label: 'सरल नियम', text: '5ⁿ का इकाई हमेशा 5\n0ⁿ का इकाई हमेशा 0\n1ⁿ का इकाई हमेशा 1\n6ⁿ का इकाई हमेशा 6\n4ⁿ: n सम→6, n विषम→4' },
    ],
    why: 'क्यों काम करता है: गुणा में केवल इकाई अंक, इकाई अंक को प्रभावित करते हैं। इसलिए पैटर्न दोहराता है!',
    practice: '4²⁰ का इकाई: 20 सम → 6',
    quiz: [
      { q: '2²⁰ का इकाई अंक?', options: ['2', '4', '6', '8'], ans: 2 },
      { q: '3⁴⁰ का इकाई अंक?', options: ['1', '3', '7', '9'], ans: 0 },
      { q: '7¹⁰ का इकाई अंक?', options: ['1', '3', '7', '9'], ans: 3 },
      { q: '5⁹⁹ का इकाई अंक?', options: ['1', '5', '0', '25'], ans: 1 },
    ],
  },
  {
    no: 13,
    sutra: 'सोपान्त्यद्वयमन्त्यम्',
    meaning: 'अंतिम और अंत से पहले',
    color: 'from-indigo-500 to-blue-600',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    border: 'border-indigo-200 dark:border-indigo-800',
    intro: `यह सूत्र द्विघात व्यंजकों (Quadratic Expressions) का गुणनखंड करने की विधि है। जिन दो संख्याओं का गुणनफल और योग पता हो, उनसे गुणनखंड निकालते हैं।`,
    uses: [
      'द्विघात समीकरण हल करना',
      'बहुपद के गुणनखंड',
      'विभाज्यता परीक्षण',
    ],
    steps: [
      { label: 'नियम', text: 'x² + px + q में:\nऐसे a और b खोजो जहाँ:\na + b = p (बीच का गुणांक)\na × b = q (अंतिम पद)\nतो: (x+a)(x+b)' },
      { label: 'उदाहरण 1', text: 'x² + 5x + 6:\n• 2+3=5 और 2×3=6 ✅\n• = (x+2)(x+3)\nजाँच: x²+3x+2x+6 = x²+5x+6 ✅' },
      { label: 'उदाहरण 2', text: 'x² - 7x + 12:\n• a+b = -7, a×b = 12\n• -3 + (-4) = -7, (-3)×(-4) = 12 ✅\n• = (x-3)(x-4)' },
      { label: 'उदाहरण 3', text: 'x² + x - 12:\n• a+b = 1, a×b = -12\n• 4+(-3) = 1, 4×(-3) = -12 ✅\n• = (x+4)(x-3)' },
      { label: 'उदाहरण 4', text: '2x² + 7x + 3:\n• ac = 2×3 = 6\n• 6+1=7 (मध्य पद)\n• 2x²+6x+x+3 = 2x(x+3)+1(x+3)\n• = (2x+1)(x+3) ✅' },
    ],
    why: 'क्यों काम करता है: (x+a)(x+b) = x²+(a+b)x+ab। इसलिए मध्य गुणांक = a+b और स्वतंत्र पद = ab!',
    practice: 'x² + 9x + 20 = (x+4)(x+5) क्योंकि 4+5=9 और 4×5=20',
    quiz: [
      { q: 'x² + 7x + 12 = ?', options: ['(x+3)(x+4)', '(x+2)(x+6)', '(x+1)(x+12)', '(x+4)(x+4)'], ans: 0 },
      { q: 'x² - 5x + 6 = ?', options: ['(x-1)(x-6)', '(x-2)(x-3)', '(x+2)(x+3)', '(x-2)(x+3)'], ans: 1 },
      { q: 'x² + 3x - 10 = ?', options: ['(x+5)(x-2)', '(x-5)(x+2)', '(x+5)(x+2)', '(x-5)(x-2)'], ans: 0 },
      { q: 'x² - 4x + 4 = ?', options: ['(x-2)²', '(x+2)²', '(x-4)(x-1)', '(x-2)(x+2)'], ans: 0 },
    ],
  },
  {
    no: 14,
    sutra: 'एकन्यूनेन पूर्वेण',
    meaning: 'एक कम पिछले से',
    color: 'from-green-400 to-teal-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    intro: `"एकन्यून" का अर्थ है "एक कम"। यह सूत्र 9, 99, 999 जैसी संख्याओं से गुणा का सबसे तेज़ तरीका है। 99 से गुणा करने का मतलब है "100 से गुणा करो और एक बार घटाओ"!`,
    uses: [
      '9, 99, 999 से गुणा',
      'श्रेणी में एक कम का नियम',
      'अनुक्रम पैटर्न',
    ],
    steps: [
      { label: 'नियम', text: 'n × 99 = n × 100 - n = n00 - n\nn × 999 = n000 - n\nन्यूनतम रूप: "अगले से एक घटाओ"' },
      { label: 'उदाहरण 1', text: '47 × 99:\n= 47 × 100 - 47\n= 4700 - 47\n= 4653 ✅' },
      { label: 'उदाहरण 2', text: '234 × 999:\n= 234 × 1000 - 234\n= 234000 - 234\n= 233766 ✅' },
      { label: 'उदाहरण 3', text: '567 × 9999:\n= 5670000 - 567\n= 5669433 ✅' },
      { label: 'उदाहरण 4', text: '43 × 98:\n= 43 × 100 - 43 × 2\n= 4300 - 86\n= 4214 ✅\n\n(98 = 100-2)' },
    ],
    why: 'क्यों काम करता है: 99 = 100-1, इसलिए n×99 = n×100 - n×1 = 100n - n। बस!',
    practice: '63 × 999 = 63000 - 63 = 62937',
    quiz: [
      { q: '43 × 99 = ?', options: ['4157', '4257', '4357', '4057'], ans: 1 },
      { q: '123 × 999 = ?', options: ['122877', '123877', '121877', '124877'], ans: 0 },
      { q: '72 × 99 = ?', options: ['7028', '7128', '7228', '6928'], ans: 1 },
      { q: '56 × 9 = ? (एकन्यूनेन से)', options: ['494', '504', '514', '484'], ans: 1 },
    ],
  },
  {
    no: 15,
    sutra: 'गुणितसमुच्चयः',
    meaning: 'गुणनफल का समुच्चय बराबर',
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-200 dark:border-rose-800',
    intro: `यह सूत्र बताता है कि बहुपद के मूलों (roots) का गुणनफल और योग सीधे गुणांकों से निकाला जा सकता है। इससे द्विघात समीकरण बिना हल किए ही जानकारी मिलती है।`,
    uses: [
      'द्विघात समीकरण के मूलों का योग/गुणनफल',
      'त्रिघात समीकरण में मूलों का संबंध',
      'बहुपद की जाँच',
    ],
    steps: [
      { label: 'नियम (ax²+bx+c)', text: 'मूलों का योग (α+β) = -b/a\nमूलों का गुणनफल (α×β) = c/a\nमूलों का अंतर (α-β) = √[(α+β)²-4αβ]' },
      { label: 'उदाहरण 1', text: 'x² - 5x + 6:\n• α+β = 5/1 = 5\n• αβ = 6/1 = 6\n• मूल: 2 और 3\n(2+3=5 ✅, 2×3=6 ✅)' },
      { label: 'उदाहरण 2', text: '2x² + 7x + 3:\n• α+β = -7/2\n• αβ = 3/2\n• मूल: -1/2 और -3\nजाँच: -1/2 + (-3) = -7/2 ✅' },
      { label: 'उदाहरण 3', text: 'यदि मूल 3 और 4 हों, समीकरण:\n• योग = 7, गुणनफल = 12\n• x² - 7x + 12 = 0 ✅' },
      { label: 'उदाहरण 4', text: 'x² + px + q = 0 में:\nयदि एक मूल दूसरे का दोगुना हो\nα + 2α = -p → α = -p/3\nα × 2α = q → 2p²/9 = q ✅' },
    ],
    why: 'क्यों काम करता है: (x-α)(x-β) = x² -(α+β)x + αβ। इसलिए मध्य गुणांक = -(मूलों का योग) और अंतिम = गुणनफल!',
    practice: 'x² - 8x + 15 = 0: मूल = 3,5 (3+5=8, 3×5=15)',
    quiz: [
      { q: 'x² - 6x + 8 में मूलों का योग?', options: ['6', '-6', '8', '-8'], ans: 0 },
      { q: 'x² + 5x + 4 में मूलों का गुणनफल?', options: ['5', '-5', '4', '-4'], ans: 2 },
      { q: 'मूल 2 और 5 हों तो समीकरण?', options: ['x²+7x+10', 'x²-7x+10', 'x²-7x-10', 'x²+7x-10'], ans: 1 },
      { q: '3x²-10x+3 में मूलों का गुणनफल?', options: ['10/3', '-10/3', '1', '3'], ans: 2 },
    ],
  },
  {
    no: 16,
    sutra: 'गुणकसमुच्चयः',
    meaning: 'गुणकों का समुच्चय',
    color: 'from-cyan-500 to-sky-600',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-200 dark:border-cyan-800',
    intro: `यह सूत्र गुणनखंड प्रमेय (Factor Theorem) से संबंधित है। यदि p(a) = 0, तो (x-a) बहुपद p(x) का गुणनखंड है। यह बहुपद के मूल और गुणनखंड के बीच का संबंध बताता है।`,
    uses: [
      'बहुपद के गुणनखंड परीक्षण',
      'शेषफल प्रमेय',
      'उच्च घात बहुपद का विभाजन',
    ],
    steps: [
      { label: 'नियम', text: 'यदि p(a) = 0 → (x-a) गुणनखंड है\nशेषफल प्रमेय: p(x) को (x-a) से भाग → शेषफल = p(a)' },
      { label: 'उदाहरण 1', text: 'p(x) = x² - 3x + 2:\np(1) = 1-3+2 = 0 → (x-1) गुणनखंड ✅\np(2) = 4-6+2 = 0 → (x-2) गुणनखंड ✅\n= (x-1)(x-2)' },
      { label: 'उदाहरण 2', text: 'p(x) = x³ - 6x² + 11x - 6:\np(1) = 1-6+11-6 = 0 → (x-1) ✅\np(2) = 8-24+22-6 = 0 → (x-2) ✅\np(3) = 27-54+33-6 = 0 → (x-3) ✅\n= (x-1)(x-2)(x-3)' },
      { label: 'उदाहरण 3', text: 'p(x) = x² + 4x + 4:\np(-2) = 4-8+4 = 0 → (x+2) दोगुना गुणनखंड\n= (x+2)²' },
      { label: 'शेषफल उदाहरण', text: 'p(x) = x³ + 3x - 4 को (x-1) से भाग:\np(1) = 1+3-4 = 0\nशेषफल = 0, यानी (x-1) पूरा भाग देता है!' },
    ],
    why: 'क्यों काम करता है: यदि x=a समीकरण का हल है, तो (x-a) = 0, अतः (x-a) गुणनखंड होगा!',
    practice: 'x²-9 के गुणनखंड: p(3)=0 और p(-3)=0 → (x-3)(x+3)',
    quiz: [
      { q: 'p(x)=x²-4, p(2) = ?', options: ['0', '4', '-4', '8'], ans: 0 },
      { q: 'p(x)=x²+x-6 में x=2 डालें?', options: ['0', '4', '-4', '8'], ans: 0 },
      { q: '(x-3) किसका गुणनखंड है?', options: ['x²+x-6', 'x²-5x+6', 'x²+5x+6', 'x²-x-6'], ans: 1 },
      { q: 'p(x)=x³-1 में p(1) = ?', options: ['0', '1', '-1', '2'], ans: 0 },
    ],
  },
];

function SutraQuiz({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = quiz.filter((q, i) => answers[i] === q.ans).length;

  return (
    <div className="mt-4 space-y-4">
      <h4 className="font-heading text-base text-primary">🧠 अभ्यास प्रश्न — इस सूत्र का उपयोग करके हल करो</h4>
      {quiz.map((q, qi) => (
        <div key={qi} className="bg-muted/40 rounded-xl p-3">
          <p className="font-body font-bold text-sm mb-2">{qi + 1}. {q.q}</p>
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt, oi) => {
              let cls = 'border rounded-xl px-3 py-2 text-sm font-body cursor-pointer transition-all text-left min-h-0 ';
              if (submitted) {
                if (oi === q.ans) cls += 'bg-green-100 border-green-400 text-green-800 dark:bg-green-900/40 dark:text-green-300';
                else if (answers[qi] === oi) cls += 'bg-red-100 border-red-400 text-red-800 dark:bg-red-900/40 dark:text-red-300';
                else cls += 'bg-card opacity-50';
              } else {
                cls += answers[qi] === oi ? 'bg-primary/10 border-primary' : 'bg-card hover:border-primary';
              }
              return (
                <button key={oi} className={cls} onClick={() => !submitted && setAnswers(a => ({ ...a, [qi]: oi }))}>
                  {submitted && oi === q.ans && <CheckCircle size={14} className="inline mr-1 text-green-600" />}
                  {submitted && answers[qi] === oi && oi !== q.ans && <XCircle size={14} className="inline mr-1 text-red-600" />}
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < quiz.length}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-2xl font-body font-bold text-sm disabled:opacity-50 min-h-0"
        >
          जाँचो →
        </button>
      ) : (
        <div className={`rounded-xl p-3 font-body font-bold text-sm ${score === quiz.length ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'}`}>
          {score === quiz.length ? '🏆 शाबाश! सभी सही!' : `✅ ${score}/${quiz.length} सही — अच्छी कोशिश!`}
          <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="ml-3 underline text-xs font-normal min-h-0 min-w-0">फिर से करो</button>
        </div>
      )}
    </div>
  );
}

export default function VedicMath() {
  const [openId, setOpenId] = useState(null);
  const [activeView, setActiveView] = useState('learn'); // 'learn' | 'quiz'

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <h1 className="font-heading text-3xl md:text-4xl mb-2">🕉️ वैदिक गणित — 16 सूत्र</h1>
        <p className="text-muted-foreground font-body mb-3">प्राचीन भारतीय गणित की अद्भुत विधियाँ — हर सूत्र की पूरी व्याख्या + क्विज़!</p>
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl px-4 py-3 text-sm font-body text-orange-700 dark:text-orange-300 max-w-2xl mx-auto">
          📖 <strong>स्वामी भारती कृष्ण तीर्थ</strong> द्वारा अथर्ववेद से निकाले गए — ये 16 सूत्र और 13 उप-सूत्र सम्पूर्ण गणित को सरल बनाते हैं।
        </div>
      </motion.div>

      {/* Mode Toggle */}
      <div className="flex gap-3 justify-center mb-6">
        <button onClick={() => setActiveView('learn')} className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-body font-bold text-sm min-h-0 transition-all ${activeView === 'learn' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>
          <BookOpen size={16} /> सूत्र सीखो
        </button>
        <button onClick={() => setActiveView('quiz')} className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-body font-bold text-sm min-h-0 transition-all ${activeView === 'quiz' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>
          <HelpCircle size={16} /> क्विज़ खेलो
        </button>
      </div>

      {activeView === 'quiz' ? (
        <VedicQuizAll />
      ) : (
        <div className="space-y-3">
          {vedicSutras.map((s, i) => (
            <motion.div key={s.no} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              className="bg-card border rounded-2xl overflow-hidden shadow-sm"
            >
              <button onClick={() => setOpenId(openId === s.no ? null : s.no)} className="w-full text-left p-4 min-h-0">
                <div className="flex items-center gap-3">
                  <div className={`bg-gradient-to-r ${s.color} text-white rounded-xl w-12 h-12 flex items-center justify-center font-heading text-lg shrink-0`}>{s.no}</div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-heading text-base md:text-lg text-foreground">{s.sutra}</h2>
                    <p className="text-sm text-muted-foreground font-body">{s.meaning}</p>
                  </div>
                  <ChevronDown size={20} className={`text-muted-foreground transition-transform shrink-0 ${openId === s.no ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {openId === s.no && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className={`px-4 pb-4 border-t pt-4 space-y-4 ${s.bg}`}>
                      {/* Intro */}
                      <p className="font-body text-sm text-foreground leading-relaxed">{s.intro}</p>

                      {/* Uses */}
                      <div className="bg-white dark:bg-card rounded-xl p-3 shadow-sm">
                        <p className="text-xs font-bold text-primary font-body mb-2">🎯 उपयोग:</p>
                        <ul className="space-y-1">
                          {s.uses.map((u, ui) => <li key={ui} className="text-xs font-body text-foreground flex gap-2"><span>→</span>{u}</li>)}
                        </ul>
                      </div>

                      {/* Step by Step */}
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-primary font-body">📝 चरण-दर-चरण उदाहरण:</p>
                        {s.steps.map((step, si) => (
                          <div key={si} className="bg-white dark:bg-card rounded-xl p-3 shadow-sm">
                            <p className="text-xs font-bold text-primary font-body mb-1">▶ {step.label}:</p>
                            <pre className="whitespace-pre-wrap font-body text-xs md:text-sm text-foreground leading-relaxed">{step.text}</pre>
                          </div>
                        ))}
                      </div>

                      {/* Why it works */}
                      <div className={`bg-gradient-to-r ${s.color} text-white rounded-xl p-3`}>
                        <p className="text-xs font-bold font-body">🔬 {s.why}</p>
                      </div>

                      {/* Practice */}
                      <div className={`border-2 ${s.border} rounded-xl p-3`}>
                        <p className="text-xs font-bold font-body text-foreground">✍️ अभ्यास करो: {s.practice}</p>
                      </div>

                      {/* Quiz */}
                      <SutraQuiz quiz={s.quiz} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function VedicQuizAll() {
  const allQuestions = vedicSutras.flatMap(s =>
    s.quiz.map(q => ({ ...q, sutraNo: s.no, sutraName: s.sutra, color: s.color }))
  );
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = allQuestions[current];

  const handleSelect = (oi) => {
    if (selected !== null) return;
    setSelected(oi);
    if (oi === q.ans) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= allQuestions.length) { setDone(true); return; }
    setCurrent(c => c + 1);
    setSelected(null);
  };

  if (done) return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center bg-card border rounded-3xl p-10">
      <div className="text-6xl mb-4">{score >= 50 ? '🏆' : score >= 32 ? '🌟' : '💪'}</div>
      <h2 className="font-heading text-3xl mb-2">क्विज़ समाप्त!</h2>
      <p className="font-body text-xl font-bold text-primary mb-4">{score}/{allQuestions.length} सही</p>
      <p className="font-body text-muted-foreground mb-6">{score >= 50 ? 'वाह! तुम वैदिक गणित के उस्ताद हो!' : score >= 32 ? 'बहुत अच्छा! थोड़ा और अभ्यास करो।' : 'हिम्मत रखो! सूत्र फिर से पढ़ो।'}</p>
      <button onClick={() => { setCurrent(0); setSelected(null); setScore(0); setDone(false); }} className="bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-body font-bold min-h-0">फिर से खेलो</button>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border rounded-2xl p-4">
        <span className="font-body text-sm font-bold">प्रश्न {current + 1}/{allQuestions.length}</span>
        <span className="font-body text-sm font-bold text-primary">स्कोर: {score}</span>
        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((current) / allQuestions.length) * 100}%` }} />
        </div>
      </div>

      <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-card border rounded-2xl overflow-hidden">
        <div className={`bg-gradient-to-r ${q.color} p-4 text-white`}>
          <p className="text-xs opacity-80 font-body">सूत्र {q.sutraNo}: {q.sutraName}</p>
          <p className="font-heading text-lg mt-1">{q.q}</p>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {q.options.map((opt, oi) => {
            let cls = 'border-2 rounded-xl px-4 py-3 text-sm font-body font-bold cursor-pointer transition-all text-left min-h-0 ';
            if (selected !== null) {
              if (oi === q.ans) cls += 'border-green-500 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300';
              else if (selected === oi) cls += 'border-red-500 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300';
              else cls += 'border-border opacity-40';
            } else {
              cls += 'border-border hover:border-primary hover:bg-primary/5';
            }
            return (
              <button key={oi} className={cls} onClick={() => handleSelect(oi)}>
                {selected !== null && oi === q.ans && <CheckCircle size={16} className="inline mr-2 text-green-600" />}
                {selected !== null && selected === oi && oi !== q.ans && <XCircle size={16} className="inline mr-2 text-red-600" />}
                {opt}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="px-4 pb-4">
            <button onClick={handleNext} className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-body font-bold min-h-0">
              {current + 1 >= allQuestions.length ? 'परिणाम देखो 🏆' : 'अगला प्रश्न →'}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
