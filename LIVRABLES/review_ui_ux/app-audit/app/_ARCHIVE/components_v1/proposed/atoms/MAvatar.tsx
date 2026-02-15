import React from "react";
import { monka } from "./monka-design-tokens";

export interface MAvatarProps {
    name: string;
    image?: string;
    size?: "sm" | "md" | "lg";
}

const SIZES = { sm: 32, md: 44, lg: 64 };
const FONT_SIZES = { sm: 12, md: 16, lg: 24 };

const COLORS = [
    "#2C8C99", "#E67E22", "#3A7BD5", "#9B59B6", "#2E8B57",
    "#E74C3C", "#1ABC9C", "#F39C12",
];

function getColor(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name: string) {
    return name
        .split(" ")
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export default function MAvatar({ name, image, size = "md" }: MAvatarProps) {
    const s = SIZES[size];
    const fs = FONT_SIZES[size];

    if (image) {
        return (
            <img
                src={image}
                alt={name}
                style={{
                    width: s,
                    height: s,
                    borderRadius: monka.radius.full,
                    objectFit: "cover",
                    flexShrink: 0,
                }}
            />
        );
    }

    return (
        <div
            style={{
                width: s,
                height: s,
                borderRadius: monka.radius.full,
                background: getColor(name),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
            }}
        >
            <span
                style={{
                    color: monka.colors.textWhite,
                    fontSize: fs,
                    fontWeight: monka.font.weight.semibold,
                    fontFamily: monka.font.family,
                    lineHeight: 1,
                }}
            >
                {getInitials(name)}
            </span>
        </div>
    );
}
