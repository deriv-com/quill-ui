import { render, screen } from "@testing-library/react";
import TextField from "..";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("TextField", () => {
    it("It should render a default Textfiled", () => {
        const { container } = render(<TextField />);
        expect(container).toMatchSnapshot();
    });

    it("should handle the hover for outline variant", async () => {
        const onHover = jest.fn();
        render(
            <TextField
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
            <TextField
                placeholder="Placeholder"
                onMouseEnter={onHover}
                variant="fill"
            />,
        );
        const input = screen.getByPlaceholderText("Placeholder");
        await userEvent.hover(input);
        expect(onHover).toHaveBeenCalledTimes(1);
    });

    it("should render a TextField with success status", () => {
        const { container } = render(<TextField status="success" />);
        expect(container).toMatchSnapshot();
    });

    it("should render a TextField with error status", () => {
        const { container } = render(<TextField status="error" />);
        expect(container).toMatchSnapshot();
    });
});
