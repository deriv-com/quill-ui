import { render } from "@testing-library/react";
import SingleChoice from "..";

describe("SingleChoice", () => {
    const GroupComponent = SingleChoice.Group;

    it("Should render SingleChoice Group", () => {
        const { container } = render(<GroupComponent />);
        expect(container).toMatchSnapshot();
    });
});
