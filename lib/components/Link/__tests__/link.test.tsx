import { render, screen } from "@testing-library/react";
import Link from "../index";
import { LabelPairedPlaceholderMdRegularIcon } from "@deriv/quill-icons/LabelPaired";
import { LinkSize, TLinkColor } from "../types";

describe("Link", () => {
    it("should render correctly", () => {
        render(<Link>Click me</Link>);
        const LinkElement = screen.getByText(/click me/i);
        expect(LinkElement).toBeInTheDocument();
    });

    it("should render chevron icon when hasChevron prop is true", () => {
        render(<Link hasChevron>Click me</Link>);
        const icon = screen.getByTestId("dt-link-chevron");
        expect(icon).toBeInTheDocument();
    });

    it("should render icon when a icon is passed", () => {
        render(
            <Link icon={<LabelPairedPlaceholderMdRegularIcon />}>
                Click me
            </Link>,
        );
        const icon = screen.getByTestId("dt-link-icon");
        expect(icon).toBeInTheDocument();
    });

    const colors: TLinkColor[] = ["black", "white"];
    const sizes: LinkSize[] = ["caption", "sm", "md", "lg", "xl"];

    colors.forEach((color) => {
        sizes.forEach((size) => {
            it(`should render correctly with ${size} size and color ${color}`, () => {
                const { container } = render(
                    <Link size={size} color={color}>
                        Click me - {size}
                    </Link>,
                );
                expect(container).toMatchSnapshot();
            });
        });
    });

    const disabled = [true, false];
    disabled.forEach((dis) => {
        it(`should render correctly with disabled ${dis}`, () => {
            render(<Link disabled={dis}>Click me disabled</Link>);
            const LinkElement = screen.getByText("Click me disabled");
            expect(LinkElement).toMatchSnapshot();
        });
    });
});
