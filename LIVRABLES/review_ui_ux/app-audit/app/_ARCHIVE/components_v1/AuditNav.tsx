"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
    { num: "01", label: "Persona", href: "/persona", part: 1 },
    { num: "02", label: "Diagnostic", href: "/diagnostic", part: 1 },
    { num: "03", label: "Inventaire", href: "/inventaire", part: 2 },
    { num: "04", label: "Méthodologie", href: "/methodologie", part: 2 },
    { num: "05", label: "Proposition", href: "/proposition", part: 3 },
    { num: "06", label: "Parcours", href: "/parcours", part: 3 },
];

const partLabels: Record<number, string> = {
    1: "Partie 1 — Comprendre",
    2: "Partie 2 — Analyser",
    3: "Partie 3 — Proposer",
};

export function AuditNav() {
    const pathname = usePathname();
    const currentIdx = sections.findIndex((s) => pathname.startsWith(s.href));
    const isHome = pathname === "/";

    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: 220,
                zIndex: 50,
                background: "var(--bg-white)",
                borderRight: "1px solid var(--border-light)",
                display: "flex",
                flexDirection: "column",
                padding: "20px 0",
                overflowY: "auto",
            }}
        >
            {/* Logo / Home */}
            <Link
                href="/"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "0 20px",
                    marginBottom: 28,
                    textDecoration: "none",
                    color: "var(--text-primary)",
                }}
            >
                <span
                    style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        background: "var(--pragma-purple)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: 13,
                        fontWeight: 700,
                    }}
                >
                    P
                </span>
                <div>
                    <p style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>Review UX</p>
                    <p style={{ fontSize: 10, color: "var(--text-tertiary)", lineHeight: 1.2 }}>MyMonka · Pragma</p>
                </div>
            </Link>

            {/* Dynamic sections */}
            {[1, 2, 3].map((part) => (
                <div key={part}>
                    <p
                        style={{
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "1.5px",
                            textTransform: "uppercase" as const,
                            color: "var(--text-tertiary)",
                            padding: "0 20px",
                            marginTop: part === 1 ? 0 : 20,
                            marginBottom: 6,
                        }}
                    >
                        {partLabels[part]}
                    </p>
                    {sections
                        .filter((s) => s.part === part)
                        .map((s) => {
                            const isActive = pathname.startsWith(s.href);
                            return (
                                <Link
                                    key={s.href}
                                    href={s.href}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        padding: "9px 20px",
                                        textDecoration: "none",
                                        fontSize: 13,
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? "var(--pragma-purple)" : "var(--text-secondary)",
                                        background: isActive ? "var(--pragma-purple-subtle)" : "transparent",
                                        borderLeft: isActive ? "2px solid var(--pragma-purple)" : "2px solid transparent",
                                        transition: "all 0.15s",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 11,
                                            fontVariantNumeric: "tabular-nums",
                                            color: isActive ? "var(--pragma-purple)" : "var(--text-tertiary)",
                                            minWidth: 18,
                                        }}
                                    >
                                        {s.num}
                                    </span>
                                    {s.label}
                                </Link>
                            );
                        })}
                </div>
            ))}

            {/* Demo CTA */}
            <div style={{ padding: "16px 20px", marginTop: 16 }}>
                <Link
                    href="/proposition/demo"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 14px",
                        borderRadius: 8,
                        background: pathname.startsWith("/proposition/demo")
                            ? "var(--pragma-purple)"
                            : "linear-gradient(135deg, #1A1330, #2D1F5E)",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "all 0.2s",
                    }}
                >
                    <span style={{ fontSize: 14 }}>⚡</span>
                    Entrer dans l&apos;app
                </Link>
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Progress */}
            <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" as const, color: "var(--text-tertiary)" }}>
                        Progression
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 600, color: "var(--pragma-purple)" }}>
                        {isHome ? "0" : currentIdx >= 0 ? currentIdx + 1 : 0}/{sections.length}
                    </span>
                </div>
                <div style={{ height: 3, background: "var(--border-light)", borderRadius: 2 }}>
                    <div
                        style={{
                            height: "100%",
                            width: `${isHome ? 0 : currentIdx >= 0 ? ((currentIdx + 1) / sections.length) * 100 : 0}%`,
                            background: "var(--pragma-purple)",
                            borderRadius: 2,
                            transition: "width 0.3s ease",
                        }}
                    />
                </div>
            </div>

            {/* Footer */}
            <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border-light)" }}>
                <p style={{ fontSize: 10, color: "var(--text-tertiary)" }}>Pragma · Confidentiel</p>
                <p style={{ fontSize: 10, color: "var(--text-tertiary)" }}>Février 2026</p>
            </div>
        </nav>
    );
}
