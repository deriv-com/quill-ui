import { render, screen } from "@testing-library/react";
import Tab from "@components/Tab";

describe("<Tab.List/>", () => {
    it("should render correctly", () => {
        render(<Tab.List>List</Tab.List>);
        const list = screen.getByText("List");
        expect(list).toBeInTheDocument();
    });
});
