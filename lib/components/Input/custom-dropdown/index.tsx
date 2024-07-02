import React, { ChangeEvent, forwardRef, useEffect, useRef } from "react";
import Input, { InputProps } from "../base";
import { useDropdown } from "@hooks/useDropdown";
import clsx from "clsx";
import { DropdownProvider } from "@providers/dropdown/dropdownProvider";
import "./custom-dropdown.scss";

export interface TCustomDropdown extends InputProps {
    isAutocomplete?: boolean;
    onClickDropdown?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CustomDropdownContent = forwardRef<HTMLDivElement, TCustomDropdown>(
    (
        {
            children,
            className,
            isAutocomplete = false,
            value,
            onClickDropdown,
            onChange,
            ...rest
        },
        ref,
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const {
            ref: dropdownRef,
            isOpen,
            open,
            close,
            selectedValue,
            setSelectedValue,
        } = useDropdown();

        useEffect(() => {
            value && setSelectedValue(value);
        }, [value]);

        const handleInputClick = (e: React.MouseEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            input && input?.focus();
            if (isAutocomplete && isOpen) return;
            onClickDropdown?.(e);
            isOpen ? close() : open();
        };

        const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
            !onChange && setSelectedValue(e.target.value);
            onChange?.(e);
        };

        return (
            <div ref={dropdownRef}>
                <div ref={ref} onClick={handleInputClick}>
                    <Input
                        dropdown
                        ref={inputRef}
                        isDropdownOpen={isOpen}
                        readOnly={!isAutocomplete}
                        value={selectedValue}
                        className={clsx("custom-dropdown__input", className)}
                        onChange={handleOnChange}
                        {...rest}
                    />
                </div>

                {isOpen && children}
            </div>
        );
    },
);

export const CustomDropdown = forwardRef<HTMLDivElement, TCustomDropdown>(
    ({ children, ...rest }, ref) => {
        return (
            <DropdownProvider>
                <CustomDropdownContent ref={ref} {...rest}>
                    {children}
                </CustomDropdownContent>
            </DropdownProvider>
        );
    },
);
