import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { DropdownItem } from "@components/Atom/dropdown";
import "./wheel-picker-base.scss";
import { WheelPickerProps } from "../types";

export const WheelPicker = ({
    data,
    selectedValue,
    setSelectedValue,
    handleKeyDown,
    isFocused,
    dropDownItemClassName,
    containerClassName,
    listClassName,
    position,
    containerHeight = "100%",
    ...rest
}: WheelPickerProps) => {
    const itemsRefs = useRef<HTMLDivElement[]>([]);
    const [inputData, setInputData] = useState(data);
    const dataItemsMap = useMemo(
        () =>
            data.reduce(
                (map, item, index) => map.set(item.value, index),
                new Map(),
            ),
        [data],
    );

    const [currentDataValue, setCurrentValue] = useState(
        dataItemsMap.get(selectedValue) ?? 0,
    );
    const itemsContainerRef = useRef<HTMLUListElement>(null);

    const handleDataScroll = (event: Event) => {
        if (!event.target) return;
        const scrollTop = Math.max(
            (event.target as HTMLUListElement).scrollTop,
            0,
        );
        const selectedElement = Math.min(
            Math.max(Math.floor(scrollTop / 48), 0),
            inputData.length - 1,
        );

        (itemsRefs.current[selectedElement] as HTMLDivElement)?.focus({
            preventScroll: true,
        });
        setSelectedValue(inputData[selectedElement].value);
    };

    const resizeObserver = new ResizeObserver(() => {
        const index = Number(currentDataValue);
        if (!itemsContainerRef?.current) return;
        const divHeight = itemsContainerRef?.current.clientHeight;
        itemsContainerRef.current.style.paddingTop = `${divHeight * 0.5}px`;
        itemsContainerRef.current.style.paddingBottom = `${divHeight * 0.5}px`;
        if (itemsRefs.current[index]) {
            (itemsRefs.current[index] as HTMLDivElement).scrollIntoView({
                block: "center",
            });
        }
    });

    useEffect(() => {
        if (!itemsContainerRef.current) return;
        setSelectedValue(inputData[currentDataValue]?.value);
        resizeObserver.observe(itemsContainerRef.current);
        itemsContainerRef.current.addEventListener("scroll", handleDataScroll);
        return () => {
            resizeObserver.disconnect();
            itemsContainerRef.current?.removeEventListener(
                "scroll",
                handleDataScroll,
            );
        };
    }, [inputData]);

    useEffect(() => {
        setInputData(data);
        setCurrentValue(dataItemsMap.get(selectedValue) ?? 0);
    }, [data]);

    useEffect(() => {
        if (isFocused) {
            itemsRefs.current[dataItemsMap.get(selectedValue)]?.focus();
        }
    }, [isFocused]);

    return (
        <div
            className={clsx(
                "quill-wheel-picker__container",
                `quill-wheel-picker__container-disabled-${rest?.disabled}`,
                containerClassName,
            )}
            style={{ height: containerHeight }}
        >
            <ul
                className={clsx(
                    "quill-wheel-picker__data-items",
                    `quill-wheel-picker__data-items-${position}`,
                    listClassName,
                )}
                role="listbox"
                ref={itemsContainerRef}
                {...rest}
            >
                {inputData.map(({ value, label }, index) => {
                    return (
                        <DropdownItem
                            className={clsx(
                                "quill-wheel-picker__data-item",
                                dropDownItemClassName,
                            )}
                            tabIndex={0}
                            label={label ?? value}
                            role="option"
                            textAlignment="center"
                            ref={(node: HTMLDivElement) =>
                                (itemsRefs.current[index] = node)
                            }
                            key={value}
                            onKeyDown={handleKeyDown}
                            onClick={() => {
                                itemsRefs.current[index]?.scrollIntoView({
                                    block: "center",
                                    behavior: "smooth",
                                    inline: "nearest",
                                });
                                itemsRefs.current[index]?.focus();
                            }}
                            disabled={inputData[index].value !== selectedValue}
                        >
                            {value}
                        </DropdownItem>
                    );
                })}
            </ul>
        </div>
    );
};

export default WheelPicker;
