import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { appParams } from './appParams';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); // शुरुआत में false ताकि यह पहली बार चेक हो सके
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  // ऐप की पब्लिक सेटिंग्स सर्वर से लोड करने का फंक्शन
  const checkAppState = useCallback(async () => {
    setIsLoadingPublicSettings(true);
    try {
      // यदि base44 क्लाइंट में गेट सेटिंग्स का एंडपॉइंट उपलब्ध हो
      if (base44.getPublicSettings) {
        const settings = await base44.getPublicSettings(appParams.appId);
        setAppPublicSettings(settings);
      } else {
        setAppPublicSettings({ theme: 'violet', appName: 'NKG Math Universe' });
      }
    } catch (error) {
      console.error("App state loading failed:", error);
    } finally {
      setIsLoadingPublicSettings(false);
    }
  }, []);

  // यूजर का ऑथेंटिकेशन और टोकन स्टेटस चेक करने का मुख्य फंक्शन
  const checkUserAuth = useCallback(async () => {
    // अगर यूआरएल या स्टोरेज में टोकन नहीं है, तो सीधे बाहर भेजें
    if (!appParams.token) {
      setIsAuthenticated(false);
      setUser(null);
      setAuthChecked(true);
      return;
    }

    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      // base44 एपीआई क्लाइंट की मदद से यूजर प्रोफाइल वेरीफाई करना
      const response = await base44.getUserProfile(appParams.token);
      
      if (response && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        // अगर यूजर डेटाबेस में नहीं मिलता है तो विशिष्ट एरर सेट करें
        setAuthError({ type: 'user_not_registered', message: 'User not found in roster' });
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      setAuthError({ type: 'server_error', message: error.message || 'Server error' });
      setIsAuthenticated(false);
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  }, []);

  // यूजर को लॉग आउट करने का फंक्शन
  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('base44_access_token');
      window.localStorage.removeItem('token');
    }
    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);
    // लॉगआउट के बाद रूट पेज पर रिफ्रेश या नेविगेट करें
    window.location.href = '/';
  }, []);

  // लॉगिन स्क्रीन पर रीडायरेक्ट करने का डिफ़ॉल्ट फंक्शन
  const navigateToLogin = useCallback(() => {
    if (appParams.appBaseUrl) {
      window.location.href = `${appParams.appBaseUrl}/login?app_id=${appParams.appId}`;
    } else {
      window.location.href = '/';
    }
  }, []);

  // पहली बार ऐप लोड होने पर सेटिंग्स लोड करना
  useEffect(() => {
    checkAppState();
  }, [checkAppState]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
