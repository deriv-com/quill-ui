import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Base from "../index";
import { StandaloneAndroidIcon } from "@deriv/quill-icons/Standalone";
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
        const contentElement = screen.getByRole("heading", {
            name: "Content",
            level: 2,
        });
        expect(contentElement).toBeInTheDocument();
    });

    it("should render icon correctly", () => {
        expect(screen.getByTestId("accordion-icon")).toBeInTheDocument();
    });

    it("should be in a collapsed state initially", () => {
        expect(screen.getByTestId("expanded-content"));
    });

    it("should expand the accordion on click", async () => {
        const toggleButton = screen.getByTestId("toggle-expand");

        await act(async () => {
            await userEvent.click(toggleButton);
        });

        expect(screen.getByTestId("expanded-content")).toBeInTheDocument();
    });
});
