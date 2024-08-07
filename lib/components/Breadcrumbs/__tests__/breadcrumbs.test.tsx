import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Breadcrumbs from "../index";
import { BreadcrumbProps } from "../types";
import useBreakpoints from "@hooks/useBreakpoints";

jest.mock("@hooks/useBreakpoints");

const mockUseBreakpoints = useBreakpoints as jest.Mock;

const mockLinks: BreadcrumbProps["links"] = [
    { content: "Home", href: "/" },
    { content: "Category", href: "/category" },
    { content: "Subcategory", href: "/subcategory" },
    { content: "Item", href: "/item" },
];

describe("Breadcrumbs Breadcrumb Component", () => {
    beforeEach(() => {
        mockUseBreakpoints.mockReturnValue({ isMobile: false });
        jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error in tests
        Object.defineProperty(window, "location", {
            value: { href: "", assign: jest.fn() },
            writable: true,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("renders breadcrumb links correctly in desktop view", () => {
        render(<Breadcrumbs links={mockLinks} />);

        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Category")).toBeInTheDocument();
        expect(screen.getByText("Subcategory")).toBeInTheDocument();
        expect(screen.getByText("Item")).toBeInTheDocument();
    });

    test("renders breadcrumb links correctly in mobile view", () => {
        mockUseBreakpoints.mockReturnValue({ isMobile: true });
        render(<Breadcrumbs links={mockLinks} />);

        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("...")).toBeInTheDocument();
        expect(screen.getByText("Subcategory")).toBeInTheDocument();
        expect(screen.getByText("Item")).toBeInTheDocument();
    });

    test("renders dropdown with extra links in mobile view", () => {
        mockUseBreakpoints.mockReturnValue({ isMobile: true });
        render(<Breadcrumbs links={mockLinks} />);

        const dropdown = screen.getByRole("combobox");
        expect(dropdown).toBeInTheDocument();
        fireEvent.change(dropdown, { target: { value: "/category" } });

        expect(dropdown).toHaveValue("/category");
    });
});
