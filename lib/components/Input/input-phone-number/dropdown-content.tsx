import React, { useState } from "react";
import { DropdownItem, ItemContainer } from "@components/Atom";
import { useDropdown } from "@hooks/useDropdown";
import useBreakpoints from "@hooks/useBreakpoints";
import { TCountryCodes } from "@types";
import { FlagsMap } from "./country-flags.tsx";
import { useOnClickOutside } from "usehooks-ts";
import { SearchField } from "@components/index.ts";

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
    const [searchKey, setSearchKey] = useState("");
    const { isMobile } = useBreakpoints();

    const { isOpen, close } = useDropdown();

    !isMobile && isOpen && useOnClickOutside(elementRef, close);

    const getFlag = (shortCode: string) => {
        return FlagsMap[shortCode] ? FlagsMap[shortCode] : FlagsMap["XX"];
    };

    const lowercasedSearchKey = searchKey.toLowerCase();
    const filteredCountries = options.filter(
        (country) =>
            country.name.toLowerCase().includes(lowercasedSearchKey) ||
            country.short_code.toLowerCase().includes(lowercasedSearchKey) ||
            country.phone_code.includes(searchKey),
    );

    const Content = () => (
        <>
            {filteredCountries.map((country) => (
                <DropdownItem
                    key={country.short_code}
                    label={`${country.name} (${country.phone_code})`}
                    selected={
                        country.short_code.toLowerCase() === code.toLowerCase()
                    }
                    onClick={() => {
                        onItemClick(country);
                        close();
                    }}
                    leftIcon={getFlag(country.short_code.toUpperCase())}
                    as="button"
                />
            ))}
        </>
    );

    return (
        <>
            {!isMobile ? (
                <ItemContainer
                    size="md"
                    height="md"
                    portalContainer={elementRef.current}
                    className="quill-custom-dropdown__content"
                >
                    <Content />
                </ItemContainer>
            ) : (
                <>
                    <div className="phone-code-search">
                        <SearchField
                            inputSize="sm"
                            variant="fill"
                            autoComplete="off"
                            value={searchKey}
                            onChange={(e) => {
                                setSearchKey(e.target.value);
                            }}
                        />
                    </div>
                    <Content />
                </>
            )}
        </>
    );
};

export default DropdownContent;
