import React from "react";
import { monka } from "./monka-design-tokens";

export interface MProgressDotsProps {
    current: number;
    total: number;
}

export default function MProgressDots({ current, total }: MProgressDotsProps) {
    return (
        <div style={{ display: "flex", gap: 6, justifyContent: "center", padding: "8px 0" }}>
            {Array.from({ length: total }, (_, i) => (
                <div
                    key={i}
                    style={{
                        width: i === current ? 20 : 8,
                        height: 8,
                        borderRadius: monka.radius.progressDot,
                        background: i === current ? monka.colors.progressActive : monka.colors.progressInactive,
                        transition: "all 0.2s ease",
                    }}
                />
            ))}
        </div>
    );
}
