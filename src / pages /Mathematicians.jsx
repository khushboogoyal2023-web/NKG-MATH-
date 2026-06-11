import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, BookOpen, Star, Lightbulb, Users } from 'lucide-react';

const mathematicians = [
  {
    name: 'श्रीनिवास रामानुजन',
    years: '1887–1920',
    country: '🇮🇳 भारत (तमिलनाडु)',
    emoji: '🔢',
    color: 'from-orange-400 to-red-500',
    bg: 'bg-orange-50 dark:bg-orange-950/20',
    title: 'संख्या सिद्धांत के जादूगर',
    born: '22 दिसंबर 1887, इरोड, तमिलनाडु',
    died: '26 अप्रैल 1920, कुंभकोणम (मात्र 32 वर्ष)',
    education: 'कोई औपचारिक उच्च शिक्षा नहीं — स्वयं अध्ययन',
    about: `रामानुजन एक ऐसे महान गणितज्ञ थे जिन्होंने बिना किसी औपचारिक प्रशिक्षण के गणित में क्रांति ला दी। तमिलनाडु के एक साधारण परिवार में जन्मे रामानुजन बचपन से ही असाधारण थे। स्कूल में वे अन्य विषयों में औसत थे, पर गणित में अद्वितीय। 
    
    उन्होंने S.L. Loney की Trigonometry की किताब 13 साल में पूरी पढ़ी और खुद प्रमेय बनाने लगे। 16 साल में George Shoobridge Carr की "Synopsis of Pure Mathematics" पढ़ी जिसने उनका जीवन बदल दिया।
    
    घर की आर्थिक स्थिति खराब होने के कारण वे Madras Port Trust में क्लर्क का काम करते रहे और रात को गणित। 1913 में उन्होंने Cambridge के Professor G.H. Hardy को एक पत्र लिखा जिसमें 120 प्रमेय थे। Hardy ने कहा — "ये सूत्र इतने असाधारण हैं कि कोई साधारण इंसान इन्हें बना ही नहीं सकता।"
    
    Cambridge आकर उन्होंने Hardy के साथ मिलकर क्रांतिकारी काम किया। पर ब्रिटेन की ठंड और खाने की दिक्कत से उनका स्वास्थ्य बिगड़ता गया। 1920 में मात्र 32 साल की उम्र में उनका निधन हो गया।`,
    contributions: [
      { title: 'Hardy-Ramanujan संख्या 1729', detail: '1729 = 12³ + 1³ = 10³ + 9³ — दो तरह से दो घनों का योग। यह "टैक्सीकैब संख्या" है। Hardy एक टैक्सी में आए थे जिसका नंबर 1729 था।' },
      { title: 'π के लिए अनंत श्रेणी', detail: '1/π = (2√2/9801) × Σ (4n)!(1103+26390n) / (n!)⁴ × 396⁴ⁿ — यह आज कंप्यूटर में π की गणना के लिए उपयोग होती है!' },
      { title: 'रामानुजन Prime (Ramanujan Primes)', detail: 'Rₙ = वह न्यूनतम अभाज्य संख्या जिससे π(x) - π(x/2) ≥ n। R₁=2, R₂=11, R₃=17...' },
      { title: 'Mock Theta Functions', detail: 'अपनी मृत्युशैया पर लिखे अंतिम पत्र में उन्होंने Mock Theta Functions दिए जो 80 साल बाद String Theory में काम आए!' },
      { title: 'Landau-Ramanujan Theorem', detail: 'किसी संख्या को x तक के दो वर्गों के योग के रूप में लिखने की संख्याओं का वितरण।' },
    ],
    quotes: ['"An equation means nothing to me unless it expresses a thought of God." — Ramanujan', '"गणित में मेरी सोच देवी नामगिरि से आती है।"'],
    legacy: 'रामानुजन की नोटबुक में ऐसे हज़ारों सूत्र हैं जो आज भी गणितज्ञ सिद्ध कर रहे हैं। भारत में 22 दिसंबर "राष्ट्रीय गणित दिवस" के रूप में मनाया जाता है। फिल्म "The Man Who Knew Infinity" (2015) उनके जीवन पर बनी है।',
    funFacts: ['रामानुजन को सपने में देवी नामगिरि सूत्र बताती थीं!', '3900+ प्रमेय जिनमें से अधिकतर सही निकले।', 'Cambridge में Fellow बनने वाले पहले भारतीय।', 'Hardy ने कहा — "रामानुजन जैसी प्रतिभा सदी में एक बार जन्म लेती है।"'],
  },
  {
    name: 'आर्यभट्ट',
    years: '476–550 ई.',
    country: '🇮🇳 भारत (पाटलिपुत्र)',
    emoji: '🌙',
    color: 'from-purple-500 to-indigo-600',
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    title: 'भारतीय गणित और खगोलशास्त्र के जनक',
    born: '476 ई., कुसुमपुर (आधुनिक पटना)',
    died: 'लगभग 550 ई.',
    education: 'पाटलिपुत्र के महान विश्वविद्यालय में अध्ययन',
    about: `आर्यभट्ट भारत के सबसे महान गणितज्ञ-खगोलशास्त्री थे। उन्होंने मात्र 23 साल की उम्र में "आर्यभट्टीयम" ग्रंथ लिखा जिसमें गणित और खगोलशास्त्र के 121 श्लोक हैं।

    उनकी सबसे बड़ी देन शून्य (0) की अवधारणा थी। हालांकि शून्य का चिह्न ब्रह्मगुप्त ने दिया, पर स्थान-मान प्रणाली (Place Value System) में शून्य की भूमिका आर्यभट्ट ने स्पष्ट की।

    उन्होंने बताया कि पृथ्वी गोल है और अपनी धुरी पर घूमती है — यह बात यूरोप में 1000 साल बाद Copernicus ने 1543 में बताई! उन्होंने चंद्रग्रहण और सूर्यग्रहण का वैज्ञानिक कारण — पृथ्वी और चंद्रमा की छाया — बताया।`,
    contributions: [
      { title: 'π का सटीक मान', detail: 'आर्यभट्ट ने π = 62832/20000 = 3.1416 दिया। उन्होंने लिखा "यह अनुमानित है" — वे पहले व्यक्ति थे जिन्होंने π को अपरिमेय माना।' },
      { title: 'त्रिकोणमिति (Trigonometry)', detail: 'Sine (ज्या) और Cosine (कोज्या) की तालिकाएं बनाईं जो 3.75° के अंतर पर थीं। आधुनिक Sine Table का आधार।' },
      { title: 'बीजगणित के सूत्र', detail: '1² + 2² + ... + n² = n(n+1)(2n+1)/6 और 1³ + 2³ + ... + n³ = [n(n+1)/2]² — ये सूत्र आज भी पढ़ाए जाते हैं।' },
      { title: 'खगोलीय गणनाएं', detail: 'एक वर्ष = 365 दिन 6 घंटे 12 मिनट 30 सेकंड (वास्तविक: 365d 5h 48m 46s) — मात्र 3 मिनट की गलती 1500 साल पहले!' },
      { title: 'पृथ्वी की परिधि', detail: 'पृथ्वी की परिधि ≈ 39,968 km बताई। वास्तविक = 40,075 km। मात्र 0.26% की गलती!' },
    ],
    quotes: ['"आकाश में चंद्रमा की चाल से पृथ्वी की गति को मैं जानता हूँ।" — आर्यभट्टीयम'],
    legacy: 'भारत का पहला उपग्रह "आर्यभट्ट" (1975) उन्हीं के नाम पर है। चंद्रमा पर एक क्रेटर का नाम "Aryabhata" है। ISRO का ध्येय वाक्य उनसे प्रेरित है।',
    funFacts: ['23 साल में 121 श्लोकों में पूरा गणित-खगोल लिखा!', 'Copernicus से 1000 साल पहले बताया कि पृथ्वी घूमती है।', 'बिना दूरबीन के ग्रहों की स्थिति की गणना की।', 'उनके नाम पर Aryabhata Research Institute of Observational Sciences (ARIES) है।'],
  },
  {
    name: 'ब्रह्मगुप्त',
    years: '598–668 ई.',
    country: '🇮🇳 भारत (राजस्थान)',
    emoji: '⭕',
    color: 'from-blue-500 to-cyan-600',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    title: 'शून्य और ऋणात्मक संख्याओं के महान नियामक',
    born: '598 ई., भिलमाल (आधुनिक राजस्थान)',
    died: '668 ई.',
    education: 'उज्जैन वेधशाला में अध्ययन',
    about: `ब्रह्मगुप्त "ब्रह्मस्फुटसिद्धांत" (628 ई.) के रचयिता हैं जो गणित के इतिहास में मील का पत्थर है। उन्होंने शून्य को पूर्ण संख्या के रूप में परिभाषित किया और उसके नियम बनाए।

    उन्होंने ऋणात्मक संख्याओं को "ऋण" (debt) के रूप में समझाया — यह अत्यंत क्रांतिकारी था। यूरोप में 17वीं सदी तक ऋणात्मक संख्याओं को "बेकार" माना जाता था!

    उन्होंने चक्रीय चतुर्भुज (Cyclic Quadrilateral) का क्षेत्रफल सूत्र दिया जो आज "ब्रह्मगुप्त का सूत्र" कहलाता है। उन्होंने द्विघात समीकरणों के हल की विधि भी दी।`,
    contributions: [
      { title: 'शून्य के नियम', detail: 'a + 0 = a, a - 0 = a, a × 0 = 0, 0 × 0 = 0। पर उन्होंने 0/0 = 0 कहा जो गलत था — यह गलती बाद में सुधरी।' },
      { title: 'ऋणात्मक संख्याओं के नियम', detail: '(-) × (-) = (+), (-) × (+) = (-), (+) + (-) = अंतर। यह नियम 1000 साल पहले!' },
      { title: 'ब्रह्मगुप्त का चतुर्भुज सूत्र', detail: 'A = √[(s-a)(s-b)(s-c)(s-d)] जहाँ s = अर्ध-परिमाप। यह चक्रीय चतुर्भुज के लिए है। हीरोन के सूत्र का विस्तार!' },
      { title: 'पेल समीकरण', detail: 'Nx² + 1 = y² के पूर्णांक हल खोजने की "Chakravala" विधि। यूरोप में यह विधि 1000 साल बाद Euler ने खोजी।' },
      { title: 'द्विघात समीकरण', detail: 'ax² + bx = c का हल: x = (-b ± √(4ac+b²)) / 2a — आधुनिक quadratic formula का पूर्वज!' },
    ],
    quotes: ['"एक ऋण और एक ऋण का योग ऋण है। एक धन और एक धन का योग धन है।" — ब्रह्मस्फुटसिद्धांत'],
    legacy: 'अरब गणितज्ञों ने उनका ग्रंथ अनुवाद करके यूरोप तक पहुंचाया। यही से "अल्जेब्रा" का विकास हुआ। चंद्रमा पर Brahmagupta क्रेटर है।',
    funFacts: ['0/0 को 0 बताया — एकमात्र गलती जो उन्होंने की।', 'Pell समीकरण का हल यूरोप से 1000 साल पहले दिया।', '30 साल की उम्र में ब्रह्मस्फुटसिद्धांत लिखा।'],
  },
  {
    name: 'भास्कराचार्य (भास्कर II)',
    years: '1114–1185 ई.',
    country: '🇮🇳 भारत (महाराष्ट्र)',
    emoji: '📚',
    color: 'from-teal-500 to-green-600',
    bg: 'bg-teal-50 dark:bg-teal-950/20',
    title: 'लीलावती के रचयिता — भारतीय गणित का शिखर',
    born: '1114 ई., बीजापुर (कर्नाटक/महाराष्ट्र सीमा)',
    died: '1185 ई.',
    education: 'उज्जैन वेधशाला के प्रमुख',
    about: `भास्कराचार्य मध्यकालीन भारत के सर्वश्रेष्ठ गणितज्ञ थे। उनकी "सिद्धांत-शिरोमणि" (1150 ई.) चार भागों में है: लीलावती (अंकगणित), बीजगणित, गोलाध्याय, और ग्रहगणित।

    "लीलावती" में उन्होंने गणित को कहानी और कविता के रूप में लिखा। एक किंवदंती है कि लीलावती उनकी बेटी थी जिसकी कुंडली में विधवा होने का योग था। भास्कर ने उसे एक कलश में पानी भरने का काम दिया ताकि उसका विवाह का समय टल जाए। पर एक मोती कलश में गिर गया और समय निकल गया। तब भास्कर ने कहा — "लीलावती, तुम्हारा नाम इस ग्रंथ में अमर रहेगा।"

    उन्होंने "चक्रवाल विधि" से Pell समीकरण का हल दिया। और गुरुत्वाकर्षण का संकेत न्यूटन से 500 साल पहले दिया।`,
    contributions: [
      { title: 'लीलावती — पहली गणित पाठ्यपुस्तक', detail: 'अंकगणित, बीजगणित, क्षेत्रफल, आयतन सब कविता में। "अरे सुंदर लीलावती, अब बताओ — पाँच कमल फूल थे, तीन भंवरों ने ले लिए, बाकी कितने?" — इस शैली में गणित।' },
      { title: 'चक्रवाल विधि', detail: 'Nx² + 1 = y² के हल की सबसे सुंदर विधि। 61x² + 1 = y² का हल: x=226153980, y=1766319049!' },
      { title: 'गुरुत्वाकर्षण का संकेत', detail: '"पृथ्वी में सब चीज़ों को खींचने की शक्ति है।" — न्यूटन से 500 साल पहले 1150 में लिखा।' },
      { title: 'Calculus का पूर्वाभास', detail: 'dy/dx जैसी अवधारणा — "तात्कालिक वेग" का विचार। Leibniz और Newton से 500 साल पहले।' },
      { title: 'खगोलीय गणनाएं', detail: 'पृथ्वी का व्यास, ग्रहों की कक्षा, चंद्र-सूर्य ग्रहण की विधि — आश्चर्यजनक सटीकता।' },
    ],
    quotes: ['"जैसे एक दीपक अंधेरे को दूर करता है, वैसे गणित अज्ञान को।" — भास्कराचार्य'],
    legacy: '"लीलावती" का फ़ारसी, अरबी और यूरोपीय भाषाओं में अनुवाद हुआ। उज्जैन में Jai Singh Observatory उनकी परंपरा पर बनी। BHASKARACHARYA Pratishthana, Pune उनके नाम पर है।',
    funFacts: ['लीलावती को "भारतीय गणित की Mona Lisa" कहा जाता है।', 'न्यूटन से 500 साल पहले गुरुत्वाकर्षण का संकेत।', '61x²+1=y² का हल निकाला जो यूरोप के लिए 700 साल बाद संभव हुआ।'],
  },
  {
    name: 'यूक्लिड',
    years: '300 ई.पू.',
    country: '🇬🇷 ग्रीस (अलेक्जेंड्रिया)',
    emoji: '📐',
    color: 'from-yellow-400 to-amber-500',
    bg: 'bg-yellow-50 dark:bg-yellow-950/20',
    title: 'ज्यामिति के पिता — 2300 साल का विज्ञान',
    born: 'लगभग 325 ई.पू.',
    died: 'लगभग 265 ई.पू.',
    education: 'प्लेटो की अकादमी में अध्ययन, अलेक्जेंड्रिया में शिक्षण',
    about: `यूक्लिड अलेक्जेंड्रिया के महान पुस्तकालय में पढ़ाते थे। उनकी "एलिमेंट्स" (Elements) 13 खंडों में है और Bible के बाद दूसरी सबसे ज्यादा छपी किताब मानी जाती है।

    उन्होंने ज्यामिति को 5 अभिगृहीतों (Axioms) और 5 अनुमानों (Postulates) पर खड़ा किया। उनकी विधि — "Proof by Logic" — आज भी गणित की नींव है।

    जब राजा टॉलेमी ने पूछा "ज्यामिति का आसान रास्ता क्या है?" तो यूक्लिड ने कहा — "राजसी मार्ग जैसा ज्यामिति में कोई मार्ग नहीं है।"`,
    contributions: [
      { title: 'Elements — 13 खंडों का महाग्रंथ', detail: '465 प्रमेय, 5 अभिगृहीत से शुरू। खंड 1-6: समतल ज्यामिति। खंड 7-10: संख्या सिद्धांत। खंड 11-13: त्रिआयामी ज्यामिति।' },
      { title: 'अभाज्य संख्याओं की अनंतता', detail: 'सिद्ध किया: अभाज्य संख्याएं अनंत हैं। यह प्रमाण इतना सुंदर है कि 2300 साल बाद भी वही उपयोग होता है।' },
      { title: 'यूक्लिड का एल्गोरिदम', detail: 'HCF निकालने की विधि: HCF(a,b) = HCF(b, a mod b)। यह दुनिया का पहला एल्गोरिदम है! आज Computer Science में उपयोग।' },
      { title: '5वाँ Postulate — Parallel Postulate', detail: 'यह Postulate 2000 साल तक "अप्राकृतिक" लगती रही। इसे बदलने से Non-Euclidean Geometry बनी जो Einstein की Theory of Relativity का आधार है।' },
      { title: 'गणितीय Proof की विधि', detail: 'Axioms → Definitions → Theorems की श्रृंखला। यह आज भी गणित की मानक विधि है।' },
    ],
    quotes: ['"There is no royal road to geometry." — Euclid (जब राजा ने आसान रास्ता माँगा)'],
    legacy: 'Elements का अरबी, लातिनी, हिंदी में अनुवाद हुआ। Newton ने Principia Elements की शैली में लिखी। चंद्रमा पर Euclides क्रेटर है।',
    funFacts: ['Bible के बाद सबसे ज्यादा छपी किताब — Elements!', '2300 साल तक ज्यामिति का पाठ्यक्रम Elements ही था।', 'राजा को "कोई शॉर्टकट नहीं" बताने की हिम्मत!', 'उनके जन्म और मृत्यु के बारे में लगभग कुछ नहीं पता।'],
  },
  {
    name: 'पाइथागोरस',
    years: '570–495 ई.पू.',
    country: '🇬🇷 ग्रीस (सामोस)',
    emoji: '🔺',
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-50 dark:bg-pink-950/20',
    title: 'पाइथागोरस प्रमेय के खोजकर्ता — संख्याओं के दार्शनिक',
    born: '570 ई.पू., सामोस द्वीप',
    died: '495 ई.पू., मेटापोंटम',
    education: 'मिस्र और बेबीलोन में अध्ययन, क्रोटन में Pythagorean Brotherhood',
    about: `पाइथागोरस केवल गणितज्ञ नहीं, बल्कि एक दार्शनिक और धार्मिक नेता थे। उन्होंने "Pythagorean Brotherhood" बनाई जहाँ गणित, संगीत और दर्शन एक साथ पढ़ाया जाता था।

    का मानना था: "सब कुछ संख्या है।" वे Vegetarian थे और फलियाँ नहीं खाते थे! उनकी Brotherhood में महिलाएं भी शामिल थीं — जो उस युग में असामान्य था।

    पाइथागोरस का प्रमेय (a² + b² = c²) वास्तव में बेबीलोन और भारत में पहले से जाना जाता था (बौधायन सूत्र में)। पर इसे mathematical proof के साथ देने का श्रेय पाइथागोरस को जाता है।`,
    contributions: [
      { title: 'पाइथागोरस प्रमेय', detail: 'a² + b² = c² — समकोण त्रिभुज में कर्ण का वर्ग = अन्य दो भुजाओं के वर्गों का योग। इसके 370+ अलग-अलग प्रमाण खोजे गए हैं! यहाँ तक कि अमेरिकी राष्ट्रपति Garfield ने भी एक proof दिया।' },
      { title: 'संगीत और गणित', detail: 'तार की लंबाई 1:2 हो → एक Octave। 2:3 → Perfect Fifth। 3:4 → Perfect Fourth। संगीत के सुर गणितीय अनुपात पर हैं!' },
      { title: 'अपरीमेय संख्याओं की खोज', detail: '√2 अपरिमेय है — यह उनकी Brotherhood में ही खोजा गया। किंवदंती है कि इसे खोजने वाले Hippasus को समुद्र में फेंक दिया गया!' },
      { title: 'पाइथागोरस त्रिक', detail: '(3,4,5), (5,12,13), (8,15,17), (7,24,25)... ऐसे अनंत त्रिक हैं। Formula: (m²-n², 2mn, m²+n²)' },
    ],
    quotes: ['"Number is the ruler of forms and ideas." — Pythagoras', '"संख्या ब्रह्मांड का शासक है।"'],
    legacy: 'पाइथागोरस प्रमेय दुनिया की सबसे प्रसिद्ध गणितीय खोज है। Architecture, Engineering, GPS सब में उपयोग। चंद्रमा पर Pythagoras क्रेटर।',
    funFacts: ['फलियाँ नहीं खाते थे — किसी भी कीमत पर!', '√2 को छुपाने की कोशिश की Brotherhood ने।', 'संगीत में do-re-mi का गणितीय आधार उन्होंने दिया।', 'पाइथागोरस का कोई लेखन नहीं बचा — सब शिष्यों ने लिखा।'],
  },
  {
    name: 'आर्किमिडीज़',
    years: '287–212 ई.पू.',
    country: '🇬🇷 ग्रीस (सिराक्यूज़, सिसिली)',
    emoji: '⚖️',
    color: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50 dark:bg-green-950/20',
    title: 'प्राचीन विश्व के सबसे महान वैज्ञानिक-गणितज्ञ',
    born: '287 ई.पू., सिराक्यूज़',
    died: '212 ई.पू., एक रोमन सैनिक ने मार डाला',
    education: 'अलेक्जेंड्रिया में यूक्लिड के शिष्यों से शिक्षा',
    about: `आर्किमिडीज़ को प्राचीन काल का सबसे महान वैज्ञानिक माना जाता है। वे गणितज्ञ, भौतिकशास्त्री और इंजीनियर तीनों थे।

    जब रोमन सेना ने सिराक्यूज़ पर हमला किया, आर्किमिडीज़ ने ऐसे-ऐसे युद्ध यंत्र बनाए कि रोमन जनरल मार्केलस ने कहा — "हम किसी इंसान से नहीं, देवता के विरुद्ध लड़ रहे हैं।"

    "यूरेका!" — वे नहाते हुए पानी के बाहर निकलते देखकर उत्प्लावन बल (Buoyancy) का नियम समझ गए और नंगे ही सड़क पर दौड़े!

    जब रोमन सैनिक उनके घर में घुसा, आर्किमिडीज़ रेत में ज्यामिति बना रहे थे। उन्होंने कहा — "मेरे रेखाचित्र खराब मत करो।" सैनिक ने उन्हें मार दिया।`,
    contributions: [
      { title: 'π का मान (22/7 और बेहतर)', detail: 'π < 22/7 और π > 223/71। उन्होंने 96 भुजाओं वाले बहुभुज से π निकाला: 3.1408 < π < 3.1429। 2200 साल बाद भी हम 22/7 उपयोग करते हैं।' },
      { title: 'उत्प्लावन बल (Archimedes Principle)', detail: 'कोई वस्तु द्रव में रखने पर जितने द्रव को हटाती है, उतने का भार ऊपर की ओर लगता है। जहाज़ तैरते हैं इसीलिए।' },
      { title: 'लीवर का नियम', detail: '"मुझे एक अचल बिंदु दो और मैं पृथ्वी को हिला दूंगा।" — F₁d₁ = F₂d₂' },
      { title: 'गोले और बेलन का संबंध', detail: 'गोले का आयतन = 2/3 × बेलन का आयतन (जब गोला बेलन के अंदर हो)। वे इस खोज को इतना पसंद करते थे कि कब्र पर बनवाया।' },
      { title: 'Archimedes Screw', detail: 'पानी नीचे से ऊपर ले जाने की पेचदार मशीन — आज भी उपयोग होती है।' },
    ],
    quotes: ['"Give me a place to stand and I will move the Earth." — Archimedes'],
    legacy: 'NASA के Archimedes crater पर नाम। उत्प्लावन बल के बिना न जहाज़, न पनडुब्बी। उनकी "Method of Exhaustion" Calculus का पूर्वज है।',
    funFacts: ['रोमन सेना को उनके यंत्रों से 3 साल तक रोका।', '"यूरेका!" — नंगे दौड़े सड़क पर।', 'अपनी कब्र पर गोले-बेलन का चित्र बनवाया।', '212 ई.पू. में मृत्यु — ज्यामिति बनाते हुए।'],
  },
  {
    name: 'आइज़ैक न्यूटन',
    years: '1643–1727',
    country: '🇬🇧 इंग्लैंड',
    emoji: '🍎',
    color: 'from-red-400 to-rose-500',
    bg: 'bg-red-50 dark:bg-red-950/20',
    title: 'गुरुत्वाकर्षण और कलन के खोजकर्ता',
    born: '4 जनवरी 1643, Woolsthorpe, Lincolnshire',
    died: '31 मार्च 1727, London',
    education: 'Cambridge University, Trinity College',
    about: `न्यूटन को इतिहास का सबसे महान वैज्ञानिक माना जाता है। जब 1665-66 में Cambridge में Plague (महामारी) आई, न्यूटन घर चले गए। उन 18 महीनों में उन्होंने — Calculus खोजा, गुरुत्वाकर्षण का नियम दिया, और प्रकाश के रंगों की खोज की। इसे "Annus Mirabilis" (अद्भुत वर्ष) कहते हैं।

    "सेब गिरने" की कहानी — न्यूटन ने खुद बताई। पर उन्होंने यह नहीं पूछा "सेब क्यों गिरा?" बल्कि "चंद्रमा क्यों नहीं गिरता?" — यही सोच बदल गई।

    उनके Principia Mathematica (1687) को "सबसे महत्वपूर्ण वैज्ञानिक पुस्तक" माना जाता है। एक बार Einstein से पूछा गया "आप खुद को Newton से कैसे तुलना करते हैं?" तो उन्होंने कहा — "Newton के काम के सामने मैं स्कूली छात्र हूँ।"`,
    contributions: [
      { title: 'Calculus (अवकल और समाकल)', detail: 'dy/dx (derivative) और ∫ (integral) की खोज। Leibniz ने स्वतंत्र रूप से उसी समय खोजा। Modern physics, engineering सब Calculus पर।' },
      { title: 'गुरुत्वाकर्षण का नियम', detail: 'F = Gm₁m₂/r² — सेब भी इसी नियम से गिरता है और चंद्रमा भी इसी से घूमता है। Universal Law!' },
      { title: 'गति के तीन नियम', detail: '1. जड़ता का नियम 2. F = ma 3. क्रिया-प्रतिक्रिया। Rocket science इन्हीं पर है।' },
      { title: 'प्रकाश का विश्लेषण', detail: 'Prism से सफेद प्रकाश को 7 रंगों में तोड़ा। "Newton\'s Rings" interference का नियम।' },
      { title: 'Binomial Theorem', detail: '(a+b)ⁿ = Σ C(n,r)aⁿ⁻ʳbʳ — यह सूत्र आज भी कक्षा 11-12 में पढ़ाया जाता है।' },
    ],
    quotes: ['"If I have seen further, it is by standing on the shoulders of giants." — Newton'],
    legacy: 'GPS, rockets, satellites सब Newton के नियमों पर। Pound note पर उनका चित्र था। Moon पर Newton crater।',
    funFacts: ['सेब नहीं गिरा था — वे बगीचे में बैठे थे, सेब किनारे गिरा।', '18 महीने में Calculus, Gravity, Optics — three क्रांतियाँ।', 'अपने Calculus को 20 साल छुपाए रखा।', 'Parliament Member भी रहे।', 'Mint का निदेशक बनकर नकली सिक्के बनाने वालों को पकड़ा।'],
  },
  {
    name: 'लियोनहार्ड यूलर',
    years: '1707–1783',
    country: '🇨🇭 स्विट्ज़रलैंड',
    emoji: 'e',
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50 dark:bg-sky-950/20',
    title: 'इतिहास के सर्वाधिक उत्पादक गणितज्ञ',
    born: '15 अप्रैल 1707, Basel, Switzerland',
    died: '18 सितंबर 1783, St. Petersburg, Russia',
    education: 'Basel University में Johann Bernoulli के शिष्य',
    about: `यूलर इतिहास के सबसे उत्पादक गणितज्ञ थे। उन्होंने 500+ पुस्तकें और पत्र लिखे जो आज भी 74 volumes में हैं।

    1735 में एक आँख की रोशनी गई, 1771 में दूसरी भी गई — पर उन्होंने लिखना बंद नहीं किया! अंधे होने के बाद उन्होंने और तेज़ी से गणित किया — याददाश्त और मानसिक गणना से!

    Euler's Identity: eⁱπ + 1 = 0 को "Mathematics का सबसे सुंदर समीकरण" कहा जाता है। इसमें पाँच महत्वपूर्ण स्थिरांक हैं: e, i, π, 1, 0।

    Königsberg Bridge Problem — सात पुलों को एक बार पार करके वापस आना क्या संभव है? यूलर ने सिद्ध किया यह असंभव है। और इसी से Graph Theory का जन्म हुआ — जो आज Facebook, Maps, Internet का आधार है!`,
    contributions: [
      { title: 'Euler\'s Identity: eⁱπ + 1 = 0', detail: '"Mathematics का सबसे सुंदर समीकरण।" Richard Feynman ने कहा यह "Jewel of Mathematics" है। e = 2.718..., i = √-1, π = 3.14159...' },
      { title: 'गणितीय संकेत', detail: 'e (natural base), i (imaginary unit), Σ (summation), f(x) (function notation), π (pi) — ये सब Euler ने दिए!' },
      { title: 'Euler\'s Formula', detail: 'eⁱθ = cos θ + i sin θ — जटिल संख्याओं और trigonometry का अद्भुत संबंध। Electrical engineering, quantum physics में हर जगह।' },
      { title: 'Graph Theory', detail: 'Königsberg Bridge Problem से Graph Theory की नींव। आज Internet routing, social networks, GPS — सब Graph Theory।' },
      { title: 'Euler\'s Totient Function φ(n)', detail: 'n से छोटी और n के साथ coprime संख्याओं की गिनती। RSA Encryption (banking security) की नींव।' },
    ],
    quotes: ['"Madam, I have come from a country where people are hanged if they talk politics." — Euler (जब Russian court में invited थे)'],
    legacy: 'गणित के लगभग हर क्षेत्र में Euler का नाम है: Euler Line, Euler Number, Euler Angles, Euler Circuit। विज्ञान में e = 2.718... को "Euler\'s number" कहते हैं।',
    funFacts: ['अंधे होने के बाद भी 400+ papers लिखे।', 'Euler के 13 बच्चे थे।', 'Russian Empress Catherine से मित्रता।', 'एक दिन में कई papers लिखते थे।'],
  },
  {
    name: 'कार्ल फ्रेडरिक गॉस',
    years: '1777–1855',
    country: '🇩🇪 जर्मनी (Brunswick)',
    emoji: '🌟',
    color: 'from-amber-400 to-yellow-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    title: 'गणित के राजकुमार — गणित का राजा',
    born: '30 अप्रैल 1777, Brunswick, Germany',
    died: '23 फरवरी 1855, Göttingen',
    education: 'Brunswick Collegium Carolinum, Göttingen University',
    about: `गॉस को "Princeps Mathematicorum" (गणित के राजकुमार) कहा जाता है। बचपन से ही उनकी प्रतिभा असाधारण थी।

    10 साल की उम्र में Teacher ने क्लास को 1 से 100 तक जोड़ने को कहा — सोचा था घंटे भर लगेंगे। गॉस ने 2 सेकंड में slate पर 5050 लिखकर रख दिया! Formula: n(n+1)/2 = 100×101/2 = 5050।

    गॉस इतने perfectionist थे कि वे बहुत कम publish करते थे। उनकी diary में ऐसी खोजें थीं जो 50 साल बाद दूसरों ने "discover" कीं! अगर गॉस सब publish करते तो गणित 50 साल आगे होता।

    उन्होंने 17 साल में 17-भुजा वाला नियमित बहुभुज (Heptadecagon) compass और ruler से खींचा — जो 2000 साल में किसी ने नहीं किया था। तब उन्होंने निश्चय किया — गणितज्ञ बनूंगा।`,
    contributions: [
      { title: 'Gaussian Distribution (Bell Curve)', detail: 'Normal Distribution: f(x) = (1/σ√2π)e^(-(x-μ)²/2σ²)। Statistics की आत्मा। Height, weight, IQ, test scores सब Bell Curve पर।' },
      { title: 'Gauss\'s Theorema Egregium', detail: '"आश्चर्यजनक प्रमेय": कागज़ को मोड़ने पर उसकी Gaussian Curvature नहीं बदलती। Differential Geometry की नींव।' },
      { title: '1+2+3+...+n सूत्र', detail: 'n(n+1)/2 — 10 साल में खोजा। आज Class 10 में पढ़ाया जाता है।' },
      { title: 'Prime Number Theorem', detail: 'x तक अभाज्य संख्याओं की गिनती ≈ x/ln(x)। Number Theory की आधारशिला।' },
      { title: 'Magnetism और Electricity', detail: 'Gauss\'s Law: किसी बंद सतह से गुज़रने वाला Electric Flux = अंदर का charge / ε₀। Maxwell\'s equations का आधार।' },
    ],
    quotes: ['"Mathematics is the queen of the sciences and number theory is the queen of mathematics." — Gauss'],
    legacy: 'SI unit of magnetic field "Gauss" है। Göttingen में Gauss की मूर्ति। Gauss-Bonnet theorem topology में। आधुनिक statistics गॉस के बिना अधूरी।',
    funFacts: ['10 साल में 1-100 का योग 2 सेकंड में।', '17 साल में 2000 साल पुरानी ज्यामितीय समस्या हल की।', 'इतने perfectionist कि बहुत कम publish किया।', 'बिजली और चुंबकत्व में भी क्रांति।'],
  },
  {
    name: 'शकुंतला देवी',
    years: '1929–2013',
    country: '🇮🇳 भारत (बेंगलुरु)',
    emoji: '⚡',
    color: 'from-yellow-500 to-orange-500',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    title: 'मानव कंप्यूटर — गिनीज़ रिकॉर्ड होल्डर',
    born: '4 नवंबर 1929, Bangalore',
    died: '21 अप्रैल 2013, Bangalore',
    education: 'कोई औपचारिक शिक्षा नहीं — पिता ने सर्कस में दिखाया',
    about: `शकुंतला देवी का जन्म एक रूढ़िवादी ब्राह्मण परिवार में हुआ। उनके पिता सर्कस में जादूगर थे। 3 साल की उम्र में पिता ने ताश के खेल में पाया कि बच्ची संख्याओं को पहचानती है।

    6 साल में Mysore University में प्रदर्शन किया। 8 साल में Annamalai University में calculation से professors को चौंकाया।

    1977 में Dallas University में: 7,686,369,774,870 × 2,465,099,745,779 = 18,947,668,177,995,426,462,773,730 — 28 सेकंड में! Computer ने 28 सेकंड बाद यही उत्तर दिया।

    1980 में Guinness Book of World Records में दर्ज। वे India की first Mathematical Celebrity थीं। उन्होंने बच्चों के लिए गणित की किताबें भी लिखीं।`,
    contributions: [
      { title: 'Guinness World Record', detail: '7,686,369,774,870 × 2,465,099,745,779 = 18,947,668,177,995,426,462,773,730 — 28 सेकंड में 13×13 अंकों का गुणनफल।' },
      { title: '23वाँ मूल निकालना', detail: '18th root of a 201-digit number को 50 सेकंड में निकाला — calculator से तेज़।' },
      { title: 'Math Books for Children', detail: '"Mathability", "Fun with Numbers", "Puzzles to Puzzle You" — बच्चों में गणित का प्रेम जगाने के लिए।' },
      { title: 'Jyotish (ज्योतिष) भी', detail: 'वे ज्योतिषी भी थीं — Mathematics और ज्योतिष दोनों में पारंगत।' },
    ],
    quotes: ['"Without mathematics, there\'s nothing you can do. Everything around you is mathematics. Everything around you is numbers." — Shakuntala Devi'],
    legacy: 'Bollywood film "Shakuntala Devi" (2020) उनके जीवन पर। Indian Mathematical Olympiad में प्रेरणा। "Human Computer" शब्द उन्हीं के लिए गढ़ा गया।',
    funFacts: ['3 साल में ताश की गिनती।', 'कोई स्कूली शिक्षा नहीं — World Record।', 'भारत सरकार ने Padma Shri से सम्मानित किया।', 'जीवन भर सर्कस से Guinness तक की यात्रा।'],
  },
  {
    name: 'मरियम मिर्ज़ाखानी',
    years: '1977–2017',
    country: '🇮🇷 ईरान / 🇺🇸 USA',
    emoji: '🌸',
    color: 'from-pink-400 to-fuchsia-500',
    bg: 'bg-pink-50 dark:bg-pink-950/20',
    title: 'Fields Medal पाने वाली पहली महिला — गणित की रानी',
    born: '3 मई 1977, Tehran, Iran',
    died: '14 जुलाई 2017, Stanford (Breast Cancer, मात्र 40 वर्ष)',
    education: 'Sharif University, Tehran; Harvard University PhD',
    about: `मिर्ज़ाखानी का सपना लेखक बनना था। 10वीं कक्षा में सोचती थीं कि गणित में अच्छी नहीं हैं। पर 11वीं में एक अच्छे teacher मिले और सब बदल गया।

    17 साल में International Mathematical Olympiad में Gold Medal। 18 साल में फिर Gold Medal और Perfect Score।

    Harvard में PhD करते हुए उनका thesis इतना उत्कृष्ट था कि तीन अलग-अलग top journals ने publish किया — अलग-अलग papers के रूप में!

    2014 में Fields Medal — गणित का Nobel Prize — मिला। पहली महिला, पहली ईरानी। उन्होंने Riemann Surfaces (कागज़ को मरोड़ने और काटने से बनी जटिल ज्यामितीय सतहें) पर काम किया।

    2017 में मात्र 40 साल में Breast Cancer से निधन। Stanford ने कहा — "गणित ने एक सितारा खो दिया।"`,
    contributions: [
      { title: 'Riemann Surfaces की Geodesics', detail: 'घुमावदार सतहों पर सबसे छोटे रास्ते (geodesics) कितने होते हैं — यह गिनना। उनका result 20 साल पुरानी conjecture को हल करता है।' },
      { title: 'Teichmüller Theory', detail: 'Riemann Surfaces के shapes का अध्ययन — कितने तरीकों से एक surface को stretch किया जा सकता है।' },
      { title: 'Symplectic Geometry', detail: 'Physics में particle की position और momentum दोनों को describe करने की geometry।' },
      { title: 'IMO Perfect Score', detail: '1994 में IMO में 42/42 Perfect Score — दुनिया के top students में।' },
    ],
    quotes: ['"The beauty of mathematics only shows itself to more patient followers." — Maryam Mirzakhani'],
    legacy: 'Iran ने stamp issue किया उनके नाम पर। Stanford में Maryam Mirzakhani Hall। हर साल "Maryam Mirzakhani Prize" दी जाती है। उनकी बेटी Anahita से कहती थीं — "हर दिन कुछ नया सीखो।"',
    funFacts: ['लेखक बनना चाहती थीं — गणितज्ञ बन गईं।', '10वीं में खुद को गणित में कमज़ोर समझती थीं।', 'Fields Medal लेते हुए रोईं।', '40 साल में गणित को नई दिशा दी।'],
  },
];

function MathematiciansCard({ m, isOpen, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <button onClick={onClick} className="w-full text-left min-h-0 focus:outline-none">
        <div className={`bg-gradient-to-r ${m.color} p-5 text-white relative overflow-hidden`}>
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-white/10 rounded-full blur-lg" />
          <div className="flex items-center gap-3 relative z-10">
            <span className="text-4xl p-1 bg-white/10 rounded-2xl drop-shadow-sm">{m.emoji}</span>
            <div className="flex-1 min-w-0">
              <h2 className="font-black text-lg md:text-xl tracking-wide leading-tight">{m.name}</h2>
              <p className="text-xs opacity-90 font-medium mt-0.5">{m.years} · {m.country}</p>
            </div>
            <ChevronDown size={20} className={`opacity-80 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
          <p className="text-xs md:text-sm font-bold mt-3 opacity-95 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 w-fit">
            ✨ {m.title}
          </p>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={`p-4 md:p-5 space-y-4 ${m.bg} border-t border-slate-100 dark:border-slate-800/50`}>
              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl shadow-sm">
                  <p className="text-slate-400 dark:text-slate-500 font-bold mb-0.5">🎂 जन्म स्थान / समय</p>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200">{m.born}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl shadow-sm">
                  <p className="text-slate-400 dark:text-slate-500 font-bold mb-0.5">🎓 शिक्षा / दीक्षा</p>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200">{m.education}</p>
                </div>
              </div>

              {/* Biography */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
                <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
                  <BookOpen size={14} /> संपूर्ण जीवनी:
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium">
                  {m.about}
                </p>
              </div>

              {/* Top Contributions */}
              <div className="space-y-2">
                <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 px-1">
                  <Star size={14} /> प्रमुख वैज्ञानिक योगदान:
                </p>
                {m.contributions.map((c, ci) => (
                  <div key={ci} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3.5 rounded-2xl shadow-sm hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-colors">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                      <span className="text-amber-500">🏆</span> {c.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium pl-5">
                      {c.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Facts Sheet */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-2xl p-4">
                <p className="text-xs font-black text-amber-700 dark:text-amber-400 mb-2.5 flex items-center gap-1.5">
                  <Lightbulb size={14} /> बेहद रोचक तथ्य:
                </p>
                <ul className="space-y-2">
                  {m.funFacts.map((f, fi) => (
                    <li key={fi} className="text-xs text-slate-700 dark:text-slate-300 flex gap-2 font-semibold leading-relaxed">
                      <span className="text-amber-500 shrink-0">⚡</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quotes Jumbotron */}
              <div className={`bg-gradient-to-r ${m.color} text-white rounded-2xl p-4 shadow-md`}>
                <p className="text-xs font-black mb-1.5 opacity-90">💬 इतिहास के पन्नों से उनके शब्द:</p>
                {m.quotes.map((q, qi) => (
                  <p key={qi} className="text-sm italic font-bold leading-relaxed last:mt-1">
                    {q}
                  </p>
                ))}
              </div>

              {/* Modern Legacy Row */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-3.5 shadow-sm border-l-4 border-l-indigo-500">
                <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 mb-1">🌍 आधुनिक युग में विरासत:</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                  {m.legacy}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Mathematicians() {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(null);
  const [filterCountry, setFilterCountry] = useState('सभी');

  const countries = ['सभी', 'भारत', 'ग्रीस', 'जर्मनी', 'इंग्लैंड', 'स्विट्ज़रलैंड'];

  // Complete Filtering Logic
  const filtered = mathematicians.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.country.toLowerCase().includes(search.toLowerCase());
      
    const matchCountry = filterCountry === 'सभी' || m.country.includes(filterCountry);

    return matchSearch && matchCountry;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-4 py-1.5 rounded-full text-xs font-black mb-3 border border-indigo-100 dark:border-indigo-900/30 shadow-sm"
          >
            <Users size={14} /> महान विचारक गैलरी
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
            📐 विश्वप्रसिद्ध महान गणितज्ञ
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-semibold mt-1">
            जिन्होंने हमारे सोचने और ब्रह्मांड को समझने का नज़रिया हमेशा के लिए बदल दिया!
          </p>
        </div>

        {/* Search & Filter Deck */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-4 md:p-5 shadow-sm mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1.5 text-slate-400 dark:text-slate-500" size={18} />
            <input
              type="text"
              placeholder="नाम, खोज या देश से खोजें..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm pl-11 pr-4 py-3 rounded-2xl border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none font-semibold transition-all shadow-inner"
            />
          </div>

          {/* Quick Country Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCountry(c)}
                className={`text-xs font-extrabold px-4 py-2 rounded-xl border whitespace-nowrap transition-all duration-200 ${
                  filterCountry === c
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950'
                }`}
              >
                {c === 'सभी' ? '🌐 सभी देश' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid Mount */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((m) => (
              <motion.div
                key={m.name}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <MathematiciansCard
                  m={m}
                  isOpen={openId === m.name}
                  onClick={() => setOpenId(openId === m.name ? null : m.name)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Handler */}
        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl"
          >
            <span className="text-4xl block mb-2">🔍</span>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">क्षमा करें, इस नाम या देश का कोई गणितज्ञ नहीं मिला।</p>
            <button 
              onClick={() => { setSearch(''); setFilterCountry('सभी'); }}
              className="text-xs font-black text-indigo-600 dark:text-indigo-400 mt-2 hover:underline"
            >
              फ़िल्टर रीसेट करें
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
