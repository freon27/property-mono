import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  viewChild,
  viewChildren,
} from '@angular/core';
import { Listbox, Option } from '@angular/aria/listbox';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { OverlayModule } from '@angular/cdk/overlay';
import {Input } from '../input/input';

@Component({
  selector: 'nklt-select',
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxPopup,
    ComboboxPopupContainer,
    Listbox,
    Option,
    OverlayModule,
    Input,
  ],
  host: {
    class: 'nklt-select',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div ngCombobox readonly
         [attr.aria-disabled]="disabled()">

      <div #origin class="nklt-select-input">
        <span class="nklt-combobox-label">
          <span class="nklt-selected-label-text">{{ displayValue() }}</span>
        </span>
        <input
          aria-label="Label dropdown"
          placeholder="Select a labeXl"
          nkltInput
          ngComboboxInput
          [disabled]="disabled()"
          [attr.aria-disabled]="disabled()"
        />
        <span
          class="nklt-example-arrow material-symbols-outlined"
          translate="no"
          aria-hidden="true"
          >arrow_drop_down</span
        >
      </div>

      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlay]="{origin, usePopover: 'inline', matchWidth: true}"
          [cdkConnectedOverlayOpen]="true"
        >
          <div class="nklt-example-popup-container">
            <div ngListbox>
              @for (label of options(); track label.value) {
                <div ngOption [value]="label.value" [label]="label.label">
                  <span class="nklt-example-option-text">{{ label.label }}</span>
                  <span
                    class="nklt-example-option-check material-symbols-outlined"
                    translate="no"
                    aria-hidden="true"
                    >check</span
                  >
                </div>
              }
            </div>
          </div>
        </ng-template>
      </ng-template>
    </div>
  `,
})
export class Select {
  /** The combobox listbox popup. */
  listbox = viewChild<Listbox<string>>(Listbox);
  /** The options available in the listbox. */
  optionsElements = viewChildren<Option<string>>(Option);
  /** A reference to the ng aria combobox. */
  combobox = viewChild<Combobox<string>>(Combobox);
  /** The string that is displayed in the combobox. */
  displayValue = computed(() => {
    const values = this.listbox()?.values() || [];
    return values.length ? values[0] : this.placeholder();
  });

  placeholder = input('Select an option');
  options = input<{ value: string; label: string }[]>([]);
  disabled = input(false);

  constructor() {
    // Scrolls to the active item when the active option changes.
    // The slight delay here is to ensure animations are done before scrolling.
    afterRenderEffect(() => {
      const option = this.optionsElements().find((opt) => opt.active());
      setTimeout(
        () => option?.element.scrollIntoView({ block: 'nearest' }),
        50,
      );
    });
    // Resets the listbox scroll position when the combobox is closed.
    afterRenderEffect(() => {
      if (!this.combobox()?.expanded()) {
        setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
      }
    });
  }
}
