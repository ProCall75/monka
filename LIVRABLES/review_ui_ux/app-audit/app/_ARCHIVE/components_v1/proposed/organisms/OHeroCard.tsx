import { monka } from "./monka-design-tokens";

/**
 * OHeroCard — Large colored action card at top of dashboard tabs
 *
 * Extracted from Dashboard.tsx. Used in Santé (green), Démarches (orange), Services (blue).
 * Screenshots: IMG_3705, IMG_3707, IMG_3709
 */

export interface OHeroCardProps {
    /** Background color (e.g. "#2E8B57" for santé green) */
    backgroundColor: string;
    /** Main title text */
    title: string;
    /** "Pour Francine" / "Pour vous" label */
    forWho?: string;
    /** Tags displayed as pills */
    tags?: string[];
    /** CTA button label */
    ctaLabel?: string;
    /** Called when CTA is tapped */
    onCtaClick?: () => void;
}

export default function OHeroCard({
    backgroundColor,
    title,
    forWho,
    tags = [],
    ctaLabel = "Je commence",
    onCtaClick,
}: OHeroCardProps) {
    return (
        <div
            style={{
                background: backgroundColor,
                borderRadius: monka.radius.card,
                padding: "20px 18px",
                color: monka.colors.textWhite,
                fontFamily: monka.font.family,
            }}
        >
            {/* Monka checkmark icon */}
            <div style={{ marginBottom: 12 }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="14" fill="rgba(255,255,255,0.2)" />
                    <path d="M9 14l3 3 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            style={{
                                fontSize: 11,
                                color: "rgba(255,255,255,0.9)",
                                background: "rgba(255,255,255,0.2)",
                                padding: "3px 10px",
                                borderRadius: 8,
                                fontWeight: monka.font.weight.medium,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Title */}
            <h2
                style={{
                    fontSize: monka.font.size.title3,
                    fontWeight: monka.font.weight.bold,
                    color: monka.colors.textWhite,
                    lineHeight: 1.35,
                    margin: "0 0 6px",
                }}
            >
                {title}
            </h2>

            {/* "Pour Francine" label */}
            {forWho && (
                <p
                    style={{
                        fontSize: monka.font.size.footnote,
                        color: "rgba(255,255,255,0.7)",
                        margin: "0 0 16px",
                        fontWeight: monka.font.weight.regular,
                    }}
                >
                    {forWho}
                </p>
            )}

            {/* CTA */}
            <button
                onClick={onCtaClick}
                style={{
                    background: "rgba(255,255,255,0.95)",
                    color: backgroundColor,
                    border: "none",
                    borderRadius: monka.radius.button,
                    padding: "10px 20px",
                    fontSize: monka.font.size.body,
                    fontWeight: monka.font.weight.semibold,
                    cursor: "pointer",
                    fontFamily: monka.font.family,
                }}
            >
                {ctaLabel}
            </button>
        </div>
    );
}
