import { createContext } from "react";

export type BreakpointContextValue = {
    isXs: boolean;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    isXl: boolean;
    is2xl: boolean;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    width: string | undefined;
};

export const BreakpointContext = createContext<BreakpointContextValue>({
    isXs: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    is2xl: false,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: undefined,
});

export default BreakpointContext;
