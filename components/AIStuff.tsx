import { FinwiseThumb } from "@/components/case/FinwiseCase";
import { ai } from "@/lib/ai";

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

function Visual({ kind }: { kind: string }) {
  if (kind === "pool") {
    return (
      <div className="ai-vis pool" aria-hidden>
        <svg className="pool-map" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="pool-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="400" height="250" fill="url(#pool-grid)" />
          {/* roads out of the airport */}
          <path d="M70 175 C 140 160, 170 120, 250 110 S 340 80, 370 60" className="road" />
          <path d="M70 175 C 150 190, 220 200, 300 190 S 360 170, 380 175" className="road" />
          <path d="M70 175 C 120 120, 150 70, 210 50" className="road" />
          {/* the shared ride */}
          <path d="M70 175 C 140 160, 170 120, 250 110 S 340 80, 370 60" className="route" />
        </svg>
        <span className="pool-airport">✈︎ BLR</span>
        <span className="pool-pin p1" />
        <span className="pool-pin p2" />
        <span className="pool-pin p3" />
        <span className="pool-dest">Indiranagar</span>

        <div className="pool-card">
          <small>6E 6421 · BOM → BLR · Landed</small>
          <b>3 co-passengers heading your way</b>
          <div className="pool-row">
            <span className="av" style={{ background: "#f2a65a" }}>A</span>
            <span className="av" style={{ background: "#7fb8a4" }}>R</span>
            <span className="av" style={{ background: "#a79bf2" }}>S</span>
            <em>₹1,450 → ₹480 each</em>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "finwise") {
    return (
      <div className="ai-vis finwise" aria-hidden>
        <FinwiseThumb />
      </div>
    );
  }
  if (kind === "space") {
    return (
      <div className="ai-vis space" aria-hidden>
        <i className="rock r1" /><i className="rock r2" /><i className="rock r3" /><i className="rock r4" /><i className="rock r5" /><i className="rock r6" />
      </div>
    );
  }
  return (
    <div className="ai-vis tune" aria-hidden>
      <p>
        Your idea, built in <span>days</span>
      </p>
    </div>
  );
}

export default function AIStuff() {
  return (
    <section className="ai" id="ai">
      <div className="ai-inner">
        <div className="ai-head">
          <div>
            <h2>{ai.title}</h2>
            <p>{ai.subtitle}</p>
          </div>
          <a className="ai-all" href="#">
            View all <Arrow />
          </a>
        </div>

        <div className="ai-grid">
          {ai.items.map((it) => (
            <article key={it.title} className="ai-card">
              <div className="ai-media">
                <Visual kind={it.kind} />
                {"status" in it && it.status ? (
                  <span className="ai-status">
                    <i aria-hidden />
                    {it.status}
                  </span>
                ) : (
                  <span className="spark" aria-hidden>✦</span>
                )}
              </div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
              {it.cta ? (
                <a className="ai-btn" href={it.href}>
                  {it.cta} <Arrow />
                </a>
              ) : (
                <span className="ai-wip">Building it now — follow along soon</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
