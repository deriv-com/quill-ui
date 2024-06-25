import BreakpointContext from "@providers/breakpoint/breakpointContext";
import { useContext } from "react";

export const useBreakpoints = () => {
    const screens = useContext(BreakpointContext);
    return screens;
};

export default useBreakpoints;
