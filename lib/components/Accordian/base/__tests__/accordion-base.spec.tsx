import { render, screen } from "@testing-library/react";

import Base from "../index";
import { StandaloneAndroidIcon } from "@deriv/quill-icons/Standalone";
import userEvent from "@testing-library/user-event";
import H2 from "@components/Typography/heading/h2";

const title = "Accordion Title";
const subtitle = "Accordion Subtitle";
const content = () => <H2>Content</H2>;
const icon = <StandaloneAndroidIcon />;

describe("Accordion - Base", () => {
    beforeEach(() => {
        render(
            <Base
                title={title}
                subtitle={subtitle}
                content={content}
                icon={icon}
            />,
        );
    });

    it("should render title correctly", () => {
        expect(screen.getByText(title)).toBeInTheDocument();
    });

    it("should render subtitle correctly", () => {
        expect(screen.getByText(subtitle)).toBeInTheDocument();
    });

    it("should render content correctly", () => {
        const content = screen.getByRole("heading", {
            name: "Content",
            level: 2,
        });
        expect(content).toBeInTheDocument();
    });

    it("should render icon correctly", () => {
        expect(screen.getByTestId("accordion-icon")).toBeInTheDocument();
    });

    it("should be in a collapsed state initially", () => {
        expect(screen.getByTestId("expanded-content"));
    });

    it("should expand the accordion on click", async () => {
        const click = screen.getByTestId("toggle-expand");

        await userEvent.click(click);

        expect(screen.getByTestId("expanded-content"));
    });
});
