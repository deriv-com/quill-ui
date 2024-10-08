import React, {
    KeyboardEvent,
    MouseEvent,
    ComponentProps,
    forwardRef,
    useEffect,
    useRef,
    useState,
    ReactNode,
} from "react";
import Input, { InputProps } from "../../base";
import { useDropdown } from "@hooks/useDropdown";
import clsx from "clsx";
import useBreakpoints from "@hooks/useBreakpoints";
import ActionSheet from "@components/ActionSheet";
import { KEY, reactNodeToString } from "@utils/common-utils";
import {
    TimeWheelPickerContainer,
    TimeWheelPickerContainerProps,
    TTypeOfWheel,
    TWheelTypeSelectItem,
    WheelPickerContainer as WheelPicker,
    WheelPickerContainerProps,
} from "@components/Atom";
import "./wheel-picker.scss";

type TContainer<T> = T extends "Generic"
    ? WheelPickerContainerProps
    : TimeWheelPickerContainerProps;

type TConditionContent<T> = T extends "Generic"
    ? TWheelPickerContent<"Generic">
    : TWheelPickerContent<"Time">;

interface BaseWheelPickerContent extends InputProps {
    onClickDropdown?: (e: React.MouseEvent<HTMLDivElement>) => void;
    containerClassName?: string;
    actionSheetFooter?: ComponentProps<typeof ActionSheet.Footer>;
    values?: (string | number)[];
    wheelType: TTypeOfWheel;
    onValueChange?: (values: (string | number)[]) => void;
    is12Hour?: boolean;
    selectedTime?: string;
    startTimeIn24Format?: string;
    containerHeight?: string;
    locale?: string;
    hoursInterval?: number;
    minutesInterval?: number;
    container?: typeof TimeWheelPickerContainer | typeof WheelPicker;
}
export type TWheelPickerContent<T extends TTypeOfWheel> =
    BaseWheelPickerContent & TContainer<T>;

export const WheelPickerContent = forwardRef(
    <T extends TTypeOfWheel>(
        {
            data,
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
            wheelType = "Generic",
            is12Hour = true,
            startTimeIn24Format,
            selectedTime: inputTime = "00:00",
            container: Container = WheelPicker,
            containerHeight = "100%",
            hoursInterval = 1,
            minutesInterval = 1,
            ...rest
        }: Omit<TConditionContent<T>, "inputValues" | "setInputValues">,
        ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const actionSheetRef = useRef<HTMLDivElement>(null);

        const [inputValues, setInputValues] =
            useState<(string | number)[]>(values);
        const [isPressed, setIsPressed] = useState(false);
        const [selectedTime, setSelectedTime] = useState<string>(inputTime);

        let initialValues;

        const updateItemAtIndex = (
            index: number,
            newValue: string | number,
        ) => {
            if (wheelType === "Generic")
                setInputValues((prevItems) => {
                    const updatedItems = [...prevItems];
                    updatedItems[index] = newValue;
                    return updatedItems;
                });
        };

        const { isOpen, open, close, selectedValue, setSelectedValue } =
            useDropdown([containerRef, actionSheetRef]);

        const { isMobile } = useBreakpoints();

        if (wheelType === "Generic") {
            initialValues = values.reduce(
                (previousValue, currentValue, index): string => {
                    if (!data?.[index]) return previousValue as string;
                    const selectedItem = data?.[index].find(
                        (item) => item.value === currentValue,
                    );

                    return (
                        index === 0
                            ? reactNodeToString(selectedItem?.label) ||
                              selectedItem?.value
                            : `${previousValue ?? ""} ${reactNodeToString(selectedItem?.label) || selectedItem?.value}`
                    ) as string;
                },
                "",
            ) as string;
        }

        if (wheelType === "Time") {
            initialValues = new Date(
                `1/1/1 ${selectedTime}`,
            ).toLocaleTimeString(rest.locale || navigator.language, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: is12Hour,
            });
        }

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
            if (wheelType === "Generic") {
                onValueChange?.(inputValues);
            }

            if (wheelType === "Time") {
                onValueChange?.([selectedValue || ""]);
            }
        }, [selectedValue]);

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
                    <div
                        className={clsx(
                            "quill-generic-picker__content--container",
                            isOpen &&
                                "quill-generic-picker__content--container__is-open",
                        )}
                    >
                        {!isMobile ? (
                            <div
                                className={clsx(
                                    "quill-generic-picker__content",
                                    isOpen &&
                                        "quill-generic-picker__content__is-open",
                                )}
                            >
                                <Container
                                    data={
                                        data as TWheelTypeSelectItem[][]
                                    }
                                    inputValues={inputValues}
                                    close={close}
                                    setSelectedValue={setSelectedValue}
                                    is12Hour={is12Hour}
                                    setInputValues={(
                                        index: number,
                                        newValue: string | number,
                                    ) => updateItemAtIndex(index, newValue)}
                                    selectedTime={selectedTime}
                                    startTimeIn24Format={startTimeIn24Format}
                                    setSelectedTime={setSelectedTime}
                                    containerHeight={containerHeight}
                                    hoursInterval={hoursInterval}
                                    minutesInterval={minutesInterval}
                                    {...rest}
                                >
                                    {children}
                                </Container>
                            </div>
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
                                            <Container
                                                data={
                                                    data as {
                                                        value: string | number;
                                                        label?:
                                                            | string
                                                            | ReactNode;
                                                    }[][]
                                                }
                                                inputValues={inputValues}
                                                close={close}
                                                setSelectedValue={
                                                    setSelectedValue
                                                }
                                                is12Hour={is12Hour}
                                                setInputValues={(
                                                    index: number,
                                                    newValue: string | number,
                                                ) =>
                                                    updateItemAtIndex(
                                                        index,
                                                        newValue,
                                                    )
                                                }
                                                selectedTime={selectedTime}
                                                startTimeIn24Format={
                                                    startTimeIn24Format
                                                }
                                                setSelectedTime={
                                                    setSelectedTime
                                                }
                                                containerHeight={
                                                    containerHeight
                                                }
                                                hoursInterval={hoursInterval}
                                                minutesInterval={
                                                    minutesInterval
                                                }
                                                {...rest}
                                            >
                                                {children}
                                            </Container>
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
