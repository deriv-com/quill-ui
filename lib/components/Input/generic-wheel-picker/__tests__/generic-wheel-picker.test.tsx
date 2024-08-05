import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GenericWheelPicker } from "..";
import { DropdownProvider } from "@providers/dropdown/dropdownProvider";
import { useDropdown } from "@hooks/useDropdown";
import useBreakpoints from "@hooks/useBreakpoints";
import { act } from "react-dom/test-utils";

const mockData = [
    [
        { value: "1" },
        { value: "2" },
        { value: "3" },
    ],
    [
        { value: "4" },
        { value: "5" },
        { value: "6" },
    ],
    [
        { value: "7"},
        { value: "8"},
        { value: "9"},
    ],
];

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
            <GenericWheelPicker
                data={mockData}
                values={["1", "4", "7"]}
                label="test"
                onValueChange={mockOnValueChange}
            />
        </DropdownProvider>,
    );

describe("GenericWheelPicker", () => {
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

        expect(mockOnValueChange).toHaveBeenCalledWith(["1", "4", "7"]);
    });

    it("should render ActionSheet in mobile view", async () => {
        (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true });
        (useDropdown as jest.Mock).mockReturnValue({
            isOpen: true,
            open: mockOpen,
            close: mockClose,
        })

        renderComponent();

        const input = screen.getByRole("textbox");
        await act(() => {
            userEvent.click(input);
        });
        expect(screen.getByText("6")).toBeInTheDocument();
    });
});
