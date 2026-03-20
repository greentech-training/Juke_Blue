"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// --- Cookie Helpers ---
function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export default function WelcomeGate() {
  const pathname = usePathname();
  const allowBypass = pathname === '/privacy' || pathname === '/terms';

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState('age');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const isAgeVerified = sessionStorage.getItem('ageVerified');
    const cookieConsent = getCookie('cookieConsentPrefs');
    if (!isAgeVerified || !cookieConsent) {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    if (showModal && !allowBypass) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [showModal, allowBypass]);

  const handleContinue = () => {
    if (ageConfirmed) {
      setStep('cookies');
      sessionStorage.setItem('ageVerified', 'true');
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const handleSaveCookies = () => {
    setCookie('cookieConsentPrefs', JSON.stringify(cookiePrefs));
    setShowModal(false);
    setShowError(false);
  };

  const handleAcceptAll = () => {
    const allPrefs = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setCookiePrefs(allPrefs);
    setCookie('cookieConsentPrefs', JSON.stringify(allPrefs));
    setShowModal(false);
    setShowError(false);
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setCookiePrefs(onlyEssential);
    setCookie('cookieConsentPrefs', JSON.stringify(onlyEssential));
    setShowModal(false);
    setShowError(false);
  };

  if (!showModal || allowBypass) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="relative bg-antique text-nautical rounded-2xl p-6 w-full max-w-lg shadow-xl border-2 border-nautical overflow-y-auto max-h-[90vh]">
        <div className="absolute inset-0 bg-grain bg-[length:70px_70px] bg-center opacity-30 rounded-2xl pointer-events-none z-0"></div>

        <div className="relative z-10">
          {step === 'age' && (
            <>
              <h2 className="font-title text-3xl mb-6 text-center">Welcome, Seafarer!</h2>
              <label className="flex justify-center items-center mb-4">
                <input
                  type="checkbox"
                  checked={ageConfirmed}
                  onChange={() => {
                    setAgeConfirmed(!ageConfirmed);
                    setShowError(false);
                  }}
                  className="form-checkbox h-5 w-5 accent-blush cursor-pointer"
                />
                <span className="ml-3 text-sm max-[500px]:text-xs sm:text-lg">
                  I confirm I am over 18 years old
                </span>
              </label>
              {showError && (
                <p className="text-blush italic mb-4">
                  Please confirm your age to proceed.
                </p>
              )}
              <div className="flex justify-center">
                <button
                  onClick={handleContinue}
                  className="px-6 py-3 bg-nautical text-antique rounded hover:bg-blush hover:text-nautical font-title text-xl transition-colors shadow-lg"
                >
                  Continue
                </button>
              </div>
              <div className="text-sm mt-6 text-center">
                <Link href="/privacy" className="text-blush underline mx-2">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-blush underline mx-2">
                  Terms & Conditions
                </Link>
              </div>
            </>
          )}

          {step === 'cookies' && (
            <>
              <h2 className="font-title text-2xl mb-4 text-center">
                Your Cookie Preferences
              </h2>
              <p className="text-sm mb-4 text-center">
                Adjust your cookie settings.<br />
                Essential cookies are always enabled.
              </p>
              <div className="space-y-3">
                {Object.entries(cookiePrefs).map(([key, value]) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      disabled={key === 'essential'}
                      onChange={() =>
                        setCookiePrefs((prev) => ({
                          ...prev,
                          [key]: !prev[key],
                        }))
                      }
                      className="form-checkbox h-5 w-5 accent-blush cursor-pointer"
                    />
                    <span className="ml-3 capitalize text-sm">
                      {key === 'essential' ? `${key} (required)` : key}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={handleSaveCookies}
                  className="px-6 py-3 bg-nautical text-antique rounded hover:bg-blush hover:text-nautical font-title shadow-lg"
                >
                  Save Selection
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 bg-nautical text-antique rounded hover:bg-blush hover:text-nautical font-title shadow-lg"
                >
                  Accept All
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-3 bg-blush text-nautical rounded hover:bg-blush-darker font-title shadow-lg"
                >
                  Reject All
                </button>
              </div>
              <div className="text-sm mt-4 text-center">
                <Link href="/privacy" className="text-blush underline mx-2">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-blush underline mx-2">
                  Terms & Conditions
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

