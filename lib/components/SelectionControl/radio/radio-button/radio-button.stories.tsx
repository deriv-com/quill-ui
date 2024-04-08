import React from "react";
import RadioButton from "./index";

const RadioButtonMeta = {
  title: "Components/Selection control/Radio/RadioButton",
  component: RadioButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    id: {
      description: "Unique identifier for the radio button element.",
    },
    defaultChecked: {
      description: "Sets the initial checked state of the radio button.",
      control: { type: "boolean" },
    },
    disabled: {
      description: "Disables the radio button interaction.",
      control: { type: "boolean" },
    },
    has_info: {
      description: "Displays informational content next to the radio button.",
      control: { type: "boolean" },
    },
    className: {
      description: "CSS class name applied to the radio button element.",
    },
    classNameLabel: {
      description: "CSS class name applied to the radio button label.",
    },
    classNameInfo: {
      description: "CSS class name applied to the informational content.",
    },
  },
  description: 'The RadioButton component is used to create radio button elements for user selection within a group.',
};

export default RadioButtonMeta;

interface RadioButtonProps {
  defaultChecked: boolean;
  disabled: boolean;
  has_info: boolean;
  id: string;
  className: string;
  classNameLabel: string;
  classNameInfo: string;
}

const Template: React.FC<RadioButtonProps> = (args) => <RadioButton {...args}>Option</RadioButton>;

const defaultArgs: RadioButtonProps = {
  defaultChecked: true,
  disabled: false,
  has_info: false,
  id: "radio-1",
  className: "",
  classNameLabel: "",
  classNameInfo: "",
};

export const Default = Template.bind(this, defaultArgs);

export const Unchecked = Template.bind(this, {
  ...defaultArgs,
  defaultChecked: false,
});

export const CustomClassButton = Template.bind(this, {
  ...defaultArgs,
  className: "custom-radio",
});

export const CustomLabelClassButton = Template.bind(this, {
  ...defaultArgs,
  classNameLabel: "custom-label",
});

export const DisabledButton = Template.bind(this, {
  ...defaultArgs,
  disabled: true,
});

export const ButtonWithInfo = Template.bind(this, {
  ...defaultArgs,
  has_info: true,
});
