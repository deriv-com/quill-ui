import React from "react";
import { render } from "@testing-library/react";
import Input from "..";

describe("Input", () => {
    it("should render a default Input", () => {
        const { container } = render(<Input />);
        expect(container).toMatchSnapshot();
    });

    it("should render an Input with a label", () => {
        const { container } = render(<Input label="UserName" />);
        expect(container).toMatchSnapshot();
    });

    it("should render an Input with centered text", () => {
        const { container } = render(<Input textAlignment="center" />);
        expect(container).toMatchSnapshot();
    });

    it("should render an Input with status messages", () => {
        const { container } = render(
            <Input message="Message goes here" charactorCounter />,
        );
        expect(container).toMatchSnapshot();
    });

    it("should render an Input with a variant of outline", () => {
        const { container } = render(<Input variant="outline" />);
        expect(container).toMatchSnapshot();
    });

    it("should render a disabled Input with a variant of fill", () => {
        const { container } = render(<Input disabled variant="fill" />);
        expect(container).toMatchSnapshot();
    });

    it("should render a Input with field marker", () => {
        const { container } = render(
            <Input label="label" fieldMarker={true} variant="fill" />,
        );
        expect(container).toMatchSnapshot();
    });
});
