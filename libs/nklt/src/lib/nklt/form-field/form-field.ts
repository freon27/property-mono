import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  contentChild, 
  ElementRef, 
  effect,
  Renderer2,
  inject,
  signal
} from '@angular/core';
import { NgControl } from '@angular/forms';

let nextUniqueId = 0;

@Component({
  selector: 'nklt-form-field',
  template: `
    <div class="nklt-form-field-wrapper">
      @if (label()) {
        <label 
          class="nklt-form-field-label" 
          [attr.id]="labelId()"
          [attr.for]="controlId()">
          {{ label() }}
          @if (required()) {
            <span class="nklt-form-field-required" aria-hidden="true">*</span>
          }
        </label>
      }
      
      <div class="nklt-form-field-content">
        <ng-content />
      </div>
      
      @if (hint() && !hasError()) {
        <div 
          class="nklt-form-field-hint" 
          [attr.id]="hintId()"
          role="status"
          aria-live="polite">
          {{ hint() }}
        </div>
      }
      
      @if (error() && hasError()) {
        <div 
          class="nklt-form-field-error" 
          [attr.id]="errorId()"
          role="alert"
          aria-live="assertive">
          {{ error() }}
        </div>
      }
    </div>
  `,
  host: {
    'class': 'nklt-form-field',
    '[class.nklt-form-field-invalid]': 'hasError()',
    '[class.nklt-form-field-disabled]': 'disabled()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField {
  private renderer = inject(Renderer2);
  private hostElement = inject(ElementRef);
  
  label = input<string>();
  hint = input<string>();
  error = input<string>();
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  
  // Generate unique IDs for ARIA associations
  private uniqueId = `nklt-form-field-${++nextUniqueId}`;
  protected labelId = signal(`${this.uniqueId}-label`);
  protected controlId = signal(`${this.uniqueId}-control`);
  protected hintId = signal(`${this.uniqueId}-hint`);
  protected errorId = signal(`${this.uniqueId}-error`);
  
  // Optional: detect form control for automatic error state
  private ngControl = contentChild(NgControl);
  
  constructor() {
    // Update ARIA attributes on the projected form control
    effect(() => {
      const control = this.getFormControlElement();
      if (!control) return;
      
      // Set id if not already set
      if (!control.id) {
        this.renderer.setAttribute(control, 'id', this.controlId());
      } else {
        this.controlId.set(control.id);
      }
      
      // Set aria-labelledby
      if (this.label()) {
        this.renderer.setAttribute(control, 'aria-labelledby', this.labelId());
      }
      
      // Set aria-describedby
      const describedBy: string[] = [];
      if (this.hint() && !this.hasError()) {
        describedBy.push(this.hintId());
      }
      if (this.error() && this.hasError()) {
        describedBy.push(this.errorId());
      }
      if (describedBy.length > 0) {
        this.renderer.setAttribute(control, 'aria-describedby', describedBy.join(' '));
      } else {
        this.renderer.removeAttribute(control, 'aria-describedby');
      }
      
      // Set aria-required
      if (this.required()) {
        this.renderer.setAttribute(control, 'aria-required', 'true');
      } else {
        this.renderer.removeAttribute(control, 'aria-required');
      }
      
      // Set aria-invalid
      if (this.hasError()) {
        this.renderer.setAttribute(control, 'aria-invalid', 'true');
      } else {
        this.renderer.removeAttribute(control, 'aria-invalid');
      }
      
      // Set disabled
      if (this.disabled()) {
        this.renderer.setAttribute(control, 'disabled', 'true');
      } else {
        this.renderer.removeAttribute(control, 'disabled');
      }
    });
  }
  
  hasError(): boolean {
    const control = this.ngControl();
    return !!(this.error() || (control && control.invalid && control.touched));
  }
  
  private getFormControlElement(): HTMLElement | null {
    const contentElement = this.hostElement.nativeElement.querySelector('.nklt-form-field-content');
    if (!contentElement) return null;
    
    // Look for common form control elements
    return contentElement.querySelector('input, select, textarea') as HTMLElement | null;
  }
}
