// Edit your projects here. Each one automatically gets its own page at /work/<slug>.
export type ProjectType = "mobile" | "web" | "system";

export type Project = {
  slug: string;
  title: string;
  type: ProjectType;
  tag: string;
  year: string;
  colors: [string, string];
  summary: string;
  blurb: string; // card description, **bold** for highlights
  tags: string[];
  tint: string; // thumbnail background
  thumb?: string; // thumbnail image in /public (replaces the placeholder drawing)
  caseTitle?: string; // longer headline for the case study page
  caseImages?: { src: string; w: number; h: number }[]; // the full case study as image slices, shown after the overview
  inWork?: boolean; // false = has a case-study page but isn't listed in "Some recent work" (e.g. shown under AI Stuff)
  caseKey?: "finwise"; // a case study written as a page component (components/case)
  locked?: boolean; // password protected: cards show a lock and the page asks for the password (set CASE_PASSWORD in .env.local)
  link?: string; // external case study (e.g. a Figma deck) — the card opens this in a new tab
  role: string;
  timeline: string;
  team: string;
  problem: string;
  solution: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "nobroker-rental-agreement",
    title: "NoBroker: Reimagining Rental Agreement",
    type: "mobile",
    tag: "Mobile · Rental Agreements",
    year: "2025",
    colors: ["#dcd8fb", "#2b2160"],
    summary: "Reimagining how people create rental agreements on NoBroker.",
    blurb: "Reimagining how people **create or upload a rental agreement**, tested with **A/B experiments** and powered by AI.",
    tags: ["UX/UI Design", "A/B Testing", "AI Powered"],
    tint: "#dcd8fb",
    thumb: "/work-nobroker-rental.webp",
    link: "https://www.figma.com/deck/zE1EHEqv7M1yDf3VP8Mz3k",
    role: "Product Designer",
    timeline: "2025",
    team: "NoBroker",
    problem: "Full case study coming soon.",
    solution: "Full case study coming soon.",
    outcome: "Full case study coming soon.",
  },
  {
    slug: "nobroker-partner-app",
    title: "NoBroker: Rewamping Partner's App",
    type: "mobile",
    tag: "Mobile · Home Services",
    year: "2025",
    colors: ["#dbe7fb", "#7b6fd0"],
    summary: "Simplifying the partner experience through clarity, transparency, and usability.",
    blurb: "Redesigning the app NoBroker's **home-service partners** use daily, from **leaves to weekly earnings**.",
    tags: ["UX/UI Design", "Gig Worker", "Home Services"],
    tint: "#dbe7fb",
    thumb: "/work-nobroker-partner.webp",
    role: "Interaction Design, Visual Design, Information Architecture, User flow prototyping",
    timeline: "2025",
    team: "Madhav (PD), Priyanshi (PD), Shalvi (HoD)",
    problem: "",
    solution: "",
    outcome: "",
    caseTitle: "NoBroker Partner App: From Complexity to Clarity",
    caseImages: [{"src": "/case/partner-app/full-00.webp", "w": 1600, "h": 2000}, {"src": "/case/partner-app/full-01.webp", "w": 1600, "h": 2000}, {"src": "/case/partner-app/full-02.webp", "w": 1600, "h": 2000}, {"src": "/case/partner-app/full-03.webp", "w": 1600, "h": 2000}, {"src": "/case/partner-app/full-04.webp", "w": 1600, "h": 2000}, {"src": "/case/partner-app/full-05.webp", "w": 1600, "h": 2000}, {"src": "/case/partner-app/full-06.webp", "w": 1600, "h": 2000}, {"src": "/case/partner-app/full-07.webp", "w": 1600, "h": 2000}, {"src": "/case/partner-app/full-08.webp", "w": 1600, "h": 2000}, {"src": "/case/partner-app/full-09.webp", "w": 1600, "h": 1829}],
  },
  {
    slug: "kloudspot-retail-analytics",
    title: "Kloudspot: Retail Analytics",
    type: "web",
    tag: "Web · Retail Analytics",
    year: "2024",
    colors: ["#1d2a33", "#5fd4e0"],
    summary: "An analytics dashboard that helps retailers understand what happens inside their stores.",
    blurb: "An **analytical dashboard** that turns in-store data into insights retailers can act on, built for a **PaaS** platform.",
    tags: ["Analytical Dashboard", "UI/UX Design", "PaaS"],
    tint: "#dbe9ec",
    locked: true,
    thumb: "/work-kloudspot.webp",
    role: "Product Designer",
    timeline: "2024",
    team: "Kloudspot",
    problem: "Full case study coming soon.",
    solution: "Full case study coming soon.",
    outcome: "Full case study coming soon.",
  },
  {
    slug: "nofo",
    title: "NOFO: Inventory Sorting & Wastage Solution",
    type: "mobile",
    tag: "Mobile · Food & Kitchen",
    year: "2024",
    colors: ["#ececec", "#f2a93b"],
    summary: "NOFO, your kitchen buddy: plan meals, sort groceries and use food before it goes to waste.",
    blurb: "A kitchen buddy that sorts your **groceries**, plans **shared meals** and flags what's **expiring soon**, so less food goes to waste.",
    tags: ["UX Design", "UI Design", "Visual Design"],
    tint: "#ececec",
    locked: true,
    thumb: "/work-nofo.webp",
    role: "Product Designer",
    timeline: "2024",
    team: "NOFO",
    problem: "Full case study coming soon.",
    solution: "Full case study coming soon.",
    outcome: "Full case study coming soon.",
  },
  {
    slug: "finwise",
    title: "Finwise: Money tracking that does itself",
    type: "mobile",
    tag: "Mobile · Personal Finance",
    year: "2026",
    colors: ["#FBF7EE", "#4A3F99"],
    summary: "A money tracker that reads the payment alerts your bank already sends, so you only have to confirm.",
    blurb: "Turning bank **SMS and email alerts** into ready-to-confirm expenses, designed and **built by me with AI**.",
    tags: ["Product Design", "Built with AI", "Personal Finance"],
    tint: "#ece8fb",
    role: "Product Strategy, Interaction & Visual Design, Building",
    timeline: "2026 · Ongoing",
    team: "Solo, with AI as a coding partner",
    problem: "",
    solution: "",
    outcome: "",
    caseTitle: "Finwise: Money Tracking That Does Itself",
    caseKey: "finwise",
    inWork: false,
  },
  {
    slug: "iot-security-integration",
    title: "IoT Security Integration",
    type: "system",
    tag: "Product Design · Electronic Device",
    year: "2023",
    colors: ["#2b3a3a", "#5f8f8c"],
    summary: "Designing how a connected security device fits into everyday building access.",
    blurb: "Designing how a **connected security device** fits into everyday access, from the **hardware** to the experience around it.",
    tags: ["Product Design", "Electronic Device", "UX Design"],
    tint: "#dde7e6",
    thumb: "/work-iot.webp",
    role: "Product Designer",
    timeline: "2023",
    team: "",
    problem: "Full case study coming soon.",
    solution: "Full case study coming soon.",
    outcome: "Full case study coming soon.",
  },
  {
    slug: "khoka-next",
    title: "Khoka Next: Personalised Travel",
    type: "mobile",
    tag: "Mobile · Travel",
    year: "2024",
    colors: ["#e9e2d6", "#7a5c3e"],
    summary: "Making trip planning feel personal, built around how each traveller actually explores.",
    blurb: "A **personalised travel** experience shaped by **research** into how people really plan and explore a new place.",
    tags: ["Enhanced Travel", "UX/UI", "Research"],
    tint: "#efe7da",
    thumb: "/work-khoka.webp",
    role: "Product Designer",
    timeline: "2024",
    team: "",
    problem: "Full case study coming soon.",
    solution: "Full case study coming soon.",
    outcome: "Full case study coming soon.",
  },
];

export const gradient = (c: [string, string]) => `linear-gradient(135deg, ${c[0]}, ${c[1]})`;

// The projects listed in "Some recent work".
export const workProjects = projects.filter((p) => p.inWork !== false);
