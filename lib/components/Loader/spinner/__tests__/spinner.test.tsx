// Spinner.test.js
import React from "react";
import { render } from "@testing-library/react"; // for the additional matchers
import { Spinner } from "..";
import { TRegularSizesWithExtraSmallandExtraLarge } from "@types";

jest.mock("@deriv/quill-icons", () => ({
    StandaloneLoaderRegularIcon: jest.fn(({ className, iconSize }) => (
        <div
            className={className}
            data-icon-size={iconSize}
            data-testid="spinner-element"
        />
    )),
}));

const sizes: TRegularSizesWithExtraSmallandExtraLarge[] = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
];

describe("Spinner", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders with default size", () => {
        const { getByTestId } = render(<Spinner />);
        const spinner = getByTestId("spinner-element");

        expect(spinner).toHaveClass("quill-loader__spinner");
        expect(spinner).toHaveAttribute("data-icon-size", "md");
    });

    sizes.forEach((size) => {
        test(`renders correctly with size ${size}`, () => {
            const { getByTestId } = render(<Spinner size={size} />);
            const spinner = getByTestId("spinner-element");

            expect(spinner).toHaveClass("quill-loader__spinner");
            expect(spinner).toHaveAttribute("data-icon-size", size);
        });
    });
});
