import { ComponentProps, forwardRef, useState, useEffect } from "react";
import Input from "../base";
import React from "react";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneCircleXmarkFillIcon,
    StandaloneSearchRegularIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons";

export type SearchFieldProps = Omit<
    ComponentProps<typeof Input>,
    "label" | "icon" | "rightStatusMessage" | "statusIcon"
>;

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
    (props, ref) => {
        const { value, onChange, status } = props;
        const [isEmpty, setIsEmpty] = useState(!value);

        const successIcon = <StandaloneCircleCheckBoldIcon iconSize="sm" />;
        const errorIcon = (
            <StandaloneTriangleExclamationBoldIcon iconSize="sm" />
        );
        const statusIcon = Object.freeze({
            success: successIcon,
            error: errorIcon,
            neutral: "",
        })[status ?? "neutral"];

        const clearIcon = (
            <button
                className="icon_wrapper"
                onClick={() => {
                    setIsEmpty(true);
                    onChange?.({
                        target: { value: "" },
                    } as React.ChangeEvent<HTMLInputElement>);
                }}
            >
                <StandaloneCircleXmarkFillIcon
                    fill="var(--core-color-opacity-black-400)"
                    iconSize="sm"
                />
            </button>
        );

        useEffect(() => {
            setIsEmpty(!value);
        }, [value]);

        return (
            <Input
                leftIcon={
                    <StandaloneSearchRegularIcon
                        fill="var(--core-color-opacity-black-600)"
                        iconSize="sm"
                    />
                }
                rightIcon={statusIcon}
                triggerActionIcon={isEmpty ? "" : clearIcon}
                placeholder="Search"
                ref={ref}
                {...props}
            />
        );
    },
);

export default SearchField;
