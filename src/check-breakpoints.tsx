import DropdownDatePicker from "@components/Input/date-picker";
import { useBreakpoints } from "@hooks/useBreakpoints";
import React from "react";

const TestingBreakpoints = () => {
    const { isMobile, isDesktop, isTablet } = useBreakpoints();

    console.log(useBreakpoints());

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>{isMobile && "Mobile"}</div>
            <div>{isDesktop && "Desktop"}</div>
            <div>{isTablet && "Tablet"}</div>
            <DropdownDatePicker
                inputSize="md"
                placeholder="Select"
                status="neutral"
                variant="outline"
                options={[
                    {
                        text: "Option 1",
                        value: "option1",
                    },
                    {
                        text: "Option 2",
                        value: "option2",
                    },
                    {
                        text: "Option 3",
                        value: "option3",
                    },
                ]}
                onSelectOption={() => {}}
            />
        </div>
    );
};

export default TestingBreakpoints;
