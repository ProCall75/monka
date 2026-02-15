import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { monka } from "../monka-design-tokens";

/**
 * Foundation / Colors — The complete Monka color palette.
 *
 * Every color is sourced from `monka-design-tokens.ts` and documented
 * with its usage context and hex value.
 */

function Swatch({ name, value, usage }: { name: string; value: string; usage: string }) {
    const isLight = ["#E8F4F8", "#FFFFFF", "#E0F4F4", "#B2DFDB", "#E5E5EA", "#C8CCD0", "#E8F5E9", "#F0F8FA"].includes(value);
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 0" }}>
            <div
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: value,
                    border: isLight ? "1px solid #E5E5EA" : "none",
                    flexShrink: 0,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                }}
            />
            <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F" }}>{name}</span>
                    <code style={{ fontSize: 11, color: "#86868B", fontFamily: "'SF Mono', monospace" }}>{value}</code>
                </div>
                <span style={{ fontSize: 12, color: "#86868B" }}>{usage}</span>
            </div>
        </div>
    );
}

function ColorGroup({ title, colors }: { title: string; colors: { name: string; value: string; usage: string }[] }) {
    return (
        <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: "#86868B", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #E5E5EA" }}>
                {title}
            </h3>
            {colors.map((c) => (
                <Swatch key={c.name} {...c} />
            ))}
        </div>
    );
}

function ColorsPage() {
    return (
        <div style={{ maxWidth: 480, padding: 24 }}>
            <ColorGroup
                title="Backgrounds"
                colors={[
                    { name: "bgPrimary", value: monka.colors.bgPrimary, usage: "Page background" },
                    { name: "bgCard", value: monka.colors.bgCard, usage: "Card surfaces" },
                    { name: "bgOptionsZone", value: monka.colors.bgOptionsZone, usage: "Questionnaire options zone" },
                    { name: "bgMint", value: monka.colors.bgMint, usage: "Contacts section background" },
                    { name: "headerBg", value: monka.colors.headerBg, usage: "Slightly tinted header" },
                ]}
            />
            <ColorGroup
                title="Interactive — CTA"
                colors={[
                    { name: "ctaPrimary", value: monka.colors.ctaPrimary, usage: "Primary buttons, active states" },
                    { name: "ctaPrimaryHover", value: monka.colors.ctaPrimaryHover, usage: "Hover/pressed state" },
                    { name: "ctaMuted", value: monka.colors.ctaMuted, usage: "Disabled CTA" },
                    { name: "ctaOutline", value: monka.colors.ctaOutline, usage: "Outline button border" },
                ]}
            />
            <ColorGroup
                title="Text"
                colors={[
                    { name: "textDark", value: monka.colors.textDark, usage: "Main headings" },
                    { name: "textBody", value: monka.colors.textBody, usage: "Body text, descriptions" },
                    { name: "textMuted", value: monka.colors.textMuted, usage: "Hints, placeholders" },
                    { name: "textWhite", value: monka.colors.textWhite, usage: "Text on dark backgrounds" },
                ]}
            />
            <ColorGroup
                title="Status & Priority"
                colors={[
                    { name: "checkGreen", value: monka.colors.checkGreen, usage: "Success, completed" },
                    { name: "checkGreenBg", value: monka.colors.checkGreenBg, usage: "Green check background" },
                    { name: "progressActive", value: monka.colors.progressActive, usage: "Filled progress dots" },
                    { name: "progressInactive", value: monka.colors.progressInactive, usage: "Unfilled progress dots" },
                ]}
            />
            <ColorGroup
                title="Tab Accents"
                colors={[
                    { name: "tabBlue", value: monka.colors.tabBlue, usage: '"À la une" tab' },
                    { name: "tabGreen", value: monka.colors.tabGreen, usage: '"Santé" tab' },
                    { name: "tabMint", value: monka.colors.tabMint, usage: '"Démarches" tab' },
                    { name: "tabOrange", value: monka.colors.tabOrange, usage: '"Services" tab' },
                ]}
            />
            <ColorGroup
                title="Surface & Borders"
                colors={[
                    { name: "separator", value: monka.colors.separator, usage: "Light separators" },
                    { name: "iconGray", value: monka.colors.iconGray, usage: "Inactive tab/icons" },
                    { name: "overlayDark", value: "rgba(0,0,0,0.5)", usage: "Modal overlay" },
                ]}
            />
        </div>
    );
}

const meta: Meta = {
    title: "Foundation/Colors",
    parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

export const Palette: Story = {
    render: () => <ColorsPage />,
};
