import React, { ChangeEvent, MouseEvent, KeyboardEvent } from "react";
import clsx from "clsx";
import RadioButton from "../radio-button";
import { TMediumSizes, TLeftOrRight } from "@types";
import "./radio-group.scss";

interface IItem extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    hasError?: boolean;
    hidden?: boolean;
    id?: string;
    label: string;
    value: React.ReactNode;
    checkboxPosition?: TLeftOrRight;
}

interface IItemWrapper {
    shouldWrapItems?: boolean;
}

interface IRadioGroup extends IItemWrapper {
    className?: string;
    name?: string;
    onToggle?: (
        e:
            | ChangeEvent<HTMLInputElement>
            | MouseEvent<HTMLSpanElement>
            | KeyboardEvent<HTMLSpanElement>,
        value?: string | number,
    ) => void;
    required?: boolean;
    selected?: string | number;
    size?: TMediumSizes;
}

const ItemWrapper = ({
    children,
    shouldWrapItems,
}: IItemWrapper & React.PropsWithChildren) => {
    if (shouldWrapItems) {
        return (
            <div className="quill-radio-group__item-wrapper">{children}</div>
        );
    }

    return <React.Fragment>{children}</React.Fragment>;
};

export const RadioGroup = ({
    children,
    className,
    name,
    onToggle,
    required,
    selected,
    shouldWrapItems,
    size,
}: IRadioGroup & React.PropsWithChildren) => {
    const [selected_option, setSelectedOption] = React.useState(selected);

    React.useEffect(() => {
        setSelectedOption(selected);
    }, [selected]);

    const onChange = (
        e:
            | ChangeEvent<HTMLInputElement>
            | MouseEvent<HTMLSpanElement>
            | KeyboardEvent<HTMLSpanElement>,
        value?: string | number,
    ) => {
        setSelectedOption(value);
        onToggle?.(e, value);
    };

    return (
        <div className={clsx("quill-radio-group", className)}>
            {Array.isArray(children) &&
                children
                    .filter((item) => !item.props.hidden)
                    .map((item) => {
                        const { id, value, label, disabled, ...rest } =
                            item.props;

                        return (
                            <ItemWrapper
                                key={value}
                                shouldWrapItems={shouldWrapItems}
                            >
                                <RadioButton
                                    id={id}
                                    name={name}
                                    value={value}
                                    defaultChecked={selected_option === value}
                                    onChange={onChange}
                                    disabled={disabled}
                                    required={required}
                                    size={size}
                                    {...rest}
                                >
                                    {label}
                                </RadioButton>
                            </ItemWrapper>
                        );
                    })}
        </div>
    );
};

const Item: React.FunctionComponent<IItem> = ({
    children,
    hidden = false,
    ...props
}) => (
    <div hidden={hidden} {...props}>
        {children}
    </div>
);

RadioGroup.Item = Item;

export default RadioGroup;
