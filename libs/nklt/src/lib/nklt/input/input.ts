import { Directive } from '@angular/core';

@Directive({
  selector: '[nkltInput]',
  host: {
    'class': 'nklt-input',
  }
})
export class Input {
}
