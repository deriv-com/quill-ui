import { render } from "@testing-library/react";
import { Checkbox } from "..";

describe("Checkbox", () => {
    const mockProps = {
        label: "Checkbox label",
    };

    it("should render with default values if optional ones were not passed", () => {
        const { container } = render(<Checkbox {...mockProps} />);

        expect(container).toMatchSnapshot();
    });

    it("should render correct attribute of input if checked === true", () => {
        const { container } = render(<Checkbox {...mockProps} checked />);

        expect(container).toMatchSnapshot();
    });

    it("should render correct attribute of input if disabled === true", () => {
        const { container } = render(<Checkbox {...mockProps} disabled />);

        expect(container).toMatchSnapshot();
    });

    it("should render correct icon if indeterminate === true", () => {
        const { container } = render(<Checkbox {...mockProps} indeterminate />);

        expect(container).toMatchSnapshot();
    });

    it("should render correct label size if size === 'md'", () => {
        const { container } = render(<Checkbox {...mockProps} size="md" />);

        expect(container).toMatchSnapshot();
    });

    it("should apply labelClassName if it was passed", () => {
        const { container } = render(
            <Checkbox {...mockProps} labelClassName="label_className" />,
        );

        expect(container).toMatchSnapshot();
    });

    it("should apply wrapperClassName if it was passed", () => {
        const { container } = render(
            <Checkbox {...mockProps} wrapperClassName="wrapper_className" />,
        );

        expect(container).toMatchSnapshot();
    });

    it("should apply name if it was passed", () => {
        const { container } = render(
            <Checkbox {...mockProps} name="mock_name" />,
        );

        expect(container).toMatchSnapshot();
    });

    it("should apply id if it was passed", () => {
        const { container } = render(<Checkbox {...mockProps} id="mock_id" />);

        expect(container).toMatchSnapshot();
    });
});
