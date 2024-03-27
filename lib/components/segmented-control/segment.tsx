import React from "react";
import clsx from "clsx";
import { Text } from "../Typography";
import * as quillIcons from "@deriv/quill-icons";
import { SegmentedControlProps } from "./base";

interface SegmentProps {
    className?: string;
    icon?: string | React.ReactNode;
    isDisabled?: boolean;
    isSelected?: boolean;
    label?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    size?: SegmentedControlProps["size"];
}

export const Segment = ({
    className,
    icon,
    isDisabled,
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
            className={clsx(
                "item",
                isDisabled && "disabled",
                isSelected && "selected",
                className,
            )}
            onClick={isDisabled ? undefined : onClick}
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
