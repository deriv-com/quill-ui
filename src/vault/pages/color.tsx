import { Heading, Text } from "@components/Typography";
import { useState } from "react";
import { Categories } from "../helpers/categorizer";

const Color = () => {
    const [variables, setVariables] = useState<Categories>({});
    return (
        <div className="innerpage-container">
            <Heading.H3>Color Tokens</Heading.H3>
            <Text>
                In a design system, the color token property is a fundamental
                aspect that defines the color values used across the user
                interface. Color tokens play a critical role in ensuring
                consistency, accessibility, and scalability in design.
            </Text>
            {/* <span className="quote"></span> */}
        </div>
    );
};

export default Color;
