import React, { useRef, useState } from "react";
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
    showFlags,
    containerRef,
    headcompRef,
    onItemClick,
    showSearchBar = false,
}: {
    options: TCountryCodes[];
    code: string;
    showFlags?: boolean;
    containerRef: React.RefObject<HTMLDivElement>;
    headcompRef: React.RefObject<HTMLDivElement>;
    showSearchBar?: boolean;
    onItemClick: (item: TCountryCodes) => void;
}) => {
    const [searchKey, setSearchKey] = useState("");
    const { isMobile } = useBreakpoints();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { isOpen, close } = useDropdown();

    !isMobile && isOpen && useOnClickOutside([headcompRef, dropdownRef], close);

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
        <div className="dropdown-wrapper">
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
                    leftIcon={
                        showFlags && getFlag(country.short_code.toUpperCase())
                    }
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
                    portalContainer={containerRef.current}
                    className="quill-custom-dropdown__content"
                    ref={dropdownRef}
                >
                    {showSearchBar && (
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
                    )}
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
