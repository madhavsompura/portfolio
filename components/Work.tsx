import Image from "next/image";
import Link from "next/link";
import LockedCard from "@/components/LockedCard";
import NotchedThumb from "@/components/NotchedThumb";
import { workProjects as projects } from "@/lib/projects";
import { rich } from "@/lib/rich";

export default function Work() {
  return (
    <section className="panel work reveal-static" id="work">
      <h2 className="work-title">Some recent work</h2>
      <p className="work-sub">(from full-time jobs)</p>

      <div className="work-grid">
        {projects.map((p) => {
          const body = (
            <>
              <div className="thumb-wrap">
                <NotchedThumb style={{ background: p.tint }}>
                  {p.thumb ? (
                    <Image className="thumb-img" src={p.thumb} alt="" fill sizes="(max-width: 760px) 92vw, 560px" />
                  ) : (
                    <>
                      {/* Placeholder device, replace with a real screenshot later. */}
                      <div className="device" aria-hidden>
                        <div className="dev-screen" style={{ background: `linear-gradient(160deg, #fff, ${p.colors[0]})` }}>
                          <i /><i /><i /><b style={{ background: p.colors[1] }} />
                        </div>
                      </div>
                      <span className="blob b1" style={{ background: p.colors[1] }} aria-hidden />
                      <span className="blob b2" style={{ background: p.colors[0] }} aria-hidden />
                    </>
                  )}
                  {p.locked && (
                    <span className="lock-veil" aria-hidden>
                      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
                        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
                      </svg>
                      Password protected
                    </span>
                  )}
                </NotchedThumb>
                <span className="go" aria-hidden>
                  {p.locked ? (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="10.5" width="14" height="9.5" rx="2.4" />
                      <path d="M8.2 10.5V8.2a3.8 3.8 0 0 1 7.6 0v2.3" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  )}
                </span>
              </div>

              <h3>{p.title}</h3>
              <p>{rich(p.blurb)}</p>
              <ul className="tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </>
          );
          const style = { "--tint": p.tint } as React.CSSProperties;

          if (p.locked)
            return (
              <LockedCard key={p.slug} slug={p.slug} title={p.title} style={style}>
                {body}
              </LockedCard>
            );
          return (
            <Link
              key={p.slug}
              href={p.link ?? `/work/${p.slug}`}
              {...(p.link ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="wcard"
              style={style}
            >
              {body}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
