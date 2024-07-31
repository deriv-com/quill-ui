import { ComponentProps, forwardRef } from "react";
import { IconButton } from "@components/Button";
import Input from "../base";
import React from "react";
import {
    LabelPairedPlusSmRegularIcon,
    LabelPairedMinusSmRegularIcon,
} from "@deriv/quill-icons";

export interface TextFieldWithSteppersProps
    extends ComponentProps<typeof Input> {
    unitLeft?: string;
    unitRight?: string;
}

export const TextFieldWithSteppers = forwardRef<
    HTMLInputElement,
    TextFieldWithSteppersProps
>((props, ref) => {
    const {
        value,
        onChange,
        disabled,
        textAlignment,
        placeholder = 0,
        unitLeft = "",
        unitRight = "",
        inputSize = "md",
        decimals = 2,
        ...rest
    } = props;

    const getFormatValue = (value: number) =>
        parseFloat(value.toFixed(decimals));

    const steppersSectionRight = (
        <>
            {textAlignment !== "center" && (
                <IconButton
                    onClick={() => {
                        onChange?.({
                            target: {
                                value: getFormatValue(Number(value) - 1),
                            },
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
                decimals={decimals}
                ref={ref}
                disabled={disabled}
                inputSize={inputSize}
                leftIcon={textAlignment === "center" && steppersSectionLeft}
                leftPlaceholder={unitLeft}
                onChange={onChange}
                placeholder={placeholder.toLocaleString("en", {
                    minimumFractionDigits: decimals,
                })}
                rightPlaceholder={unitRight}
                textAlignment={textAlignment}
                triggerActionIcon={steppersSectionRight}
                type="number"
                allowDecimals={true}
                value={`${value && getFormatValue(Number(value))}`}
            />
        </div>
    );
});

export default TextFieldWithSteppers;
