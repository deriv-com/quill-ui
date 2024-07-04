import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Title,
    Subtitle,
    Description,
    Primary,
    Controls,
    Stories,
    Markdown,
} from "@storybook/blocks";
import { CustomDropdown } from ".";
import { useDropdown } from "@hooks/useDropdown";
import { DropdownItem } from "@components/Atom";

const meta = {
    title: "Components/Inputs/CustomDropdown",
    component: CustomDropdown,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {
        isAutocomplete: true,
        placeholder: "placeholder",
        label: "label",
    },
    argTypes: {
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
            table: { type: { summary: "sm | md" } },
            options: ["sm", "md"],
            control: "radio",
        },
        label: {
            description: "label of the dropdown",
            table: { type: { summary: "string" } },
        },
    },
    parameters: {
        docs: {
            story: {
                height: "200px",
            },
            page: () => (
                <>
                    <Markdown>
                        {`# CustomDropdown Component

The CustomDropdown component is a versatile dropdown input that supports autocomplete functionality and manages its open state internally. It leverages the useDropdown hook and DropdownProvider to provide an efficient dropdown experience.

## How to Use CustomDropdown Component

The CustomDropdown component manages the open state for its children using the useDropdown hook. The useDropdown hook returns an object with the following properties:

- **ref**: A React ref object to be attached to the dropdown container. This ref is used to detect click outside events and close the dropdown.
- **selectedValue**: The current selected value from the dropdown.
- **isOpen**: A boolean indicating whether the dropdown is currently open. This state is typically managed internally by the children of the CustomDropdown and is not used directly.
- **open**: A function to open the dropdown.
- **close**: A function to close the dropdown.
- **setSelectedValue**: A function to set the selected value in the dropdown.

### Props

The CustomDropdown component accepts the following props:

- **isAutocomplete** (boolean): Determines whether the input supports autocomplete functionality. Default is false.
- **onClickDropdown** ((e: React.MouseEvent<HTMLDivElement>) => void): A callback function that is called when the dropdown is clicked.
- **value** (string | number): The current value of the dropdown input.
- **onChange** ((e: React.ChangeEvent<HTMLInputElement>) => void): A callback function that is called when the input value changes.
- Additionally, it accepts all props from the Input component.

### Usage Example

Here is an example of how to use the CustomDropdown component:



\`\`\`javascript
import React from "react";
import { DropdownItem, CustomDropdown, useDropdown } from "@deriv-com/quill-ui";

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

    return data.map(({ value, text }) => {
        return (
            <DropdownItem
                onClick={() => handleClick(value)}
                label={text}
                selected={selectedValue == value}
            >
                {text}
            </DropdownItem>
        );
    });
};

const Dropdown = () => {
    return (
        <CustomDropdown isAutoComplete inputSize="md" placeholder="placeholder">
            <Content />
        </CustomDropdown>
    );
};

export default Dropdown;
\`\`\`
`}
                    </Markdown>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Controls />
                    <Stories />
                </>
            ),
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

    return data.map(({ value, text }) => {
        return (
            <DropdownItem
                onClick={() => handleClick(value)}
                label={text}
                selected={selectedValue == value}
            >
                {text}
            </DropdownItem>
        );
    });
};

type Template = React.ComponentProps<typeof CustomDropdown>;

const Template: React.FC<Template> = ({ ...args }: Template) => {
    return (
        <CustomDropdown {...args}>
            <Content />
        </CustomDropdown>
    );
};

export const defaultSnackbar = Template.bind(this) as Story;
defaultSnackbar.args = { ...meta.args };
