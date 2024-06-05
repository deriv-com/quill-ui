import { render, screen } from "@testing-library/react";
import TextFieldWithSteppers, { TextFieldWithSteppersProps } from "..";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("TextFieldWithSteppers", () => {
    const setup = (props: Partial<TextFieldWithSteppersProps> = {}) => render(<TextFieldWithSteppers {...props} />);

    it("should match snapshot", () => {
        const { container } = setup({ placeholder: "Enter text" });
        expect(container).toMatchSnapshot();
    });

    it("should render with a label", () => {
        setup({ label: "Username" });
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
    });

    it("should render disabled input", () => {
        setup({ label: "Username", disabled: true });
        expect(screen.getByLabelText("Username")).toBeDisabled();
    });

    it("should handle the hover for outline variant", async () => {
        const onHover = jest.fn();
        setup({
            placeholder: "Placeholder",
            onMouseEnter: onHover,
            variant: "outline",
        });
        const input = screen.getByPlaceholderText("Placeholder");
        await userEvent.hover(input);
        expect(onHover).toHaveBeenCalledTimes(1);
        expect(input.parentElement).toMatchSnapshot();
    });

    it("should display message when provided", () => {
        const { container } = setup({
            message: "Error message",
            status: "error",
        });
        expect(screen.getByText("Error message")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should display unitLeft when provided", () => {
        const { container } = setup({
            unitLeft: "$",
        });
        expect(screen.getByText("$")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should display unitRight when provided", () => {
        const { container } = setup({
            unitRight: "USD",
        });
        expect(screen.getByText("USD")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
