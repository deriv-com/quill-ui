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
    it("should inherit container width", () => {
        const { container } = render(
            <div style={{ width: "328px" }}>
                <SegmentedControlSingleChoice
                    hasContainerWidth
                    options={new Array(2).fill({ label: "Label" })}
                />
            </div>,
        );
        expect(container).toMatchSnapshot();
    });
    it("should render with one disabled option", () => {
        const { container } = render(
            <SegmentedControlSingleChoice
                options={[
                    { label: "Label" },
                    { label: "Label", disabled: true },
                    { label: "Label" },
                ]}
            />,
        );
        expect(container).toMatchSnapshot();
    });
});
