import React from "react";
import MInput from "../atoms/MInput";
import MIcon from "../atoms/MIcon";
import { monka } from "./monka-design-tokens";

export interface MSearchBarProps {
    value?: string;
    onSearch?: (val: string) => void;
    placeholder?: string;
}

export default function MSearchBar({
    value = "",
    onSearch,
    placeholder = "Rechercher un article...",
}: MSearchBarProps) {
    return (
        <MInput
            value={value}
            onChange={onSearch}
            placeholder={placeholder}
            icon={<MIcon name="search" size={18} color={monka.colors.textMuted} />}
        />
    );
}
