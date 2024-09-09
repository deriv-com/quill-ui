import SectionMessage from "@components/SectionMessage";
import { Heading, Text } from "@components/Typography";

const ComponentTokenIntroduction = () => {
    return (
        <div className="innerpage-container">
            <Heading.H3>Component Tokens</Heading.H3>
            <Text>
                Component tokens are a crucial part of a design system, designed
                to control the appearance, behavior, and interaction patterns of
                individual UI components. These tokens encapsulate the specific
                styles and properties that define how a component looks and
                functions in various contexts, ensuring consistency across
                different parts of an application. Unlike core tokens, which
                establish foundational design rules, component tokens are highly
                granular, focusing on the unique aspects of each UI component.
            </Text>
            <Text bold size="lg">
                Characteristics of Component Tokens
            </Text>
            <ul>
                <li>
                    <Text bold>1. Component-Specific Customization:</Text>
                    <div className="list-indent">
                        <Text>
                            Component tokens provide a way to define and manage
                            styles that are unique to a particular component,
                            like a button, input field, or selection control.
                            For example, a token like
                            <span className="quote">
                                component.button.label.color.coral.secondary
                            </span>{" "}
                            might specifically define the color of the label
                            text for a secondary coral-colored button variant.
                            This level of detail allows each component to have a
                            tailored appearance that aligns with the overall
                            design system while meeting specific design needs.
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>
                        2. State Management and Interaction Design:
                    </Text>
                    <div className="list-indent">
                        <Text>
                            UI components often have multiple states, such as
                            active, hovered, focused, disabled, or selected.
                            Component tokens allow these states to be styled
                            consistently across the application. For example,
                            <span className="quote">
                                component.selectionControl.icon.selectedActive
                            </span>
                            might define the icon color or background when a
                            selection control (like a checkbox or radio button)
                            is in an active and selected state. This ensures
                            that the component visually communicates its state
                            to the user, enhancing the overall user experience.
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>3. Theming and Variants:</Text>
                    <div className="list-indent">
                        <Text>
                            Design systems frequently support multiple themes
                            (e.g., light and dark modes) or variants of
                            components (e.g., primary, secondary, success).
                            Component tokens make it easier to adapt components
                            to different themes or create variants. For
                            instance,
                            <span className="quote">
                                component.field.border.color.successDefault
                            </span>{" "}
                            might be used to define the border color for a form
                            field in a "success" state, ensuring that it stands
                            out when a user completes a task correctly. This
                            token could reference a core semantic token, such as
                            <span className="quote">
                                semantic.color.green.opacity.border.high
                            </span>
                            , linking it to the broader design language while
                            allowing for specific adjustments within the
                            component.
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>4. Consistency Across Components:</Text>
                    <div className="list-indent">
                        <Text>
                            By using component tokens, design teams can ensure
                            that similar components share consistent styles. For
                            instance, buttons across different parts of an
                            application might use the same set of tokens for
                            their various states (default, hover, active,
                            disabled). This reduces the likelihood of visual
                            inconsistencies, making the UI more predictable and
                            easier to use. The consistency provided by component
                            tokens also makes it easier to update and maintain
                            the design system, as changes to a token will
                            automatically propagate to all components that use
                            it.
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>5. Enhanced Responsiveness:</Text>
                    <div className="list-indent">
                        <Text>
                            In modern interfaces, components must adapt to
                            different screen sizes and resolutions. Component
                            tokens allow for responsive design by defining how
                            components should adjust their styles based on the
                            viewport. For example, a button might have tokens
                            for its padding and font size that adjust when
                            viewed on a mobile device versus a desktop. These
                            responsive tokens ensure that components remain
                            usable and visually appealing across all devices.
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>6. Efficiency in Development and Design:</Text>
                    <div className="list-indent">
                        <Text>
                            Component tokens streamline the development process
                            by abstracting complex styles into simple, reusable
                            variables. Developers can apply these tokens
                            directly to components, reducing the need for
                            repetitive CSS and making it easier to maintain the
                            codebase. Designers, on the other hand, can focus on
                            creating new components or updating existing ones,
                            knowing that the tokens will ensure consistency
                            across the system.
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>7. Clarity and Documentation:</Text>
                    <div className="list-indent">
                        <Text>
                            Well-documented component tokens provide clear
                            guidelines for both developers and designers on how
                            components should be styled. This documentation
                            might include examples of how to apply tokens, the
                            intended use cases for different tokens, and how
                            they integrate with core tokens. For instance, a
                            design system might document that
                            <span className="quote">
                                component.button.label.color.coral.secondary
                            </span>
                            should only be used for secondary buttons with a
                            coral theme, ensuring that it is applied correctly
                            and consistently.
                        </Text>
                    </div>
                </li>
            </ul>
            <SectionMessage
                status="info"
                size="sm"
                message={`Component tokens are crucial in a robust design system, managing the appearance and behavior of individual UI components. They encapsulate specific styles, ensuring consistency, adaptability, and scalability. By allowing detailed customization and supporting various component states and themes, component tokens streamline design and development, playing a key role in maintaining a cohesive and flexible system that evolves with product needs.`}
            />
        </div>
    );
};

export default ComponentTokenIntroduction;
