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

    it("should size both actions to the header default when no size is passed", () => {
        render(
            <ActionSheet.Header
                title="Stake"
                closeAction={{}}
                saveAction={{}}
            />,
        );

        expect(screen.getByRole("button", { name: "Close" })).toHaveClass(
            "quill-action-sheet--title--action-button__size--default",
        );
        expect(screen.getByRole("button", { name: "Save" })).toHaveClass(
            "quill-action-sheet--title--action-button__size--default",
        );
    });

    it("should drop the header default when the consumer passes a size", () => {
        render(
            <ActionSheet.Header
                title="Stake"
                saveAction={{ ariaLabel: "Confirm", size: "lg" }}
            />,
        );

        const saveAction = screen.getByRole("button", { name: "Confirm" });
        expect(saveAction).toHaveClass("quill-icon-button__size--lg");
        expect(saveAction).not.toHaveClass(
            "quill-action-sheet--title--action-button__size--default",
        );
    });

    const slotClasses = (container: HTMLElement) =>
        [
            ".quill-action-sheet--title--action--start",
            ".quill-action-sheet--title--action--end",
        ].map((selector) => container.querySelector(selector)?.className);

    it("should size an empty slot to match the control opposite it", () => {
        const { container } = render(
            <ActionSheet.Header title="Stake" saveAction={{ size: "lg" }} />,
        );

        // The empty leading slot has to reserve the trailing control's 48px,
        // not the 40px default, or the title sits off centre.
        slotClasses(container).forEach((className) =>
            expect(className).toContain(
                "quill-action-sheet--title--action__size--lg",
            ),
        );
    });

    it("should reserve the wider control on both slots when the sizes disagree", () => {
        const { container } = render(
            <ActionSheet.Header
                title="Stake"
                closeAction={{}}
                saveAction={{ size: "lg" }}
            />,
        );

        // A 40px close beside a 48px save: both slots take the wider 48px, or
        // `space-between` pushes the title off centre.
        slotClasses(container).forEach((className) =>
            expect(className).toContain(
                "quill-action-sheet--title--action__size--lg",
            ),
        );
    });

    it("should mirror a lone control narrower than the default", () => {
        const { container } = render(
            <ActionSheet.Header title="Stake" saveAction={{ size: "sm" }} />,
        );

        // The absent action must not widen the pair back to the 40px default.
        slotClasses(container).forEach((className) =>
            expect(className).toContain(
                "quill-action-sheet--title--action__size--sm",
            ),
        );
    });

    it("should size both slots to the default when no size is passed", () => {
        const { container } = render(
            <ActionSheet.Header title="Stake" saveAction={{}} />,
        );

        expect(
            container.querySelector(
                ".quill-action-sheet--title--action--start",
            ),
        ).toHaveClass("quill-action-sheet--title--action__size--default");
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
