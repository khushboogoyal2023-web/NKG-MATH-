import { useState, useEffect } from 'react';

export function useBookmarks(namespace) {
  const key = `nkg-bookmarks-${namespace}`;
  const notesKey = `nkg-notes-${namespace}`;

  // लोकल स्टोरेज से शुरुआती डेटा सुरक्षित तरीके से उठाना
  const [bookmarks, setBookmarks] = useState(() => {
    try { 
      return JSON.parse(localStorage.getItem(key)) || {}; 
    } catch { 
      return {}; 
    }
  });

  const [notes, setNotes] = useState(() => {
    try { 
      return JSON.parse(localStorage.getItem(notesKey)) || {}; 
    } catch { 
      return {}; 
    }
  });

  // बुकमार्क स्टेट बदलते ही लोकल स्टोरेज अपडेट करना
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(bookmarks));
  }, [bookmarks, key]);

  // नोट्स स्टेट बदलते ही लोकल स्टोरेज अपडेट करना
  useEffect(() => {
    localStorage.setItem(notesKey, JSON.stringify(notes));
  }, [notes, notesKey]);

  // बुकमार्क को ऑन या ऑफ (टॉगल) करने का फंक्शन
  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const updated = { ...prev };
      if (updated[id]) {
        delete updated[id]; // मेमोरी साफ़ रखने के लिए false वैल्यू को सीधे डिलीट करना बेहतर है
      } else {
        updated[id] = true;
      }
      return updated;
    });
  };

  // किसी सवाल के लिए कस्टम नोट लिखने या एडिट करने का फंक्शन
  const setNote = (id, text) => {
    setNotes(prev => {
      const updated = { ...prev };
      if (!text || text.trim() === '') {
        delete updated[id]; // अगर नोट खाली कर दिया है तो स्पेस बचाएं
      } else {
        updated[id] = text;
      }
      return updated;
    });
  };

  return { bookmarks, notes, toggleBookmark, setNote };
}
