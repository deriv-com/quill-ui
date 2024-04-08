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

const Template = (args) => <RadioButton {...args}>Option</ RadioButton>;

export const Default = Template.bind({});
Default.args = {
  defaultChecked: true,
  disabled: false,
  has_info: false,
  id: "radio-1",
  className: "",
  classNameLabel: "",
  classNameInfo: "",
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  ...Default.args,
  defaultChecked: false,
};

export const CustomClassButton = Template.bind({});
CustomClassButton.args = {
  ...Default.args,
  className: "custom-radio",
};

export const CustomLabelClassButton = Template.bind({});
CustomLabelClassButton.args = {
  ...Default.args,
  classNameLabel: "custom-label",
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  ...Default.args,
  disabled: true,
};

export const ButtonWithInfo = Template.bind({});
ButtonWithInfo.args = {
  ...Default.args,
  has_info: true,
};
