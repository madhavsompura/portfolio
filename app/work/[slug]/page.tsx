import type { Metadata } from "next";
import Image from "next/image";
import FinwiseCase, { FinwiseShowcase } from "@/components/case/FinwiseCase";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { gradient, projects } from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();

  const p = projects[i];
  if (p.link) redirect(p.link); // case study lives elsewhere (e.g. a Figma deck)
  const listed = projects.filter((x) => x.inWork !== false);
  const k = listed.findIndex((x) => x.slug === p.slug);
  const next = listed[(k + 1) % listed.length]; // after an unlisted one (k = -1) this is the first project

  return (
    <main id="top" className="case container">
      <Link href="/#work" className="back-link">← All work</Link>

      <p className="eyebrow">{p.tag} · {p.year}</p>
      <h1 className="case-title">{p.caseTitle ?? p.title}</h1>
      <p className="lede">{p.summary}</p>

      {p.caseKey === "finwise" ? (
        <div className="case-hero fw-hero-bg">
          <FinwiseShowcase />
        </div>
      ) : p.thumb ? (
        <div className="case-hero img">
          <Image src={p.thumb} alt="" fill priority sizes="(max-width: 980px) 100vw, 980px" style={{ objectFit: "cover" }} />
        </div>
      ) : (
        <div className="case-hero" style={{ background: gradient(p.colors) }}>
          <div className="mock" />
        </div>
      )}

      <div className="facts">
        <div><span>Role</span><strong>{p.role}</strong></div>
        <div><span>Timeline</span><strong>{p.timeline}</strong></div>
        <div><span>Team</span><strong>{p.team}</strong></div>
      </div>

      {p.caseKey === "finwise" ? (
        <FinwiseCase />
      ) : p.caseImages ? (
        <div className="case-full">
          {p.caseImages.map((t, k) => (
            <Image key={t.src} src={t.src} alt={k === 0 ? `${p.title} case study` : ""} width={t.w} height={t.h} sizes="(max-width: 1100px) 100vw, 1100px" priority={k === 0} />
          ))}
        </div>
      ) : (
        <div className="case-body">
          <h2>The problem</h2>
          <p>{p.problem}</p>
          <h2>What I did</h2>
          <p>{p.solution}</p>
          <h2>Outcome</h2>
          <p>{p.outcome}</p>
        </div>
      )}

      <Link href={`/work/${next.slug}`} className="next-project">
        <span>Next project</span>
        <strong>{next.title} ↗</strong>
      </Link>
    </main>
  );
}
