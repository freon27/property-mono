// Base configuration shared by all form fields
export interface FormFieldConfigBase {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  hint?: string;
  defaultValue?: any;
  validators?: FieldValidator[];
}

// Validation configuration
export interface FieldValidator {
  type: 'required' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern' | 'email' | 'custom';
  value?: any;
  message?: string;
}

// Option type for select, radio, and checkbox group fields
export interface FieldOption {
  label: string;
  value: any;
  disabled?: boolean;
}

// Text input field
export interface TextInputField extends FormFieldConfigBase {
  type: 'text';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  autocomplete?: string;
}

// Email input field
export interface EmailInputField extends FormFieldConfigBase {
  type: 'email';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

// Password input field
export interface PasswordInputField extends FormFieldConfigBase {
  type: 'password';
  minLength?: number;
  maxLength?: number;
  showPasswordToggle?: boolean;
}

// Number input field
export interface NumberInputField extends FormFieldConfigBase {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

// Tel input field
export interface TelInputField extends FormFieldConfigBase {
  type: 'tel';
  pattern?: string;
}

// URL input field
export interface UrlInputField extends FormFieldConfigBase {
  type: 'url';
  pattern?: string;
}

// Textarea field
export interface TextareaField extends FormFieldConfigBase {
  type: 'textarea';
  rows?: number;
  cols?: number;
  minLength?: number;
  maxLength?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

// Select dropdown field
export interface SelectField extends FormFieldConfigBase {
  type: 'select';
  options: FieldOption[];
  multiple?: boolean;
  searchable?: boolean;
}

// Radio button group field
export interface RadioField extends FormFieldConfigBase {
  type: 'radio';
  options: FieldOption[];
  layout?: 'horizontal' | 'vertical';
}

// Checkbox field (single)
export interface CheckboxField extends FormFieldConfigBase {
  type: 'checkbox';
  checkboxLabel?: string;
}

// Checkbox group field (multiple)
export interface CheckboxGroupField extends FormFieldConfigBase {
  type: 'checkbox-group';
  options: FieldOption[];
  layout?: 'horizontal' | 'vertical';
  minSelected?: number;
  maxSelected?: number;
}

// Date input field
export interface DateInputField extends FormFieldConfigBase {
  type: 'date';
  min?: string | Date;
  max?: string | Date;
  format?: string;
}

// Time input field
export interface TimeInputField extends FormFieldConfigBase {
  type: 'time';
  min?: string;
  max?: string;
  step?: number;
}

// Datetime input field
export interface DateTimeInputField extends FormFieldConfigBase {
  type: 'datetime';
  min?: string | Date;
  max?: string | Date;
  format?: string;
}

// File upload field
export interface FileInputField extends FormFieldConfigBase {
  type: 'file';
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
}

// Hidden field
export interface HiddenField extends Omit<FormFieldConfigBase, 'label'> {
  type: 'hidden';
  label?: string;
}

// Discriminated union of all field types
export type FormFieldConfig =
  | TextInputField
  | EmailInputField
  | PasswordInputField
  | NumberInputField
  | TelInputField
  | UrlInputField
  | TextareaField
  | SelectField
  | RadioField
  | CheckboxField
  | CheckboxGroupField
  | DateInputField
  | TimeInputField
  | DateTimeInputField
  | FileInputField
  | HiddenField;

// Helper type to extract field type from config
export type FieldType = FormFieldConfig['type'];

// Helper type to get config for a specific field type
export type ConfigForFieldType<T extends FieldType> = Extract<FormFieldConfig, { type: T }>;

// Form group configuration
export interface FormGroupConfig {
  fields: FormFieldConfig[];
  submitLabel?: string;
  resetLabel?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
}