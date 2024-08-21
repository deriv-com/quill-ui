import React, { ChangeEvent, forwardRef, useRef } from "react";
import Input from "../base";
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
    onValueChange?: (phoneNumber: string) => void;
}

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
            onChange,
            ...rest
        },
        ref,
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);

        const getCountry = () => {
            return (
                countryCodes.find(
                    (c: TCountryCodes) =>
                        c.short_code.toLowerCase() === shortCode?.toLowerCase(),
                ) || countryCodes[0]
            );
        };

        const phoneCode = getCountry().phone_code;
        shortCode = getCountry().short_code;

        const handleItemChange = (item: TCountryCodes) => {
            console.log(item);
            onCodeChange?.(item);
        };

        const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            onChange?.(event);
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
                noAutoClose
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
                    onChange={handleInputChange}
                    {...rest}
                    ref={ref}
                />
            </div>
        );
    },
);

export default InputPhoneNumber;
