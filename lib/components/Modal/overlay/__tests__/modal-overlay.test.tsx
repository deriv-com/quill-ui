import React from "react";
import ReactDOM from "react-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StandaloneTrashRegularIcon } from "@deriv/quill-icons";
import { ModalOverlay } from "../index";

describe("ModalOverlay", () => {
    const primaryButtonLabel = "Primary Button Label";
    const secondaryButtonLabel = "Secondary Button Label";
    const shortTextContent = "This is some amazing placeholder.";
    const title = "Title";
    const imageSrc =
        "https://live.staticflickr.com/603/21947667154_e63cc9252b_b.jpg";

    const children = (
        <>
            <ModalOverlay.Header title={title} />
            <ModalOverlay.Body>{shortTextContent}</ModalOverlay.Body>
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
            <ModalOverlay {...mockProps}>{children}</ModalOverlay>,
        );

        expect(container).toMatchSnapshot();
    });

    it("should call toggleModal if user clicks on the overlay", async () => {
        render(<ModalOverlay {...mockProps}>{children}</ModalOverlay>);

        userEvent.click(screen.getByTestId("dt_overlay"));
        await waitFor(() => {
            expect(mockProps.toggleModal).toHaveBeenCalledTimes(1);
        });
    });

    it("should render secondary button if showSecondaryButton === true and the label was passed", () => {
        const { container } = render(
            <ModalOverlay
                {...mockProps}
                showSecondaryButton
                secondaryButtonLabel={secondaryButtonLabel}
            >
                {children}
            </ModalOverlay>,
        );

        expect(screen.getByText(secondaryButtonLabel)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should call toggleModal if user clicks on secondary button", async () => {
        render(
            <ModalOverlay
                {...mockProps}
                showSecondaryButton
                secondaryButtonLabel={secondaryButtonLabel}
            >
                {children}
            </ModalOverlay>,
        );

        userEvent.click(screen.getByText(secondaryButtonLabel));
        await waitFor(() => {
            expect(mockProps.toggleModal).toHaveBeenCalledTimes(1);
        });
    });

    it("should call toggleModal if user clicks on primary button and shouldCloseOnPrimaryButtonClick == true", async () => {
        render(
            <ModalOverlay {...mockProps} shouldCloseOnPrimaryButtonClick>
                {children}
            </ModalOverlay>,
        );

        userEvent.click(screen.getByText(primaryButtonLabel));
        await waitFor(() => {
            expect(mockProps.toggleModal).toHaveBeenCalledTimes(1);
        });
    });

    it("should call primaryButtonCallback if user clicks on primary button and primaryButtonCallback was passed", async () => {
        const primaryButtonCallback = jest.fn();
        render(
            <ModalOverlay
                {...mockProps}
                primaryButtonCallback={primaryButtonCallback}
            >
                {children}
            </ModalOverlay>,
        );

        userEvent.click(screen.getByText(primaryButtonLabel));
        await waitFor(() => {
            expect(primaryButtonCallback).toHaveBeenCalledTimes(1);
        });
    });

    it("should render container with image as a background if src was passed", () => {
        const { container } = render(
            <ModalOverlay {...mockProps}>
                <ModalOverlay.Header src={imageSrc} title={title} />
            </ModalOverlay>,
        );

        expect(screen.getByTestId("dt_modal_image")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should render SVG if it was passed", () => {
        const { container } = render(
            <ModalOverlay {...mockProps}>
                <ModalOverlay.Header
                    title={title}
                    image={<StandaloneTrashRegularIcon />}
                />
            </ModalOverlay>,
        );

        expect(container).toMatchSnapshot();
    });
});
