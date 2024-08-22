import React, { KeyboardEvent, useEffect, useState } from "react";
import WheelPicker from "../base";
import { KEY, reactNodeToString } from "@utils/common-utils";
import { WheelPickerContainerProps } from "../types";
import { THorizontalPosition } from "@types";

export const WheelPickerContainer = ({
    data = [],
    inputValues = [],
    setInputValues = () => null,
    close,
    setSelectedValue,
    disabled,
    containerHeight='100%',
}: WheelPickerContainerProps) => {
    const [colRef, setColRef] = useState<boolean[]>(
        new Array(data.length).fill(false),
    );

    useEffect(() => {
        if (setSelectedValue) {
            setSelectedValue(
                inputValues.reduce(
                    (previousValue, currentValue, index): string => {
                        if (!data[index]) return previousValue as string;
                        const selectedItem = data[index].find(
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
                ) as string,
            );
        }
    }, [inputValues]);

    const handleKeyDown = (e: KeyboardEvent<Element>, index: number) => {
        setColRef(new Array(data.length).fill(false));
        switch (e.key) {
            case KEY.ARROW_RIGHT:
                if (index === 0) {
                    setColRef([false, true, false]);
                } else if (index === 1) {
                    setColRef([false, false, true]);
                }

                break;
            case KEY.ARROW_LEFT:
                if (index === 2) {
                    setColRef([false, true, false]);
                } else if (index === 1) {
                    setColRef([true, false, false]);
                }
                break;
            case KEY.ENTER:
            case KEY.ESCAPE:
                close && close();
                break;
            default:
                break;
        }
    };

    const getPosition = (index: number): THorizontalPosition | undefined => {
        if (data.length === 1) return;
        if (index === 0 && data.length > 1) return "left";
        if (index === data.length - 1 && data.length > 1) return "right";
        return "center";
    };
    return (
        <div className="quill-wheel-picker">
            {data.map((item, index) => {
                return (
                    <WheelPicker
                        key={`wheel-picker__${index}`}
                        data={item}
                        selectedValue={inputValues[index]}
                        setSelectedValue={(value) =>
                            setInputValues(index, value)
                        }
                        isFocused={colRef[index]}
                        handleKeyDown={(e) => handleKeyDown(e, index)}
                        position={getPosition(index)}
                        disabled={disabled}
                        containerHeight={containerHeight}
                    />
                );
            })}
        </div>
    );
};

export default WheelPickerContainer;
