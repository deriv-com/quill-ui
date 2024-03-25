import { render } from "@testing-library/react";
import SingleChoice from "..";

describe("SingleChoice", () => {
    it("Should render SingleChoice Group With Icons Only", () => {
        const { container } = render(<SingleChoice.GroupWithIconsOnly />);
        expect(container).toMatchSnapshot();
    });
    it("Should render SingleChoice Group With Labels Only", () => {
        const { container } = render(<SingleChoice.GroupWithLabelsOnly />);
        expect(container).toMatchSnapshot();
    });
    it("Should render SingleChoice Group With Icons and Labels", () => {
        const { container } = render(<SingleChoice.GroupWithIconsAndLabels />);
        expect(container).toMatchSnapshot();
    });
});
