import { act, fireEvent, render, screen } from "@testing-library/react";
import { Snackbar } from "..";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { SnackbarProvider } from "../../../providers/snackbar/snackbarProvider";

const removeSnackbarMock = jest.fn();
jest.mock("../../../hooks/useSnackbar", () => ({
    useSnackbar: jest.fn(() => ({
        queue: [],
        addSnackbar: jest.fn(),
        removeSnackbar: jest.fn(),
    })),
}));

describe("Snackbar", () => {
    const testMessage = "test message";
    const defaultProps = {
        icon: "",
        message: testMessage,
        actionText: "Action",
        hasCloseButton: true,
    };

    const renderComponent = (props = {}) =>
        render(
            <SnackbarProvider>
                <Snackbar {...defaultProps} {...props} />
            </SnackbarProvider>,
        );

    it("renders with default props", () => {
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: ["trigger"],
        });
        const { container } = renderComponent();
        expect(screen.getByText(testMessage)).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("renders correctly with custom icon", () => {
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: ["trigger"],
        });
        const { container } = renderComponent({
            icon: <img src="custom-icon.svg" alt="Custom Icon" />,
        });
        expect(screen.getByAltText("Custom Icon")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("renders correctly without action button", () => {
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: ["trigger"],
        });
        const { container } = renderComponent({ actionText: "" });
        expect(screen.queryByText("Action")).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("renders correctly without close button", () => {
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: ["trigger"],
        });
        const { container } = renderComponent({ hasCloseButton: false });
        expect(screen.queryByTestId("close-button")).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("calls removeSnackbar when close button is clicked", async () => {
        jest.useFakeTimers();
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: ["trigger"],
            removeSnackbar: removeSnackbarMock,
        });
        const { container } = renderComponent();

        act(() => {
            fireEvent.click(screen.getByTestId("close-button"));
            jest.advanceTimersByTime(1000);
        });

        expect(removeSnackbarMock).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
        jest.useRealTimers();
    });
    it("calls removeSnackbar when action button is clicked", async () => {
        jest.useFakeTimers();
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: ["trigger"],
            removeSnackbar: removeSnackbarMock,
        });
        const { container } = renderComponent();

        act(() => {
            fireEvent.click(screen.getByText("Action"));
            jest.advanceTimersByTime(1000);
        });

        expect(removeSnackbarMock).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
        jest.useRealTimers();
    });
    it("calls removeSnackbar after a certain duration when Snackbar is open", async () => {
        jest.useFakeTimers();
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: ["trigger"],
            removeSnackbar: removeSnackbarMock,
        });
        const { container } = renderComponent();
        jest.advanceTimersByTime(3000);

        expect(removeSnackbarMock).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
        jest.useRealTimers();
    });
});
