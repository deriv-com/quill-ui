import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimeWheelPicker } from "..";
import { DropdownProvider } from "@providers/dropdown/dropdownProvider";
import { useDropdown } from "@hooks/useDropdown";
import useBreakpoints from "@hooks/useBreakpoints";
import { act } from "react-dom/test-utils";

jest.mock("@hooks/useDropdown", () => ({
    useDropdown: jest.fn(),
}));
jest.mock("@hooks/useBreakpoints");

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserver;
const mockOnValueChange = jest.fn();

const renderComponent = () =>
    render(
        <DropdownProvider>
            <TimeWheelPicker
                is12Hour
                label="test"
                wheelType="Time"
                onValueChange={mockOnValueChange}
            />
        </DropdownProvider>,
    );

describe("TimeWheelPicker", () => {
    const mockOpen = jest.fn();
    const mockClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useDropdown as jest.Mock).mockReturnValue({
            isOpen: false,
            open: mockOpen,
            close: mockClose,
        });
        (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false });
    });

    it("renders correctly", () => {
        const { container } = renderComponent();

        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should open dropdown on click", async () => {
        renderComponent();

        const input = screen.getByRole("textbox");
        await userEvent.click(input);

        expect(mockOpen).toHaveBeenCalled();
    });

    it("should handle ArrowDown keydown event", async () => {
        renderComponent();

        const input = screen.getByRole("textbox");
        await userEvent.type(input, "{arrowdown}");

        expect(mockOpen).toHaveBeenCalled();
    });

    it("should call onValueChange when dataValues change", async () => {
        renderComponent();

        const input = screen.getByRole("textbox");
        await userEvent.type(input, "{arrowdown}");

        expect(mockOnValueChange).toHaveBeenCalledTimes(1);
    });

    it("should render ActionSheet in mobile view", async () => {
        (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true });
        (useDropdown as jest.Mock).mockReturnValue({
            isOpen: true,
            open: mockOpen,
            close: mockClose,
        });

        renderComponent();

        const input = screen.getByRole("textbox");
        await act(() => {
            userEvent.click(input);
        });
        expect(screen.getAllByText("01")).toHaveLength(2);
    });
});
