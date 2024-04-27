import { ComponentProps } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import NotificationBanner from "..";
import { TYPE } from "@utils/notification-utils";
import userEvent from "@testing-library/user-event";

describe("NotificationBanner", () => {
    const customIcon = "Custom icon";
    const testMessage = "Test message";
    const testTitle = "Test title";
    const mokedProps: ComponentProps<typeof NotificationBanner> = {
        className: "test",
        message: testMessage,
        onClose: jest.fn(),
        onClick: jest.fn(),
        redirectTo: "https://www.example.com",
        title: testTitle,
        type: TYPE.INFO,
    };
    it("should display correct content", () => {
        const { container } = render(<NotificationBanner {...mokedProps} />);

        expect(container).toMatchSnapshot();
        expect(screen.getByText(testTitle)).toBeInTheDocument();
        expect(screen.getByText(testMessage)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "close" }),
        ).toBeInTheDocument();
    });
    it("should display correct banner with a custom icon", () => {
        const { container } = render(
            <NotificationBanner
                {...mokedProps}
                icon={<div>{customIcon}</div>}
                iconBackgroundColor="#000000"
            />,
        );

        expect(container).toMatchSnapshot();
        expect(screen.getByText(customIcon)).toBeInTheDocument();
    });
    it("should render correctly for mobile - without close button", () => {
        const { container } = render(
            <NotificationBanner {...mokedProps} isMobile />,
        );

        expect(container).toMatchSnapshot();
        expect(
            screen.queryByRole("button", { name: "close" }),
        ).not.toBeInTheDocument();
    });
    it("should render notification correctly based on the notification type", () => {
        const { container } = render(
            <NotificationBanner {...mokedProps} type={TYPE.WARNING} />,
        );

        expect(container).toMatchSnapshot();
    });
    it("should call onClick after banner is clicked", async () => {
        render(<NotificationBanner {...mokedProps} />);

        const notification = screen.getByText(testMessage);
        await userEvent.click(notification);

        expect(mokedProps.onClick).toHaveBeenCalled();
    });
    it("should call onClose after close button is clicked", async () => {
        render(<NotificationBanner {...mokedProps} />);

        const closeButton = screen.getByRole("button", { name: "close" });
        await userEvent.click(closeButton);

        await waitFor(() => {
            expect(mokedProps.onClose).toHaveBeenCalled();
        });
    });
    it("should hide after autohideTimeout + 240ms of animation", () => {
        jest.useFakeTimers();
        const { container } = render(
            <NotificationBanner {...mokedProps} autohideTimeout={4000} />,
        );

        jest.advanceTimersByTime(4240);
        expect(mokedProps.onClose).toHaveBeenCalled();
        jest.useRealTimers();
        expect(container).toMatchSnapshot();
    });
});
