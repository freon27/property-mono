import type { Meta, StoryObj } from '@storybook/angular';
import { Card } from './card';
import { expect } from 'storybook/test';

const meta: Meta<Card> = {
  component: Card,
  title: 'Card',
};
export default meta;

type Story = StoryObj<Card>;

export const Primary: Story = {
  args: {},
  render: (args) => ({
    template: `
      <div nkltCard>
        <h2>Card Title</h2>
        <p>This is a simple card component.</p>
      </div>
    `,
    props: args,
  }),
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/card/gi)).toBeTruthy();
  },
};
