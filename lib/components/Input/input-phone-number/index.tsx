import React, {
    ChangeEvent,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from "react";
import Input from "../base";
import { CustomDropdown, TCustomDropdown } from "../custom-dropdown";
import CountryCodeAddon from "./country-code-addon";
import "./input-phone-number.scss";
import { TCountryCodes } from "@types";
import DropdownContent from "./dropdown-content";
import { DropdownProvider } from "@providers/dropdown/dropdownProvider";
import { useDropdown } from "@hooks/useDropdown";

export interface InputPhoneNumberProps
    extends Omit<TCustomDropdown, "leftIcon"> {
    codeIcon?: boolean;
    fillAddonBorderColor?: string;
    codeLabel?: string;
    countryCodes: TCountryCodes[];
    shortCode?: string;
    onCodeChange?: (item: TCountryCodes) => void;
    onValueChange?: (phoneNumber: string) => void;
    showFlags?: boolean;
}

const InputPhoneNumberContent = forwardRef<
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
                mask: "",
            },
            onCodeChange,
            onValueChange,
            showFlags = true,
            value,
            disabled,
            onChange,
            ...rest
        },
        ref,
    ) => {
        const { isOpen } = useDropdown();
        const getCountry = () => {
            return (
                countryCodes.find(
                    (c: TCountryCodes) =>
                        c.short_code.toLowerCase() === shortCode?.toLowerCase(),
                ) || countryCodes[0]
            );
        };

        const [phoneCode, setPhoneCode] = useState(getCountry().phone_code);
        const [inputValue, setInputValue] = useState(value || "");

        const containerRef = useRef<HTMLDivElement>(null);
        const headcompRef = useRef<HTMLDivElement>(null);

        shortCode = getCountry().short_code;

        useEffect(() => {
            onValueChange?.(`${phoneCode}${inputValue}`);
        }, [phoneCode, inputValue]);

        const handleItemChange = (item: TCountryCodes) => {
            setPhoneCode(item.phone_code);
            onCodeChange?.(item);
        };

        const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            event.target.value = event.target.value.replace(/\s+/g, "");
            setInputValue(event.target.value);
            onChange?.(event);
        };

        const codeAddOn = (
            <div className="quill-phone-input-addon" ref={headcompRef}>
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
                            disabled={disabled}
                        />
                    }
                    noAutoClose
                    withProvider={false}
                    disabled={disabled}
                >
                    <DropdownContent
                        options={countryCodes}
                        code={shortCode}
                        showFlags={showFlags}
                        containerRef={containerRef}
                        headcompRef={headcompRef}
                        onItemClick={handleItemChange}
                    />
                </CustomDropdown>
            </div>
        );

        return (
            <div ref={containerRef} className="quill-phone-input__container">
                <Input
                    type="tel"
                    value={inputValue}
                    placeholder={placeholder}
                    addOn={codeAddOn}
                    inputSize={inputSize}
                    status={status}
                    variant={variant}
                    formatProps={formatProps}
                    onChange={handleInputChange}
                    isDropdownOpen={isOpen}
                    disabled={disabled}
                    {...rest}
                    ref={ref}
                />
            </div>
        );
    },
);

export const InputPhoneNumber = forwardRef<
    HTMLInputElement,
    InputPhoneNumberProps
>(({ ...rest }, ref) => {
    return (
        <DropdownProvider>
            <InputPhoneNumberContent {...rest} ref={ref} />
        </DropdownProvider>
    );
});

export default InputPhoneNumber;
