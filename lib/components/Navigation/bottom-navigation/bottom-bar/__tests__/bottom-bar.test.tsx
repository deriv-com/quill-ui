import { render, fireEvent } from "@testing-library/react";
import { Navigation } from "../../..";

describe("Navigation.Bottom", () => {
    it("renders Navigation.Bottom with correct props", () => {
        const { container } = render(
            <Navigation.Bottom
                className="custom-container-class"
                showLabels={true}
                as="nav"
            >
                <Navigation.BottomAction
                    icon={<svg />}
                    activeIcon={<svg />}
                    label="Action 1"
                    value={0}
                />
                <Navigation.BottomAction
                    icon={<svg />}
                    activeIcon={<svg />}
                    label="Action 2"
                    value={1}
                />
            </Navigation.Bottom>,
        );

        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper).toHaveClass("quill-navigation-bottom-bar__container");
        expect(wrapper).toHaveClass("custom-container-class");
        expect(wrapper.tagName).toBe("NAV");
        expect(
            container.querySelector(
                ".quill-navigation-bottom-bar__action-icon",
            ),
        ).toBeInTheDocument();
    });

    it("applies selected state based on value", () => {
        const { getAllByRole } = render(
            <Navigation.Bottom value={1}>
                <Navigation.BottomAction
                    icon={<svg />}
                    activeIcon={<svg />}
                    label="Action 1"
                    as="button"
                />
                <Navigation.BottomAction
                    icon={<svg />}
                    activeIcon={<svg />}
                    label="Action 2"
                    as="button"
                />
            </Navigation.Bottom>,
        );

        const [action1, action2] = getAllByRole("button");

        expect(action1).not.toHaveClass(
            "quill-navigation-bottom-bar__action-selected--true",
        );
        expect(action2).toHaveClass(
            "quill-navigation-bottom-bar__action-selected--true",
        );
    });

    it("calls onChange with the correct parameters when a Navigation.BottomAction is clicked", () => {
        const handleChange = jest.fn();
        const handleClick = jest.fn();

        const { getByTestId } = render(
            <Navigation.Bottom
                value={1}
                showLabels={true}
                onChange={handleChange}
            >
                <Navigation.BottomAction
                    icon={<svg />}
                    activeIcon={<svg />}
                    label="Action 1"
                    value={0}
                    onClick={handleClick}
                    data-testid="action-0"
                />
                <Navigation.BottomAction
                    icon={<svg />}
                    activeIcon={<svg />}
                    label="Action 2"
                    value={1}
                    data-testid="action-1"
                />
            </Navigation.Bottom>,
        );

        fireEvent.click(getByTestId("action-0"));

        expect(handleClick).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 0);
    });

    it("sets showLabels correctly", () => {
        const { container } = render(
            <Navigation.Bottom showLabels={true}>
                <Navigation.BottomAction
                    icon={<svg />}
                    activeIcon={<svg />}
                    label="Action 1"
                    value={0}
                />
                <Navigation.BottomAction
                    icon={<svg />}
                    activeIcon={<svg />}
                    label="Action 2"
                    value={1}
                />
            </Navigation.Bottom>,
        );

        const pElements = container.querySelectorAll("p");

        pElements.forEach((p, i) => {
            expect(p.innerHTML).toContain(`Action ${i + 1}`);
        });
    });

    it("overrides showLabels with Navigation.BottomAction showLabel", () => {
        const { container } = render(
            <Navigation.Bottom showLabels={true}>
                <Navigation.BottomAction
                    icon={<svg />}
                    activeIcon={<svg />}
                    label="Action 1"
                    showLabel={false}
                />
                <Navigation.BottomAction
                    icon={<svg />}
                    activeIcon={<svg />}
                    label="Action 2"
                />
            </Navigation.Bottom>,
        );

        const pElements = container.querySelectorAll("p");

        pElements.forEach((p, i) => {
            expect(p.innerHTML).not.toContain("Action 1");
            if (i === 1) {
                expect(p.innerHTML).toContain("Action 2");
            }
        });
    });

    it("renders with custom element", () => {
        const { container } = render(
            <Navigation.Bottom as="footer">
                <Navigation.BottomAction
                    icon={<svg />}
                    activeIcon={<svg />}
                    label="Action"
                    value={0}
                />
            </Navigation.Bottom>,
        );

        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper.tagName).toBe("FOOTER");
    });

    it("applies custom class names", () => {
        const { container } = render(
            <Navigation.Bottom className="additional-class">
                <Navigation.BottomAction
                    icon={<svg />}
                    activeIcon={<svg />}
                    label="Action"
                    value={0}
                />
            </Navigation.Bottom>,
        );

        expect(container.firstChild).toHaveClass("additional-class");
    });
});
