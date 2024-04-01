import { render, screen } from "@testing-library/react";
import NotificationBanner from "..";

describe("NotificationBanner", () => {
    it("should display correct content", () => {
        render(<NotificationBanner message="Test message" />);

        expect(screen.getByText(/Test message/)).toBeInTheDocument();
    });
    it("should have correct title", () => {
        const { container } = render(<NotificationBanner title="Test title" />);

        expect(container).toMatchSnapshot();
    });
    it("should apply correct classname", () => {
        const { container } = render(<NotificationBanner className="test" />);

        expect(container).toMatchSnapshot();
    });
    it("should render correctly for mobile - without close button", () => {
        const { container } = render(<NotificationBanner isMobile />);

        expect(container).toMatchSnapshot();
    });
    it("should render correct icon", () => {
        const { container } = render(<NotificationBanner icon="warning" />);

        expect(container).toMatchSnapshot();
    });
});
