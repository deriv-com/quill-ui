import React, {
    forwardRef,
    isValidElement,
    useCallback,
    useEffect,
    useState,
} from "react";
import clsx from "clsx";
import { useCombobox } from "downshift";
import "./dropdown.scss";
import Input, { InputProps } from "../base";
import { DropdownItem } from "@components/Atom";

export type TOptionList = {
    text?: React.ReactNode;
    value?: string;
};

export interface TDropdownProps extends InputProps {
    onSearch?: (inputValue: string) => void;
    onSelectOption: (value: string) => void; // Ensure this prop name matches the usage
    isAutocomplete?: boolean;
    options: TOptionList[];
    listHeight?: string;
}

export const InputDropdown = forwardRef<HTMLInputElement, TDropdownProps>(
    (
        {
            disabled,
            label,
            options,
            textAlignment = "left",
            inputSize = "md",
            status = "neutral",
            name,
            listHeight,
            onSearch,
            onSelectOption, // Ensure this prop name matches the interface
            value,
            isAutocomplete = false,
            ...rest
        },
        ref,
    ) => {
        const [items, setItems] = useState<TOptionList[]>(options);
        const [shouldFilterList, setShouldFilterList] = useState(false);
        const [selectedItem, setSelectedItem] = useState<TOptionList | null>(
            null,
        );
        const [isAnimating, setIsAnimating] = useState(false);

        const clearFilter = useCallback(() => {
            setShouldFilterList(false);
            setItems(options);
        }, [options]);

        const reactNodeToString = (reactNode: React.ReactNode): string => {
            let string = "";
            if (typeof reactNode === "string") {
                string = reactNode;
            } else if (typeof reactNode === "number") {
                string = reactNode.toString();
            } else if (reactNode instanceof Array) {
                reactNode.forEach((child) => {
                    string += reactNodeToString(child);
                });
            } else if (isValidElement(reactNode)) {
                string += reactNodeToString(reactNode.props.children);
            }
            return string;
        };

        const {
            closeMenu,
            getInputProps,
            getItemProps,
            getMenuProps,
            getToggleButtonProps,
            isOpen,
            openMenu,
            highlightedIndex,
        } = useCombobox({
            defaultSelectedItem:
                options.find((item) => item.value === value) ?? null,
            items,
            itemToString(item) {
                return item ? reactNodeToString(item.text) : "";
            },
            onInputValueChange({ inputValue }) {
                onSearch?.(inputValue ?? "");
                if (isAutocomplete || shouldFilterList) {
                    setItems(
                        options.filter((item) =>
                            reactNodeToString(item.text)
                                .toLowerCase()
                                .includes(inputValue?.toLowerCase() ?? ""),
                        ),
                    );
                }
            },
            onIsOpenChange({ isOpen }) {
                setIsAnimating(true);
                setTimeout(() => {
                    clearFilter();
                    setIsAnimating(false);
                }, 100);
                if (!isOpen) {
                    clearFilter();
                }
            },
            onSelectedItemChange({ selectedItem }) {
                onSelectOption(selectedItem?.value ?? "");
                setSelectedItem(selectedItem ?? null);
                closeMenu();
            },
        });

        const handleInputClick = useCallback(() => {
            if (isAutocomplete) setShouldFilterList(true);
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }, [closeMenu, isOpen, openMenu, isAutocomplete]);

        useEffect(() => {
            setItems(options);
        }, [options]);

        return (
            <div {...getToggleButtonProps()} className="dropdown__wrapper">
                <Input
                    ref={ref}
                    data-testid="dropdown-input"
                    disabled={disabled}
                    label={reactNodeToString(label)}
                    name={name}
                    dropdown
                    textAlignment={textAlignment}
                    inputSize={inputSize}
                    status={status}
                    isDropdownOpen={isOpen}
                    onClickCapture={handleInputClick}
                    onKeyUp={() => setShouldFilterList(true)}
                    onKeyDown={() => setShouldFilterList(true)}
                    readOnly={!isAutocomplete}
                    type="select"
                    value={value}
                    {...getInputProps()}
                    {...rest}
                />
                <ul
                    {...getMenuProps()}
                    className={clsx("deriv-dropdown__menu", {
                        "deriv-dropdown__menu--open": isOpen && !isAnimating,
                        "deriv-dropdown__menu--close": !isOpen && isAnimating,
                    })}
                >
                    {isOpen && (
                        <div
                            className={clsx(
                                "dropdown__container",
                                listHeight
                                    ? listHeight
                                    : `dropdown__container--height`,
                                `dropdown__container--size-${inputSize}`,
                            )}
                        >
                            {items.map((item, index) => (
                                <DropdownItem
                                    className={clsx(
                                        highlightedIndex === index &&
                                            "dropdown__item--active",
                                    )}
                                    key={item.value}
                                    onClick={() => clearFilter()}
                                    label={item.text}
                                    selected={
                                        selectedItem?.value === item.value
                                    }
                                    size={inputSize}
                                    textAlignment={textAlignment}
                                    {...getItemProps({ index, item })}
                                />
                            ))}
                        </div>
                    )}
                </ul>
            </div>
        );
    },
);

export default InputDropdown;
