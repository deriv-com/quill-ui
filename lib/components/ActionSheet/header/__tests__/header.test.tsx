import { render, screen } from "@testing-library/react";
import ActionSheet from "../..";
import { StandaloneXmarkRegularIcon } from "@deriv/quill-icons";

describe("<ActionSheet.Header/>", () => {
    it("should render correctly with className", () => {
        render(<ActionSheet.Header title="Title" className="px-50" />);
        const headerEl = screen.getByText("Title");
        expect(headerEl).toBeInTheDocument();
        const header = screen.getByTestId("action-sheet-header");
        expect(header).toBeInTheDocument();
    });

    it("should render correctly with description", () => {
        render(<ActionSheet.Header description="Description" />);
        const headerDesc = screen.getByText("Description");
        expect(headerDesc).toBeInTheDocument();
    });

    it("should render correctly with className", () => {
        render(
            <ActionSheet.Header
                closeIcon={
                    <StandaloneXmarkRegularIcon data-testid="close-icon" />
                }
            />,
        );
        const closeIcon = screen.getByTestId("close-icon");
        expect(closeIcon).toBeInTheDocument();
    });
});
