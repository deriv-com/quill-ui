import clsx from "clsx";
import Base from "../base";
import { AccordionProps } from "../types";
import "./elevate.scss";

export const Elevate = ({ className, ...otherProps }: AccordionProps) => {
    return (
        <Base
            {...otherProps}
            className={clsx("quill-accordion-elevate", className)}
            divider="none"
        />
    );
};

Elevate.displayName = "AccordionElevate";

export default Elevate;
