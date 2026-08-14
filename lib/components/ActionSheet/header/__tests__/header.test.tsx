import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ActionSheet from "@components/ActionSheet";
import {
    LabelPairedCheckCaptionBoldIcon,
    LabelPairedXmarkCaptionBoldIcon,
    StandaloneXmarkRegularIcon,
} from "@deriv/quill-icons";

describe("<ActionSheet.Header/>", () => {
    it("should render correctly with className", () => {
        render(<ActionSheet.Header title="Title" className="px-50" />);
        const headerEl = screen.getByText("Title");
        expect(headerEl).toBeInTheDocument();
        const header = screen.getByTestId("action-sheet-header");
        expect(header).toBeInTheDocument();
    });

    it("should render correctly with description", () => {
        render(<ActionSheet.Header description="Description" />);
        const headerDesc = screen.getByText("Description");
        expect(headerDesc).toBeInTheDocument();
    });

    it("should render correctly with className", () => {
        render(
            <ActionSheet.Header
                closeIcon={
                    <StandaloneXmarkRegularIcon data-testid="close-icon" />
                }
            />,
        );
        const closeIcon = screen.getByTestId("close-icon");
        expect(closeIcon).toBeInTheDocument();
    });

    it("should render close and save actions", () => {
        render(
            <ActionSheet.Header
                title="Duration"
                closeAction={{
                    icon: <LabelPairedXmarkCaptionBoldIcon />,
                    ariaLabel: "Close",
                }}
                saveAction={{
                    icon: <LabelPairedCheckCaptionBoldIcon />,
                    ariaLabel: "Confirm",
                }}
            />,
        );

        expect(
            screen.getByTestId("dt-actionsheet-header-close-action"),
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("dt-actionsheet-header-save-action"),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Close" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Confirm" }),
        ).toBeInTheDocument();
    });

    it("should render built-in icons and accessible names when the actions are empty", () => {
        render(
            <ActionSheet.Header
                title="Stake"
                closeAction={{}}
                saveAction={{}}
            />,
        );

        // Consumers should not have to import the X / check glyphs.
        expect(
            screen.getByTestId("dt-actionsheet-header-close-action"),
        ).toContainElement(document.querySelector("svg"));
        expect(
            screen.getByRole("button", { name: "Close" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Save" }),
        ).toBeInTheDocument();
    });

    it("should let icon and ariaLabel be overridden", () => {
        render(
            <ActionSheet.Header
                title="Stake"
                closeAction={{
                    icon: (
                        <LabelPairedXmarkCaptionBoldIcon data-testid="back" />
                    ),
                    ariaLabel: "Back",
                }}
            />,
        );

        expect(screen.getByTestId("back")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Back" }),
        ).toBeInTheDocument();
        expect(
            screen.queryByRole("button", { name: "Close" }),
        ).not.toBeInTheDocument();
    });

    it("should not render any action button when neither action is passed", () => {
        render(<ActionSheet.Header title="Duration" />);

        expect(
            screen.queryByTestId("dt-actionsheet-header-close-action"),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("dt-actionsheet-header-save-action"),
        ).not.toBeInTheDocument();
    });

    it("should keep the opposite slot as a spacer when only one action is passed", () => {
        render(
            <ActionSheet.Header
                title="Duration"
                saveAction={{ icon: <LabelPairedCheckCaptionBoldIcon /> }}
            />,
        );

        const closeSlot = screen
            .getByTestId("action-sheet-header")
            .querySelector(".quill-action-sheet--title--action--start");
        expect(closeSlot).toBeInTheDocument();
        expect(closeSlot).toBeEmptyDOMElement();
    });

    it("should call onAction when an action button is clicked", async () => {
        const onAction = jest.fn();
        render(
            <ActionSheet.Header
                title="Duration"
                saveAction={{
                    icon: <LabelPairedCheckCaptionBoldIcon />,
                    ariaLabel: "Confirm",
                    onAction,
                }}
            />,
        );

        await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
        expect(onAction).toHaveBeenCalledTimes(1);
    });

    it("should colour the save action as primary and the close one as monochrome by default", () => {
        render(
            <ActionSheet.Header
                title="Stake"
                closeAction={{
                    icon: <LabelPairedXmarkCaptionBoldIcon />,
                    ariaLabel: "Close",
                }}
                saveAction={{
                    icon: <LabelPairedCheckCaptionBoldIcon />,
                    ariaLabel: "Confirm",
                }}
            />,
        );

        expect(screen.getByRole("button", { name: "Close" })).toHaveClass(
            "quill-action-sheet--title--action-button__color--monochrome",
        );
        expect(screen.getByRole("button", { name: "Confirm" })).toHaveClass(
            "quill-action-sheet--title--action-button__color--primary",
        );
    });

    it("should disable only the save action when isSaveActionDisabled is set", () => {
        render(
            <ActionSheet.Header
                title="Stake"
                isSaveActionDisabled
                closeAction={{
                    icon: <LabelPairedXmarkCaptionBoldIcon />,
                    ariaLabel: "Close",
                }}
                saveAction={{
                    icon: <LabelPairedCheckCaptionBoldIcon />,
                    ariaLabel: "Confirm",
                }}
            />,
        );

        expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Close" })).toBeEnabled();
    });

    it("should leave the save action enabled by default", () => {
        render(
            <ActionSheet.Header
                title="Stake"
                saveAction={{
                    icon: <LabelPairedCheckCaptionBoldIcon />,
                    ariaLabel: "Confirm",
                }}
            />,
        );

        expect(screen.getByRole("button", { name: "Confirm" })).toBeEnabled();
    });

    it("should keep the sheet open when shouldCloseOnSaveActionClick is false", async () => {
        const onAction = jest.fn();
        render(
            <ActionSheet.Root isOpen>
                <ActionSheet.Header
                    title="Stake"
                    shouldCloseOnSaveActionClick={false}
                    saveAction={{
                        icon: <LabelPairedCheckCaptionBoldIcon />,
                        ariaLabel: "Confirm",
                        onAction,
                    }}
                />
            </ActionSheet.Root>,
        );

        await userEvent.click(screen.getByRole("button", { name: "Confirm" }));

        expect(onAction).toHaveBeenCalledTimes(1);
        expect(screen.getByText("Stake")).toBeInTheDocument();
    });

    it("should not call onAction when the save action is disabled", async () => {
        const onAction = jest.fn();
        render(
            <ActionSheet.Header
                title="Duration"
                isSaveActionDisabled
                saveAction={{
                    icon: <LabelPairedCheckCaptionBoldIcon />,
                    ariaLabel: "Confirm",
                    onAction,
                }}
            />,
        );

        const button = screen.getByRole("button", { name: "Confirm" });
        expect(button).toBeDisabled();
        await userEvent.click(button);
        expect(onAction).not.toHaveBeenCalled();
    });
});
