import { KeyboardEvent, useEffect, useState } from "react";
import { InputProps } from "@components/Input/base";
import WheelPicker from "./base";
import { KEY } from "@utils/common-utils";

export interface WheelPickerContainerProps extends InputProps {
    data: { value: string | number }[][];
    inputValues: (string | number)[];
    setInputValues: (index: number, value: string | number) => void;
    children?: React.ReactNode;
    close?: () => void;
    setSelectedValue?: (value: string) => void;
}

const WheelPickerContainer = ({
    data = [],
    inputValues = [],
    setInputValues,
    close,
    setSelectedValue,
    ...rest
}: WheelPickerContainerProps) => {
    const [colRef, setColRef] = useState<boolean[]>(
        new Array(data.length).fill(false),
    );

    useEffect(() => {
        if (setSelectedValue) {
            setSelectedValue(
                inputValues.reduce((previousValue, currentValue, index) => {
                    if(index === 0) return currentValue;
                    return `${previousValue ?? ""} ${currentValue ?? ""}`;
                }, "") as string,
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

    const getPosition = (index: number) => {
        if (data.length === 1) return;
        if (index === 0 && data.length > 1) return "first";
        if (index === data.length - 1 && data.length > 1) return "last";
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
                        {...rest}
                    />
                );
            })}
        </div>
    );
};

export default WheelPickerContainer;
