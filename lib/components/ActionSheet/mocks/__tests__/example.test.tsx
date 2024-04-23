import { render } from "@testing-library/react";
import {
    ActionSheetExample,
    ActionSheetExampleWithIconTrigger,
    ActionSheetExampleControlled,
} from "../example";

describe("Action sheet example", () => {
    it("Should render action sheet", () => {
        const { container } = render(<ActionSheetExample />);
        expect(container).toMatchSnapshot();
    });
});

describe("Action sheet example with icon trigger", () => {
    it("Should render action sheet", () => {
        const { container } = render(<ActionSheetExampleWithIconTrigger />);
        expect(container).toMatchSnapshot();
    });
});

describe("Action sheet example controlled", () => {
    it("Should render action sheet", () => {
        const { container } = render(<ActionSheetExampleControlled />);
        expect(container).toMatchSnapshot();
    });
});
