import {
    ComponentProps,
    useState,
    useEffect,
    useRef,
    ChangeEvent,
    MouseEvent,
    KeyboardEvent,
    PropsWithChildren,
} from "react";
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
import { TMediumSizes, TLeftOrRight } from "@types";

export interface IRadio
    extends Omit<
        ComponentProps<"input">,
        "placeholder" | "size" | "value" | "ref"
    > {
    checkboxPosition?: TLeftOrRight;
    className?: string;
    classNameInfo?: string;
    classNameLabel?: string;
    hasInfo?: boolean;
    onChange?: (
        e:
            | ChangeEvent<HTMLInputElement>
            | MouseEvent<HTMLSpanElement>
            | KeyboardEvent<HTMLSpanElement>,
        value?: string | number,
    ) => void;
    value?: string | number;
    size?: TMediumSizes;
    ref?: React.RefObject<HTMLInputElement>;
}

export const RadioButton = ({
    children,
    checkboxPosition = "left",
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
    ref,
    ...otherProps
}: PropsWithChildren<IRadio>) => {
    const [checked, setChecked] = useState(defaultChecked);
    const inputRef = ref || useRef<HTMLInputElement>(null);

    useEffect(() => {
        setChecked(defaultChecked);
    }, [defaultChecked]);

    const handleMouseClick = (e: MouseEvent<HTMLSpanElement>) => {
        if (!disabled) {
            handleChange(e);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
        if (!disabled && (e.key === KEY.ENTER || e.key === KEY.SPACE)) {
            handleChange(e);
        }
    };
    const handleChange = (
        e:
            | ChangeEvent<HTMLInputElement>
            | MouseEvent<HTMLElement>
            | KeyboardEvent<HTMLElement>,
    ) => {
        setChecked(!checked);
        if (inputRef.current) onChange?.(e, inputRef.current.value);
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
                onChange={handleChange}
                {...otherProps}
            />

            <span
                className={clsx(
                    "quill-radio-button__icon",
                    {
                        "quill-radio-button__icon--disabled": disabled,
                    },
                    `quill-radio-button__icon--${checkboxPosition}`,
                )}
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
