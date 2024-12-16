import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { DropdownItem } from "@components/Atom/dropdown";
import "./wheel-picker-base.scss";
import { TWheelTypeSelectItem, WheelPickerProps } from "../types";

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
    const [inputData, setInputData] = useState<TWheelTypeSelectItem[]>([]);
    const [selectedValueInternal, setSelectedValueInternal] = useState<
        string | number
    >(selectedValue);
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
        setSelectedValueInternal(inputData[selectedElement].value);
    };

    useEffect(() => {
        let resizeTimeout: NodeJS.Timeout | null = null;
        const resizeObserver = new ResizeObserver(() => {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(() => {
                const index = Number(currentDataValue);
                if (!itemsContainerRef?.current || index < 0 || index >= inputData.length) return;
                const divHeight = itemsContainerRef.current.clientHeight;
                itemsContainerRef.current.style.paddingTop = `${divHeight * 0.5}px`;
                itemsContainerRef.current.style.paddingBottom = `${divHeight * 0.5}px`;
                if (itemsRefs.current[index]) {
                    (itemsRefs.current[index] as HTMLDivElement).scrollIntoView({
                        block: "center",
                    });
                }
            }, 0); 
        });
        if (!itemsContainerRef.current) return;
        setSelectedValue(inputData[currentDataValue]?.value);
        setSelectedValueInternal(inputData[currentDataValue]?.value);
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

    return inputData.length > 0 ? (
        <div
            className={clsx(
                "quill-wheel-picker__container",
                rest?.disabled && "quill-wheel-picker__container-disabled",
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
                            disabled={
                                inputData[index].value !== selectedValueInternal
                            }
                        >
                            {value}
                        </DropdownItem>
                    );
                })}
            </ul>
        </div>
    ) : null;
};

export default WheelPicker;
