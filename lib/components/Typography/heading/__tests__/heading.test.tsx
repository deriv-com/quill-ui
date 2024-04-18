import { render } from "@testing-library/react";
import Heading, { HeadingVariants } from "..";

const headingSizes: (keyof HeadingVariants)[] = [
    "Hero",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
];

describe("Heading", () => {
    headingSizes.forEach((heading) => {
        const HeaderComponent = Heading[heading];

        it(`Should render ${heading} Heading`, () => {
            const { container } = render(
                <HeaderComponent>{heading} heading</HeaderComponent>,
            );
            expect(container).toMatchSnapshot();
        });
    });
});
