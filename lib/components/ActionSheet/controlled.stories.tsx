import type { Meta, StoryObj } from "@storybook/react";

import { ActionSheetExampleControlled } from "./mocks/example";
import { fn } from "@storybook/test";
import {
    LabelPairedPlaceholderCaptionBoldIcon,
    StandaloneXmarkRegularIcon,
} from "@deriv/quill-icons";

const icons: Record<string, object | null> = {
    with_icon: <LabelPairedPlaceholderCaptionBoldIcon />,
    none: null,
};

const meta: Meta = {
    title: "Components/Action Sheet/Controlled",
    component: ActionSheetExampleControlled,
    tags: ["autodocs"],
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    args: {
        isOpen: false,
        onClose: fn(),
        title: "Title",
        description: "Description",
        type: "non-modal",
        closeIcon: <StandaloneXmarkRegularIcon />,
        onOpen: fn(),
        isPrimaryButtonDisabled: false,
        isSecondaryButtonDisabled: false,
        shouldCloseOnDrag: true,
        shouldCloseOnPrimaryButtonClick: true,
        shouldCloseOnSecondaryButtonClick: true,
        fullHeightOnOpen: false,
        shouldBlurOnClose: false,
    },
    argTypes: {
        isOpen: {
            description:
                "If you wish to manage the opening and closing states, transmit the `open` state from your component. Set the initial value to `false` when passing it.",
            control: { type: "boolean" },
        },
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
                "Pass your callback function using this method. It will be triggered on the open function.",
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
            options: ["modal", "non-modal"],
            control: { type: "radio" },
            description:
                "This property is used to specify the type, which offers two options: `modal` and `non-modal`. When set to `modal`, it adds an overlay over the entire body, and clicking on it will close the action sheet. On the other hand, when set to `non-modal`, the area outside of the action sheet remains interactive and no overlay.",
        },
        position: {
            options: ["left", "right"],
            control: { type: "radio" },
            description: "This prop will make bottom sheet expandable",
        },
        icon: {
            description:
                "This props allowed you to pass in icon for `ActionSheet.Header`",
            options: Object.keys(icons),
            mapping: icons,
            control: {
                type: "radio",
            },
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
                "This prop is meant for `ActionSheet.Header`. It renders an icon-only dismiss button on the leading edge of the title row. Accepts `icon`, `onAction`, `label` (accessible name) and `size` (default `md`). It has no enabled/disabled state and always closes the sheet without committing anything.",
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
            control: {
                type: "object",
            },
            description:
                "This prop is meant for `ActionSheet.Footer`. It accepts two property: `Content`, which accepts a string, and `onAction`, which takes a function.",
        },
        secondaryAction: {
            control: {
                type: "object",
            },
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
            control: {
                type: "radio",
            },
            options: ["vertical", "horizontal"],
            description:
                "This prop is for `ActionSheet.Footer` buttons alignment",
        },
    },
} satisfies Meta<typeof ActionSheetExampleControlled>;

export default meta;
type Story = StoryObj<typeof ActionSheetExampleControlled>;

export const Controlled: Story = {
    args: {
        expandable: true,
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
    },
};
