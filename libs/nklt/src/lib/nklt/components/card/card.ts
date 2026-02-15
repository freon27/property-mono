import { Component } from '@angular/core';

@Component({
  selector: '[nkltCard]',
  host: {
    'class': 'nklt-card'
  },
  template: `
    <ng-content></ng-content>
  `
})
export class Card {
}
