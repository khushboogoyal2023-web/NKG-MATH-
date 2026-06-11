import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronDown, ChevronRight, Star, Brain, Calculator, Lightbulb, CheckCircle } from 'lucide-react';

const trickCategories = [
  {
    name: '⚡ मानसिक गणना',
    icon: '⚡',
    color: 'from-purple-500 to-indigo-600',
    bgLight: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200',
    tricks: [
      {
        title: '11 से गुणा — जादुई ट्रिक!',
        difficulty: 'आसान',
        emoji: '🔢',
        desc: 'किसी भी 2 अंक की संख्या को 11 से गुणा करें — बस बीच में दोनों अंकों का योग लिखो!',
        steps: [
          { label: 'नियम', text: 'AB × 11 = A | (A+B) | B', type: 'rule' },
          { label: 'उदाहरण 1', text: '23 × 11\n→ 2 | (2+3) | 3\n→ 2 | 5 | 3\n→ उत्तर: 253 ✅', type: 'example' },
          { label: 'उदाहरण 2', text: '47 × 11\n→ 4 | (4+7) | 7\n→ 4 | 11 | 7\n→ बीच में 11 है! → 4+1 | 1 | 7\n→ उत्तर: 517 ✅', type: 'example' },
          { label: 'उदाहरण 3', text: '63 × 11\n→ 6 | (6+3) | 3\n→ 6 | 9 | 3\n→ उत्तर: 693 ✅', type: 'example' },
        ],
        quiz: [
          { q: '25 × 11 = ?', options: ['255', '275', '265', '285'], ans: 1 },
          { q: '34 × 11 = ?', options: ['364', '374', '354', '394'], ans: 1 },
          { q: '55 × 11 = ?', options: ['595', '605', '585', '615'], ans: 1 },
        ],
        why: 'जब हम 11 से गुणा करते हैं: AB × 11 = AB × 10 + AB × 1 = AB0 + AB = A(A+B)B',
      },
      {
        title: '5 से गुणा — सबसे तेज़',
        difficulty: 'आसान',
        emoji: '✋',
        desc: '5 = 10÷2, इसलिए किसी भी संख्या को 5 से गुणा = संख्या को 2 से भाग देकर 10 लगाओ!',
        steps: [
          { label: 'नियम', text: 'n × 5 = n ÷ 2 × 10\n(या: n × 10 ÷ 2)', type: 'rule' },
          { label: 'उदाहरण 1', text: '86 × 5\n→ 86 ÷ 2 = 43\n→ 43 × 10 = 430 ✅', type: 'example' },
          { label: 'उदाहरण 2', text: '124 × 5\n→ 124 ÷ 2 = 62\n→ 62 × 10 = 620 ✅', type: 'example' },
          { label: 'विषम संख्या', text: '73 × 5\n→ 73 ÷ 2 = 36.5\n→ 36.5 × 10 = 365 ✅', type: 'example' },
        ],
        quiz: [
          { q: '48 × 5 = ?', options: ['220', '230', '240', '250'], ans: 2 },
          { q: '37 × 5 = ?', options: ['175', '185', '195', '165'], ans: 1 },
          { q: '200 × 5 = ?', options: ['500', '1000', '1500', '2000'], ans: 1 },
        ],
        why: '5 = 10/2, इसलिए ×5 = ×10 ÷2। यह सबसे आसान गुणा है!',
      },
      {
        title: 'n5 × n5 — वर्ग ट्रिक',
        difficulty: 'मध्यम',
        emoji: '⭐',
        desc: '5 से अंत होने वाली किसी भी संख्या का वर्ग: पहले अंक × (पहले अंक+1), फिर 25 लगाओ!',
        steps: [
          { label: 'नियम', text: '(n5)² = [n × (n+1)] | 25', type: 'rule' },
          { label: 'उदाहरण 1', text: '35² = ?\n→ n=3, n+1=4\n→ 3×4 = 12\n→ उत्तर: 1225 ✅', type: 'example' },
          { label: 'उदाहरण 2', text: '75² = ?\n→ n=7, n+1=8\n→ 7×8 = 56\n→ उत्तर: 5625 ✅', type: 'example' },
          { label: 'उदाहरण 3', text: '95² = ?\n→ n=9, n+1=10\n→ 9×10 = 90\n→ उत्तर: 9025 ✅', type: 'example' },
        ],
        quiz: [
          { q: '25² = ?', options: ['525', '625', '725', '425'], ans: 1 },
          { q: '45² = ?', options: ['1825', '2025', '2125', '1925'], ans: 1 },
          { q: '65² = ?', options: ['3925', '4025', '4225', '4125'], ans: 2 },
        ],
        why: '(10n+5)² = 100n²+100n+25 = 100n(n+1)+25। इसीलिए n(n+1) के बाद 25 लिखते हैं!',
      },
      {
        title: '9 से गुणा — उँगली विधि',
        difficulty: 'आसान',
        emoji: '🖐️',
        desc: '9 × n = (n-1) | (10-n) — दहाई में (n-1) और इकाई में (10-n)',
        steps: [
          { label: 'नियम', text: '9 × n = (n-1)(10-n)', type: 'rule' },
          { label: 'उदाहरण 1', text: '9 × 7\n→ दहाई: 7-1 = 6\n→ इकाई: 10-7 = 3\n→ उत्तर: 63 ✅', type: 'example' },
          { label: 'उदाहरण 2', text: '9 × 8\n→ दहाई: 8-1 = 7\n→ इकाई: 10-8 = 2\n→ उत्तर: 72 ✅', type: 'example' },
          { label: 'उँगली विधि', text: '10 उँगलियाँ फैलाओ\n9×7: 7वीं उँगली मोड़ो\nबायीं तरफ = 6 उँगलियाँ (दहाई)\nदायीं तरफ = 3 उँगलियाँ (इकाई)\nउत्तर = 63 ✅', type: 'tip' },
        ],
        quiz: [
          { q: '9 × 6 = ?', options: ['54', '56', '64', '46'], ans: 0 },
          { q: '9 × 9 = ?', options: ['72', '81', '91', '80'], ans: 1 },
          { q: '9 × 4 = ?', options: ['32', '36', '42', '30'], ans: 1 },
        ],
        why: '9×n = 10n - n, इसलिए दहाई = n-1 (10n का n), इकाई = 10-n (−n का इकाई)',
      },
      {
        title: '25 से गुणा',
        difficulty: 'आसान',
        emoji: '💰',
        desc: '25 = 100/4 — इसलिए ×25 = ×100 ÷4। बहुत आसान!',
        steps: [
          { label: 'नियम', text: 'n × 25 = n × 100 ÷ 4', type: 'rule' },
          { label: 'उदाहरण 1', text: '36 × 25\n→ 36 × 100 = 3600\n→ 3600 ÷ 4 = 900 ✅', type: 'example' },
          { label: 'उदाहरण 2', text: '48 × 25\n→ 4800 ÷ 4 = 1200 ✅', type: 'example' },
          { label: 'उदाहरण 3', text: '15 × 25\n→ 1500 ÷ 4 = 375 ✅', type: 'example' },
        ],
        quiz: [
          { q: '44 × 25 = ?', options: ['1000', '1050', '1100', '1150'], ans: 2 },
          { q: '20 × 25 = ?', options: ['400', '500', '600', '300'], ans: 1 },
          { q: '8 × 25 = ?', options: ['175', '200', '225', '150'], ans: 1 },
        ],
        why: '25 = 100/4, इसलिए n × 25 = n × 100/4 = 100n/4',
      },
      {
        title: '99/999 से गुणा',
        difficulty: 'आसान',
        emoji: '🔟',
        desc: '99 से गुणा = 100 से गुणा करो फिर एक बार वही संख्या घटाओ!',
        steps: [
          { label: 'नियम', text: 'n × 99 = n × 100 - n', type: 'rule' },
          { label: 'उदाहरण 1', text: '47 × 99\n→ 47 × 100 = 4700\n→ 4700 - 47 = 4653 ✅', type: 'example' },
          { label: 'उदाहरण 2', text: '234 × 999\n→ 234 × 1000 = 234000\n→ 234000 - 234 = 233766 ✅', type: 'example' },
          { label: 'Short trick', text: 'n × 99: बस n में से 1 घटाओ → दहाई, फिर (100-n) → इकाई\n63 × 99: दहाई=62, इकाई=37 → 6237 ✅', type: 'tip' },
        ],
        quiz: [
          { q: '43 × 99 = ?', options: ['4157', '4257', '4357', '4057'], ans: 1 },
          { q: '72 × 99 = ?', options: ['7028', '7128', '7228', '6928'], ans: 1 },
          { q: '15 × 999 = ?', options: ['14985', '14895', '15985', '13985'], ans: 0 },
        ],
        why: '99 = 100-1, इसलिए n×99 = 100n - n = 100n - n। Simple!',
      },
    ],
  },
  {
    name: '🎯 विभाज्यता',
    icon: '🎯',
    color: 'from-orange-500 to-red-500',
    bgLight: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200',
    tricks: [
      {
        title: '2 से विभाज्यता',
        difficulty: 'आसान',
        emoji: '2️⃣',
        desc: 'अंतिम अंक 0, 2, 4, 6, 8 हो तो 2 से विभाज्य',
        steps: [
          { label: 'नियम', text: 'अंतिम अंक = 0, 2, 4, 6, 8 → ✅', type: 'rule' },
          { label: 'उदाहरण', text: '248 → अंतिम 8 → ✅ विभाज्य\n137 → अंतिम 7 → ❌ नहीं\n1000 → अंतिम 0 → ✅ विभाज्य', type: 'example' },
        ],
        quiz: [
          { q: '1346 क्या 2 से विभाज्य है?', options: ['हाँ', 'नहीं'], ans: 0 },
          { q: '2557 क्या 2 से विभाज्य है?', options: ['हाँ', 'नहीं'], ans: 1 },
          { q: '9990 क्या 2 से विभाज्य है?', options: ['हाँ', 'नहीं'], ans: 0 },
        ],
        why: 'हर सम संख्या 2 से विभाज्य होती है, और इकाई अंक से ही पता चलता है।',
      },
      {
        title: '3 से विभाज्यता',
        difficulty: 'आसान',
        emoji: '3️⃣',
        desc: 'सभी अंकों का योग 3 का गुणज हो तो 3 से विभाज्य',
        steps: [
          { label: 'नियम', text: 'अंकों का योग ÷ 3 = पूरा आए → ✅', type: 'rule' },
          { label: 'उदाहरण 1', text: '423: 4+2+3 = 9 → 9÷3=3 ✅', type: 'example' },
          { label: 'उदाहरण 2', text: '256: 2+5+6 = 13 → 13÷3 नहीं ❌', type: 'example' },
          { label: 'उदाहरण 3', text: '1347: 1+3+4+7 = 15 → 15÷3=5 ✅', type: 'example' },
        ],
        quiz: [
          { q: '123 क्या 3 से विभाज्य है?', options: ['हाँ (1+2+3=6)', 'नहीं'], ans: 0 },
          { q: '425 क्या 3 से विभाज्य है?', options: ['हाँ', 'नहीं (4+2+5=11)'], ans: 1 },
          { q: '891 क्या 3 से विभाज्य है?', options: ['हाँ (8+9+1=18)', 'नहीं'], ans: 0 },
        ],
        why: 'किसी संख्या को 3 से भाग देने पर शेषफल = अंकों के योग को 3 से भाग पर शेषफल',
      },
      {
        title: '9 से विभाज्यता',
        difficulty: 'आसान',
        emoji: '9️⃣',
        desc: 'अंकों का योग 9 का गुणज हो',
        steps: [
          { label: 'नियम', text: 'अंकों का योग 9 से विभाज्य हो → ✅', type: 'rule' },
          { label: 'उदाहरण', text: '729: 7+2+9 = 18 → 18÷9=2 ✅\n1287: 1+2+8+7 = 18 ✅\n567: 5+6+7 = 18 ✅', type: 'example' },
          { label: 'रोचक तथ्य', text: 'किसी संख्या से उसके अंकों का योग घटाओ → 9 से विभाज्य!\n83 - (8+3) = 83 - 11 = 72 = 9×8 ✅', type: 'tip' },
        ],
        quiz: [
          { q: '729 क्या 9 से विभाज्य है?', options: ['हाँ (7+2+9=18)', 'नहीं'], ans: 0 },
          { q: '1234 क्या 9 से विभाज्य है?', options: ['हाँ', 'नहीं (1+2+3+4=10)'], ans: 1 },
          { q: '9081 क्या 9 से विभाज्य है?', options: ['हाँ (9+0+8+1=18)', 'नहीं'], ans: 0 },
        ],
        why: '3 वाला नियम ही — 9 के मामले में अंकों का योग 9 का गुणज होना चाहिए।',
      },
      {
        title: '11 से विभाज्यता',
        difficulty: 'मध्यम',
        emoji: '1️⃣1️⃣',
        desc: 'विषम स्थान के अंकों का योग — सम स्थान का योग = 0 या 11 का गुणज',
        steps: [
          { label: 'नियम', text: '(विषम स्थान योग) - (सम स्थान योग) = 0 या 11 गुणज', type: 'rule' },
          { label: 'उदाहरण 1', text: '121: (1+1) - 2 = 0 → ✅\n1331: (1+3) - (3+1) = 0 → ✅', type: 'example' },
          { label: 'उदाहरण 2', text: '2728: (2+2) - (7+8) = 4-15 = -11 → ✅', type: 'example' },
        ],
        quiz: [
          { q: '121 क्या 11 से विभाज्य है?', options: ['हाँ', 'नहीं'], ans: 0 },
          { q: '1234 क्या 11 से विभाज्य है?', options: ['हाँ', 'नहीं (1+3)-(2+4)=-2'], ans: 1 },
          { q: '1001 क्या 11 से विभाज्य है?', options: ['हाँ (1+0)-(0+1)=0', 'नहीं'], ans: 0 },
        ],
        why: 'किसी संख्या को 11 से भाग पर, सम और विषम स्थान के अंकों का अंतर शेषफल देता है।',
      },
      {
        title: '7 से विभाज्यता',
        difficulty: 'कठिन',
        emoji: '7️⃣',
        desc: 'अंतिम अंक × 2 बाकी से घटाओ — यदि 7 का गुणज हो',
        steps: [
          { label: 'नियम', text: 'बाकी संख्या - (अंतिम अंक × 2) = 7 का गुणज → ✅', type: 'rule' },
          { label: 'उदाहरण 1', text: '343:\n34 - (3×2) = 34-6 = 28 = 7×4 ✅', type: 'example' },
          { label: 'उदाहरण 2', text: '203:\n20 - (3×2) = 20-6 = 14 = 7×2 ✅', type: 'example' },
        ],
        quiz: [
          { q: '63 क्या 7 से विभाज्य है?', options: ['हाँ (6-3×2=0)', 'नहीं'], ans: 0 },
          { q: '49 क्या 7 से विभाज्य है?', options: ['हाँ (4-9×2 नहीं)', 'हाँ (49÷7=7)'], ans: 1 },
          { q: '91 क्या 7 से विभाज्य है?', options: ['हाँ (9-1×2=7)', 'नहीं'], ans: 0 },
        ],
        why: 'यह 7 के गुणनखंड के चक्रीय पैटर्न पर आधारित है।',
      },
    ],
  },
  {
    name: '🌟 अद्भुत संख्याएं',
    icon: '🌟',
    color: 'from-teal-500 to-green-600',
    bgLight: 'bg-teal-50 dark:bg-teal-900/20',
    borderColor: 'border-teal-200',
    tricks: [
      {
        title: 'जादुई संख्या 142857',
        difficulty: 'रोचक',
        emoji: '✨',
        desc: '142857 एक ऐसी संख्या है जो हर बार घूमती रहती है!',
        steps: [
          { label: 'जादू देखो', text: '142857 × 1 = 142857\n142857 × 2 = 285714\n142857 × 3 = 428571\n142857 × 4 = 571428\n142857 × 5 = 714285\n142857 × 6 = 857142\n142857 × 7 = 999999 🤯', type: 'example' },
          { label: 'रहस्य', text: 'सभी में वही 6 अंक: 1,4,2,8,5,7\n142857 = 1/7 का दशमलव भाग!\n1/7 = 0.142857142857...', type: 'tip' },
        ],
        quiz: [
          { q: '142857 × 3 = ?', options: ['428571', '285714', '142857', '714285'], ans: 0 },
          { q: '142857 × 7 = ?', options: ['142857', '999999', '1000000', '857142'], ans: 1 },
          { q: '142857 किसका दशमलव है?', options: ['1/5', '1/6', '1/7', '1/8'], ans: 2 },
        ],
        why: '1/7 = 0.142857142857... — यह repeating decimal है जो 6 अंकों का cycle बनाती है!',
      },
      {
        title: 'Kaprekar का 6174',
        difficulty: 'रोचक',
        emoji: '🔄',
        desc: 'कोई भी 4 अंक — 7 steps में 6174 पर पहुँचोगे!',
        steps: [
          { label: 'विधि', text: '1. 4 अंक चुनो (सब एक जैसे नहीं)\n2. बड़े से छोटे क्रम में लगाओ\n3. छोटे से बड़े में लगाओ\n4. बड़े - छोटे = नई संख्या\n5. दोहराओ — 6174 आएगा!', type: 'rule' },
          { label: 'उदाहरण', text: '3524:\n5432 - 2345 = 3087\n8730 - 0378 = 8352\n8532 - 2358 = 6174 ✅\n7641 - 1467 = 6174 ✅ (हमेशा!)', type: 'example' },
        ],
        quiz: [
          { q: 'Kaprekar constant क्या है?', options: ['1089', '6174', '1729', '142857'], ans: 1 },
          { q: '6174 किसने खोजा?', options: ['Ramanujan', 'Kaprekar', 'Aryabhatta', 'Euclid'], ans: 1 },
          { q: '6174 = 7641 - ?', options: ['1357', '1467', '1476', '1674'], ans: 1 },
        ],
        why: 'यह 4 अंक की संख्याओं का एक unique fixed point है — mathematical proof 1949 में Kaprekar ने दिया।',
      },
      {
        title: '1089 का जादू',
        difficulty: 'रोचक',
        emoji: '🎯',
        desc: 'हर 3 अंक की संख्या → उलटाओ → घटाओ → उलटाओ → जोड़ो = 1089!',
        steps: [
          { label: 'विधि', text: '1. 3 अंक चुनो (पहला > आखिरी)\n2. उलटाओ → घटाओ\n3. उत्तर उलटाओ → जोड़ो\n= 1089 हमेशा!', type: 'rule' },
          { label: 'उदाहरण 1', text: '753:\n753 - 357 = 396\n396 + 693 = 1089 ✅', type: 'example' },
          { label: 'उदाहरण 2', text: '941:\n941 - 149 = 792\n792 + 297 = 1089 ✅', type: 'example' },
        ],
        quiz: [
          { q: '862 - 268 = 594, 594 + ? = 1089', options: ['494', '495', '594', '694'], ans: 1 },
          { q: '1089 का जादू किस प्रकार की संख्या पर काम करता है?', options: ['2 अंक', '3 अंक', '4 अंक', 'सभी'], ans: 1 },
          { q: '1089 × 9 = ?', options: ['9801', '9811', '9891', '9799'], ans: 0 },
        ],
        why: '1089 एक बहुत ही खास mathematical palindrome है: 1089 × 9 = 9801 (उल्टा!)।',
      },
      {
        title: 'Fibonacci — प्रकृति का नंबर',
        difficulty: 'मध्यम',
        emoji: '🌻',
        desc: '1,1,2,3,5,8,13,21,34... — अगला = पिछले दो का योग। सब जगह दिखता है!',
        steps: [
          { label: 'श्रेणी', text: '1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...\nनियम: F(n) = F(n-1) + F(n-2)', type: 'rule' },
          { label: 'प्रकृति में', text: 'गुलाब: 5 या 8 पंखुड़ियाँ\nसूरजमुखी: 34 या 55 spirals\nनॉटिलस शंख: Golden Spiral\nअनानास: 8 और 13 rows', type: 'example' },
          { label: 'Golden Ratio', text: 'F(n+1)/F(n) → 1.618...\n34/21 ≈ 1.619\n55/34 ≈ 1.617\n= φ (Golden Ratio) ✅', type: 'tip' },
        ],
        quiz: [
          { q: 'Fibonacci में 8वाँ पद (1,1,2,3,5,8...) = ?', options: ['13', '21', '34', '55'], ans: 1 },
          { q: 'Golden Ratio φ ≈ ?', options: ['1.414', '1.618', '1.732', '2.236'], ans: 1 },
          { q: 'सूरजमुखी के बीजों की संख्या क्या होती है?', options: ['Fibonacci संख्या', 'Prime संख्या', 'Perfect square', 'कोई भी'], ans: 0 },
        ],
        why: 'φ = (1+√5)/2 — यह irrational number सबसे "natural" proportion है।',
      },
      {
        title: 'Collatz पहेली (3n+1)',
        difficulty: 'रोचक',
        emoji: '🔮',
        desc: 'कोई भी संख्या लो — कुछ steps में 1 पर पहुँचोगे! (अभी तक सिद्ध नहीं!)',
        steps: [
          { label: 'नियम', text: 'सम है → 2 से भाग\nविषम है → 3 से गुणा + 1\nदोहराओ → 1 आएगा', type: 'rule' },
          { label: 'उदाहरण 1', text: '6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1 ✅', type: 'example' },
          { label: 'उदाहरण 2', text: '27 → 82 → 41 → 124 → ... → 1\n(111 steps!) 🤯', type: 'example' },
        ],
        quiz: [
          { q: 'Collatz पहेली में 5 का अगला step?', options: ['8', '16', '2.5', '15'], ans: 1 },
          { q: 'Collatz पहेली किसने propose की?', options: ['Ramanujan', 'Collatz', 'Fibonacci', 'Euler'], ans: 1 },
          { q: 'Collatz पहेली अभी तक?', options: ['सिद्ध है', 'गलत है', 'सिद्ध नहीं', 'असंभव'], ans: 2 },
        ],
        why: 'यह Unsolved Problem है! $1 Million का इनाम है जो इसे सिद्ध करे।',
      },
    ],
  },
  {
    name: '📐 ज्यामिति ट्रिक्स',
    icon: '📐',
    color: 'from-pink-500 to-rose-600',
    bgLight: 'bg-pink-50 dark:bg-pink-900/20',
    borderColor: 'border-pink-200',
    tricks: [
      {
        title: 'पाइथागोरस त्रिक याद करना',
        difficulty: 'मध्यम',
        emoji: '📏',
        desc: '(3,4,5), (5,12,13), (8,15,17)... ये Pythagorean Triples हैं!',
        steps: [
          { label: 'मूल त्रिक', text: '(3,4,5): 9+16=25 ✅\n(5,12,13): 25+144=169 ✅\n(8,15,17): 64+225=289 ✅\n(7,24,25): 49+576=625 ✅', type: 'rule' },
          { label: 'खोजने की ट्रिक', text: 'विषम n के लिए: n, (n²-1)/2, (n²+1)/2\nn=3: 3, 4, 5 ✅\nn=5: 5, 12, 13 ✅\nn=7: 7, 24, 25 ✅', type: 'example' },
          { label: 'Scaling', text: 'किसी भी त्रिक को k से गुणा करो:\n3,4,5 × 2 = 6,8,10 ✅\n3,4,5 × 3 = 9,12,15 ✅', type: 'tip' },
        ],
        quiz: [
          { q: '(5,12,?) में ? क्या है?', options: ['11', '12', '13', '14'], ans: 2 },
          { q: '(7,24,?) में ? क्या है?', options: ['23', '25', '26', '27'], ans: 1 },
          { q: '(6,8,10) क्या Pythagorean Triple है?', options: ['हाँ (3,4,5×2)', 'नहीं'], ans: 0 },
        ],
        why: 'a²+b²=c² यह Pythagoras theorem है। Triples इस समीकरण के integer solutions हैं।',
      },
      {
        title: 'बहुभुज के कोणों का योग',
        difficulty: 'आसान',
        emoji: '🔷',
        desc: 'n भुजाओं वाले बहुभुज का कोण योग = (n-2) × 180°',
        steps: [
          { label: 'नियम', text: 'आंतरिक कोणों का योग = (n-2) × 180°', type: 'rule' },
          { label: 'उदाहरण', text: 'त्रिभुज (3): (3-2)×180 = 180° ✅\nचतुर्भुज (4): (4-2)×180 = 360° ✅\nपंचभुज (5): (5-2)×180 = 540° ✅\nषट्भुज (6): (6-2)×180 = 720° ✅', type: 'example' },
          { label: 'नियमित बहुभुज', text: 'प्रत्येक कोण = (n-2)×180/n\nनियमित षट्भुज: 4×180/6 = 120° ✅', type: 'tip' },
        ],
        quiz: [
          { q: 'अष्टभुज (8 भुजा) के कोणों का योग?', options: ['900°', '1080°', '1260°', '720°'], ans: 1 },
          { q: 'नियमित षट्भुज का प्रत्येक कोण?', options: ['100°', '110°', '120°', '130°'], ans: 2 },
          { q: 'दशभुज (10 भुजा) के कोण योग?', options: ['1200°', '1440°', '1620°', '1800°'], ans: 1 },
        ],
        why: 'n भुजाओं के बहुभुज को (n-2) त्रिभुजों में बाँटा जा सकता है, हर त्रिभुज में 180°।',
      },
      {
        title: 'वृत्त का क्षेत्रफल याद करना',
        difficulty: 'आसान',
        emoji: '🔵',
        desc: '"पाई आर स्क्वेयर" — π × r² — 7 के साथ आसान!',
        steps: [
          { label: 'नियम', text: 'A = πr²\nπ ≈ 22/7 (जब r 7 का गुणज हो)', type: 'rule' },
          { label: 'Easy Trick', text: 'r=7: A = 22/7 × 49 = 154 cm²\nr=14: A = 22/7 × 196 = 616 cm²\nr=21: A = 22/7 × 441 = 1386 cm²', type: 'example' },
          { label: 'Tip', text: 'π = 22/7 से: r² ÷ 7 × 22\nया π ≈ 3.14 से: r² × 3.14', type: 'tip' },
        ],
        quiz: [
          { q: 'वृत्त का क्षेत्रफल (r=7) = ?', options: ['144', '154', '164', '174'], ans: 1 },
          { q: 'वृत्त की परिधि (r=7) = ?', options: ['42', '44', '46', '48'], ans: 1 },
          { q: 'अर्धवृत्त का क्षेत्रफल (r=14) = ?', options: ['308', '318', '328', '298'], ans: 0 },
        ],
        why: 'π = 3.14159... पर 22/7 ≈ 3.14286 — काफी करीब! और 7 के साथ calculation आसान।',
      },
    ],
  },
];

const amazingFacts = [
  { emoji: '🔢', title: 'शून्य की ताकत', fact: '0 के बिना Computer, Smartphone — कुछ भी नहीं! Binary (0,1) से पूरी Digital दुनिया चलती है।' },
  { emoji: '🌀', title: 'Mandelbrot Set', fact: 'यह एक आकृति है जिसे आप अनंत बार zoom कर सकते हैं, हर बार नई सुंदरता मिलती है। z→z²+c का जादू!' },
  { emoji: '🎲', title: 'ताश की डेक', fact: 'किसी भी shuffled ताश की डेक का क्रम शायद इतिहास में पहले कभी नहीं आया होगा — 52! = 8×10⁶⁷ संभावनाएं!' },
  { emoji: '💎', title: 'Golden Ratio हर जगह', fact: 'φ = 1.618... Mona Lisa, iPhone, Parthenon, DNA — सब में Golden Ratio मिलता है।' },
  { emoji: '🐝', title: 'मधुमक्खी की बुद्धि', fact: 'षट्भुज (Hexagon) सबसे efficient आकृति है — कम मोम, ज़्यादा जगह। मधुमक्खी ने Nature से गणित सीखा!' },
  { emoji: '🎵', title: 'संगीत और गणित', fact: 'हर सुर एक Frequency है। Do=264Hz, Re=297Hz... अनुपात 8:9:10 है — गणितीय Progression!' },
  { emoji: '🔐', title: 'RSA और अभाज्य संख्याएं', fact: 'आपके Bank account की security बड़ी-बड़ी अभाज्य संख्याओं पर आधारित है। 1000+ अंकों की prime numbers!' },
  { emoji: '🌊', title: 'Sin Wave', fact: 'लहरें, ध्वनि, प्रकाश — सब Sine Curve में। 3Blue1Brown के अनुसार sin(x) प्रकृति की भाषा है।' },
  { emoji: '🧬', title: 'DNA और Fibonacci', fact: 'DNA की Double Helix संरचना Fibonacci spiral बनाती है। 10 और 34 angstrom का अनुपात φ है!' },
  { emoji: '🌌', title: 'Euler की Identity', fact: 'eⁱπ + 1 = 0 — "भगवान का समीकरण!" इसमें 5 सबसे महत्वपूर्ण constants: e, i, π, 1, 0 हैं।' },
  { emoji: '♾️', title: 'अनंत के प्रकार', fact: 'अनंत एक नहीं, कई हैं! प्राकृत संख्याएं (ℵ₀) < Real Numbers (c) — Cantor ने सिद्ध किया!'},
  { emoji: '🏛️', title: 'ताजमहल में π', fact: 'ताजमहल की proportions Golden Ratio और π पर आधारित हैं। 17वीं सदी के वास्तुकार गणितज्ञ भी थे!'},
  { emoji: '📡', title: 'GPS और Relativity', fact: 'GPS सटीकता के लिए Einstein की Relativity Theory का गणित चाहिए — प्रति दिन 38 microsecond correction!'},
  { emoji: '🎮', title: 'Video Games', fact: 'हर frame में millions of matrix multiplications होती हैं। 60fps पर खेलते हो — हर second में अरबों calculations!'},
];

function TrickCard({ trick, color, bgLight, borderColor }) {
  const [open, setOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const difficultyColor = trick.difficulty === 'आसान' ? 'bg-green-100 text-green-700' :
    trick.difficulty === 'मध्यम' ? 'bg-yellow-100 text-yellow-700' :
    trick.difficulty === 'कठिन' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700';

  const quizScore = trick.quiz ? trick.quiz.filter((q, i) => quizAnswers[i] === q.ans).length : 0;

  return (
    <motion.div layout className={`bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
      <button onClick={() => setOpen(!open)} className="w-full text-left p-4 min-h-0">
        <div className="flex items-center gap-3">
          <div className={`bg-gradient-to-br ${color} text-white rounded-xl w-12 h-12 flex items-center justify-center text-2xl shrink-0`}>
            {trick.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h3 className="font-heading text-base text-foreground">{trick.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-body font-bold ${difficultyColor}`}>{trick.difficulty}</span>
            </div>
            <p className="text-xs text-muted-foreground font-body">{trick.desc}</p>
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} className="shrink-0">
            <ChevronDown size={20} className="text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className={`border-t px-4 pb-4 pt-3 space-y-3 ${bgLight}`}>
              {/* Steps */}
              {trick.steps.map((step, si) => (
                <div key={si} className={`rounded-xl p-3 ${
                  step.type === 'rule' ? `bg-gradient-to-r ${color} text-white` :
                  step.type === 'tip' ? 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200' :
                  'bg-white dark:bg-card border shadow-sm'
                }`}>
                  <p className="text-xs font-bold font-body mb-1 opacity-80">
                    {step.type === 'rule' ? '📌 ' : step.type === 'tip' ? '💡 ' : '▶ '}{step.label}
                  </p>
                  <pre className="whitespace-pre-wrap font-body text-sm leading-relaxed">{step.text}</pre>
                </div>
              ))}

              {/* Why it works */}
              <div className="bg-white dark:bg-card rounded-xl p-3 border">
                <p className="text-xs font-bold text-primary font-body mb-1">🔬 यह क्यों काम करता है?</p>
                <p className="font-body text-xs text-foreground leading-relaxed">{trick.why}</p>
              </div>

              {/* Quiz */}
              {trick.quiz && (
                <div className="space-y-3 pt-1">
                  <p className="font-heading text-sm text-primary">🧠 खुद आज़माओ:</p>
                  {trick.quiz.map((q, qi) => (
                    <div key={qi} className="bg-white dark:bg-card rounded-xl p-3 border">
                      <p className="font-body font-bold text-sm mb-2">{qi+1}. {q.q}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt, oi) => {
                          let cls = 'border rounded-xl px-3 py-2 text-xs font-body text-left min-h-0 transition-all ';
                          if (quizSubmitted) {
                            if (oi === q.ans) cls += 'bg-green-100 border-green-400 text-green-800';
                            else if (quizAnswers[qi] === oi) cls += 'bg-red-100 border-red-400 text-red-800';
                            else cls += 'bg-card opacity-50';
                          } else {
                            cls += quizAnswers[qi] === oi ? 'bg-primary/10 border-primary font-bold' : 'bg-card hover:border-primary cursor-pointer';
                          }
                          return (
                            <button key={oi} className={cls} onClick={() => !quizSubmitted && setQuizAnswers(a => ({...a, [qi]: oi}))}>
                              {quizSubmitted && oi === q.ans && '✅ '}
                              {quizSubmitted && quizAnswers[qi] === oi && oi !== q.ans && '❌ '}
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {!quizSubmitted ? (
                    <button onClick={() => setQuizSubmitted(true)} disabled={Object.keys(quizAnswers).length < trick.quiz.length}
                      className="bg-primary text-primary-foreground px-5 py-2 rounded-xl font-body font-bold text-sm disabled:opacity-40 min-h-0">
                      जाँचो →
                    </button>
                  ) : (
                    <div className={`rounded-xl p-3 font-body font-bold text-sm ${quizScore === trick.quiz.length ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {quizScore === trick.quiz.length ? '🏆 शाबाश! सभी सही!' : `✅ ${quizScore}/${trick.quiz.length} सही!`}
                      <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }} className="ml-3 underline text-xs font-normal min-h-0 min-w-0">फिर से</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MathTricks() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [...trickCategories.map(c => ({ name: c.name, icon: c.icon })), { name: '🌟 रोचक तथ्य', icon: '🌟' }];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <motion.div className="text-5xl mb-3" animate={{ rotate: [0, -10, 10, -5, 0] }} transition={{ duration: 1, delay: 0.5 }}>🎩</motion.div>
        <h1 className="font-heading text-3xl md:text-4xl mb-2">गणित की जादुई ट्रिक्स</h1>
        <p className="text-muted-foreground font-body mb-4">तेज़ गणना + रोचक पैटर्न + अद्भुत तथ्य — हर ट्रिक में मज़ा है!</p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {[
            `${trickCategories.reduce((a,c) => a + c.tricks.length, 0)}+ ट्रिक्स`, 
            `${amazingFacts.length} तथ्य`, // यहाँ सिंगल कोट की जगह बैक टिक (`) लगाया गया है
            'इंटरेक्टिव क्विज़', 
            'उदाहरण सहित'
          ].map((s, i) => (
            <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full font-body font-bold text-xs">{s}</span>
          ))}
        </div>
      </motion.div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {tabs.map((tab, i) => (
          <motion.button key={i} onClick={() => setActiveTab(i)} whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-2xl font-body font-bold text-sm transition-all min-h-0 ${
              activeTab === i ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card border hover:border-primary'
            }`}>
            {tab.name}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {activeTab < trickCategories.length ? (
            <div className="space-y-3">
              <div className={`bg-gradient-to-r ${trickCategories[activeTab].color} text-white rounded-2xl p-4 mb-4`}>
                <h2 className="font-heading text-xl">{trickCategories[activeTab].name}</h2>
                <p className="text-sm opacity-80 font-body">{trickCategories[activeTab].tricks.length} ट्रिक्स — क्लिक करके विस्तार से देखें</p>
              </div>
              {trickCategories[activeTab].tricks.map((trick, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <TrickCard trick={trick} color={trickCategories[activeTab].color}
                    bgLight={trickCategories[activeTab].bgLight} borderColor={trickCategories[activeTab].borderColor} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {amazingFacts.map((fact, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl shrink-0">{fact.emoji}</span>
                    <div>
                      <h3 className="font-heading text-sm text-foreground mb-1">{fact.title}</h3>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{fact.fact}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
