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
import { TMediumSizes, TLeftOrRight } from "@types";
import { Text } from "@components/Typography";
import { KEY } from "@utils/common-utils";
import Tooltip from "@components/Tooltip";

export interface CheckboxProps
    extends Omit<
        ComponentProps<"input">,
        "placeholder" | "defaultChecked" | "size"
    > {
    indeterminate?: boolean;
    infoIconMessage?: string;
    infoIconClassName?: string;
    size?: TMediumSizes;
    label: ReactNode;
    labelClassName?: string;
    onChange?: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLSpanElement>,
    ) => void;
    className?: string;
    checkboxPosition?: TLeftOrRight;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            checked = false,
            disabled = false,
            indeterminate = false,
            infoIconMessage,
            infoIconClassName,
            size = "sm",
            label,
            labelClassName,
            name,
            onChange,
            className,
            checkboxPosition = "left",
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
            if (e.key === KEY.SPACE) e.preventDefault();
            if (e.key === KEY.ENTER || e.key === KEY.SPACE) onChangeHandler(e);
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
                <div
                    className={clsx(
                        "quill-checkbox__wrapper",
                        `quill-checkbox__wrapper--${checkboxPosition}`,
                    )}
                >
                    <input
                        {...rest}
                        id={rest.id ?? name}
                        className="quill-checkbox__box"
                        type="checkbox"
                        checked={isChecked}
                        disabled={disabled}
                        ref={ref}
                        name={name}
                        onChange={onInputChange}
                        onKeyDown={onKeyDown}
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
                {infoIconMessage && (
                    <Tooltip
                        shouldCloseToolTipOnMouseLeave
                        tooltipContent={infoIconMessage}
                    >
                        <InfoIcon
                            className={clsx(
                                "quill-checkbox__info-icon",
                                infoIconClassName,
                            )}
                        />
                    </Tooltip>
                )}
            </div>
        );
    },
);
