import { ComponentProps, forwardRef } from "react";
import Input from "../base";
import React from "react";
import clsx from "clsx";
import {
    LabelPairedPlusSmRegularIcon,
    LabelPairedMinusSmRegularIcon,
} from "@deriv/quill-icons";
import "./text-field-with-steppers.scss";

export interface TextFieldWithSteppersProps extends ComponentProps<typeof Input> {
    decimals?: number;
    unitLeft?: string;
    unitRight?: string;
}

export const TextFieldWithSteppers = forwardRef<HTMLInputElement, TextFieldWithSteppersProps>(
    (props, ref) => {
        const { value, onChange, disabled, textAlignment, placeholder = 0, unitLeft = '', unitRight = '', decimals = 2, inputSize = 'md', ...rest } = props;

        const getFormatValue = (value: number) => parseFloat(value.toFixed(decimals));

        const steppersSectionRight = (
            <>
                {textAlignment !== 'center' && (<button className={clsx("quill-input-steppers-button", "quill-input-steppers-button--decrement", `quill-input-steppers-button--${inputSize}`)}
                    onClick={() => {
                            onChange?.({
                                target: { value: getFormatValue(Number(value) - 1) },
                            } as unknown as React.ChangeEvent<HTMLInputElement>);
                    }}
                    disabled={disabled}
                    >
                    <LabelPairedMinusSmRegularIcon />
                </button>)}
                <button className={clsx("quill-input-steppers-button", "quill-input-steppers-button--increment", `quill-input-steppers-button--${inputSize}`)}
                    onClick={() => {
                            onChange?.({
                                target: { value: getFormatValue(Number(value) + 1) },
                            } as unknown as React.ChangeEvent<HTMLInputElement>);
                    }}
                    disabled={disabled}
                    >
                    <LabelPairedPlusSmRegularIcon />
                </button>
            </>
        );

        const steppersSectionLeft = (
            <>
                <button className={clsx("quill-input-steppers-button", "quill-input-steppers-button--decrement", `quill-input-steppers-button--${inputSize}`)}
                    onClick={() => {
                            onChange?.({
                                target: { value: getFormatValue(Number(value) - 1) },
                            } as unknown as React.ChangeEvent<HTMLInputElement>);
                    }}
                    disabled={disabled}
                    >
                    <LabelPairedMinusSmRegularIcon />
                </button>
            </>
        );

        return (
            <div>
                <Input
                    {...rest}
                    ref={ref}
                    disabled={disabled}
                    inputSize={inputSize}
                    leftIcon={textAlignment === 'center' && steppersSectionLeft}
                    leftPlaceholder={unitLeft}
                    onChange={onChange}
                    placeholder={placeholder.toLocaleString("en", { minimumFractionDigits: decimals })}
                    rightPlaceholder={unitRight}
                    textAlignment={textAlignment}
                    triggerActionIcon={steppersSectionRight}
                    type="number"
                    value={`${value && getFormatValue(Number(value))}`}
                />
            </div>
        );
    },
);

export default TextFieldWithSteppers;
