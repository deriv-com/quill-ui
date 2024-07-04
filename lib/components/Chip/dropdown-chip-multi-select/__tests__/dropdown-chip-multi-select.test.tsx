import React from "react";
import DropdownChipMultiSelect from "..";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockOptions = [
    { value: "1", label: "Sample Item 1" },
    {
        value: "2",
        label: "Sample Item 2",
    },
    { value: "3", label: "Sample Item 3" },
    { value: "4", label: "Sample Item 4" },
    { value: "5", label: "Sample Item 5", disabled: true },
];

describe("Dropdown Chip Multi Select", () => {
    let onSelectionChange = jest.fn();
    afterEach(() => {
        onSelectionChange = jest.fn();
    });
    it("should render label", async () => {
        render(
            <DropdownChipMultiSelect
                size={"sm"}
                onSelectionChange={onSelectionChange}
                options={mockOptions}
                label="Sample Label"
            />,
        );
        const label = screen.getByText("Sample Label");
        expect(label).toBeInTheDocument();
    });

    it("should handle onSelectionChange event", async () => {
        render(
            <DropdownChipMultiSelect
                size={"sm"}
                onSelectionChange={onSelectionChange}
                options={mockOptions}
                label="Sample Label"
            />,
        );
        const label = screen.getByText("Sample Label");
        await act(async () => {
            await userEvent.click(label);
        });
        const item = screen.getByText("Sample Item 3");
        await act(async () => {
            await userEvent.click(item);
        });
        expect(onSelectionChange).toHaveBeenCalled();
    });

    it("should not handle onSelectionChange if item is disabled", async () => {
        render(
            <DropdownChipMultiSelect
                size={"sm"}
                onSelectionChange={onSelectionChange}
                options={mockOptions}
                label="Sample Label"
            />,
        );
        const label = screen.getByText("Sample Label");
        await act(async () => {
            await userEvent.click(label);
        });
        const item = screen.getByText("Sample Item 5");
        await act(async () => {
            await userEvent.click(item);
        });
        expect(onSelectionChange).not.toHaveBeenCalled();
    });

    it("should not throw error if onSelectionChange function is not passed", async () => {
        render(
            <DropdownChipMultiSelect
                size={"sm"}
                onSelectionChange={null as unknown as typeof onSelectionChange}
                options={mockOptions}
                label="Sample Label"
            />,
        );
        const label = screen.getByText("Sample Label");
        await act(async () => {
            await userEvent.click(label);
        });
        const item = screen.getByText("Sample Item 3");
        await act(async () => {
            await userEvent.click(item);
        });
        expect(onSelectionChange).not.toHaveBeenCalled();
    });

    it("should handle multiple items selection", async () => {
        render(
            <DropdownChipMultiSelect
                size={"sm"}
                onSelectionChange={onSelectionChange}
                options={mockOptions}
                label="Sample Label"
            />,
        );
        const label = screen.getByText("Sample Label");
        await act(async () => {
            await userEvent.click(label);
        });
        const item1 = screen.getByText("Sample Item 2");
        await act(async () => {
            await userEvent.click(item1);
        });
        const item2 = screen.getByText("Sample Item 3");
        await act(async () => {
            await userEvent.click(item2);
        });
        expect(onSelectionChange).toHaveBeenCalledWith([
            mockOptions[1],
            mockOptions[2],
        ]);
    });
});
