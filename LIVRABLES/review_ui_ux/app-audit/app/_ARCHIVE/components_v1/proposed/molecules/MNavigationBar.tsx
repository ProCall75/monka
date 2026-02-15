import React from "react";
import MIcon from "../atoms/MIcon";
import { monka } from "./monka-design-tokens";

export interface MNavigationBarProps {
    title: string;
    showBack?: boolean;
    onBack?: () => void;
    rightAction?: React.ReactNode;
}

export default function MNavigationBar({
    title,
    showBack = false,
    onBack,
    rightAction,
}: MNavigationBarProps) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 16px",
                minHeight: 44,
                background: "transparent",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                {showBack && (
                    <button
                        onClick={onBack}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 4,
                            display: "flex",
                            WebkitTapHighlightColor: "transparent",
                        }}
                    >
                        <MIcon name="chevron-left" size={22} color={monka.colors.ctaPrimary} />
                    </button>
                )}
                <h1
                    style={{
                        fontSize: showBack ? monka.font.size.title3 : monka.font.size.title2,
                        fontWeight: monka.font.weight.bold,
                        color: monka.colors.textDark,
                        margin: 0,
                        fontFamily: monka.font.family,
                    }}
                >
                    {title}
                </h1>
            </div>
            {rightAction && <div style={{ flexShrink: 0 }}>{rightAction}</div>}
        </div>
    );
}
