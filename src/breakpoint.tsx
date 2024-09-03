import useBreakpoints from "@hooks/useBreakpoints";
import useTheme from "@hooks/useTheme";
import React from "react";

const Breakpoint = () => {
    const { isDesktop, isMobile, isTablet } = useBreakpoints();
    const { toggleTheme } = useTheme();

    return (
        <div>
            <button onClick={toggleTheme}>Toggle</button>
            {isDesktop && "Desktop"}
            {isMobile && "Mobile"}
            {isTablet && "Tablet"}
        </div>
    );
};

export default Breakpoint;
