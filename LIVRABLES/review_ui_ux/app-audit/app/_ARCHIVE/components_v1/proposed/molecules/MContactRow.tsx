import React from "react";
import MAvatar from "../atoms/MAvatar";
import MIcon from "../atoms/MIcon";
import MSeparator from "../atoms/MSeparator";
import { monka } from "./monka-design-tokens";

export interface MContactRowProps {
    name: string;
    type: string;
    phone?: string;
    onPress?: () => void;
    showSeparator?: boolean;
}

export default function MContactRow({
    name,
    type,
    phone,
    onPress,
    showSeparator = true,
}: MContactRowProps) {
    return (
        <>
            <button
                onClick={onPress}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    background: "transparent",
                    border: "none",
                    width: "100%",
                    cursor: onPress ? "pointer" : "default",
                    textAlign: "left",
                    fontFamily: monka.font.family,
                    WebkitTapHighlightColor: "transparent",
                }}
            >
                <MAvatar name={name} size="sm" />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                        style={{
                            fontSize: monka.font.size.body,
                            fontWeight: monka.font.weight.medium,
                            color: monka.colors.textDark,
                        }}
                    >
                        {name}
                    </div>
                    <div
                        style={{
                            fontSize: monka.font.size.footnote,
                            color: monka.colors.textMuted,
                            marginTop: 1,
                        }}
                    >
                        {type}
                    </div>
                </div>
                {phone && (
                    <div style={{ display: "flex", gap: 8 }}>
                        <MIcon name="phone" size={18} color={monka.colors.ctaPrimary} />
                    </div>
                )}
                <MIcon name="chevron-right" size={16} color={monka.colors.textMuted} />
            </button>
            {showSeparator && <MSeparator variant="inset" />}
        </>
    );
}
