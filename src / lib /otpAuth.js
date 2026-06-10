// Simple OTP Auth - stores session in localStorage
const SESSION_KEY = 'nkg-otp-session';
const OTP_KEY = 'nkg-otp-pending';

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function saveOTPForPhone(phone, otp) {
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
  localStorage.setItem(OTP_KEY, JSON.stringify({ phone, otp, expires }));
}

export function verifyOTP(phone, enteredOtp) {
  try {
    const data = JSON.parse(localStorage.getItem(OTP_KEY));
    if (!data) return false;
    if (data.phone !== phone) return false;
    if (Date.now() > data.expires) { localStorage.removeItem(OTP_KEY); return false; }
    if (data.otp !== enteredOtp) return false;
    // OTP correct - create session
    localStorage.removeItem(OTP_KEY);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ phone, loggedInAt: Date.now() }));
    return true;
  } catch { return false; }
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch { return null; }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}v
