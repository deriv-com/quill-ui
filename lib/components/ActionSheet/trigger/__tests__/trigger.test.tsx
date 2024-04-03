import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LabelPairedAndroidSmIcon } from "@deriv/quill-icons/LabelPaired";
import Trigger from "..";

describe("<ActionSheet.Trigger/>", () => {
    it("should render correctly with children", () => {
        render(<Trigger>click here</Trigger>);
        const trigger = screen.getByText("click here");
        expect(trigger).toBeInTheDocument();
    });
    it("should call `handleToggle` method on click", async () => {
        const handleClickMock = jest.fn();
        render(<Trigger onClick={handleClickMock}>click here</Trigger>);
        const trigger = screen.getByText("click here");
        await userEvent.click(trigger);
        expect(handleClickMock).toHaveBeenCalled();
    });

    it("should render icon when icon prop is passed", async () => {
        render(<Trigger iconComponent={LabelPairedAndroidSmIcon} />);
        const triggerIcon = screen.getByTestId("dt-actionsheet-icon-button");
        expect(triggerIcon).toBeInTheDocument();
    });
});
