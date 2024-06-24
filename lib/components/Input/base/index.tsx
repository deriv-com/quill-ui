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
import { TLeftOrCenter, TMediumSizes, TRightOrBottom } from "@types";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneLockRegularIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons/Standalone";
import { Text } from "@components/Typography";
import { LabelPairedChevronDownSmBoldIcon } from "@deriv/quill-icons/LabelPaired";
import { PasswordStrengthValidation } from "@components/Atom";

export type Variants = "fill" | "outline";
export type Status = "neutral" | "success" | "error";
export type Types = "text" | "email" | "password" | "tel" | "select" | "number";
export type TValidationMessage = {
    validationMessage: ReactNode;
    status: Status;
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: Types;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    inputSize?: TMediumSizes;
    status?: Status;
    hasPasswordStrengthValidation?: boolean;
    validationMessages?: TValidationMessage[];
    disabled?: boolean;
    dropdown?: boolean;
    passwordLockIcon?: ReactNode;
    isDropdownOpen?: boolean;
    variant?: Variants;
    message?: ReactNode;
    hideMessage?: boolean;
    showCharacterCounter?: boolean;
    textAlignment?: TLeftOrCenter;
    label?: ReactNode;
    value?: string | number;
    triggerActionIcon?: ReactNode;
    fieldMarker?: boolean;
    showInputButton?: boolean;
    buttonPosition?: TRightOrBottom;
    inputButton?: ReactNode;
    leftPlaceholder?: string;
    rightPlaceholder?: string;
    addOn?: ReactNode;
    addOnIcon?: ReactNode;
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
            dropdown = false,
            isDropdownOpen,
            readOnly,
            passwordLockIcon = false,
            disabled = false,
            variant = "outline",
            hasPasswordStrengthValidation = false,
            validationMessages,
            placeholder = "",
            leftIcon,
            message,
            hideMessage = false,
            showCharacterCounter,
            maxLength,
            textAlignment = "left",
            label,
            leftPlaceholder,
            rightPlaceholder,
            value,
            rightIcon,
            onChange,
            triggerActionIcon,
            fieldMarker = false,
            required = false,
            showInputButton,
            inputButton: InputButton,
            addOn,
            addOnIcon,
            ...rest
        },
        ref,
    ) => {
        const [inputValue, setInputValue] = useState(value || "");
        const [focused, setFocused] = React.useState(false);
        useEffect(() => {
            setInputValue(value || "");
        }, [value]);
        if (isDropdownOpen) {
            hideMessage = true;
        }

        rightIcon =
            (status === "success" || status === "error") && !disabled
                ? statusIcon[status]
                : rightIcon;

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
                    {addOn}
                    <div className="quill-input-icons__wrapper">
                        {leftIcon && (
                            <span className="icon_wrapper">{leftIcon}</span>
                        )}
                        {passwordLockIcon && (
                            <span className="icon_wrapper">
                                {
                                    <StandaloneLockRegularIcon
                                        fill="var(--component-textIcon-normal-prominent)"
                                        iconSize="sm"
                                    />
                                }
                            </span>
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
                            {leftPlaceholder &&
                                (!label || (label && (value || focused))) && (
                                    <Text
                                        size={inputSize}
                                        as="span"
                                        className={clsx(
                                            "quill-input-label__label",
                                            "quill-input-label__label--left",
                                        )}
                                        color="quill-typography__color--disabled"
                                    >
                                        {leftPlaceholder}
                                    </Text>
                                )}
                            <input
                                {...rest}
                                readOnly={readOnly}
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
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
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
                            {rightPlaceholder &&
                                (!label || (label && (value || focused))) && (
                                    <Text
                                        size={inputSize}
                                        as="span"
                                        className={clsx(
                                            "quill-input-label__label",
                                            "quill-input-label__label--right",
                                        )}
                                        color={
                                            disabled
                                                ? "quill-typography__color--disabled"
                                                : ""
                                        }
                                    >
                                        {rightPlaceholder}
                                    </Text>
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
                        {addOnIcon}
                        {triggerActionIcon && (
                            <span className="icon_wrapper">
                                {triggerActionIcon}
                            </span>
                        )}
                        {dropdown && (
                            <LabelPairedChevronDownSmBoldIcon
                                width={24}
                                height={24}
                                data-state={isDropdownOpen ? "open" : "close"}
                                className={clsx(
                                    "quill-input__rotate",
                                    "quill-input__icon",
                                )}
                            />
                        )}
                    </div>
                    {showInputButton && InputButton}
                </div>
                {(message ||
                    showCharacterCounter ||
                    hasPasswordStrengthValidation) &&
                    !hideMessage && (
                        <div
                            className={clsx(
                                "message__container",
                                `message__container--${inputSize}`,
                                `message__container__status--${status}`,
                                disabled && `message__container__disabled`,
                            )}
                        >
                            {hasPasswordStrengthValidation && (
                                <div className="message__container__password_validation">
                                    {validationMessages?.map(
                                        (validation, idx) => (
                                            <PasswordStrengthValidation
                                                key={idx}
                                                status={validation.status}
                                                validationMessage={
                                                    validation.validationMessage
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            )}

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
