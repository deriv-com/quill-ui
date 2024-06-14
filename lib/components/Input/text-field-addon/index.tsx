import React, { forwardRef } from "react";
import Input, { InputProps } from "../base";
import clsx from "clsx";
import "./text-field-addon.scss";
import { Text } from "@components/Typography";

export interface TextFieldAddonProps
    extends Omit<InputProps, "textAlignment" | "leftIcon"> {
    addonLabel: string;
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
        const addOn = (
            <div
                className={clsx(
                    "quill-addon",
                    `quill-addon__position--${addOnPosition}`,
                    `quill-addon__position--${addOnPosition}--${variant}`,
                    `quill-addon__variant--${variant}`,
                )}
            >
                <Text
                    size={inputSize}
                    className={clsx(disabled && "quill-addon__label--disabled")}
                >
                    {addonLabel}
                </Text>
            </div>
        );

        const addOnIcon = <span className={"icon_wrapper"}>{rightIcon}</span>;

        return (
            <Input
                addOnPosition={addOnPosition}
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
