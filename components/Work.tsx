import Image from "next/image";
import Link from "next/link";
import NotchedThumb from "@/components/NotchedThumb";
import { workProjects as projects } from "@/lib/projects";
import { rich } from "@/lib/rich";

export default function Work() {
  return (
    <section className="panel work reveal-static" id="work">
      <h2 className="work-title">Some recent work</h2>
      <p className="work-sub">(from full-time jobs)</p>

      <div className="work-grid">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={p.link ?? `/work/${p.slug}`}
            {...(p.link ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="wcard" style={{ "--tint": p.tint } as React.CSSProperties}>
            <div className="thumb-wrap">
              <NotchedThumb style={{ background: p.tint }}>
                {p.thumb ? (
                  <Image className="thumb-img" src={p.thumb} alt="" fill sizes="(max-width: 760px) 92vw, 560px" />
                ) : (
                  <>
                {/* Placeholder device — replace with a real screenshot later. */}
                <div className="device" aria-hidden>
                  <div className="dev-screen" style={{ background: `linear-gradient(160deg, #fff, ${p.colors[0]})` }}>
                    <i /><i /><i /><b style={{ background: p.colors[1] }} />
                  </div>
                </div>
                <span className="blob b1" style={{ background: p.colors[1] }} aria-hidden />
                <span className="blob b2" style={{ background: p.colors[0] }} aria-hidden />
                  </>
                )}
              </NotchedThumb>
              <span className="go" aria-hidden>
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </div>

            <h3>{p.title}</h3>
            <p>{rich(p.blurb)}</p>
            <ul className="tags">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}
