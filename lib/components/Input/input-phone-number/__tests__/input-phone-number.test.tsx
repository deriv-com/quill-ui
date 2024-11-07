import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InputPhoneNumber, { InputPhoneNumberProps } from "../index";

const mockCountryCodes = [
    { short_code: "US", name: "USA", phone_code: "+1" },
    { short_code: "GB", name: "GB", phone_code: "+44" },
    { short_code: "IN", name: "IN", phone_code: "+91" },
];

describe("InputPhoneNumber Component", () => {
    let defaultProps: InputPhoneNumberProps;

    beforeEach(() => {
        defaultProps = {
            countryCodes: mockCountryCodes,
            onCodeChange: jest.fn(),
            onValueChange: jest.fn(),
        };
    });

    it("should match the snapshot", () => {
        const { asFragment } = render(<InputPhoneNumber {...defaultProps} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should call onValueChange when input value changes", () => {
        const { getByRole } = render(<InputPhoneNumber {...defaultProps} />);
        const input = getByRole("textbox");

        fireEvent.change(input, { target: { value: "1234567890" } });
        expect(defaultProps.onValueChange).toHaveBeenCalledWith("+11234567890");
    });

    it("should call onCodeChange when country code is changed", () => {
        const { getByText } = render(
            <InputPhoneNumber
                {...defaultProps}
                shortCode="US"
                codeLabel="Code"
            />,
        );
        const dropdownButton = getByText("Code");

        fireEvent.click(dropdownButton);
        const dropdownOption = getByText("GB (+44)");
        fireEvent.click(dropdownOption);

        expect(defaultProps.onCodeChange).toHaveBeenCalledWith(
            mockCountryCodes[1],
        );
    });

    it("should update phone code and input value state", () => {
        const { getByText, getByRole } = render(
            <InputPhoneNumber
                {...defaultProps}
                shortCode="US"
                codeLabel="Code"
            />,
        );
        const input = getByRole("textbox");
        const dropdownButton = getByText("Code");

        fireEvent.click(dropdownButton);
        fireEvent.click(getByText(/91/i));
        expect(defaultProps.onCodeChange).toHaveBeenCalledWith(
            mockCountryCodes[2],
        );

        fireEvent.change(input, { target: { value: "9876543210" } });
        expect(defaultProps.onValueChange).toHaveBeenCalledWith(
            "+919876543210",
        );
    });

    it("should render custom props correctly", () => {
        const { getByRole } = render(
            <InputPhoneNumber
                inputSize="sm"
                {...defaultProps}
                status="error"
                placeholder="Enter your phone number"
            />,
        );
        const input = getByRole("textbox");
        expect(input).toBeInTheDocument();
    });
});
