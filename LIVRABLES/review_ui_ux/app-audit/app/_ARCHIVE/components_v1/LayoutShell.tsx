"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { AuditNav } from "./AuditNav";

/**
 * LayoutShell — Manages the two-act layout:
 * 
 * Acte 1 (audit pages): Sidebar + dark editorial + ThemeToggle
 * Acte 2 (/proposition/*): Full-width, no sidebar, immersive
 */
export function LayoutShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isProposition = pathname.startsWith("/proposition/demo");

    if (isProposition) {
        return (
            <div className="proposition-shell">
                {children}
            </div>
        );
    }

    return (
        <>
            <AuditNav />
            <div style={{ marginLeft: 220 }}>
                {children}
            </div>
            <ThemeToggle />
        </>
    );
}
