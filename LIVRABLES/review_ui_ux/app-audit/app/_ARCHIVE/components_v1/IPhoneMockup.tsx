"use client";

import React from "react";

interface IPhoneMockupProps {
    children?: React.ReactNode;
    /** Screen width in pixels */
    width?: number;
    /** Optional image src to display instead of children */
    src?: string;
    /** Alt text for image */
    alt?: string;
}

/**
 * iPhone 16 Pro Mockup — Ultra-thin bezels, modern proportions
 * Pure CSS, no images needed. Based on Apple's actual device specs.
 */
export function IPhoneMockup({
    children,
    width = 240,
    src,
    alt = "Screenshot",
}: IPhoneMockupProps) {
    // iPhone 16 Pro: 6.3" display, 2622x1206 → aspect ≈ 2.174
    const height = width * 2.174;
    const cornerRadius = width * 0.165;  // Tighter, more modern corners
    const bezel = width * 0.012;          // Ultra-thin bezel — 16 Pro signature
    const innerRadius = cornerRadius - bezel;

    // Dynamic Island — slightly smaller on 16 Pro
    const diW = width * 0.34;
    const diH = width * 0.08;
    const diTop = width * 0.038;

    return (
        <div style={{
            position: "relative", width, height,
            pointerEvents: "none", userSelect: "none", flexShrink: 0,
        }}>
            {/* Soft ambient glow */}
            <div style={{
                position: "absolute", inset: -16,
                borderRadius: cornerRadius + 16,
                background: "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.15), transparent 65%)",
                filter: "blur(20px)", zIndex: -1,
            }} />

            {/* Main shadow */}
            <div style={{
                position: "absolute", top: 8, left: 4, right: 4, bottom: -12,
                borderRadius: cornerRadius,
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.28), 0 8px 20px -6px rgba(0,0,0,0.18)",
                zIndex: -1,
            }} />

            {/* Titanium frame — Grade 5 brushed finish */}
            <div style={{
                position: "absolute", inset: 0,
                borderRadius: cornerRadius,
                // Titanium Desert: warm silver-gray
                background: "linear-gradient(160deg, #D4CFC8 0%, #B8B3AB 12%, #9E9990 30%, #8A857D 50%, #9E9990 70%, #B8B3AB 88%, #D4CFC8 100%)",
                overflow: "hidden",
            }}>
                {/* Chamfered edge — top highlight */}
                <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "0.5px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }} />
                {/* Left chamfer */}
                <div style={{ position: "absolute", left: 0, top: "10%", bottom: "10%", width: "0.5px", background: "linear-gradient(180deg, transparent 5%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 95%)" }} />

                {/* Screen glass — sits right inside the frame */}
                <div style={{
                    position: "absolute",
                    top: bezel, left: bezel, right: bezel, bottom: bezel,
                    borderRadius: innerRadius,
                    background: "#000",
                    overflow: "hidden",
                }}>
                    {/* Dynamic Island */}
                    <div style={{
                        position: "absolute", top: diTop, left: "50%",
                        transform: "translateX(-50%)", width: diW, height: diH, zIndex: 50,
                    }}>
                        <div style={{
                            position: "absolute", inset: 0, borderRadius: diH / 2,
                            background: "#000",
                            boxShadow: "0 0 0 0.5px rgba(255,255,255,0.06), inset 0 1px 2px rgba(0,0,0,0.5)",
                        }} />
                        {/* Camera */}
                        <div style={{
                            position: "absolute", right: diW * 0.13, top: "50%",
                            transform: "translateY(-50%)",
                            width: diH * 0.45, height: diH * 0.45, borderRadius: "50%",
                            background: "radial-gradient(circle at 40% 35%, #1a3550 0%, #0a1520 60%, #000 100%)",
                            boxShadow: "inset 0 0 1px rgba(0,80,120,0.3)",
                        }}>
                            <div style={{ position: "absolute", top: "18%", left: "22%", width: "20%", height: "20%", borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
                        </div>
                    </div>

                    {/* iOS Status bar */}
                    <div style={{
                        position: "absolute", width: "100%",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        top: 0, height: width * 0.14,
                        paddingLeft: width * 0.08, paddingRight: width * 0.065,
                        paddingTop: width * 0.012, zIndex: 40,
                    }}>
                        <span style={{ fontWeight: 600, fontSize: width * 0.048, color: "#fff", letterSpacing: "-0.2px", fontFamily: "-apple-system, SF Pro Text, sans-serif" }}>14:30</span>
                        <div style={{ display: "flex", alignItems: "center", gap: width * 0.012 }}>
                            {/* Signal */}
                            <svg viewBox="0 0 17 11" style={{ width: width * 0.05, height: width * 0.032, fill: "#fff", opacity: 0.9 }}>
                                <rect x="0" y="7" width="3" height="4" rx="0.8" />
                                <rect x="4.5" y="5" width="3" height="6" rx="0.8" />
                                <rect x="9" y="2.5" width="3" height="8.5" rx="0.8" />
                                <rect x="13.5" y="0" width="3" height="11" rx="0.8" />
                            </svg>
                            {/* Wifi */}
                            <svg viewBox="0 0 15 11" style={{ width: width * 0.044, height: width * 0.032, fill: "#fff", opacity: 0.9 }}>
                                <path d="M7.5 2.5C9.71 2.5 11.71 3.29 13.28 4.59L14.5 3.13C12.56 1.5 10.14 0.5 7.5 0.5C4.86 0.5 2.44 1.5 0.5 3.13L1.72 4.59C3.29 3.29 5.29 2.5 7.5 2.5Z" />
                                <path d="M7.5 5.5C8.88 5.5 10.15 5.96 11.18 6.72L12.4 5.26C11.02 4.21 9.33 3.5 7.5 3.5C5.67 3.5 3.98 4.21 2.6 5.26L3.82 6.72C4.85 5.96 6.12 5.5 7.5 5.5Z" />
                                <path d="M7.5 8.5C8.19 8.5 8.82 8.68 9.36 9L10.58 7.54C9.68 6.92 8.63 6.5 7.5 6.5C6.37 6.5 5.32 6.92 4.42 7.54L5.64 9C6.18 8.68 6.81 8.5 7.5 8.5Z" />
                                <circle cx="7.5" cy="10" r="1" />
                            </svg>
                            {/* Battery */}
                            <svg viewBox="0 0 25 12" style={{ width: width * 0.065, height: width * 0.034, opacity: 0.9 }}>
                                <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" fill="none" stroke="#fff" strokeWidth="1" />
                                <path d="M23 4V8C23.83 8 24.5 7.33 24.5 6.5V5.5C24.5 4.67 23.83 4 23 4Z" fill="#fff" opacity="0.4" />
                                <rect x="2" y="2" width="18" height="8" rx="1.5" fill="#fff" />
                            </svg>
                        </div>
                    </div>

                    {/* Screen content area */}
                    <div style={{
                        position: "absolute",
                        top: width * 0.14, left: 0, right: 0, bottom: width * 0.065,
                        overflow: "hidden", pointerEvents: "auto",
                    }}>
                        {src ? (
                            <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : children ? (
                            children
                        ) : (
                            <div style={{
                                width: "100%", height: "100%",
                                background: "linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)",
                                display: "flex", flexDirection: "column",
                                alignItems: "center", justifyContent: "center", gap: 6,
                            }}>
                                <span style={{ fontSize: 24, opacity: 0.35 }}>📱</span>
                                <span style={{ fontSize: 10, color: "#aaa", fontWeight: 500 }}>Screenshot à insérer</span>
                            </div>
                        )}
                    </div>

                    {/* Home indicator */}
                    <div style={{
                        position: "absolute", bottom: width * 0.02, left: "50%",
                        transform: "translateX(-50%)",
                        width: width * 0.35, height: width * 0.014,
                        background: "rgba(255,255,255,0.2)", borderRadius: width * 0.008,
                        zIndex: 50,
                    }} />
                </div>
            </div>

            {/* Side button — right (more subtle on 16 Pro) */}
            <div style={{
                position: "absolute", right: -1.5, top: height * 0.24,
                width: 2.5, height: width * 0.18,
                background: "linear-gradient(270deg, #8A857D, #6B665F)",
                borderRadius: "0 1.5px 1.5px 0",
                boxShadow: "1px 0 1px rgba(0,0,0,0.15)",
            }} />
            {/* Volume buttons — left */}
            <div style={{
                position: "absolute", left: -1.5, top: height * 0.21,
                width: 2.5, height: width * 0.12,
                background: "linear-gradient(90deg, #8A857D, #6B665F)",
                borderRadius: "1.5px 0 0 1.5px",
                boxShadow: "-1px 0 1px rgba(0,0,0,0.15)",
            }} />
            <div style={{
                position: "absolute", left: -1.5, top: height * 0.29,
                width: 2.5, height: width * 0.12,
                background: "linear-gradient(90deg, #8A857D, #6B665F)",
                borderRadius: "1.5px 0 0 1.5px",
                boxShadow: "-1px 0 1px rgba(0,0,0,0.15)",
            }} />
        </div>
    );
}

export default IPhoneMockup;
