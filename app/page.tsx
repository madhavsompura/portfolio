import Contact from "@/components/Contact";
import AIStuff from "@/components/AIStuff";
import ThemeBlend from "@/components/ThemeBlend";
import About from "@/components/About";
import HeroArt from "@/components/HeroArt";
import HeroActions from "@/components/HeroActions";
import Journal from "@/components/Journal";
import Work from "@/components/Work";
import HeroCards from "@/components/HeroCards";
import { site } from "@/lib/site";

// A small pill with a company logo (put logo files in /public/logos). With `href` it links to the company site.
function Chip({ children, logo, href, dark = false, mark }: { children: React.ReactNode; logo?: string; href?: string; dark?: boolean; mark?: string }) {
  const inner = (
    <>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="chip-logo" src={logo} alt="" />
      ) : mark ? (
        <i className="chip-mark">{mark}</i>
      ) : (
        <i />
      )}
      {children}
    </>
  );
  const external = !!href && /^https?:/.test(href);
  return href ? (
    <a className={`chip link${dark ? " dark" : ""}`} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <span className={`chip${dark ? " dark" : ""}`}>{inner}</span>
  );
}

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero-top">
          <div className="hero-copy">
            <h1>
              Hi, I&apos;m {site.firstName}.
            </h1>
            <p className="sub">
              Fixing things no one notices, until they do.
              <br />
              Currently product designer at <Chip logo="/logos/stan.png" href="https://getstan.app">Stan</Chip> by day, building{" "}
              <Chip dark mark="₹" href="/work/finwise">Finwise</Chip> by night. Previously at <Chip logo="/logos/nobroker.png" href="https://www.nobroker.in">NoBroker</Chip> and{" "}
              <Chip logo="/logos/kloudspot-mark.png" href="https://kloudspot.ai">Kloudspot India</Chip>.
            </p>
            <HeroActions />
          </div>

          <HeroArt />
        </div>

        <HeroCards />
      </section>

      <About />

      <Work />

      <Journal />

      <AIStuff />
      <Contact />
      <ThemeBlend />
    </main>
  );
}
