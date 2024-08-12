import { ComponentProps, forwardRef, useEffect, useState } from "react";
import { ButtonProps } from "../types";
import {
    TMediumSizes,
    TRegularSizes,
    TRegularSizesWithExtraLarge,
} from "@types";
import { CustomDropdown } from "@components/Input";
import "./dropdown.scss";
import DropdownContent from "./dropdown-content";
import HeadComponent from "./dropdown-head";

export interface TSingleSelectItem
    extends Omit<ComponentProps<"button">, "ref" | "id"> {
    id: number | string;
    label: string | React.ReactNode;
    selected?: boolean;
}

export interface ButtonDropdownProps extends ButtonProps {
    options: TSingleSelectItem[];
    size?: TRegularSizesWithExtraLarge;
    checkbox?: boolean;
    closeContentOnClick?: boolean;
    contentTitle?: string | React.ReactNode;
    contentHeight?: TRegularSizes;
    contentClass?: string;
    onSelectionChange?: (item: TSingleSelectItem[]) => void;
    onItemClick?: (id: TSingleSelectItem["id"]) => void;
    onOpen?: () => void;
    onClose?: () => void;
}

const itemSize: Record<TRegularSizesWithExtraLarge, TMediumSizes> = {
    sm: "sm",
    md: "sm",
    lg: "md",
    xl: "md",
};

export const DropdownButton = forwardRef<
    HTMLButtonElement,
    ButtonDropdownProps
>(
    (
        {
            options,
            checkbox,
            closeContentOnClick,
            contentTitle,
            contentHeight = "sm",
            contentClass,
            size = "md",
            onSelectionChange,
            onOpen,
            onClose,
            ...rest
        },
        ref,
    ) => {
        const [items, setItems] = useState<TSingleSelectItem[]>(options);

        useEffect(() => {
            setItems(options);
        }, [options]);

        const handleItemSelect = (id: TSingleSelectItem["id"]) => {
            if (!checkbox) return;

            setItems((items) => {
                const updatedItems = items.map((item) =>
                    item.id === id
                        ? { ...item, selected: !item.selected }
                        : item,
                );

                onSelectionChange?.(updatedItems);
                return updatedItems;
            });
        };

        return (
            <CustomDropdown
                headComponent={
                    <HeadComponent size={size} {...rest} ref={ref} />
                }
                onOpen={onOpen}
                onClose={onClose}
            >
                <div className="quill__dropdown-button">
                    <DropdownContent
                        checkbox={checkbox}
                        closeContentOnClick={closeContentOnClick}
                        label={contentTitle}
                        height={contentHeight}
                        size={itemSize[size]}
                        className={contentClass}
                        onItemClick={handleItemSelect}
                        options={items}
                    />
                </div>
            </CustomDropdown>
        );
    },
);

DropdownButton.displayName = "DropdownButton";

export default DropdownButton;
