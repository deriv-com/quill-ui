import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Segment } from "../segment"; // Adjust the import according to your file structure

describe("Segment Component", () => {
    it("renders correctly", () => {
        const { getByText } = render(
            <Segment
                onClick={() => {}}
                onKeyDown={() => {}}
                isSelected={false}
                label="Test Label"
            />,
        );
        expect(getByText("Test Label")).toBeInTheDocument();
    });

    it("calls onClick when clicked", () => {
        const handleClick = jest.fn();
        const { getByText } = render(
            <Segment
                onClick={handleClick}
                onKeyDown={() => {}}
                isSelected={false}
                label="Clickable Label"
            />,
        );

        fireEvent.click(getByText("Clickable Label"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("calls onKeyDown when a key is pressed", () => {
        const handleKeyDown = jest.fn();
        const { getByText } = render(
            <Segment
                onClick={() => {}}
                onKeyDown={handleKeyDown}
                isSelected={false}
                label="Key Down Label"
            />,
        );

        fireEvent.keyDown(getByText("Key Down Label"), { key: "Enter" });
        expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });

    it("renders with an icon", () => {
        const { getByText } = render(
            <Segment
                onClick={() => {}}
                onKeyDown={() => {}}
                isSelected={false}
                icon={<span>Icon</span>}
                label="Icon Label"
            />,
        );

        expect(getByText("Icon")).toBeInTheDocument();
    });

    it("prevents click when isSelected is true", () => {
        const handleClick = jest.fn();
        const { getByText } = render(
            <Segment
                onClick={handleClick}
                onKeyDown={() => {}}
                isSelected={true}
                label="Non-clickable Label"
            />,
        );

        fireEvent.click(getByText("Non-clickable Label"));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
