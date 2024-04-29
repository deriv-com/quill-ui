import { render } from "@testing-library/react";
import { StandalonePlaceholderRegularIcon } from "@deriv/quill-icons/Standalone";
import Tag from "../index";

describe("Tag", () => {
    it("Should render Tag Default", () => {
        const { container } = render(<Tag label="label"></Tag>);
        expect(container).toMatchSnapshot();
    });

    it("Should render Custom with Icon", () => {
        const { container } = render(<Tag label="label"></Tag>);
        expect(container).toMatchSnapshot();
    });

    it("Should render Custom Tag with Icon", () => {
        const { container } = render(
            <Tag
                icon={StandalonePlaceholderRegularIcon}
                variant="custom"
                color="custom"
                label="Label"
            ></Tag>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render Custom Tag without Icon", () => {
        const { container } = render(
            <Tag variant="custom" color="custom" label="Label"></Tag>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render Custom Tag Fill without Icon", () => {
        const { container } = render(
            <Tag color="custom" variant="fill" label="Label"></Tag>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render Custom Tag Outline without Icon", () => {
        const { container } = render(
            <Tag color="custom" variant="outline" label="Label"></Tag>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render Custom Tag Outline with Icon", () => {
        const { container } = render(
            <Tag
                icon={StandalonePlaceholderRegularIcon}
                color="custom"
                variant="outline"
                label="Label"
            ></Tag>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render Error Tag Fill", () => {
        const { container } = render(<Tag color="error" label="label"></Tag>);
        expect(container).toMatchSnapshot();
    });

    it("Should render Warning Tag Fill", () => {
        const { container } = render(<Tag color="warning" label="label"></Tag>);
        expect(container).toMatchSnapshot();
    });

    it("Should render Success Tag Fill", () => {
        const { container } = render(
            <Tag color="success" label="laabel"></Tag>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render Info Tag Fill", () => {
        const { container } = render(<Tag color="info" label="label"></Tag>);
        expect(container).toMatchSnapshot();
    });

    it("Should render Error Tag Outline", () => {
        const { container } = render(
            <Tag color="error" variant="outline" label="label"></Tag>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render Warning Tag Outline", () => {
        const { container } = render(
            <Tag color="warning" variant="outline" label="label"></Tag>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render Success Tag Outline", () => {
        const { container } = render(
            <Tag color="success" variant="outline" label="label"></Tag>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render Info Tag Outline", () => {
        const { container } = render(
            <Tag color="info" variant="outline" label="label"></Tag>,
        );
        expect(container).toMatchSnapshot();
    });
});
