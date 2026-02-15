import React from "react";
import StatusBar from "./StatusBar";

/**
 * Pixel-perfect iPhone 16 Pro SVG mockup.
 *
 * Specs (from Apple / research):
 *   Physical: 1206×2622 @ 3x
 *   CSS viewport: 402×874
 *   Corner radius: 55px (device), 50px (screen)
 *   Dynamic Island: 126×37 px centered, 17px from top
 *   Safe area: top 59px, bottom 34px
 *   Home indicator: 134×5 px, centered, 8px from bottom
 */

const DEVICE = {
    // Total outer dimensions (screen + bezel)
    width: 433,
    screenWidth: 402,
    screenHeight: 874,
    bezelX: 15.5, // (433 - 402) / 2
    bezelTop: 14,
    bezelBottom: 14,
    cornerOuter: 55,
    cornerScreen: 50,
    // Dynamic Island
    diWidth: 126,
    diHeight: 37,
    diTop: 14 + 11, // bezelTop + offset from screen edge
    diRadius: 18.5,
    // Home indicator
    hiWidth: 134,
    hiHeight: 5,
    hiRadius: 2.5,
    hiBottom: 8,
    // Side buttons
    btnRadius: 2,
};

const TOTAL_HEIGHT = DEVICE.screenHeight + DEVICE.bezelTop + DEVICE.bezelBottom; // 902
const TOTAL_WIDTH = DEVICE.width; // 433

interface IPhoneMockupProps {
    children: React.ReactNode;
    /** Scale factor. Default 0.85 to fit nicely in Storybook */
    scale?: number;
    /** Show status bar. Default true */
    showStatusBar?: boolean;
    /** Dark frame variant */
    variant?: "natural" | "black" | "white" | "desert";
}

const FRAME_COLORS = {
    natural: { body: "#8A8A8F", bezel: "#2C2C2E", highlight: "rgba(255,255,255,0.12)" },
    black: { body: "#1C1C1E", bezel: "#000000", highlight: "rgba(255,255,255,0.06)" },
    white: { body: "#E5E5EA", bezel: "#1C1C1E", highlight: "rgba(255,255,255,0.25)" },
    desert: { body: "#C4A882", bezel: "#2C2C2E", highlight: "rgba(255,255,255,0.15)" },
};

export default function IPhoneMockup({
    children,
    scale = 0.85,
    showStatusBar = true,
    variant = "natural",
}: IPhoneMockupProps) {
    const colors = FRAME_COLORS[variant];

    return (
        <div
            style={{
                position: "relative",
                width: TOTAL_WIDTH * scale,
                height: TOTAL_HEIGHT * scale,
                flexShrink: 0,
            }}
        >
            <div
                style={{
                    width: TOTAL_WIDTH,
                    height: TOTAL_HEIGHT,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    position: "relative",
                }}
            >
                {/* ── Drop shadow (behind everything) ── */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: TOTAL_WIDTH,
                        height: TOTAL_HEIGHT,
                        borderRadius: DEVICE.cornerOuter,
                        boxShadow: `
              0 4px 8px rgba(0,0,0,0.08),
              0 12px 30px rgba(0,0,0,0.12),
              0 30px 60px rgba(0,0,0,0.08)
            `,
                        pointerEvents: "none",
                        zIndex: 1,
                    }}
                />

                {/* ── SVG Device Frame (behind content) ── */}
                <svg
                    width={TOTAL_WIDTH}
                    height={TOTAL_HEIGHT}
                    viewBox={`0 0 ${TOTAL_WIDTH} ${TOTAL_HEIGHT}`}
                    fill="none"
                    style={{ position: "absolute", top: 0, left: 0, zIndex: 2, pointerEvents: "none" }}
                >
                    {/* === Outer device body === */}
                    <rect
                        x="0.5"
                        y="0.5"
                        width={TOTAL_WIDTH - 1}
                        height={TOTAL_HEIGHT - 1}
                        rx={DEVICE.cornerOuter}
                        fill={colors.body}
                        stroke="rgba(0,0,0,0.3)"
                        strokeWidth="1"
                    />

                    {/* Highlight edge (subtle light reflection) */}
                    <rect
                        x="1"
                        y="1"
                        width={TOTAL_WIDTH - 2}
                        height={TOTAL_HEIGHT - 2}
                        rx={DEVICE.cornerOuter - 0.5}
                        fill="none"
                        stroke={colors.highlight}
                        strokeWidth="1"
                    />

                    {/* === Screen bezel ring (black edge around screen) === */}
                    <rect
                        x={DEVICE.bezelX - 1}
                        y={DEVICE.bezelTop - 1}
                        width={DEVICE.screenWidth + 2}
                        height={DEVICE.screenHeight + 2}
                        rx={DEVICE.cornerScreen + 1}
                        fill={colors.bezel}
                    />

                    {/* === Side buttons === */}
                    {/* Power button — right side */}
                    <rect
                        x={TOTAL_WIDTH - 0.5}
                        y={220}
                        width={3}
                        height={80}
                        rx={DEVICE.btnRadius}
                        fill={colors.body}
                        stroke="rgba(0,0,0,0.2)"
                        strokeWidth="0.5"
                    />

                    {/* Volume Up — left side */}
                    <rect
                        x={-2.5}
                        y={200}
                        width={3}
                        height={36}
                        rx={DEVICE.btnRadius}
                        fill={colors.body}
                        stroke="rgba(0,0,0,0.2)"
                        strokeWidth="0.5"
                    />

                    {/* Volume Down — left side */}
                    <rect
                        x={-2.5}
                        y={248}
                        width={3}
                        height={36}
                        rx={DEVICE.btnRadius}
                        fill={colors.body}
                        stroke="rgba(0,0,0,0.2)"
                        strokeWidth="0.5"
                    />

                    {/* Action button — left side */}
                    <rect
                        x={-2.5}
                        y={148}
                        width={3}
                        height={22}
                        rx={DEVICE.btnRadius}
                        fill={colors.body}
                        stroke="rgba(0,0,0,0.2)"
                        strokeWidth="0.5"
                    />
                </svg>

                {/* ── Screen Content Area (above frame background) ── */}
                <div
                    style={{
                        position: "absolute",
                        top: DEVICE.bezelTop,
                        left: DEVICE.bezelX,
                        width: DEVICE.screenWidth,
                        height: DEVICE.screenHeight,
                        borderRadius: DEVICE.cornerScreen,
                        overflow: "hidden",
                        background: "#fff",
                        zIndex: 5,
                    }}
                >
                    {/* Status bar */}
                    {showStatusBar && <StatusBar />}

                    {/* Scrollable content with safe areas */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Top safe area spacer (under Dynamic Island) */}
                        <div style={{ minHeight: 59, flexShrink: 0 }} />

                        {/* Main scrollable content */}
                        <div
                            style={{
                                flex: 1,
                                overflowY: "auto",
                                overflowX: "hidden",
                                WebkitOverflowScrolling: "touch",
                                overscrollBehavior: "contain",
                            }}
                        >
                            {children}
                        </div>

                        {/* Bottom safe area spacer (home indicator) */}
                        <div style={{ minHeight: 34, flexShrink: 0 }} />
                    </div>
                </div>

                {/* ── Overlay SVG (Dynamic Island + Home Indicator, on top of content) ── */}
                <svg
                    width={TOTAL_WIDTH}
                    height={TOTAL_HEIGHT}
                    viewBox={`0 0 ${TOTAL_WIDTH} ${TOTAL_HEIGHT}`}
                    fill="none"
                    style={{ position: "absolute", top: 0, left: 0, zIndex: 10, pointerEvents: "none" }}
                >
                    {/* Dynamic Island */}
                    <rect
                        x={(TOTAL_WIDTH - DEVICE.diWidth) / 2}
                        y={DEVICE.diTop}
                        width={DEVICE.diWidth}
                        height={DEVICE.diHeight}
                        rx={DEVICE.diRadius}
                        fill="#000"
                    />

                    {/* Home Indicator */}
                    <rect
                        x={(TOTAL_WIDTH - DEVICE.hiWidth) / 2}
                        y={TOTAL_HEIGHT - DEVICE.bezelBottom - DEVICE.hiBottom - DEVICE.hiHeight}
                        width={DEVICE.hiWidth}
                        height={DEVICE.hiHeight}
                        rx={DEVICE.hiRadius}
                        fill="rgba(0,0,0,0.25)"
                    />

                    {/* Screen shadow inset */}
                    <rect
                        x={DEVICE.bezelX}
                        y={DEVICE.bezelTop}
                        width={DEVICE.screenWidth}
                        height={DEVICE.screenHeight}
                        rx={DEVICE.cornerScreen}
                        fill="none"
                        stroke="rgba(0,0,0,0.08)"
                        strokeWidth="0.5"
                    />
                </svg>
            </div>
        </div>
    );
}
