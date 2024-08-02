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
import { KEY } from "@utils/common-utils";
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
        const contentRef = useRef<HTMLDivElement>(null);
        const actionSheetRef = useRef<HTMLDivElement>(null);

        const [inputValues, setInputValues] =
            useState<(string | number)[]>(values);
        const [isPressed, setIsPressed] = useState(false);

        const initialValues = values.reduce(
            (previousValue, currentValue, index) => {
                if (index === 0) return currentValue;
                return `${previousValue ?? ""} ${currentValue ?? ""}`;
            },
            "",
        ) as string;

        const updateItemAtIndex = (
            index: number,
            newValue: string | number,
        ) => {
            setInputValues((prevItems) => {
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
            if (e.key === KEY.ARROW_DOWN) {
                open();
            }
        };

        useEffect(() => {
            onValueChange?.(inputValues);
        }, [selectedValue]);

        useEffect(() => {
            if (!contentRef.current) return;
            const contentRefrence = contentRef.current;
            setTimeout(() => {
                if (isOpen) {
                    contentRefrence.classList.add(
                        "quill-generic-picker__content__is-open",
                    );
                } else {
                    contentRefrence.classList.remove(
                        "quill-generic-picker__content__is-open",
                    );
                }
            }, 100);
        }, [isOpen]);

        return (
            <>
                <div
                    ref={containerRef}
                    className={clsx(
                        "quill-generic-picker__container",
                        containerClassName,
                    )}
                >
                    <div
                        ref={ref}
                        onClick={handleInputClick}
                        onKeyDown={handleKeyDownEvent}
                        onMouseDown={() => setIsPressed(true)}
                        onMouseUp={() => setIsPressed(false)}
                        onMouseLeave={() => setIsPressed(false)}
                    >
                        <Input
                            dropdown
                            isDropdownOpen={isOpen}
                            value={selectedValue ?? initialValues}
                            autoFocus={false}
                            autoComplete="off"
                            readOnly
                            className={clsx(
                                "quill-generic-picker__input",
                                `quill-generic-picker__input--is-open-${isOpen && !isPressed}--${rest.variant}--${rest.status}`,
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
                                <div
                                    ref={contentRef}
                                    className="quill-generic-picker__content"
                                >
                                    <WheelPickerContainer
                                        inputValues={inputValues}
                                        close={close}
                                        setSelectedValue={setSelectedValue}
                                        setInputValues={(
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
                            <ActionSheet.Root isOpen={isOpen} onClose={close}>
                                <ActionSheet.Portal
                                    shouldCloseOnDrag
                                    fullHeightOnOpen
                                    ref={actionSheetRef}
                                >
                                    {label && (
                                        <ActionSheet.Header title={label} />
                                    )}
                                    {
                                        <ActionSheet.Content className="quill-generic-picker__content--hide-scrollbar">
                                            <WheelPickerContainer
                                                data={rest.data}
                                                inputValues={inputValues}
                                                close={close}
                                                setSelectedValue={
                                                    setSelectedValue
                                                }
                                                setInputValues={(
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
