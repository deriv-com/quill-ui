import { AccordionProps } from "../types";
import Base from "../base";
import "./fill.scss";
import clsx from "clsx";

export const Fill = ({ className, ...otherProps }: AccordionProps) => {
    return (
        <Base
            {...otherProps}
            className={clsx("accordion-fill", className)}
            divider="none"
        />
    );
};

Fill.displayName = "AccordionFill";

export default Fill;
