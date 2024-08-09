import { ComponentProps, Fragment, forwardRef } from "react";
import { Menu, MenuButton, MenuItem, Transition } from "@headlessui/react";
import { ButtonProps } from "../types";
import { Button } from "../base";
import "./dropdown.scss";
import { TMediumSizes, TRegularSizesWithExtraLarge } from "@types";
import { DropdownItem, ItemContainer } from "@components/Atom";

export interface TSingleSelectItem
    extends Omit<ComponentProps<"button">, "ref"> {
    label: string | React.ReactNode;
}

export interface SingleSelectDropdownProps extends ButtonProps {
    options: TSingleSelectItem[];
    size?: TRegularSizesWithExtraLarge;
}

const itemSize: Record<TRegularSizesWithExtraLarge, TMediumSizes> = {
    sm: "sm",
    md: "sm",
    lg: "md",
    xl: "md",
};

const Options = ({
    item,
    size,
    ...rest
}: {
    item: TSingleSelectItem;
    size: TRegularSizesWithExtraLarge;
}) => {
    return (
        <MenuItem as={Fragment}>
            <DropdownItem
                id={item.id}
                label={item.label}
                size={itemSize[size]}
                as="button"
                {...rest}
            />
        </MenuItem>
    );
};

export const DropdownButton = forwardRef<
    HTMLButtonElement,
    SingleSelectDropdownProps
>(
    (
        {
            size = "md",
            icon,
            label,
            isLoading,
            color = "coral",
            variant,
            disabled,
            options,
            ...rest
        },
        ref,
    ) => {
        return (
            <div className="quill__dropdown-button">
                <Menu>
                    {({ open }) => (
                        <>
                            <MenuButton as={Fragment}>
                                <Button
                                    {...rest}
                                    icon={icon}
                                    size={size}
                                    color={color}
                                    label={label}
                                    variant={variant}
                                    isLoading={isLoading}
                                    ref={ref}
                                    dropdown
                                    isDropdownOpen={open}
                                    disabled={disabled}
                                />
                            </MenuButton>
                            <Transition enter="dropdown-button__transition--enter">
                                <div style={{ position: "relative" }}>
                                    <ItemContainer
                                        size={itemSize[size]}
                                        height="sm"
                                    >
                                        {options.map((item) => (
                                            <Options
                                                item={item}
                                                size={size}
                                                key={item.id}
                                            />
                                        ))}
                                    </ItemContainer>
                                </div>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        );
    },
);

DropdownButton.displayName = "DropdownButton";

export default DropdownButton;
