import { render } from "@testing-library/react";
import NotificationBanners from "..";

describe("NotificationBanners", () => {
    it("should render correct banners", () => {
        const { container } = render(<NotificationBanners banners={[]} />);

        expect(container).toMatchSnapshot();
    });
});
