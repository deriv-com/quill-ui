import { Heading, Text } from "@components/Typography";
import { useEffect, useState } from "react";
import { PageList } from "../helpers/categorizer";
import usePageQuery from "../hooks/usePageQuery";
import { useVersion } from "../hooks/useVersion";
import Tooltip from "@components/Tooltip";
import copyToClipboard from "../helpers/copier";
import Logo from "../assets/images/logo.svg";

const BorderRadius = () => {
    const { currentPage } = usePageQuery();
    const { variables, getVariablesByPage } = useVersion();
    const [radiuses, setRadiuses] = useState<unknown>({});

    useEffect(() => {
        const pageTokens: PageList = getVariablesByPage(
            currentPage,
        ) as unknown as PageList;

        setRadiuses(pageTokens);
    }, [variables]);

    return (
        <div className="innerpage-container">
            <Heading.H3>Border Radius Tokens</Heading.H3>
            <Text>
                Border-radius tokens are key design tokens in our system that
                define the curvature of element corners, allowing for
                consistent, rounded edges across UI components. These tokens
                help create a cohesive visual style, enhancing the overall look
                and feel of the user interface by providing a smooth, polished
                appearance to elements like buttons, cards, containers, and
                more.
            </Text>
            <div className="token-table-container">
                {Object.keys(radiuses).map((name, r) => {
                    const radius = radiuses[name];
                    return (
                        <div
                            className="token-list lg"
                            key={`border-radius-${r}`}
                        >
                            <span
                                className="bar box-bar"
                                style={{
                                    borderRadius: radius,
                                }}
                            >
                                <img src={Logo} alt="Demo Border Radius" />
                            </span>
                            <Tooltip
                                as="div"
                                tooltipContent="Click to copy"
                                tooltipPosition="top"
                                className="tooltip-container token-variable"
                                onClick={() => copyToClipboard(name)}
                            >
                                <Text size="sm" bold>
                                    {name}
                                </Text>
                            </Tooltip>
                            <Tooltip
                                as="div"
                                tooltipContent="Click to copy"
                                tooltipPosition="top"
                                className="tooltip-container"
                                onClick={() => copyToClipboard(radius)}
                            >
                                <div className="token-group">
                                    <span className="token-tag">CSS</span>
                                    <Text size="sm" className="token-variable">
                                        {radius}
                                    </Text>
                                </div>
                            </Tooltip>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BorderRadius;
