import React from "react";
import clsx from "clsx";
import { Text } from "../Typography";
import { TGenericSizes } from "../../types";
import * as quillIcons from "@deriv/quill-icons";
import "./segmented-control.scss";

export interface SegmentedControlProps {
    className?: string;
    options: Array<{
        icon?: string | React.ReactNode;
        label?: string;
        selected?: boolean;
    }>;
    onChange?: (selectedItemIndex: number) => void;
    hasContainerWidth?: boolean;
    size?: Extract<TGenericSizes, "lg" | "md" | "sm">;
}

interface SegmentProps {
    className?: string;
    icon?: string | React.ReactNode;
    isSelected?: boolean;
    label?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    size?: SegmentedControlProps["size"];
}

const Segment = ({
    className,
    icon,
    isSelected,
    label,
    onClick,
    size,
}: SegmentProps) => {
    const QuillIcon =
        typeof icon === "string" &&
        (quillIcons[icon as keyof typeof quillIcons] as React.ElementType);
    const Icon = QuillIcon ? <QuillIcon iconSize={size} /> : icon;
    return (
        <div
            className={clsx("item", isSelected && "selected", className)}
            onClick={onClick}
        >
            {icon && <span className="icon">{Icon}</span>}
            {label && (
                <Text size={size} as="span">
                    {label}
                </Text>
            )}
        </div>
    );
};

export const SegmentedControl = ({
    className,
    options = [],
    onChange,
    hasContainerWidth,
    size = "md",
}: SegmentedControlProps) => (
    <div
        className={clsx(
            "segmented-control",
            `segmented-control--${size}`,
            hasContainerWidth && "segmented-control--has-container-width",
            className,
        )}
    >
        {options.map(({ icon, label, selected }, idx) => (
            <Segment
                key={`${idx}_${label}`}
                icon={icon}
                isSelected={selected}
                label={label}
                onClick={() => onChange?.(idx)}
                size={size}
            />
        ))}
    </div>
);
