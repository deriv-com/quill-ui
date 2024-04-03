import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ActionSheetExample } from "./mocks/example";
import {
    LabelPairedPlaceholderCaptionBoldIcon,
    StandaloneXmarkRegularIcon,
} from "@deriv/quill-icons";

const meta: Meta = {
    title: "Components/Action Sheet/Button Trigger",
    component: ActionSheetExample,
    tags: ["autodocs"],
    args: {
        onClose: fn(),
        title: "Title",
        description: "Description",
        closeIcon: <StandaloneXmarkRegularIcon />,
        icon: <LabelPairedPlaceholderCaptionBoldIcon />,
    },
    argTypes: {
        show: { table: { disable: true } },
        handleOpen: { table: { disable: true } },
        handleClose: { table: { disable: true } },
        isOpen: {
            description:
                "If you wish to manage the opening and closing states, transmit the `open` state from your component. Set the initial value to `false` when passing it.",
        },
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
        title: {
            description: "Title for `ActionSheet.Header`",
        },
        description: {
            description: "Description for `ActionSheet.Header`",
        },
        closeIcon: {
            description:
                "This props allowed you to pass in icon for close button in `ActionSheet.Header`",
        },
        icon: {
            description:
                "This props allowed you to pass in icon for `ActionSheet.Header`",
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
        alignment: {
            control: {
                type: "radio",
            },
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
    },
};
