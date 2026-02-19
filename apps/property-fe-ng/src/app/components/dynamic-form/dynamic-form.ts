import { Component, effect, input, linkedSignal, signal } from '@angular/core';
import {
  form,
  FormField
} from '@angular/forms/signals';
import { toSchema } from './schema-helpers';
import type { FormFieldConfig } from './dynamic-form.model';
import { JsonPipe } from '@angular/common';
import { Input } from '@property-mono/nklt';
import { property } from '@property-mono/shared';

@Component({
  selector: 'app-dynamic-form',
  imports: [FormField, JsonPipe, Input],
  template: `
    <form>
      @for (fieldConfig of config(); track fieldConfig.name) {

        @let field = $any(dynamicForm)[fieldConfig.name];

        <div>
          <label>{{ fieldConfig.label }}</label>
          
          @if (fieldConfig.type === 'select') {
            <select [formField]="field">
              @for (option of fieldConfig.options; track option.value) {
                <option [value]="option.value">{{ option.label }}</option>
              }
            </select>
          } @else { 
            <input nkltInput [type]="fieldConfig.type" [formField]="field" />
          }
        </div>
      }
    </form>

    
  `,
  styleUrl: './dynamic-form.css',
})
export class DynamicForm<T> {
  config = input.required<FormFieldConfig[]>();

  inputModel = input.required<Record<string, unknown>>();


  // mod = signal<{
  //   propertyName: string;
  //   residentialUnitCount: number;
  //   purchaseDate: string;
  // }>({
  //   propertyName: 'My Property',
  //   residentialUnitCount: 10,
  //   purchaseDate: new Date().toISOString().substring(0, 10)
  // })

  formValue = linkedSignal(() => this.inputModel());

  dynamicForm = form(this.formValue);

  constructor() {



    effect(() => {
    console.log('Form :', this.dynamicForm, this.dynamicForm());

      // console.log('Schema :', toSchema(this.config()));
    });
  }
}
