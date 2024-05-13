import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import InputDropdown, { DropdownOptionProps } from "../index";

// Mock options for dropdown
const options = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
];

describe("InputDropdown component", () => {
    it("renders dropdown with options", () => {
        const dropdownProps: DropdownOptionProps = {
            options: options,
        };
        render(<InputDropdown {...dropdownProps} />);
        fireEvent.click(screen.getByTestId("dropdown-input"));

        options.forEach((option) => {
            expect(screen.getByText(option.name)).toBeInTheDocument();
        });
    });

    it("selects an option from dropdown", () => {
        const dropdownProps: DropdownOptionProps = {
            options: options,
        };
        render(<InputDropdown {...dropdownProps} />);

        fireEvent.click(screen.getByTestId("dropdown-input"));

        fireEvent.click(screen.getByText(options[0].name));

        expect(screen.getByTestId("dropdown-input")).toHaveValue(
            options[0].name,
        );
    });

    it("closes dropdown on selection", () => {
        const dropdownProps: DropdownOptionProps = {
            options: options,
        };
        render(<InputDropdown {...dropdownProps} />);

        fireEvent.click(screen.getByTestId("dropdown-input"));

        fireEvent.click(screen.getByText(options[0].name));

        expect(screen.queryByText(options[0].name)).not.toBeInTheDocument();
    });
    it("should render a TextField with success status", () => {
        const dropdownProps: DropdownOptionProps = {
            options: options,
        };
        const { container } = render(
            <InputDropdown {...dropdownProps} status="success" />,
        );
        expect(container).toMatchSnapshot();
    });

    it("should render a TextField with error status", () => {
        const dropdownProps: DropdownOptionProps = {
            options: options,
        };
        const { container } = render(
            <InputDropdown {...dropdownProps} status="error" />,
        );
        expect(container).toMatchSnapshot();
    });
});
