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
    },
    argTypes: {
        isOpen: {
            description:
                "If you wish to manage the opening and closing states, transmit the `open` state from your component. Set the initial value to `false` when passing it.",
            control: { type: "boolean" },
        },
        show: { table: { disable: true } },
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
