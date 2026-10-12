// ---------- Edit your projects here ----------
const projects = [
  {
    title: "Finwise — Money app",
    type: "mobile",
    tag: "Mobile · Fintech",
    year: "2025",
    colors: ["#c7c0ff", "#8b7fff"],
    summary: "A budgeting app that makes saving feel effortless for first-time earners.",
    role: "Lead Product Designer",
    timeline: "4 months",
    team: "1 PM, 4 Eng",
    problem: "Young users abandoned existing budgeting tools within a week because setup felt like homework.",
    solution: "Redesigned onboarding into a 60-second flow, introduced goal-based buckets, and added gentle nudges instead of dense charts.",
    outcome: "Day-7 retention rose from 22% to 41% and average weekly sessions doubled."
  },
  {
    title: "Pulse — Health dashboard",
    type: "web",
    tag: "Web · Healthcare",
    year: "2025",
    colors: ["#ffd1c2", "#ff8f70"],
    summary: "A clinician dashboard that surfaces what matters at a glance.",
    role: "Senior Product Designer",
    timeline: "6 months",
    team: "2 Designers, 6 Eng",
    problem: "Nurses switched between five tools to see one patient's status, causing delays and errors.",
    solution: "Unified patient timeline with priority alerts, keyboard shortcuts and a calm, high-contrast UI.",
    outcome: "Time-to-decision down 35% and satisfaction score up to 4.6/5."
  },
  {
    title: "Atlas Design System",
    type: "system",
    tag: "Design system · SaaS",
    year: "2024",
    colors: ["#bfe9d6", "#4fc79a"],
    summary: "A token-based design system shared by 8 product teams.",
    role: "Design Systems Designer",
    timeline: "9 months",
    team: "2 Designers, 3 Eng",
    problem: "Inconsistent UI and duplicated components slowed teams and hurt quality.",
    solution: "Built tokens, 60+ accessible components, documentation and contribution workflows.",
    outcome: "Design-to-dev handoff time cut by 50% and UI inconsistencies dropped by 80%."
  },
  {
    title: "Wander — Travel planner",
    type: "mobile",
    tag: "Mobile · Travel",
    year: "2024",
    colors: ["#ffe3a3", "#ffb938"],
    summary: "Collaborative trip planning that keeps friends in sync.",
    role: "Product Designer",
    timeline: "3 months",
    team: "1 PM, 3 Eng",
    problem: "Group trips lived across chats, docs and screenshots — nobody knew the plan.",
    solution: "A shared itinerary with voting, live updates and offline access.",
    outcome: "Reached 50k users in 3 months with a 4.8★ store rating."
  }
];

// ---------- Helpers ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const root = document.documentElement;

// ---------- Theme ----------
const stored = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = stored || (prefersDark ? "dark" : "light");
$("#themeToggle").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
});

// ---------- Nav ----------
const nav = $("#nav"), links = $("#navLinks"), menuBtn = $("#menuBtn");
const setMenu = open => {
  links.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  document.body.classList.toggle("lock", open);
};
menuBtn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
$$("a", links).forEach(a => a.addEventListener("click", () => setMenu(false)));
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 8), { passive: true });

// Highlight active section link
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      $$("a", links).forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => spy.observe(s));

// ---------- Projects grid ----------
const grid = $("#grid");
const gradient = c => `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
grid.innerHTML = projects.map((p, i) => `
  <button class="card" data-type="${p.type}" data-i="${i}" aria-label="Open case study: ${p.title}">
    <div class="thumb" style="background:${gradient(p.colors)}">
      <div class="mock"><i></i><i></i><i></i><i></i></div>
    </div>
    <div class="card-meta">
      <div><h3>${p.title}</h3><p>${p.tag}</p></div>
      <span class="arrow">↗</span>
    </div>
  </button>`).join("");

$$(".chip").forEach(chip => chip.addEventListener("click", () => {
  $$(".chip").forEach(c => c.classList.toggle("active", c === chip));
  const f = chip.dataset.filter;
  $$(".card", grid).forEach(card => {
    const show = f === "all" || card.dataset.type === f;
    card.classList.toggle("hide", !show);
    if (show) { card.style.animation = "none"; card.offsetWidth; card.style.animation = ""; }
  });
}));

// ---------- Modal ----------
const modal = $("#modal");
let lastFocus;
const openModal = i => {
  const p = projects[i];
  $("#mHero").style.background = gradient(p.colors);
  $("#mHero").innerHTML = '<div class="mock"></div>';
  $("#mMeta").textContent = `${p.tag} · ${p.year}`;
  $("#mTitle").textContent = p.title;
  $("#mSummary").textContent = p.summary;
  $("#mFacts").innerHTML = [["Role", p.role], ["Timeline", p.timeline], ["Team", p.team]]
    .map(([k, v]) => `<div><span>${k}</span><strong>${v}</strong></div>`).join("");
  $("#mProblem").textContent = p.problem;
  $("#mSolution").textContent = p.solution;
  $("#mOutcome").textContent = p.outcome;
  lastFocus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("lock");
  $(".modal-close").focus();
};
const closeModal = () => {
  modal.hidden = true;
  document.body.classList.remove("lock");
  lastFocus && lastFocus.focus();
};
grid.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) openModal(+card.dataset.i);
});
modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });
addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

// ---------- Scroll reveal ----------
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.12 });
$$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });

$("#year").textContent = new Date().getFullYear();
