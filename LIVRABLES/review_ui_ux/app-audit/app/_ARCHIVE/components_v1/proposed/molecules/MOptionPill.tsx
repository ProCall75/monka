import React from "react";
import MIcon from "../atoms/MIcon";
import { monka } from "./monka-design-tokens";

export interface MOptionPillProps {
    label: string;
    selected?: boolean;
    multi?: boolean;
    onPress?: () => void;
}

export default function MOptionPill({
    label,
    selected = false,
    multi = false,
    onPress,
}: MOptionPillProps) {
    return (
        <button
            onClick={onPress}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "14px 16px",
                background: selected ? `${monka.colors.ctaPrimary}10` : monka.colors.bgCard,
                borderRadius: monka.radius.option,
                border: selected ? `1.5px solid ${monka.colors.ctaPrimary}` : `1.5px solid ${monka.colors.separator}`,
                cursor: "pointer",
                textAlign: "left",
                fontFamily: monka.font.family,
                transition: "all 0.15s ease",
                WebkitTapHighlightColor: "transparent",
            }}
        >
            {/* Checkbox/Radio indicator */}
            <div
                style={{
                    width: 22,
                    height: 22,
                    borderRadius: multi ? 6 : 11,
                    border: selected ? `2px solid ${monka.colors.ctaPrimary}` : `2px solid ${monka.colors.progressInactive}`,
                    background: selected ? monka.colors.ctaPrimary : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.15s ease",
                }}
            >
                {selected && <MIcon name="check" size={14} color="#fff" />}
            </div>

            <span
                style={{
                    fontSize: monka.font.size.body,
                    fontWeight: selected ? monka.font.weight.semibold : monka.font.weight.regular,
                    color: monka.colors.textDark,
                    flex: 1,
                }}
            >
                {label}
            </span>
        </button>
    );
}
