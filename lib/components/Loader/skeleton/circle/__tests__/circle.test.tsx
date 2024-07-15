import React from "react";
import { render } from "@testing-library/react";
import { Skeleton } from "../..";

describe("SkeletonElement", () => {
    test("renders with default props", () => {
        const { container } = render(<Skeleton.Circle />);
        const skeleton = container.querySelector("span");

        expect(skeleton).toHaveClass("quill-loader__skeleton");
        expect(skeleton).toHaveClass("quill-loader__skeleton--animated");
        expect(skeleton).toHaveClass("quill-loader__skeleton--circle");
        expect(skeleton).not.toHaveClass("quill-loader__skeleton--rounded");

        expect(skeleton).toHaveStyle("width: 100px");
        expect(skeleton).toHaveStyle("height: 100px");
    });

    test("applies custom width, height and className", () => {
        const { container } = render(
            <Skeleton.Circle width={200} className="custom-class" />,
        );
        const skeleton = container.querySelector("span");

        expect(skeleton).toHaveStyle("width: 200px");
        expect(skeleton).toHaveStyle("height: 200px");
        expect(skeleton).toHaveClass("custom-class");
    });
});
