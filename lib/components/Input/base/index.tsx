import clsx from "clsx";
import { InputHTMLAttributes, ReactNode, forwardRef, useState } from "react";
import "./base.scss";
import React from "react";
import { TMediumSizes } from "@types";
import { CaptionText } from "@components/Typography";

export type Variants = "fill" | "outline";
export type Status = "neutral" | "success" | "error";
export type Types = "text" | "email" | "password";
export type TextAlignments = "left" | "center";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: Types;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    inputSize?: TMediumSizes;
    status?: Status;
    disabled?: boolean;
    variant?: Variants;
    leftStatusMessage?: string;
    rightStatusMessage?: string;
    textAlignment?: TextAlignments;
    label?: ReactNode;
    value?: string;
    triggerActionIcon?: ReactNode;
    fieldMarker?: boolean;
}

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
            leftIcon,
            leftStatusMessage,
            rightStatusMessage,
            textAlignment = "left",
            label,
            rightIcon,
            onChange,
            triggerActionIcon,
            fieldMarker = true,
            required = false,
            ...rest
        },
        ref,
    ) => {
        const [hasValue, setHasValue] = useState(false);

        return (
            <div className="quill-input__container">
                <div
                    className={clsx(
                        className,
                        `quill-input__wrapper`,
                        hasValue && `quill-input__wrapper--has-value`,
                        `quill-input__wrapper__variant--${variant}`,
                        variant === "fill" && `status--${status}`,
                        `quill-input__wrapper__size--${inputSize}`,
                        `quill-input__wrapper__status--${status}`,
                    )}
                >
                    {leftIcon && (
                        <span className="icon_wrapper">{leftIcon}</span>
                    )}
                    <div
                        className={clsx(
                            "quill-input-label__wrapper",
                            hasValue && "quill-input-label__wrapper--has-value",
                        )}
                    >
                        <input
                            {...rest}
                            required={required}
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
                            {rightIcon}
                        </span>
                    )}
                    {triggerActionIcon && <>{triggerActionIcon}</>}
                </div>
                <div className="message__container">
                    {leftStatusMessage && (
                        <CaptionText
                            className={clsx(
                                "message__container__text",
                                `message__container__text__status--${status}`,
                                disabled &&
                                    `message__container__text__disabled`,
                            )}
                        >
                            {leftStatusMessage}
                        </CaptionText>
                    )}
                    {rightStatusMessage && (
                        <CaptionText
                            className={clsx(
                                "self-end",
                                "message__container__text",
                                `message__container__text__status--${status}`,
                            )}
                        >
                            {rightStatusMessage}
                        </CaptionText>
                    )}
                </div>
            </div>
        );
    },
);

Input.displayName = "Input";

export default Input;
