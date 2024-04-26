import { render, screen } from "@testing-library/react";
import Badge from "../base";
import { TRegularSizes } from "@types";
import { TBadgeColorVariants } from "../types";

describe("<Badge.Empty/>", () => {
    it("should render badge component correctly", () => {
        render(<Badge aria-label="Status Badge" variant="status" />);
        const badge = screen.getByLabelText("Status Badge");
        expect(badge).toBeInTheDocument();
    });

    it("should render variant correctly", () => {
        const statusVariant = "status";
        render(
            <Badge aria-label={`${statusVariant}`} variant={statusVariant} />,
        );
        const statusBadge = screen.getByLabelText(statusVariant);
        expect(statusBadge).toBeInTheDocument();
    });

    const sizes: TRegularSizes[] = ["sm", "md", "lg"];
    sizes.forEach((size) => {
        it(`should render badge correctly with size ${size}`, () => {
            render(
                <Badge
                    size={size}
                    aria-label={`${size} Badge`}
                    variant="status"
                />,
            );
            const badge = screen.getByLabelText(`${size} Badge`);
            expect(badge).toMatchSnapshot();
        });
    });

    const colors: TBadgeColorVariants[] = ["danger", "success", "warning"];
    colors.forEach((color) => {
        it(`should render badge correctly with color ${color}`, () => {
            render(
                <Badge
                    color={color}
                    aria-label={`${color} Badge`}
                    variant="notification"
                />,
            );
            const badge = screen.getByLabelText(`${color} Badge`);
            expect(badge).toMatchSnapshot();
        });
    });
});
