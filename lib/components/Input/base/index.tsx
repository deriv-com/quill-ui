import { QuillSvgProps } from "@deriv/quill-icons";
import clsx from "clsx";
import {
    ForwardRefExoticComponent,
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
    forwardRef,
    useState,
} from "react";
import "./base.scss";
import React from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: HTMLInputTypeAttribute;
    icon?: ForwardRefExoticComponent<Omit<QuillSvgProps, "ref">>;
    statusIcon?: ForwardRefExoticComponent<Omit<QuillSvgProps, "ref">>;
    inputSize?: "sm" | "md";
    status?: "neutral" | "success" | "error";
    disabled?: boolean;
    variant?: "fill" | "outline";
    leftStatusMessage?: string;
    rightStatusMessage?: string;
    textAlignment?: "left" | "center";
    label?: string;
    value?: string;
}

const IconSize = {
    sm: { width: 24, height: 24 },
    md: { width: 24, height: 24 },
};

const statusIconColors = {
    neutral: "status-icon--neutral",
    success: "status-icon--success",
    error: "status-icon--error",
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            type = "text",
            inputSize = "md",
            className,
            status = "neutral",
            disabled = false,
            variant = "outline",
            icon: Icon,
            leftStatusMessage,
            rightStatusMessage,
            textAlignment = "left",
            label,
            statusIcon: StatusIcon,
            onChange,
            ...rest
        },
        ref,
    ) => {
        const [hasValue, setHasValue] = useState(false);

        return (
            <div className="quill-input__container">
                <div
                    data-has-value={hasValue}
                    className={clsx(
                        className,
                        `quill-input__wrapper`,
                        `quill-input__wrapper__variant--${variant}`,
                        variant === "fill" &&
                            `quill-input__wrapper__variant--fill--${status}`,
                        `quill-input__wrapper__size--${inputSize}`,
                        `quill-input__wrapper__status--${status}`,
                    )}
                >
                    {Icon && (
                        <div>
                            <Icon {...IconSize[inputSize]} />
                        </div>
                    )}
                    <input
                        {...rest}
                        type={type}
                        className={clsx(
                            "input",
                            "peer",
                            `input__align--${textAlignment}`,
                            `input__size--${inputSize}`,
                        )}
                        disabled={!!disabled}
                        onChange={(e) => {
                            setHasValue(!!e.target.value);
                            onChange?.(e);
                        }}
                        ref={ref}
                    />
                    {label && inputSize === "md" && (
                        <label
                            className={clsx(
                                "label",
                                `label__status--${status}`,
                            )}
                        >
                            {label}
                        </label>
                    )}
                    {StatusIcon && (
                        <div>
                            <StatusIcon
                                {...IconSize[inputSize]}
                                className={statusIconColors[status]}
                            />
                        </div>
                    )}
                </div>
                <div className="message__container">
                    {leftStatusMessage && (
                        <p
                            key={leftStatusMessage}
                            className={clsx(
                                "message__container__text",
                                `message__container__text__status--${status}`,
                                disabled &&
                                    `message__container__text__disabled`,
                            )}
                        >
                            {leftStatusMessage}
                        </p>
                    )}
                    {rightStatusMessage && (
                        <p
                            key={rightStatusMessage}
                            className={clsx(
                                "self-end",
                                `message__container__text__status--${status}`,
                            )}
                        >
                            {rightStatusMessage}
                        </p>
                    )}
                </div>
            </div>
        );
    },
);

Input.displayName = "Input";

export default Input;
