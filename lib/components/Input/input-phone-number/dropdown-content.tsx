import React, { useEffect, useRef } from "react";
import { DropdownItem, ItemContainer } from "@components/Atom";
import { useDropdown } from "@hooks/useDropdown";
import useBreakpoints from "@hooks/useBreakpoints";
import { TCountryCodes } from "@types";
import { FlagsMap } from "./country-flags.tsx";
import { useOnClickOutside } from "usehooks-ts";
import { SearchField } from "@components/index.ts";
// import { useDropdown } from "lib/main.ts";

const DropdownContent = ({
    options,
    code,
    elementRef,
    onItemClick,
}: {
    options: TCountryCodes[];
    code: string;
    elementRef: React.RefObject<HTMLDivElement>;
    onItemClick: (item: TCountryCodes) => void;
}) => {
    const { isMobile } = useBreakpoints();
    const containerRef = useRef<HTMLDivElement>(null);

    const { isOpen, close } = useDropdown(containerRef);

    const getFlag = (shortCode: string) => {
        return FlagsMap[shortCode] ? FlagsMap[shortCode] : FlagsMap["XX"];
    };

    if (isMobile) {
        useOnClickOutside(containerRef, close);
    } else {
        useOnClickOutside(elementRef, close);
    }

    // const handleOutsideClick = () => {
    //     // close();
    // };

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (
    //             !isMobile &&
    //             elementRef.current &&
    //             !elementRef.current.contains(event.target as Node)
    //         ) {
    //             useDropdown(containerRef, true);
    //             handleOutsideClick();
    //         }
    //     };

    //     // Bind the event listener
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         // Unbind the event listener on clean up
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [handleOutsideClick]);

    const Content = () => (
        <div ref={containerRef}>
            {options.map((country) => (
                <DropdownItem
                    key={country.short_code}
                    label={`${country.name} (${country.phone_code})`}
                    selected={
                        country.short_code.toLowerCase() === code.toLowerCase()
                    }
                    onClick={() => {
                        console.log(country);
                    }}
                    leftIcon={getFlag(country.short_code.toUpperCase())}
                    as="button"
                />
            ))}
        </div>
    );

    return (
        <>
            {!isMobile ? (
                <ItemContainer
                    size="md"
                    height="md"
                    portalContainer={elementRef.current}
                    className="quill-custom-dropdown__content"
                    onClick={() => console.log("here")}
                >
                    <Content />
                </ItemContainer>
            ) : (
                <>
                    <SearchField inputSize="sm" variant="fill" />
                    <Content />
                </>
            )}
        </>
    );
};

export default DropdownContent;
