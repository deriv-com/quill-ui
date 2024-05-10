import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ThemeProvider from "../themeProvider";
import ThemeContext from "../themeContext";

describe("ThemeProvider", () => {
    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });
    it("renders with light theme by default", () => {
        render(
            <ThemeProvider>
                <div data-testid="child-element"></div>
            </ThemeProvider>,
        );

        const root = document.documentElement;
        expect(root).toHaveClass("light");
    });
    it("toggles theme when toggleTheme function is called", () => {
        const { getByTestId } = render(
            <ThemeProvider>
                <ThemeContext.Consumer>
                    {({ toggleTheme }) => (
                        <button
                            data-testid="toggle-button"
                            onClick={() => toggleTheme()}
                        />
                    )}
                </ThemeContext.Consumer>
                <div data-testid="child-element" />
            </ThemeProvider>,
        );

        const toggleButton = getByTestId("toggle-button");
        fireEvent.click(toggleButton);

        const root = document.documentElement;
        expect(root).toHaveClass("dark");
    });
    it("renders with provided theme", () => {
        render(
            <ThemeProvider theme="dark">
                <div data-testid="child-element" />
            </ThemeProvider>,
        );

        const root = document.documentElement;
        expect(root).toHaveClass("dark");
    });
    it("changes theme when theme prop changes", () => {
        const { rerender } = render(
            <ThemeProvider theme="dark">
                <div data-testid="child-element" />
            </ThemeProvider>,
        );

        rerender(
            <ThemeProvider theme="light">
                <div data-testid="child-element" />
            </ThemeProvider>,
        );

        const root = document.documentElement;
        expect(root).toHaveClass("light");
    });
});
