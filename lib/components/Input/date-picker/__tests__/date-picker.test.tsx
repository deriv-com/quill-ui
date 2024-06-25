import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import DatePickerDropdown from "..";

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

    test("render datepicker initial state correctly", () => {
        const { getByTestId } = render(
            <DatePickerDropdown
                label="Date"
                onSelectDate={(value: Date) => {
                    return value;
                }}
                placeholder="dd/mm/yyyy"
            />,
        );

        const datepicker = getByTestId("input-container");
        expect(datepicker).toBeInTheDocument();
    });

    test("renders correctly when open", () => {
        const { getByTestId } = render(
            <DatePickerDropdown
                label="Date"
                onSelectDate={(value: Date) => {
                    return value;
                }}
                placeholder="dd/mm/yyyy"
            />,
        );

        const datepicker = getByTestId("input-container");

        act(() => {
            fireEvent.click(datepicker);
        });

        const calendar = getByTestId("atom-calendar");
        expect(calendar).toBeInTheDocument();
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
});
