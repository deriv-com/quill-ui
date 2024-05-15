import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "../index";

describe("DatePicker", () => {
    const currentDate = new Date();
    const defaultDateFormatter = currentDate.toLocaleString(
        navigator.languages,
        {
            month: "short",
            year: "numeric",
        },
    );
    const defaultReturnedSelectedDateFormatter = currentDate.toLocaleString(
        navigator.language,
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        },
    );
    const customOptionsConfig = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    const customReturnedSelectedDateFormatter = currentDate.toLocaleString(
        navigator.language,
        customOptionsConfig as Intl.DateTimeFormatOptions,
    );
    const next2Label = "+";
    const prev2Label = "-";
    const mockOnFormattedDate = jest.fn();
    const mockOnChange = jest.fn();

    it("should render with default values if optional ones were not passed", () => {
        const { container } = render(<DatePicker />);

        expect(container).toMatchSnapshot();
        ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((day) =>
            expect(screen.getByText(day)).toBeInTheDocument(),
        );
        expect(screen.getByText(defaultDateFormatter)).toBeInTheDocument();
        expect(mockOnFormattedDate).not.toHaveBeenCalled();
    });

    it("should call onChange and onFormattedDate if they were passed and user clicks on the date", async () => {
        render(
            <DatePicker
                onChange={mockOnChange}
                onFormattedDate={mockOnFormattedDate}
            />,
        );

        userEvent.click(screen.getByText(currentDate.getDate()));

        await waitFor(() => {
            expect(mockOnChange).toHaveBeenCalled();
            expect(mockOnFormattedDate).toHaveBeenCalledWith(
                defaultReturnedSelectedDateFormatter,
            );
        });
    });

    it("should format returned selected date according to the passed custom config", async () => {
        render(
            <DatePicker
                onFormattedDate={mockOnFormattedDate}
                optionsConfig={customOptionsConfig}
            />,
        );

        userEvent.click(screen.getByText(currentDate.getDate()));

        await waitFor(() => {
            expect(mockOnFormattedDate).toHaveBeenCalledWith(
                customReturnedSelectedDateFormatter,
            );
        });
    });

    it("should render calendar with selected value and call onFormattedDate function if the value was passed", () => {
        const { container } = render(
            <DatePicker
                value={currentDate}
                onFormattedDate={mockOnFormattedDate}
            />,
        );

        expect(container).toMatchSnapshot();
        expect(mockOnFormattedDate).toHaveBeenCalled();
    });

    it("should render calendar with range selection", async () => {
        const { container } = render(<DatePicker selectRange />);

        userEvent.click(screen.getByText("10"));
        userEvent.click(screen.getByText("12"));

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });

    it("should render calendar with double navigation if next2Label and prev2Label were passed", () => {
        const { container } = render(
            <DatePicker next2Label={next2Label} prev2Label={prev2Label} />,
        );

        expect(container).toMatchSnapshot();
        expect(screen.getByText(next2Label)).toBeInTheDocument();
        expect(screen.getByText(prev2Label)).toBeInTheDocument();
    });

    it("should render calendar without navigation if showNavigation === false", () => {
        const { container } = render(<DatePicker showNavigation={false} />);

        expect(container).toMatchSnapshot();
    });

    it("should render calendar with neighboring month if showNeighboringMonth === true", () => {
        const { container } = render(<DatePicker showNeighboringMonth />);

        expect(container).toMatchSnapshot();
    });
});
