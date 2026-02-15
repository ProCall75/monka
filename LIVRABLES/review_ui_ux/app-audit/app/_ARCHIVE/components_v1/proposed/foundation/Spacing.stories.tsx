import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { monka } from "../monka-design-tokens";

/**
 * Foundation / Spacing — The Monka spacing & radius scales.
 *
 * Consistent spacing tokens from `monka-design-tokens.ts`.
 */

function SpacingRow({ label, value }: { label: string; value: number }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 0" }}>
            <div style={{ width: 80, flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F" }}>{label}</span>
                <div style={{ fontSize: 11, color: "#86868B" }}>{value}px</div>
            </div>
            <div
                style={{
                    width: value,
                    height: 20,
                    background: "#2C8C99",
                    borderRadius: 4,
                    opacity: 0.7,
                    minWidth: 4,
                }}
            />
        </div>
    );
}

function RadiusRow({ label, value }: { label: string; value: number }) {
    const displayValue = Math.min(value, 40);
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 0" }}>
            <div style={{ width: 80, flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F" }}>{label}</span>
                <div style={{ fontSize: 11, color: "#86868B" }}>{value}px</div>
            </div>
            <div
                style={{
                    width: 56,
                    height: 56,
                    border: "2px solid #2C8C99",
                    borderRadius: displayValue,
                    flexShrink: 0,
                }}
            />
        </div>
    );
}

function SpacingPage() {
    return (
        <div style={{ maxWidth: 480, padding: 24 }}>
            {/* Spacing */}
            <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: "#86868B", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #E5E5EA" }}>
                Spacing Scale
            </h3>
            <SpacingRow label="xs" value={monka.spacing.xs} />
            <SpacingRow label="sm" value={monka.spacing.sm} />
            <SpacingRow label="md" value={monka.spacing.md} />
            <SpacingRow label="lg" value={monka.spacing.lg} />
            <SpacingRow label="xl" value={monka.spacing.xl} />
            <SpacingRow label="xxl" value={monka.spacing.xxl} />
            <SpacingRow label="xxxl" value={monka.spacing.xxxl} />

            {/* Radius */}
            <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: "#86868B", margin: "32px 0 16px", paddingBottom: 8, borderBottom: "1px solid #E5E5EA" }}>
                Border Radius
            </h3>
            <RadiusRow label="button" value={monka.radius.button} />
            <RadiusRow label="card" value={monka.radius.card} />
            <RadiusRow label="option" value={monka.radius.option} />
            <RadiusRow label="pill" value={monka.radius.pill} />
            <RadiusRow label="bottomSheet" value={monka.radius.bottomSheet} />
            <RadiusRow label="progressDot" value={monka.radius.progressDot} />
            <RadiusRow label="full" value={monka.radius.full} />

            {/* Shadows */}
            <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: "#86868B", margin: "32px 0 16px", paddingBottom: 8, borderBottom: "1px solid #E5E5EA" }}>
                Shadows
            </h3>
            {(["subtle", "card", "elevated"] as const).map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0" }}>
                    <div style={{ width: 80, flexShrink: 0 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F" }}>{s}</span>
                        <div style={{ fontSize: 10, color: "#86868B", marginTop: 2 }}>{monka.shadow[s]}</div>
                    </div>
                    <div
                        style={{
                            width: 80,
                            height: 48,
                            background: "#fff",
                            borderRadius: 12,
                            boxShadow: monka.shadow[s],
                        }}
                    />
                </div>
            ))}

            {/* Safe Areas */}
            <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: "#86868B", margin: "32px 0 16px", paddingBottom: 8, borderBottom: "1px solid #E5E5EA" }}>
                Safe Areas & Layout
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 13, color: "#1D1D1F" }}>
                    <span style={{ fontWeight: 600 }}>safeArea.top:</span> {monka.safeArea.top}px (Dynamic Island)
                </div>
                <div style={{ fontSize: 13, color: "#1D1D1F" }}>
                    <span style={{ fontWeight: 600 }}>safeArea.bottom:</span> {monka.safeArea.bottom}px (Home indicator)
                </div>
                <div style={{ fontSize: 13, color: "#1D1D1F" }}>
                    <span style={{ fontWeight: 600 }}>statusBar.height:</span> {monka.statusBar.height}px
                </div>
                <div style={{ fontSize: 13, color: "#1D1D1F" }}>
                    <span style={{ fontWeight: 600 }}>hairline:</span> {monka.hairline}px
                </div>
            </div>
        </div>
    );
}

const meta: Meta = {
    title: "Foundation/Spacing",
    parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

export const Scale: Story = {
    render: () => <SpacingPage />,
};
