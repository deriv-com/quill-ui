import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import InputDropdown from "../index";

// Mock options for dropdown
const options = [
    { value: "1", text: "Option 1" },
    { value: "2", text: "Option 2" },
    { value: "3", text: "Option 3" },
];

describe("InputDropdown component", () => {
    it("renders dropdown with options", () => {
        const dropdownProps = {
            options: options,
            onSelectOption: (value: string) => {
                return value;
            },
        };
        render(<InputDropdown {...dropdownProps} />);
        act(() => {
            fireEvent.click(screen.getByTestId("dropdown-input"));
        });

        options.forEach((option) => {
            expect(screen.getByText(option.text)).toBeInTheDocument();
        });
    });

    it("selects an option from dropdown", () => {
        const dropdownProps = {
            options: options,
            onSelectOption: (value: string) => {
                return value;
            },
        };
        render(<InputDropdown {...dropdownProps} />);
        act(() => {
            fireEvent.click(screen.getByTestId("dropdown-input"));
        });
        act(() => {
            fireEvent.click(screen.getByText(options[0].text));
        });

        expect(screen.getByTestId("dropdown-input")).toHaveValue(
            options[0].text,
        );
    });

    it("closes dropdown on selection", () => {
        const dropdownProps = {
            options: options,
            onSelectOption: (value: string) => {
                return value;
            },
        };
        render(<InputDropdown {...dropdownProps} />);

        act(() => {
            fireEvent.click(screen.getByTestId("dropdown-input"));
        });
        act(() => {
            fireEvent.click(screen.getByText(options[0].text));
        });

        expect(screen.queryByText(options[0].text)).not.toBeInTheDocument();
    });
    it("should render a TextField with success status", () => {
        const dropdownProps = {
            options: options,
            onSelectOption: (value: string) => {
                return value;
            },
        };
        const { container } = render(
            <InputDropdown {...dropdownProps} status="success" />,
        );
        expect(container).toMatchSnapshot();
    });

    it("should render a TextField with error status", () => {
        const dropdownProps = {
            options: options,
            onSelectOption: (value: string) => {
                return value;
            },
        };
        const { container } = render(
            <InputDropdown {...dropdownProps} status="error" />,
        );
        expect(container).toMatchSnapshot();
    });
});
