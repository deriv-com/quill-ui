// import { ComponentProps, forwardRef, useState, useEffect } from "react";
// import Input, { InputProps } from "../base";
// import React from "react";
// import {
//     StandaloneCircleXmarkFillIcon,
//     StandaloneSearchRegularIcon,
// } from "@deriv/quill-icons";

// export type SearchFieldProps = Omit<
//     ComponentProps<typeof Input>,
//     "label" | "icon" | "rightStatusMessage" | "statusIcon"
// >;

// export const SearchField = forwardRef<HTMLInputElement, InputProps>(
//     (props: SearchFieldProps, ref) => {
//         const { value, onChange } = props;
//         const [isEmpty, setIsEmpty] = useState(!value);
//         const [searchValue, setSearchValue] = useState(value ?? "");

//         const clearIcon = (
//             <button
//                 onClick={() => {
//                     setIsEmpty(true);
//                     setSearchValue("");
//                     onChange?.({
//                         target: { value: "" },
//                     } as React.ChangeEvent<HTMLInputElement>);
//                 }}
//             >
//                 <StandaloneCircleXmarkFillIcon
//                     fill="var(--core-color-opacity-black-400)"
//                     iconSize="sm"
//                 />
//             </button>
//         );

//         const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
//             const newValue = e.target.value;
//             setIsEmpty(newValue === "");
//             setSearchValue(newValue);
//             onChange?.(e);
//         };

//         useEffect(() => {
//             setSearchValue(value ?? "");
//             setIsEmpty(!value);
//         }, [value]);

//         return (
//             <Input
//                 icon={
//                     <StandaloneSearchRegularIcon fill="#000000" iconSize="sm" />
//                 }
//                 className="search-field"
//                 triggerActionIcon={isEmpty ? "" : clearIcon}
//                 ref={ref}
//                 onChange={onChangeValue}
//                 value={searchValue}
//                 {...props}
//             />
//         );
//     },
// );

// export default SearchField;

import { ComponentProps, forwardRef, useState, useEffect } from "react";
import Input, { InputProps } from "../base";
import React from "react";
import {
    StandaloneCircleXmarkFillIcon,
    StandaloneSearchRegularIcon,
} from "@deriv/quill-icons";

export type SearchFieldProps = Omit<
    ComponentProps<typeof Input>,
    "label" | "icon" | "rightStatusMessage" | "statusIcon"
>;

export const SearchField = forwardRef<HTMLInputElement, InputProps>(
    (props: SearchFieldProps, ref) => {
        const { value, onChange } = props;
        const [isEmpty, setIsEmpty] = useState(!value);

        const clearIcon = (
            <button
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
                icon={
                    <StandaloneSearchRegularIcon fill="#000000" iconSize="sm" />
                }
                className="search-field"
                triggerActionIcon={isEmpty ? "" : clearIcon}
                ref={ref}
                {...props}
            />
        );
    },
);

export default SearchField;

