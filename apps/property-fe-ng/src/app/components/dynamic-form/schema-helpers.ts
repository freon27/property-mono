import {
  maxLength,
  minLength,
  required,
  Schema,
  schema,
} from '@angular/forms/signals';
import { FormFieldConfig } from './dynamic-form.model';

export function toSchema<T>(meta: FormFieldConfig[]): Schema<T> {
  return schema<T>((path) => {
    for (const fieldDef of meta) {
      const prop = fieldDef.name;
      const fieldPath = (path as any)[prop];

      if (!fieldPath) {
        continue;
      }
      if (fieldDef.required) {
        required(fieldPath);
      }
      if (
        'minLength' in fieldDef &&
        typeof fieldDef.minLength === 'number'
      ) {
        minLength(fieldPath, fieldDef.minLength);
      }
      if (
        'maxLength' in fieldDef &&
        typeof fieldDef.maxLength === 'number'
      ) {
        maxLength(fieldPath, fieldDef.maxLength);
      }
    }
  });
}
