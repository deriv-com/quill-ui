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
} from "@deriv/quill-icons";
import { Text } from "../../Typography";

interface CheckboxProps
    extends Omit<ComponentProps<"input">, "placeholder" | "defaultChecked"> {
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

        useEffect(() => {
            setIsChecked(checked);
        }, [checked]);

        const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
            e,
        ) => {
            e.stopPropagation();
            setIsChecked(!is_checked);
            onChange?.(e);
        };

        const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
            e.stopPropagation();
            if (e.key === "Enter" || e.key === " ") {
                setIsChecked(!is_checked);
                onChange?.(e);
            }
        };

        return (
            <div className={clsx("quill-checkbox", wrapperClassName)}>
                <div className="quill-checkbox__wrapper">
                    <input
                        id={rest.id ?? name}
                        className={clsx("quill-checkbox__box", {
                            "quill-checkbox__box--disabled": disabled,
                        })}
                        type="checkbox"
                        checked={is_checked}
                        disabled={disabled}
                        ref={ref}
                        name={name}
                        onChange={onInputChange}
                        onKeyDown={onKeyDown}
                        {...rest}
                    />
                    {is_checked ? (
                        <StandaloneSquareCheckFillIcon
                            iconSize="sm"
                            className="quill-checkbox__icon"
                        />
                    ) : (
                        <StandaloneSquareBoldIcon
                            iconSize="sm"
                            className={clsx(
                                "quill-checkbox__icon",
                                "quill-checkbox__icon--default",
                                {
                                    "quill-checkbox__icon--disabled": disabled,
                                },
                            )}
                        />
                    )}
                    {/* </span> */}
                </div>
                <label htmlFor={rest.id ?? name}>
                    <Text
                        size="sm"
                        as="span"
                        className={clsx(
                            "quill-checkbox__label",
                            labelClassName,
                        )}
                        is_disabled={disabled}
                    >
                        {label}
                    </Text>
                </label>
            </div>
        );
    },
);
