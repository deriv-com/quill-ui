import {
    ReactNode,
    TextareaHTMLAttributes,
    forwardRef,
    useEffect,
    useState,
} from "react";
import { Status, Variants } from "../base";
import "./textarea.scss";
import clsx from "clsx";
import { TMediumSizes } from "@types";
import { CaptionText } from "@components/Typography";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons/Standalone";

export interface TextAreaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: ReactNode;
    variant?: Variants;
    textvalue?: string;
    size?: TMediumSizes;
    wrapperClassName?: string;
    textAreaClassName?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    resizable?: boolean;
    message?: ReactNode;
    status?: Status;
    fieldMarker?: boolean;
    show_counter?: boolean;
    id?: string;
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

let idCounter = 0;
const generateUniqueId = () => {
    idCounter += 1;
    return `quill-textarea-${idCounter}`;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (props, ref) => {
        const {
            wrapperClassName,
            textAreaClassName,
            label,
            variant = "outline",
            leftIcon,
            rightIcon,
            placeholder,
            disabled,
            size = "md",
            message,
            maxLength,
            show_counter = true,
            status = "neutral",
            textvalue = "",
            onChange,
            fieldMarker,
            required,
            resizable = true,
            id,
        } = props;

        const [value, setValue] = useState(textvalue);
        const [customId, setCustomId] = useState("");

        useEffect(() => {
            setCustomId(generateUniqueId());
        }, []);

        const rightSideIcon =
            (status === "success" || status === "error") && !disabled
                ? statusIcon[status]
                : rightIcon;

        const inputId = id || customId;

        return (
            <div className="quill-textarea__container">
                <div
                    className={clsx(
                        wrapperClassName,
                        "quill-textarea__wrapper",
                        `quill-textarea__wrapper__variant--${variant}`,
                        `quill-textarea__wrapper__size--${size}`,
                        `quill-textarea__wrapper__variant--${variant}--${status}`,
                        `quill-textarea__wrapper__resize--${resizable}`,
                        !leftIcon && "no-left-icon",
                        !rightSideIcon && "no-right-icon",
                    )}
                >
                    {leftIcon && <span className="left-icon">{leftIcon}</span>}
                    <textarea
                        className={clsx(
                            "quill-textarea",
                            textAreaClassName,
                            value && "has-value",
                        )}
                        placeholder={placeholder}
                        value={value}
                        disabled={!!disabled}
                        onChange={(e) => {
                            setValue(e.target.value);
                            onChange?.(e);
                        }}
                        {...props}
                        id={inputId}
                        ref={ref}
                    />
                    {label && size === "md" && (
                        <label
                            className={clsx("label", `label--${status}`)}
                            htmlFor={inputId}
                        >
                            {label}
                            {fieldMarker && (
                                <div
                                    className={clsx(
                                        `label-field-marker__required--${required}`,
                                    )}
                                >
                                    {required ? "*" : "(optional)"}
                                </div>
                            )}
                        </label>
                    )}
                    {rightSideIcon && (
                        <span
                            className={clsx(
                                "right-icon",
                                statusIconColors[status],
                            )}
                        >
                            {rightSideIcon}
                        </span>
                    )}
                </div>
                <div className="quill-textarea__resizer"></div>

                {(message || show_counter) && (
                    <div
                        className={clsx(
                            "message__container",
                            `message__container--${size}`,
                        )}
                    >
                        <CaptionText
                            className={clsx(
                                `message--${status}`,
                                disabled && "message--disabled",
                            )}
                        >
                            {message}
                        </CaptionText>
                        {show_counter && maxLength && (
                            <CaptionText
                                className={clsx(
                                    `message--${status}`,
                                    disabled && "message--disabled",
                                )}
                            >
                                {value.toString().length}/{maxLength}
                            </CaptionText>
                        )}
                    </div>
                )}
            </div>
        );
    },
);

export default TextArea;
