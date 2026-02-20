import { Component, computed, effect, inject, Injector, input, linkedSignal, output, runInInjectionContext, untracked } from '@angular/core';
import {
  form,
  FormField
} from '@angular/forms/signals';
import { toSchema } from './schema-helpers';
import type { FormFieldConfig } from './dynamic-form.model';
import { JsonPipe } from '@angular/common';
import { Input } from '@property-mono/nklt';

@Component({
  selector: 'app-dynamic-form',
  imports: [FormField, JsonPipe, Input],
  template: `
    <form>
      @for (fieldConfig of config(); track fieldConfig.name) {

        @let field = $any(dynamicForm())[fieldConfig.name];

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
  styles: `
      :host {
        display: contents;
      }
  `
})
export class DynamicForm<T> {
  private injector = inject(Injector);

  config = input.required<FormFieldConfig[]>();

  inputModel = input.required<T>();

  valid = output<boolean>();    

  valueUpdate = output<T>();

  formValue = linkedSignal(() => this.inputModel());

  dynamicForm = computed(() => 
    runInInjectionContext(this.injector, () => 
      untracked(() => form(this.formValue, toSchema(this.config())))
    )
  );

  formValid = computed(() => this.dynamicForm()().valid());

  constructor() {
    effect(() => {
      const currentForm = this.dynamicForm()();
      this.valid.emit(currentForm.valid());
      this.valueUpdate.emit(currentForm.value() as T);
    });
  }
}
