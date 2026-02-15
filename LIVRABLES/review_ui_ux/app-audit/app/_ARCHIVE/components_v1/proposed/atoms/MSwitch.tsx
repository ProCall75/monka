import React from "react";
import { monka } from "./monka-design-tokens";

export interface MSwitchProps {
    checked?: boolean;
    onChange?: (val: boolean) => void;
    disabled?: boolean;
}

export default function MSwitch({ checked = false, onChange, disabled = false }: MSwitchProps) {
    return (
        <button
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onChange?.(!checked)}
            style={{
                width: 51,
                height: 31,
                borderRadius: 16,
                background: checked ? monka.colors.ctaPrimary : "#E5E5EA",
                border: "none",
                padding: 2,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1,
                transition: "background 0.2s ease",
                flexShrink: 0,
                position: "relative",
                outline: "none",
            }}
        >
            <div
                style={{
                    width: 27,
                    height: 27,
                    borderRadius: 14,
                    background: "#FFFFFF",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    transform: checked ? "translateX(20px)" : "translateX(0px)",
                    transition: "transform 0.2s ease",
                }}
            />
        </button>
    );
}
