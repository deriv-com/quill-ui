import { render, screen } from "@testing-library/react";
import { CodeText } from "..";
import { TypographyProps } from "../../base";

const captionSizes: TypographyProps["size"][] = ["sm", "md", "lg", "xl"];

describe("CaptionText", () => {
    it("should display correct content", () => {
        render(<CodeText>CodeText content</CodeText>);

        const captionText = screen.getByText(/CodeText content/);
        expect(captionText).toBeInTheDocument();
    });

    it("should have correct classnames with default values", () => {
        const { container } = render(<CodeText>CodeText content</CodeText>);

        expect(container).toMatchSnapshot();
    });

    it("should have correct classnames with bold enabled", () => {
        const { container } = render(
            <CodeText bold>CaptionText content</CodeText>,
        );

        expect(container).toMatchSnapshot();
    });

    it("should have correct classnames with italic enabled", () => {
        const { container } = render(
            <CodeText italic>CaptionText content</CodeText>,
        );

        expect(container).toMatchSnapshot();
    });

    it("should have correct classnames with underline enabled", () => {
        const { container } = render(
            <CodeText underlined>CaptionText content</CodeText>,
        );

        expect(container).toMatchSnapshot();
    });

    captionSizes.forEach((size) => {
        it(`should have correct classnames with size ${size}`, () => {
            const { container } = render(
                <CodeText size={size}>CodeText content</CodeText>,
            );

            expect(container).toMatchSnapshot();
        });
    });
});
