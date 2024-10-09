import { act, fireEvent, render, screen } from "@testing-library/react";
import TextArea from "..";

describe("TextArea Component", () => {
    it("renders with default props", () => {
        const { container } = render(<TextArea />);
        expect(container.querySelector("textarea")).toBeInTheDocument();
    });

    it("handles onChange correctly", () => {
        const handleChange = jest.fn();
        const { getByPlaceholderText } = render(
            <TextArea placeholder="Test Placeholder" onChange={handleChange} />,
        );
        const textarea = getByPlaceholderText("Test Placeholder");
        act(() => {
            fireEvent.change(textarea, { target: { value: "Test" } });
        });
        expect(handleChange).toHaveBeenCalled();
        expect(textarea).toMatchSnapshot();
    });

    it("displays character counter when show_counter is true", () => {
        const { getByText } = render(
            <TextArea maxLength={50} show_counter={true} value="Test" />,
        );
        expect(getByText("4/50")).toBeInTheDocument();
    });

    it("renders with the correct size", () => {
        const { container } = render(<TextArea size="sm" />);
        expect(screen.getByRole("textbox").parentElement).toHaveClass(
            "quill-textarea__wrapper__size--sm",
        );
        expect(container).toMatchSnapshot();
    });

    it("displays the label when provided", () => {
        render(<TextArea label="Description" />);
        expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("updates character counter as text is entered", () => {
        render(<TextArea show_counter maxLength={100} value="Hello" />);

        expect(screen.getByText("5/100")).toBeInTheDocument();
    });

    it("shows character counter when show_counter is true and maxLength is provided", () => {
        render(<TextArea show_counter maxLength={100} />);
        expect(screen.getByText("0/100")).toBeInTheDocument();
    });
});
