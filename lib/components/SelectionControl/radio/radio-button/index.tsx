import React from "react";
import clsx from "clsx";
import {
    LabelPairedCircleInfoMdRegularIcon,
    LabelPairedCircleInfoSmRegularIcon,
    StandaloneCircleDotFillIcon,
    StandaloneCircleRegularIcon,
} from "@deriv/quill-icons";
import { Text } from "@components/Typography";
import { KEY } from "@utils/common-utils";
import "./radio-button.scss";
import { TMediumSizes } from "@types";

interface IRadio {
    className?: string;
    classNameInfo?: string;
    classNameLabel?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    hasInfo?: boolean;
    id?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    value?: string;
    size?: TMediumSizes;
}

export const RadioButton = ({
    children,
    className,
    classNameInfo,
    classNameLabel,
    defaultChecked,
    disabled = false,
    hasInfo,
    id,
    onChange,
    size = "md",
    value,
    ...otherProps
}: React.PropsWithChildren<IRadio>) => {
    const [checked, setChecked] = React.useState(defaultChecked);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        setChecked(defaultChecked);
    }, [defaultChecked]);

    const handleMouseClick = () => {
        if (!disabled) {
            handleChange();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (!disabled && (e.key === KEY.ENTER || e.key === KEY.SPACE)) {
            handleChange();
        }
    };
    const handleChange = () => {
        const input = inputRef.current;
        if (input) {
            input.checked = !input.checked;
            onChange?.({
                target: input,
            } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const getIcon = () => {
        if (checked) {
            return (
                <StandaloneCircleDotFillIcon
                    data-testid={`dt_checked_icon_${value}_${disabled}`}
                    fill={disabled ? "#b8b8b8" : "#000000"}
                    iconSize={size}
                />
            );
        } else {
            return (
                <StandaloneCircleRegularIcon
                    data-testid={`dt_unchecked_icon_${value}_${disabled}`}
                    fill={disabled ? "#b8b8b8" : "#7e7e7e"}
                    iconSize={size}
                    tabIndex={0}
                />
            );
        }
    };

    return (
        <label
            htmlFor={id}
            className={clsx("quill-radio-button", className, {
                "quill-radio-group__item--active": checked,
            })}
            data-testid="dt_quill_radio_button"
        >
            <input
                className="quill-radio-button__input"
                type="radio"
                checked={checked}
                disabled={disabled}
                ref={inputRef}
                value={value}
                {...otherProps}
            />

            <span
                className={clsx("quill-radio-button__icon", {
                    "quill-radio-button__icon--disabled": disabled,
                })}
                onClick={handleMouseClick}
                onKeyDown={handleKeyDown}
                id={id}
            >
                {getIcon()}
            </span>
            <Text
                size={size}
                as="span"
                className={clsx(
                    "quill-radio-button__label",
                    {
                        "quill-radio-button__label--disabled": disabled,
                    },
                    classNameLabel,
                )}
                onClick={handleMouseClick}
                onKeyDown={handleKeyDown}
            >
                {children}
            </Text>
            {/* TODO: implement info icon component */}
            {hasInfo &&
                (size === "sm" ? (
                    <LabelPairedCircleInfoSmRegularIcon
                        className={clsx(
                            "quill-radio-button__info",
                            classNameInfo,
                        )}
                        data-testid="dt_quill_radio_button_info"
                    />
                ) : (
                    <LabelPairedCircleInfoMdRegularIcon
                        className={clsx(
                            "quill-radio-button__info",
                            classNameInfo,
                        )}
                        data-testid="dt_quill_radio_button_info"
                    />
                ))}
        </label>
    );
};

export default RadioButton;
