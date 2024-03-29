import { render, screen } from "@testing-library/react";
import ActionSheet from "..";

describe("<ActionSheet.Header/>", () => {
    it("should render correctly with className and children", () => {
        render(
            <ActionSheet.Header className="px-50">Header</ActionSheet.Header>,
        );
        const headerEl = screen.getByText("Header");
        expect(headerEl).toBeInTheDocument();
        expect(headerEl).toHaveClass("px-50");
    });
});
