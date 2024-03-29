import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ToggleSwitch, { SwitchToggleProps } from '.';
import './toggle-switch.scss';

export default {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
} as Meta;

const Template: StoryFn<SwitchToggleProps> = (args) => <ToggleSwitch {...args} />;

export const Enabled = Template.bind({});
Enabled.args = {
  disabled: false,
  defaultChecked: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  defaultChecked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  disabled: false,
  defaultChecked: true,
};
