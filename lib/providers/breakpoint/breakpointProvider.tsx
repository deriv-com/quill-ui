import { useMediaQuery, useWindowSize } from "usehooks-ts";
import BreakpointContext, { BreakpointContextValue } from "./breakpointContext";
import { useMemo } from "react";

const screens = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1440px",
};

export interface ScreenProviderProps {
    children: React.ReactNode;
}

export const BreakpointProvider = ({ children }: ScreenProviderProps) => {
    const { width = 0 } = useWindowSize();
    const isXs = useMediaQuery(`(max-width: ${screens.sm})`);
    const isSm = useMediaQuery(`(min-width: ${screens.sm})`);
    const isMd = useMediaQuery(`(min-width: ${screens.md})`);
    const isLg = useMediaQuery(`(min-width: ${screens.lg})`);
    const isXl = useMediaQuery(`(min-width: ${screens.xl})`);
    const is2xl = useMediaQuery(`(min-width: ${screens["2xl"]})`);
    const isMobile = useMediaQuery(`(max-width: ${screens.md})`);
    const isTablet = useMediaQuery(
        `(min-width: ${screens.md}) and (max-width: ${screens.lg})`,
    );
    const isDesktop = useMediaQuery(`(min-width: ${screens.lg})`);

    const value: BreakpointContextValue = useMemo(() => {
        return {
            isXs,
            isSm,
            isMd,
            isLg,
            isXl,
            is2xl,
            isMobile,
            isTablet,
            isDesktop,
            width,
        };
    }, [
        isDesktop,
        isLg,
        isMd,
        isMobile,
        isSm,
        isTablet,
        is2xl,
        isXl,
        isXs,
        width,
    ]);

    return (
        <BreakpointContext.Provider value={value}>
            {children}
        </BreakpointContext.Provider>
    );
};

export default BreakpointProvider;
