"use client";

import React from "react";

/**
 * MonkaIcons — Clean SVG icons in Monka's style
 * Rules: 1.5px strokes, rounded caps, monochrome with accent override
 * Replaces all emojis across the component library
 */

interface IconProps {
    size?: number;
    color?: string;
}

// ─── Action Type Icons ────────────────────────────────────────────

/** INFO — lightbulb / knowledge */
export const IconInfo: React.FC<IconProps> = ({ size = 20, color = "#F59E0B" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M9 18h6M10 21h4M12 3a6 6 0 014 10.5V16a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2.5A6 6 0 0112 3z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** ORGA — calendar / planning */
export const IconCalendar: React.FC<IconProps> = ({ size = 20, color = "#2C8C99" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" />
        <path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.5" fill={color} />
    </svg>
);

/** STRUC — star / structuring action */
export const IconStar: React.FC<IconProps> = ({ size = 20, color = "#2C8C99" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** SEC — alert / urgency */
export const IconAlert: React.FC<IconProps> = ({ size = 20, color = "#DC2626" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** MED — medical cross */
export const IconMedical: React.FC<IconProps> = ({ size = 20, color = "#8B5CF6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.5" />
        <path d="M12 8v8M8 12h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

// ─── Theme Icons ──────────────────────────────────────────────────

/** Health / Santé */
export const IconHealth: React.FC<IconProps> = ({ size = 20, color = "#2E8B57" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** Admin / Démarches */
export const IconClipboard: React.FC<IconProps> = ({ size = 20, color = "#4ECDC4" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="8" y="2" width="8" height="4" rx="1" stroke={color} strokeWidth="1.5" />
        <path d="M9 12h6M9 16h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

/** Social / Lien social */
export const IconPeople: React.FC<IconProps> = ({ size = 20, color = "#E67E22" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="3" stroke={color} strokeWidth="1.5" />
        <path d="M3 21v-1a5 5 0 0110 0v1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="9" r="2.5" stroke={color} strokeWidth="1.5" />
        <path d="M21 21v-1a3.5 3.5 0 00-4-3.46" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

// ─── Nav / UI Icons ───────────────────────────────────────────────

/** Heart — Pour Moi tab */
export const IconHeart: React.FC<IconProps> = ({ size = 20, color = "#2C8C99" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** Chat — Messagerie tab */
export const IconChat: React.FC<IconProps> = ({ size = 20, color = "#6B7280" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** Person — Profil tab */
export const IconPerson: React.FC<IconProps> = ({ size = 20, color = "#6B7280" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.5" />
        <path d="M4 21v-1a6 6 0 0112 0v1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

/** Book — Ressources tab */
export const IconBook: React.FC<IconProps> = ({ size = 20, color = "#6B7280" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** Bell — notification */
export const IconBell: React.FC<IconProps> = ({ size = 22, color = "#1A1A2E" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** Checkmark — success */
export const IconCheck: React.FC<IconProps> = ({ size = 20, color = "#00A86B" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
        <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** Sparkle — celebration */
export const IconSparkle: React.FC<IconProps> = ({ size = 20, color = "#2C8C99" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** Arrow right — CTA navigation */
export const IconArrowRight: React.FC<IconProps> = ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M6 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** Target — goals / onboarding step 1 */
export const IconTarget: React.FC<IconProps> = ({ size = 20, color = "#2C8C99" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
        <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
);

/** Chart / Progress */
export const IconChart: React.FC<IconProps> = ({ size = 20, color = "#2C8C99" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

/** Lock — paywall */
export const IconLock: React.FC<IconProps> = ({ size = 16, color = "#2C8C99" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth="1.5" />
        <path d="M7 11V7a5 5 0 0110 0v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

// ─── Mapping helper ───────────────────────────────────────────────
export type ActionIconType = "INFO" | "ORGA" | "STRUC" | "SEC" | "MED";

const ACTION_ICON_MAP: Record<ActionIconType, React.FC<IconProps>> = {
    INFO: IconInfo,
    ORGA: IconCalendar,
    STRUC: IconStar,
    SEC: IconAlert,
    MED: IconMedical,
};

export const getActionIcon = (type: ActionIconType, size?: number, color?: string) => {
    const Icon = ACTION_ICON_MAP[type];
    return <Icon size={size} color={color} />;
};
