import { AccordionProps } from "../types";
import Base from "../base";
import clsx from "clsx";
import "./outline.scss";

export const Outline = ({ className, ...otherProps }: AccordionProps) => {
    return (
        <Base
            {...otherProps}
            className={clsx("accordion-outline ", className)}
        />
    );
};

Outline.displayName = "AccordionOutline";

export default Outline;
