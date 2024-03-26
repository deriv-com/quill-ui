import { render } from "@testing-library/react";
import SegmentedControlSingleChoice from "..";

describe("SegmentedControl.SingleChoice", () => {
    it("should render segments with icons only", () => {
        const { container } = render(
            <SegmentedControlSingleChoice
                options={new Array(5).fill({
                    icon: "IconComponent",
                })}
            />,
        );
        expect(container).toMatchSnapshot();
    });
    it("should render segments with labels only", () => {
        const { container } = render(
            <SegmentedControlSingleChoice
                options={new Array(5).fill({
                    label: "Label",
                })}
            />,
        );
        expect(container).toMatchSnapshot();
    });
    it("should render segments with icons and labels", () => {
        const { container } = render(
            <SegmentedControlSingleChoice
                options={new Array(5).fill({
                    icon: "IconComponent",
                    label: "Label",
                })}
            />,
        );
        expect(container).toMatchSnapshot();
    });
});
