import type { ReactNode } from "react";

// Turns **bold** into <strong> and ~~struck~~ into <s>.
export function rich(text: string): ReactNode {
  return text.split(/(\*\*.+?\*\*|~~.+?~~)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("~~") && part.endsWith("~~")) return <s key={i}>{part.slice(2, -2)}</s>;
    return part;
  });
}
