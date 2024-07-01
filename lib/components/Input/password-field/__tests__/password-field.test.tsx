import { act, fireEvent, render, screen } from "@testing-library/react";
import PasswordField, { PasswordFieldProps } from "..";
import React from "react";

describe("PasswordField", () => {
    const setup = (props: Partial<PasswordFieldProps> = {}) => {
        const placeholder = "Password";
        const utils = render(
            <PasswordField {...props} placeholder={placeholder} />,
        );
        const input = utils.getByPlaceholderText(
            placeholder,
        ) as HTMLInputElement;
        return {
            input,
            ...utils,
        };
    };

    it("should match snapshot", () => {
        const { container } = setup({ placeholder: "Enter password" });
        expect(container).toMatchSnapshot();
    });

    it("should render with default props", () => {
        setup();
        const placeholder = "Password";
        expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    it("should render with a label", () => {
        setup({ label: "password" });
        expect(screen.getByLabelText("password")).toBeInTheDocument();
    });

    it("should call onChange handler when input changes", () => {
        const handleChange = jest.fn();
        const { input } = setup({ onChange: handleChange });
        act(() => {
            fireEvent.change(input, { target: { value: "Password1234" } });
        });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("should display message when provided", () => {
        const { container } = setup({
            message: "Error message",
            status: "error",
        });
        expect(screen.getByText("Error message")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("toggles password visibility icon", () => {
        const { getByTestId } = render(<PasswordField />);

        expect(getByTestId("eye-icon")).toBeInTheDocument();

        act(() => {
            fireEvent.click(getByTestId("eye-icon"));
        });
        expect(getByTestId("eye-slash-icon")).toBeInTheDocument();
        act(() => {
            fireEvent.click(getByTestId("eye-slash-icon"));
        });
        expect(getByTestId("eye-icon")).toBeInTheDocument();
    });
});
