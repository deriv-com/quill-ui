import {
    ComponentProps,
    forwardRef,
    ReactNode,
    useState,
    useEffect,
} from "react";
import clsx from "clsx";
import "./checkbox.scss";
import {
    StandaloneSquareCheckFillIcon,
    StandaloneSquareBoldIcon,
    StandaloneSquareMinusFillIcon,
    LabelPairedCircleInfoSmRegularIcon,
    LabelPairedCircleInfoMdRegularIcon,
} from "@deriv/quill-icons";
import { TMediumSizes } from "../../../types";
import { Text } from "../../Typography";

interface CheckboxProps
    extends Omit<
        ComponentProps<"input">,
        "placeholder" | "defaultChecked" | "size"
    > {
    indeterminate?: boolean;
    showInfoIcon?: boolean;
    infoIconClassName?: string;
    size?: TMediumSizes;
    label: ReactNode | string;
    labelClassName?: string;
    onChange?: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLSpanElement>,
    ) => void;
    className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            checked = false,
            disabled = false,
            indeterminate = false,
            showInfoIcon = false,
            infoIconClassName,
            size = "sm",
            label,
            labelClassName,
            name,
            onChange,
            className,
            ...rest
        },
        ref,
    ) => {
        const [isChecked, setIsChecked] = useState(checked);
        const [isIndeterminate, setIsIndeterminate] = useState(indeterminate);

        useEffect(() => {
            setIsChecked(checked);
        }, [checked]);

        useEffect(() => {
            setIsIndeterminate(indeterminate);
        }, [indeterminate]);

        const onChangeHandler = (
            e:
                | React.ChangeEvent<HTMLInputElement>
                | React.KeyboardEvent<HTMLSpanElement>,
        ) => {
            if (isIndeterminate) {
                setIsIndeterminate(!isIndeterminate);
                setIsChecked(false);
            } else {
                setIsChecked(!isChecked);
            }
            onChange?.(e);
        };

        const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
            e,
        ) => {
            e.stopPropagation();
            onChangeHandler(e);
        };

        const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
            e.stopPropagation();
            e.preventDefault();

            if (e.key === "Enter" || e.key === " ") onChangeHandler(e);
        };

        const determinateIcon = isChecked ? (
            <StandaloneSquareCheckFillIcon
                iconSize="sm"
                className="quill-checkbox__box-icon"
            />
        ) : (
            <StandaloneSquareBoldIcon
                iconSize="sm"
                className={clsx(
                    "quill-checkbox__box-icon",
                    "quill-checkbox__box-icon--pale",
                )}
            />
        );

        const InfoIcon =
            size === "sm"
                ? LabelPairedCircleInfoSmRegularIcon
                : LabelPairedCircleInfoMdRegularIcon;

        return (
            <div
                className={clsx(
                    "quill-checkbox",
                    {
                        "quill-checkbox--disabled": disabled,
                    },
                    className,
                )}
            >
                <div className="quill-checkbox__wrapper">
                    <input
                        id={rest.id ?? name}
                        className="quill-checkbox__box"
                        type="checkbox"
                        checked={isChecked}
                        disabled={disabled}
                        ref={ref}
                        name={name}
                        onChange={onInputChange}
                        onKeyDown={onKeyDown}
                        {...rest}
                    />
                    {isIndeterminate ? (
                        <StandaloneSquareMinusFillIcon
                            iconSize="sm"
                            className="quill-checkbox__box-icon"
                        />
                    ) : (
                        determinateIcon
                    )}
                </div>
                <label htmlFor={rest.id ?? name}>
                    <Text
                        size={size}
                        as="span"
                        className={clsx(
                            "quill-checkbox__label",
                            labelClassName,
                        )}
                    >
                        {label}
                    </Text>
                </label>
                {showInfoIcon && (
                    <InfoIcon
                        className={clsx(
                            "quill-checkbox__info-icon",
                            infoIconClassName,
                        )}
                    />
                )}
            </div>
        );
    },
);
