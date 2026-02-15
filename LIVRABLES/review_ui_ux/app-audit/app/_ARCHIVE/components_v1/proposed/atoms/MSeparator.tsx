import React from "react";
import { monka } from "./monka-design-tokens";

export interface MSeparatorProps {
    variant?: "hairline" | "thick" | "inset";
}

export default function MSeparator({ variant = "hairline" }: MSeparatorProps) {
    const styles: Record<string, React.CSSProperties> = {
        hairline: {
            height: monka.hairline,
            background: monka.colors.separator,
            width: "100%",
        },
        thick: {
            height: 8,
            background: "#F2F2F7",
            width: "100%",
        },
        inset: {
            height: monka.hairline,
            background: monka.colors.separator,
            width: "100%",
            marginLeft: 16,
        },
    };

    return <div style={styles[variant]} />;
}
