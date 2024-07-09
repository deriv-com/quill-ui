import { forwardRef, useEffect, useState } from "react";
import Input, { InputProps } from "@components/Input/base";
import { Button } from "@components/Button";
import "./input-button.scss";

export interface InputGroupButtonProps
    extends Omit<InputProps, "textAlignment"> {
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
            button_position = "right",
            inputSize = "md",
            value,
            label,
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

        const InputButtonWrapperClassName =
            `quill-input__wrapper-with_button-${button_position}--${inputSize}` +
            `${label ? ` quill-input__wrapper-with_button-${button_position}--${inputSize}--has-label` : ` quill-input__wrapper-with_button-${button_position}--${inputSize}--no-label`}`;

        const InputButton = (
            <Button
                disabled={isEmpty || disabled}
                color="black"
                fullWidth={button_position === "bottom"}
                variant="primary"
                size={inputSize}
                iconPosition={buttonIconPosition}
                label={buttonLabel}
                onClick={() => buttonCallback?.()}
            />
        );

        return (
            <Input
                inputSize={inputSize}
                className={InputButtonWrapperClassName}
                label={label}
                status={status}
                disabled={disabled}
                button_position={button_position}
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
