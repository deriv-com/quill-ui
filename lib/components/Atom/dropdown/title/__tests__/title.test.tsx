import React from "react";
import { render } from "@testing-library/react";
import DropdownTitle from "..";

describe("DropdownTitle", () => {
    it("renders with default div element", () => {
        const { container } = render(<DropdownTitle label="Test Label" />);
        expect(container.firstChild).toHaveClass(
            "quill-dropdown-title__container",
        );
        expect(container.firstChild?.nodeName).toBe("DIV");
    });

    it("renders with specified element", () => {
        const { container } = render(
            <DropdownTitle as="section" label="Test Label" />,
        );
        expect(container.firstChild).toHaveClass(
            "quill-dropdown-title__container",
        );
        expect(container.firstChild?.nodeName).toBe("SECTION");
    });

    it("applies size class", () => {
        const { container } = render(
            <DropdownTitle size="sm" label="Test Label" />,
        );
        expect(container).toMatchSnapshot();
    });

    it("applies size class", () => {
        const { container } = render(
            <DropdownTitle size="md" label="Test Label" />,
        );
        expect(container).toMatchSnapshot();
    });

    it("renders label", () => {
        const { getByText } = render(<DropdownTitle label="Test Label" />);
        expect(getByText("Test Label")).toBeInTheDocument();
    });

    it("renders icon", () => {
        const { getByText } = render(
            <DropdownTitle label="Test Label" icon={<span>Icon</span>} />,
        );
        expect(getByText("Icon")).toBeInTheDocument();
    });

    it("applies centered class", () => {
        const { container } = render(
            <DropdownTitle centered label="Test Label" />,
        );
        expect(container).toMatchSnapshot();
    });

    it("forwards rest props to the container element", () => {
        const { container } = render(
            <DropdownTitle label="Test Label" data-testid="dropdown-title" />,
        );
        expect(container.firstChild).toHaveAttribute("data-testid");
    });
});
