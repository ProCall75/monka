"use client";

interface ScreenCritiqueProps {
    positive: string;
    negative: string;
    proposal: string;
}

export default function ScreenCritique({
    positive,
    negative,
    proposal,
}: ScreenCritiqueProps) {
    const items = [
        {
            icon: "✓",
            label: "Ce qui fonctionne",
            text: positive,
            color: "var(--status-green)",
            bg: "var(--status-green-bg)",
            borderColor: "#22C55E",
        },
        {
            icon: "✕",
            label: "Ce qui pose problème",
            text: negative,
            color: "var(--status-red)",
            bg: "var(--status-red-bg)",
            borderColor: "#EF4444",
        },
        {
            icon: "→",
            label: "Notre proposition",
            text: proposal,
            color: "#6D28D9",
            bg: "var(--pragma-purple-bg)",
            borderColor: "var(--pragma-purple)",
        },
    ];

    return (
        <div className="flex flex-col gap-4 w-full">
            {items.map((item, i) => (
                <div
                    key={i}
                    style={{
                        background: item.bg,
                        borderLeft: `3px solid ${item.borderColor}`,
                        borderRadius: "0 6px 6px 0",
                        padding: "18px 22px",
                    }}
                >
                    <div className="flex items-start gap-4">
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 24,
                                height: 24,
                                borderRadius: 4,
                                fontSize: 12,
                                fontWeight: 700,
                                color: item.color,
                                background: "rgba(255,255,255,0.7)",
                                flexShrink: 0,
                                marginTop: 1,
                            }}
                        >
                            {item.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                            <p
                                style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    letterSpacing: "1.5px",
                                    textTransform: "uppercase",
                                    color: item.color,
                                    marginBottom: 6,
                                }}
                            >
                                {item.label}
                            </p>
                            <p
                                style={{
                                    fontSize: 15,
                                    lineHeight: 1.7,
                                    color: "var(--text-body)",
                                }}
                            >
                                {item.text}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
