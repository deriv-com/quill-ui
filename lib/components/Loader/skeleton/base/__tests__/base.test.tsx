import React from "react";
import { render } from "@testing-library/react";
import SkeletonElement from "..";

describe("SkeletonElement", () => {
    test("renders with default props", () => {
        const { container } = render(<SkeletonElement />);
        const skeleton = container.querySelector("span");

        expect(skeleton).toHaveClass("quill-loader__skeleton");
        expect(skeleton).toHaveClass("quill-loader__skeleton--animated");
        expect(skeleton).not.toHaveClass("quill-loader__skeleton--rounded");
        expect(skeleton).not.toHaveClass("quill-loader__skeleton--circle");

        expect(skeleton).toHaveStyle("width: 100px");
        expect(skeleton).toHaveStyle("height: 100px");
    });

    test("applies rounded and circle class based on props", () => {
        const { container } = render(
            <SkeletonElement rounded shape="circle" />,
        );
        const skeleton = container.querySelector("span");

        expect(skeleton).toHaveClass("quill-loader__skeleton--rounded");
        expect(skeleton).toHaveClass("quill-loader__skeleton--circle");
    });

    test("applies fullWidth style correctly", () => {
        const { container } = render(<SkeletonElement fullWidth />);
        const skeleton = container.querySelector("span");

        expect(skeleton).toHaveStyle("width: 100%");
    });

    test("applies custom width, height and className", () => {
        const { container } = render(
            <SkeletonElement
                width={200}
                height={150}
                className="custom-class"
            />,
        );
        const skeleton = container.querySelector("span");

        expect(skeleton).toHaveStyle("width: 200px");
        expect(skeleton).toHaveStyle("height: 150px");
        expect(skeleton).toHaveClass("custom-class");
    });
});
