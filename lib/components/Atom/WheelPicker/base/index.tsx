import { HTMLAttributes, useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import { DropdownItem } from "@components/Atom/dropdown";
import "./wheel-picker.scss";

export interface WheelPickerProps extends HTMLAttributes<HTMLElement> {
    data: { value: string | number }[];
    selectedValue: string | number;
    setSelectedValue: (value: string | number) => void;
    handleKeyDown?: (e: React.KeyboardEvent) => void;
    isFocused?: boolean;
    dropDownItemClassName?: string;
    containerClassName?: string;
    listClassName?: string;
    position?: "first" | "center" | "last" | undefined;
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
        resizeObserver.observe(dataItemsContRef.current);
        dataItemsContRef.current.addEventListener("scroll", handleDataScroll);
        return () => {
            resizeObserver.disconnect();
            dataItemsContRef.current?.removeEventListener(
                "scroll",
                handleDataScroll,
            );
        };
    }, []);

    useEffect(() => {
        if (isFocused) {
            dataRefs.current[dataItemsMap.get(selectedValue)]?.focus();
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
                            tabIndex={0}
                            label={value}
                            role="option"
                            textAlignment="center"
                            ref={(node: HTMLDivElement) =>
                                (dataRefs.current[index] = node)
                            }
                            key={value}
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

export default WheelPicker;
