"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("pragma-theme");
        if (saved === "dark") {
            setDark(true);
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        if (next) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("pragma-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("pragma-theme", "light");
        }
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            style={{
                position: "fixed",
                bottom: 16,
                left: 180,
                zIndex: 9999,
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid var(--border-default)",
                background: "var(--bg-white)",
                color: "var(--text-secondary)",
                fontSize: 18,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "var(--shadow-md)",
                transition: "all 0.2s",
            }}
        >
            {dark ? "☀️" : "🌙"}
        </button>
    );
}
