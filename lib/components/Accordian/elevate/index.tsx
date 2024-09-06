import clsx from "clsx";
import Base from "../base";
import { AccordionProps } from "../types";
import "./elevate.scss";

export const Elevate = ({ className, ...otherProps }: AccordionProps) => {
    return (
        <Base
            {...otherProps}
            className={clsx(
                "rounded-1200 bg-opacity-white-800 shadow-330",
                className,
            )}
            expandedColor="white"
            divider="none"
        />
    );
};

Elevate.displayName = "AccordionElevate";

export default Elevate;
