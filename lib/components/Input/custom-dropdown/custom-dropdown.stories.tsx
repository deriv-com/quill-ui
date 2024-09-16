import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CustomDropdown } from ".";
import { useDropdown } from "@hooks/useDropdown";
import { DropdownItem } from "@components/Atom";
import BreakpointProvider from "@providers/breakpoint/breakpointProvider";

type Template = React.ComponentProps<typeof CustomDropdown>;

const meta = {
    title: "Components/Custom/CustomDropdown",
    args: {
        isAutocomplete: true,
        placeholder: "placeholder",
        label: "label",
        fullHeightOnOpen: true,
        actionSheetFooter: {
            primaryAction: {
                content: "123",
                onAction: () => null,
            },
            secondaryAction: {
                content: "123",
                onAction: () => null,
            },
        },
    },
    argTypes: {
        id: {
            control: "text",
            description: "id to the input element",
        },
        isAutocomplete: {
            description:
                "Determines whether the input supports autocomplete functionality. Default is false.",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
            control: "boolean",
        },
        onChange: {
            description:
                "A callback function that is called when the input value changes.",
            table: { type: { summary: "((e: React.ChangeEvent) => void)" } },
        },
        inputSize: {
            description: "Size of the input",
            table: { type: { summary: "sm | md | lg" } },
            options: ["sm", "md", "lg"],
            control: "radio",
        },
        label: {
            description: "label of the dropdown",
            table: { type: { summary: "string" } },
        },
        onOpen: {
            description: "A callback function on dropdown content open",
            table: { type: { summary: "() => void" } },
        },
        onClose: {
            description: "A callback function on dropdown content close",
            table: { type: { summary: "() => void" } },
        },
    },
    parameters: {
        docs: {
            story: {
                height: "200px",
            },
        },
    },
} satisfies Meta<typeof CustomDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
    { value: "1", text: 1 },
    { value: "2", text: 2 },
    { value: "3", text: 3 },
    { value: "4", text: 4 },
    { value: "5", text: 5 },
];

const Content = () => {
    const { close, selectedValue, setSelectedValue } = useDropdown();

    const handleClick = (value: string) => {
        setSelectedValue(value);
        close();
    };

    return data.map(({ value, text }, index) => {
        return (
            <DropdownItem
                onClick={() => handleClick(value)}
                label={text}
                selected={selectedValue == value}
                key={index}
            >
                {text}
            </DropdownItem>
        );
    });
};

const Template: React.FC<Template> = ({ ...args }: Template) => {
    return (
        <BreakpointProvider>
            <CustomDropdown {...args}>
                <Content />
            </CustomDropdown>
        </BreakpointProvider>
    );
};

const Sample = Template.bind(this) as Story;
Sample.args = { ...meta.args };

export { Sample };
