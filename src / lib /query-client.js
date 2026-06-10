import { QueryClient } from '@tanstack/react-query';

export const queryClientInstance = new QueryClient({
  defaultOptions: {
    queries: {
      // जब यूजर ब्राउज़र की टैब बदले और वापस आए, तो तुरंत दोबारा डेटा लोड न हो
      refetchOnWindowFocus: false,
      
      // यदि नेटवर्क एरर की वजह से रिक्वेस्ट फेल हो जाए, तो केवल 1 बार और कोशिश करे
      retry: 1,
      
      // डेटा कितनी देर तक बिल्कुल नया (Fresh) माना जाएगा (5 मिनट)
      staleTime: 5 * 60 * 1000,
      
      // जो डेटा इस्तेमाल में नहीं है, वह कितनी देर तक मेमोरी में रहेगा (10 मिनट)
      gcTime: 10 * 60 * 1000,
      
      // इंटरनेट कनेक्शन वापस आने पर डेटा को ऑटोमैटिकली रीफ्रेश करे
      refetchOnReconnect: true,
    },
  },
});
