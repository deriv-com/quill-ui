import { act, fireEvent, render, screen } from "@testing-library/react";
import TextField, { TextFieldProps } from "..";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("TextField", () => {
    const setup = (props: Partial<TextFieldProps> = {}) => {
        const utils = render(<TextField {...props} />);
        const input = utils.getByRole("textbox");
        return {
            input,
            ...utils,
        };
    };

    it("should match snapshot", () => {
        const { container } = setup({ placeholder: "Enter text" });
        expect(container).toMatchSnapshot();
    });

    it("should render with default props", () => {
        setup();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render with a label", () => {
        setup({ label: "Username" });
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
    });

    it("should call onChange handler when input changes", () => {
        const handleChange = jest.fn();
        const { input } = setup({ onChange: handleChange });
        act(() => {
            fireEvent.change(input, { target: { value: "Hello" } });
        });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("should show character counter if enabled", () => {
        setup({ show_counter: true, maxLength: 10 });
        act(() => {
            fireEvent.change(screen.getByRole("textbox"), {
                target: { value: "Hello" },
            });
        });
        expect(screen.getByText("5/10")).toBeInTheDocument();
    });

    it("should render disabled input", () => {
        setup({ disabled: true });
        expect(screen.getByRole("textbox")).toBeDisabled();
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

    it("should render with a left icon", () => {
        const { container } = setup({ leftIcon: <span>Left Icon</span> });
        expect(screen.getByText("Left Icon")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should display message when provided", () => {
        const { container } = setup({
            message: "Error message",
            status: "error",
        });
        expect(screen.getByText("Error message")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
