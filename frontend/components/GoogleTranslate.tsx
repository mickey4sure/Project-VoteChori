"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function GoogleTranslate() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div id="google_translate_element" aria-hidden="true" style={{ display: 'none' }} />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          window.googleTranslateElementInit = function () {
            new google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,hi,bn,te,mr,ta',
                autoDisplay: false,
                multilanguagePage: true,
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              },
              'google_translate_element'
            );
          };
        `}
      </Script>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
