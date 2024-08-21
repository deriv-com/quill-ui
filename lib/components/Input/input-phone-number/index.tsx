import React, { forwardRef, useRef } from "react";
import Input from "../base";
// import clsx from "clsx";
import { CustomDropdown, TCustomDropdown } from "../custom-dropdown";
import CountryCodeAddon from "./country-code-addon";
import "./input-phone-number.scss";
import { TCountryCodes } from "@types";
import DropdownContent from "./dropdown-content";

export interface InputPhoneNumberProps
    extends Omit<TCustomDropdown, "leftIcon"> {
    codeIcon?: boolean;
    fillAddonBorderColor?: string;
    codeLabel?: string;
    countryCodes: TCountryCodes[];
    shortCode?: string;
    onCodeChange?: (item: TCountryCodes) => void;
}

const getPhoneCode = (countryCodes: TCountryCodes[], shortCode: string) => {
    const country = countryCodes.find(
        (c: TCountryCodes) =>
            c.short_code.toLowerCase() === shortCode.toLowerCase(),
    );
    return country?.phone_code;
};

export const InputPhoneNumber = forwardRef<
    HTMLInputElement,
    InputPhoneNumberProps
>(
    (
        {
            inputSize = "md",
            variant = "outline",
            status = "neutral",
            codeIcon = true,
            codeLabel,
            fillAddonBorderColor,
            countryCodes,
            shortCode,
            placeholder = "00 0000 0000",
            formatProps = {
                format: "## #### ####",
            },
            onCodeChange,
            ...rest
        },
        ref,
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);

        const phoneCode = shortCode
            ? getPhoneCode(countryCodes, shortCode)
            : countryCodes[0].phone_code;

        shortCode = shortCode || countryCodes[0].short_code;

        const handleItemChange = (item: TCountryCodes) => {
            console.log(item);
            onCodeChange?.(item);
        };

        const codeAddOn = (
            <CustomDropdown
                value={phoneCode}
                label={codeLabel}
                headComponent={
                    <CountryCodeAddon
                        addOnVariant={variant}
                        codeIcon={codeIcon}
                        size={inputSize}
                        codeLabel={codeLabel}
                        addOnStatus={status}
                        fillAddonBorderColor={fillAddonBorderColor}
                    />
                }
            >
                <DropdownContent
                    options={countryCodes}
                    code={shortCode}
                    elementRef={containerRef}
                    onItemClick={handleItemChange}
                />
            </CustomDropdown>
        );

        return (
            <div ref={containerRef} className="quill-phone-input__container">
                <Input
                    type="tel"
                    placeholder={placeholder}
                    addOn={codeAddOn}
                    inputSize={inputSize}
                    status={status}
                    variant={variant}
                    formatProps={formatProps}
                    {...rest}
                    ref={ref}
                />
            </div>
        );
    },
);

export default InputPhoneNumber;
