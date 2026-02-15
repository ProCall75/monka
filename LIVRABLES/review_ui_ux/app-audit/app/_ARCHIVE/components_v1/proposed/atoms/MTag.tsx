import React from "react";
import { monka } from "./monka-design-tokens";

export interface MTagProps {
    label: string;
    color?: "sante" | "demarches" | "droits" | "services" | "default";
}

const TAG_COLORS = {
    sante: { bg: "#E8F5E9", text: monka.colors.tabGreen },
    demarches: { bg: "#E0F7FA", text: monka.colors.tabMint },
    droits: { bg: "#EDE7F6", text: "#7C4DFF" },
    services: { bg: "#FFF3E0", text: monka.colors.tabOrange },
    default: { bg: "#F2F2F7", text: monka.colors.textBody },
};

export default function MTag({ label, color = "default" }: MTagProps) {
    const c = TAG_COLORS[color];

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "3px 8px",
                borderRadius: monka.radius.pill,
                background: c.bg,
                color: c.text,
                fontSize: monka.font.size.footnote,
                fontWeight: monka.font.weight.medium,
                fontFamily: monka.font.family,
                lineHeight: 1.3,
                whiteSpace: "nowrap",
            }}
        >
            {label}
        </span>
    );
}
