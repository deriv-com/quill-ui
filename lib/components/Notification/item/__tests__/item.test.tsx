import { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import NotificationItem from "..";
import userEvent from "@testing-library/user-event";
import { STATUS, TYPE } from "@utils/notification-utils";

describe("NotificationItem", () => {
    const customIcon = "Custom icon";
    const testMessage = "Test message";
    const testTitle = "Test title";
    const timestamp = new Date("2024-04-23T09:24:00").getTime();
    const mokedProps: ComponentProps<typeof NotificationItem> = {
        className: "test",
        message: testMessage,
        onClose: jest.fn(),
        onClick: jest.fn(),
        onMarkAsRead: jest.fn(),
        redirectTo: "https://www.example.com",
        status: STATUS.UNREAD,
        timestamp,
        title: testTitle,
    };
    it("should display correct content", () => {
        const { container } = render(<NotificationItem {...mokedProps} />);

        expect(container).toMatchSnapshot();
        expect(screen.getByText(testTitle)).toBeInTheDocument();
        expect(screen.getByText(testMessage)).toBeInTheDocument();
        expect(screen.getByLabelText("date-time")).toBeInTheDocument();
        expect(
            screen.queryByRole("button", { name: "close" }),
        ).not.toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "mark-as-read" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "delete" }),
        ).toBeInTheDocument();
    });
    it("should display correct notification with a custom icon", () => {
        const { container } = render(
            <NotificationItem
                {...mokedProps}
                icon={<div>{customIcon}</div>}
                iconBackgroundColor="#000000"
            />,
        );

        expect(container).toMatchSnapshot();
        expect(screen.getByText(customIcon)).toBeInTheDocument();
    });
    it("should render notification correctly based on the notification type", () => {
        const { container } = render(
            <NotificationItem {...mokedProps} type={TYPE.SUCCESS} />,
        );

        expect(container).toMatchSnapshot();
    });
    it("should render notification correctly when status is 'read'", () => {
        const { container } = render(
            <NotificationItem {...mokedProps} status={STATUS.READ} />,
        );

        expect(container).toMatchSnapshot();
    });
    it("should render correctly for mobile", () => {
        const { container } = render(
            <NotificationItem {...mokedProps} isMobile />,
        );

        expect(container).toMatchSnapshot();
    });
    it("should call onClick after notification is clicked", async () => {
        render(<NotificationItem {...mokedProps} />);

        const notification = screen.getByText(testMessage);
        await userEvent.click(notification);

        expect(mokedProps.onClick).toHaveBeenCalled();
    });
    it("should call onMarkAsRead after mark-as-read button is clicked", async () => {
        render(<NotificationItem {...mokedProps} />);

        const markAsReadButton = screen.getByRole("button", {
            name: "mark-as-read",
        });
        await userEvent.click(markAsReadButton);

        expect(mokedProps.onMarkAsRead).toHaveBeenCalled();
    });
    it("should call onClose after delete button is clicked", async () => {
        render(<NotificationItem {...mokedProps} />);

        const deleteButton = screen.getByRole("button", { name: "delete" });
        await userEvent.click(deleteButton);

        expect(mokedProps.onClose).toHaveBeenCalled();
    });
});
