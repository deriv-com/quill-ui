import { ComponentProps, forwardRef, useEffect, useState } from "react";
import { ButtonProps } from "../types";
import {
    TMediumSizes,
    TRegularSizes,
    TRegularSizesWithExtraLarge,
} from "@types";
import { CustomDropdown, TCustomDropdown } from "@components/Input";
import DropdownContent from "./dropdown-content";
import HeadComponent from "./dropdown-head";
import "./dropdown.scss";

export interface TSingleSelectItem
    extends Omit<ComponentProps<"button">, "ref" | "id"> {
    id: number | string;
    label: string | React.ReactNode;
    selected?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
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
    contentAlign?: TCustomDropdown["contentAlign"];
    actionSheetFooter?: TCustomDropdown["actionSheetFooter"];
    contentCenter?: boolean;
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
            actionSheetFooter,
            size = "md",
            onSelectionChange,
            onOpen,
            contentAlign,
            onClose,
            contentCenter = false,
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
                contentAlign={contentAlign}
                actionSheetFooter={actionSheetFooter}
                label={contentTitle}
                fullHeightOnOpen={false}
                contentClassName="quill__dropdown-button__content"
            >
                <DropdownContent
                    checkbox={checkbox}
                    closeContentOnClick={closeContentOnClick}
                    label={contentTitle}
                    height={contentHeight}
                    size={itemSize[size]}
                    className={contentClass}
                    onItemClick={handleItemSelect}
                    options={items}
                    centered={contentCenter}
                />
            </CustomDropdown>
        );
    },
);

DropdownButton.displayName = "DropdownButton";

export default DropdownButton;
