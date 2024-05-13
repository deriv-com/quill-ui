import { render, screen, waitFor } from "@testing-library/react";
import InputGroupButton from "..";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("InputGroupButton Component", () => {
    it("should render a default InputGroupButton", () => {
        const { container } = render(
            <InputGroupButton buttonLabel="Submit" label="input" />,
        );

        expect(screen.getByLabelText("input")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should handle the hover for outline variant", async () => {
        const onHover = jest.fn();
        render(
            <InputGroupButton
                buttonLabel="Button"
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

    it("disables button when input is empty", () => {
        const { container } = render(<InputGroupButton buttonLabel="Submit" />);

        const button = screen.getByText("Submit").closest("button");
        expect(button).toBeDisabled();
        expect(container).toMatchSnapshot();
    });

    it("enables button when input is not empty", () => {
        const { container } = render(
            <InputGroupButton buttonLabel="Submit" label="input" />,
        );

        const input = screen.getByLabelText("input");
        const button = screen.getByText("Submit");

        userEvent.type(input, "Test");
        expect(button).toBeEnabled();
        expect(container).toMatchSnapshot();
    });

    it("should call buttonCallback if user clicks on button and buttonCallback was passed", async () => {
        const buttonCallback = jest.fn();
        render(
            <InputGroupButton
                buttonLabel="Submit"
                label="input"
                value="User Input"
                buttonCallback={buttonCallback}
            />,
        );

        const button = screen.getByText("Submit");

        userEvent.click(button);
        await waitFor(() => {
            expect(buttonCallback).toHaveBeenCalledTimes(1);
        });
    });
});
