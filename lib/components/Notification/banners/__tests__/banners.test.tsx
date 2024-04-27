import { ComponentProps } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import NotificationBanners from "..";
import { TYPE } from "@utils/notification-utils";
import userEvent from "@testing-library/user-event";

describe("NotificationBanners", () => {
    const customIcon = "Custom icon";
    const infoMessage = "Info message";
    const infoTitle = "Information";
    const warningMessage = "Warning message";
    const warningTitle = "Warning";
    const redirectTo = "https://www.example.com";
    const banners = [
        {
            id: "0",
            message: infoMessage,
            redirectTo,
            title: infoTitle,
            type: TYPE.INFO,
        },
        {
            id: "1",
            icon: <div>{customIcon}</div>,
            iconBackgroundColor: "#000000",
            message: warningMessage,
            redirectTo,
            title: warningTitle,
            type: TYPE.WARNING,
        },
    ];
    const mokedProps: ComponentProps<typeof NotificationBanners> = {
        autohideTimeout: 4000,
        banners,
        className: "test",
        onClick: jest.fn(),
        onClose: jest.fn(),
        zIndex: 6,
    };

    it("should render the first banner from the list of banners and auto-close it after autohideTimeout + 240ms of animation", () => {
        jest.useFakeTimers();
        const { container } = render(<NotificationBanners {...mokedProps} />);

        expect(screen.getByText(infoMessage)).toBeInTheDocument();
        expect(screen.getByText(infoTitle)).toBeInTheDocument();
        expect(screen.queryByText(warningMessage)).not.toBeInTheDocument();
        expect(screen.queryByText(warningTitle)).not.toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "close" }),
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();

        jest.advanceTimersByTime(4240);
        expect(mokedProps.onClose).toHaveBeenCalledTimes(1);
        jest.useRealTimers();
    });
    it("should render notifications correctly for mobile - without close button", () => {
        const { container } = render(
            <NotificationBanners {...mokedProps} isMobile />,
        );

        expect(container).toMatchSnapshot();
        expect(
            screen.queryByRole("button", { name: "close" }),
        ).not.toBeInTheDocument();
    });
    it("should call onClick with an id of the clicked banner after it is clicked", async () => {
        render(<NotificationBanners {...mokedProps} />);

        const infoNotification = screen.getByText(infoMessage);
        await userEvent.click(infoNotification);

        expect(mokedProps.onClick).toHaveBeenCalledWith("0");
    });
    it("should call onClose with an id of the closed banner after it is closed", async () => {
        render(<NotificationBanners {...mokedProps} />);

        const closeButton = screen.getByRole("button", { name: "close" });
        await userEvent.click(closeButton);

        await waitFor(() => {
            expect(mokedProps.onClose).toHaveBeenCalledWith("0");
        });
    });
    it("should not render if banners are empty", () => {
        const { container } = render(
            <NotificationBanners {...mokedProps} banners={[]} />,
        );

        expect(container).toMatchSnapshot();
        expect(container).toBeEmptyDOMElement();
    });
});
