import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// जिन Paths पर स्क्रॉल पोजीशन को सुरक्षित (Preserve) रखना है
const PRESERVED_PATHS = ['/classes', '/games', '/tables', '/squares-cubes', '/formulas', '/definitions'];

// ग्लोबल ऑब्जेक्ट जो ऐप चलते समय पोजीशन याद रखेगा
const scrollPositions = {};

export function useScrollPreservation() {
  const location = useLocation();
  const currentPath = location.pathname;
  const prevPathRef = useRef(currentPath);

  // प्रभाव 1: केवल स्क्रॉल पोजीशन को रीयल-टाइम में स्टोर करने के लिए
  useEffect(() => {
    const handleScroll = () => {
      if (PRESERVED_PATHS.includes(currentPath)) {
        scrollPositions[currentPath] = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPath]);

  // प्रभाव 2: पेज बदलते ही स्क्रॉल को रीस्टोर करने या टॉप पर भेजने के लिए
  useEffect(() => {
    if (PRESERVED_PATHS.includes(currentPath) && scrollPositions[currentPath] != null) {
      // requestAnimationFrame सुनिश्चित करता है कि नया पेज पूरी तरह रेंडर हो चुका हो
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollPositions[currentPath], behavior: 'instant' });
      });
    } else {
      // अगर नया पेज लिस्ट में नहीं है, तो डिफ़ॉल्ट रूप से स्क्रीन को सबसे ऊपर भेजें
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    prevPathRef.current = currentPath;
  }, [currentPath]);
}
