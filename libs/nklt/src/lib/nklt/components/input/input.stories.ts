import type { Meta, StoryObj } from '@storybook/angular';
import { Input } from './input';

const meta: Meta = {
  title: 'Input',
  decorators: [],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};
export default meta;

type Story = StoryObj;

export const Text: Story = {
  args: {
    disabled: false,
    placeholder: 'Enter text...',
  },
  render: (args) => ({
    moduleMetadata: {
      imports: [Input],
    },
    props: args,
    template: `<input nkltInput type="text" [placeholder]="placeholder" [disabled]="disabled" />`,
  }),
};

export const Email: Story = {
  args: {
    disabled: false,
    placeholder: 'email@example.com',
  },
  render: (args) => ({
    moduleMetadata: {
      imports: [Input],
    },
    props: args,
    template: `<input nkltInput type="email" [placeholder]="placeholder" [disabled]="disabled" />`,
  }),
};

export const Password: Story = {
  args: {
    disabled: false,
    placeholder: 'Enter password...',
  },
  render: (args) => ({
    moduleMetadata: {
      imports: [Input],
    },
    props: args,
    template: `<input nkltInput type="password" [placeholder]="placeholder" [disabled]="disabled" />`,
  }),
};

export const Number: Story = {
  args: {
    disabled: false,
    placeholder: '0',
  },
  render: (args) => ({
    moduleMetadata: {
      imports: [Input],
    },
    props: args,
    template: `<input nkltInput type="number" [placeholder]="placeholder" [disabled]="disabled" />`,
  }),
};

export const Date: Story = {
  args: {
    disabled: false,
  },
  render: (args) => ({
    moduleMetadata: {
      imports: [Input],
    },
    props: args,
    template: `<input nkltInput type="date" [disabled]="disabled" />`,
  }),
};
