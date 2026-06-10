import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * टेलविंड क्लासेस को सुरक्षित और डायनामिक तरीके से मर्ज (Merge) करने का फंक्शन
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * सुरक्षित तरीके से चेक करना कि ऐप Iframe के अंदर चल रहा है या नहीं
 * (यह सर्वर-साइड रेंडरिंग या कड़क सिक्योरिटी एनवायरनमेंट में कोड को क्रैश होने से बचाता है)
 */
export const isIframe = typeof window !== 'undefined' && window.self !== window.top;
