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
        const { container } = renderComponent();
        expect(screen.getByText(testMessage)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("calls onActionClick when action button is clicked", () => {
        const onActionClickMock = jest.fn();
        const { container } = renderComponent({
            actionText: "Action",
            onActionClick: onActionClickMock,
        });
        fireEvent.click(screen.getByText("Action"));
        expect(onActionClickMock).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
    });
    it("calls onClose when close button is clicked", () => {
        const { container } = renderComponent();
        fireEvent.click(screen.getByTestId('close-button'));
        expect(defaultProps.onClose).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
    });
    it("calls onClose after a certain duration when Snackbar is open", () => {
        jest.useFakeTimers();
        const { container } = renderComponent();
        jest.advanceTimersByTime(3000);
        expect(defaultProps.onClose).toHaveBeenCalled();
        jest.useRealTimers();
        expect(container).toMatchSnapshot();
    });
    it("renders correctly with custom icon", () => {
        const { container } = renderComponent({
            icon: <img src="custom-icon.svg" alt="Custom Icon" />,
        });
        expect(screen.getByAltText("Custom Icon")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("renders correctly without action button", () => {
        const { container } = renderComponent();
        expect(screen.queryByText("Action")).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("renders correctly without close button", () => {
        const { container } = renderComponent({ hasCloseButton: false });
        expect(screen.queryByText("x")).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
