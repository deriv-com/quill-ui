import userEvent from "@testing-library/user-event";
import { LabelPairedAndroidSmIcon } from "@deriv/quill-icons/LabelPaired";
import { render, screen } from "@testing-library/react";
import Chip from "..";
import { TRegularSizes } from "@types";

describe("Selectable Chip", () => {
    it("should handle onClick event", async () => {
        const onClickButton = jest.fn();
        render(
            <Chip size={"sm"} onChipSelect={onClickButton}>
                Selectable Chip
            </Chip>,
        );
        const button = screen.getByRole("button", { name: /Selectable Chip/i });
        await userEvent.click(button);
        expect(onClickButton).toHaveBeenCalled();
    });

    it("should not handle onClick event when it is disabled", async () => {
        const onClickButton = jest.fn();
        render(
            <Chip size={"sm"} disabled>
                Selectable Chip
            </Chip>,
        );
        const button = screen.getByRole("button", { name: /Selectable Chip/i });
        await userEvent.click(button);
        expect(button).toBeDisabled();
        expect(onClickButton).not.toHaveBeenCalled();
    });

    it("should toggle selected state on clicking the chip", async () => {
        render(<Chip size={"sm"}>Selectable Chip</Chip>);
        const button = screen.getByRole("button", { name: /Selectable Chip/i });
        await userEvent.click(button);
        expect(button).toHaveAttribute("data-state", "selected");
        await userEvent.click(button);
        expect(button).toHaveAttribute("data-state", "");
    });

    it("should disabled when it is disabled", () => {
        render(
            <Chip size={"sm"} disabled>
                Selectable Chip
            </Chip>,
        );
        const button = screen.getByRole("button", { name: /Selectable Chip/i });
        expect(button).toHaveAttribute("disabled");
    });

    it("should render correct labelTag", () => {
        render(
            <Chip size={"sm"} labelTag="labelTag">
                Selectable Chip
            </Chip>,
        );
        const labelTag = screen.getByText("labelTag");
        expect(labelTag).toBeInTheDocument();
    });

    it("should render icon properly", () => {
        render(
            <Chip icon={LabelPairedAndroidSmIcon} size={"sm"}>
                Selectable Chip
            </Chip>,
        );
        const icon = screen.getByRole("img", { name: "" });
        expect(icon).toBeInTheDocument();
    });

    it("should handle onChipSelect for selectable chip", async () => {
        const onSelect = jest.fn();
        render(
            <Chip size={"sm"} onChipSelect={onSelect}>
                Selectable Chip
            </Chip>,
        );
        const button = screen.getByText("Selectable Chip");
        await userEvent.click(button);
        expect(onSelect).toHaveBeenCalled();
    });

    it("should handle onDismiss for dissmissible chip", async () => {
        const onDismiss = jest.fn();
        render(
            <Chip size={"sm"} dismissible onDismiss={onDismiss}>
                Selectable Chip
            </Chip>,
        );
        const button = screen.getByTestId("dt-chip-dismissible-btn");
        await userEvent.click(button);
        expect(onDismiss).toHaveBeenCalled();
    });

    it("should not toggle data-state if chip is dismissible", async () => {
        render(
            <Chip size={"sm"} dismissible>
                Selectable Chip
            </Chip>,
        );
        const dismissButton = screen.getByTestId("dt-chip-dismissible-btn");
        const chipButton = screen.getByRole("button", {
            name: /Selectable Chip/i,
        });
        await userEvent.click(dismissButton);
        expect(chipButton).toHaveAttribute("data-state", "");
    });

    const sizes: TRegularSizes[] = ["sm", "md", "lg"];
    sizes.forEach((size) => {
        it(`should render correctly with ${size} size`, () => {
            render(<Chip size={size}>{`Chip - ${size}`}</Chip>);
            const button = screen.getByRole("button", {
                name: `Chip - ${size}`,
            });
            expect(button).toMatchSnapshot();
        });
    });
});
