import { ReactNode } from "react";
import Fill from "./fill";
import Flush from "./flush";
import Outline from "./outline";
import Elevate from "./elevate";

export type AccordionVariants = {
    Flush: typeof Flush;
    Fill: typeof Fill;
    Outline: typeof Outline;
    Elevate: typeof Elevate;
};

const Accordion: AccordionVariants = ({
    children,
}: {
    children: ReactNode;
}) => {
    return children;
};

Accordion.Flush = Flush;
Accordion.Fill = Fill;
Accordion.Outline = Outline;
Accordion.Elevate = Elevate;

export default Accordion;
