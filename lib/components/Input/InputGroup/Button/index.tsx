import { forwardRef, useState } from "react";
import Input, { InputProps } from "../../base";
import { Button, TVariant } from "@components/Button";

export interface InputGroupButtonProps
    extends Omit<InputProps, "textAlignment"> {
    buttonVariant?: TVariant;
    buttonIconPosition?: "start" | "end";
    buttonLabel: React.ReactNode;
    buttonCallback?: () => void;
}
const InputGroupButton = forwardRef<HTMLInputElement, InputGroupButtonProps>(
    (
        {
            status = "neutral",
            buttonPosition = "right",
            buttonVariant = "primary",
            inputSize = "md",
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
