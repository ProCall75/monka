import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { monka } from "../monka-design-tokens";

/**
 * Foundation / Typography — The Monka type scale.
 *
 * Based on Apple SF Pro system font. Sizes and weights
 * defined in `monka-design-tokens.ts`.
 */

function TypeRow({ label, size, weight, sample }: { label: string; size: string | number; weight: number; sample: string }) {
    return (
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "8px 0", borderBottom: "1px solid #F0F0F0" }}>
            <div style={{ width: 100, flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#1D1D1F" }}>{label}</span>
                <div style={{ fontSize: 10, color: "#86868B", marginTop: 2 }}>
                    {size} · {weight}
                </div>
            </div>
            <span
                style={{
                    fontSize: size,
                    fontWeight: weight,
                    color: monka.colors.textDark,
                    fontFamily: monka.font.family,
                    lineHeight: 1.3,
                }}
            >
                {sample}
            </span>
        </div>
    );
}

function TypographyPage() {
    return (
        <div style={{ maxWidth: 600, padding: 24 }}>
            {/* Type Scale */}
            <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: "#86868B", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #E5E5EA" }}>
                Type Scale
            </h3>
            <TypeRow label="Large Title" size={monka.font.size.largeTitle} weight={monka.font.weight.bold} sample="Bonjour, Marwane" />
            <TypeRow label="Heading" size={monka.font.size.title2} weight={monka.font.weight.bold} sample="Vos priorités santé" />
            <TypeRow label="Title 3" size={monka.font.size.title3} weight={monka.font.weight.semibold} sample="Organisez le quotidien" />
            <TypeRow label="Medium" size={monka.font.size.subhead} weight={monka.font.weight.regular} sample="Voici vos actions clés du mois." />
            <TypeRow label="Body" size={monka.font.size.body} weight={monka.font.weight.regular} sample="Demandez une prescription pour des examens de prévention." />
            <TypeRow label="Small" size={monka.font.size.footnote} weight={monka.font.weight.medium} sample="Pour Francine · Moins de 10 min" />
            <TypeRow label="Caption" size={monka.font.size.caption} weight={monka.font.weight.regular} sample="Mis à jour il y a 3 heures" />

            {/* Weight Scale */}
            <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: "#86868B", margin: "32px 0 16px", paddingBottom: 8, borderBottom: "1px solid #E5E5EA" }}>
                Font Weights
            </h3>
            <TypeRow label="Regular" size={16} weight={monka.font.weight.regular} sample="Regular 400" />
            <TypeRow label="Medium" size={16} weight={monka.font.weight.medium} sample="Medium 500" />
            <TypeRow label="Semibold" size={16} weight={monka.font.weight.semibold} sample="Semibold 600" />
            <TypeRow label="Bold" size={16} weight={monka.font.weight.bold} sample="Bold 700" />
            <TypeRow label="Heavy" size={16} weight={monka.font.weight.heavy} sample="Heavy 800" />

            {/* Font Family */}
            <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: "#86868B", margin: "32px 0 16px", paddingBottom: 8, borderBottom: "1px solid #E5E5EA" }}>
                Font Stack
            </h3>
            <code style={{ fontSize: 12, color: "#86868B", lineHeight: 1.8, display: "block", background: "#FAFAFA", padding: 12, borderRadius: 8, wordBreak: "break-all" }}>
                {monka.font.family}
            </code>
        </div>
    );
}

const meta: Meta = {
    title: "Foundation/Typography",
    parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

export const TypeScale: Story = {
    render: () => <TypographyPage />,
};
