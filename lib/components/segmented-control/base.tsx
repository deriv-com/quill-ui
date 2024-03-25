import React, {
    Children,
    PropsWithChildren,
    cloneElement,
    useEffect,
} from "react";
import clsx from "clsx";
import { Text } from "../Typography";
import { TGenericSizes } from "../../types";
import "./segmented-control.scss";

export interface SegmentedControlProps {
    className?: string;
    onChange?: (idx: number) => void;
    selectedItemIndex?: number;
    size?: Extract<TGenericSizes, "lg" | "md" | "sm">;
}

export interface SegmentedControlItemProps {
    className?: string;
    icon?: string | React.ReactNode;
    isSelected?: boolean;
    label?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    size?: SegmentedControlProps["size"];
}

export const SegmentedControl = ({
    children,
    className = "segmented-control",
    onChange,
    selectedItemIndex = 0,
    size = "md",
    ...rest
}: PropsWithChildren<SegmentedControlProps>) => {
    const [selectedItemIdx, setSelectedItemIdx] =
        React.useState<number>(selectedItemIndex);

    const handleItemClick = (idx: number) => {
        setSelectedItemIdx(idx);
        onChange?.(idx);
    };

    useEffect(() => {
        if (selectedItemIndex !== selectedItemIdx) {
            setSelectedItemIdx(selectedItemIndex);
        }
    }, [selectedItemIndex]);

    return (
        <div className={clsx(className, `${className}--${size}`)} {...rest}>
            {children &&
                Children.map(children, (child, idx) =>
                    cloneElement(child as JSX.Element, {
                        size:
                            (child as { props: SegmentedControlItemProps })
                                ?.props?.size ?? size,
                        onClick: () => handleItemClick(idx),
                        isSelected: idx === selectedItemIdx,
                    }),
                )}
        </div>
    );
};

// TODO: need to import placeholder icons from quill-icons
const Item = ({
    className,
    icon,
    isSelected,
    label,
    onClick,
    size,
}: SegmentedControlItemProps) => {
    return (
        <div
            className={clsx("item", isSelected && "selected", className)}
            onClick={onClick}
        >
            {icon && <span className="icon">{icon}</span>}
            {label && (
                <Text size={size} as="span">
                    {label}
                </Text>
            )}
        </div>
    );
};

SegmentedControl.Item = Item;
