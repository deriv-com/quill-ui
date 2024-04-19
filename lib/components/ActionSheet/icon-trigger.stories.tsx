import type { Meta, StoryObj } from "@storybook/react";

import { ActionSheetExampleWithIconTrigger } from "./mocks/example";
import { fn } from "@storybook/test";
import {
    LabelPairedPlaceholderCaptionBoldIcon,
    StandaloneXmarkRegularIcon,
} from "@deriv/quill-icons";

const meta: Meta = {
    title: "Components/Action Sheet/Icon Trigger",
    component: ActionSheetExampleWithIconTrigger,
    tags: ["autodocs"],
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    args: {
        onClose: fn(),
        title: "Title",
        description: "Description",
        closeIcon: <StandaloneXmarkRegularIcon />,
        icon: <LabelPairedPlaceholderCaptionBoldIcon />,
        onOpen: fn(),
        isOpen: false,
    },
    argTypes: {
        isOpen: { table: { disable: true } },
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
} satisfies Meta<typeof ActionSheetExampleWithIconTrigger>;

export default meta;
type Story = StoryObj<typeof ActionSheetExampleWithIconTrigger>;

export const IconTrigger: Story = {
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
