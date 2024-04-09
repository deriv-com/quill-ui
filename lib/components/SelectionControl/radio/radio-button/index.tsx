import React from "react";
import clsx from "clsx";
import {
    LabelPairedCircleMdRegularIcon,
    LabelPairedCircleDotMdFillIcon,
    LabelPairedCircleInfoMdRegularIcon,
    LabelPairedCircleSmRegularIcon,
    LabelPairedCircleDotSmFillIcon,
    LabelPairedCircleInfoSmRegularIcon,
} from "@deriv/quill-icons";
import { Text } from "../../../Typography";
import "./radio-button.scss";

interface IRadio {
    className?: string;
    classNameInfo?: string;
    classNameLabel?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    has_info?: boolean;
    id?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    value?: string;
    size?: "sm" | "md";
}

const RadioButton = ({
    children,
    className,
    classNameInfo,
    classNameLabel,
    defaultChecked,
    disabled = false,
    has_info,
    id,
    onChange,
    value,
    size = 'md',
    ...otherProps
}: React.PropsWithChildren<IRadio>) => {
    const [checked, setChecked] = React.useState(defaultChecked);

    React.useEffect(() => {
        setChecked(defaultChecked);
    }, [defaultChecked]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        onChange?.(e);
    };

    const handleIconClick = (
        e:
            | React.MouseEvent<HTMLSpanElement>
            | React.KeyboardEvent<HTMLSpanElement>,
    ) => {
        if (!disabled) {
            const synthesizedEvent = new Event("change");
            const input = e.currentTarget.previousSibling as HTMLInputElement;
            input.dispatchEvent(synthesizedEvent);
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
                onChange={onInputChange}
                checked={checked}
                disabled={disabled}
                value={value}
                {...otherProps}
            />

            <span
                className="quill-radio-button__icon"
                onClick={handleIconClick}
                onKeyDown={handleIconClick}
                id={id}
            >
                {checked ? (
                    <LabelPairedCircleDotMdFillIcon
                        data-testid={`dt_checked_icon_${value}_${disabled}`}
                        fill={disabled ? "#b8b8b8" : "#000000"}
                        height={24}
                        width={24}
                    />
                ) : (
                    <LabelPairedCircleMdRegularIcon
                        data-testid={`dt_unchecked_icon_${value}_${disabled}`}
                        fill={disabled ? "#b8b8b8" : "#7e7e7e"}
                        height={24}
                        tabIndex={0}
                        width={24}
                    />
                )}
            </span>
            <Text
                size={size}
                as="span"
                className={clsx("quill-radio-button__label", classNameLabel)}
            >
                {children}
            </Text>
            {/* TODO: implement info icon component */}
            {has_info && (
                <LabelPairedCircleInfoMdRegularIcon
                    className={clsx("quill-radio-button__info", classNameInfo)}
                    data-testid="dt_quill_radio_button_info"
                />
            )}
        </label>
    );
};

export default RadioButton;
