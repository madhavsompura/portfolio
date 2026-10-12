// "AI Stuff" cards — products built with AI. `status` shows a badge (e.g. still being built); no `cta` = no button.
export const ai = {
  title: "AI Stuff",
  subtitle: "Some products I built in collaboration with AI",
  items: [
    {
      title: "Finwise — Money tracking that does itself",
      desc: "Reads the payment alerts your bank already sends and turns each one into a ready-to-confirm expense. Designed and built by me, with AI as my pair.",
      cta: "Read case study",
      href: "/work/finwise",
      kind: "finwise",
    },
    {
      title: "SameFlight — Airport cab pooling",
      desc: "Around 200 people land on the same flight, and a few are always heading your way. SameFlight matches co-passengers going to the same area, so nobody pays for an expensive cab alone.",
      cta: "",
      href: "",
      kind: "pool",
      status: "In development",
    },
  ],
};
