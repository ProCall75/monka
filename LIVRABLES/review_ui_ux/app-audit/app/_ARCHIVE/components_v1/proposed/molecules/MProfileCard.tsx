import React from "react";
import MAvatar from "../atoms/MAvatar";
import MIcon from "../atoms/MIcon";
import { monka } from "./monka-design-tokens";

export interface MProfileCardProps {
    name: string;
    subtitle?: string;
    avatar?: string;
    onPress?: () => void;
    showChevron?: boolean;
}

export default function MProfileCard({
    name,
    subtitle,
    avatar,
    onPress,
    showChevron = true,
}: MProfileCardProps) {
    return (
        <button
            onClick={onPress}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                background: monka.colors.bgCard,
                borderRadius: monka.radius.card,
                border: "none",
                width: "100%",
                cursor: onPress ? "pointer" : "default",
                boxShadow: monka.shadow.card,
                textAlign: "left",
                fontFamily: monka.font.family,
                WebkitTapHighlightColor: "transparent",
            }}
        >
            <MAvatar name={name} image={avatar} size="md" />
            <div style={{ flex: 1, minWidth: 0 }}>
                <div
                    style={{
                        fontSize: monka.font.size.title3,
                        fontWeight: monka.font.weight.semibold,
                        color: monka.colors.textDark,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {name}
                </div>
                {subtitle && (
                    <div
                        style={{
                            fontSize: monka.font.size.footnote,
                            color: monka.colors.textMuted,
                            marginTop: 2,
                        }}
                    >
                        {subtitle}
                    </div>
                )}
            </div>
            {showChevron && <MIcon name="chevron-right" size={18} color={monka.colors.textMuted} />}
        </button>
    );
}
