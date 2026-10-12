// The interactive objects in the hero illustration. On hover each one comes up toward you and its
// screen shows a project. To use real UI, set `screenshot` to an image in /public and `href` to the link.
// The orange desk spans this band of the artwork (fractions of its height) — the hero text centres on it.
export const deskBand = { top: 0.0145, height: 0.57 };

export const art = {
  base: "/hero-base-v10.webp", // the illustration with the monitor, phone, laptop, coffee, cat, notepad and right arm removed
  width: 1400,
  height: 1384,
  alt: "Illustration of a designer working at their desk",
};

export type HeroObject = {
  id: "monitor" | "phone" | "laptop" | "notepad";
  title: string; // project name (also used for accessibility)
  cta: string; // button text on the screen
  href: string; // where clicking the screen goes (the case study)
  newTab: boolean;
  screenshot: string; // "" = show the placeholder UI
  box: { x: number; y: number; w: number; h: number }; // px of the 1400×1384 artwork
  scale: number; // how far it comes toward you
  lift: number; // px it rises while open
  straighten: number; // degrees it rotates while open (to stand a tilted object upright)
  drift: number; // px it can follow the mouse
  origin: string; // transform-origin
  ui: { left: number; top: number; width: number; height: number; rotate: number }; // % of box, degrees
  full?: string; // original cut-out (shown while closed, fades out when open)
  frame?: string; // frame with the screen cut out (none for the notepad)
  idle?: { src: string; w: number; h: number; rect: { x: number; y: number; w: number; h: number } };
  hit?: [number, number][]; // clickable outline, % of box (default: the whole box)
  chip: string; // CSS size of the CTA text on the screen
  note: { text: string; x: number; y: number; arrow: "down-right" | "down-left" | "up-right" | "up-left" | "up"; w?: number }; // handwritten hint: x in % and y in cqw of the artwork
};

export const objects: HeroObject[] = [
  {
    id: "monitor",
    title: "Your current project",
    cta: "View project",
    href: "#",
    newTab: false,
    screenshot: "",
    box: { x: 343, y: 18, w: 623, h: 327.5 },
    scale: 1.4,
    lift: -6,
    straighten: 0,
    drift: 9,
    origin: "50% 20%",
    ui: { left: 1.97, top: 7.8, width: 93.1, height: 63.3, rotate: 0 },
    frame: "/hero-monitor-v3.webp",
    idle: { src: "/hero-screen-v3.webp", w: 1135, h: 395, rect: { x: 2.97, y: 9.313, w: 91.091, h: 60.305 } },
    chip: "4.3cqw",
    note: { text: "Peek at what I'm building right now", x: 40, y: -17, arrow: "down-left" },
  },
  {
    id: "phone",
    title: "Finance tracker",
    cta: "View case study",
    href: "/work/finwise",
    newTab: false,
    screenshot: "",
    box: { x: 291.5, y: 272.5, w: 166, h: 244 },
    scale: 2.4,
    lift: -4,
    straighten: -12.35,
    drift: 6,
    origin: "50% 50%",
    ui: { left: 15.52, top: 5.92, width: 68.6, height: 87.5, rotate: 12.35 },
    full: "/hero-phone-full-v3.webp",
    frame: "/hero-phone-frame-v3.webp",
    hit: [
      [-0.49, 89.21],
      [71.07, 99.87],
      [99.94, 10.19],
      [28.38, -0.47],
    ],
    chip: "8cqw",
    note: { text: "Check out my money tracker", x: 2, y: -17, arrow: "down-right" },
  },
  {
    id: "laptop",
    title: "NoBroker rental agreement",
    cta: "View case study",
    href: "https://www.figma.com/deck/zE1EHEqv7M1yDf3VP8Mz3k",
    newTab: true,
    screenshot: "/nobroker-screen-v3.webp",
    box: { x: 1004, y: 45.5, w: 354, h: 414 },
    scale: 1.65,
    lift: -4,
    straighten: 7.96,
    drift: 7,
    origin: "85% 30%",
    ui: { left: 4.91, top: 5.71, width: 82.34, height: 44.2, rotate: -7.96 },
    full: "/hero-laptop-full.webp",
    frame: "/hero-laptop-frame.webp",
    hit: [[93.93, 89.86], [18.64, 98.79], [15.82, 98.43], [14.83, 97.1], [14.27, 95.53], [13.7, 93.12], [2.54, 23.19], [2.12, 20.53], [1.13, 13.53], [1.27, 12.08], [2.26, 10.87], [2.68, 10.63], [6.36, 9.9], [19.77, 8.09], [67.23, 2.42], [80.37, 0.97], [82.2, 1.09], [83.62, 1.93], [84.75, 3.14], [85.17, 4.11], [95.9, 68.84], [96.47, 72.34], [97.18, 76.93], [97.88, 81.64], [98.31, 85.51], [98.16, 87.68], [97.74, 88.77]],
    chip: "4.6cqw",
    note: { text: "My NoBroker rental flow", x: 56, y: -24.5, arrow: "down-right" },
  },
  {
    id: "notepad",
    title: "Write me a note",
    cta: "Send",
    href: "#",
    newTab: false,
    screenshot: "",
    box: { x: 22, y: 657, w: 319, h: 198 },
    scale: 3,
    lift: -4,
    straighten: 2.74,
    drift: 0,
    origin: "18% 85%",
    ui: { left: 2.6, top: 9.8, width: 88.46, height: 82.08, rotate: -2.74 },
    full: "/hero-notepad.webp",
    hit: [[2.19, 84.85], [1.88, 79.29], [2.51, 24.24], [3.76, 21.21], [96.24, 2.53], [96.87, 4.55], [91.22, 75.25], [89.34, 82.32], [81.5, 84.85], [57.37, 89.39], [7.52, 96.97], [6.9, 96.46]],
    chip: "5cqw",
    note: { text: "Want to say hello? Write me a note here!", x: 2, y: 67, w: 27, arrow: "up" },
  },
];

// Playful objects with no screen: they wiggle and throw sparkles / hearts on hover.
export type Critter = {
  id: "coffee" | "cat";
  label: string;
  box: { x: number; y: number; w: number; h: number }; // px of the artwork
  hit: [number, number][]; // clickable outline, % of box
  layers: { src: string; w: number; h: number; left: number; top: number; width: number; height: number; role: "cup" | "steam" | "cat" }[]; // % of box
  bits: string[]; // little things that fly out
  note: { text: string; x: number; y: number; w?: number; arrow: "up" | "up-right" | "up-left" | "down-right" | "down-left" };
};

export const critters: Critter[] = [
  {
    id: "coffee",
    label: "Coorg estate coffee",
    box: { x: 36.5, y: 299, w: 230.5, h: 376 },
    hit: [[40.56, 15.69], [53.8, 0.8], [55.53, 1.06], [79.61, 15.43], [80.48, 16.22], [98.05, 72.61], [98.48, 76.46], [98.05, 78.19], [97.18, 81.12], [95.88, 84.31], [95.44, 84.84], [93.49, 87.1], [92.41, 88.3], [90.89, 89.63], [87.2, 92.69], [85.68, 93.62], [80.48, 96.14], [75.05, 98.01], [69.85, 98.94], [68.11, 99.07], [49.24, 99.07], [44.69, 98.94], [13.02, 96.01], [9.98, 95.61], [6.07, 94.02], [3.25, 91.62], [1.95, 89.23], [1.52, 87.77], [1.3, 85.24], [1.3, 85.11], [1.95, 82.58]],
    layers: [
      { src: "/hero-cup.webp", w: 461, h: 374, left: 0, top: 50.4, width: 100, height: 49.6, role: "cup" },
      { src: "/hero-steam.webp", w: 203, h: 231, left: 37.74, top: 0, width: 44.04, height: 61.44, role: "steam" },
    ],
    bits: ["✦", "☕", "✦", "✧", "☕"],
    note: { text: "Currently brewing local Coorg estate coffee", x: 1, y: 51, arrow: "up-right" },
  },
  {
    id: "cat",
    label: "Chiku the cat",
    box: { x: 1085, y: 489, w: 293, h: 316.5 },
    hit: [[40.61, 98.74], [29.01, 92.73], [12.97, 81.2], [11.95, 80.25], [11.26, 79.46], [8.7, 76.46], [6.83, 73.93], [6.31, 73.14], [3.92, 69.35], [3.07, 66.67], [2.39, 64.45], [1.19, 59.4], [1.02, 56.4], [1.02, 47.08], [2.05, 42.02], [2.9, 37.91], [3.24, 36.33], [5.97, 30.33], [9.9, 24.17], [10.41, 23.38], [14.33, 18.8], [15.87, 17.22], [16.38, 16.75], [20.48, 13.11], [23.89, 10.58], [30.38, 6.79], [35.49, 4.42], [43.69, 2.05], [45.9, 1.58], [50.68, 0.95], [56.83, 1.26], [59.9, 1.74], [67.92, 4.11], [71.5, 5.85], [72.35, 6.32], [75.26, 8.21], [77.82, 9.95], [90.44, 19.75], [94.37, 24.64], [96.76, 28.44], [97.61, 31.28], [98.12, 34.44], [98.46, 36.65], [98.81, 39.97], [97.95, 44.71], [97.1, 47.71], [92.66, 61.45], [91.64, 64.14], [88.91, 67.14], [88.05, 67.77], [45.56, 97.16], [44.37, 97.95], [42.83, 98.42]],
    layers: [{ src: "/hero-cat.webp", w: 586, h: 633, left: 0, top: 0, width: 100, height: 100, role: "cat" }],
    bits: ["♥", "♥", "♡", "♥", "♡"],
    note: { text: "Say hi to Chiku!", x: 72, y: 63, w: 28, arrow: "up" },
  },
];

// The person at the desk: always moving. The right arm (sleeve, hand and mouse) swings about the shoulder
// to move the mouse; the left hand taps the keyboard. Boxes are px of the 1400×1384 artwork.
export const alive = {
  arm: { src: "/hero-arm-r5.webp", box: { x: 909, y: 505, w: 131, h: 336 }, w: 131, h: 336, origin: "50.4% 95.5%" },
  hand: { src: "/hero-hand-l5.webp", box: { x: 572, y: 570, w: 120, h: 138 }, w: 120, h: 138, origin: "42.5% 97.8%" },
};

// The line that tells visitors the desk is interactive.
export const deskHint = { text: "Psst! Hover over things on my desk", x: 0, y: -16, w: 32, arrow: "down-right" as const };
