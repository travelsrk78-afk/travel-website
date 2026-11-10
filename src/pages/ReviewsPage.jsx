import { REVIEWS, WA, PHONE_TEL, PHONE_DISPLAY } from "../data.js";

const initials = n => n.split(" ").map(x => x[0]).slice(0, 2).join("").toUpperCase();

export default function ReviewsPage() {
  return (
    <>
      <header className="nav-wrap">
        <nav className="nav">
          <a className="brand" href="index.html">
            <img className="brand-logo" src={`${import.meta.env.BASE_URL}happy-car-travels-badge.png`} alt="Happy Car Travels - Vijayawada logo" width="44" height="44" />
            <span className="brand-text"><span className="brand-name">Happy Car Travels</span><span className="brand-tag">Vijayawada · Customer Reviews</span></span>
          </a>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn btn-sun btn-sm" href="feedback.html">Leave a review</a>
            <a className="btn btn-ghost btn-sm" href="index.html">Back to site</a>
          </div>
        </nav>
      </header>

      <main className="wrap" style={{ paddingBlock: "clamp(40px,6vw,72px)" }}>
        <p className="eyebrow">Customer reviews</p>
        <h1 className="sec-title" style={{ maxWidth: "none", fontSize: "clamp(2rem,4vw,3rem)" }}>What riders say about Happy Car Travels</h1>
        <p className="sec-sub">4.9 out of 5 from 247 verified reviews. Here are experiences shared by our customers across Vijayawada, Hyderabad, Tirupati and more.</p>

        <div className="reviews" style={{ marginTop: 28 }}>
          {REVIEWS.map(([q, n, w], i) => (
            <blockquote key={n + i} className="card">
              <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
              <p>{q}</p>
              <footer><span className="avatar">{initials(n)}</span><span><b>{n}</b>{w}</span></footer>
            </blockquote>
          ))}
        </div>

        <div className="panel" style={{ marginTop: 32, textAlign: "center" }}>
          <h2 className="sec-title" style={{ fontSize: "1.6rem" }}>Travelled with us?</h2>
          <p className="sec-sub" style={{ marginInline: "auto" }}>Scan the feedback QR or tap below to share your experience. Your review helps other travellers.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 18 }}>
            <a className="btn btn-sun" href="feedback.html">Share feedback / review</a>
            <a className="btn btn-ghost" href={`tel:${PHONE_TEL}`}>Call {PHONE_DISPLAY}</a>
            <a className="btn btn-ghost" href={`https://wa.me/${WA}`} target="_blank" rel="noopener">WhatsApp us</a>
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
