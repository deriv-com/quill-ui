import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { SegmentedControl, SegmentedControlProps } from "../base";

const defaultProps: SegmentedControlProps = {
    options: [
        { label: "Option 1", selected: true },
        { label: "Option 2" },
        { label: "Option 3", disabled: true },
    ],
    onChange: jest.fn(),
    hasAnimation: false,
};

describe("SegmentedControl", () => {
    it("renders correctly and matches snapshot", () => {
        const { container } = render(<SegmentedControl {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });

    it("calls onChange with the correct index when an option is clicked", () => {
        const onChangeMock = jest.fn();
        const { getByText } = render(
            <SegmentedControl {...defaultProps} onChange={onChangeMock} />,
        );

        act(() => {
            fireEvent.click(getByText("Option 2"));
        });
        expect(onChangeMock).toHaveBeenCalledWith(1);
    });

    it("does not call onChange when a disabled option is clicked", () => {
        const onChangeMock = jest.fn();
        const { getByText } = render(
            <SegmentedControl {...defaultProps} onChange={onChangeMock} />,
        );

        act(() => {
            fireEvent.click(getByText("Option 3"));
        });
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("renders with animation when hasAnimation is true", () => {
        const animatedProps = { ...defaultProps, hasAnimation: true };
        const { container } = render(<SegmentedControl {...animatedProps} />);
        expect(container).toMatchSnapshot();
    });
});
