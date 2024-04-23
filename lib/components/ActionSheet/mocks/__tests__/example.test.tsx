import { render } from "@testing-library/react";
import { ActionSheetExample } from "../example";

describe("Action sheet example", () => {
    it("Should render action sheet", () => {
        const { container } = render(<ActionSheetExample />);
        expect(container).toMatchSnapshot();
    });
});
