"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DeviceMockup from "./DeviceMockup";

interface BeforeAfterToggleProps {
    screenshotBefore?: string;
    afterContent?: React.ReactNode;
    screenName: string;
}

export default function BeforeAfterToggle({
    screenshotBefore,
    afterContent,
}: BeforeAfterToggleProps) {
    const [showAfter, setShowAfter] = useState(false);

    return (
        <div className="flex flex-col items-center gap-5">
            {/* Toggle — Pragma clean style */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 6,
                    border: "1px solid var(--border-default)",
                    background: "var(--bg-white)",
                    overflow: "hidden",
                    width: 220,
                }}
            >
                <button
                    onClick={() => setShowAfter(false)}
                    style={{
                        flex: 1,
                        padding: "8px 0",
                        fontSize: 13,
                        fontWeight: !showAfter ? 600 : 400,
                        border: "none",
                        cursor: "pointer",
                        background: !showAfter ? "var(--status-orange-bg)" : "transparent",
                        color: !showAfter ? "var(--status-orange)" : "var(--text-tertiary)",
                        transition: "all 0.2s ease",
                    }}
                >
                    Avant
                </button>
                <div style={{ width: 1, height: 20, background: "var(--border-light)" }} />
                <button
                    onClick={() => setShowAfter(true)}
                    style={{
                        flex: 1,
                        padding: "8px 0",
                        fontSize: 13,
                        fontWeight: showAfter ? 600 : 400,
                        border: "none",
                        cursor: "pointer",
                        background: showAfter ? "var(--status-green-bg)" : "transparent",
                        color: showAfter ? "var(--status-green)" : "var(--text-tertiary)",
                        transition: "all 0.2s ease",
                    }}
                >
                    Après
                </button>
            </div>

            {/* Device Mockup with transition */}
            <AnimatePresence mode="wait">
                {showAfter ? (
                    <motion.div
                        key="after"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <DeviceMockup label="after">{afterContent}</DeviceMockup>
                    </motion.div>
                ) : (
                    <motion.div
                        key="before"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <DeviceMockup screenshot={screenshotBefore} label="before" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
