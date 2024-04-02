import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropdownButton from "../index";

const mockOptions = [
    { value: "1", label: "Sample Item 1" },
    { value: "2", label: "Sample Item 2" },
    { value: "3", label: "Sample Item 3" },
    { value: "4", label: "Sample Item 4" },
    { value: "5", label: "Sample Item 5" },
];

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
                options={mockOptions}
                defaultOption={mockOptions[0]}
            />,
        );
        const label = screen.getByText("Sample Item 1");
        expect(label).toBeInTheDocument();
    });

    it("should not throw error if onSelectionChange function is not passed", async () => {
        render(
            <DropdownButton
                onSelectionChange={null as unknown as typeof onSelectionChange}
                options={mockOptions}
                defaultOption={mockOptions[0]}
            />,
        );
        const label = screen.getByText("Sample Item 1");
        await userEvent.click(label);
        const item = screen.getByText("Sample Item 3");
        await userEvent.click(item);
        expect(onSelectionChange).not.toHaveBeenCalled();
    });

    it("should handle onSelectionChange event", async () => {
        render(
            <DropdownButton
                onSelectionChange={onSelectionChange}
                options={mockOptions}
                defaultOption={mockOptions[0]}
            />,
        );
        const label = screen.getByText("Sample Item 1");
        await userEvent.click(label);
        const item = screen.getByText("Sample Item 3");
        await userEvent.click(item);
        expect(onSelectionChange).toHaveBeenCalled();
    });
});
