import { Component, Host, h, Prop, State, Element, Event } from '@stencil/core';
import { EventEmitter, Method } from '@stencil/core/internal';
import { TdsCheckboxCustomEvent } from '../../../components';

@Component({
  tag: 'tds-dropdown-option-v2',
  styleUrl: 'dropdown-option-v2.scss',
  shadow: {
    delegatesFocus: true,
  },
})
export class TdsDropdownOptionV2 {
  @Element() host: HTMLElement;

  /** Value for the Dropdown option. */
  @Prop() value: string;

  /** Sets the option as disabled. */
  @Prop() disabled: boolean = false;

  @State() selected: boolean = false;

  @State() multiselect: boolean;

  @State() size: 'sm' | 'md' | 'lg' = 'lg';

  private parentElement: HTMLTdsDropdownV2Element;

  private label: string;

  /** Method to select/deselect an option if the option is not disabled. */
  @Method()
  async setSelected(selected: boolean) {
    if (!this.disabled) {
      this.selected = selected;
    }
  }

  /** Click event for the Dropdown option. */
  @Event({
    eventName: 'tdsSelect',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsSelect: EventEmitter<{
    selected: boolean;
    value: string;
  }>;

  /** Focus event for the Dropdown option. */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus: EventEmitter<FocusEvent>;

  /** Blur event for the Dropdown option. */
  @Event({
    eventName: 'tdsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsBlur: EventEmitter<FocusEvent>;

  connectedCallback = () => {
    this.parentElement =
      this.host.parentElement.tagName === 'TDS-DROPDOWN-V2'
        ? (this.host.parentElement as HTMLTdsDropdownV2Element)
        : ((this.host.getRootNode() as ShadowRoot).host as HTMLTdsDropdownV2Element);
    this.multiselect = this.parentElement.multiselect;
    this.size = this.parentElement.size;
    this.label = this.host.textContent.trim();
  };

  handleSingleSelect = () => {
    if (!this.disabled) {
      this.selected = true;
      this.parentElement.setValue(this.value, this.label);
      this.parentElement.close();
      this.tdsSelect.emit({
        value: this.value,
        selected: this.selected,
      });
    }
  };

  handleMultiselect = (
    event: TdsCheckboxCustomEvent<{ checkboxId: string; checked: boolean; value?: string }>,
  ) => {
    if (!this.disabled) {
      if (event.detail.checked) {
        this.parentElement.setValue(this.value, this.label);
        this.selected = true;
        this.tdsSelect.emit({
          value: this.value,
          selected: this.selected,
        });
      } else {
        this.parentElement.removeValue(this.value);
        this.selected = false;
        this.tdsSelect.emit({
          value: this.value,
          selected: this.selected,
        });
      }
    }
  };

  handleFocus = (event) => {
    this.tdsFocus.emit(event);
  };

  handleBlur = (event) => {
    this.tdsBlur.emit(event);
  };

  render() {
    return (
      <Host role="option" aria-disabled={this.disabled} aria-selected={this.selected}>
        <div
          class={`dropdown-option 
          ${this.size}
          ${this.selected ? 'selected' : ''}
          ${this.disabled ? 'disabled' : ''}
          `}
        >
          {this.multiselect ? (
            <div
              class="multiselect"
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  this.parentElement.close();
                }
              }}
            >
              <tds-checkbox
                onTdsChange={(event) => {
                  this.handleMultiselect(event);
                }}
                disabled={this.disabled}
                checked={this.selected}
              >
                <div slot="label">
                  <slot></slot>
                </div>
              </tds-checkbox>
            </div>
          ) : (
            <button
              onClick={() => {
                this.handleSingleSelect();
              }}
              onFocus={(event) => this.handleFocus(event)}
              onBlur={(event) => this.handleBlur(event)}
              disabled={this.disabled}
            >
              <div class="single-select">
                <slot></slot>
                {this.selected && <tds-icon name="tick" size="16px"></tds-icon>}
              </div>
            </button>
          )}
        </div>
      </Host>
    );
  }
}
