import React, { ChangeEvent, forwardRef, useEffect, useRef } from "react";
import Input, { InputProps } from "../base";
import { useDropdown } from "@hooks/useDropdown";
import clsx from "clsx";
import { DropdownProvider } from "@providers/dropdown/dropdownProvider";
import "./custom-dropdown.scss";
import useBreakpoints from "@hooks/useBreakpoints";
import ActionSheet from "@components/ActionSheet";

export interface TCustomDropdown extends InputProps {
    isAutocomplete?: boolean;
    onClickDropdown?: (e: React.MouseEvent<HTMLDivElement>) => void;
    containerClassName?: string;
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
            containerClassName,
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

        const { isMobile } = useBreakpoints();

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
            const { value } = e.target;

            !onChange && !value
                ? setSelectedValue("")
                : setSelectedValue(value);
            onChange?.(e);
        };

        return (
            <div
                ref={dropdownRef}
                className={clsx(
                    "quill-custom-dropdown__container",
                    `quill-custom-dropdown__is-open--${isOpen}`,
                    containerClassName,
                )}
            >
                <div ref={ref} onClick={handleInputClick}>
                    <Input
                        dropdown
                        ref={inputRef}
                        isDropdownOpen={isOpen}
                        readOnly={!isAutocomplete}
                        value={selectedValue}
                        className={clsx(
                            "quill-custom-dropdown__input",
                            `quill-custom-dropdown__input--hasValue--${!!selectedValue}`,
                            className,
                        )}
                        onChange={handleOnChange}
                        type="select"
                        {...rest}
                    />
                </div>
                <div className="quill-custom-dropdown__content--container">
                    {!isMobile ? (
                        isOpen && (
                            <div className="quill-custom-dropdown__content">
                                {children}
                            </div>
                        )
                    ) : (
                        <ActionSheet.Root
                            isOpen={isOpen}
                            onClose={() => close()}
                        >
                            <ActionSheet.Portal
                                shouldCloseOnDrag={true}
                                fullHeightOnOpen={true}
                            >
                                <ActionSheet.Content>
                                    {children}
                                </ActionSheet.Content>
                                <ActionSheet.Footer
                                    primaryAction={{
                                        content: "Primary",
                                        onAction: () => close(),
                                    }}
                                    secondaryAction={{
                                        content: "Secondary",
                                        onAction: () => close(),
                                    }}
                                />
                            </ActionSheet.Portal>
                        </ActionSheet.Root>
                    )}
                </div>
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
