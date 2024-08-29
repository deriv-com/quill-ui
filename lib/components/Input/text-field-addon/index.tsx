import React, { forwardRef } from "react";
import Input, { InputProps } from "../base";
import clsx from "clsx";
import "./text-field-addon.scss";
import { Text } from "@components/Typography";
import { TLeftOrRight } from "@types";

export interface TextFieldAddonProps
    extends Omit<InputProps, "textAlignment" | "leftIcon"> {
    addonLabel: string;
    addOnPosition?: TLeftOrRight;
    fillAddonBorderColor?: string;
}

export const TextFieldAddon = forwardRef<HTMLInputElement, TextFieldAddonProps>(
    (
        {
            addOnPosition = "left",
            variant = "outline",
            fillAddonBorderColor,
            rightIcon,
            addonLabel,
            inputSize = "lg",
            disabled,
            ...rest
        },
        ref,
    ) => {
        const addOnStyle =
            variant === "fill" ? { borderColor: fillAddonBorderColor } : {};
        const addOn = (
            <div
                className={clsx(
                    "quill-addon",
                    `quill-addon__position--${addOnPosition}`,
                    `quill-addon__position--${addOnPosition}--${variant}`,
                    `quill-addon__variant--${variant}`,
                )}
                style={addOnStyle}
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
            <Input
                addOn={addOn}
                disabled={disabled}
                addOnIcon={addOnIcon}
                variant={variant}
                inputSize={inputSize}
                ref={ref}
                {...rest}
            />
        );
    },
);

export default TextFieldAddon;
