import SectionMessage from "@components/SectionMessage";
import { Heading, Text } from "@components/Typography";

const CoreTokenIntroduction = () => {
    return (
        <div className="innerpage-container">
            <Heading.H3>
                Core Tokens: The Foundation of a Design System
            </Heading.H3>
            <Text>
                Core tokens are the bedrock of any well-structured design
                system. They represent the most fundamental and unchanging
                design properties that define the visual and functional identity
                of a digital product. Core tokens are abstract, atomic values
                that are devoid of specific context or meaning; they are purely
                descriptive of the design attributes they represent.
            </Text>
            <Text bold size="lg">
                Characteristics of Core Tokens
            </Text>
            <ul>
                <li>
                    <Text bold>1. Atomic and Indivisible:</Text>
                    <div className="list-indent">
                        <Text>
                            Core tokens are the smallest units of design. They
                            are atomic in nature, meaning they cannot be broken
                            down further into more basic elements. For instance,
                            a core token could represent a specific color value
                            like <span className="quote">#6a0000</span>, a
                            specific spacing unit like{" "}
                            <span className="quote">16px</span>, or a particular
                            font size like 14px. These values are absolute and
                            do not change across different contexts or themes.
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>2. Global and Unchanging:</Text>
                    <div className="list-indent">
                        <Text>
                            Core tokens are universal across the design system.
                            Their values remain consistent, regardless of where
                            or how they are applied. This universality ensures
                            that the foundational aspects of the design
                            system—such as color palettes, typography settings,
                            and spacing scales—are maintained uniformly across
                            all components and pages. For example, if a primary
                            color is defined as{" "}
                            <span className="quote">#6a0000</span>, it remains
                            <span className="quote">#6a0000</span>
                            across buttons, links, and other elements where that
                            color is used.
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>3. Raw Design Values:</Text>
                    <div className="list-indent">
                        <Text>
                            Core tokens are raw values that describe design
                            decisions in their most basic form. They do not
                            convey any semantic meaning or purpose; instead,
                            they serve as the building blocks upon which more
                            complex and context-specific design elements are
                            built.
                        </Text>
                        <Text>Examples of core tokens include:</Text>
                        <Text>
                            Colors: <span className="quote">#fbbf9d</span>,
                            <span className="quote">#787401</span>,
                            <span className="quote">#006a4c</span>
                        </Text>
                        <Text>
                            Spacing: <span className="quote">8px</span>,
                            <span className="quote">16px</span>,
                            <span className="quote">#24px</span>
                        </Text>
                        <Text>
                            Durations: <span className="quote">0ms</span>,
                            <span className="quote">80ms</span>,
                            <span className="quote">160ms</span>
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>4. Stability and Consistency:</Text>
                    <div className="list-indent">
                        <Text>
                            The purpose of core tokens is to provide a stable
                            foundation that ensures consistency across the
                            entire design system. By defining these values
                            centrally, designers and developers can avoid
                            inconsistencies that often arise from ad-hoc or
                            manual design decisions. Core tokens act as a single
                            source of truth for the foundational aspects of the
                            design, ensuring that every element within the
                            system adheres to the same design principles.
                        </Text>
                    </div>
                </li>
            </ul>
            <SectionMessage
                status="info"
                size="sm"
                message={`Core tokens are the essential design constants that allow a design system to maintain its integrity and consistency. By centralizing these values, the design system can ensure that all components adhere to the same visual language, resulting in acohesive and unified user experience.`}
            />
        </div>
    );
};

export default CoreTokenIntroduction;
