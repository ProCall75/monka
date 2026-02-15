import React, { useEffect, useState } from "react";

/**
 * Realistic iOS 18 status bar — live clock, signal, WiFi, battery.
 * Renders at the top of the iPhone viewport inside the safe area.
 */
export default function StatusBar() {
    const [time, setTime] = useState(() => {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    });

    useEffect(() => {
        const id = setInterval(() => {
            const now = new Date();
            setTime(`${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`);
        }, 10_000);
        return () => clearInterval(id);
    }, []);

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 54,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                padding: "0 24px 6px",
                zIndex: 100,
                pointerEvents: "none",
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
        >
            {/* Time — left side */}
            <span
                style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#000",
                    letterSpacing: 0.2,
                    lineHeight: 1,
                }}
            >
                {time}
            </span>

            {/* Right side — signal + WiFi + battery */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {/* Cellular signal — 4 bars */}
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                    <rect x="0" y="9" width="3" height="3" rx="0.5" fill="#000" />
                    <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="#000" />
                    <rect x="9" y="3" width="3" height="9" rx="0.5" fill="#000" />
                    <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#000" />
                </svg>

                {/* WiFi */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <path
                        d="M8 11.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
                        fill="#000"
                    />
                    <path
                        d="M5.17 8.33a3.95 3.95 0 015.66 0"
                        stroke="#000"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                    />
                    <path
                        d="M2.84 5.76a7.07 7.07 0 0110.32 0"
                        stroke="#000"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                    />
                    <path
                        d="M.5 3.2a10.18 10.18 0 0115 0"
                        stroke="#000"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                    />
                </svg>

                {/* Battery */}
                <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
                    <rect
                        x="0.5"
                        y="0.5"
                        width="22"
                        height="12"
                        rx="2.5"
                        stroke="#000"
                        strokeOpacity="0.35"
                    />
                    <rect x="2" y="2" width="19" height="9" rx="1.5" fill="#000" />
                    <path
                        d="M24 4.5c.8.3 1.5 1 1.5 2s-.7 1.7-1.5 2"
                        stroke="#000"
                        strokeOpacity="0.4"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    );
}
