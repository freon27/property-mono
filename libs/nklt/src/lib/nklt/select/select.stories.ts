import type { Meta, StoryObj } from '@storybook/angular';
import { Select } from './select';
import { expect } from 'storybook/test';

const meta: Meta<Select> = {
  component: Select,
  title: 'Select',
};
export default meta;

type Story = StoryObj<Select>;

export const Primary: Story = {
  args: {
    disabled: false,
     options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
    ]
  },
};

