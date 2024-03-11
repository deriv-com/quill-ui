import { render, screen } from "@testing-library/react";
import { CaptionText } from "..";

describe("CaptionText", () => {
    it("should display correct content", () => {
        render(<CaptionText>CaptionText content</CaptionText>);

        const captiontext = screen.getByText(/CaptionText content/);
        expect(captiontext).toBeInTheDocument();
    });

    it("should have correct classnames with default values", () => {
        const { container } = render(
            <CaptionText>CaptionText content</CaptionText>,
        );

        expect(container).toMatchSnapshot();
    });

    it("should have correct classnames with bold enabled", () => {
        const { container } = render(
            <CaptionText bold>CaptionText content</CaptionText>,
        );

        expect(container).toMatchSnapshot();
    });

    it("should have correct classnames with italic enabled", () => {
        const { container } = render(
            <CaptionText italic>CaptionText content</CaptionText>,
        );

        expect(container).toMatchSnapshot();
    });

    it("should have correct classnames with underline enabled", () => {
        const { container } = render(
            <CaptionText underlined>CaptionText content</CaptionText>,
        );

        expect(container).toMatchSnapshot();
    });
});
