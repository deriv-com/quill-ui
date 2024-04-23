import { render, screen } from "@testing-library/react";
import NotificationItem from "..";

describe("NotificationBanner", () => {
    it("should display correct content", () => {
        render(<NotificationItem message="Test message" />);

        expect(screen.getByText(/Test message/)).toBeInTheDocument();
    });
    it("should have correct title", () => {
        const { container } = render(<NotificationItem title="Test title" />);

        expect(container).toMatchSnapshot();
    });
    it("should apply correct classname", () => {
        const { container } = render(<NotificationItem className="test" />);

        expect(container).toMatchSnapshot();
    });
    it("should render correctly for mobile - without close button", () => {
        const { container } = render(<NotificationItem isMobile />);

        expect(container).toMatchSnapshot();
    });
    it("should render correct icon based on the notification type", () => {
        const { container } = render(<NotificationItem type="warning" />);

        expect(container).toMatchSnapshot();
    });
});
