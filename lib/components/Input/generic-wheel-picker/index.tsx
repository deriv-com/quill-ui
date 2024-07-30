import React, {
    KeyboardEvent,
    MouseEvent,
    ComponentProps,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from "react";
import Input, { InputProps } from "../base";
import { useDropdown } from "@hooks/useDropdown";
import clsx from "clsx";
import { DropdownProvider } from "@providers/dropdown/dropdownProvider";
import useBreakpoints from "@hooks/useBreakpoints";
import ActionSheet from "@components/ActionSheet";
import WheelPickerContainer from "@components/Atom/WheelPicker";
import "./generic-wheel-picker.scss";

export interface TGenericWheelPickerContent extends InputProps {
    onClickDropdown?: (e: React.MouseEvent<HTMLDivElement>) => void;
    containerClassName?: string;
    actionSheetFooter?: ComponentProps<typeof ActionSheet.Footer>;
    data: { value: string | number }[][];
    values: string[] | number[];
    onValueChange?: (value: (string | number)[]) => void;
}

const GenericWheelPickerContent = forwardRef<
    HTMLDivElement,
    TGenericWheelPickerContent
>(
    (
        {
            children,
            className,
            values = [],
            onClickDropdown,
            onValueChange,
            containerClassName,
            actionSheetFooter,
            label,
            leftIcon,
            rightIcon,
            ...rest
        },
        ref,
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const actionSheetRef = useRef<HTMLDivElement>(null);

        const [daataValue, setDataValue] =
            useState<(string | number)[]>(values);

        const updateItemAtIndex = (
            index: number,
            newValue: string | number,
        ) => {
            setDataValue((prevItems) => {
                const updatedItems = [...prevItems];
                updatedItems[index] = newValue;
                return updatedItems;
            });
        };

        const { isOpen, open, close, selectedValue, setSelectedValue } =
            useDropdown([containerRef, actionSheetRef]);

        const { isMobile } = useBreakpoints();

        const handleInputClick = (e: MouseEvent<HTMLDivElement>) => {
            onClickDropdown?.(e);
            isOpen ? close() : open();
        };

        const handleKeyDownEvent = (e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "ArrowDown") {
                open();
            }
            
        };

        useEffect(() => {
            if (onValueChange) onValueChange(daataValue);
        }, [selectedValue]);

        return (
            <>
                <div
                    ref={containerRef}
                    className={clsx(
                        "quill-generic-picker__container",
                        `quill-generic-picker__is-open--${isOpen}`,
                        containerClassName,
                    )}
                >
                    <div ref={ref} onClick={handleInputClick} onKeyDown={handleKeyDownEvent}>
                        <Input
                            dropdown
                            isDropdownOpen={isOpen}
                            value={selectedValue}
                            autoFocus={false}
                            autoComplete="off"
                            className={clsx(
                                "quill-generic-picker__input",
                                `quill-generic-picker__input--hasValue--${!!selectedValue}`,
                                className,
                            )}
                            type="text"
                            label={label}
                            leftIcon={leftIcon}
                            rightIcon={rightIcon}
                            {...rest}
                        />
                    </div>
                    <div className="quill-generic-picker__content--container">
                        {!isMobile ? (
                            isOpen && (
                                <div className="quill-generic-picker__content">
                                    <WheelPickerContainer
                                        dataValues={daataValue}
                                        close={close}
                                        setSelectedValue={setSelectedValue}
                                        setdataValues={(
                                            index: number,
                                            newValue: string | number,
                                        ) => updateItemAtIndex(index, newValue)}
                                        {...rest}
                                    >
                                        {children}
                                    </WheelPickerContainer>
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
                                    ref={actionSheetRef}
                                >
                                    {label && (
                                        <ActionSheet.Header title={label} />
                                    )}
                                    {
                                        <ActionSheet.Content className="quill-generic-picker__content--hide-scrollbar">
                                            <WheelPickerContainer
                                                data={rest.data}
                                                dataValues={daataValue}
                                                close={close}
                                                setSelectedValue={
                                                    setSelectedValue
                                                }
                                                setdataValues={(
                                                    index: number,
                                                    newValue: string | number,
                                                ) =>
                                                    updateItemAtIndex(
                                                        index,
                                                        newValue,
                                                    )
                                                }
                                            >
                                                {children}
                                            </WheelPickerContainer>
                                        </ActionSheet.Content>
                                    }
                                    <ActionSheet.Footer
                                        {...actionSheetFooter}
                                    />
                                </ActionSheet.Portal>
                            </ActionSheet.Root>
                        )}
                    </div>
                </div>
            </>
        );
    },
);

export const GenericWheelPicker = forwardRef<
    HTMLDivElement,
    TGenericWheelPickerContent
>(({ children, ...rest }, ref) => {
    return (
        <DropdownProvider>
            <GenericWheelPickerContent ref={ref} {...rest}>
                {children}
            </GenericWheelPickerContent>
        </DropdownProvider>
    );
});

export default GenericWheelPicker;
