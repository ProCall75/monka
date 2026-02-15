import React from "react";
import { monka } from "./monka-design-tokens";

export interface MChipProps {
    label: string;
    selected?: boolean;
    onPress?: () => void;
}

export default function MChip({ label, selected = false, onPress }: MChipProps) {
    return (
        <button
            onClick={onPress}
            style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "6px 12px",
                borderRadius: monka.radius.pill,
                background: selected ? monka.colors.ctaPrimary : monka.colors.bgCard,
                color: selected ? monka.colors.textWhite : monka.colors.textBody,
                border: selected ? "none" : `1px solid ${monka.colors.separator}`,
                fontSize: monka.font.size.body,
                fontWeight: selected ? monka.font.weight.semibold : monka.font.weight.regular,
                fontFamily: monka.font.family,
                cursor: "pointer",
                transition: "all 0.15s ease",
                outline: "none",
                whiteSpace: "nowrap",
                WebkitTapHighlightColor: "transparent",
            }}
        >
            {label}
        </button>
    );
}
