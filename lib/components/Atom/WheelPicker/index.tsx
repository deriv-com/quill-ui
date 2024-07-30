import {
    HTMLAttributes,
    KeyboardEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { DropdownItem } from "../dropdown";
import clsx from "clsx";
import "./wheel-picker.scss";
import { InputProps } from "@components/Input/base";

export interface WheelPickerProps extends HTMLAttributes<HTMLElement> {
    data: { value: string | number }[];
    selectedValue: string | number;
    setSelectedValue: (value: string | number) => void;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    focus: boolean;
    dropDownItemClassName?: string;
    containerClassName?: string;
    listClassName?: string;
}

export const WheelPicker = ({
    data,
    selectedValue,
    setSelectedValue,
    handleKeyDown,
    focus,
    dropDownItemClassName,
    containerClassName,
    listClassName,
    ...rest
}: WheelPickerProps) => {
    const dataRefs = useRef<HTMLDivElement[]>([]);
    const dataItemsMap = useMemo(
        () =>
            data.reduce(
                (map, item, index) => map.set(item.value, index),
                new Map(),
            ),
        [data],
    );

    const currentDataValue = useRef(dataItemsMap.get(selectedValue) ?? 0);
    const dataItemsContRef = useRef<HTMLUListElement>(null);

    const handleDataScroll = (event: Event) => {
        let isAnimating = false;
        if (!isAnimating) {
            isAnimating = true;
            if (!event.target) return;
            const scrollTop = Math.max(
                (event.target as HTMLUListElement).scrollTop,
                0,
            );
            const selectedElement = Math.min(
                Math.max(Math.floor(scrollTop / 48), 0),
                data.length - 1,
            );
            (dataRefs.current[selectedElement] as HTMLDivElement)?.focus({
                preventScroll: true,
            });
            setSelectedValue(data[selectedElement].value);
            isAnimating = false;
        }
    };

    const resizeObserver = new ResizeObserver(() => {
        const index = Number(currentDataValue.current);
        if (!dataItemsContRef?.current) return;
        const divHeight = dataItemsContRef?.current.clientHeight;
        dataItemsContRef.current.style.paddingTop = `${divHeight * 0.5}px`;
        dataItemsContRef.current.style.paddingBottom = `${divHeight * 0.5}px`;
        if (dataRefs.current[index]) {
            (dataRefs.current[index] as HTMLDivElement).scrollIntoView({
                block: "center",
            });
        }
    });

    useEffect(() => {
        if (!dataItemsContRef.current) return;
        setSelectedValue(data[currentDataValue.current].value);
        const divHeight = dataItemsContRef?.current.clientHeight;
        resizeObserver.observe(dataItemsContRef.current);
        dataItemsContRef.current.style.paddingTop = `${divHeight * 0.5}px`;
        dataItemsContRef.current.style.paddingBottom = `${divHeight * 0.5}px`;
        dataItemsContRef.current.addEventListener("scroll", handleDataScroll);
        return () => {
            dataItemsContRef.current?.removeEventListener(
                "scroll",
                handleDataScroll,
            );
        };
    }, []);

    useEffect(() => {
        if (focus) {
            dataRefs.current[dataItemsMap.get(selectedValue)]?.focus();
        }
    }, [focus]);

    return (
        <div
            className={clsx(
                "quill-wheel-picker__container",
                containerClassName,
            )}
        >
            <ul
                className={clsx(
                    "quill-wheel-picker__data-items",
                    listClassName,
                )}
                role="listbox"
                ref={dataItemsContRef}
            >
                {data.map(({ value }, index) => {
                    return (
                        <DropdownItem
                            {...rest}
                            className={clsx(
                                "quill-wheel-picker__data-item",
                                dropDownItemClassName,
                            )}
                            label={value}
                            role="option"
                            tabIndex={0}
                            textAlignment="center"
                            ref={(node: HTMLDivElement) =>
                                (dataRefs.current[index] = node)
                            }
                            key={index}
                            onKeyDown={handleKeyDown}
                            onClick={() => {
                                dataRefs.current[index]?.scrollIntoView({
                                    block: "center",
                                });
                                dataRefs.current[index]?.focus();
                                setSelectedValue(data[index].value);
                            }}
                            disabled={data[index].value !== selectedValue}
                        >
                            {value}
                        </DropdownItem>
                    );
                })}
            </ul>
        </div>
    );
};

export interface WheelPickerContainerProps extends InputProps {
    data: { value: string | number }[][];
    dataValues: (string | number)[];
    setdataValues: (index: number, value: string | number) => void;
    children?: React.ReactNode;
    close?: () => void;
    setSelectedValue?: (value: string) => void;
}

const WheelPickerContainer = ({
    data = [],
    dataValues = [],
    setdataValues,
    close,
    setSelectedValue,
    ...rest
}: WheelPickerContainerProps) => {
    const [colRef, setColRef] = useState<boolean[]>(
        new Array(data.length).fill(false),
    );

    useEffect(() => {
        if (setSelectedValue)
            setSelectedValue(
                `${dataValues[0] ?? ""} ${dataValues[1] ?? ""} ${dataValues[2] ?? ""}`,
            );
    }, [dataValues]);

    const handleKeyDown = (e: KeyboardEvent<Element>, index: number) => {
        setColRef(new Array(data.length).fill(false));
        switch (e.key) {
            case "ArrowRight":
                if (index === 0) {
                    setColRef([false, true, false]);
                } else if (index === 1) {
                    setColRef([false, false, true]);
                }

                break;
            case "ArrowLeft":
                if (index === 2) {
                    setColRef([false, true, false]);
                } else if (index === 1) {
                    setColRef([true, false, false]);
                }
                break;
            case "Enter":
            case "Escape":
                close && close();
                break;
            default:
                break;
        }
    };

    return (
        <div className="quill-wheel-picker">
            {data.map((item, index) => {
                return (
                    <WheelPicker
                        key={`wheel-picker__${index}`}
                        data={item}
                        selectedValue={dataValues[index]}
                        setSelectedValue={(value) =>
                            setdataValues(index, value)
                        }
                        focus={colRef[index]}
                        handleKeyDown={(e) => handleKeyDown(e, index)}
                        {...rest}
                    />
                );
            })}
        </div>
    );
};

export default WheelPickerContainer;
