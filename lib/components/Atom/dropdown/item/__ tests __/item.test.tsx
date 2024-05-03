import React from "react";
import { render } from "@testing-library/react";
import DropdownItem from "..";

describe("DropdownItem component", () => {
    it("renders correctly", () => {
        const label = "Test Label";
        const { getByText } = render(<DropdownItem label={label} />);
        const renderedLabel = getByText(label);
        expect(renderedLabel).toBeInTheDocument();
    });

    it("applies the 'disabled' class when disabled prop is true", () => {
        const label = "Test Label";
        const { container } = render(<DropdownItem label={label} disabled />);
        const dropdownItem = container.querySelector(".quill-dropdown-item");
        expect(dropdownItem).toHaveClass(
            "quill-dropdown-item__selected--false__disabled--true",
        );
    });

    it("applies the 'selected' class when selected prop is true", () => {
        const label = "Test Label";
        const { container } = render(<DropdownItem label={label} selected />);
        const dropdownItem = container.querySelector(".quill-dropdown-item");
        expect(dropdownItem).toHaveClass(
            "quill-dropdown-item__selected--true__disabled--false",
        );
    });

    it("renders left icon when provided", () => {
        const label = "Test Label";
        const leftIcon = <span>Left Icon</span>;
        const { getByText } = render(
            <DropdownItem label={label} leftIcon={leftIcon} />,
        );
        const renderedLeftIcon = getByText("Left Icon");
        expect(renderedLeftIcon).toBeInTheDocument();
    });

    it("renders right icon when provided", () => {
        const label = "Test Label";
        const rightIcon = <span>Right Icon</span>;
        const { getByText } = render(
            <DropdownItem label={label} rightIcon={rightIcon} />,
        );
        const renderedRightIcon = getByText("Right Icon");
        expect(renderedRightIcon).toBeInTheDocument();
    });
});
