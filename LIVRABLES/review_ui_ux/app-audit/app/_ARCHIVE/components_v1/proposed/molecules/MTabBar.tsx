import React from "react";
import MIcon from "../atoms/MIcon";
import { monka, TAB_BAR_ITEMS } from "./monka-design-tokens";
import type { TabId } from "./monka-design-tokens";
import type { IconName } from "../atoms/MIcon";

export interface MTabBarProps {
    activeTab: TabId;
    onTabChange?: (tab: TabId) => void;
}

const ICON_MAP: Record<string, IconName> = {
    heart: "heart-fill",
    clipboard: "clipboard",
    chat: "chat",
    person: "person",
};

export default function MTabBar({ activeTab, onTabChange }: MTabBarProps) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "8px 0 0",
                background: monka.colors.bgCard,
                borderTop: `${monka.hairline}px solid ${monka.colors.separator}`,
                fontFamily: monka.font.family,
            }}
        >
            {TAB_BAR_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => onTabChange?.(item.id)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            padding: "4px 12px 6px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            minWidth: 64,
                            WebkitTapHighlightColor: "transparent",
                        }}
                    >
                        <MIcon
                            name={ICON_MAP[item.iconType] || "heart"}
                            size={22}
                            color={isActive ? monka.colors.ctaPrimary : monka.colors.iconGray}
                        />
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: isActive ? monka.font.weight.semibold : monka.font.weight.regular,
                                color: isActive ? monka.colors.ctaPrimary : monka.colors.iconGray,
                                fontFamily: monka.font.family,
                            }}
                        >
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
