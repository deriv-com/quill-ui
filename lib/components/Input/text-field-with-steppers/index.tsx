import { ComponentProps, forwardRef } from "react";
import Input from "../base";
import React from "react";
import clsx from "clsx";
import {
    LabelPairedPlusSmRegularIcon,
    LabelPairedMinusSmRegularIcon,
} from "@deriv/quill-icons";
import "./text-field-with-steppers.scss";

export type TextFieldWithSteppersProps = ComponentProps<typeof Input>;

export const TextFieldWithSteppers = forwardRef<HTMLInputElement, TextFieldWithSteppersProps>(
    (props, ref) => {
        const { value, onChange, disabled, placeholder = '0', currency = '', decimals = 2 } = props;

        const getFormatValue = (value: number) => {
            let formatValue = value;

            if (typeof formatValue === 'number') {
                formatValue = parseFloat(formatValue.toFixed(decimals));
            }

            return formatValue;
        }

        const steppersSection = (
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

        return (
            <div>
                {/* <span id="my-suffix">ms.</span> */}
                <Input {...props} ref={ref} triggerActionIcon={steppersSection} type='number' value={`${getFormatValue(value as number)}`} placeholder={`${placeholder} ${currency}`} />
            </div>
        );
    },
);

export default TextFieldWithSteppers;
