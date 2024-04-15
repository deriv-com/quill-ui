import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioButton from "..";

describe("RadioButton component", () => {
    it("should render correctly with default props", () => {
        const { container } = render(<RadioButton>Radio Option</RadioButton>);
        const label = screen.getByText(/Radio Option/i);
        expect(label).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should render with a custom className", () => {
        const { container } = render(
            <RadioButton className="custom-class">Radio Option</RadioButton>,
        );
        const input = screen.getByTestId("dt_quill_radio_button");
        expect(input).toBeInTheDocument();
        expect(input.classList.contains("custom-class")).toBeTruthy();
        expect(container).toMatchSnapshot();
    });

    it("should be checked by default if defaultChecked is true", () => {
        const { container } = render(
            <RadioButton defaultChecked id="test-id" value="option1">
                Radio Option
            </RadioButton>,
        );
        expect(
            screen.getByTestId("dt_checked_icon_option1_false"),
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should not be checked by default if defaultChecked is false", () => {
        const { container } = render(
            <RadioButton id="test-id" value="option2">
                Radio Option
            </RadioButton>,
        );
        expect(
            screen.getByTestId("dt_unchecked_icon_option2_false"),
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should be disabled if disabled is true", () => {
        const { container } = render(
            <RadioButton disabled id="test-id" value="option3">
                Radio Option
            </RadioButton>,
        );
        expect(
            screen.getByTestId("dt_unchecked_icon_option3_true"),
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should render info icon when hasInfo is true", () => {
        const { container } = render(
            <RadioButton hasInfo classNameInfo="custom-info">
                Radio Option
            </RadioButton>,
        );
        const infoIcon = screen.getByTestId("dt_quill_radio_button_info");
        expect(infoIcon.classList.contains("custom-info")).toBeTruthy();
        expect(container).toMatchSnapshot();
    });

    it("should not render info icon when hasInfo is false", () => {
        const { container } = render(<RadioButton>Radio Option</RadioButton>);
        const infoIcon = screen.queryByTestId("dt_quill_radio_button_info");
        expect(infoIcon).toBeNull();
        expect(container).toMatchSnapshot();
    });

    it("should not trigger click event on input when info icon is clicked and disabled", () => {
        const mockOnChange = jest.fn();
        const { container } = render(
            <RadioButton
                disabled
                id="test-id"
                onChange={mockOnChange}
                value="option4"
            >
                Radio Option
            </RadioButton>,
        );
        const input = screen.getByTestId("dt_unchecked_icon_option4_true");
        userEvent.click(input);
        expect(mockOnChange).toHaveBeenCalledTimes(0);
        expect(container).toMatchSnapshot();
    });
});
