import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormField } from './form-field';
import { Select } from '../select/select';
import { Input } from '../input/input';

const meta: Meta<FormField> = {
  title: 'Components/FormField',
  component: FormField,
  decorators: [
    moduleMetadata({
      imports: [
        Input,
        Select,
      ],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<FormField>;

export const WithInput: Story = {
  args: {
    label: 'Email Address',
    hint: 'We will never share your email',
  },
  render: (args) => ({
    props: args,
    template: `
      <nklt-form-field 
        [label]="label" 
        [hint]="hint"
        [error]="error"
        [required]="required"
        [disabled]="disabled">
        <input nkltInput type="email" placeholder="Enter your email" [disabled]="disabled" />
      </nklt-form-field>
    `,
  }),
};

export const WithSelect: Story = {
  args: {
    label: 'Country',
    hint: 'Select your country of residence',
  },
  render: (args) => ({
    props: args,
    template: `
      <nklt-form-field 
        [label]="label" 
        [hint]="hint"
        [error]="error"
        [required]="required"
        [disabled]="disabled">
        <nklt-select 
          placeholder="Choose a country"
          [disabled]="disabled"
          [options]="[{value: 'us', label: 'United States'}, {value: 'uk', label: 'United Kingdom'}, {value: 'ca', label: 'Canada'}]">
        </nklt-select>
      </nklt-form-field>
    `,
  }),
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    hint: 'Enter your first and last name',
    required: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <nklt-form-field 
        [label]="label" 
        [hint]="hint"
        [error]="error"
        [required]="required"
        [disabled]="disabled">
        <input nkltInput type="text" placeholder="John Doe" />
      </nklt-form-field>
    `,
  }),
};

export const WithError: Story = {
  args: {
    label: 'Password',
    error: 'Password must be at least 8 characters',
    required: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <nklt-form-field 
        [label]="label" 
        [hint]="hint"
        [error]="error"
        [required]="required"
        [disabled]="disabled">
        <input nkltInput type="password" placeholder="Enter password" />
      </nklt-form-field>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Email Address',
    hint: 'This field is disabled',
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <nklt-form-field 
        [label]="label" 
        [hint]="hint"
        [error]="error"
        [required]="required"
        [disabled]="disabled">
        <input nkltInput type="email" placeholder="email@example.com" [disabled]="disabled" />
      </nklt-form-field>
    `,
  }),
};

export const WithoutLabel: Story = {
  args: {
    hint: 'Search for something...',
  },
  render: (args) => ({
    props: args,
    template: `
      <nklt-form-field 
        [hint]="hint"
        [error]="error"
        [disabled]="disabled">
        <input nkltInput type="search" placeholder="Search" />
      </nklt-form-field>
    `,
  }),
};

export const Multiple: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <nklt-form-field 
          label="First Name" 
          hint="Enter your first name"
          required="true">
          <input nkltInput type="text" placeholder="John" />
        </nklt-form-field>

        <nklt-form-field 
          label="Last Name" 
          hint="Enter your last name"
          required="true">
          <input nkltInput type="text" placeholder="Doe" />
        </nklt-form-field>

        <nklt-form-field 
          label="Email" 
          error="Please enter a valid email address"
          required="true">
          <input nkltInput type="email" placeholder="john.doe@example.com" />
        </nklt-form-field>

        <nklt-form-field 
          label="Country" 
          hint="Select your country">
          <nklt-select 
            placeholder="Choose a country"
            [options]="[{value: 'us', label: 'United States'}, {value: 'uk', label: 'United Kingdom'}]">
          </nklt-select>
        </nklt-form-field>
      </div>
    `,
  }),
};
