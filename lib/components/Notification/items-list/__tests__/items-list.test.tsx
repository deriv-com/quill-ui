import { ComponentProps } from "react";
import userEvent from "@testing-library/user-event";
import { act, render, screen, waitFor } from "@testing-library/react";
import NotificationItemsList from "..";
import { STATUS, TYPE } from "@utils/notification-utils";

describe("NotificationItemsList", () => {
    const customIcon = "Custom icon";
    const infoMessage = "Info message";
    const infoTitle = "Information";
    const warningMessage = "Warning message";
    const warningTitle = "Warning";
    const redirectTo = "https://www.example.com";
    const timestamp = new Date("2024-04-23T09:24:00").getTime();
    const items = [
        {
            id: "0",
            message: infoMessage,
            redirectTo,
            status: STATUS.UNREAD,
            timestamp,
            title: infoTitle,
            type: TYPE.INFO,
        },
        {
            id: "1",
            icon: <div>{customIcon}</div>,
            iconBackgroundColor: "#000000",
            message: warningMessage,
            redirectTo,
            status: STATUS.UNREAD,
            timestamp,
            title: warningTitle,
            type: TYPE.WARNING,
        },
    ];
    const mokedProps: ComponentProps<typeof NotificationItemsList> = {
        items,
        className: "test",
        onClose: jest.fn(),
        onClick: jest.fn(),
        onMarkAsRead: jest.fn(),
    };

    it("should render all notification items", () => {
        const { container } = render(<NotificationItemsList {...mokedProps} />);

        expect(container).toMatchSnapshot();
        expect(screen.getByText(infoMessage)).toBeInTheDocument();
        expect(screen.getByText(infoTitle)).toBeInTheDocument();
        expect(screen.getByText(warningMessage)).toBeInTheDocument();
        expect(screen.getByText(warningTitle)).toBeInTheDocument();
        expect(screen.queryAllByRole("button", { name: "close" })).toHaveLength(
            0,
        );
        expect(
            screen.getAllByRole("button", { name: "mark-as-read" }),
        ).toHaveLength(2);
        expect(screen.getAllByRole("button", { name: "delete" })).toHaveLength(
            2,
        );
    });
    it("should render notifications correctly for mobile", () => {
        const { container } = render(
            <NotificationItemsList {...mokedProps} isMobile />,
        );

        expect(container).toMatchSnapshot();
    });
    it("should call onClick with an id of the clicked notification after it is clicked", async () => {
        render(<NotificationItemsList {...mokedProps} />);

        const warningNotification = screen.getByText(warningMessage);
        await act(async () => {
            await userEvent.click(warningNotification);
        });

        expect(mokedProps.onClick).toHaveBeenCalledWith("1");
    });
    it("should call onMarkAsRead with an id of the read notification after mark-as-read button is pressed", async () => {
        render(<NotificationItemsList {...mokedProps} />);

        const warningNotificationMarkAsReadBtn = screen.getAllByRole("button", {
            name: "mark-as-read",
        })[1];
        await act(async () => {
            await userEvent.click(warningNotificationMarkAsReadBtn);
        });
        expect(mokedProps.onMarkAsRead).toHaveBeenCalledWith("1");
    });
    it("should call onClose with an id of the deleted notification after delete button is pressed", async () => {
        render(<NotificationItemsList {...mokedProps} />);

        const infoNotificationDeleteBtn = screen.getAllByRole("button", {
            name: "delete",
        })[0];
        await act(async () => {
            await userEvent.click(infoNotificationDeleteBtn);
        });

        await waitFor(() => {
            expect(mokedProps.onClose).toHaveBeenCalledWith("0");
        });
    });
    it("should not render if items are empty", () => {
        const { container } = render(
            <NotificationItemsList {...mokedProps} items={[]} />,
        );

        expect(container).toMatchSnapshot();
        expect(container).toBeEmptyDOMElement();
    });
});
