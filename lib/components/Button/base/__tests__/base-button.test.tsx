import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LabelPairedPlaceholderMdRegularIcon } from "@deriv/quill-icons/LabelPaired";
import { Button } from "../../index";
import { ButtonProps } from "../../index";

const BasicButtonVariants: ButtonProps["variant"][] = [
    "primary",
    "secondary",
    "tertiary",
];
describe("Button component", () => {
    it("renders button text correctly", () => {
        render(<Button>Label</Button>);
        const buttonText = screen.getByText("Label");
        expect(buttonText).toBeInTheDocument();
    });

    it("Should handle onClick", async () => {
        const mockOnClick = jest.fn();
        const { getByRole } = render(
            <Button onClick={mockOnClick}>Label</Button>,
        );
        const button = getByRole("button");
        await userEvent.click(button);
        expect(mockOnClick).toHaveBeenCalled();
    });

    it("Should render BasicButton with Icon", () => {
        const { container } = render(
            <Button icon={<LabelPairedPlaceholderMdRegularIcon />}>
                Label
            </Button>,
        );
        expect(container).toMatchSnapshot();
    });

    BasicButtonVariants.forEach((variant) => {
        it(`Should render BasicButton with variant=${variant}`, () => {
            const { container } = render(
                <Button variant={variant}>Label</Button>,
            );
            expect(container).toMatchSnapshot();
        });
    });
});
