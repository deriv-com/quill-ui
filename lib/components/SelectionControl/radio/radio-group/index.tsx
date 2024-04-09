import React, { ChangeEvent } from "react";
import clsx from "clsx";
import RadioButton from "../radio-button";

interface IItem extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    hasError?: boolean;
    hidden?: boolean;
    id?: string;
    label: string;
    value: string;
}

interface IItemWrapper {
    shouldWrapItems?: boolean;
}

interface IRadioGroup extends IItemWrapper {
    className?: string;
    name: string;
    onToggle: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    selected: string;
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

const RadioGroup = ({
    children,
    className,
    name,
    onToggle,
    required,
    selected,
    shouldWrapItems,
}: IRadioGroup & React.PropsWithChildren) => {
    const [selected_option, setSelectedOption] = React.useState(selected);

    React.useEffect(() => {
        setSelectedOption(selected);
    }, [selected]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
        onToggle(e);
    };

    return (
        <div className={clsx("quill-radio-group", className)}>
            {Array.isArray(children) &&
                children
                    .filter((item) => !item.props.hidden)
                    .map((item) => (
                        <ItemWrapper
                            key={item.props.value}
                            shouldWrapItems={shouldWrapItems}
                        >
                            <RadioButton
                                id={item.props.id}
                                name={name}
                                value={item.props.value}
                                defaultChecked={
                                    selected_option === item.props.value
                                }
                                onChange={onChange}
                                disabled={item.props.disabled}
                                required={required}
                            >
                                {item.props.label}
                            </RadioButton>
                        </ItemWrapper>
                    ))}
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