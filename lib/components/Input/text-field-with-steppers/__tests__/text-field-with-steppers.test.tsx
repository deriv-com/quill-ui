import { render, screen } from "@testing-library/react";
import TextFieldWithSteppers from "..";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("TextFieldWithSteppers", () => {
    it("It should render a default Textfield", () => {
        const { container } = render(<TextFieldWithSteppers />);
        expect(container).toMatchSnapshot();
    });

    it("should handle the hover for outline variant", async () => {
        const onHover = jest.fn();
        render(
            <TextFieldWithSteppers
                placeholder="Placeholder"
                onMouseEnter={onHover}
                variant="outline"
            />,
        );
        const input = screen.getByPlaceholderText("Placeholder");
        await userEvent.hover(input);
        expect(onHover).toHaveBeenCalledTimes(1);
        expect(input.parentElement).toMatchSnapshot();
    });

    it("should handle the hover for fill variant", async () => {
        const onHover = jest.fn();
        render(
            <TextFieldWithSteppers
                placeholder="Placeholder"
                onMouseEnter={onHover}
                variant="fill"
            />,
        );
        const input = screen.getByPlaceholderText("Placeholder");
        await userEvent.hover(input);
        expect(onHover).toHaveBeenCalledTimes(1);
    });

    it("should render a TextFieldWithSteppers with success status", () => {
        const { container } = render(<TextFieldWithSteppers status="success" />);
        expect(container).toMatchSnapshot();
    });

    it("should render a TextFieldWithSteppers with error status", () => {
        const { container } = render(<TextFieldWithSteppers status="error" />);
        expect(container).toMatchSnapshot();
    });

    it("should render a TextFieldWithSteppers with correct currency", () => {
        const { container } = render(<TextFieldWithSteppers currency="USD" />);
        expect(container).toMatchSnapshot();
    });
});
