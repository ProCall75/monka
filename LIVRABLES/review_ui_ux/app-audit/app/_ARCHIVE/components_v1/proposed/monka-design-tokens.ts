/**
 * Monka Design System — Mobile-Native Token System v3
 *
 * ╔══════════════════════════════════════════════════╗
 * ║  METHODOLOGY: Proportional Mobile-First Sizing  ║
 * ╠══════════════════════════════════════════════════╣
 * ║  • Base unit: 1rem = 16px (browser default)     ║
 * ║  • All sizes expressed as rem for proportional   ║
 * ║    scaling — change root font-size = scale all  ║
 * ║  • 8pt grid for spacing (multiples of 0.5rem)   ║
 * ║  • Touch targets: min 2.75rem (44px) per HIG    ║
 * ║  • Containers: always width: 100%, never fixed  ║
 * ╚══════════════════════════════════════════════════╝
 *
 * Font sizes follow iOS HIG naming but proportioned
 * for web rendering at 375–430px viewport widths.
 */

// ─── Helper: px → rem conversion ─────────────────────
const BASE = 16; // root font-size in px
const rem = (px: number): string => `${px / BASE}rem`;

export const monka = {
    colors: {
        // Backgrounds
        bgPrimary: "#E8F4F8",       // Light icy-blue page bg
        bgCard: "#FFFFFF",          // White cards
        bgOptionsZone: "#E0F4F4",   // Light teal zone behind answer options
        bgMint: "#B2DFDB",          // Mint background for Mes Contacts

        // CTA / Interactive
        ctaPrimary: "#2C8C99",       // Dark teal — main buttons
        ctaPrimaryHover: "#247A85",  // Darker teal hover
        ctaMuted: "#B0D5D5",         // Disabled / muted CTA
        ctaOutline: "#2C8C99",       // Outline button border color

        // Text
        textDark: "#1A1A2E",         // Main headings
        textBody: "#4A4A5A",         // Body text, descriptions
        textMuted: "#8E8E93",        // Hints, placeholders
        textWhite: "#FFFFFF",        // Text on dark backgrounds

        // Progress dots
        progressActive: "#2C3E50",   // Filled dots (dark navy)
        progressInactive: "#C8CCD0", // Unfilled dots

        // Status
        checkGreen: "#00A86B",       // Green checkmarks
        checkGreenBg: "#E8F5E9",     // Green check background circle

        // Tab-specific accent colors
        tabBlue: "#3A7BD5",          // "À la une" tab
        tabGreen: "#2E8B57",         // "Santé" tab
        tabMint: "#4ECDC4",          // "Démarches" tab
        tabOrange: "#E67E22",        // "Services" tab

        // Misc
        separator: "#E5E5EA",        // Light separators
        iconGray: "#6B7280",         // Inactive tab bar icons
        headerBg: "#F0F8FA",        // Slightly tinted header
        overlayDark: "rgba(0,0,0,0.5)", // Modal overlay

        // Gamification — Theme domains
        themeSante: "#2E8B57",        // Health domain
        themeAdmin: "#E67E22",        // Admin domain
        themeBienEtre: "#8B5CF6",     // Well-being domain

        // Gamification — Phases
        phaseDecouverte: "#3A7BD5",   // Phase 1 — Learning
        phaseAutonomie: "#2C8C99",    // Phase 2 — Managing
        phaseSerenite: "#00A86B",     // Phase 3 — Thriving

        // Gamification — Streak
        streakActive: "#F59E0B",      // Active streak amber
        streakInactive: "#D1D5DB",    // Broken streak gray

        // Gamification — Achievements
        achievementGold: "#F59E0B",
        achievementBg: "#FFFBEB",
    },

    radius: {
        card: 12,
        option: 12,
        button: 10,
        pill: 20,
        progressDot: 4,
        bottomSheet: 20,
        full: 9999,
    },

    /**
     * Spacing — 8pt grid (multiples of 4px)
     * Keep as numbers for backward compatibility with existing template literals.
     * Use `monka.sp.X` for rem equivalents in new code.
     */
    spacing: {
        xs: 2,
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        xxl: 20,
        xxxl: 24,
    },

    /** Spacing as rem strings — use in new code */
    sp: {
        xs: rem(2),      // 0.125rem
        sm: rem(4),      // 0.25rem
        md: rem(8),      // 0.5rem
        lg: rem(12),     // 0.75rem
        xl: rem(16),     // 1rem
        xxl: rem(20),    // 1.25rem
        xxxl: rem(24),   // 1.5rem
    },

    /**
     * Typography — iOS HIG naming, web-optimized sizes
     *
     * Values are rem strings for proportional scaling.
     * Changing root font-size scales ALL text proportionally.
     *
     * At 16px root: body=15px, title3=17px, largeTitle=28px
     * At 15px root: body≈14px, title3≈16px, largeTitle≈26px
     * At 17px root: body≈16px, title3≈18px, largeTitle≈30px
     */
    font: {
        family: "-apple-system, 'SF Pro Display', 'SF Pro Text', system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        size: {
            caption2: rem(10),     // Micro — labels, badges
            caption: rem(11),      // Timestamps, metadata
            footnote: rem(12),     // Secondary text, hints
            subhead: rem(13),      // Sub-headlines
            body: rem(15),         // PRIMARY reading size
            title3: rem(17),       // Section headers
            title2: rem(20),       // Screen titles
            title1: rem(24),       // Major headings
            largeTitle: rem(28),   // Hero/splash titles
        },
        /** Raw px values for contexts needing numbers (SVG, canvas) */
        px: {
            caption2: 10,
            caption: 11,
            footnote: 12,
            subhead: 13,
            body: 15,
            title3: 17,
            title2: 20,
            title1: 24,
            largeTitle: 28,
        },
        weight: {
            regular: 400 as const,
            medium: 500 as const,
            semibold: 600 as const,
            bold: 700 as const,
            heavy: 800 as const,
        },
        lineHeight: {
            tight: 1.2,        // Headings
            normal: 1.4,       // Body text
            relaxed: 1.6,      // Long-form reading
        },
    },

    /**
     * Touch targets — Apple HIG: 44pt minimum
     * Kept as numbers (px) since touch targets are absolute minimums
     */
    touch: {
        min: 44,               // Apple HIG absolute minimum
        comfortable: 48,       // Material / comfortable for all ages
        large: 52,             // Extra-large for primary CTAs
    },

    shadow: {
        card: "0 1px 4px rgba(0,0,0,0.06)",
        elevated: "0 2px 8px rgba(0,0,0,0.08)",
        subtle: "0 0.5px 2px rgba(0,0,0,0.04)",
    },

    /** Safe area insets (px — device-specific constants) */
    safeArea: {
        top: 59,       // Dynamic Island height
        bottom: 34,    // Home indicator
    },

    statusBar: {
        height: 54,
    },

    /** iOS navigation bar */
    navBar: {
        height: 44,    // Standard iOS nav bar
    },

    /** iOS tab bar */
    tabBar: {
        height: 49,    // Standard iOS tab bar (without safe area)
    },

    hairline: 0.5,     // iOS-style thin separators
} as const;

/** Bottom tab bar items */
export const TAB_BAR_ITEMS = [
    { id: "pour-moi", label: "Pour Moi", iconType: "heart" as const },
    { id: "ressources", label: "Ressources", iconType: "clipboard" as const },
    { id: "messagerie", label: "Messagerie", iconType: "chat" as const },
    { id: "mes-informations", label: "Mes informations", iconType: "person" as const },
] as const;

export type TabId = typeof TAB_BAR_ITEMS[number]["id"];

/** Helper to convert px number to rem string */
export { rem };
