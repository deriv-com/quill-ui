import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "../index";
import dayjs from "dayjs";

describe("DatePicker", () => {
    const currentDate = new Date("2024-09-05");
    const defaultDateFormatter = currentDate.toLocaleString(
        navigator.languages,
        {
            month: "short",
            year: "numeric",
        },
    );

    const next2Label = "+";
    const prev2Label = "-";
    const mockOnFormattedDate = jest.fn();
    const mockOnChange = jest.fn();

    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2024-09-19"));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

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
                dayjs(currentDate).format("DD/MM/YYYY"),
            );
        });
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
