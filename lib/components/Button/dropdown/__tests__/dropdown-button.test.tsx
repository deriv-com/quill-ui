import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropdownButton from "../index";

const generateItems = (length: number, onClick?: boolean) =>
    Array.from({ length }, (_, index) => ({
        id: index + 1,
        value: (index + 1).toString(),
        label: `Sample Item ${index + 1}`,
        onClick: () => onClick && alert(`Item ${index + 1}`),
    }));

describe("DropdownButton component", () => {
    let onSelectionChange = jest.fn();
    afterEach(() => {
        onSelectionChange = jest.fn();
    });
    it("should render default value as the label", async () => {
        render(
            <DropdownButton
                size="md"
                onSelectionChange={onSelectionChange}
                options={generateItems(4)}
            />,
        );
        const label = screen.getByText("Sample Item 1");
        expect(label).toBeInTheDocument();
    });

    it("should not throw error if onSelectionChange function is not passed", async () => {
        render(
            <DropdownButton
                onSelectionChange={null as unknown as typeof onSelectionChange}
                options={generateItems(4)}
            />,
        );
        const label = screen.getByText("Sample Item 1");
        await act(async () => {
            await userEvent.click(label);
        });
        const item = screen.getByText("Sample Item 3");
        await act(async () => {
            await userEvent.click(item);
        });
        expect(onSelectionChange).not.toHaveBeenCalled();
    });

    it("should handle onSelectionChange event", async () => {
        render(
            <DropdownButton
                onSelectionChange={onSelectionChange}
                options={generateItems(4)}
            />,
        );
        const label = screen.getByText("Sample Item 1");
        await act(async () => {
            await userEvent.click(label);
        });
        const item = screen.getByText("Sample Item 3");
        await act(async () => {
            await userEvent.click(item);
        });
        expect(onSelectionChange).toHaveBeenCalled();
    });
});
