import React from "react";
import clsx from "clsx";
import {
    LabelPairedCircleDotMdFillIcon,
    LabelPairedCircleDotSmFillIcon,
    LabelPairedCircleInfoMdRegularIcon,
    LabelPairedCircleInfoSmRegularIcon,
    LabelPairedCircleMdRegularIcon,
    LabelPairedCircleSmRegularIcon,
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
    size = "md",
    value,
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

    const getIcon = () => {
        if (checked) {
            return size === "sm" ? (
                <LabelPairedCircleDotSmFillIcon
                    data-testid={`dt_checked_icon_${value}_${disabled}`}
                    fill={disabled ? "#b8b8b8" : "#000000"}
                    height={22}
                    width={22}
                />
            ) : (
                <LabelPairedCircleDotMdFillIcon
                    data-testid={`dt_checked_icon_${value}_${disabled}`}
                    fill={disabled ? "#b8b8b8" : "#000000"}
                    height={24}
                    width={24}
                />
            );
        } else {
            return size === "sm" ? (
                <LabelPairedCircleSmRegularIcon
                    data-testid={`dt_unchecked_icon_${value}_${disabled}`}
                    fill={disabled ? "#b8b8b8" : "#7e7e7e"}
                    height={22}
                    width={22}
                    tabIndex={0}
                />
            ) : (
                <LabelPairedCircleMdRegularIcon
                    data-testid={`dt_unchecked_icon_${value}_${disabled}`}
                    fill={disabled ? "#b8b8b8" : "#7e7e7e"}
                    height={24}
                    width={24}
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
                {getIcon()}
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
                size === "sm" ? (
                    <LabelPairedCircleInfoSmRegularIcon
                        className={clsx("quill-radio-button__info", classNameInfo)}
                        data-testid="dt_quill_radio_button_info"
                    />
                ) : (
                    <LabelPairedCircleInfoMdRegularIcon
                        className={clsx("quill-radio-button__info", classNameInfo)}
                        data-testid="dt_quill_radio_button_info"
                    />
                )
            )}
        </label>
    );
};

export default RadioButton;
