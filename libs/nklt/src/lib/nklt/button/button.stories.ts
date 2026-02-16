import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta = {
  title: 'Button',
  decorators: [],
  argTypes: {
    semantic: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Button semantic variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
};
export default meta;

type Story = StoryObj;

export const Primary: Story = {
  args: {
    semantic: 'primary',
    disabled: false,
  },
  render: (args) => ({
    moduleMetadata: {
      imports: [Button],
    },
    props: args,
    template: `<button nkltButton [semantic]="semantic" [disabled]="disabled">Primary Button</button>`,
  }),
};

export const Secondary: Story = {
  args: {
    semantic: 'secondary',
    disabled: false,
  },
  render: (args) => ({
    moduleMetadata: {
      imports: [Button],
    },
    props: args,
    template: `<button nkltButton [semantic]="semantic" [disabled]="disabled">Secondary Button</button>`,
  }),
};


export const Danger: Story = {
  args: {
    semantic: 'danger',
    disabled: false,
  },
  render: (args) => ({
    moduleMetadata: {
      imports: [Button],
    },
    props: args,
    template: `<button nkltButton [semantic]="semantic" [disabled]="disabled">Danger Button</button>`,
  }),
};
