import React from "react";
import { CaptionText, InputPhoneNumberProps, Text } from "@components/index";
import { clsx } from "clsx";
import { InputProps, Status, Variants } from "../base";
import { useDropdown } from "@hooks/useDropdown";
import {
    StandaloneChevronDownBoldIcon,
    StandaloneMobileNotchRegularIcon,
} from "@deriv/quill-icons/Standalone";
import { TRegularSizes } from "@types";

export interface CountryCodeAddonProps
    extends Omit<
        InputPhoneNumberProps,
        keyof InputProps | "countryCodes" | "onCodeChange"
    > {
    size: TRegularSizes;
    addOnStatus?: Status;
    addOnVariant?: Variants;
    disabled?: boolean;
}

const CountryCodeAddon = ({
    addOnVariant = "outline",
    addOnStatus = "neutral",
    codeIcon = true,
    size = "md",
    codeLabel,
    disabled,
    fillAddonBorderColor,
}: CountryCodeAddonProps) => {
    const { isOpen, selectedValue } = useDropdown();

    const addOnStyle =
        addOnVariant === "fill" ? { borderColor: fillAddonBorderColor } : {};

    return (
        <div
            className={clsx(
                "quill-country-code",
                `quill-country-code__variant--${addOnVariant}`,
                `quill-country-code__size--${size}`,
                isOpen && `quill-country-code__opened`,
                disabled && `quill-country-code__disabled`,
            )}
            style={addOnStyle}
        >
            {codeIcon && (
                <StandaloneMobileNotchRegularIcon
                    className="mobile-icon"
                    iconSize="sm"
                />
            )}
            <div>
                {codeLabel && size === "lg" && (
                    <CaptionText
                        className={clsx(
                            "quill-country-code__label",
                            `quill-country-code__label--${addOnStatus}`,
                        )}
                    >
                        {codeLabel}
                    </CaptionText>
                )}
                <Text
                    className={clsx(
                        "quill-country-code__value",
                        isOpen && `focus`,
                    )}
                    size={size === "lg" ? "md" : size}
                >
                    {selectedValue}
                </Text>
            </div>
            <StandaloneChevronDownBoldIcon
                iconSize="sm"
                data-state={isOpen ? "open" : "close"}
                className={clsx(
                    "dropdown__transform",
                    isOpen && "dropdown__transform-rotate",
                )}
            />
        </div>
    );
};

export default CountryCodeAddon;
