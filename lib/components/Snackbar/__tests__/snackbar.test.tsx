import { render, screen, fireEvent } from "@testing-library/react";
import { Snackbar } from "..";

describe("Snackbar", () => {
    it("renders with default props", () => {
        const { container } = render(
            <Snackbar
                message="Test message"
                isOpen={true}
                onClose={jest.fn()}
            />,
        );
        expect(screen.getByText("Test message")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("calls onActionClick when action button is clicked", () => {
        const onActionClickMock = jest.fn();
        const { container } = render(
            <Snackbar
                message="Test message"
                actionText="Action"
                isOpen={true}
                onActionClick={onActionClickMock}
                onClose={jest.fn()}
            />,
        );

        fireEvent.click(screen.getByText("Action"));
        expect(onActionClickMock).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
    });
    it("calls onClose when close button is clicked", () => {
        const onCloseMock = jest.fn();
        const { container } = render(
            <Snackbar
                message="Test message"
                isOpen={true}
                onClose={onCloseMock}
            />,
        );

        fireEvent.click(screen.getByText("x"));
        expect(onCloseMock).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
    });
    it("calls onClose after a certain duration when Snackbar is open", async () => {
        jest.useFakeTimers();

        const onCloseMock = jest.fn();
        const { container } = render(
            <Snackbar
                message="Test message"
                isOpen={true}
                onClose={onCloseMock}
            />,
        );

        jest.advanceTimersByTime(3000);
        expect(onCloseMock).toHaveBeenCalled();
        expect(container).toMatchSnapshot();

        jest.useRealTimers();
    });
    it("renders correctly with custom icon", () => {
        const customIcon = (
            <img
                src="custom-icon.svg"
                alt="Custom Icon"
                data-testid="custom-icon"
            />
        );
        const { container } = render(
            <Snackbar
                icon={customIcon}
                message="Test message"
                isOpen={true}
                onClose={jest.fn()}
            />,
        );

        expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("renders correctly without action button", () => {
        const { container } = render(
            <Snackbar
                message="Test message"
                isOpen={true}
                onClose={() => {}}
            />,
        );

        expect(screen.queryByText("Action")).toBeNull();
        expect(container).toMatchSnapshot();
    });
    it("renders correctly without close button", () => {
        const { container } = render(
            <Snackbar
                message="Test message"
                isOpen={true}
                onClose={jest.fn()}
                hasCloseButton={false}
            />,
        );

        expect(screen.queryByText("x")).toBeNull();
        expect(container).toMatchSnapshot();
    });
});
