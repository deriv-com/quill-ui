import React, { forwardRef, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import "./dropdown.scss";
import Input, { InputProps } from "../base";
import { DropdownItem, DropdownItemProps } from "@components/Atom";
import { reactNodeToString } from "@utils/common-utils";
import { CustomDropdown } from "../custom-dropdown";
import { useDropdown } from "@hooks/useDropdown";
import useBreakpoints from "@hooks/useBreakpoints";

export type TOptionList = {
    text?: React.ReactNode;
    value?: string;
};

export interface TDropdownProps extends InputProps {
    onSearch?: (inputValue: string) => void;
    onSelectOption?: (value: string) => void;
    isAutocomplete?: boolean;
    options: TOptionList[];
    listHeight?: string;
    wrapperClassName?: string;
    containerClassName?: string;
    fullHeightOnOpen?: boolean;
    closeOnItemClick?: boolean;
}

const HeadComponent = ({
    value,
    selectedText,
    ...rest
}: InputProps & { selectedText?: string }) => {
    const { isOpen, setSelectedValue } = useDropdown();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!value) return;
        setSelectedValue(value);
    }, [value]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    return (
        <Input
            ref={inputRef}
            isDropdownOpen={isOpen}
            value={selectedText}
            {...rest}
        />
    );
};

const DropdownBody = ({
    item,
    onSelectOption,
    setSelectedText,
    closeOnItemClick,
    ...props
}: DropdownItemProps & {
    item: TOptionList;
    onSelectOption?: (value: string) => void;
    setSelectedText: (text: string) => void;
    closeOnItemClick?: boolean;
}) => {
    const { selectedValue, setSelectedValue, close } = useDropdown();

    const handleClick = () => {
        if (!item.value) return;
        setSelectedValue(item.value);
        setSelectedText(reactNodeToString(item.text));
        onSelectOption?.(item.value);
        if (closeOnItemClick) close();
    };

    return (
        <DropdownItem
            selected={selectedValue?.toString() === item.value}
            onClick={handleClick}
            {...props}
        />
    );
};

export const InputDropdown = forwardRef<HTMLInputElement, TDropdownProps>(
    (
        {
            disabled,
            label,
            options,
            textAlignment = "left",
            inputSize = "lg",
            status = "neutral",
            name,
            wrapperClassName,
            listHeight,
            onSearch,
            onSelectOption,
            value,
            isAutocomplete = false,
            fullHeightOnOpen = false,
            closeOnItemClick = true,
            containerClassName,
            ...rest
        },
        ref,
    ) => {
        const [items, setItems] = useState<TOptionList[]>(options);
        const [selectedText, setSelectedText] = useState<string>("");
        const { isMobile } = useBreakpoints();

        useEffect(() => {
            setItems(options);
        }, [options]);

        const bodyClassname = !isMobile
            ? clsx(
                  "dropdown__container",
                  listHeight ? listHeight : `dropdown__container--height`,
                  `dropdown__container--size-${inputSize}`,
              )
            : undefined;

        return (
            <CustomDropdown
                className={clsx("dropdown__wrapper", wrapperClassName)}
                fullHeightOnOpen={fullHeightOnOpen}
                ref={ref}
                isAutocomplete={isAutocomplete}
                containerClassName={containerClassName}
                headComponent={
                    <HeadComponent
                        data-testid="dropdown-input"
                        disabled={disabled}
                        label={reactNodeToString(label)}
                        name={name}
                        dropdown
                        textAlignment={textAlignment}
                        inputSize={inputSize}
                        status={status}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            const filteredItems = options.filter((item) =>
                                item.value
                                    ?.toLowerCase()
                                    .includes(inputValue.toLowerCase()),
                            );
                            setItems(
                                filteredItems.length > 0
                                    ? filteredItems
                                    : options,
                            );
                            onSearch?.(inputValue);
                        }}
                        readOnly={!isAutocomplete}
                        type="select"
                        value={value}
                        selectedText={selectedText}
                        {...rest}
                    />
                }
            >
                <div className={bodyClassname}>
                    {items.map((item) => (
                        <DropdownBody
                            item={item}
                            key={item.value}
                            label={item.text}
                            size={inputSize}
                            setSelectedText={setSelectedText}
                            textAlignment={textAlignment}
                            onSelectOption={onSelectOption}
                            closeOnItemClick={closeOnItemClick}
                        />
                    ))}
                </div>
            </CustomDropdown>
        );
    },
);

export default InputDropdown;
