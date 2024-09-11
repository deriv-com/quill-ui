import { AccordionProps } from "../types";
import Base from "../base";

export const Flush = ({ className, ...otherProps }: AccordionProps) => {
    return <Base {...otherProps} divider="bottom" className={className} />;
};

Flush.displayName = "AccordionFlush";

export default Flush;
