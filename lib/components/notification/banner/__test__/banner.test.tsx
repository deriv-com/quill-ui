import { render } from "@testing-library/react";
import NotificationBanner from "..";

describe("NotificationBanner", () => {
    it("should have correct classname", () => {
        const { container } = render(<NotificationBanner className="test" />);

        expect(container).toMatchSnapshot();
    });
});
