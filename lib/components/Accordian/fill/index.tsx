import { AccordionProps } from "../types";
import Base from "../base";

export const Fill = ({ className, ...otherProps }: AccordionProps) => {
    return (
        <Base
            {...otherProps}
            className={className}
            divider="none"
            expandedColor
        />
    );
};

Fill.displayName = "AccordionFill";

export default Fill;
