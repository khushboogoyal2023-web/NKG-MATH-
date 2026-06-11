import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, XCircle } from 'lucide-react';

const modelData = [
  {
    no: 1,
    name: 'पाइथागोरस प्रमेय — वर्ग मॉडल',
    category: '📐 ज्यामिति',
    level: 'कक्षा 6-8',
    time: '30 मिनट',
    color: 'from-purple-500 to-indigo-600',
    visualDesc: '3 रंगीन वर्ग (3×3, 4×4, 5×5) एक समकोण त्रिभुज के तीन किनारों पर लगे हुए।',
    lookLike: 'एक समकोण त्रिभुज के तीन भुजाओं पर तीन वर्ग जुड़े होंगे। छोटे दो वर्गों के बराबर = बड़े वर्ग का क्षेत्रफल।',
    notLike: 'तीन अलग-अलग वर्ग बिखरे हुए — वे जुड़े होने चाहिए त्रिभुज की भुजाओं पर।',
    material: 'कार्डबोर्ड (3 रंगों में), कैंची, गोंद, पेंसिल, रूलर',
    steps: [
      '1. लाल कार्डबोर्ड पर 3×3 = 9 छोटे वर्ग खींचो',
      '2. नीले पर 4×4 = 16 वर्ग खींचो',
      '3. पीले पर 5×5 = 25 वर्ग खींचो',
      '4. तीनों को काटो',
      '5. एक कागज़ पर 3-4-5 समकोण त्रिभुज बनाओ',
      '6. तीन भुजाओं पर तीनों वर्ग चिपकाओ',
      '7. गिनो: 9+16=25 ✅',
    ],
    doNot: ['वर्गों को त्रिभुज से अलग मत रखो', 'भुजाओं की माप गलत मत करो', 'अलग-अलग रंग ज़रूर इस्तेमाल करो'],
    concept: 'a² + b² = c² → 9 + 16 = 25। इससे कोई भी समकोण त्रिभुज ढूंढ सकते हैं!',
  },
  {
    no: 2,
    name: 'फिबोनाची सर्पिल — Golden Spiral',
    category: '🔢 संख्या',
    level: 'कक्षा 6-9',
    time: '45 मिनट',
    color: 'from-orange-500 to-red-500',
    visualDesc: 'अलग-अलग रंगों के वर्ग (1,1,2,3,5,8,13) एक-एक करके जुड़े, और एक Golden Spiral (घुमावدار रेखा) उनसे गुज़रती है।',
    lookLike: 'एक सर्पिल पैटर्न जो शंख जैसा दिखता है। वर्ग बाहर की तरफ बड़े होते जाते हैं। नॉटिलस शंख जैसी आकृति।',
    notLike: 'सिर्फ अलग-अलग वर्ग बिना जोड़े। सर्पिल न हो तो मॉडल अधूरा है।',
    material: 'रंगीन कार्डबोर्ड (7+ रंग), कुंपास, रूलर, गोंद, मार्कर',
    steps: [
      '1. 1×1 लाल वर्ग बनाओ',
      '2. उसके बगल में 1×1 नीला वर्ग लगाओ',
      '3. नीचे 2×2 हरा वर्ग',
      '4. दाईं तरफ 3×3 पीला वर्ग',
      '5. ऊपर 5×5 नारंगी वर्ग',
      '6. बाईं तरफ 8×8 बैंगनी',
      '7. हर वर्ग के कोने से कुंपास से चाप खींचो',
      '8. सब चाप मिलाकर Spiral बनेगा!',
    ],
    doNot: ['वर्गों के बीच गैप मत छोड़ो', 'चाप का केंद्र गलत न हो', 'रंग न हों तो कम से कम नंबर लिखो'],
    concept: '1,1,2,3,5,8,13... → अगला = पिछले दो का योग। यह सर्पिल φ (Golden Ratio = 1.618) बनाता है!',
  },
  {
    no: 3,
    name: 'पास्कल का त्रिभुज — रंगीन पैटर्न',
    category: '🔢 संख्या',
    level: 'कक्षा 5-8',
    time: '40 मिनट',
    color: 'from-teal-500 to-green-600',
    visualDesc: 'एक बड़े चार्ट पर त्रिभुज आकार में संख्याएं, जहाँ सम संख्याएं एक रंग और विषम संख्याएं दूसरे रंग में हों। Sierpinski Triangle उभरता है!',
    lookLike: '10+ पंक्तियाँ, हर संख्या के आसपास रंगीन बॉक्स। जब सम-विषम रंगो तो Fractal जैसा पैटर्न।',
    notLike: 'सिर्फ सफेद-काले में लिखी संख्याएं। रंग के बिना पैटर्न नहीं दिखेगा।',
    material: 'A2 चार्ट पेपर, रंगीन पेन/मार्कर, पेंसिल, रूलर',
    steps: [
      '1. A2 पेपर पर त्रिभुज बनाओ — 12 पंक्तियाँ',
      '2. पहली पंक्ति: 1',
      '3. हर संख्या = ऊपर के दो का योग',
      '4. 10 पंक्तियाँ पूरी करो',
      '5. सम संख्या = नीला, विषम = लाल रंगो',
      '6. 3 के गुणज = हरा, 5 के = पीला',
      '7. देखो — Sierpinski Triangle उभरता है!',
    ],
    doNot: ['संख्याएं गलत न लिखो', 'बहुत छोटा मत बनाओ', 'कम से कम 10 पंक्तियाँ ज़रूरी'],
    concept: 'Row n में binomial coefficients हैं। रंगों से Fractal पैटर्न दिखता है — गणित की सुंदरता!',
  },
  {
    no: 4,
    name: 'घन का Net (जाल) — 3D से 2D',
    category: '📦 3D मॉडल',
    level: 'कक्षा 5-8',
    time: '25 मिनट',
    color: 'from-blue-500 to-cyan-600',
    visualDesc: '6 वर्ग एक (+) या (T) आकार में जुड़े, जो मोड़ने पर बंद घन बनाता है। हर वर्ग का Area = a²।',
    lookLike: '+, T, या L आकार में 6 जुड़े वर्ग। मोड़ने पर घन बनता हो। अलग-अलग faces को अलग रंग दें।',
    notLike: '7 वर्ग (एक ज़्यादा), या ऐसे 6 वर्ग जो मोड़ने पर घन न बनें (कुल 11 संभव Nets में से)।',
    material: 'मोटा कार्डबोर्ड, पेंसिल, रूलर, कैंची, टेप या गोंद',
    steps: [
      '1. कार्डबोर्ड पर 6×5 cm के 6 वर्ग खींचो (+ आकार में)',
      '2. हर वर्ग को अलग रंग दो',
      '3. किनारे पर 0.5 cm की fold लाइन खींचो',
      '4. ध्यान से काटो',
      '5. fold lines पर मोड़ो',
      '6. टेप से बंद करो → घन तैयार!',
      '7. गिनो: कुल पृष्ठीय = 6×5² = 150 cm²',
    ],
    doNot: ['Net गलत बनाओगे तो घन नहीं बनेगा', 'वर्ग बराबर आकार के हों', 'Fold lines हल्के हाथ से बनाओ'],
    concept: 'घन का कुल पृष्ठीय क्षेत्रफल = 6a²। Net से यह visual रूप से समझ आता है!',
  },
  {
    no: 5,
    name: 'वृत्त से π — रोटेशन विधि',
    category: '📐 ज्यामिति',
    level: 'कक्षा 5-7',
    time: '20 मिनट',
    color: 'from-pink-500 to-rose-600',
    visualDesc: 'एक गोल डिब्बे को एक बार पूरा घुमाने पर जो दूरी तय होती है = परिधि = πd। इसे सीधी रेखा पर मापो।',
    lookLike: 'एक गोल ऑब्जेक्ट (जैसे ढक्कन या बोतल) और उसके बगल में एक मापने वाली पट्टी। एक बिंदु mark करके roll करो।',
    notLike: 'सिर्फ formula लिखना। यह प्रयोग है — physically करना है।',
    material: 'गोल डिब्बे का ढक्कन/coin/बोतल, मापने वाला टेप, कागज़, पेन',
    steps: [
      '1. एक गोल ऑब्जेक्ट लो (जैसे बड़ा ढक्कन)',
      '2. एक बिंदु mark करो किनारे पर',
      '3. सीधे कागज़ पर रखो, बिंदु नीचे',
      '4. धीरे-धीरे roll करो जब तक बिंदु वापस नीचे न आए',
      '5. यह दूरी = Circumference (C)',
      '6. Diameter (d) measure करो',
      '7. C ÷ d = 3.14... = π!',
    ],
    doNot: ['फिसलाओ मत — rolling करो', 'Diameter और Radius गलत मत नापो', 'कम से कम 3 बार करो accuracy के लिए'],
    concept: 'C = πd → π = C/d ≈ 3.14159. यह Archimedes की विधि है जो 2200 साल पुरानी है!',
  },
  {
    no: 6,
    name: 'बेलन का Net और पृष्ठीय क्षेत्रफल',
    category: '📦 3D मॉडल',
    level: 'कक्षा 7-9',
    time: '30 मिनट',
    color: 'from-violet-500 to-purple-600',
    visualDesc: 'एक आयताकार पट्टी (curved surface) और दो गोल वृत्त (top और bottom)। जब आयत को लपेटो → बेलन!',
    lookLike: 'एक लंबी आयताकार पट्टी और दो वृत्त। पट्टी की लंबाई = 2πr और चौड़ाई = h।',
    notLike: 'कोई भी random cylindrical object — Net precisely बनाना है।',
    material: 'A4 कागज़, कुंपास, रूलर, कैंची, टेप, सूत्र के लिए कैलकुलेटर',
    steps: [
      '1. r = 3.5 cm, h = 10 cm लो',
      '2. 2×π×r = 2×3.14×3.5 = 22 cm (rectangle की लंबाई)',
      '3. Rectangle बनाओ: 22 cm × 10 cm',
      '4. दो वृत्त: r = 3.5 cm',
      '5. Rectangle को circle से मिलाकर roll करो',
      '6. Tape से बंद करो',
      '7. Total SA = 2πr² + 2πrh = 2π×3.5(3.5+10) = 297 cm²',
    ],
    doNot: ['Rectangle की लंबाई 2πr से ज़्यादा-कम मत बनाओ', 'वृत्त radius check करो'],
    concept: 'Curved SA = 2πrh, Total SA = 2πr(r+h), Volume = πr²h',
  },
  {
    no: 7,
    name: 'मोबियस पट्टी — एक सतह का जादू',
    category: '🌀 मज़ेदार',
    level: 'कक्षा 5-9',
    time: '15 मिनट',
    color: 'from-amber-500 to-orange-500',
    visualDesc: 'एक कागज़ की पट्टी जिसे आधा मोड़कर जोड़ा गया है। यह एक तरफा सतह है — बीच से काटने पर दो नहीं, एक लंबी पट्टी बनती है!',
    lookLike: 'एक twisted loop जो अनंत ∞ जैसी दिखती है। अंदर-बाहर का भेद नहीं।',
    notLike: 'सीधी ring (बिना twist)। उसमें दो सतह होती हैं — Mobius में एक।',
    material: 'लंबी कागज़ की पट्टी (30cm × 3cm), टेप/गोंद, कैंची, पेन',
    steps: [
      '1. 30×3 cm की कागज़ पट्टी काटो',
      '2. एक सिरे को 180° (आधा) मोड़ो',
      '3. दोनों सिरे टेप से जोड़ो',
      '4. पेन से किनारे पर एक रेखा खींचो — बिना उठाए',
      '5. वापस शुरुआत पर आ जाओगे — पूरी पट्टी खिंचेगी!',
      '6. अब बीच से काटो → एक लंबी पट्टी (दो नहीं!)!',
      '7. ⅓ से काटो → दो interlinked rings!',
    ],
    doNot: ['360° मत मोड़ो (वो normal ring बन जाएगी)', '180° twist exactly चाहिए'],
    concept: 'Möbius Strip Topology का उदाहरण है। यह Non-orientable Surface है — एक ही सतह!',
  },
  {
    no: 8,
    name: 'बीजगणित टाइल — (a+b)² दृश्य',
    category: '🔤 बीजगणित',
    level: 'कक्षा 6-8',
    time: '35 मिनट',
    color: 'from-lime-500 to-green-600',
    visualDesc: 'एक बड़ा वर्ग (a+b)² जिसे 4 भागों में बाँटा गया: a² (लाल), ab (नीला), ab (नीला), b² (पीला)।',
    lookLike: 'एक बड़ा वर्ग जिसमें 2×2 Grid है। कोने में a² और b², बाकी दो में ab-ab।',
    notLike: 'सिर्फ formula लिखा हुआ। Visual ज़रूरी है — rectangle and squares दिखें।',
    material: 'रंगीन कार्डबोर्ड (लाल, नीला, पीला), कैंची, रूलर, पेन, गोंद',
    steps: [
      '1. मान लो a = 5 cm, b = 3 cm',
      '2. लाल: 5×5 = 25 cm² का वर्ग',
      '3. नीला: 5×3 = 15 cm² के दो टुकड़े',
      '4. पीला: 3×3 = 9 cm² का वर्ग',
      '5. सब जोड़कर 8×8 = 64 cm² का बड़ा वर्ग',
      '6. गिनो: 25+15+15+9 = 64 ✅',
      '7. Label लगाओ: a², ab, ab, b²',
    ],
    doNot: ['Pieces बराबर मत करो (a ≠ b हो सकता है)', 'Overlap न हो'],
    concept: '(a+b)² = a² + 2ab + b². यह visual proof है — 2ab दोनों rectangle हैं!',
  },
  {
    no: 9,
    name: 'सांख्यिकी — Bar Graph बोर्ड',
    category: '📊 सांख्यिकी',
    level: 'कक्षा 4-7',
    time: '40 मिनट',
    color: 'from-sky-500 to-blue-600',
    visualDesc: 'एक बोर्ड पर x-y axis, और रंगीन cardboard bars जो अलग-अलग ऊंचाई पर हैं। Bars हटाने-लगाने योग्य हों।',
    lookLike: 'असली बार ग्राफ जैसा — हर bar की ऊंचाई data के अनुसार। रंगीन और labeled।',
    notLike: 'सिर्फ कागज़ पर खींचा graph। यह 3D interactive होना चाहिए।',
    material: 'प्लाईवुड या थर्माकोल बोर्ड, रंगीन foam sheets, कैंची, scale, markers',
    steps: [
      '1. बोर्ड पर L-shape axis बनाओ',
      '2. Y-axis पर scale: 0,5,10,15,20...',
      '3. X-axis पर categories: सोम,मंगल,बुध...',
      '4. Foam से अलग-अलग ऊंचाई के bars काटो',
      '5. हर bar को Velcro से board पर लगाओ (remove-able)',
      '6. अलग-अलग data set करके दिखाओ',
      '7. Mean, Median, Mode निकालो',
    ],
    doNot: ['Bars एक-दूसरे को touch न करें', 'Scale uniform हो', 'Title ज़रूरी है'],
    concept: 'Bar की ऊंचाई = data का मान। Mean = सभी bars को बराबर करना। यह visual statistics है!',
  },
  {
    no: 10,
    name: 'प्रायिकता — Spinner बोर्ड',
    category: '🎲 प्रायिकता',
    level: 'कक्षा 6-8',
    time: '30 मिनट',
    color: 'from-fuchsia-500 to-pink-600',
    visualDesc: 'एक gol cardboard spinner जिसे 6 बराबर भागों में बाँटा गया है। बीच में एक तीर spin करे। हर section अलग color।',
    lookLike: 'खिलौने वाला spinner जैसा। 6 रंगीन sections। तीर spin करने पर random section पर रुके।',
    notLike: 'बिना तीर का। या sections बेराबर हों (तो probability बदल जाएगी)।',
    material: 'मोटा गोल cardboard, रंगीन pens, एक पेन की cap, pin, paper arrow',
    steps: [
      '1. गोल cardboard काटो (20 cm diameter)',
      '2. 6 बराबर sections बनाओ (360°÷6 = 60° each)',
      '3. हर section को अलग रंग दो',
      '4. बीच में एक pin लगाओ',
      '5. Pin पर paper arrow रखो',
      '6. 60 बार spin करो और note करो',
      '7. हर color लगभग 10 बार आना चाहिए (= 1/6)',
    ],
    doNot: ['Pin loose मत रखो', 'Sections exactly बराबर बनाओ', 'Arrow freely spin करे'],
    concept: 'P(किसी color) = 1/6 ≈ 16.7%. Law of Large Numbers: ज़्यादा trials → theoretical value के करीब!',
  },
  {
    no: 11,
    name: 'तुला (Balance) — समीकरण हल',
    category: '🔤 बीजगणित',
    level: 'कक्षा 5-7',
    time: '35 मिनट',
    color: 'from-teal-400 to-cyan-500',
    visualDesc: 'लकड़ी की एक पट्टी बीच में धागे से लटकी (तुला जैसी)। दोनों तरफ अलग-अलग वज़न रखे जाते हैं।',
    lookLike: 'असली तुला जैसी — बीच में balance point, दोनों तरफ trays जहाँ weights रखे जाएं।',
    notLike: 'सिर्फ लकड़ी की पट्टी बिना trays। Weights equal नहीं होंगे तो equation गलत।',
    material: '30 cm की लकड़ी, धागा, दो छोटी कटोरियाँ, छोटे weights (coins), गोंद',
    steps: [
      '1. 30 cm पट्टी के बीच में निशान लगाओ',
      '2. धागे से छत या stand से लटकाओ',
      '3. दोनों छोर पर कटोरियाँ बाँधो',
      '4. 2x + 3 = 7 — बायीं तरफ: 2 coins×x + 3 small',
      '5. दायीं तरफ: 7 coins',
      '6. Balance बनाने के लिए x की value ढूंढो',
      '7. x = 2 → 2×2+3 = 7 ✅',
    ],
    doNot: ['Balance point exact center होना चाहिए', 'Weights equal होने चाहिए'],
    concept: 'समीकरण = तुला। एक तरफ कुछ जोड़ो तो दूसरी तरफ भी जोड़ो — Equality बनाए रखो!',
  },
  {
    no: 12,
    name: 'संख्या रेखा — पूर्णांक जोड़-घटाव',
    category: '🔢 संख्या',
    level: 'कक्षा 4-6',
    time: '20 मिनट',
    color: 'from-indigo-500 to-blue-600',
    visualDesc: '-10 से +10 तक एक रंगीन पट्टी, जिस पर एक movable marker हो। जोड़ने पर दाईं तरफ, घटाने पर बाईं तरफ।',
    lookLike: 'एक थर्मामीटर जैसी पट्टी क्षैतिज में। शून्य बीच में, negative बायीं तरफ, positive दायीं।',
    notLike: 'सिर्फ कागज़ पर खींची रेखा। यह physical और interactive होनी चाहिए।',
    material: 'लकड़ी की पट्टी (50 cm), paint, marker, एक movable clip/piece',
    steps: [
      '1. पट्टी पर बीच में 0 mark करो',
      '2. दायीं तरफ: 1,2,3...10 (हरा)',
      '3. बायीं तरफ: -1,-2...-10 (लाल)',
      '4. Clip को 0 पर रखो',
      '5. (+5) + (-3) = ? → clip को 5 ले जाओ, फिर 3 वापस → 2 ✅',
      '6. (-4) + (-2) = ? → -4 से 2 बायीं → -6 ✅',
    ],
    doNot: ['Numbers unequal spacing पर मत लिखो', 'रंग code ज़रूर करो'],
    concept: 'Positive = दाईं, Negative = बायीं। जोड़ = आगे, घटाव = पीछे। Visual integer operations!',
  },
  {
    no: 13,
    name: 'गुणनखंड वृक्ष (Factor Tree)',
    category: '🔢 संख्या',
    level: 'कक्षा 4-7',
    time: '25 मिनट',
    color: 'from-green-500 to-teal-600',
    visualDesc: 'एक पेड़ की आकृति जहाँ जड़ में बड़ी संख्या है और शाखाओं पर उसके गुणनखंड। अंतिम पत्तियाँ = अभाज्य संख्याएं।',
    lookLike: 'एक उल्टा पेड़ — ऊपर संख्या, नीचे शाखाएं। जड़ = 72, शाखाएं = 2,3,4,6,8... Leaves = 2,3 (prime)।',
    notLike: 'Straight list। Tree structure होनी चाहिए जो visual हो।',
    material: 'A2 chart paper, green और brown markers, pencil',
    steps: [
      '1. 72 लो — ऊपर लिखो',
      '2. 72 = 2 × 36 → दो शाखाएं',
      '3. 36 = 2 × 18 → और शाखाएं',
      '4. 18 = 2 × 9',
      '5. 9 = 3 × 3 (दोनों prime!)',
      '6. 2,2,2,3,3 → 72 = 2³ × 3²',
      '7. पत्तियों को गोले में रखो',
    ],
    doNot: ['अभाज्य को और न तोड़ो', 'संख्या verify करो: 2×2×2×3×3=72'],
    concept: 'Prime Factorization: हर संख्या अभाज्य गुणनखंडों का गुणनफल है — Fundamental Theorem of Arithmetic!',
  },
  {
    no: 14,
    name: 'Sierpinski Triangle — Fractal',
    category: '🌀 मज़ेदार',
    level: 'कक्षा 6-9',
    time: '45 मिनट',
    color: 'from-rose-500 to-pink-600',
    visualDesc: 'एक बड़ा त्रिभुज जिसका बीच का त्रिभुज खाली है, और बाकी तीन छोटे त्रिभुजों में भी यही दोहराया गया है।',
    lookLike: 'Iteration 1: एक त्रिभुज में बीच गड्ढा। Iteration 3: बहुत सारे छोटे त्रिभुज, fractal pattern।',
    notLike: 'सिर्फ एक त्रिभुज। कम से कम 4 iterations होने चाहिए।',
    material: 'A2 chart paper, pencil, ruler, eraser, black marker',
    steps: [
      '1. एक बड़ा समबाहु त्रिभुज बनाओ (30 cm भुजा)',
      '2. हर भुजा का मध्यबिंदु निकालो',
      '3. इन तीन मध्यबिंदुओं को जोड़ो → बीच का त्रिभुज',
      '4. बीच वाले को काटो या blank रखो',
      '5. बाकी 3 त्रिभुजों पर यही दोहराओ',
      '6. 4-5 बार करो',
      '7. Black marker से outline करो',
    ],
    doNot: ['Midpoints exact हों', 'बहुत छोटे iterations में गलती होती है'],
    concept: 'Fractal: Self-similar pattern। Area → 0, Perimeter → ∞ as iterations → ∞!',
  },
  {
    no: 15,
    name: 'Geoboard — क्षेत्रफल की खोज',
    category: '📐 ज्यामिति',
    level: 'कक्षा 4-7',
    time: '40 मिनट',
    color: 'from-amber-400 to-yellow-500',
    visualDesc: 'एक लकड़ी के बोर्ड पर 5×5 grid में कीलें लगी हैं। रबर बैंड से विभिन्न आकृतियाँ बनाई जाती हैं।',
    lookLike: '5×5 dot grid पर कीलें। रबर बैंड से त्रिभुज, आयत, पंचभुज बनाओ और क्षेत्रफल गिनती करो।',
    notLike: 'कीलों के बिना। Geoboard में physical keel ज़रूरी है।',
    material: 'प्लाईवुड (20×20 cm), 25 कीलें (5×5), रबर बैंड (रंगीन)',
    steps: [
      '1. प्लाईवुड पर 5×5 grid mark करो (3 cm spacing)',
      '2. हर बिंदु पर कील ठोको',
      '3. रबर बैंड से rectangle बनाओ → क्षेत्रफल = dots गिनो',
      '4. Triangle बनाओ → Area = ½ × base × height',
      '5. Pick\'s Theorem आज़माओ: A = I + B/2 - 1',
      '6. I = अंदर के dots, B = किनारे के dots',
    ],
    doNot: ['Keel uniform depth पर ठोको', 'Rubber band ज़्यादा tight न हो'],
    concept: 'Pick\'s Theorem: A = I + B/2 - 1। आकृति कोई भी हो, यह formula काम करता है!',
  },
  {
    no: 16,
    name: 'LCM-HCF — Venn Diagram मॉडल',
    category: '🔢 संख्या',
    level: 'कक्षा 5-7',
    time: '25 मिनट',
    color: 'from-orange-400 to-red-500',
    visualDesc: 'दो overlapping circles (Venn Diagram)। बाहर: केवल पहली संख्या के गुणनखंड। बीच: दोनों में common। बाहर दूसरा: केवल दूसरी के।',
    lookLike: 'दो intersecting circles। Intersection में HCF के गुणनखंड। पूरे area = LCM के गुणनखंड।',
    notLike: 'सिर्फ factor lists। Venn Diagram physical होना चाहिए।',
    material: '2 hula hoops या 2 रस्सियाँ, कागज़ के टुकड़े, पेन',
    steps: [
      '1. फर्श पर दो overlapping circles बनाओ',
      '2. 12 और 18 लो',
      '3. 12 = 2²×3, 18 = 2×3²',
      '4. Common: 2×3 (= HCF = 6)',
      '5. बाईं तरफ (only 12): 2² यानी extra 2',
      '6. दायीं (only 18): 3² यानी extra 3',
      '7. LCM = 2²×3² = 36 ✅',
    ],
    doNot: ['HCF को बाहर मत रखो', 'LCM=a×b÷HCF से verify करो'],
    concept: 'HCF = दोनों में minimum power का गुणनफल। LCM = सब का maximum power का गुणनफल!',
  },
];

const categories = ['सभी', '📐 ज्यामिति', '🔢 संख्या', '📦 3D मॉडल', '🔤 बीजगणित', '📊 सांख्यिकी', '🎲 प्रायिकता', '🌀 मज़ेदार'];

export default function MathModels() {
  const [openId, setOpenId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('सभी');

  const filtered = activeCategory === 'सभी'
    ? modelData
    : modelData.filter(m => m.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 selection:bg-primary/20">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <h1 className="font-heading text-3xl md:text-4xl mb-2 font-bold tracking-tight">🏗️ गणित के वर्किंग मॉडल</h1>
        <p className="text-muted-foreground font-body text-sm mb-4 leading-relaxed">
          हर मॉडल में: दिखने में कैसा होगा, आवश्यक सामग्री, चरण-दर-चरण बनाने की विधि और सावधानियाँ!
        </p>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl px-4 py-2 text-xs font-body font-semibold text-green-700 dark:text-green-300 inline-block shadow-sm">
          💡 अपनी पसंद का मॉडल चुनें और उसकी पूर्ण गाइड देखें!
        </div>
      </motion.div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map(c => (
          <button 
            type="button"
            key={c} 
            onClick={() => {
              setActiveCategory(c);
              setOpenId(null); // Filter बदलने पर खुला हुआ कार्ड बंद करें
            }}
            className={`px-3.5 py-2 rounded-xl font-body font-bold text-xs transition-all ${
              activeCategory === c 
                ? 'bg-primary text-primary-foreground shadow-sm scale-[1.02]' 
                : 'bg-card border hover:border-primary/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Accordion Layout Grid */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((m, i) => (
            <motion.div 
              key={m.no} 
              layout
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Accordion Header Button */}
              <button 
                type="button"
                onClick={() => setOpenId(openId === m.no ? null : m.no)} 
                className="w-full text-left p-4 focus:outline-none group"
              >
                <div className="flex items-center gap-3">
                  <div className={`bg-gradient-to-r ${m.color} text-white rounded-xl w-12 h-12 flex items-center justify-center font-heading font-bold text-lg shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                    {m.no}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-1">
                      <span className="text-[10px] bg-muted border px-2 py-0.5 rounded-full font-body font-bold tracking-wider">{m.category}</span>
                      <span className="text-[10px] text-muted-foreground font-body font-medium">{m.level}</span>
                      <span className="text-[10px] text-muted-foreground font-body font-medium">⏱ {m.time}</span>
                    </div>
                    <h2 className="font-heading text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">{m.name}</h2>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-muted-foreground transition-transform duration-300 shrink-0 ${openId === m.no ? 'rotate-180 text-primary' : ''}`} 
                  />
                </div>
              </button>

              {/* Accordion Content Panel */}
              <AnimatePresence initial={false}>
                {openId === m.no && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ height: { duration: 0.25 }, opacity: { duration: 0.2 } }}
                    className="overflow-hidden bg-muted/10"
                  >
                    <div className="px-4 pb-5 border-t pt-4 space-y-4">

                      {/* Visual Description Banner */}
                      <div className={`bg-gradient-to-r ${m.color} text-white rounded-2xl p-4 shadow-sm`}>
                        <p className="text-[11px] font-extrabold font-body uppercase tracking-wider mb-1 opacity-90">🎨 मॉडल का लुक (Visual):</p>
                        <p className="text-sm font-body leading-relaxed font-medium">{m.visualDesc}</p>
                      </div>

                      {/* Do / Don't Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-green-50/50 dark:bg-green-950/10 border border-green-200 dark:border-green-900/50 rounded-xl p-3.5">
                          <p className="text-xs font-bold text-green-700 dark:text-green-400 font-body mb-2 flex items-center gap-1.5">
                            <CheckCircle size={14} className="text-green-500" /> सही मॉडल ऐसा होगा:
                          </p>
                          <p className="text-xs font-body text-foreground/90 leading-relaxed font-medium">{m.lookLike}</p>
                        </div>
                        <div className="bg-red-50/50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/50 rounded-xl p-3.5">
                          <p className="text-xs font-bold text-red-700 dark:text-red-400 font-body mb-2 flex items-center gap-1.5">
                            <XCircle size={14} className="text-red-500" /> गलतियाँ (ऐसा न करें):
                          </p>
                          <p className="text-xs font-body text-foreground/90 leading-relaxed font-medium">{m.notLike}</p>
                        </div>
                      </div>

                      {/* Material Sheet */}
                      <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/50 rounded-xl p-3.5">
                        <p className="text-xs font-bold text-amber-800 dark:text-amber-400 font-body mb-1.5 uppercase tracking-wide">📦 आवश्यक सामग्री (Materials):</p>
                        <p className="text-sm font-body text-foreground font-medium">{m.material}</p>
                      </div>

                      {/* Construction Steps */}
                      <div className="bg-card rounded-xl p-4 shadow-sm border">
                        <p className="text-xs font-bold text-primary font-body uppercase tracking-wide mb-3.5">📋 निर्माण विधि (Step-by-Step):</p>
                        <div className="space-y-2.5">
                          {m.steps.map((step, si) => (
                            <div key={si} className="flex gap-3 items-start">
                              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 shadow-sm">
                                {si + 1}
                              </span>
                              <p className="text-sm font-body text-foreground/90 font-medium leading-relaxed">
                                {step.replace(/^\d+\.\s/, '')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Precautions Panel */}
                      <div className="bg-red-50/30 dark:bg-red-950/5 border border-red-100 dark:border-red-950/30 rounded-xl p-3.5">
                        <p className="text-xs font-bold text-red-800 dark:text-red-400 font-body mb-2 uppercase tracking-wide">⚠️ मुख्य सावधानियाँ:</p>
                        <ul className="space-y-1.5">
                          {m.doNot.map((d, di) => (
                            <li key={di} className="text-xs font-body text-foreground/90 flex gap-2 font-medium">
                              <span className="text-red-500 font-bold">✗</span> {d}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Mathematics Concept */}
                      <div className="bg-primary/[0.03] border border-primary/10 rounded-xl p-3.5">
                        <p className="text-xs font-bold text-primary font-body uppercase tracking-wide mb-1.5">🧠 छिपी गणितीय अवधारणा (Concept):</p>
                        <p className="text-sm font-body text-foreground leading-relaxed font-semibold">{m.concept}</p>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
