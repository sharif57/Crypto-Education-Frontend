/* eslint-disable @typescript-eslint/no-explicit-any */



"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState<string>("en");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get saved language from localStorage
    const savedLang = localStorage.getItem("googtrans");
    if (savedLang) {
      // Format: /en/de or /en/en
      const lang = savedLang.split("/")[2] || "en";
      setCurrentLang(lang);
    }

    // Add the Google Translate script
    const addScript = () => {
      // Check if already loaded
      if (window.google?.translate) {
        initTranslate();
        return;
      }

      // Set init function
      window.googleTranslateElementInit = initTranslate;

      // Add script if not exists
      if (!document.querySelector('script[src*="translate.google.com"]')) {
        const script = document.createElement("script");
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.head.appendChild(script);
      }
    };

    const initTranslate = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,de",
            autoDisplay: false,
          },
          "google_translate_element"
        );

        // Mark as loaded
        setTimeout(() => {
          setIsLoaded(true);

          // Apply saved language after load
          const savedLang = localStorage.getItem("googtrans");
          if (savedLang) {
            const lang = savedLang.split("/")[2] || "en";
            if (lang !== "en") {
              triggerTranslation(lang);
            }
          }
        }, 1000);
      }
    };

    addScript();
  }, []);

  const triggerTranslation = (lang: string) => {
    const findAndTrigger = (attempts = 0) => {
      if (attempts > 30) {
        console.log("Translation trigger timeout");
        return;
      }

      const select = document.querySelector(
        "select.goog-te-combo"
      ) as HTMLSelectElement;

      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change", { bubbles: true }));

        // Save to localStorage
        const domain = window.location.hostname;

        if (lang === "en") {
          // Clear all translation cookies and storage
          localStorage.removeItem("googtrans");

          // Clear cookies for all domain variations
          document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
          document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
          document.cookie = `googtrans=; path=/; domain=.${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        } else {
          // Set language cookies and storage
          localStorage.setItem("googtrans", `/en/${lang}`);
          document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain}; max-age=2592000`;
          document.cookie = `googtrans=/en/${lang}; path=/; max-age=2592000`;
        }
      } else {
        setTimeout(() => findAndTrigger(attempts + 1), 100);
      }
    };

    findAndTrigger();
  };

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "de" : "en";
    setCurrentLang(newLang);
    triggerTranslation(newLang);
  };

  return (
    <>
      {/* Google Translate Element (hidden) */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {/* Language Switch */}
      <div className="language-switch-container">
        <div className="language-labels flex items-center ">
          <span className={`lang-label ${currentLang === "en" ? "active" : ""}`}>
            EN
          </span>
          <button
            className="language-switch"
            onClick={toggleLanguage}
            disabled={!isLoaded}
            aria-label="Toggle Language"
          >
            <span className={`switch-slider ${currentLang === "de" ? "active" : ""}`}>
              <span className="switch-icon">
                {currentLang === "en" ? "" : ""}
              </span>
            </span>
          </button>
          <span className={`lang-label ${currentLang === "de" ? "active" : ""}`}>
            DE
          </span>
        </div>



        {!isLoaded && (
          <div className="loading-spinner"></div>
        )}
      </div>

      <style jsx global>{`
        /* Hide Google UI */
        .skiptranslate {
          display: none !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        #google_translate_element {
          display: none !important;
        }
        iframe.skiptranslate {
          display: none !important;
        }
        .goog-te-spinner-pos {
          display: none !important;
        }

        /* Container */
        .language-switch-container {
          display: inline-flex;
          align-items: center;
          gap: 16px;
        }

        /* Language Labels */
        .language-labels {
          display: flex;
          gap: 12px;
          font-weight: 600;
          font-size: 14px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .lang-label {
          color: #94a3b8;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .lang-label.active {
          color: #62C1BF;
          transform: scale(1.1);
        }

        /* Switch Button */
        .language-switch {
          position: relative;
          width: 64px;
          height: 32px;
          background: #62C1BF;
          border-radius: 32px;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .language-switch:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .language-switch:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .language-switch:focus {
          outline: none;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1),
            0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        /* Switch Slider */
        .switch-slider {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 28px;
          height: 28px;
          background: #FFFFFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
        }

        .switch-slider.active {
          left: 34px;
          background: #FFFFFF;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
        }

        /* Switch Icon */
        .switch-icon {
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Loading Spinner */
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid #e2e8f0;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .language-switch {
            width: 56px;
            height: 28px;
          }

          .switch-slider {
            width: 24px;
            height: 24px;
          }

          .switch-slider.active {
            left: 30px;
          }

          .lang-label {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}