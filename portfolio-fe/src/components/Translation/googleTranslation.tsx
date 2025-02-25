import { useEffect, useState } from "react";
import "../App.css"

export default function GoogleTranslateLoader(): null {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (typeof window.googleTranslateElementInit === "function") return;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            includedLanguages: "en,fr",
          },
          "google_translate_element"
        );
        setIsScriptLoaded(true); // Mark script as loaded
      }
    };

    // Add script only if it doesn't exist
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.defer = true;

      script.onload = () => setIsScriptLoaded(true); // Set state when script loads
      script.onerror = () => console.error("Failed to load Google Translate script.");

      document.body.appendChild(script);
    }

    // Hide Google Translate UI elements
    const style = document.createElement("style");
    style.innerHTML = `
      .goog-te-banner-frame, iframe.goog-te-banner-frame { display: none !important; }
      body { top: 0 !important; }
      body > .skiptranslate { display: none !important; }
    `;
    document.head.appendChild(style);
  }, []);

  return null;
}

