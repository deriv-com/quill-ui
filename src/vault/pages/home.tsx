import SectionMessage from "@components/SectionMessage";
import { Heading, Text } from "@components/Typography";

const Home = () => {
    return (
        <div className="innerpage-container">
            <Heading.H3>Introduction to Quill Design System Tokens</Heading.H3>
            <div className="text-image-container">
                <img
                    src="/vault/tokens.png"
                    alt="Logo"
                    className="text-image for-light"
                />
                <img
                    src="/vault/tokens-dark.png"
                    alt="Logo"
                    className="text-image for-dark"
                />

                <Text>
                    Design system tokens are fundamental building blocks used to
                    define and manage the visual properties of a user interface
                    (UI) in a consistent and scalable manner. Tokens serve as
                    the single source of truth for design values such as colors,
                    typography, spacing, and more. By abstracting these values
                    into tokens, design teams can ensure that their UI remains
                    consistent across different platforms, products, and
                    environments.
                </Text>
                <Text>
                    Tokens are particularly valuable because they allow
                    designers and developers to work with a shared language.
                    Instead of hard-coding specific values (e.g.,{" "}
                    <span className="quote">#FF5733</span> for a color or 16px
                    for padding), teams use tokens like{" "}
                    <span className="quote">color.primary</span> or
                    <span className="quote">spacing.medium</span> This approach
                    not only makes the design system easier to maintain but also
                    allows for quick updates across the entire UI simply by
                    modifying the token values.
                </Text>
            </div>
            <Text bold size="lg">
                Guidelines and Conventions for Naming Design System Tokens
            </Text>
            <Text>
                Design system tokens are vital for maintaining a consistent and
                scalable UI. Clear and standardized naming conventions are
                essential to ensure that these tokens are easily understood and
                implemented across your team. Below are guidelines and best
                practices for naming design tokens.
            </Text>
            <Text bold size="lg">
                Naming Structure
            </Text>
            <Text>
                The naming structure for tokens should follow a clear hierarchy
                that reflects the purpose and application of each token:
            </Text>
            <ul>
                <li>
                    <Text bold>1. Category: </Text>
                    <div className="list-indent">
                        <Text>
                            Represents the broad classification of the token,
                            such as <span className="quote">semantic</span>,{" "}
                            <span className="quote">core</span>,{" "}
                            <span className="quote">component</span> or
                            <span className="quote">generic</span>.
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>2. Element: </Text>
                    <div className="list-indent">
                        <Text>
                            Describes the specific property or element within
                            that category, like{" "}
                            <span className="quote">color</span>,{" "}
                            <span className="quote">typography</span>,{" "}
                            <span className="quote">border</span> or
                            <span className="quote">shadow</span>.
                        </Text>
                    </div>
                </li>
                <li>
                    <Text bold>3. Modifier: </Text>
                    <div className="list-indent">
                        <Text>
                            Provides additional details or state-related
                            information, such as
                            <span className="quote">hover</span>,{" "}
                            <span className="quote">active</span>,{" "}
                            <span className="quote">bold</span> or
                            <span className="quote">italic</span>.
                        </Text>
                    </div>
                </li>
            </ul>
            <SectionMessage
                status="info"
                size="sm"
                message={`A well-structured and consistent naming convention for design tokens is crucial for a maintainable and scalable design system. Following these guidelines will help ensure that your tokens are intuitive, organized, and aligned with best practices in UI design.`}
            />
        </div>
    );
};

export default Home;
