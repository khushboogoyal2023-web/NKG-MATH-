const isNode = typeof window === 'undefined';

// सर्वर साइड (Node) पर क्रैश होने से बचाने के लिए एक सटीक लोकलस्टोरेज मॉक (Mock)
const mockStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const storage = isNode ? mockStorage : window.localStorage;

// कैमलकेस (camelCase) को स्नेक_केस (snake_case) में बदलने का फंक्शन
const toSnakeCase = (str) => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};

const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false } = {}) => {
  if (isNode) {
    return defaultValue;
  }
  
  const storageKey = `base44_${toSnakeCase(paramName)}`;
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get(paramName);
  
  // यूआरएल को साफ सुथरा और सुरक्षित बनाने के लिए पैरामीटर हटाना
  if (removeFromUrl && searchParam) {
    urlParams.delete(paramName);
    const queryString = urlParams.toString();
    const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ""}${window.location.hash}`;
    window.history.replaceState({}, document.title, newUrl);
  }
  
  if (searchParam) {
    storage.setItem(storageKey, searchParam);
    return searchParam;
  }
  
  if (defaultValue) {
    // अगर स्टोरेज में पहले से कुछ नहीं है, तभी डिफ़ॉल्ट वैल्यू सेट करें
    const existing = storage.getItem(storageKey);
    if (!existing) {
      storage.setItem(storageKey, defaultValue);
      return defaultValue;
    }
    return existing;
  }
  
  const storedValue = storage.getItem(storageKey);
  if (storedValue) {
    return storedValue;
  }
  
  return null;
};

const getAppParams = () => {
  if (!isNode && getAppParamValue("clear_access_token") === 'true') {
    storage.removeItem('base44_access_token');
    storage.removeItem('token');
  }
  
  return {
    appId: getAppParamValue("app_id", { defaultValue: import.meta.env.VITE_BASE44_APP_ID }),
    token: getAppParamValue("access_token", { removeFromUrl: true }),
    fromUrl: getAppParamValue("from_url", { defaultValue: isNode ? "" : window.location.href }),
    functionsVersion: getAppParamValue("functions_version", { defaultValue: import.meta.env.VITE_BASE44_FUNCTIONS_VERSION }),
    appBaseUrl: getAppParamValue("app_base_url", { defaultValue: import.meta.env.VITE_BASE44_APP_BASE_URL }),
  };
};

export const appParams = {
  ...getAppParams()
};
