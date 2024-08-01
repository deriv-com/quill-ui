import { KeyboardEvent, useEffect, useState } from "react";
import { InputProps } from "@components/Input/base";
import WheelPicker from "./base";

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
        if (setSelectedValue) {
            setSelectedValue(
                dataValues.reduce((previousValue, currentValue) => {
                    return `${previousValue ?? ""} ${currentValue ?? ""}`;
                }, "") as string,
            );
        }
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

    const getPosition =(index: number) => {
        if(data.length === 1) return;
        if(index === 0 && data.length > 1) return 'first';
        if(index === data.length -1 && data.length > 1) return 'last';
        return 'center';
    }
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
                        position={getPosition(index)}
                        {...rest}
                    />
                );
            })}
        </div>
    );
};

export default WheelPickerContainer;
