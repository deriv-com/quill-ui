import DatePickerDropdown from "@components/Input/date-picker";
import { useBreakpoints } from "@hooks/useBreakpoints";
import React from "react";

const TestingBreakpoints = () => {
    const { isMobile, isDesktop, isTablet } = useBreakpoints();

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>{isMobile && "Mobile"}</div>
            <div>{isDesktop && "Desktop"}</div>
            <div>{isTablet && "Tablet"}</div>
            <DatePickerDropdown
                label="Date of birth"
                inputSize="md"
                placeholder="dd/mm/yyyy"
                status="neutral"
                variant="fill"
                onSelectDate={(value) => {
                    console.log(value);
                }}
                isAutocomplete
            />
        </div>
    );
};

export default TestingBreakpoints;
