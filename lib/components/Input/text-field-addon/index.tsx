import React, { forwardRef, useEffect, useRef, useState } from "react";
import Input, { InputProps } from "../base";
import clsx from "clsx";
import "./text-field-addon.scss";
import { Text } from "@components/Typography";
import { TLeftOrRight } from "@types";

export interface TextFieldAddonProps
    extends Omit<InputProps, "textAlignment" | "leftIcon"> {
    addonLabel: string;
    addOnPosition?: TLeftOrRight;
}

export const TextFieldAddon = forwardRef<HTMLInputElement, TextFieldAddonProps>(
    (
        {
            addOnPosition = "left",
            variant = "outline",
            rightIcon,
            addonLabel,
            inputSize = "md",
            disabled,
            ...rest
        },
        ref,
    ) => {
        const parentRef = useRef<HTMLInputElement>(null);
        const [addonBorderColor, setAddonBorderColor] = useState("");

        const getClosestBackgroundColor = (element: HTMLElement | null) => {
            while (element && element !== document.body) {
                const bgColor = getComputedStyle(element).backgroundColor;
                if (
                    bgColor !== "transparent" &&
                    bgColor !== "rgba(0, 0, 0, 0)"
                ) {
                    return bgColor;
                }
                element = element.parentElement;
            }
            return getComputedStyle(document.body).backgroundColor;
        };

        useEffect(() => {
            if (parentRef.current) {
                const closestBackgroundColor = getClosestBackgroundColor(
                    parentRef.current.parentElement,
                );
                setAddonBorderColor(closestBackgroundColor);
            }
        }, []);

        const addOn = (
            <div
                className={clsx(
                    "quill-addon",
                    `quill-addon__position--${addOnPosition}`,
                    `quill-addon__position--${addOnPosition}--${variant}`,
                    `quill-addon__variant--${variant}`,
                )}
                style={
                    variant === "fill" ? { borderColor: addonBorderColor } : {}
                }
            >
                <Text
                    size={inputSize}
                    className={clsx(disabled && "quill-addon__label--disabled")}
                >
                    {addonLabel}
                </Text>
            </div>
        );

        const addOnIcon = <span className="icon_wrapper">{rightIcon}</span>;

        return (
            <div ref={parentRef}>
                <Input
                    addOn={addOn}
                    disabled={disabled}
                    addOnIcon={addOnIcon}
                    variant={variant}
                    inputSize={inputSize}
                    ref={ref}
                    {...rest}
                />
            </div>
        );
    },
);

export default TextFieldAddon;
