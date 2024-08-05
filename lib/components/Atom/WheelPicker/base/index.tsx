import { HTMLAttributes, useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import { DropdownItem } from "@components/Atom/dropdown";
import "./wheel-picker.scss";
import { THorizontalPosition } from "@types";

export interface WheelPickerProps extends HTMLAttributes<HTMLElement> {
    data: { value: string | number }[];
    selectedValue: string | number;
    setSelectedValue: (value: string | number) => void;
    handleKeyDown?: (e: React.KeyboardEvent) => void;
    isFocused?: boolean;
    dropDownItemClassName?: string;
    containerClassName?: string;
    listClassName?: string;
    position?: THorizontalPosition | undefined;
}

const WheelPicker = ({
    data,
    selectedValue,
    setSelectedValue,
    handleKeyDown,
    isFocused,
    dropDownItemClassName,
    containerClassName,
    listClassName,
    position,
    ...rest
}: WheelPickerProps) => {
    const itemsRefs = useRef<HTMLDivElement[]>([]);
    const dataItemsMap = useMemo(
        () =>
            data.reduce(
                (map, item, index) => map.set(item.value, index),
                new Map(),
            ),
        [data],
    );

    const currentDataValue = useRef(dataItemsMap.get(selectedValue) ?? 0);
    const itemsContainerRef = useRef<HTMLUListElement>(null);

    const handleDataScroll = (event: Event) => {
        if (!event.target) return;
        const scrollTop = Math.max(
            (event.target as HTMLUListElement).scrollTop,
            0,
        );
        const selectedElement = Math.min(
            Math.max(Math.floor(scrollTop / 48), 0),
            data.length - 1,
        );
        (itemsRefs.current[selectedElement] as HTMLDivElement)?.focus({
            preventScroll: true,
        });
        setSelectedValue(data[selectedElement].value);
    };

    const resizeObserver = new ResizeObserver(() => {
        const index = Number(currentDataValue.current);
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
        setSelectedValue(data[currentDataValue.current].value);
        resizeObserver.observe(itemsContainerRef.current);
        itemsContainerRef.current.addEventListener("scroll", handleDataScroll);
        return () => {
            resizeObserver.disconnect();
            itemsContainerRef.current?.removeEventListener(
                "scroll",
                handleDataScroll,
            );
        };
    }, []);

    useEffect(() => {
        if (isFocused) {
            itemsRefs.current[dataItemsMap.get(selectedValue)]?.focus();
        }
    }, [isFocused]);

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
                    `quill-wheel-picker__data-items-${position}`,
                    listClassName,
                )}
                role="listbox"
                ref={itemsContainerRef}
            >
                {data.map(({ value }, index) => {
                    return (
                        <DropdownItem
                            {...rest}
                            className={clsx(
                                "quill-wheel-picker__data-item",
                                dropDownItemClassName,
                            )}
                            tabIndex={0}
                            label={value}
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
                                });
                                itemsRefs.current[index]?.focus();
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

export default WheelPicker;
