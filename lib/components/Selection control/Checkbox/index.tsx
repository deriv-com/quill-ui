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
    isLabelPaired?: boolean;
    infoIconClassName?: string;
    size?: TMediumSizes;
    label: ReactNode | string;
    labelClassName?: string;
    onChange?: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLSpanElement>,
    ) => void;
    wrapperClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            checked = false,
            disabled = false,
            indeterminate = false,
            isLabelPaired = false,
            infoIconClassName,
            size = "sm",
            label,
            labelClassName,
            name,
            onChange,
            wrapperClassName,
            ...rest
        },
        ref,
    ) => {
        const [is_checked, setIsChecked] = useState(checked);
        const [is_indeterminate, setIsIndeterminate] = useState(indeterminate);

        useEffect(() => {
            setIsChecked(checked);
        }, [checked]);

        useEffect(() => {
            setIsIndeterminate(indeterminate);
        }, [indeterminate]);

        const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
            e,
        ) => {
            e.stopPropagation();

            if (is_indeterminate) {
                setIsIndeterminate(!is_indeterminate);
                setIsChecked(false);
            } else {
                setIsChecked(!is_checked);
            }
            onChange?.(e);
        };

        const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
            e.stopPropagation();
            e.preventDefault();

            if (e.key === "Enter" || e.code === "Space") {
                if (is_indeterminate) {
                    setIsIndeterminate(!is_indeterminate);
                    setIsChecked(false);
                } else {
                    setIsChecked(!is_checked);
                }
                onChange?.(e);
            }
        };

        const unIndeterminateIcon = is_checked ? (
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

        const infoIcon =
            size === "sm" ? (
                <LabelPairedCircleInfoSmRegularIcon
                    className={clsx(
                        "quill-checkbox__info-icon",
                        infoIconClassName,
                    )}
                />
            ) : (
                <LabelPairedCircleInfoMdRegularIcon
                    className={clsx(
                        "quill-checkbox__info-icon",
                        infoIconClassName,
                    )}
                />
            );

        return (
            <div
                className={clsx(
                    "quill-checkbox",
                    {
                        "quill-checkbox--disabled": disabled,
                    },
                    wrapperClassName,
                )}
            >
                <div className="quill-checkbox__wrapper">
                    <input
                        id={rest.id ?? name}
                        className="quill-checkbox__box"
                        type="checkbox"
                        checked={is_checked}
                        disabled={disabled}
                        ref={ref}
                        name={name}
                        onChange={onInputChange}
                        onKeyDown={onKeyDown}
                        {...rest}
                    />
                    {is_indeterminate ? (
                        <StandaloneSquareMinusFillIcon
                            iconSize="sm"
                            className="quill-checkbox__box-icon"
                        />
                    ) : (
                        unIndeterminateIcon
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
                {isLabelPaired && infoIcon}
            </div>
        );
    },
);
