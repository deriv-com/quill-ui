import { render, screen } from "@testing-library/react";
import Tab from "../../index";

describe("<Tab.Panel/>", () => {
    it("should render correctly", () => {
        render(<Tab.Panel>Panel</Tab.Panel>);
        const panel = screen.getByText("Panel");
        expect(panel).toBeInTheDocument();
    });

    it("should render correctly with props", () => {
        render(<Tab.Panel className="px-500">Panel</Tab.Panel>);
        const panel = screen.getByText("Panel");
        expect(panel).toHaveClass("px-500");
    });
});
