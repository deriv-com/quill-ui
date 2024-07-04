import React from "react";
import { render } from "@testing-library/react";
import { Divider } from "..";

describe("Divider", () => {
    it("renders the divider with the correct class name", () => {
        const { container } = render(<Divider />);
        const divider = container.firstChild;

        expect(divider).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
