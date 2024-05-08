import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import DismissibleChip from "..";

describe("Dismissible Chip", () => {
    it("should handle onDismiss event", async () => {
        const onClickButton = jest.fn();
        render(
            <DismissibleChip size={"sm"} onDismiss={onClickButton}>
                Selectable Chip
            </DismissibleChip>,
        );
        const button = screen.getByTestId("dt-chip-dismissible-btn");
        await userEvent.click(button);
        expect(onClickButton).toHaveBeenCalled();
    });
});
