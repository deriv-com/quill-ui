import React from "react";
import { render } from "@testing-library/react";
import { Skeleton } from "../..";

describe("SkeletonElement", () => {
    test("renders with default props", () => {
        const { container } = render(<Skeleton.Square />);
        const skeleton = container.querySelector("span");

        expect(skeleton).toHaveClass("quill-loader__skeleton");
        expect(skeleton).toHaveClass("quill-loader__skeleton--animated");
        expect(skeleton).not.toHaveClass("quill-loader__skeleton--rounded");
        expect(skeleton).not.toHaveClass("quill-loader__skeleton--circle");

        expect(skeleton).toHaveClass("quill-loader__skeleton--full-width");
        expect(skeleton).toHaveStyle("height: 50px");
    });

    test("applies fullWidth style correctly", () => {
        const { container } = render(<Skeleton.Square fullWidth />);
        const skeleton = container.querySelector("span");

        expect(skeleton).toHaveClass("quill-loader__skeleton--full-width");
    });

    test("applies custom width, height and className", () => {
        const { container } = render(
            <Skeleton.Square
                width={200}
                height={150}
                className="custom-class"
            />,
        );
        const skeleton = container.querySelector("span");

        expect(skeleton).toHaveStyle("width: 200px");
        expect(skeleton).toHaveClass("quill-loader__skeleton--full-width");
        expect(skeleton).toHaveClass("custom-class");
    });
});
