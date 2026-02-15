"use client";

import { monka, TAB_BAR_ITEMS, type TabId } from "./monka-design-tokens";

/**
 * Monka Bottom Tab Bar — shared across Dashboard, Ressources, Messagerie, Mes informations
 * Pixel-perfect replica from screenshots (IMG_3702, IMG_3762)
 */

interface BottomTabBarProps {
    activeTab: TabId;
    onTabChange?: (tab: TabId) => void;
}

function TabIcon({ type, active }: { type: string; active: boolean }) {
    const color = active ? monka.colors.ctaPrimary : monka.colors.iconGray;
    const size = 24;

    switch (type) {
        case "heart":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill={active ? color : "none"}
                        stroke={color}
                        strokeWidth={active ? 0 : 1.8}
                    />
                </svg>
            );
        case "clipboard":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="3" width="14" height="18" rx="2" stroke={color} strokeWidth="1.8" />
                    <path d="M9 3V1h6v2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="8" y1="9" x2="16" y2="9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="8" y1="13" x2="14" y2="13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="8" y1="17" x2="12" y2="17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case "chat":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <path
                        d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                        fill={active ? color : "none"}
                        stroke={color}
                        strokeWidth={active ? 0 : 1.8}
                    />
                    {!active && (
                        <>
                            <circle cx="8" cy="10" r="1" fill={color} />
                            <circle cx="12" cy="10" r="1" fill={color} />
                            <circle cx="16" cy="10" r="1" fill={color} />
                        </>
                    )}
                </svg>
            );
        case "person":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.8" fill={active ? color : "none"} />
                    <path
                        d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6"
                        stroke={color}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        fill={active ? color : "none"}
                    />
                </svg>
            );
        default:
            return null;
    }
}

export default function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
    return (
        <div
            style={{
                position: "sticky",
                bottom: 0,
                left: 0,
                right: 0,
                background: monka.colors.bgCard,
                borderTop: `1px solid ${monka.colors.separator}`,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                paddingTop: 8,
                paddingBottom: 4,
                zIndex: 100,
            }}
        >
            {TAB_BAR_ITEMS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange?.(tab.id)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px 8px",
                            minWidth: 64,
                        }}
                    >
                        <TabIcon type={tab.iconType} active={isActive} />
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: isActive ? monka.font.weight.semibold : monka.font.weight.regular,
                                color: isActive ? monka.colors.ctaPrimary : monka.colors.iconGray,
                                fontFamily: monka.font.family,
                                lineHeight: 1.2,
                            }}
                        >
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
