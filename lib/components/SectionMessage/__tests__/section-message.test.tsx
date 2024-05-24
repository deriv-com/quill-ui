import { render, screen } from "@testing-library/react";
import SectionMessage, { SectionMessageProps } from "..";
import { StandaloneCircleInfoBoldIcon } from "@deriv/quill-icons/Standalone";
import Link from "@components/Link";

describe("SectionMessage", () => {
    const defaultProps: SectionMessageProps = {
        title: "Test Title",
        message: "Test message content",
        size: "md",
    };

    const renderComponent = (props: Partial<SectionMessageProps> = {}) => {
        return render(<SectionMessage {...defaultProps} {...props} />);
    };

    it("renders correctly with default props", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("renders with an info status", () => {
        renderComponent({ status: "info" });
        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Test message content")).toBeInTheDocument();
        expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument(); // Assuming the icon is rendered with role 'img'
    });

    it("renders with a custom icon", () => {
        const customIcon = (
            <StandaloneCircleInfoBoldIcon fill="#0000FF" iconSize="sm" />
        );
        renderComponent({ icon: customIcon });
        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Test message content")).toBeInTheDocument();
        expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument(); // Assuming the icon is rendered with role 'img'
    });

    it("renders with links", () => {
        const links = [
            <Link>Example Link 1</Link>,
            <Link>Example Link 2</Link>,
        ];
        renderComponent({ links });
        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Test message content")).toBeInTheDocument();
        expect(screen.getByText("Example Link 1")).toBeInTheDocument();
        expect(screen.getByText("Example Link 2")).toBeInTheDocument();
    });
});
