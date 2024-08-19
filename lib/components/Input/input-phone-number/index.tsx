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
    selectedCode?: string;
}

const dummyList: TCountryCodes[] = [
    {
        name: "United States",
        short_code: "US",
        phone_code: "+1",
    },
    {
        name: "Canada",
        short_code: "CA",
        phone_code: "+1",
    },
    {
        name: "United Kingdom",
        short_code: "GB",
        phone_code: "+44",
    },
    {
        name: "Australia",
        short_code: "AU",
        phone_code: "+61",
    },
];

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
            countryCodes = dummyList,
            selectedCode = "+00",
            ...rest
        },
        ref,
    ) => {
        const containerRef = useRef<HTMLDivElement>();
        const phoneCode = selectedCode || countryCodes[0].phone_code;
        console.log(containerRef.current);
        const codeAddOn = ({
            containerRef,
        }: {
            containerRef: HTMLDivElement;
        }) => (
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
                    code={phoneCode}
                    ref={containerRef}
                />
            </CustomDropdown>
        );

        return (
            <div ref={containerRef}>
                <Input
                    type="tel"
                    addOn={codeAddOn(containerRef.current)}
                    inputSize={inputSize}
                    status={status}
                    variant={variant}
                    {...rest}
                    ref={ref}
                />
            </div>
        );
    },
);

export default InputPhoneNumber;
