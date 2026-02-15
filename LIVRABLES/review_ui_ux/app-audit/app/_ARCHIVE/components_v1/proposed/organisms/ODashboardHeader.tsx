import { monka } from "./monka-design-tokens";

/**
 * ODashboardHeader — Dashboard top bar + greeting + progress
 *
 * Extracted from Dashboard.tsx (IMG_3702, IMG_3762).
 * Logo "monka" + "S'abonner" pill + notification bell + greeting + progress bar.
 */

export interface ODashboardHeaderProps {
    /** User first name for greeting */
    userName: string;
    /** Number of completed tasks */
    progressCount: number;
    /** Total number of tasks */
    progressTotal: number;
    /** Subtitle text below greeting */
    subtitle?: string;
    /** Show subscribe pill */
    showSubscribe?: boolean;
    /** Has unread notification */
    hasNotification?: boolean;
    /** Called when subscribe pill is tapped */
    onSubscribe?: () => void;
    /** Called when notification bell is tapped */
    onNotification?: () => void;
}

export default function ODashboardHeader({
    userName,
    progressCount,
    progressTotal,
    subtitle = "Voici vos actions clés du mois.",
    showSubscribe = true,
    hasNotification = true,
    onSubscribe,
    onNotification,
}: ODashboardHeaderProps) {
    const progressPercent = progressTotal > 0 ? (progressCount / progressTotal) * 100 : 0;

    return (
        <div>
            {/* ── Header bar ── */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 16px 4px",
                }}
            >
                {/* Monka logo text */}
                <span
                    style={{
                        fontSize: 18,
                        fontWeight: monka.font.weight.heavy,
                        color: monka.colors.textDark,
                        letterSpacing: "-0.3px",
                        fontFamily: monka.font.family,
                    }}
                >
                    m<span style={{ color: monka.colors.ctaPrimary }}>o</span>nka
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {/* S'abonner pill */}
                    {showSubscribe && (
                        <button
                            onClick={onSubscribe}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                padding: "6px 12px",
                                borderRadius: monka.radius.pill,
                                border: `1.5px solid ${monka.colors.separator}`,
                                fontSize: 11,
                                fontWeight: monka.font.weight.medium,
                                color: monka.colors.textBody,
                                cursor: "pointer",
                                background: "none",
                                fontFamily: monka.font.family,
                            }}
                        >
                            S&apos;abonner
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <rect x="5" y="11" width="14" height="10" rx="2" stroke={monka.colors.textBody} strokeWidth="1.8" />
                                <path d="M8 11V7a4 4 0 018 0v4" stroke={monka.colors.textBody} strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </button>
                    )}
                    {/* Notification bell */}
                    <button
                        onClick={onNotification}
                        style={{
                            cursor: "pointer",
                            position: "relative",
                            background: "none",
                            border: "none",
                            padding: 0,
                        }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 2C10.34 2 9 3.34 9 5v1.29C6.89 7.38 5.5 9.54 5.5 12v4.5L4 18v1h16v-1l-1.5-1.5V12c0-2.46-1.39-4.62-3.5-5.71V5c0-1.66-1.34-3-3-3z"
                                stroke={monka.colors.textBody}
                                strokeWidth="1.5"
                                fill="none"
                            />
                            <path d="M10 20c0 1.1.9 2 2 2s2-.9 2-2" stroke={monka.colors.textBody} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        {hasNotification && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: -2,
                                    right: -2,
                                    width: 8,
                                    height: 8,
                                    borderRadius: monka.radius.full,
                                    background: "#E74C3C",
                                }}
                            />
                        )}
                    </button>
                </div>
            </div>

            {/* ── Greeting ── */}
            <div style={{ padding: "8px 16px 4px" }}>
                <h1
                    style={{
                        fontSize: monka.font.size.largeTitle,
                        fontWeight: monka.font.weight.bold,
                        color: monka.colors.textDark,
                        margin: "0 0 2px",
                        lineHeight: 1.2,
                        fontFamily: monka.font.family,
                    }}
                >
                    Bonjour, {userName}
                </h1>
                <p
                    style={{
                        fontSize: monka.font.size.subhead,
                        fontWeight: monka.font.weight.semibold,
                        color: monka.colors.textDark,
                        margin: "0 0 8px",
                        fontFamily: monka.font.family,
                    }}
                >
                    {subtitle}
                </p>
            </div>

            {/* ── Progress bar ── */}
            <div style={{ padding: "0 16px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                <div
                    style={{
                        flex: 1,
                        height: 4,
                        borderRadius: 2,
                        background: monka.colors.separator,
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: `${progressPercent}%`,
                            height: "100%",
                            borderRadius: 2,
                            background: monka.colors.ctaPrimary,
                            transition: "width 0.3s ease",
                        }}
                    />
                </div>
                <span
                    style={{
                        fontSize: monka.font.size.footnote,
                        color: monka.colors.textMuted,
                        fontWeight: monka.font.weight.medium,
                        flexShrink: 0,
                        fontFamily: monka.font.family,
                    }}
                >
                    {progressCount}/{progressTotal}
                </span>
            </div>
        </div>
    );
}
