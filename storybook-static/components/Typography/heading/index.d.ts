import Hero from "./hero";
import H1 from "./h1";
import H2 from "./h2";
import H3 from "./h3";
import H4 from "./h4";
import H5 from "./h5";
import H6 from "./h6";
type HeadingVariants = {
    Hero: typeof Hero;
    H1: typeof H1;
    H2: typeof H2;
    H3: typeof H3;
    H4: typeof H4;
    H5: typeof H5;
    H6: typeof H6;
};
export declare const Heading: HeadingVariants;
export default Heading;
