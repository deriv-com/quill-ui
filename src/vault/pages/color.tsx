import { Heading, Text } from "@components/Typography";
import { useEffect, useState } from "react";
import {
    categorizeGradientColors,
    categorizeOpacityColors,
    categorizeSolidColors,
    Colors,
} from "../helpers/categorizer";
import usePageQuery from "../hooks/usePageQuery";
import { useVersion } from "../hooks/useVersion";
import { hexToRgba, limitTextWithEllipsis, rgbaToHex } from "../../utils";
import { InputDropdown } from "@components/Input";
import Tooltip from "@components/Tooltip";
import copyToClipboard from "../helpers/copier";

const Color = () => {
    const { currentPage } = usePageQuery();
    const { variables, getVariablesByPage } = useVersion();
    const [solidColors, setSolidColors] = useState<unknown>({});
    const [opacityColors, setOpacityColors] = useState<unknown>({});
    const [gradientColors, setGradientColors] = useState<unknown>({});
    const [solidTabSelected, setSolidTabSelected] = useState(0);
    const [opacityTabSelected, setOpacityTabSelected] = useState(0);
    const [gradientTabSelected, setGradientTabSelected] = useState(0);

    useEffect(() => {
        const pageTokens: Colors = getVariablesByPage(
            currentPage,
        ) as unknown as Colors;

        const solid = categorizeSolidColors(pageTokens);
        const opacity = categorizeOpacityColors(pageTokens);
        const gradient = categorizeGradientColors(pageTokens);

        setSolidColors(solid);
        setOpacityColors(opacity);
        setGradientColors(gradient);
    }, [variables]);

    return (
        <div className="innerpage-container">
            <Heading.H3>Color Tokens</Heading.H3>
            <Text>
                In a design system, the color token property is a fundamental
                aspect that defines the color values used across the user
                interface. Color tokens play a critical role in ensuring
                consistency, accessibility, and scalability in design.
            </Text>

            <Heading.H3 className="section-caption">Solid Colors</Heading.H3>
            <Text>
                Solid color tokens in a design system represent fixed,
                unchanging values for colors that are used throughout the user
                interface. These tokens are the foundation for defining the
                consistent visual language of an application. Solid color tokens
                are typically used for primary and secondary brand colors,
                background colors, borders, and other UI elements where specific
                color values must remain constant.
            </Text>
            <InputDropdown
                defaultValue={solidTabSelected}
                onSelectOption={(e) => setSolidTabSelected(e)}
                options={Object.keys(solidColors).map((e, ek) => {
                    return {
                        text: e,
                        value: ek,
                    };
                })}
                status="neutral"
                variant="fill"
                inputSize="sm"
            />

            <div className="token-table-container">
                {Object.keys(solidColors).map((name, key) => {
                    if (solidTabSelected === key) {
                        const colors = solidColors[name];
                        return Object.keys(colors).map((c) => {
                            const color = colors[c];
                            return (
                                <div
                                    className="token-list"
                                    key={`color-solid-${c}`}
                                >
                                    <span
                                        className="color-bar"
                                        style={{
                                            backgroundColor: color,
                                        }}
                                    />
                                    <Tooltip
                                        as="div"
                                        tooltipContent="Click to copy"
                                        tooltipPosition="top"
                                        className="tooltip-container"
                                        onClick={() => copyToClipboard(c)}
                                    >
                                        <Text
                                            size="sm"
                                            bold
                                            className="token-variable"
                                        >
                                            {c}
                                        </Text>
                                    </Tooltip>
                                    <Tooltip
                                        as="div"
                                        tooltipContent="Click to copy"
                                        tooltipPosition="top"
                                        className="tooltip-container"
                                        onClick={() => copyToClipboard(color)}
                                    >
                                        <div className="token-group">
                                            <span className="token-tag">
                                                HEX
                                            </span>
                                            <Text
                                                size="sm"
                                                className="token-variable"
                                            >
                                                {color}
                                            </Text>
                                        </div>
                                    </Tooltip>
                                    <Tooltip
                                        as="div"
                                        tooltipContent="Click to copy"
                                        tooltipPosition="top"
                                        className="tooltip-container"
                                        onClick={() =>
                                            copyToClipboard(hexToRgba(color))
                                        }
                                    >
                                        <div className="token-group">
                                            <span className="token-tag">
                                                RGBA
                                            </span>
                                            <Text
                                                size="sm"
                                                className="token-variable"
                                            >
                                                {hexToRgba(color)}
                                            </Text>
                                        </div>
                                    </Tooltip>
                                </div>
                            );
                        });
                    }
                })}
            </div>

            <Heading.H3 className="section-caption">Opacity Colors</Heading.H3>
            <Text>
                Opacity colors in a design system are specialized color tokens
                that represent a specific base color with an applied level of
                transparency. These tokens are crucial for maintaining visual
                consistency and flexibility across various UI elements, allowing
                designers and developers to apply the same color with different
                levels of opacity depending on the use case.
            </Text>
            <InputDropdown
                defaultValue={opacityTabSelected}
                onSelectOption={(e) => setOpacityTabSelected(e)}
                options={Object.keys(opacityColors).map((e, ek) => {
                    return {
                        text: e,
                        value: ek,
                    };
                })}
                status="neutral"
                variant="fill"
                inputSize="sm"
            />

            <div className="token-table-container">
                {Object.keys(opacityColors).map((name, key) => {
                    if (opacityTabSelected === key) {
                        const colors = opacityColors[name];
                        return Object.keys(colors).map((c) => {
                            const color = colors[c];
                            return (
                                <div
                                    className="token-list"
                                    key={`color-opacity-${c}`}
                                >
                                    <span
                                        className="color-bar"
                                        style={{
                                            backgroundColor: color,
                                        }}
                                    />
                                    <Tooltip
                                        as="div"
                                        tooltipContent="Click to copy"
                                        tooltipPosition="top"
                                        className="tooltip-container token-variable"
                                        onClick={() => copyToClipboard(c)}
                                    >
                                        <Text size="sm" bold>
                                            {c}
                                        </Text>
                                    </Tooltip>
                                    <Tooltip
                                        as="div"
                                        tooltipContent="Click to copy"
                                        tooltipPosition="top"
                                        className="tooltip-container"
                                        onClick={() =>
                                            copyToClipboard(rgbaToHex(color))
                                        }
                                    >
                                        <div className="token-group">
                                            <span className="token-tag">
                                                HEX
                                            </span>
                                            <Text size="sm">
                                                {rgbaToHex(color)}
                                            </Text>
                                        </div>
                                    </Tooltip>
                                    <Tooltip
                                        as="div"
                                        tooltipContent="Click to copy"
                                        tooltipPosition="top"
                                        className="tooltip-container"
                                        onClick={() => copyToClipboard(color)}
                                    >
                                        <div className="token-group">
                                            <span className="token-tag">
                                                RGBA
                                            </span>
                                            <Text
                                                size="sm"
                                                className="token-variable"
                                            >
                                                {color}
                                            </Text>
                                        </div>
                                    </Tooltip>
                                </div>
                            );
                        });
                    }
                })}
            </div>

            <Heading.H3 className="section-caption">Gradient Colors</Heading.H3>
            <Text>
                Gradient colors are a vital part of our design system, offering
                a smooth transition between two or more colors. These gradients
                add depth, dimension, and visual interest to our UI components,
                helping to guide users' attention and create a more engaging
                interface.
            </Text>
            <InputDropdown
                defaultValue={gradientTabSelected}
                onSelectOption={(e) => setGradientTabSelected(e)}
                options={Object.keys(gradientColors).map((e, ek) => {
                    return {
                        text: e,
                        value: ek,
                    };
                })}
                status="neutral"
                variant="fill"
                inputSize="sm"
            />
            <div className="token-table-container">
                {Object.keys(gradientColors).map((name, key) => {
                    if (gradientTabSelected === key) {
                        const colors = gradientColors[name];
                        return Object.keys(colors).map((c) => {
                            const color = colors[c];
                            return (
                                <div
                                    className="token-list"
                                    key={`color-opacity-${c}`}
                                >
                                    <span
                                        className="color-bar darker"
                                        style={{
                                            background: color,
                                        }}
                                    />
                                    <Tooltip
                                        as="div"
                                        tooltipContent="Click to copy"
                                        tooltipPosition="top"
                                        className="tooltip-container token-variable"
                                        onClick={() => copyToClipboard(c)}
                                    >
                                        <Text size="sm" bold>
                                            {c}
                                        </Text>
                                    </Tooltip>
                                    <Tooltip
                                        as="div"
                                        tooltipContent={color}
                                        tooltipPosition="top"
                                        className="tooltip-container"
                                        onClick={() => copyToClipboard(color)}
                                    >
                                        <div className="token-group">
                                            <span className="token-tag">
                                                CSS
                                            </span>
                                            <Text
                                                size="sm"
                                                className="token-variable"
                                            >
                                                {limitTextWithEllipsis(
                                                    color,
                                                    30,
                                                )}
                                            </Text>
                                        </div>
                                    </Tooltip>
                                </div>
                            );
                        });
                    }
                })}
            </div>
        </div>
    );
};

export default Color;
