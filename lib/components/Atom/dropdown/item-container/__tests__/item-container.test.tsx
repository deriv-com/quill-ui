import React from "react";
import { render } from "@testing-library/react";
import { ItemContainer } from "..";

describe("ItemContainer Component", () => {
    it("renders correctly with default props", () => {
        const { container } = render(<ItemContainer />);

        const divElement = container.firstChild as HTMLDivElement;
        expect(divElement).toHaveClass("quill__item-container");
        expect(divElement).toHaveClass("quill__item-container--size-md");
        expect(divElement).toHaveClass("quill__item-container--height-sm");
    });

    it("applies correct size and height classes", () => {
        const { container } = render(<ItemContainer size="sm" height="md" />);

        const divElement = container.firstChild as HTMLDivElement;
        expect(divElement).toHaveClass("quill__item-container--size-sm");
        expect(divElement).toHaveClass("quill__item-container--height-md");
    });

    it("applies additional className", () => {
        const { container } = render(
            <ItemContainer className="custom-class" />,
        );

        const divElement = container.firstChild as HTMLDivElement;
        expect(divElement).toHaveClass("custom-class");
    });

    it("renders content inside portal container when portalContainer is provided", () => {
        const { container } = render(
            <ItemContainer portalContainer={document.body}>
                <div id="portal">InPortal</div>
            </ItemContainer>,
        );

        const centent = container.querySelector("#portal");

        expect(centent).not.toBeInTheDocument();

        const portal = document.querySelector("#portal");
        expect(portal).toBeInTheDocument();
    });

    it("renders content without portal when portalContainer is not provided", () => {
        const { container } = render(<ItemContainer />);

        const divElement = container.firstChild as HTMLDivElement;
        expect(divElement).toHaveClass("quill__item-container");
    });

    it("forwards refs correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<ItemContainer ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current).toHaveClass("quill__item-container");
    });

    it("passes other props correctly", () => {
        const { container } = render(<ItemContainer data-testid="test-id" />);

        const divElement = container.firstChild as HTMLDivElement;
        expect(divElement).toHaveAttribute("data-testid", "test-id");
    });
});
