// About section content.

// Story tab: the full version.
export const story: string[] = [
  "It started with spaces. I studied Design at CEPT University, where I became fascinated by how a space can guide you, how small details can change the way something feels. But it actually happened during my ethnography classes, where we were told to study behaviour of humans and somehow i ended up studying the digital spaces of human and how are they interacting with them, from that day i have always tried to connect spaces with digital experience in all my design, that curiosity eventually led me to UX. I moved from designing physical environments to designing digital ones at IIT Guwahati. Now lately i am learning to code with help of AI so that i can turn ideas into working product myself.",
];

// TL;DR tab: the same text, with the skippable parts struck through. Wrap a phrase in ~~double tildes~~ to strike it.
export const tldr: string[] = [
  "It started with spaces. ~~I studied Design at CEPT University, where I~~ became fascinated by how a space can guide you~~, how small details can change the way something feels~~. But it actually happened during my ethnography classes, ~~where we were told to study behaviour of humans and somehow~~ i ended up studying the digital spaces of human and how are they interacting with them,~~ from that day i have always tried to connect spaces with digital experience in all my design,~~ that curiosity eventually led me to UX.~~ I moved from designing physical environments to~~ designing digital ones at IIT Guwahati. ~~Now lately i am learning to code~~ with help of AI so that i can turn ideas into working product myself.",
];

// Oldest first — the last entry is shown as "now" (green dot).
export const timeline: { year: string; title: string; desc: string }[] = [
  { year: "2016", title: "Design @ CEPT University", desc: "Studied design and got fascinated by how a space can guide you." },
  { year: "2021", title: "Ethnography class", desc: "Set out to study how people behave, ended up studying their digital spaces." },
  { year: "2023", title: "IIT Guwahati", desc: "Moved from designing physical environments to designing digital ones." },
  { year: "2024", title: "Kloudspot India", desc: "Product design internship, my first time designing for real users." },
  { year: "2025", title: "Product Designer @ NoBroker", desc: "Built the Partner app and headed the Home Services vertical." },
  { year: "2026", title: "Product Designer @ Stan", desc: "Where I'm designing now." },
];

export const notes: { emoji: string; label: string; value: string; tone: string; href?: string }[] = [
  { emoji: "📍", label: "Based in", value: "Bangalore, India", tone: "peach" },
  { emoji: "✏️", label: "Currently designing", value: "Finwise", tone: "lilac", href: "/work/finwise" },
  { emoji: "⚡", label: "Learning", value: "Turning ideas into working models", tone: "sky" },
  { emoji: "☕", label: "Off the clock", value: "Running, chasing coffee, chasing sunsets", tone: "mint" },
];
