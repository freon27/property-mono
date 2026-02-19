import { Directive } from '@angular/core';

@Directive({
  selector: '[nkltCard]',
  host: {
    'class': 'nklt-card'
  }
})
export class Card {
}
