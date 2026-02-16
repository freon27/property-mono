import { Directive, input } from '@angular/core';

@Directive({
  selector: '[nkltButton]',
  host: {
    'class': 'nklt-button',
      '[class.nklt-button-primary]': 'semantic() === "primary"',
      '[class.nklt-button-secondary]': 'semantic() === "secondary"',
      '[class.nklt-button-danger]': 'semantic() === "danger"',
  }
})
export class Button {
  semantic = input<'secondary' | 'primary' | 'danger'>('primary');
}
