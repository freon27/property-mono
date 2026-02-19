import { Directive } from '@angular/core';

@Directive({
  selector: '[nkltLabel]',
  host: {
    'class': 'nklt-label'
  }
})
export class Label {}
