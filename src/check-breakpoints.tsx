import { useBreakpoints } from "@hooks/useBreakpoints";
import React from "react";

const TestingBreakpoints = () => {
    const { isMobile, isDesktop, isTablet, width } = useBreakpoints();

    console.log(useBreakpoints());

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>{isMobile && "Mobile"}</div>
            <div>{isDesktop && "Desktop"}</div>
            <div>{isTablet && "Tablet"}</div>
            <div>{width}</div>
        </div>
    );
};

export default TestingBreakpoints;
