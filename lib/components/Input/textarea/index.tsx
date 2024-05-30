import { ReactNode, TextareaHTMLAttributes, forwardRef, useState } from "react";
import { Status, Variants } from "../base";
import "./textarea.scss";
import clsx from "clsx";
import { TMediumSizes } from "@types";

export interface TextAreaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: ReactNode;
    variant?: Variants;
    textvalue?: string;
    size?: TMediumSizes;
    wrapperClassName?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    resizable?: boolean;
    message?: ReactNode;
    status?: Status;
    fieldMarker?: boolean;
    showCharacterCounter?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (props, ref) => {
        const {
            wrapperClassName,
            label,
            variant = "outline",
            // leftIcon,
            // rightIcon,
            // resizable = true,
            size = "md",
            message,
            showCharacterCounter,
            maxLength,
            status = "neutral",
            textvalue = "",
            onChange,
        } = props;

        const [value, setValue] = useState(textvalue);

        return (
            <div className="quill-textarea__container">
                <div
                    className={clsx(
                        wrapperClassName,
                        "quill-textarea__wrapper",
                        `quill-textarea__wrapper__variant--${variant}`,
                        `quill-textarea__wrapper__size--${label ? "md" : size}`,
                        `quill-textarea__wrapper__variant--${variant}--${status}`,
                        // value && "has-value",
                    )}
                >
                    <span className="left-icon">&#x1F50D;</span>
                    <textarea
                        className="quill-textarea"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            onChange?.(e);
                        }}
                        {...props}
                        ref={ref}
                    />
                    <span className="right-icon">&#x2709;</span>
                </div>
                <div className="quill-textarea__resizer"></div>

                {(message || showCharacterCounter) && (
                    <div
                        className={clsx(
                            "message__container",
                            // `message__container--${inputSize}`,
                            `message__container__status--${status}`,
                            // disabled && `message__container__disabled`,
                        )}
                    >
                        <span className="message__container__text">
                            {message}
                        </span>
                        {showCharacterCounter && maxLength && (
                            <span className="message__container__text">
                                {/* {inputValue.toString().length}/{maxLength} */}
                            </span>
                        )}
                    </div>
                )}
            </div>
        );
    },
);

export default TextArea;
