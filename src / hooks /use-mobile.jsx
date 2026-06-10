import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // शुरुआती वैल्यू को सीधे चेक कर लिया ताकि पेज लोड होते ही सही स्टेट मिले
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    return false
  })

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // रीसाइज और ओरिएंटेशन चेंज दोनों को ट्रैक करने के लिए उत्तम तरीका
    mql.addEventListener("change", onChange)
    
    // वर्तमान स्थिति को तुरंत सेट करें
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
