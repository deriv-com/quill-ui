import React from "react";
import { render } from "@testing-library/react";
import SkeletonElement from "..";

describe("SkeletonElement", () => {
    test("renders correctly", () => {
        const { container } = render(<SkeletonElement />);
        expect(container.firstChild).toHaveClass("quill-loader__skeleton");
    });

    test("applies active class when active is true", () => {
        const { container } = render(<SkeletonElement active={true} />);
        expect(container.firstChild).toHaveClass(
            "quill-loader__skeleton--animated",
        );
    });

    test("does not apply active class when active is false", () => {
        const { container } = render(<SkeletonElement active={false} />);
        expect(container.firstChild).not.toHaveClass(
            "quill-loader__skeleton--animated",
        );
    });

    test("applies additional class names", () => {
        const { container } = render(
            <SkeletonElement className="additional-class" />,
        );
        expect(container.firstChild).toHaveClass("additional-class");
    });

    test("applies additional styles", () => {
        const style = { backgroundColor: "red" };
        const { container } = render(<SkeletonElement style={style} />);
        expect(container.firstChild).toHaveStyle("background-color: red");
    });
});
