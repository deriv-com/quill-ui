import { render, screen } from "@testing-library/react";
import SegmentedControlSingleChoice from "..";

describe("SegmentedControlSingleChoice", () => {
    const label = "Label";
    const icon = <div>IconComponent</div>;

    it("should render segments with correct labels", () => {
        render(
            <SegmentedControlSingleChoice
                options={new Array(5).fill({ label })}
            />,
        );
        expect(screen.getAllByRole("button", { name: label })).toHaveLength(5);
    });
    it("should render segments with icons only", () => {
        const { container } = render(
            <SegmentedControlSingleChoice
                options={new Array(5).fill({ icon })}
            />,
        );
        expect(container).toMatchSnapshot();
    });
    it("should render segments with labels only", () => {
        const { container } = render(
            <SegmentedControlSingleChoice
                options={new Array(5).fill({ label })}
            />,
        );
        expect(container).toMatchSnapshot();
    });
    it("should render segments with icons and labels", () => {
        const { container } = render(
            <SegmentedControlSingleChoice
                options={new Array(5).fill({ icon, label })}
            />,
        );
        expect(container).toMatchSnapshot();
    });
    it("should inherit container width", () => {
        const { container } = render(
            <div style={{ width: "328px" }}>
                <SegmentedControlSingleChoice
                    hasContainerWidth
                    options={new Array(2).fill({ label })}
                />
            </div>,
        );
        expect(container).toMatchSnapshot();
    });
    it("should render with one disabled option", () => {
        const { container } = render(
            <SegmentedControlSingleChoice
                options={[{ label }, { label, disabled: true }, { label }]}
            />,
        );
        expect(container).toMatchSnapshot();
    });
});
