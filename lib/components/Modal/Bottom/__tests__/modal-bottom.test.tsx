import React from "react";
import ReactDOM from "react-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StandaloneTrashRegularIcon } from "@deriv/quill-icons";
import { ModalBottom } from "..";

describe("ModalBottom", () => {
    const primaryButtonLabel = "Primary Button Label";
    const secondaryButtonLabel = "Secondary Button Label";
    const shortTextContent = "This is some amazing placeholder.";
    const imageSRC =
        "https://live.staticflickr.com/603/21947667154_e63cc9252b_b.jpg";

    const children = (
        <>
            <ModalBottom.Title>Title</ModalBottom.Title>
            <ModalBottom.Body>{shortTextContent}</ModalBottom.Body>
        </>
    );

    const mockProps = {
        isOpened: true,
        toggleModal: jest.fn(),
        primaryButtonLabel,
    };

    beforeAll(() => {
        (ReactDOM.createPortal as jest.Mock) = jest.fn(
            (component) => component,
        );
    });

    afterAll(() => {
        (ReactDOM.createPortal as jest.Mock).mockClear();
    });

    it("should render with default values if optional ones were not passed", () => {
        const { container } = render(
            <ModalBottom {...mockProps}>{children}</ModalBottom>,
        );

        expect(container).toMatchSnapshot();
    });

    it("should call toggleModal if user clicks on the overlay", async () => {
        render(<ModalBottom {...mockProps}>{children}</ModalBottom>);

        userEvent.click(screen.getByTestId("dt_overlay"));
        await waitFor(() => {
            expect(mockProps.toggleModal).toHaveBeenCalledTimes(1);
        });
    });

    it("should not render handleBar if showHandleBar === false", () => {
        const { container } = render(
            <ModalBottom {...mockProps} showHandleBar={false}>
                {children}
            </ModalBottom>,
        );

        expect(screen.queryByTestId("dt_handlebar")).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should render secondary button if showSecondaryButton === true and the label was passed", () => {
        const { container } = render(
            <ModalBottom
                {...mockProps}
                showSecondaryButton
                secondaryButtonLabel={secondaryButtonLabel}
            >
                {children}
            </ModalBottom>,
        );

        expect(screen.getByText(secondaryButtonLabel)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should call toggleModal if user clicks on secondary button", async () => {
        render(
            <ModalBottom
                {...mockProps}
                showSecondaryButton
                secondaryButtonLabel={secondaryButtonLabel}
            >
                {children}
            </ModalBottom>,
        );

        userEvent.click(screen.getByText(secondaryButtonLabel));
        await waitFor(() => {
            expect(mockProps.toggleModal).toHaveBeenCalledTimes(1);
        });
    });

    it("should call toggleModal if user clicks on primary button and shouldCloseOnPrimaryButtonClick == true", async () => {
        render(
            <ModalBottom {...mockProps} shouldCloseOnPrimaryButtonClick>
                {children}
            </ModalBottom>,
        );

        userEvent.click(screen.getByText(primaryButtonLabel));
        await waitFor(() => {
            expect(mockProps.toggleModal).toHaveBeenCalledTimes(1);
        });
    });

    it("should call primaryButtonCallback if user clicks on primary button and primaryButtonCallback was passed", async () => {
        const primaryButtonCallback = jest.fn();
        render(
            <ModalBottom
                {...mockProps}
                primaryButtonCallback={primaryButtonCallback}
            >
                {children}
            </ModalBottom>,
        );

        userEvent.click(screen.getByText(primaryButtonLabel));
        await waitFor(() => {
            expect(primaryButtonCallback).toHaveBeenCalledTimes(1);
        });
    });

    it("should render passed image if it is ReactNode", () => {
        const { container } = render(
            <ModalBottom {...mockProps}>
                <ModalBottom.Image>
                    <img src={imageSRC} alt="Apples" />
                </ModalBottom.Image>
            </ModalBottom>,
        );

        expect(screen.getByRole("img")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should render container with image as a background if src was passed", () => {
        const { container } = render(
            <ModalBottom {...mockProps}>
                <ModalBottom.Image src={imageSRC} />
            </ModalBottom>,
        );

        expect(screen.getByTestId("dt_modal_image")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should render SVG if it was passed", () => {
        const { container } = render(
            <ModalBottom {...mockProps}>
                <ModalBottom.Image>
                    <StandaloneTrashRegularIcon />
                </ModalBottom.Image>
            </ModalBottom>,
        );

        expect(container).toMatchSnapshot();
    });
});
