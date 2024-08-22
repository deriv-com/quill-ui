import { Heading, Text } from "@components/Typography";
import { useEffect, useState } from "react";
import {
    categorizeGradientColors,
    categorizeOpacityColors,
    categorizeSolidColors,
    Colors,
    PageList,
} from "../helpers/categorizer";
import usePageQuery from "../hooks/usePageQuery";
import { useVersion } from "../hooks/useVersion";
import { hexToRgba, limitTextWithEllipsis, rgbaToHex } from "../../utils";
import { InputDropdown } from "@components/Input";
import Tooltip from "@components/Tooltip";
import copyToClipboard from "../helpers/copier";

const BorderRadius = () => {
    const { currentPage } = usePageQuery();
    const { variables, getVariablesByPage } = useVersion();
    const [solidColors, setSolidColors] = useState<unknown>({});
    const [opacityColors, setOpacityColors] = useState<unknown>({});
    const [gradientColors, setGradientColors] = useState<unknown>({});
    const [solidTabSelected, setSolidTabSelected] = useState(0);
    const [opacityTabSelected, setOpacityTabSelected] = useState(0);
    const [gradientTabSelected, setGradientTabSelected] = useState(0);

    useEffect(() => {
        const pageTokens: PageList = getVariablesByPage(
            currentPage,
        ) as unknown as PageList;

        console.log({ pageTokens });
    }, [variables]);

    return (
        <div className="innerpage-container">
            <Heading.H3>Border Radius Tokens</Heading.H3>
            <Text>
                In a design system, the color token property is a fundamental
                aspect that defines the color values used across the user
                interface. Color tokens play a critical role in ensuring
                consistency, accessibility, and scalability in design.
            </Text>
        </div>
    );
};

export default BorderRadius;
