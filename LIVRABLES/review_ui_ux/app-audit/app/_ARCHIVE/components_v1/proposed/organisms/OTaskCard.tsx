import { monka } from "./monka-design-tokens";

/**
 * OTaskCard — Individual task/action card in dashboard
 *
 * Extracted from Dashboard.tsx horizontal scroll section.
 * White card with tags, title, "Pour vous/Francine" label, CTA button.
 * Screenshots: IMG_3706, IMG_3708, IMG_3710
 */

export interface OTaskCardProps {
    /** Tags displayed as teal pills */
    tags: string[];
    /** Main title/description */
    title: string;
    /** "Pour vous" / "Pour Francine" */
    forWho?: string;
    /** CTA button label */
    ctaLabel?: string;
    /** Called when CTA is tapped */
    onPress?: () => void;
    /** Card width — used in horizontal scroll */
    minWidth?: number;
}

export default function OTaskCard({
    tags,
    title,
    forWho = "Pour vous",
    ctaLabel = "Je commence",
    onPress,
    minWidth = 260,
}: OTaskCardProps) {
    return (
        <div
            style={{
                background: monka.colors.bgCard,
                borderRadius: monka.radius.card,
                padding: "16px",
                minWidth,
                maxWidth: minWidth + 20,
                flexShrink: 0,
                scrollSnapAlign: "start",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: monka.shadow.subtle,
                fontFamily: monka.font.family,
            }}
        >
            {/* Tags */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {tags.map((tag, j) => (
                    <span
                        key={j}
                        style={{
                            fontSize: 11,
                            color: monka.colors.ctaPrimary,
                            background: `${monka.colors.ctaPrimary}12`,
                            padding: "3px 8px",
                            borderRadius: 6,
                            fontWeight: monka.font.weight.medium,
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Title */}
            <p
                style={{
                    fontSize: monka.font.size.body,
                    fontWeight: monka.font.weight.semibold,
                    color: monka.colors.textDark,
                    lineHeight: 1.4,
                    margin: "0 0 16px",
                    flex: 1,
                }}
            >
                {title}
            </p>

            {/* Footer: "Pour vous" + CTA */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <span
                    style={{
                        fontSize: monka.font.size.footnote,
                        color: monka.colors.textMuted,
                        fontWeight: monka.font.weight.regular,
                    }}
                >
                    {forWho}
                </span>
                <button
                    onClick={onPress}
                    style={{
                        background: `${monka.colors.ctaPrimary}15`,
                        border: `1px solid ${monka.colors.ctaPrimary}`,
                        borderRadius: monka.radius.button,
                        padding: "6px 14px",
                        fontSize: 12,
                        fontWeight: monka.font.weight.medium,
                        color: monka.colors.ctaPrimary,
                        cursor: "pointer",
                        fontFamily: monka.font.family,
                    }}
                >
                    {ctaLabel}
                </button>
            </div>
        </div>
    );
}
