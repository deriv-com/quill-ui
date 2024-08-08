import React from "react";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "../..";

describe("Skeleton Container", () => {
    test("Render with default props", async () => {
        const { container } = render(
            <Skeleton.Container>
                <Skeleton.Circle />
                <Skeleton.Square />
            </Skeleton.Container>,
        );

        const skeletonContainer = container.querySelector("div");
        const circle = screen.getByTestId("circle-skeleton");
        const square = screen.getByTestId("square-skeleton");

        expect(skeletonContainer).toHaveStyle("gap: 10px");
        expect(circle).toBeInTheDocument();
        expect(square).toBeInTheDocument();
        expect(circle).toHaveStyle("width: 100px");
        expect(square).toHaveStyle("height: 100%");
    });

    test("Render with props with height and gap", async () => {
        const { container } = render(
            <Skeleton.Container skeletonHeight={20} gap={50}>
                <Skeleton.Circle />
                <Skeleton.Square />
            </Skeleton.Container>,
        );

        const skeletonContainer = container.querySelector("div");
        const circle = screen.getByTestId("circle-skeleton");
        const square = screen.getByTestId("square-skeleton");

        expect(skeletonContainer).toHaveStyle("gap: 50px");
        expect(circle).toHaveStyle("height: 100px");
        expect(square).toHaveStyle("height: 20px");
    });

    test("Render with props with width", async () => {
        const { container } = render(
            <Skeleton.Container skeletonWidth={20}>
                <Skeleton.Circle />
                <Skeleton.Square />
            </Skeleton.Container>,
        );

        const skeletonContainer = container.querySelector("div");
        const circle = screen.getByTestId("circle-skeleton");
        const square = screen.getByTestId("square-skeleton");

        expect(skeletonContainer).toHaveStyle("gap: 10px");
        expect(circle).toHaveStyle("width: 20px; height: 20px");
        expect(square).toHaveStyle("height: 100%; width: 20px");
    });

    test("Render with props with rounded", async () => {
        const { container } = render(
            <Skeleton.Container rounded>
                <Skeleton.Circle />
                <Skeleton.Square />
            </Skeleton.Container>,
        );

        const skeletonContainer = container.querySelector("div");
        const square = screen.getByTestId("square-skeleton");

        expect(skeletonContainer).toHaveStyle("gap: 10px");
        expect(square).toHaveClass("quill-loader__skeleton--rounded");
    });
});
