import { render } from "@testing-library/react";
import SocialButton from "../index";
import userEvent from "@testing-library/user-event";

describe("Social Button", () => {
    it("Should render Google Button", () => {
        const { container } = render(
            <SocialButton social="google"></SocialButton>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render Facebook Button", () => {
        const { container } = render(
            <SocialButton social="facebook"></SocialButton>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render Apple Button", () => {
        const { container } = render(
            <SocialButton social="apple"></SocialButton>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render Primary Variant", () => {
        const { container } = render(
            <SocialButton variant="primary" social="apple"></SocialButton>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render Secondary Variant", () => {
        const { container } = render(
            <SocialButton variant="secondary" social="google"></SocialButton>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render properly with fullWidth true", () => {
        const { container } = render(
            <SocialButton fullWidth social="facebook"></SocialButton>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Should render no label if hideLabel is true", () => {
        const { container } = render(<SocialButton hideLabel></SocialButton>);
        expect(container).toMatchSnapshot();
    });

    it("Should handle onClick", async () => {
        const onClick = jest.fn();
        const { getByRole } = render(
            <SocialButton onClick={onClick}></SocialButton>,
        );
        await userEvent.click(getByRole("button"));
        expect(onClick).toHaveBeenCalled();
    });
});
