import { useEffect, useMemo, useRef, useState } from "react";

let initStarted = false;

const LANGS = [
  { code: "en", label: "English" },
  { code: "te", label: "తెలుగు (Telugu)" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", label: "മലയാളം (Malayalam)" },
  { code: "ur", label: "اردو (Urdu)" },
];

function getCookie(name) {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\/+^])/g, "\\$1") + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}

function setGoogTrans(lang) {
  const val = lang === "en" ? "/en/en" : `/en/${lang}`;
  const host = location.hostname;
  document.cookie = `googtrans=${val};path=/`;
  document.cookie = `googtrans=${val};path=/;domain=${host}`;
  if (host.includes(".")) document.cookie = `googtrans=${val};path=/;domain=.${host}`;
}

function clearGoogTrans() {
  const host = location.hostname;
  const exp = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `googtrans=;path=/;${exp}`;
  document.cookie = `googtrans=;path=/;domain=${host};${exp}`;
  if (host.includes(".")) document.cookie = `googtrans=;path=/;domain=.${host};${exp}`;
}

export default function LanguageSelect() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = useMemo(() => {
    const c = getCookie("googtrans");
    const m = c.match(/\/en\/([a-z-]+)/i);
    return m ? m[1] : "en";
  }, []);
  const currentLabel = LANGS.find(l => l.code === current)?.label || "English";

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      const el = document.getElementById("google_translate_element");
      if (!el || el.dataset.ready) return;
      el.dataset.ready = "1";
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "en,te,hi,ta,kn,ml,ur", autoDisplay: false },
        "google_translate_element"
      );
    };
    if (!document.getElementById("google_translate_element")) {
      const host = document.createElement("div");
      host.id = "google_translate_element";
      host.style.cssText = "position:absolute;left:-9999px;top:-9999px;height:0;overflow:hidden";
      document.body.appendChild(host);
    }
    if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    } else if (!initStarted) {
      initStarted = true;
      const s = document.createElement("script");
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.body.appendChild(s);
    }

    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const choose = code => {
    if (code === "en") clearGoogTrans(); else setGoogTrans(code);
    setOpen(false);
    location.reload();
  };

  return (
    <div className="lang-dd" ref={ref}>
      <button type="button" className="lang-btn" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <span className="lang-globe" aria-hidden="true">🌐</span>
        <span className="lang-btn-label">{currentLabel.split(" ")[0]}</span>
        <span className="lang-caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox" aria-label="Select language">
          {LANGS.map(l => (
            <li key={l.code}>
              <button type="button" role="option" aria-selected={current === l.code} className={"lang-opt" + (current === l.code ? " active" : "")} onClick={() => choose(l.code)}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
