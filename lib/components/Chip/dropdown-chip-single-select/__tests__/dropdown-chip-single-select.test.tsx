import React from "react";
import { act, render, screen } from "@testing-library/react";
import DropdownChipSingleSelect from "..";
import userEvent from "@testing-library/user-event";

const mockOptions = [
    { value: "1", label: "Sample Item 1" },
    {
        value: "2",
        label: "Sample Item 2 - which is disabled",
        disabled: true,
    },
    { value: "3", label: "Sample Item 3" },
    { value: "4", label: "Sample Item 4" },
    { value: "5", label: "Sample Item 5" },
];

describe("Dropdown Chip Single Select", () => {
    let onSelectionChange = jest.fn();
    afterEach(() => {
        onSelectionChange = jest.fn();
    });
    it("should render default value as the label", async () => {
        render(
            <DropdownChipSingleSelect
                size={"sm"}
                onSelectionChange={onSelectionChange}
                options={mockOptions}
                defaultOption={mockOptions[0]}
            />,
        );
        const label = screen.getByText("Sample Item 1");
        expect(label).toBeInTheDocument();
    });

    it("should not throw error if onSelectionChange function is not passed", async () => {
        render(
            <DropdownChipSingleSelect
                size={"sm"}
                onSelectionChange={null as unknown as typeof onSelectionChange}
                options={mockOptions}
                defaultOption={mockOptions[0]}
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
            <DropdownChipSingleSelect
                size={"sm"}
                onSelectionChange={onSelectionChange}
                options={mockOptions}
                defaultOption={mockOptions[0]}
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
