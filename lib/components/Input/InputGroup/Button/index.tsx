import { forwardRef, useEffect, useState } from "react";
import Input, { InputProps } from "@components/Input/base";
import { Button, TButtonVariant } from "@components/Button";

export interface InputGroupButtonProps
    extends Omit<InputProps, "textAlignment"> {
    buttonVariant?: TButtonVariant;
    buttonIconPosition?: "start" | "end";
    buttonLabel: React.ReactNode;
    buttonCallback?: () => void;
}
export const InputGroupButton = forwardRef<
    HTMLInputElement,
    InputGroupButtonProps
>(
    (
        {
            status = "neutral",
            buttonPosition = "right",
            buttonVariant = "primary",
            inputSize = "md",
            value,
            buttonIconPosition,
            buttonLabel,
            disabled,
            buttonCallback,
            onChange,
            ...rest
        },
        ref,
    ) => {
        const [isEmpty, setIsEmpty] = useState(true);

        useEffect(() => {
            setIsEmpty(value ? false : true);
        }, [value]);

        const showInputButton = status === "neutral" || disabled;

        const InputButton = (
            <Button
                disabled={isEmpty || disabled}
                color="black"
                fullWidth={buttonPosition === "bottom"}
                variant={buttonVariant}
                size={inputSize}
                iconPosition={buttonIconPosition}
                label={buttonLabel}
                onClick={() => buttonCallback?.()}
            />
        );

        return (
            <Input
                inputSize={inputSize}
                status={status}
                disabled={disabled}
                buttonPosition={buttonPosition}
                showInputButton={showInputButton}
                inputButton={InputButton}
                value={value}
                ref={ref}
                onChange={(e) => {
                    setIsEmpty(!e.target.value);
                    onChange?.(e);
                }}
                {...rest}
            />
        );
    },
);

export default InputGroupButton;
