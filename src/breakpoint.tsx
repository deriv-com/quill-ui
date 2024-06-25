import useBreakpoints from "@hooks/useBreakpoints";
import React from "react";

const Breakpoint = () => {
    const { isDesktop, isMobile, isTablet } = useBreakpoints();

    return (
        <div>
            {isDesktop && "Desktop"}
            {isMobile && "Mobile"}
            {isTablet && "Tablet"}
        </div>
    );
};

export default Breakpoint;
