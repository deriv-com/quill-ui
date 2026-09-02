import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ActionSheetExample } from "./mocks/example";
import {
    LabelPairedArrowLeftCaptionBoldIcon,
    LabelPairedPlaceholderCaptionBoldIcon,
    LabelPairedXmarkMdBoldIcon,
} from "@deriv/quill-icons";

const icons: Record<string, object | null> = {
    with_icon: <LabelPairedPlaceholderCaptionBoldIcon />,
    none: null,
};

const meta: Meta = {
    title: "Components/Action Sheet/Button Trigger",
    component: ActionSheetExample,
    tags: ["autodocs"],
    args: {
        onClose: fn(),
        title: "Title",
        description: "Description",
        closeIcon: <LabelPairedXmarkMdBoldIcon />,
        isPrimaryButtonDisabled: false,
        isSecondaryButtonDisabled: false,
        shouldCloseOnDrag: true,
        shouldCloseOnPrimaryButtonClick: true,
        shouldCloseOnSecondaryButtonClick: true,
        fullHeightOnOpen: true,
        shouldBlurOnClose: false,
    },
    argTypes: {
        isOpen: { table: { disable: true } },
        isPrimaryButtonDisabled: {
            control: { type: "boolean" },
            description:
                "This prop controls if primary button is disabled or not.",
        },
        isSecondaryButtonDisabled: {
            control: { type: "boolean" },
            description:
                "This prop controls if secondary button is disabled or not.",
        },
        show: { table: { disable: true } },
        shouldCloseOnDrag: {
            control: { type: "boolean" },
            description:
                "This prop controls if action sheet should be closed on drag down or not. Default value: false. Property should be passed to ActionSheet.Portal",
        },
        shouldDetectSwipingOnContainer: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            control: { type: "boolean" },
            description:
                "This prop controls if swiping will be detected on the whole Action Sheet, not only on Handlebar. Default value: false. Property should be passed to ActionSheet.Portal",
        },
        showHandlebar: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            control: { type: "boolean" },
            description:
                "This prop controls if Handlebar should be visible or not. Default value: true",
        },
        fullHeightOnOpen: {
            description:
                "This props controls is full height when open the actionsheet",
            control: { type: "boolean" },
            table: { type: { summary: "boolean" } },
        },
        handleOpen: { table: { disable: true } },
        handleClose: { table: { disable: true } },
        onOpen: {
            description:
                "Pass your callback function using this method. It will be triggered on the open function. If you are passing the `isOpen` state, provide your `open` `setState` function like this: `onOpen={() => setIsOpen(true)}`.",
        },
        onClose: {
            description:
                "Pass your callback function using this method. It will be triggered on the open function.",
        },
        expandable: {
            control: { type: "boolean" },
            description:
                "This prop controls the expandability of the bottom sheet.",
        },
        type: {
            control: "radio",
            options: ["modal", "non-modal"],
            description:
                "This property is used to specify the type, which offers two options: `modal` and `non-modal`. When set to `modal`, it adds an overlay over the entire body, and clicking on it will close the action sheet. On the other hand, when set to `non-modal`, the area outside of the action sheet remains interactive and no overlay.",
        },
        position: {
            control: "radio",
            options: ["left", "right"],
            description: "This prop will make bottom sheet expandable",
        },
        title: {
            description: "Title for `ActionSheet.Header`",
        },
        description: {
            description: "Description for `ActionSheet.Header`",
        },
        closeIcon: {
            control: false,
            description:
                "This props allowed you to pass in icon for close button in `ActionSheet.Header`",
        },
        icon: {
            description:
                "This props allowed you to pass in icon for `ActionSheet.Header`",
            options: Object.keys(icons),
            mapping: icons,
            control: "radio",
        },
        iconPosition: {
            control: "radio",
            options: ["left", "right"],
            description:
                "This prop controls icon position in `ActionSheet.Header`. Default value - 'right'",
        },
        closeAction: {
            control: { type: "object" },
            description:
                "This prop is meant for `ActionSheet.Header`. It renders an icon-only dismiss button on the leading edge of the title row. All fields are optional: `icon` defaults to a built-in X (a check for `saveAction`), `ariaLabel` defaults to `Close`/`Save` (maps to `aria-label`; renders nothing visually), plus `onAction` and `size`. Omit `size` for the 40px design default, or pass one to opt into the shared button scale (24/32/48/64px). It has no enabled/disabled state and always closes the sheet without committing anything.",
        },
        saveAction: {
            control: { type: "object" },
            description:
                "Same shape as `closeAction`, rendered on the trailing edge of the title row. Like `primaryAction`, its `onAction` runs **only** when the button is clicked: dismissing the sheet by clicking the overlay, dragging the handlebar or pressing `closeAction` closes it without committing anything.",
        },
        isSaveActionDisabled: {
            control: { type: "boolean" },
            description:
                "This prop controls if the header save action is disabled or not - the counterpart of `isPrimaryButtonDisabled`. Pass `!hasChanges` so it stays disabled and neutral until there is something to save; once enabled it turns coral.",
        },
        shouldCloseOnSaveActionClick: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            control: { type: "boolean" },
            description:
                "This prop controls if Action Sheet should be closed or not when the header save action was clicked. Default value: true",
        },
        primaryAction: {
            control: false,
            description:
                "This prop is meant for `ActionSheet.Footer`. It accepts two property: `Content`, which accepts a string, and `onAction`, which takes a function.",
        },
        secondaryAction: {
            control: false,
            description: "Same as `primaryAction`",
        },
        shouldCloseOnPrimaryButtonClick: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            control: { type: "boolean" },
            description:
                "This prop controls if Action Sheet should be closed or not when primary button was clicked. Default value: true",
        },
        shouldCloseOnSecondaryButtonClick: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            control: { type: "boolean" },
            description:
                "This prop controls if Action Sheet should be closed or not when secondary button was clicked. Default value: true",
        },
        shouldBlurOnClose: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            control: { type: "boolean" },
            description:
                "This prop controls if focus should be removed after Action Sheet will be closed. Default value: false",
        },
        alignment: {
            control: "radio",
            options: ["vertical", "horizontal"],
            description:
                "This prop is for `ActionSheet.Footer` buttons alignment",
        },
    },
} satisfies Meta<typeof ActionSheetExample>;

export default meta;
type Story = StoryObj<typeof ActionSheetExample>;

export const ButtonTrigger: Story = {
    args: {
        expandable: true,
        type: "modal",
        position: "right",
        primaryAction: {
            content: "Primary",
            onAction: () => null,
        },
        secondaryAction: {
            content: "Secondary",
            onAction: () => null,
        },
        alignment: "vertical",
        shouldBlurOnClose: false,
    },
};

const headerActionArgs = {
    expandable: true,
    type: "modal",
    position: "right",
    title: "Stake",
    description: undefined,
    closeIcon: undefined,
    showHandlebar: false,
    // No `icon` needed - the X and check are built in.
    closeAction: {},
    saveAction: { onAction: () => null },
    alignment: "vertical",
    shouldBlurOnClose: false,
} satisfies Partial<Parameters<typeof ActionSheetExample>[0]>;

/**
 * Nothing has changed yet, so the save action stays disabled and neutral -
 * `isSaveActionDisabled={!hasChanges}`. The close action has no such state.
 */
export const HeaderActionsDisabled: Story = {
    args: {
        ...headerActionArgs,
        isSaveActionDisabled: true,
    },
};

/**
 * Once a value changes the save action becomes enabled and turns coral.
 *
 * This is also the reference for the header's default presentation: with no
 * `size` passed, both controls are a 40px pill and the title renders in Inter
 * rather than the Ubuntu the shared heading style resolves to. Both slots are
 * filled here, so the reserved-spacer behaviour is not visible - see
 * `HeaderActionsSaveOnly` for that.
 */
export const HeaderActionsActive: Story = {
    args: {
        ...headerActionArgs,
        isSaveActionDisabled: false,
    },
};

/**
 * Passing `size` opts a control out of the 40px default and back onto the
 * shared button scale - `lg` is 48px here. Only pass it when a design calls
 * for one of those steps.
 */
export const HeaderActionsExplicitSize: Story = {
    args: {
        ...headerActionArgs,
        isSaveActionDisabled: false,
        closeAction: { size: "lg" },
        saveAction: { onAction: () => null, size: "lg" },
    },
};

/**
 * Only `saveAction` is passed, so the leading slot renders empty as a spacer
 * that reserves the same width as the control opposite it. This is the story
 * to check the title is optically centred - the ones with both actions filled
 * cannot show it.
 */
export const HeaderActionsSaveOnly: Story = {
    args: {
        ...headerActionArgs,
        isSaveActionDisabled: false,
        closeAction: undefined,
    },
};

/**
 * The two actions disagree about size - a 40px default beside a 48px `lg`.
 * Both slots reserve the wider of the two, so the title stays centred instead
 * of drifting toward the narrower side.
 */
export const HeaderActionsMixedSizes: Story = {
    args: {
        ...headerActionArgs,
        isSaveActionDisabled: false,
        closeAction: {},
        saveAction: { onAction: () => null, size: "lg" },
    },
};

/**
 * `icon` is only needed to override a built-in glyph - here a back arrow for a
 * multi-step sheet. `ariaLabel` should be overridden alongside it.
 */
export const HeaderActionsCustomIcon: Story = {
    args: {
        ...headerActionArgs,
        closeAction: {
            icon: <LabelPairedArrowLeftCaptionBoldIcon />,
            ariaLabel: "Back",
        },
    },
};
