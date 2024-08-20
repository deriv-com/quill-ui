import SectionMessage from "@components/SectionMessage";
import { Heading, Text } from "@components/Typography";

const SemanticTokenIntroduction = () => {
    return (
        <div className="innerpage-container">
            <Heading.H3>
                Semantic Tokens: Contextualizing Design Intent
            </Heading.H3>
            <Text>
                While core tokens serve as the foundational building blocks,
                semantic tokens take these raw values and imbue them with
                contextual meaning. Semantic tokens are where design intent and
                purpose come into play. They are derived from core tokens but
                are named and structured in a way that reflects their specific
                role within the user interface. Semantic tokens are crucial for
                enabling flexibility, adaptability, and scalability in a design
                system, especially as it evolves over time.
            </Text>
            <Text bold size="lg">
                The Role of Semantic Tokens in a Dynamic Design System
            </Text>
            <Text>
                Semantic tokens play a critical role in bridging the gap between
                the abstract values of core tokens and the specific needs of the
                user interface. They provide a layer of meaning and intent that
                allows the design system to be both consistent and flexible. As
                the design system evolves—whether due to rebranding, the
                introduction of new themes, or changes in design trends—semantic
                tokens ensure that updates can be made smoothly and efficiently.
            </Text>
            <Text bold size="lg">
                Characteristics of Semantic Tokens
            </Text>
            <ul>
                <li>
                    <Text bold>1. Contextual and Purpose-Driven:</Text>
                    <div className="list-indent">
                        <Text>
                            Unlike core tokens, which are abstract and devoid of
                            context, semantic tokens are defined based on their
                            intended use within the design system. They are
                            named according to their purpose, making it clear
                            where and how they should be applied. For example, a
                            semantic token like
                            <span className="quote">
                                semantic.typography.heading.hero.fontSize
                            </span>
                            explicitly states that it represents the font size
                            for a <strong>"hero"</strong> heading in the
                            typography system. This provides immediate clarity
                            and reduces ambiguity in the design process.
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>2. Derived from Core Tokens:</Text>
                    <div className="list-indent">
                        <Text>
                            Semantic tokens do not introduce new values;
                            instead, they map the raw values of core tokens to
                            specific design intentions. This mapping allows the
                            same core token to be used in multiple contexts
                            under different semantic names.
                        </Text>
                        <Text>
                            For instance, the core token
                            <span className="quote">core.spacing.400</span>
                            could be mapped to several semantic tokens such as
                        </Text>
                        <Text>
                            <span className="quote">
                                semantic.spacing.general.sm
                            </span>
                        </Text>
                        <Text>
                            <span className="quote">
                                semantic.spacing.gap.md
                            </span>
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>3. Theme and Context Sensitivity:</Text>
                    <div className="list-indent">
                        <Text>
                            Semantic tokens are particularly useful in
                            situations where a design system needs to support
                            multiple themes or contexts, such as light and dark
                            modes. Because semantic tokens are named based on
                            their role, they can be easily adjusted to fit
                            different themes without altering the underlying
                            core tokens. For example,
                            <span className="quote">
                                semantic.color.monochrome.surface.normal.lowest
                            </span>
                            might map to a dark color in a{" "}
                            <strong>light theme</strong> and a ligh color in a{" "}
                            <strong>dark theme</strong>, but both are derived
                            from the same core color tokens.
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>4. Flexibility and Adaptability:</Text>
                    <div className="list-indent">
                        <Text>
                            One of the key advantages of semantic tokens is
                            their ability to adapt to changes in design
                            requirements without disrupting the entire system.
                            If a design decision changes—say, the primary button
                            color needs to be updated—this change can be made at
                            the semantic token level (e.g.,
                            <span className="quote">
                                semantic.color.cherry.solid.surface.normal.high
                            </span>
                            ) without needing to modify the core token itself.
                            This makes it easier to manage and scale the design
                            system as it evolves.
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>5. Enhanced Maintainability:</Text>
                    <div className="list-indent">
                        <Text>
                            By abstracting core tokens into meaningful semantic
                            tokens, the design system becomes more maintainable.
                            Designers and developers can make updates to the
                            system with greater confidence, knowing that changes
                            to semantic tokens will automatically propagate to
                            all instances where they are used. This reduces the
                            risk of inconsistencies and ensures that the design
                            system remains coherent over time.
                        </Text>
                    </div>
                </li>
            </ul>
            <SectionMessage
                status="info"
                size="sm"
                message={`By abstracting core tokens into semantic tokens, a design system gains the ability to express design decisions in a way that is both meaningful and adaptable. This not only enhances the maintainability of the system but also ensures that the design intent is clearly communicated and consistently applied across all components and contexts.`}
            />
        </div>
    );
};

export default SemanticTokenIntroduction;
