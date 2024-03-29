import { screen, render } from "@testing-library/react";
import ActionSheet from "..";

describe("<ActionSheet.Root/>", () => {
    it("should render correctly with default props", async () => {
        render(<ActionSheet.Root>Root</ActionSheet.Root>);
        const root = screen.getByText("Root");
        expect(root).toBeInTheDocument();
    });
});
