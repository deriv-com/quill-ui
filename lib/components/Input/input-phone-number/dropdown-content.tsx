import { DropdownItem, ItemContainer } from "@components/Atom";
import { useDropdown } from "@hooks/useDropdown";
import useBreakpoints from "@hooks/useBreakpoints";
import { TCountryCodes } from "@types";
import React from "react";

const DropdownContent = ({
    options,
    code,
    elementRef,
}: {
    options: TCountryCodes[];
    code: string;
    elementRef: React.RefObject<HTMLDivElement>;
}) => {
    const { isMobile } = useBreakpoints();
    const { isOpen } = useDropdown();

    console.log(isOpen);

    const Content = () => (
        <>
            {options.map((country) => (
                <DropdownItem
                    key={country.short_code}
                    label={`${country.name} {${country.phone_code}}`}
                    selected={country.phone_code === code}
                />
            ))}
        </>
    );

    return (
        <div className="dropdown-items-wrapper">
            {!isMobile ? (
                <ItemContainer
                    size="md"
                    // className={className}
                    height="md"
                    portalContainer={elementRef.current!}
                >
                    <Content />
                </ItemContainer>
            ) : (
                <Content />
            )}
        </div>
    );
};

export default DropdownContent;
