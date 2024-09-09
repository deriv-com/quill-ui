import { Heading, Text } from "@components/Typography";
import { useEffect, useState } from "react";
import { PageList } from "../helpers/categorizer";
import usePageQuery from "../hooks/usePageQuery";
import { useVersion } from "../hooks/useVersion";
import Tooltip from "@components/Tooltip";
import copyToClipboard from "../helpers/copier";
import Logo from "../assets/images/logo.svg";

const Elevation = () => {
    const { currentPage } = usePageQuery();
    const { variables, getVariablesByPage } = useVersion();
    const [elevations, setElevations] = useState<unknown>({});

    useEffect(() => {
        const pageTokens: PageList = getVariablesByPage(
            currentPage,
        ) as unknown as PageList;

        setElevations(pageTokens);
    }, [variables]);

    return (
        <div className="innerpage-container">
            <Heading.H3>Elevation Tokens</Heading.H3>
            <Text>
                Elevation tokens are standardized values used in a design system
                to define the visual depth of UI elements through shadows and
                layering. These tokens help establish a consistent hierarchy and
                visual separation between elements, enhancing the overall user
                experience by creating a sense of depth and hierarchy.
            </Text>
            <div className="token-table-container">
                {Object.keys(elevations).map((name, r) => {
                    const elevation = elevations[name];
                    return (
                        <div className="token-list lg" key={`elevation-${r}`}>
                            <span className="bar small-bar">
                                <img
                                    src={Logo}
                                    alt="Demo Elevation"
                                    style={{
                                        boxShadow: elevation,
                                    }}
                                />
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
                                onClick={() => copyToClipboard(elevation)}
                            >
                                <div className="token-group">
                                    <span className="token-tag">CSS</span>
                                    <Text size="sm" className="token-variable">
                                        {elevation}
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

export default Elevation;
