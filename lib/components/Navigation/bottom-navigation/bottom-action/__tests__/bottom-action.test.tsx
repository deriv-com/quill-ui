import { fireEvent, render } from "@testing-library/react";
import BottomAction from "..";

describe("BottomAction", () => {
    it("renders BottomAction with correct props", () => {
        const { getByText, container } = render(
            <BottomAction
                icon={<svg />}
                activeIcon={<svg />}
                label="Test Label"
                showLabel={true}
                selected={false}
            />,
        );

        expect(
            container.querySelector(
                ".quill-navigation-bottom-bar__action-icon",
            ),
        ).toBeInTheDocument();

        expect(getByText("Test Label")).toBeInTheDocument();

        expect(container.firstChild).toHaveClass(
            "quill-navigation-bottom-bar__action-selected--false",
        );
    });

    it("triggers onClick and onChange events", () => {
        const handleClick = jest.fn();
        const handleChange = jest.fn();
        const { getByRole } = render(
            <BottomAction
                icon={<svg />}
                activeIcon={<svg />}
                onClick={handleClick}
                onChange={handleChange}
                as="button"
            />,
        );

        const actionElement = getByRole("button");

        fireEvent.click(actionElement);

        expect(handleClick).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalled();
    });

    it("shows activeIcon when selected is true", () => {
        const { queryByTestId } = render(
            <BottomAction
                icon={<svg data-testid="icon" />}
                activeIcon={<svg data-testid="active-icon" />}
                selected={true}
            />,
        );

        expect(queryByTestId("active-icon")).toBeInTheDocument();
        expect(queryByTestId("icon")).not.toBeInTheDocument();
    });

    it("shows icon when selected is false", () => {
        const { queryByTestId } = render(
            <BottomAction
                icon={<svg data-testid="icon" />}
                activeIcon={<svg data-testid="active-icon" />}
                selected={false}
            />,
        );

        expect(queryByTestId("active-icon")).not.toBeInTheDocument();
        expect(queryByTestId("icon")).toBeInTheDocument();
    });

    it("shows label when showLabel is true", () => {
        const { getByText } = render(
            <BottomAction
                icon={<svg />}
                activeIcon={<svg />}
                label="Test Label"
                showLabel={true}
            />,
        );

        expect(getByText("Test Label")).toBeInTheDocument();
    });

    it("hides label when showLabel is false", () => {
        const { queryByText } = render(
            <BottomAction
                icon={<svg />}
                activeIcon={<svg />}
                label="Test Label"
                showLabel={false}
            />,
        );

        expect(queryByText("Test Label")).not.toBeInTheDocument();
    });

    it("renders with custom element", () => {
        const { container } = render(
            <BottomAction as="button" icon={<svg />} activeIcon={<svg />} />,
        );

        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper.tagName).toBe("BUTTON");
    });

    it("applies custom class names", () => {
        const { container } = render(
            <BottomAction
                icon={<svg />}
                activeIcon={<svg />}
                className="custom-class"
            />,
        );

        expect(container.firstChild).toHaveClass("custom-class");
    });
});
