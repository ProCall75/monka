"use client";

import React from "react";

interface DeviceMockupProps {
    children?: React.ReactNode;
    screenshot?: string;
    label?: "before" | "after";
}

export default function DeviceMockup({
    children,
    screenshot,
    label,
}: DeviceMockupProps) {
    return (
        <div className="flex flex-col items-center gap-3">
            {label && (
                <span className={label === "before" ? "label-before" : "label-after"}>
                    {label === "before" ? "Monka actuel" : "Version proposée"}
                </span>
            )}
            {/* iPhone 15 Pro frame */}
            <div
                className="relative"
                style={{
                    width: 280,
                    height: 572,
                    borderRadius: 44,
                    background: "linear-gradient(145deg, #2A2A2E, #1A1A1E)",
                    padding: 4,
                    boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
            >
                {/* Side button (right) */}
                <div
                    style={{
                        position: "absolute",
                        right: -2,
                        top: 120,
                        width: 3,
                        height: 48,
                        background: "#2A2A2E",
                        borderRadius: "0 2px 2px 0",
                    }}
                />
                {/* Volume buttons (left) */}
                <div
                    style={{
                        position: "absolute",
                        left: -2,
                        top: 100,
                        width: 3,
                        height: 28,
                        background: "#2A2A2E",
                        borderRadius: "2px 0 0 2px",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        left: -2,
                        top: 140,
                        width: 3,
                        height: 28,
                        background: "#2A2A2E",
                        borderRadius: "2px 0 0 2px",
                    }}
                />

                {/* Screen bezel */}
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 40,
                        background: "#000",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    {/* Dynamic Island */}
                    <div
                        style={{
                            position: "absolute",
                            top: 10,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 90,
                            height: 26,
                            background: "#000",
                            borderRadius: 20,
                            zIndex: 50,
                        }}
                    />

                    {/* Status bar */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 44,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0 20px",
                            zIndex: 40,
                            color: "white",
                            fontSize: 12,
                            fontWeight: 600,
                        }}
                    >
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                            {/* Signal */}
                            <svg width="14" height="10" viewBox="0 0 14 10" fill="white">
                                <rect x="0" y="6" width="2.5" height="4" rx="0.5" />
                                <rect x="3.5" y="4" width="2.5" height="6" rx="0.5" />
                                <rect x="7" y="2" width="2.5" height="8" rx="0.5" />
                                <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" />
                            </svg>
                            {/* WiFi */}
                            <svg width="13" height="10" viewBox="0 0 13 10" fill="white">
                                <path d="M6.5 9.5a1 1 0 100-2 1 1 0 000 2z" />
                                <path
                                    d="M3.8 6.8a3.8 3.8 0 015.4 0"
                                    stroke="white"
                                    strokeWidth="1.2"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M1.5 4.5a6.5 6.5 0 0110 0"
                                    stroke="white"
                                    strokeWidth="1.2"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                            </svg>
                            {/* Battery */}
                            <svg width="22" height="10" viewBox="0 0 22 10" fill="white">
                                <rect
                                    x="0"
                                    y="0.5"
                                    width="19"
                                    height="9"
                                    rx="2"
                                    stroke="white"
                                    strokeWidth="1"
                                    fill="none"
                                />
                                <rect x="2" y="2.5" width="15" height="5" rx="1" fill="white" />
                                <rect x="20" y="3" width="2" height="4" rx="0.5" fill="white" />
                            </svg>
                        </div>
                    </div>

                    {/* Screen content */}
                    <div
                        className="absolute inset-0 overflow-y-auto overflow-x-hidden"
                        style={{
                            paddingTop: 44,
                            background: screenshot ? "transparent" : "#F8F9FE",
                        }}
                    >
                        {screenshot ? (
                            <img
                                src={screenshot}
                                alt="Screenshot Monka"
                                className="w-full h-auto block"
                                style={{ minHeight: "100%" }}
                            />
                        ) : children ? (
                            children
                        ) : (
                            /* Placeholder */
                            <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{ background: "var(--monka-primary-light)", opacity: 0.3 }}
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="var(--monka-primary)"
                                        strokeWidth="2"
                                    >
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <path d="M21 15l-5-5L5 21" />
                                    </svg>
                                </div>
                                <p
                                    className="text-xs"
                                    style={{ color: "var(--text-tertiary)" }}
                                >
                                    Screenshot à venir
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Home indicator */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 6,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 100,
                            height: 4,
                            background: "rgba(255,255,255,0.3)",
                            borderRadius: 4,
                            zIndex: 50,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
