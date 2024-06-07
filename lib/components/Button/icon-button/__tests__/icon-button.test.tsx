import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LabelPairedPlaceholderMdRegularIcon } from "@deriv/quill-icons/LabelPaired";
import { IconButton, ButtonProps } from "../..";

const BasicButtonVariants: ButtonProps["variant"][] = [
    "primary",
    "secondary",
    "tertiary",
];
describe("Button component", () => {
    it("Should render IconButton correctly", () => {
        const { container } = render(
            <IconButton icon={<LabelPairedPlaceholderMdRegularIcon />}>
                Label
            </IconButton>,
        );
        expect(container).toMatchSnapshot();
    });

    it("should display loader if isLoading is true", () => {
        render(
            <IconButton
                isLoading
                icon={<LabelPairedPlaceholderMdRegularIcon />}
            />,
        );
        const loader = screen.getByTestId("button-loader");
        expect(loader).toBeInTheDocument();
    });

    it("Should handle onClick", async () => {
        const mockOnClick = jest.fn();
        const { getByRole } = render(
            <IconButton
                onClick={mockOnClick}
                icon={<LabelPairedPlaceholderMdRegularIcon />}
            />,
        );
        const button = getByRole("button");
        await userEvent.click(button);
        expect(mockOnClick).toHaveBeenCalled();
    });

    BasicButtonVariants.forEach((variant) => {
        it(`Should render IconButton with variant=${variant}`, () => {
            const { container } = render(
                <IconButton
                    variant={variant}
                    icon={<LabelPairedPlaceholderMdRegularIcon />}
                />,
            );
            expect(container).toMatchSnapshot();
        });
    });
});
