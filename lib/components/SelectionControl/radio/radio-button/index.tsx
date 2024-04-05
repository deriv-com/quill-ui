import React from "react";
import clsx from "clsx";
import {
    LabelPairedCircleMdRegularIcon,
    LabelPairedCircleDotMdFillIcon,
    LabelPairedCircleInfoMdRegularIcon,
} from "@deriv/quill-icons/LabelPaired";
import "./radio-button.scss";

type TRadio = {
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
};

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
    ...otherProps
}: React.PropsWithChildren<TRadio>) => {
    const [checked, setChecked] = React.useState(defaultChecked);

    React.useEffect(() => {
        setChecked(defaultChecked);
    }, [defaultChecked]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        onChange && onChange(e);
    };

    const handleIconClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (!disabled) {
            const synthesizedEvent = new Event("change", { bubbles: true });
            const input = e.currentTarget.previousSibling as HTMLInputElement;
            input.dispatchEvent(synthesizedEvent);
        }
    };

    return (
        <div>
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

                <span onClick={handleIconClick}>
                    {checked ? (
                        <LabelPairedCircleDotMdFillIcon
                            fill={disabled ? "#b8b8b8" : "#000000"}
                            data-testid={`dt_checked_icon_${value}_${disabled}`}
                            id={id}
                        />
                    ) : (
                        <LabelPairedCircleMdRegularIcon
                            fill={disabled ? "#b8b8b8" : "#7e7e7e"}
                            data-testid={`dt_unchecked_icon_${value}_${disabled}`}
                            id={id}
                        />
                    )}
                </span>
                <span
                    className={clsx(
                        "quill-radio-button__label",
                        classNameLabel,
                    )}
                >
                    {children}
                </span>
                {/* TODO: implement info icon component */}
                {has_info && (
                    <LabelPairedCircleInfoMdRegularIcon
                        className={clsx(
                            "quill-radio-button__info",
                            classNameInfo,
                        )}
                        data-testid="dt_quill_radio_button_info"
                    />
                )}
            </label>
        </div>
    );
};

export default RadioButton;
