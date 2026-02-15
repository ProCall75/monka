"use client";

/**
 * Placeholder: Alertes & notifications repensées
 */

function AlertIcon({ type }: { type: string }) {
    if (type === "urgent") return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" fill="#FF6B6B" opacity={0.15} />
            <circle cx="8" cy="8" r="3" fill="#FF6B6B" />
        </svg>
    );
    if (type === "info") return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 1H2C1.45 1 1 1.45 1 2v12l2.5-2.5H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1z" stroke="#6C5CE7" strokeWidth="1.4" fill="none" />
            <circle cx="5.5" cy="7" r="0.8" fill="#6C5CE7" />
            <circle cx="8" cy="7" r="0.8" fill="#6C5CE7" />
            <circle cx="10.5" cy="7" r="0.8" fill="#6C5CE7" />
        </svg>
    );
    // tip
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1C5.24 1 3 3.24 3 6c0 1.77.93 3.32 2.33 4.2V12a1 1 0 001 1h3.34a1 1 0 001-1v-1.8A5.004 5.004 0 0013 6c0-2.76-2.24-5-5-5z" stroke="#00B894" strokeWidth="1.4" fill="none" />
            <line x1="6" y1="14.5" x2="10" y2="14.5" stroke="#00B894" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    );
}

export default function ProposedAlerts() {
    const alerts = [
        {
            type: "urgent",
            title: "Renouvellement ordonnance",
            desc: "L'ordonnance de votre père expire dans 3 jours.",
            time: "Il y a 1h",
            action: "Voir les détails",
        },
        {
            type: "info",
            title: "Message de votre IDEC",
            desc: "Sophie a répondu à votre question sur le bilan.",
            time: "Il y a 2h",
            action: "Lire",
        },
        {
            type: "tip",
            title: "Conseil personnalisé",
            desc: "Pensez à noter les symptômes de cette semaine avant votre prochain RDV.",
            time: "Ce matin",
            action: null,
        },
    ];

    return (
        <div style={{ background: "#F8F9FE", minHeight: "100%", padding: "16px" }}>
            <p
                style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#1A1330",
                    marginBottom: 4,
                }}
            >
                Notifications
            </p>
            <p style={{ fontSize: 12, color: "#9B93AD", marginBottom: 20 }}>
                3 nouvelles
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {alerts.map((alert, i) => (
                    <div
                        key={i}
                        style={{
                            background: "white",
                            borderRadius: 16,
                            padding: "14px 16px",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                            borderLeft:
                                alert.type === "urgent"
                                    ? "3px solid #FF6B6B"
                                    : alert.type === "info"
                                        ? "3px solid #6C5CE7"
                                        : "3px solid #00B894",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginBottom: 4,
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <AlertIcon type={alert.type} />
                                <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1330" }}>
                                    {alert.title}
                                </p>
                            </div>
                            <p style={{ fontSize: 10, color: "#9B93AD", whiteSpace: "nowrap" }}>
                                {alert.time}
                            </p>
                        </div>
                        <p style={{ fontSize: 12, color: "#6B6380", lineHeight: 1.5, paddingLeft: 24 }}>
                            {alert.desc}
                        </p>
                        {alert.action && (
                            <p
                                style={{
                                    fontSize: 12,
                                    color: "#6C5CE7",
                                    fontWeight: 600,
                                    marginTop: 8,
                                    paddingLeft: 24,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4,
                                }}
                            >
                                {alert.action}
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 4l4 4-4 4" stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
