// // /* eslint-disable @typescript-eslint/no-explicit-any */



// // "use client";

// // import { useEffect, useState } from "react";

// // declare global {
// //   interface Window {
// //     googleTranslateElementInit?: () => void;
// //     google?: any;
// //   }
// // }

// // export default function GoogleTranslate() {
// //   const [currentLang, setCurrentLang] = useState<string>("en");
// //   const [isLoaded, setIsLoaded] = useState(false);

// //   useEffect(() => {
// //     // Get saved language from localStorage
// //     const savedLang = localStorage.getItem("googtrans");
// //     if (savedLang) {
// //       // Format: /en/de or /en/en
// //       const lang = savedLang.split("/")[2] || "en";
// //       setCurrentLang(lang);
// //     }

// //     // Add the Google Translate script
// //     const addScript = () => {
// //       // Check if already loaded
// //       if (window.google?.translate) {
// //         initTranslate();
// //         return;
// //       }

// //       // Set init function
// //       window.googleTranslateElementInit = initTranslate;

// //       // Add script if not exists
// //       if (!document.querySelector('script[src*="translate.google.com"]')) {
// //         const script = document.createElement("script");
// //         script.src =
// //           "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
// //         script.async = true;
// //         document.head.appendChild(script);
// //       }
// //     };

// //     const initTranslate = () => {
// //       if (window.google?.translate?.TranslateElement) {
// //         new window.google.translate.TranslateElement(
// //           {
// //             pageLanguage: "en",
// //             includedLanguages: "en,de",
// //             autoDisplay: false,
// //           },
// //           "google_translate_element"
// //         );

// //         // Mark as loaded
// //         setTimeout(() => {
// //           setIsLoaded(true);

// //           // Apply saved language after load
// //           const savedLang = localStorage.getItem("googtrans");
// //           if (savedLang) {
// //             const lang = savedLang.split("/")[2] || "en";
// //             if (lang !== "en") {
// //               triggerTranslation(lang);
// //             }
// //           }
// //         }, 1000);
// //       }
// //     };

// //     addScript();
// //   }, []);

// //   const triggerTranslation = (lang: string) => {
// //     const findAndTrigger = (attempts = 0) => {
// //       if (attempts > 30) {
// //         console.log("Translation trigger timeout");
// //         return;
// //       }

// //       const select = document.querySelector(
// //         "select.goog-te-combo"
// //       ) as HTMLSelectElement;

// //       if (select) {
// //         select.value = lang;
// //         select.dispatchEvent(new Event("change", { bubbles: true }));

// //         // Save to localStorage
// //         const domain = window.location.hostname;

// //         if (lang === "en") {
// //           // Clear all translation cookies and storage
// //           localStorage.removeItem("googtrans");

// //           // Clear cookies for all domain variations
// //           document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
// //           document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
// //           document.cookie = `googtrans=; path=/; domain=.${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
// //         } else {
// //           // Set language cookies and storage
// //           localStorage.setItem("googtrans", `/en/${lang}`);
// //           document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain}; max-age=2592000`;
// //           document.cookie = `googtrans=/en/${lang}; path=/; max-age=2592000`;
// //         }
// //       } else {
// //         setTimeout(() => findAndTrigger(attempts + 1), 100);
// //       }
// //     };

// //     findAndTrigger();
// //   };

// //   const toggleLanguage = () => {
// //     const newLang = currentLang === "en" ? "de" : "en";
// //     setCurrentLang(newLang);
// //     triggerTranslation(newLang);
// //   };

// //   return (
// //     <>
// //       {/* Google Translate Element (hidden) */}
// //       <div id="google_translate_element" style={{ display: "none" }} />

// //       {/* Language Switch */}
// //       <div className="language-switch-container">
// //         <div className="language-labels flex items-center ">
// //           <span className={`lang-label ${currentLang === "en" ? "active" : ""}`}>
// //             EN
// //           </span>
// //           <button
// //             className="language-switch"
// //             onClick={toggleLanguage}
// //             disabled={!isLoaded}
// //             aria-label="Toggle Language"
// //           >
// //             <span className={`switch-slider ${currentLang === "de" ? "active" : ""}`}>
// //               <span className="switch-icon">
// //                 {currentLang === "en" ? "" : ""}
// //               </span>
// //             </span>
// //           </button>
// //           <span className={`lang-label ${currentLang === "de" ? "active" : ""}`}>
// //             DE
// //           </span>
// //         </div>



// //         {!isLoaded && (
// //           <div className="loading-spinner"></div>
// //         )}
// //       </div>

// //       <style jsx global>{`
// //         /* Hide Google UI */
// //         .skiptranslate {
// //           display: none !important;
// //         }
// //         .goog-te-banner-frame {
// //           display: none !important;
// //         }
// //         body {
// //           top: 0 !important;
// //         }
// //         #google_translate_element {
// //           display: none !important;
// //         }
// //         iframe.skiptranslate {
// //           display: none !important;
// //         }
// //         .goog-te-spinner-pos {
// //           display: none !important;
// //         }

// //         /* Container */
// //         .language-switch-container {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 16px;
// //         }

// //         /* Language Labels */
// //         .language-labels {
// //           display: flex;
// //           gap: 12px;
// //           font-weight: 600;
// //           font-size: 14px;
// //           font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
// //         }

// //         .lang-label {
// //           color: #94a3b8;
// //           transition: all 0.3s ease;
// //           letter-spacing: 0.5px;
// //         }

// //         .lang-label.active {
// //           color: #62C1BF;
// //           transform: scale(1.1);
// //         }

// //         /* Switch Button */
// //         .language-switch {
// //           position: relative;
// //           width: 64px;
// //           height: 32px;
// //           background: #62C1BF;
// //           border-radius: 32px;
// //           border: none;
// //           cursor: pointer;
// //           padding: 0;
// //           transition: all 0.3s ease;
// //           box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
// //         }

// //         .language-switch:hover:not(:disabled) {
// //           transform: scale(1.05);
// //         }

// //         .language-switch:disabled {
// //           opacity: 0.5;
// //           cursor: not-allowed;
// //         }

// //         .language-switch:focus {
// //           outline: none;
// //           box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1),
// //             0 0 0 3px rgba(99, 102, 241, 0.2);
// //         }

// //         /* Switch Slider */
// //         .switch-slider {
// //           position: absolute;
// //           top: 2px;
// //           left: 2px;
// //           width: 28px;
// //           height: 28px;
// //           background: #FFFFFF;
// //           border-radius: 50%;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
// //           box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
// //         }

// //         .switch-slider.active {
// //           left: 34px;
// //           background: #FFFFFF;
// //           box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
// //         }

// //         /* Switch Icon */
// //         .switch-icon {
// //           font-size: 16px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         /* Loading Spinner */
// //         .loading-spinner {
// //           width: 20px;
// //           height: 20px;
// //           border: 3px solid #e2e8f0;
// //           border-top-color: #6366f1;
// //           border-radius: 50%;
// //           animation: spin 0.8s linear infinite;
// //         }

// //         @keyframes spin {
// //           to {
// //             transform: rotate(360deg);
// //           }
// //         }

// //         /* Responsive */
// //         @media (max-width: 640px) {
// //           .language-switch {
// //             width: 56px;
// //             height: 28px;
// //           }

// //           .switch-slider {
// //             width: 24px;
// //             height: 24px;
// //           }

// //           .switch-slider.active {
// //             left: 30px;
// //           }

// //           .lang-label {
// //             font-size: 13px;
// //           }
// //         }
// //       `}</style>
// //     </>
// //   );
// // }

// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { useEffect, useState, useCallback } from "react";

// declare global {
//   interface Window {
//     googleTranslateElementInit?: () => void;
//     google?: any;
//   }
// }

// export default function GoogleTranslate() {
//   const [currentLang, setCurrentLang] = useState<string>("en");
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     // Restore saved language
//     const saved = localStorage.getItem("googtrans");
//     if (saved) {
//       const lang = saved.split("/")[2] || "en";
//       setCurrentLang(lang);
//     }

//     const addScript = () => {
//       if (window.google?.translate) {
//         initTranslate();
//         return;
//       }

//       window.googleTranslateElementInit = initTranslate;

//       if (!document.querySelector('script[src*="translate.google.com"]')) {
//         const script = document.createElement("script");
//         script.src =
//           "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//         script.async = true;
//         document.head.appendChild(script);
//       }
//     };

//     const initTranslate = () => {
//       if (!window.google?.translate?.TranslateElement) return;

//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages: "en,de",
//           autoDisplay: false,
//           layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
//         },
//         "google_translate_element"
//       );

//       // Give extra time — very important in 2025+
//       setTimeout(() => {
//         setIsLoaded(true);

//         const saved = localStorage.getItem("googtrans");
//         if (saved) {
//           const lang = saved.split("/")[2] || "en";
//           if (lang !== "en") {
//             // Double trigger helps sometimes
//             triggerTranslation(lang);
//             setTimeout(() => triggerTranslation(lang), 800);
//           }
//         }
//       }, 1200);
//     };

//     addScript();

//     return () => {
//       // Optional cleanup
//       const script = document.querySelector('script[src*="translate.google.com"]');
//       if (script) script.remove();
//     };
//   }, [triggerTranslation]);

//   const triggerTranslation = useCallback((lang: string) => {
//     let attempts = 0;
//     const maxAttempts = 40;

//     const tryTranslate = () => {
//       if (attempts >= maxAttempts) {
//         console.warn("Could not trigger translation after max attempts");
//         return;
//       }

//       const select = document.querySelector(
//         ".goog-te-combo"
//       ) as HTMLSelectElement | null;

//       if (select) {
//         // Small priming trick — sometimes pushes better style (marketing tone)
//         // You can experiment with removing this
//         try {
//           const dummy = document.createElement("div");
//           dummy.innerHTML = "Deine ultimative Plattform";
//           document.body.appendChild(dummy);
//           setTimeout(() => dummy.remove(), 300);
//         } catch {}

//         select.value = lang;
//         select.dispatchEvent(new Event("change", { bubbles: true }));

//         // Save language state
//         saveLanguage(lang);
//       } else {
//         attempts++;
//         setTimeout(tryTranslate, 120);
//       }
//     };

//     tryTranslate();
//   }, []);

//   const saveLanguage = (lang: string) => {
//     const domain = window.location.hostname;

//     if (lang === "en") {
//       localStorage.removeItem("googtrans");
//       document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
//       document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
//       document.cookie = `googtrans=; path=/; domain=.${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
//     } else {
//       const value = `/en/${lang}`;
//       localStorage.setItem("googtrans", value);
//       const thirtyDays = 30 * 24 * 60 * 60;
//       document.cookie = `googtrans=${value}; path=/; domain=${domain}; max-age=${thirtyDays}; SameSite=Lax`;
//       document.cookie = `googtrans=${value}; path=/; max-age=${thirtyDays}; SameSite=Lax`;
//     }
//   };

//   const toggleLanguage = () => {
//     if (!isLoaded) return;

//     const newLang = currentLang === "en" ? "de" : "en";
//     setCurrentLang(newLang);
//     triggerTranslation(newLang);
//   };

//   return (
//     <>
//       <div id="google_translate_element" style={{ display: "none" }} />

//       <div className="language-switch-container">
//         <div className="language-labels flex items-center gap-3">
//           <span className={`lang-label ${currentLang === "en" ? "active" : ""}`}>
//             EN
//           </span>

//           <button
//             className="language-switch"
//             onClick={toggleLanguage}
//             disabled={!isLoaded}
//             aria-label="Switch between English and German"
//           >
//             <span className={`switch-slider ${currentLang === "de" ? "active" : ""}`} />
//           </button>

//           <span className={`lang-label ${currentLang === "de" ? "active" : ""}`}>
//             DE
//           </span>
//         </div>

//         {!isLoaded && <div className="loading-spinner ml-3" />}
//       </div>

//       <style jsx global>{`
//         .skiptranslate,
//         .goog-te-banner-frame,
//         iframe.skiptranslate,
//         .goog-te-spinner-pos,
//         body > .goog-te-combo {
//           display: none !important;
//         }

//         body {
//           top: 0 !important;
//         }

//         .language-switch-container {
//           display: inline-flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .language-labels {
//           font-weight: 600;
//           font-size: 14px;
//         }

//         .lang-label {
//           color: #94a3b8;
//           transition: all 0.3s;
//         }

//         .lang-label.active {
//           color: #62c1bf;
//           transform: scale(1.08);
//         }

//         .language-switch {
//           position: relative;
//           width: 64px;
//           height: 32px;
//           background: #62c1bf;
//           border-radius: 9999px;
//           border: none;
//           cursor: pointer;
//           transition: all 0.25s;
//         }

//         .language-switch:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .switch-slider {
//           position: absolute;
//           inset: 2px;
//           width: 28px;
//           height: 28px;
//           background: white;
//           border-radius: 50%;
//           transition: all 0.45s cubic-bezier(0.68, -0.55, 0.265, 1.55);
//           box-shadow: 0 1px 4px rgba(0,0,0,0.2);
//         }

//         .switch-slider.active {
//           transform: translateX(32px);
//         }

//         .loading-spinner {
//           width: 20px;
//           height: 20px;
//           border: 3px solid #e2e8f0;
//           border-top-color: #62c1bf;
//           border-radius: 50%;
//           animation: spin 0.9s linear infinite;
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }

//         @media (max-width: 640px) {
//           .language-switch { width: 56px; height: 28px; }
//           .switch-slider.active { transform: translateX(28px); }
//         }
//       `}</style>
//     </>
//   );
// }
import React from 'react'

export default function Google() {
  return (
    <div>

    </div>      
  )
}
