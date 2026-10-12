import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Kaushan_Script, Caveat, Pinyon_Script } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import { site } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const script = Kaushan_Script({ subsets: ["latin"], weight: "400", variable: "--font-script" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });
const cover = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-cover" });

export const metadata: Metadata = {
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#f6f4ef" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${script.variable} ${hand.variable} ${cover.variable}`}>
      <body>
        <CustomCursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
