import { render, screen, fireEvent } from "@testing-library/react";
import { Snackbar } from "..";

describe("Snackbar", () => {
    const testMessage = "test message"
    const defaultProps = {
        message: testMessage,
        isOpen: true,
        onClose: jest.fn(),
    };

    const renderComponent = (props = {}) =>
        render(<Snackbar {...defaultProps} {...props} />);

    it("renders with default props", () => {
        renderComponent();
        expect(screen.getByText(testMessage)).toBeInTheDocument();
    });
    it("calls onActionClick when action button is clicked", () => {
        const onActionClickMock = jest.fn();
        renderComponent({
            actionText: "Action",
            onActionClick: onActionClickMock,
        });
        fireEvent.click(screen.getByText("Action"));
        expect(onActionClickMock).toHaveBeenCalled();
    });
    it("calls onClose when close button is clicked", () => {
        renderComponent();
        fireEvent.click(screen.getByTestId('close-button'));
        expect(defaultProps.onClose).toHaveBeenCalled();
    });
    it("calls onClose after a certain duration when Snackbar is open", () => {
        jest.useFakeTimers();
        renderComponent();
        jest.advanceTimersByTime(3000);
        expect(defaultProps.onClose).toHaveBeenCalled();
        jest.useRealTimers();
    });
    it("renders correctly with custom icon", () => {
        renderComponent({
            icon: <img src="custom-icon.svg" alt="Custom Icon" />,
        });
        expect(screen.getByAltText("Custom Icon")).toBeInTheDocument();
    });
    it("renders correctly without action button", () => {
        renderComponent();
        expect(screen.queryByText("Action")).not.toBeInTheDocument();
    });
    it("renders correctly without close button", () => {
        renderComponent({ hasCloseButton: false });
        expect(screen.queryByText("x")).not.toBeInTheDocument();
    });
});
