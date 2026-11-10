import { useState } from "react";
import { WA, PHONE_TEL, PHONE_DISPLAY } from "../data.js";
import LanguageSelect from "../components/LanguageSelect.jsx";

export default function FeedbackPage() {
  const [f, setF] = useState({ name: "", phone: "", trip: "", rating: "5", comment: "" });
  const [sent, setSent] = useState(false);

  const onChange = e => setF(v => ({ ...v, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    const stars = "★".repeat(Number(f.rating)) + "☆".repeat(5 - Number(f.rating));
    const msg = [
      "Hi Happy Car Travels - Vijayawada, here is my feedback/review:",
      f.name ? `Name: ${f.name}` : null,
      f.phone ? `Phone: ${f.phone}` : null,
      f.trip ? `Trip: ${f.trip}` : null,
      `Rating: ${stars} (${f.rating}/5)`,
      f.comment ? `Comment: ${f.comment}` : null,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    setSent(true);
  };

  return (
    <>
      <header className="nav-wrap">
        <nav className="nav">
          <a className="brand" href="index.html">
            <img className="brand-logo" src={`${import.meta.env.BASE_URL}happy-car-travels-badge.png`} alt="Happy Car Travels - Vijayawada logo" width="44" height="44" />
            <span className="brand-text"><span className="brand-name">Happy Car Travels</span><span className="brand-tag">Vijayawada · Share Feedback</span></span>
          </a>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <LanguageSelect />
            <a className="btn btn-ghost btn-sm" href="reviews.html">Read reviews</a>
            <a className="btn btn-ghost btn-sm" href="index.html">Back to site</a>
          </div>
        </nav>
      </header>

      <main className="wrap" style={{ paddingBlock: "clamp(40px,6vw,72px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p className="eyebrow">Feedback & reviews</p>
          <h1 className="sec-title" style={{ maxWidth: "none", fontSize: "clamp(2rem,4vw,3rem)" }}>Share your experience</h1>
          <p className="sec-sub">Your comment helps us improve and helps other travellers choose with confidence. Submit below to send your feedback to us on WhatsApp.</p>

          <div className="panel" style={{ marginTop: 24 }}>
            {sent ? (
              <div className="alert ok" role="status" style={{ marginBottom: 16 }}>
                Thank you! WhatsApp was opened with your feedback message. Please tap <b>Send</b> in WhatsApp to complete your submission. <a href="reviews.html" className="link" style={{ marginLeft: 8 }}>Read reviews</a>
              </div>
            ) : null}

            <form onSubmit={submit} style={{ display: "grid", gap: 14 }}>
              <div className="row2">
                <label className="field"><span>Your name</span><input name="name" value={f.name} onChange={onChange} placeholder="e.g. Ravi Kumar" autoComplete="name" /></label>
                <label className="field"><span>Phone number (optional)</span><input name="phone" value={f.phone} onChange={onChange} placeholder="e.g. 90105 82716" autoComplete="tel" /></label>
              </div>
              <label className="field"><span>Trip / route (optional)</span><input name="trip" value={f.trip} onChange={onChange} placeholder="e.g. Vijayawada to Hyderabad, April 2026" /></label>
              <label className="field"><span>Rating</span>
                <select name="rating" value={f.rating} onChange={onChange}>
                  <option value="5">★★★★★ (5/5) - Excellent</option>
                  <option value="4">★★★★☆ (4/5) - Good</option>
                  <option value="3">★★★☆☆ (3/5) - Average</option>
                  <option value="2">★★☆☆☆ (2/5) - Poor</option>
                  <option value="1">★☆☆☆☆ (1/5) - Very poor</option>
                </select>
              </label>
              <label className="field"><span>Your comment / feedback</span><textarea name="comment" value={f.comment} onChange={onChange} required rows={5} placeholder="Tell us about your trip, driver, car condition, punctuality, or any suggestions..." style={{ width: "100%", padding: "12px 14px", borderRadius: "var(--r-sm)", border: "1px solid var(--border-dark)", font: "500 .97rem var(--body)", resize: "vertical" }} /></label>
              <button className="btn btn-sun btn-block" type="submit">Send feedback on WhatsApp</button>
              <p className="small muted" style={{ textAlign: "center" }}>Prefer to call? <a href={`tel:${PHONE_TEL}`} className="link">{PHONE_DISPLAY}</a></p>
            </form>
          </div>
        </div>
      </main>

      <footer className="foot">
        <div className="foot-bottom" style={{ borderTop: 0, paddingTop: 26 }}>
          <span>© {new Date().getFullYear()} Happy Car Travels - Vijayawada. All rights reserved.</span>
          <a href="index.html" className="adminlink">Home</a>
        </div>
      </footer>
    </>
  );
}
