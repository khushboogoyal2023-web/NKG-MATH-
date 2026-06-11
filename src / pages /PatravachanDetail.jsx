import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, CheckCircle, XCircle, MessageSquare, Star, AlertCircle, Presentation, FileText, FileDown } from 'lucide-react';

function downloadScript(title, script, type, level, duration) {
  const content = `NKG MATH UNIVERSE — पत्रवाचन स्क्रिप्ट
${'='.repeat(50)}

विषय: ${title}
प्रकार: ${type}
कक्षा: ${level}
समय: ${duration}

${'='.repeat(50)}

${script.replace(/\*\*/g, '').replace(/---/g, '-'.repeat(40))}

${'='.repeat(50)}
🔢 NKG MATH UNIVERSE © 2026 | गणित सीखो, मज़े करो!`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/[^a-zA-Z0-9\u0900-\u097F]/g, '_')}_Script.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
import SpeechPlayer from '../components/patravachan/SpeechPlayer';
import PPTViewer from '../components/patravachan/PPTViewer';

// ── Full detail data for each topic ──────────────────────────────
const detailData = {
  1: {
    title: 'गणित का इतिहास और भारत का योगदान',
    type: '🎤 भाषण',
    level: 'कक्षा 6-9',
    duration: '5-7 मिनट',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    preparation: `इस भाषण की तैयारी के लिए:
• भारतीय गणितज्ञों के नाम और उनकी खोजें याद करें
• 2-3 रोचक तथ्य चुनें जो सुनने वाले को चौंका दें
• आरंभ में एक सवाल पूछें जो ध्यान खींचे
• अभ्यास आईने के सामने करें`,
    fullScript: `**आरंभ (30 सेकंड)**
"नमस्ते! आज मैं आपको उस देश की गणितीय विरासत के बारे में बताऊंगा जहाँ हम रहते हैं — भारत! वह देश जिसने दुनिया को सबसे बड़ा गणितीय उपहार दिया — शून्य!"

---

**भाग 1 — शून्य की क्रांति (1 मिनट)**
आज आप जो मोबाइल उपयोग करते हैं, जो कंप्यूटर चलाते हैं — इन सबकी नींव एक भारतीय खोज है: शून्य!

आर्यभट्ट (476 CE) ने स्थान-मान पद्धति दी। बिना शून्य के:
- 10 नहीं होता, 100 नहीं होता
- Binary (0 और 1) नहीं होती
- कोई भी Computer, Smartphone नहीं होता

ब्रह्मगुप्त (598 CE) ने शून्य के नियम बनाए:
- कुछ भी + शून्य = वही
- कुछ भी × शून्य = शून्य

---

**भाग 2 — दशमलव पद्धति (1 मिनट)**
हम जो 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 लिखते हैं — यह भारत की देन है!
पहले रोमन अंक थे: I, II, III, IV, V... इनसे बड़ी गणना कठिन थी।
भारतीय अंक अरब व्यापारियों के ज़रिए यूरोप पहुँचे और दुनिया बदल गई!

---

**भाग 3 — आर्यभट्टीयम (1 मिनट)**
1500 साल पहले, मात्र 23 साल की उम्र में, आर्यभट्ट ने "आर्यभट्टीयम" लिखी।
इसमें:
- π = 3.1416 (आज भी उपयोग!)
- त्रिकोणमिति की तालिकाएं
- पृथ्वी गोल है और खुद घूमती है (Copernicus से 1000 साल पहले!)
- ग्रहण का वैज्ञानिक कारण

भारत के पहले उपग्रह का नाम "आर्यभट्ट" रखा गया — यह भला क्यों? क्योंकि वे हमारे असली Space Scientist थे!

---

**भाग 4 — बौधायन सूत्र (1 मिनट)**
पाइथागोरस प्रमेय a² + b² = c² — यह तो सब जानते हैं।
पर क्या आप जानते हैं — बौधायन सूत्र में यही बात पाइथागोरस से 300 साल पहले (800 BCE) लिखी थी!
"दीर्घस्य अक्ष्णया रज्जुः पार्श्वमानी तिर्यक् मानी च यत् पृथग् भूते कुरुतस्तदुभयं करोति।"
इसका मतलब: विकर्ण का वर्ग = भुजाओं के वर्गों का योग!

---

**भाग 5 — रामानुजन (1 मिनट)**
1887 में तमिलनाडु के एक गरीब परिवार में एक बच्चा पैदा हुआ।
कोई औपचारिक उच्च शिक्षा नहीं।
Port Trust में क्लर्क की नौकरी।
पर रात को गणित!

उन्होंने Cambridge के Professor Hardy को पत्र लिखा — 120 प्रमेय!
Hardy ने कहा: "यह इंसान नहीं, गणित का देवता है।"

32 साल की छोटी उम्र में 3900+ प्रमेय!
आज भी उनकी नोटबुक में ऐसे सूत्र हैं जो गणितज्ञ सिद्ध कर रहे हैं।

1729 — Hardy की Taxi Number:
1729 = 1³ + 12³ = 9³ + 10³
यह सबसे छोटी संख्या है जो दो तरह से दो घनों का योग है!

---

**समापन (30 सेकंड)**
"भारत ने दुनिया को शून्य दिया, दशमलव दिया, π दिया। यह वह देश है जहाँ आर्यभट्ट जैसे 23 साल के युवक ने ब्रह्मांड की गणना की, और रामानुजन जैसे स्वयंभू प्रतिभावान ने Cambridge को चौंकाया।

इस महान परंपरा को आगे बढ़ाना हम सबकी ज़िम्मेदारी है।

गणित सीखो — देश का गौरव बढ़ाओ! जय हिंद!"`,
    stageTips: [
      'मंच पर आते ही एक गहरी सांस लो — आत्मविश्वास दिखाओ',
      'शुरू में सवाल पूछो: "हाथ उठाओ — कितनों ने 1729 के बारे में सुना है?"',
      'π = 3.1416 बोलते वक्त धीरे बोलो — effect के लिए',
      'रामानुजन का नाम लेते वक्त रुको, pause दो',
      'अंत में मुट्ठी बंद करके बोलो — "गणित सीखो, देश का गौरव बढ़ाओ!"',
      'हाथ का उपयोग करो — शून्य दिखाने के लिए "O" बनाओ',
    ],
    doList: [
      'आँखें श्रोताओं से मिलाएं',
      'हर भाग के बाद एक क्षण रुकें',
      'तारीखें और नाम सही बोलें',
      'अंत में ऊर्जावान रहें',
      'कागज़ कम से कम देखें',
    ],
    doNotList: [
      'बहुत तेज़ मत बोलो — हर बात समझनी चाहिए',
      'एक ही बात बार-बार मत दोहराओ',
      'कागज़ में मुँह मत गड़ाओ',
      'रटे हुए जैसे मत लगो — natural रहो',
      'समय से ज़्यादा मत बोलो',
    ],
    sampleOpening: '"नमस्ते! एक सवाल — आज आप जो smartphone उपयोग करते हैं, उसकी नींव किसने रखी? कोई अमेरिकी? कोई यूरोपीय? नहीं — एक भारतीय! जिसका नाम था... आर्यभट्ट!"',
    sampleClosing: '"भारत ने दुनिया को शून्य दिया। और आज हम Zero से Hero बनें — यही हमारी विरासत है। धन्यवाद!"',
    vocabulary: [
      { word: 'दशमलव पद्धति', meaning: 'Decimal number system (1-9, 0)' },
      { word: 'त्रिकोणमिति', meaning: 'Trigonometry — कोणों का गणित' },
      { word: 'स्थान-मान', meaning: 'Place value — इकाई, दहाई, सैकड़ा' },
      { word: 'प्रमेय', meaning: 'Theorem — सिद्ध किया हुआ सिद्धांत' },
    ],
  },
  2: {
    title: 'पहाड़ों की कविता (गुणन तालिका)',
    type: '📖 कविता',
    level: 'कक्षा 1-5',
    duration: '2-3 मिनट',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    preparation: `इस कविता की तैयारी:
• पहले पहाड़े याद करें (2 से 10 तक)
• लय में बोलने की प्रैक्टिस करें
• हाथ ताली या थपकी से लय बनाएं
• दूसरों को साथ में दोहराने दें`,
    fullScript: `**2 का पहाड़ा**
दो एकम दो, दो दूनी चार,
दो तीए छः, लगाओ विचार।
दो चौके आठ, दो पाँचे दस,
दो छक्के बारह, याद करो बस!

दो सत्ते चौदह, दो अट्ठे सोलह,
दो नौ अठारह, दो दसाँ बीस — खुलह!

---

**5 का पहाड़ा**
पाँच एकम पाँच, पाँच दूनी दस,
पाँच तीन पंद्रह, सीखो इसे बस।
पाँच चार बीस, पाँच पाँच पच्चीस,
पाँच छः तीस, पाँच सात पैंतीस!

पाँच आठ चालीस, पाँच नौ पैंतालीस,
पाँच दस पचास — देखो यह सीरीज!
सब पाँच-पाँच जाते हैं,
सब 0 या 5 पर आते हैं!

---

**3 का पहाड़ा**
तीन एकम तीन, तीन दूने छः,
तीन तीए नौ, देखो यह खेल।
तीन चौके बारह, तीन पाँचे पंद्रह,
तीन छक्के अठारह — आगे और चल!

तीन सत्ते इक्कीस, तीन अट्ठे चौबीस,
तीन नौ सत्ताईस, तीन दस तीस!

---

**10 का पहाड़ा (आसान!)**
दस का पहाड़ा बड़ा आसान,
बस एक शून्य लगाओ, हो जाए काम!
दस एकम दस, दस दूनी बीस,
दस तीए तीस — देखो क्या रीस!

दस चौके चालीस, दस पाँचे पचास,
दस छक्के साठ, दस सत्ते सत्तर — मस्त!

दस अट्ठे अस्सी, दस नौ नब्बे,
दस दस सौ — पूरे हो गए!

---

**मिश्रित छंद (सब पहाड़े)**
एक-एक ताल में बोलो साथी,
पहाड़ा है जीवन की बाती!
2, 3, 4, 5 — मिल के गाओ,
गुणन तालिका मन में बसाओ!

याद करो यह गुणन का खेल,
जीवन में आएगा काम,
बाज़ार में, पाठशाला में,
हर जगह है इनका नाम!

---

**समापन छंद**
पहाड़ा सीखो, पहाड़ा जपो,
जोड़-घटाव में आगे बढ़ो।
जब भी कोई सवाल आए,
पहाड़ा तुम्हें राह दिखाए!`,
    stageTips: [
      'हर पहाड़े से पहले थोड़ा रुको',
      'श्रोताओं को साथ में दोहराने दो — "अब सब साथ बोलो!"',
      'हाथ की थपकी से ताल बनाओ',
      'तेज़ी से बोलने से गलतियाँ होती हैं — धीरे और स्पष्ट बोलो',
      '5 के पहाड़े में "0 या 5 पर आते हैं" वाली बात highlight करो',
      'बच्चों की कक्षा के लिए: साथ में दोहराने की प्रतियोगिता करो',
    ],
    doList: [
      'लय और ताल बनाए रखो',
      'हर पंक्ति स्पष्ट बोलो',
      'उत्साह दिखाओ — कविता lifeless नहीं होनी चाहिए',
      'श्रोताओं को involve करो',
    ],
    doNotList: [
      'बिना भाव के मत पढ़ो',
      'बहुत जल्दी मत बोलो',
      'लय तोड़ो मत',
      'गलती हो तो घबराओ मत — continue करो',
    ],
    sampleOpening: '"क्या आप जानते हैं, दुनिया की सबसे पुरानी memory trick क्या है? पहाड़े! आइए, आज हम पहाड़े गाते-गाते याद करते हैं!"',
    sampleClosing: '"पहाड़ा सीखो, पहाड़ा जपो — गणित में आगे बढ़ो! 2,3,5 — हमारे दोस्त!"',
    vocabulary: [
      { word: 'गुणन तालिका', meaning: 'Multiplication Table — पहाड़े' },
      { word: 'ताल', meaning: 'Rhythm — एक नियमित लय' },
      { word: 'तुकबंदी', meaning: 'Rhyming — अंत में मिलते शब्द' },
    ],
  },
  3: {
    title: 'रामानुजन — एक अलौकिक प्रतिभा',
    type: '🎭 नाटक',
    level: 'कक्षा 7-9',
    duration: '10-15 मिनट',
    color: 'from-teal-500 to-green-600',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    preparation: `नाटक की तैयारी:
• 4 पात्र: रामानुजन, माँ, Hardy, एक मित्र/Teacher
• वेशभूषा: रामानुजन — धोती; Hardy — कोट
• Props: एक बड़ा कागज़ (नोटबुक), कुर्सी (Cambridge Office)
• 1 सप्ताह अभ्यास, हर दिन 30 मिनट`,
    fullScript: `**पात्र परिचय**
- रामानुजन (20-30 वर्ष के दिखें)
- माँ कोमलम्मल (40 वर्ष)
- Professor G.H. Hardy (50 वर्ष, अंग्रेज़ी लहजा)
- मित्र / Teacher (30 वर्ष)
- (Optional) Narrator

---

**दृश्य 1 — कुंभकोणम, स्कूल, 1903**
[रामानुजन बोर्ड पर लिख रहे हैं, Teacher देख रहा है]

Teacher: "रामानुजन! फिर बोर्ड पर गणित! पाठ्यक्रम पढ़ो, परीक्षा आ रही है!"

रामानुजन: (बोर्ड से मुड़कर) "Sir, क्षमा करें। पर मैंने एक नया सूत्र खोजा है —"

Teacher: (झुंझलाकर) "सूत्र! तुम खुद सूत्र बनाते हो? यह किताब में नहीं है तो गलत है!"

रामानुजन: (धीरे से) "पर Sir, इसे verify किया जा सकता है..."

Teacher: "बैठ जाओ! ज़्यादा होशियारी दिखाने की ज़रूरत नहीं!"

[रामानुजन चुप बैठ जाते हैं, पर नोटबुक में लिखते रहते हैं]

मित्र: (फुसफुसाते हुए) "रामानुजन, छोड़ो। Teacher नाराज़ हो गए।"

रामानुजन: (मुस्कुराते हुए) "मित्र, सत्य नाराज़ नहीं होता।"

---

**दृश्य 2 — घर, रात, 1912**
[रामानुजन मिट्टी के तेल की रोशनी में नोटबुक में लिख रहे हैं। माँ आती हैं।]

माँ: (थकी आवाज़ में) "बेटा, रात के 2 बज गए। सो जाओ।"

रामानुजन: "माँ, बस यह एक सूत्र... देखो, अगर infinite series को इस तरह लिखें तो—"

माँ: (नरमी से) "बेटा, क्लर्क की नौकरी में गणित नहीं चाहिए। कल सुबह जल्दी उठना है।"

रामानुजन: "माँ, क्या सपने भी रुक जाते हैं क्योंकि सुबह जल्दी उठना है?"

[माँ कुछ नहीं कहतीं, प्यार से माथे पर हाथ रखती हैं]

माँ: "देवी नामगिरि तुम्हारी रक्षा करें।"

---

**दृश्य 3 — Cambridge, Hardy का Office, 1913**
[Hardy Professor बैठे हैं, एक envelope खोलते हैं]

Hardy: (पढ़ते हुए) "Dear Professor Hardy... I have found some wonderful results... here are some of my theorems..."

[पढ़ते-पढ़ते रुक जाते हैं, चौंकते हैं]

Hardy: (खड़े होकर) "Extraordinary! यह... यह कैसे संभव है?"

[दूसरे Professor Littlewood को बुलाते हैं]

Hardy: "Littlewood! यह देखो — यह कोई fraud नहीं हो सकता। इतने सूत्र, इतने सटीक — कोई भी इन्हें invent नहीं कर सकता। ये discovered हैं!"

[India को जवाब लिखते हैं — "Come to Cambridge!"]

---

**दृश्य 4 — Cambridge, Hardy और Raman की मुलाकात, 1914**
[दोनों बैठे हैं, Hardy कागज़ों को देख रहे हैं]

Hardy: "Ramanujan, यह सूत्र — 1 + 2 + 3 + 4 + ... = -1/12 — यह तो divergent series है!"

रामानुजन: (शांति से) "Sir, यह Ramanujan Summation है। असली sense में नहीं, पर analytic continuation में यह सही है। Physics में String Theory में यही उपयोग होता है।"

Hardy: (थोड़ा झुंझलाकर) "तुम कैसे जानते हो यह सही है?"

रामानुजन: (मुस्कुराते हुए) "Sir, देवी नामगिरि मुझे सपने में दिखाती हैं।"

Hardy: (हँसते हुए) "I don't believe in God, Ramanujan. But I believe in you!"

---

**दृश्य 5 — The Taxi Moment, 1918**
[Hardy एक Taxi में आते हैं, रामानुजन Hospital में बीमार हैं]

Hardy: "Ramanujan, I came in Taxi No. 1729. Rather a dull number, isn't it?"

रामानुजन: (बिस्तर से उठकर) "No, Hardy! It is a very interesting number!"

Hardy: "How?"

रामानुजन: "1729 is the smallest number which can be expressed as the sum of two cubes in two different ways!"

Hardy: "What? Which two ways?"

रामानुजन: "1³ + 12³ = 1 + 1728 = 1729! AND 9³ + 10³ = 729 + 1000 = 1729!"

Hardy: (दंग रह जाते हैं) "How did you even know this instantly?"

रामानुजन: (मुस्कुराते हुए, धीमी आवाज़ में) "Every number is my friend, Hardy. They don't keep secrets from me."

---

**दृश्य 6 — अंतिम क्षण, 1920, मद्रास**
[रामानुजन बिस्तर पर, माँ पास में, मित्र भी]

रामानुजन: (कागज़ पर लिखते हुए) "माँ... ये Mock Theta Functions... बहुत ज़रूरी हैं..."

माँ: "बेटा, अब आराम करो..."

रामानुजन: "नहीं माँ। गणित रुकता नहीं। (Hardy को पत्र लिखते हैं) Hardy, I have discovered something wonderful..."

[कुछ क्षण रुकते हैं, आँखें बंद होती हैं]

मित्र: (रोते हुए, दर्शकों से) "32 साल की उम्र में वे चले गए। पर 3900 प्रमेय छोड़ गए — जिनमें से अनेक आज भी गणितज्ञ सिद्ध कर रहे हैं।"

**Narrator (यदि हो):**
"श्रीनिवास रामानुजन — जिनकी नोटबुक आज भी नई खोजें दे रही है। String Theory में उनके सूत्र काम आते हैं। भारत उन्हें भूल नहीं सकता।"

---

**अंतिम संदेश (सब पात्र एक साथ)**
रामानुजन: "गणित से मत डरो।"
Hardy: "Genius can come from anywhere."
माँ: "माँ का आशीर्वाद हमेशा साथ है।"
सब: "रामानुजन — अमर हैं!"`,
    stageTips: [
      'दृश्य बदलते वक्त lights बदलें या curtain करें',
      'रामानुजन की आवाज़ शांत और गहरी रखें',
      'Hardy का accent थोड़ा formal रखें',
      'Taxi Scene में dramatic pause दें',
      '1729 के दोनों calculations बोर्ड पर लिखें',
      'माँ और रामानुजन के दृश्य में emotional depth चाहिए',
    ],
    doList: [
      'संवाद याद रखें — कागज़ कम देखें',
      'Taxi Scene को highlight करें',
      'भावनाएं असली लगनी चाहिए',
      'Hardy का role मज़बूत हो',
    ],
    doNotList: [
      'रटे-रटाए मत लगो',
      'बहुत तेज़ मत बोलो',
      'Technical math explain करने की ज़रूरत नहीं — story focus करो',
      'माँ का role कम मत करो',
    ],
    sampleOpening: 'Narrator: "1913। एक गरीब भारतीय clerk ने Cambridge के एक Professor को एक letter लिखा। उस letter ने गणित का इतिहास बदल दिया..."',
    sampleClosing: '"हर रामानुजन को एक Hardy चाहिए। और हर Hardy को एक रामानुजन। क्योंकि प्रतिभा और पहचान — दोनों ज़रूरी हैं।"',
    vocabulary: [
      { word: 'अलौकिक', meaning: 'Extraordinary, beyond ordinary' },
      { word: 'Mock Theta Functions', meaning: 'रामानुजन की अंतिम खोज — String Theory में उपयोग' },
      { word: 'Divergent Series', meaning: 'अनंत series जो किसी मान पर नहीं रुकती' },
    ],
  },
  4: {
    title: 'वैदिक गणित — क्यों और कैसे?',
    type: '🎤 भाषण',
    level: 'कक्षा 5-9',
    duration: '5-8 मिनट',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    preparation: `तैयारी:
• पहले खुद 2-3 Vedic tricks सीखें और practice करें
• मंच पर live calculation दिखाएं
• एक बड़ा बोर्ड या whiteboard चाहिए`,
    fullScript: `**आरंभ — Impact Opening (30 सेकंड)**
"98 × 97 = ?"
[एक क्षण रुकें। दर्शक सोचें।]
"5 सेकंड... 4... 3... 2... 1..."
[बोर्ड पर लिखें: 9506]
"यह है वैदिक गणित! आइए जानते हैं कैसे!"

---

**भाग 1 — वैदिक गणित क्या है? (1.5 मिनट)**
वैदिक गणित 1911 से 1918 के बीच, स्वामी भारती कृष्ण तीर्थ जी ने भारतीय ग्रंथों से — विशेषकर अथर्ववेद से — 16 सूत्र निकाले।

ये 16 सूत्र गणित की हर शाखा को सरल बना देते हैं:
जोड़, घटाव, गुणा, भाग, वर्ग, घन, square root — सब कुछ!

सूत्र उदाहरण:
- "एकाधिकेन पूर्वेण" — पिछले से एक अधिक
- "निखिलम नवतश्चरमम दशतः" — सभी नौ से, अंतिम दस से
- "आनुरूप्येण" — अनुपात से

---

**भाग 2 — Trick 1: 11 से गुणा (Live Demo)**
किसी भी संख्या को 11 से गुणा करने का तरीका:

उदाहरण: 25 × 11
- पहला अंक: 2
- बीच: 2+5 = 7
- अंतिम अंक: 5
- उत्तर: 275!

35 × 11 = 3 (3+5) 5 = 385
47 × 11 = 4 (4+7) 7 = 4(11)7 = 517

[दर्शकों से नंबर माँगें और live करें]

---

**भाग 3 — Trick 2: 5 से अंत होने वाली संख्या का वर्ग**
एकाधिकेन सूत्र:
n5² = n×(n+1) | 25

उदाहरण:
25² = 2×3 = 6 → 625
35² = 3×4 = 12 → 1225
45² = 4×5 = 20 → 2025
75² = 7×8 = 56 → 5625
95² = 9×10 = 90 → 9025

[हर उत्तर के बाद दर्शकों से confirm कराएं]

---

**भाग 4 — Trick 3: 100 के पास की संख्याओं का गुणा**
निखिलम सूत्र (आधार = 100):

98 × 97:
- 98 → 100-2 → deficit: -2
- 97 → 100-3 → deficit: -3
- Left: 98-3 = 95 (या 97-2 = 95)
- Right: (-2)×(-3) = 06
- उत्तर: 9506!

96 × 94:
- deficits: -4, -6
- Left: 96-6 = 90
- Right: 4×6 = 24
- उत्तर: 9024!

---

**भाग 5 — क्यों सीखें? (1 मिनट)**
1. **प्रतियोगिता परीक्षाएं**: JEE, NEET, CAT, UPSC में समय की कमी होती है। Vedic Math से 70% समय बचता है।

2. **मानसिक शक्ति**: Calculator पर निर्भरता कम होती है। Brain sharp होता है।

3. **डर कम होता है**: जब calculation आसान लगे, गणित का डर जाता है।

4. **भारतीय विरासत**: यह हमारी परंपरा है। विदेशों में भी Vedic Math पढ़ाया जाता है।

5. **बच्चों के लिए**: 6-7 साल के बच्चे भी Vedic tricks सीख सकते हैं।

---

**समापन**
"जब आपका दोस्त calculator ढूंढ रहा हो, आप Vedic Math से पहले ही उत्तर दे चुके होंगे!

वैदिक गणित — यह magic नहीं, यह भारतीय बुद्धि है।
इसे सीखो, इसे फैलाओ। धन्यवाद!"`,
    stageTips: [
      'शुरुआत में live calculation से WOW effect बनाओ',
      'दर्शकों से नंबर माँगो और तुरंत calculate करो',
      'बोर्ड पर हर step लिखो',
      'बीच-बीच में "क्या यह सही है?" पूछो',
      'आत्मविश्वास दिखाओ — यह performance है!',
    ],
    doList: [
      'Live demonstration ज़रूर करें',
      'सरल उदाहरणों से शुरू करें',
      'दर्शकों को participate कराएं',
      'अंत में एक trick सबको सिखाएं',
    ],
    doNotList: [
      'बहुत Technical मत जाओ',
      'Sanskrit sutras बिना explanation के मत बोलो',
      'गलत calculation मत करो — पहले practice करो',
    ],
    sampleOpening: '"98 × 97 = ? 5 सेकंड में उत्तर दे सकते हो? वैदिक गणित से — हाँ! आज मैं आपको वह secret बताऊंगा जो Competition Exam toppers जानते हैं!"',
    sampleClosing: '"अगले 5 मिनट में घर जाकर एक काम करो — 25², 35², 45² निकालो। वैदिक trick से। और देखो — गणित कितना आसान है!"',
    vocabulary: [
      { word: 'सूत्र', meaning: 'Formula / Rule — एक छोटा नियम' },
      { word: 'एकाधिकेन', meaning: 'One more than the previous' },
      { word: 'निखिलम', meaning: 'All from 9, last from 10' },
    ],
  },
  5: {
    title: 'गणित और प्रकृति — एक अटूट रिश्ता',
    type: '📖 निबंध',
    level: 'कक्षा 5-9',
    duration: '2 पेज',
    color: 'from-green-500 to-teal-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    preparation: `निबंध लेखन के लिए:
• 5 मुख्य बिंदु तय करें
• हर बिंदु में 2-3 उदाहरण
• चित्र बना सकते हैं
• शुरुआत और अंत impact वाले बनाएं`,
    fullScript: `**प्रस्तावना**
ईश्वर ने इस ब्रह्मांड की रचना गणित की भाषा में की है। जब हम प्रकृति को ध्यान से देखते हैं — एक फूल, एक शंख, एक मधुमक्खी का छत्ता, एक बर्फ का टुकड़ा — तो हर जगह एक गणितीय व्यवस्था दिखती है। यह संयोग नहीं, यह प्रकृति का गणित है।

---

**1. फिबोनाची श्रेणी — प्रकृति का पसंदीदा पैटर्न**
1, 1, 2, 3, 5, 8, 13, 21, 34, 55...

हर संख्या = पिछली दो का योग।

इस श्रेणी को लियोनार्डो फिबोनाची ने 1202 में यूरोप में प्रचलित किया।

**प्रकृति में फिबोनाची:**
• गुलाब में 5 या 8 पंखुड़ियाँ
• सूरजमुखी के बीज: 34 और 55 के सर्पिल
• अनानास: 8 और 13 की spirals
• नॉटिलस शंख: Golden Spiral
• मानव हाथ की उंगलियाँ: Fibonacci ratio में

**क्यों?** क्योंकि इसी तरह पौधे सबसे efficiently grow करते हैं — हर नई पत्ती पिछली से 137.5° पर निकलती है (Golden Angle)!

---

**2. स्वर्णिम अनुपात — φ (Phi) = 1.618**
यह शायद प्रकृति का सबसे रहस्यमय संख्या है।

φ = (1 + √5) / 2 ≈ 1.618

**मानव शरीर में:**
• नाभि से पाँव / कुल ऊंचाई ≈ 1.618
• कंधे की चौड़ाई / सिर की चौड़ाई ≈ 1.618
• उंगलियों की लंबाई के अनुपात ≈ 1.618

**वास्तुकला में:**
• Parthenon (Athens): Golden Ratio
• Mona Lisa का चेहरा: φ
• Taj Mahal की proportions: Golden Ratio

**इसे "Divine Proportion" क्यों कहते हैं?** क्योंकि यह स्वाभाविक रूप से सुंदर लगता है। इसीलिए इसे art और architecture में जानबूझकर उपयोग किया जाता है।

---

**3. मधुमक्खी का षट्भुज — Optimal Geometry**
मधुमक्खी का छत्ता षट्भुज (hexagon) के आकार में होता है।

**क्यों षट्भुज?**
सिद्ध किया गया है कि एक ही क्षेत्रफल को cover करने के लिए:
- Triangle: ज़्यादा मोम, कम जगह
- Square: ठीक
- **Hexagon: सबसे कम मोम, सबसे ज़्यादा जगह — OPTIMAL!**

यह "Honeycomb Conjecture" 2001 में mathematically prove हुई।

मधुमक्खी ने यह Math कब सीखी? प्रकृति ने सिखाई!

---

**4. बर्फ के क्रिस्टल — 6-fold Symmetry**
हर बर्फ का टुकड़ा (snowflake) अलग होता है — पर सबमें 6-गुना सममिति होती है।

**क्यों?** पानी के अणु (H₂O) षट्कोणीय structure में freeze होते हैं।

यह symmetry chemistry और mathematics का अद्भुत मेल है।

---

**5. भँवर और Spiral — गणित की कृति**
• नदी का भँवर: Logarithmic Spiral
• आकाशगंगा: Spiral Galaxy
• Hurricane का shape: Logarithmic Spiral
• कान के अंदर Cochlea: Spiral

सब एक ही गणितीय curve: r = a × e^(bθ)

---

**निष्कर्ष**
गणित केवल पाठ्यपुस्तक में नहीं है — यह हर फूल में, हर शंख में, हर बर्फ के टुकड़े में जीवित है।

जब आप अगली बार गुलाब देखें — 5 पंखुड़ियाँ गिनें।
जब सूरजमुखी देखें — spirals गिनें।
जब बर्फ गिरे — 6 arms ढूंढें।

प्रकृति पहले गणित जानती है, फिर सुंदरता रचती है।
और हम जो गणित पढ़ते हैं, वह उसी सृष्टि को समझने का प्रयास है।

**"Mathematics is the language in which God has written the Universe." — Galileo Galilei**`,
    stageTips: [
      'निबंध पढ़ते वक्त examples पर ज़ोर दो',
      'चित्र बनाकर दिखाओ — spiral, hexagon',
      'Golden Ratio को बोर्ड पर लिखो: 1.618',
      'अंत में Galileo का quote धीरे और clearly बोलो',
    ],
    doList: [
      'हर section clearly divide करो',
      'उदाहरण specific दो',
      'निष्कर्ष में main theme tie करो',
      'भाषा सरल रखो',
    ],
    doNotList: [
      'बहुत mathematical formulas मत लिखो',
      'निष्कर्ष छोड़ो मत',
      'बहुत लंबा प्रस्तावना मत लिखो',
    ],
    sampleOpening: '"एक सेब। एक शंख। एक मधुमक्खी। इन तीनों में क्या common है? गणित! आइए, प्रकृति की गणितीय यात्रा पर चलते हैं..."',
    sampleClosing: '"अगली बार जब आप प्रकृति में कुछ सुंदर देखें — जानें कि वहाँ गणित है। और गणित सीखना प्रकृति को समझना है।"',
    vocabulary: [
      { word: 'स्वर्णिम अनुपात', meaning: 'Golden Ratio — φ = 1.618' },
      { word: 'फिबोनाची', meaning: 'Fibonacci — 1,1,2,3,5,8,13...' },
      { word: 'सममिति', meaning: 'Symmetry — एक सी आकृति' },
      { word: 'लॉगरिदमिक सर्पिल', meaning: 'Logarithmic Spiral — शंख जैसी घुमावदार रेखा' },
    ],
  },
};

// Generic template for topics without specific detail
const genericDetail = (p) => ({
  title: p.title,
  type: p.type,
  level: p.level,
  duration: p.duration,
  color: p.color,
  bgColor: `bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20`,
  preparation: `इस ${p.type} की तैयारी:
• विषय को अच्छे से समझें
• मुख्य बिंदु नोट करें
• दर्पण के सामने अभ्यास करें
• समय का ध्यान रखें`,
  fullScript: `**परिचय**
${p.intro}

---

**मुख्य विषय-वस्तु**

${p.points.map((pt, i) => pt === '' ? '' : `${pt}`).join('\n')}

---

**महत्वपूर्ण बातें जो ज़रूर बोलें:**
${p.keyPoints.map(k => `• ${k}`).join('\n')}

---

**नमूना संवाद/पंक्तियाँ:**
"${p.sampleLines}"

---

**प्रभावशाली समापन:**
अपने मुख्य संदेश को एक वाक्य में दोहराएं और श्रोताओं को प्रेरित करें।`,
  stageTips: [
    'शुरुआत में श्रोताओं का ध्यान खींचने वाला सवाल पूछें',
    'बीच-बीच में रुककर effect बनाएं',
    'हाथों का उपयोग करें',
    'आँखें मिलाएं श्रोताओं से',
    'अंत ऊर्जावान रखें',
  ],
  doList: p.keyPoints.concat(['सरल भाषा उपयोग करें', 'समय का ध्यान रखें']),
  doNotList: p.doNot.concat(['घबराएं नहीं', 'भाषा बहुत कठिन न रखें']),
  sampleOpening: `"आज मैं आपसे "${p.title}" के बारे में बात करूंगा। ${p.intro}"`,
  sampleClosing: `"${p.sampleLines}" — इन्हीं विचारों के साथ, धन्यवाद!`,
  vocabulary: [],
});

// Import patravachan data reference for fallback
const patravachanMinimal = [
  { no: 1 }, { no: 2 }, { no: 3 }, { no: 4 }, { no: 5 },
  { no: 6, title: 'शकुंतला देवी बनाम कंप्यूटर', type: '🎭 नाटक', level: 'कक्षा 4-8', duration: '8-10 मिनट', color: 'from-pink-500 to-rose-600', intro: 'शकुंतला देवी की अद्भुत मानसिक गणना शक्ति पर नाटक।', points: [], keyPoints: ['मानसिक गणना', 'अभ्यास का महत्व', 'भारतीय गर्व'], doNot: ['Computer Operator को रोबोट जैसे न बोलें'], sampleLines: 'Numbers are my best friends.' },
  { no: 7, title: 'गणित का भय — कारण और समाधान', type: '🎤 भाषण', level: 'कक्षा 5-9', duration: '5-7 मिनट', color: 'from-blue-500 to-cyan-600', intro: 'Math Anxiety दूर करने पर भाषण।', points: [], keyPoints: ['Math Anxiety', 'कारण', 'समाधान'], doNot: ['श्रोताओं को शर्मिंदा मत करो'], sampleLines: 'गणित डरावना नहीं, दिलचस्प है!' },
  { no: 8, title: 'ज्यामिति की दुनिया', type: '📖 कविता', level: 'कक्षा 3-7', duration: '2-3 मिनट', color: 'from-violet-500 to-purple-600', intro: 'ज्यामितीय आकृतियों पर कविता।', points: [], keyPoints: ['आकृतियाँ', 'तुकबंदी'], doNot: ['जल्दी मत पढ़ो'], sampleLines: 'ज्यामिति है जीवन का स्वर!' },
  { no: 9, title: 'शून्य की खोज — ब्रह्मगुप्त और आर्यभट्ट', type: '🎭 नाटक', level: 'कक्षा 6-9', duration: '10-12 मिनट', color: 'from-indigo-500 to-blue-600', intro: 'शून्य की खोज पर ऐतिहासिक नाटक।', points: [], keyPoints: ['शून्य का इतिहास', 'भारत का योगदान'], doNot: ['इतिहास गलत मत करो'], sampleLines: 'शून्य एक संख्या है — सबसे शक्तिशाली!' },
  { no: 10, title: 'AI और गणित — भविष्य की भाषा', type: '🎤 भाषण', level: 'कक्षा 7-9', duration: '6-8 मिनट', color: 'from-cyan-500 to-sky-600', intro: 'AI में गणित की भूमिका।', points: [], keyPoints: ['AI', 'गणित का उपयोग', 'भविष्य'], doNot: ['बहुत Technical मत जाओ'], sampleLines: 'गणित की नींव मज़बूत करो — भविष्य तुम्हारा है!' },
];

export default function PatravachanDetail({ topic, onBack }) {
  const [activeTab, setActiveTab] = useState('ppt');
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const data = detailData[topic.no] || genericDetail(topic);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button onClick={onBack} className="flex items-center gap-2 mb-5 text-sm font-body font-bold text-primary hover:underline min-h-0 min-w-0">
        <ArrowLeft size={16} /> सभी विषय
      </button>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-r ${data.color} text-white rounded-3xl p-6 mb-5`}>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-body font-bold">{data.type}</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-body">{data.level}</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-body flex items-center gap-1"><Clock size={11} /> {data.duration}</span>
        </div>
        <h1 className="font-heading text-2xl md:text-3xl mb-1">{data.title}</h1>
        <p className="text-sm opacity-80 font-body">🎞️ PPT + 📜 स्क्रिप्ट + 🎬 Stage Tips — सब कुछ यहाँ!</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {[
          { id: 'ppt', label: '🎞️ PPT व्यूअर' },
          { id: 'script', label: '📜 पूरी स्क्रिप्ट' },
          { id: 'tips', label: '🎬 Stage Tips' },
          { id: 'prep', label: '📋 तैयारी' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 px-4 py-2 rounded-2xl font-body font-bold text-sm min-h-0 transition-all ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-card border hover:border-primary'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {/* PPT Tab */}
        {activeTab === 'ppt' && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PPTViewer topic={topic} detail={data} />
          </motion.section>
        )}

        {/* Script Tab */}
        {activeTab === 'script' && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg flex items-center gap-2"><BookOpen size={18} className="text-primary" /> पूरी स्क्रिप्ट</h2>
              <button onClick={() => downloadScript(data.title, data.fullScript, data.type, data.level, data.duration)}
                className="flex items-center gap-1.5 bg-green-100 text-green-700 hover:bg-green-200 border border-green-300 px-3 py-1.5 rounded-xl font-body font-bold text-xs min-h-0 transition-all">
                <FileDown size={14} /> स्क्रिप्ट डाउनलोड
              </button>
            </div>
            <div className="prose prose-sm max-w-none">
              {data.fullScript.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**'))
                  return <p key={i} className="font-heading text-base text-primary mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>;
                if (line.startsWith('---'))
                  return <hr key={i} className="my-3 border-border" />;
                if (line.startsWith('•') || line.startsWith('-'))
                  return <p key={i} className="font-body text-sm text-foreground ml-4 leading-relaxed">{line}</p>;
                if (line === '') return <div key={i} className="h-2" />;
                return <p key={i} className="font-body text-sm text-foreground leading-relaxed">{line}</p>;
              })}
            </div>
          </motion.section>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`bg-gradient-to-r ${data.color} text-white rounded-2xl p-4`}>
                <h3 className="font-heading text-base mb-2 flex items-center gap-2"><MessageSquare size={16} /> Opening Lines</h3>
                <p className="font-body text-sm italic">"{data.sampleOpening}"</p>
              </div>
              <div className={`bg-gradient-to-r ${data.color} text-white rounded-2xl p-4 opacity-90`}>
                <h3 className="font-heading text-base mb-2 flex items-center gap-2"><MessageSquare size={16} /> Closing Lines</h3>
                <p className="font-body text-sm italic">"{data.sampleClosing}"</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-2xl p-5">
              <h2 className="font-heading text-lg mb-3 flex items-center gap-2 text-blue-700"><AlertCircle size={18} /> Stage Tips</h2>
              <ul className="space-y-2">
                {data.stageTips.map((tip, i) => (
                  <li key={i} className="flex gap-2 font-body text-sm text-foreground">
                    <span className="text-blue-500 font-bold shrink-0">{i + 1}.</span>{tip}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-2xl p-4">
                <h3 className="font-heading text-base mb-3 flex items-center gap-2 text-green-700"><CheckCircle size={16} /> ज़रूर करें ✅</h3>
                {data.doList.map((d, i) => <p key={i} className="font-body text-sm text-foreground mb-1.5 flex gap-2"><span className="text-green-500">✓</span>{d}</p>)}
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-2xl p-4">
                <h3 className="font-heading text-base mb-3 flex items-center gap-2 text-red-700"><XCircle size={16} /> यह न करें ❌</h3>
                {data.doNotList.map((d, i) => <p key={i} className="font-body text-sm text-foreground mb-1.5 flex gap-2"><span className="text-red-500">✗</span>{d}</p>)}
              </div>
            </motion.div>

            {data.vocabulary?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-2xl p-5">
                <h2 className="font-heading text-lg mb-3 text-amber-700">📚 महत्वपूर्ण शब्दावली</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.vocabulary.map((v, i) => (
                    <div key={i} className="bg-white dark:bg-card rounded-xl p-3 shadow-sm">
                      <p className="font-heading text-sm text-primary">{v.word}</p>
                      <p className="font-body text-xs text-muted-foreground">{v.meaning}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Prep Tab */}
        {activeTab === 'prep' && (
          <>
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`${data.bgColor} rounded-2xl p-5 border`}>
              <h2 className="font-heading text-lg mb-3 flex items-center gap-2"><Star size={18} className="text-primary" /> तैयारी कैसे करें?</h2>
              <pre className="font-body text-sm text-foreground leading-relaxed whitespace-pre-wrap">{data.preparation}</pre>
            </motion.section>
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <SpeechPlayer script={data.fullScript} title={data.title} />
            </motion.section>
          </>
        )}

        <button onClick={onBack} className="w-full bg-card border-2 border-primary/30 hover:border-primary rounded-2xl py-4 font-heading text-primary transition-all">
          ← सभी पत्रवाचन विषयों पर वापस जाएं
        </button>
      </div>
    </div>
  );
}
