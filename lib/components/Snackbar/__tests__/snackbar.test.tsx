import { act, fireEvent, render, screen } from "@testing-library/react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { SnackbarProvider } from "../../../providers/snackbar/snackbarProvider";
import { SnackbarController } from "..";
import { SnackbarProps } from "../Snackbar";

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
    let defaultProps: Omit<SnackbarProps, "isShown">;
    beforeEach(() => {
        defaultProps = {
            icon: "",
            message: testMessage,
            actionText: "Action",
            hasCloseButton: true,
            id: "1",
        };
    });

    const renderComponent = () => {
        return render(
            <SnackbarProvider>
                <SnackbarController />
            </SnackbarProvider>,
        );
    };
    it("renders with default props", async () => {
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: [{ ...defaultProps }],
        });
        const { container } = renderComponent();

        expect(screen.getByText(testMessage)).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("renders correctly with custom icon", () => {
        defaultProps.icon = <img src="custom-icon.svg" alt="Custom Icon" />;
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: [{ ...defaultProps }],
        });
        const { container } = renderComponent();
        expect(screen.getByAltText("Custom Icon")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("renders correctly without action button", () => {
        defaultProps.actionText = "";
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: [{ ...defaultProps }],
        });
        const { container } = renderComponent();
        expect(screen.queryByText("Action")).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("renders correctly without close button", () => {
        defaultProps.hasCloseButton = false;
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: [{ ...defaultProps }],
        });
        const { container } = renderComponent();
        expect(screen.queryByTestId("close-button")).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("calls removeSnackbar when close button is clicked", async () => {
        jest.useFakeTimers();
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: [{ ...defaultProps }],
            removeSnackbar: removeSnackbarMock,
        });
        const { container } = renderComponent();

        act(() => {
            fireEvent.click(screen.getByTestId("close-button"));
            jest.advanceTimersByTime(100);
        });

        expect(removeSnackbarMock).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
        jest.useRealTimers();
    });
    it("calls removeSnackbar when action button is clicked", async () => {
        jest.useFakeTimers();
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: [{ ...defaultProps }],
            removeSnackbar: removeSnackbarMock,
        });
        const { container } = renderComponent();

        act(() => {
            fireEvent.click(screen.getByText("Action"));
            jest.advanceTimersByTime(100);
        });

        expect(removeSnackbarMock).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
        jest.useRealTimers();
    });
    it("calls removeSnackbar after a certain duration when Snackbar is open", async () => {
        jest.useFakeTimers();
        (useSnackbar as jest.Mock).mockReturnValue({
            queue: [{ ...defaultProps }],
            removeSnackbar: removeSnackbarMock,
        });
        const { container } = renderComponent();
        jest.advanceTimersByTime(4000);

        expect(removeSnackbarMock).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
        jest.useRealTimers();
    });
});
