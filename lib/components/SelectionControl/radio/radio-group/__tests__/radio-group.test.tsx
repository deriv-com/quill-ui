import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RadioGroup from "..";

describe("RadioGroup component", () => {
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    it("renders radio buttons with correct labels", () => {
        const { container } = render(
            <RadioGroup name="test" onToggle={() => {}} selected="option1">
                {options.map((option) => (
                    <RadioGroup.Item
                        key={option.value}
                        value={option.value}
                        label={option.label}
                    />
                ))}
            </RadioGroup>,
        );

        options.forEach((option) => {
            const radioButton = screen.getByLabelText(option.label);
            expect(radioButton).toBeInTheDocument();
        });
        expect(container).toMatchSnapshot();
    });

    it("calls onToggle when a radio button is selected", () => {
        const handleToggle = jest.fn();

        const { container } = render(
            <RadioGroup name="test" onToggle={handleToggle} selected="option1">
                {options.map((option) => (
                    <RadioGroup.Item
                        key={option.value}
                        value={option.value}
                        label={option.label}
                    />
                ))}
            </RadioGroup>,
        );

        fireEvent.click(screen.getByTestId("dt_unchecked_icon_option2_false"));

        expect(handleToggle).toHaveBeenCalledTimes(1);
        expect(
            screen.queryByTestId("dt_unchecked_icon_option2_false"),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("dt_checked_icon_option2_false"),
        ).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("dt_unchecked_icon_option1_false"));
        expect(handleToggle).toHaveBeenCalledTimes(2);
        expect(
            screen.queryByTestId("dt_unchecked_icon_option1_false"),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("dt_checked_icon_option1_false"),
        ).toBeInTheDocument();
        expect(
            screen.queryByTestId("dt_checked_icon_option2_false"),
        ).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId("dt_unchecked_icon_option3_false"));
        expect(handleToggle).toHaveBeenCalledTimes(3);
        expect(
            screen.queryByTestId("dt_unchecked_icon_option3_false"),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("dt_checked_icon_option3_false"),
        ).toBeInTheDocument();
        expect(
            screen.queryByTestId("dt_checked_icon_option1_false"),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("dt_checked_icon_option2_false"),
        ).not.toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });

    it("should not call onToggle when a disabled radio button is clicked", () => {
        const handleToggle = jest.fn();

        const { container } = render(
            <RadioGroup name="test" onToggle={handleToggle} selected="option1">
                {options.map((option) => (
                    <RadioGroup.Item
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        disabled={option.value === "option2"}
                    />
                ))}
            </RadioGroup>,
        );

        fireEvent.click(screen.getByTestId("dt_unchecked_icon_option2_true"));

        expect(handleToggle).toHaveBeenCalledTimes(0);
        expect(
            screen.queryByTestId("dt_unchecked_icon_option2_true"),
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
