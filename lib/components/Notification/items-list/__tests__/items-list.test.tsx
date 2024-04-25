import { render } from "@testing-library/react";
import NotificationItemsList from "..";

describe("NotificationItemsList", () => {
    it("should render correct banners", () => {
        const { container } = render(<NotificationItemsList items={[]} />);

        expect(container).toMatchSnapshot();
    });
});
