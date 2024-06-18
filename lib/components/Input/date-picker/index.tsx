import { useBreakpoints } from "@hooks/useBreakpoints";
import React from "react";

const DatePicker = () => {
    const { isMobile } = useBreakpoints();

    return <div>{isMobile}</div>;
};

export default DatePicker;
