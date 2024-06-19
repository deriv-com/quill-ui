import React from "react";
import { render } from "@testing-library/react";
import PasswordStrengthValidation from "../index";

describe("Password Strength Validation component", () => {
    const validationMessages = [
        "Minimum 8 characters",
        "At least 1 uppercase letter",
        "At least 1 lowercase letter",
        "At least 1 number",
        "At least 1 special character",
    ];
    it("renders correctly when status is neutral", () => {
        const status = "neutral";

        const { getByText } = render(
            <PasswordStrengthValidation
                status={status}
                validationMessage={validationMessages[0]}
            />,
        );
        const renderValidationMsg = getByText(validationMessages[0]);
        expect(renderValidationMsg).toBeInTheDocument();
    });
    it("renders correctly when status is error", () => {
        const status = "error";

        const { getByText } = render(
            <PasswordStrengthValidation
                status={status}
                validationMessage={validationMessages[0]}
            />,
        );
        const renderValidationMsg = getByText(validationMessages[0]);
        expect(renderValidationMsg).toBeInTheDocument();
    });
    it("renders correctly when status is success", () => {
        const status = "success";

        const { getByText } = render(
            <PasswordStrengthValidation
                status={status}
                validationMessage={validationMessages[0]}
            />,
        );
        const renderValidationMsg = getByText(validationMessages[0]);
        expect(renderValidationMsg).toBeInTheDocument();
    });
});
