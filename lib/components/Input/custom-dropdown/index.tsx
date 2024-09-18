import React, {
    ChangeEvent,
    ComponentProps,
    forwardRef,
    useContext,
    useEffect,
    useRef,
} from "react";
import Input, { InputProps } from "../base";
import { useDropdown } from "@hooks/useDropdown";
import clsx from "clsx";
import {
    DropdownProvider,
    TDropdownProvider,
} from "@providers/dropdown/dropdownProvider";
import "./custom-dropdown.scss";
import useBreakpoints from "@hooks/useBreakpoints";
import ActionSheet from "@components/ActionSheet";
import { DropdownContext } from "@providers/dropdown/dropdownContext";

export interface TCustomDropdown
    extends InputProps,
        Omit<TDropdownProvider, "children"> {
    isAutocomplete?: boolean;
    onClickDropdown?: (e: React.MouseEvent<HTMLDivElement>) => void;
    containerClassName?: string;
    contentClassName?: string;
    actionSheetFooter?: ComponentProps<typeof ActionSheet.Footer>;
    fullHeightOnOpen?: boolean;
    headComponent?: React.ReactNode;
    noActionSheet?: boolean;
    contentAlign?: "left" | "right";
    noAutoClose?: boolean;
    withProvider?: boolean;
    actionSheetDropdown?: boolean;
}

const CustomDropdownContent = forwardRef<HTMLDivElement, TCustomDropdown>(
    (
        {
            children,
            className,
            isAutocomplete = false,
            value,
            onClickDropdown,
            fullHeightOnOpen = true,
            onChange,
            containerClassName,
            contentClassName,
            actionSheetFooter,
            label,
            headComponent,
            noActionSheet = false,
            contentAlign = "left",
            noAutoClose = false,
            disabled,
            actionSheetDropdown = false,
            ...rest
        },
        ref,
    ) => {
        const context = useContext(DropdownContext);

        if (!context) {
            throw new Error(
                "Custom dropdown must be used within a DropdownProvider",
            );
        }

        const inputRef = useRef<HTMLInputElement>(null);
        const containerRef = useRef<HTMLDivElement>(null);
        const actionSheetRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);

        const { isOpen, open, close, selectedValue, setSelectedValue } =
            useDropdown(
                [containerRef, actionSheetRef, contentRef],
                noAutoClose,
            );

        const { isMobile } = useBreakpoints();

        useEffect(() => {
            value && setSelectedValue(value);
        }, [value]);

        const handleInputClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!disabled) {
                const input = inputRef.current;
                input && input?.focus();
                if (isAutocomplete && isOpen) return;
                onClickDropdown?.(e);
                isOpen ? close() : open();
            }
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
                ref={ref}
                className={clsx(
                    "quill-custom-dropdown__container",
                    containerClassName,
                )}
            >
                <div
                    ref={containerRef}
                    onClick={handleInputClick}
                    className="quill-custom-dropdown__head"
                >
                    {!headComponent ? (
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
                            label={label}
                            {...rest}
                        />
                    ) : (
                        headComponent
                    )}
                </div>
                {!actionSheetDropdown && (!isMobile || noActionSheet) ? (
                    isOpen && (
                        <div
                            className={clsx(
                                "quill-custom-dropdown__content",
                                `quill-custom-dropdown__content-align--${contentAlign}`,
                                contentClassName,
                            )}
                            ref={contentRef}
                        >
                            {children}
                        </div>
                    )
                ) : (
                    <ActionSheet.Root isOpen={isOpen} onClose={() => close()}>
                        <ActionSheet.Portal
                            shouldCloseOnDrag={true}
                            fullHeightOnOpen={fullHeightOnOpen}
                            ref={actionSheetRef}
                        >
                            {label && <ActionSheet.Header title={label} />}
                            <ActionSheet.Content>
                                {children}
                            </ActionSheet.Content>
                            <ActionSheet.Footer {...actionSheetFooter} />
                        </ActionSheet.Portal>
                    </ActionSheet.Root>
                )}
            </div>
        );
    },
);

export const CustomDropdown = forwardRef<HTMLDivElement, TCustomDropdown>(
    ({ children, withProvider = true, onOpen, onClose, ...rest }, ref) => {
        return withProvider ? (
            <DropdownProvider onOpen={onOpen} onClose={onClose}>
                <CustomDropdownContent ref={ref} {...rest}>
                    {children}
                </CustomDropdownContent>
            </DropdownProvider>
        ) : (
            <CustomDropdownContent ref={ref} {...rest}>
                {children}
            </CustomDropdownContent>
        );
    },
);
