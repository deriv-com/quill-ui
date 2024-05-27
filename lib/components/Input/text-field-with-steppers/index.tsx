import { ComponentProps, forwardRef } from "react";
import Input from "../base";
import React from "react";
import clsx from "clsx";
import {
    LabelPairedPlusSmRegularIcon,
    LabelPairedMinusSmRegularIcon,
} from "@deriv/quill-icons";
import "./text-field-with-steppers.scss";
import { TLeftOrRight } from "@types";

export interface TextFieldWithSteppersProps extends ComponentProps<typeof Input> {
    unit?: string;
    decimals?: number;
    unitPlacement?: TLeftOrRight;
}

export const TextFieldWithSteppers = forwardRef<HTMLInputElement, TextFieldWithSteppersProps>(
    (props, ref) => {
        const { value, onChange, disabled, textAlignment, placeholder = 0, unit = '', decimals = 2, unitPlacement = 'left' } = props;

        const getFormatValue = (value: number) => parseFloat(value.toFixed(decimals));

        const steppersSectionRight = (
            <>
                {textAlignment !== 'center' && (<button className={clsx("quill-input-steppers-decrement", disabled && 'quill-input-steppers--disabled')}
                    onClick={() => {
                        if (!disabled) {
                            onChange?.({
                                target: { value: getFormatValue(Number(value) - 1) },
                            } as unknown as React.ChangeEvent<HTMLInputElement>);
                        }
                    }}>
                    <LabelPairedMinusSmRegularIcon />
                </button>)}
                <button className={clsx("quill-input-steppers-increment", disabled && 'quill-input-steppers--disabled')}
                    onClick={() => {
                        if (!disabled) {
                            onChange?.({
                                target: { value: getFormatValue(Number(value) + 1) },
                            } as unknown as React.ChangeEvent<HTMLInputElement>);
                        }
                    }}>
                    <LabelPairedPlusSmRegularIcon />
                </button>
            </>
        );

        const steppersSectionLeft = (
            <>
                <button className={clsx("quill-input-steppers-decrement", disabled && 'quill-input-steppers--disabled')}
                    onClick={() => {
                        if (!disabled) {
                            onChange?.({
                                target: { value: getFormatValue(Number(value) - 1) },
                            } as unknown as React.ChangeEvent<HTMLInputElement>);
                        }
                    }}>
                    <LabelPairedMinusSmRegularIcon />
                </button>
            </>
        );

        return (
            <div>
                <Input
                    {...props}
                    ref={ref}
                    triggerActionIcon={steppersSectionRight}
                    leftIcon={textAlignment === 'center' && steppersSectionLeft}
                    type="number"
                    value={`${value && getFormatValue(Number(value))}`}
                    placeholder={placeholder.toLocaleString("en", { minimumFractionDigits: decimals })}
                    leftPlaceholder={unitPlacement === "left" ? unit : undefined}
                    rightPlaceholder={unitPlacement === "right" ? unit : undefined}
                />
            </div>
        );
    },
);

export default TextFieldWithSteppers;
