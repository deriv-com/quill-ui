import clsx from "clsx";
import {
    InputHTMLAttributes,
    ReactNode,
    forwardRef,
    useEffect,
    useState,
} from "react";
import "./base.scss";
import React from "react";
import { TMediumSizes } from "@types";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons/Standalone";

export type Variants = "fill" | "outline";
export type Status = "neutral" | "success" | "error";
export type Types = "text" | "email" | "password" | "tel" | "number";
export type TextAlignments = "left" | "center";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: Types;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    inputSize?: TMediumSizes;
    status?: Status;
    disabled?: boolean;
    variant?: Variants;
    message?: string;
    showCharacterCounter?: boolean;
    maxLength?: number;
    textAlignment?: TextAlignments;
    label?: ReactNode;
    value?: string | number;
    triggerActionIcon?: ReactNode;
    fieldMarker?: boolean;
}

const statusIconColors = {
    neutral: "status-icon--neutral",
    success: "status-icon--success",
    error: "status-icon--error",
};

const statusIcon = {
    success: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
    error: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
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
            placeholder = "",
            leftIcon,
            message,
            showCharacterCounter,
            maxLength,
            textAlignment = "left",
            label,
            value,
            rightIcon,
            onChange,
            triggerActionIcon,
            fieldMarker = false,
            required = false,
            ...rest
        },
        ref,
    ) => {
        const [inputValue, setInputValue] = useState(value || "");
        useEffect(() => {
            setInputValue(value || "");
        }, [value]);

        return (
            <div className="quill-input__container">
                <div
                    className={clsx(
                        className,
                        `quill-input__wrapper`,
                        inputValue.toString().length > 0 &&
                            `quill-input__wrapper--has-value`,
                        `quill-input__wrapper__variant--${variant}`,
                        `quill-input__wrapper__variant--${variant}--${status}`,
                        `quill-input__wrapper__size--${inputSize}`,
                    )}
                >
                    {leftIcon && (
                        <span className="icon_wrapper">{leftIcon}</span>
                    )}
                    <div
                        className={clsx(
                            label
                                ? "quill-input-label__wrapper"
                                : "quill-input-no-label__wrapper",
                            inputValue.toString().length > 0 &&
                                "quill-input-label__wrapper--has-value",
                        )}
                    >
                        <input
                            {...rest}
                            required={required}
                            type={type}
                            value={inputValue}
                            maxLength={maxLength}
                            placeholder={placeholder}
                            className={clsx(
                                "input",
                                "peer",
                                `input__align--${textAlignment}`,
                                `input__size--${inputSize}`,
                            )}
                            disabled={!!disabled}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                onChange?.(e);
                            }}
                            id={label?.toString()}
                            ref={ref}
                        />
                        {label && inputSize === "md" && (
                            <label
                                className={clsx(
                                    "label",
                                    `label__status--${status}`,
                                    leftIcon && `label__hasIcon`,
                                )}
                                htmlFor={label.toString()}
                            >
                                {label}
                                {fieldMarker && (
                                    <div
                                        className={clsx(
                                            "label-field-marker",
                                            `label-field-marker__required--${required}`,
                                        )}
                                    >
                                        {required ? "*" : "(optional)"}
                                    </div>
                                )}
                            </label>
                        )}
                    </div>

                    {rightIcon && (
                        <span
                            className={clsx(
                                "icon_wrapper",
                                statusIconColors[status],
                            )}
                        >
                            {status === "neutral"
                                ? rightIcon
                                : statusIcon[status]}
                        </span>
                    )}

                    {triggerActionIcon && <>{triggerActionIcon}</>}
                </div>
                {(message || showCharacterCounter) && (
                    <div
                        className={clsx(
                            "message__container",
                            `message__container--${inputSize}`,
                            `message__container__status--${status}`,
                            disabled && `message__container__disabled`,
                        )}
                    >
                        <span className="message__container__text">
                            {message}
                        </span>
                        {showCharacterCounter && maxLength && (
                            <span className="message__container__text">
                                {inputValue.toString().length}/{maxLength}
                            </span>
                        )}
                    </div>
                )}
            </div>
        );
    },
);

Input.displayName = "Input";

export default Input;
