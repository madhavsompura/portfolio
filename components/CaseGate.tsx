"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordGate from "@/components/PasswordGate";

// Shown in place of a locked case study (e.g. when someone opens the link directly).
export default function CaseGate({ title }: { title: string }) {
  const router = useRouter();
  return (
    <main id="top" className="case container pw-page">
      <Link href="/#work" className="back-link">← All work</Link>
      <div className="pw-card static">
        <PasswordGate title={title} onUnlocked={() => router.refresh()} />
      </div>
    </main>
  );
}
