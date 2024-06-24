import React from "react";
import { fireEvent, render } from "@testing-library/react";
import DatePickerDropdown from "..";
import userEvent from "@testing-library/user-event";

describe("DatePickerDropdown", () => {
    test("renders correctly", () => {
        const { container } = render(
            <DatePickerDropdown
                label="Date"
                onSelectDate={(value: Date) => {
                    return value;
                }}
            />,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    test("renders correctly when open", () => {
        const { container, getByTestId } = render(
            <DatePickerDropdown
                label="Date"
                onSelectDate={(value: Date) => {
                    return value;
                }}
                placeholder="dd/mm/yyyy"
            />,
        );

        userEvent.click(getByTestId("input-container"));
        expect(container).toMatchSnapshot();
    });

    test("renders correct label", () => {
        const { getByText } = render(
            <DatePickerDropdown
                label="Date"
                onSelectDate={(value: Date) => {
                    return value;
                }}
            />,
        );

        const label = getByText("Date");
        expect(label).toBeInTheDocument();
    });

    test("renders correct placeholder", () => {
        const { getByPlaceholderText } = render(
            <DatePickerDropdown
                onSelectDate={(value: Date) => {
                    return value;
                }}
                placeholder="dd/mm/yyyy"
            />,
        );

        const placeholder = getByPlaceholderText("dd/mm/yyyy");
        expect(placeholder).toBeInTheDocument();
    });

    test("renders correct placeholder and label", () => {
        const { getByText, getByPlaceholderText } = render(
            <DatePickerDropdown
                onSelectDate={(value: Date) => {
                    return value;
                }}
                label="Date"
                placeholder="dd/mm/yyyy"
            />,
        );

        const placeholder = getByPlaceholderText("dd/mm/yyyy");
        expect(placeholder).toBeInTheDocument();

        const label = getByText("Date");
        expect(label).toBeInTheDocument();
    });

    test("return value from onSelectDate correctly", () => {
        const onSelectDate = jest.fn();

        const { getByPlaceholderText } = render(
            <DatePickerDropdown
                onSelectDate={(value: Date) => {
                    onSelectDate(value);
                }}
                placeholder="dd/mm/yyyy"
                isAutocomplete
            />,
        );

        const input = getByPlaceholderText("dd/mm/yyyy");
        const value = "24/06/2024";
        fireEvent.change(input, {
            target: {
                value,
            },
        });

        expect(input).toHaveValue(value);
        onSelectDate.mockReturnValueOnce(new Date("2024-06-24"));
    });
});
