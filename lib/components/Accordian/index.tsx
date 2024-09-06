import { ReactNode } from "react";
import Fill from "./fill";

export type AccordionVariants = {
    //  Flush: typeof Flush;
    Fill: typeof Fill;
    //Outline: typeof Outline;
    //Elevate: typeof Elevate;
};

const Base: AccordionVariants = ({ children }: { children: ReactNode }) => {
    return children;
};

//Base.Flush = Flush;
Base.Fill = Fill;
//Base.Outline = Outline;
//Base.Elevate = Elevate;

export default Base;
export * from "./types";
