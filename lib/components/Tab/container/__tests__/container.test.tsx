import { render, screen } from "@testing-library/react";
import Tab from "@components/Tab";

describe("<Tab.Container/>", () => {
    it("should render correctly", () => {
        render(<Tab.Container id="tab">Container</Tab.Container>);
        const container = screen.getByText("Container");
        expect(container).toBeInTheDocument();
    });
});
