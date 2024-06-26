import { ComponentProps, forwardRef } from "react";
import Input from "../base";
import React from "react";
import {
    LabelPairedPlusSmRegularIcon,
    LabelPairedMinusSmRegularIcon,
} from "@deriv/quill-icons";
import { IconButton } from "@components/Button";

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
                {textAlignment !== 'center' && (
                    <IconButton
                        onClick={() => {
                                onChange?.({
                                    target: { value: getFormatValue(Number(value) - 1) },
                                } as unknown as React.ChangeEvent<HTMLInputElement>);
                        }}
                        disabled={disabled}
                        variant="tertiary"
                        icon={<LabelPairedMinusSmRegularIcon />}
                        color="black"
                        size={inputSize}
                    />
                )}
                <IconButton
                    onClick={() => {
                            onChange?.({
                                target: { value: getFormatValue(Number(value) + 1) },
                            } as unknown as React.ChangeEvent<HTMLInputElement>);
                    }}
                    disabled={disabled}
                    variant="tertiary"
                    icon={<LabelPairedPlusSmRegularIcon />}
                    color="black"
                    size={inputSize}
                />
            </>
        );

        const steppersSectionLeft = (
            <IconButton
                onClick={() => {
                        onChange?.({
                            target: { value: getFormatValue(Number(value) - 1) },
                        } as unknown as React.ChangeEvent<HTMLInputElement>);
                }}
                disabled={disabled}
                variant="tertiary"
                icon={<LabelPairedMinusSmRegularIcon />}
                color="black"
                size={inputSize}
            />
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
