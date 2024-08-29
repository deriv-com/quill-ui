import { ComponentProps, forwardRef } from "react";
import { IconButton } from "@components/Button";
import Input from "../base";
import React from "react";
import {
    LabelPairedPlusSmRegularIcon,
    LabelPairedMinusSmRegularIcon,
} from "@deriv/quill-icons";
import { getFormatValue } from "@utils/common-utils";
import { TMediumSizes } from "@types";

export interface TextFieldWithSteppersProps
    extends Omit<ComponentProps<typeof Input>, "inputSize"> {
    unitLeft?: string;
    unitRight?: string;
    minusDisabled?: boolean;
    plusDisabled?: boolean;
    inputSize?: TMediumSizes;
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
        minusDisabled = false,
        plusDisabled = false,
        noStatusIcon,
        ...rest
    } = props;

    const SteppersSectionMinus = () => (
        <IconButton
            onClick={() => {
                onChange?.({
                    target: {
                        value: getFormatValue(Number(value) - 1, decimals),
                    },
                } as unknown as React.ChangeEvent<HTMLInputElement>);
            }}
            disabled={disabled || minusDisabled}
            variant="tertiary"
            icon={<LabelPairedMinusSmRegularIcon />}
            color="black-white"
            size={inputSize}
        />
    );

    const steppersSectionRight = (
        <>
            {textAlignment !== "center" && <SteppersSectionMinus />}
            <IconButton
                onClick={() => {
                    onChange?.({
                        target: {
                            value: getFormatValue(Number(value) + 1, decimals),
                        },
                    } as unknown as React.ChangeEvent<HTMLInputElement>);
                }}
                disabled={disabled || plusDisabled}
                variant="tertiary"
                icon={<LabelPairedPlusSmRegularIcon />}
                color="black-white"
                size={inputSize}
            />
        </>
    );

    return (
        <Input
            {...rest}
            decimals={decimals}
            ref={ref}
            disabled={disabled}
            inputSize={inputSize === "md" ? "lg" : inputSize}
            leftIcon={textAlignment === "center" && <SteppersSectionMinus />}
            leftPlaceholder={unitLeft}
            onChange={onChange}
            placeholder={placeholder.toLocaleString("en", {
                minimumFractionDigits: decimals,
            })}
            rightPlaceholder={unitRight}
            textAlignment={textAlignment}
            triggerActionIcon={steppersSectionRight}
            allowDecimals={true}
            value={value && getFormatValue(value, decimals)}
            noStatusIcon={noStatusIcon}
        />
    );
});

export default TextFieldWithSteppers;
