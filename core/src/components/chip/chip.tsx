import { Component, Host, h, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'tds-chip',
  styleUrl: 'chip.scss',
  shadow: false,
  scoped: true,
})
export class TdsChip {
  /** Type of Chip, depends on usage */
  @Prop() type: 'button' | 'radio' | 'checkbox' = 'button';

  /** Size of the Chip component */
  @Prop() size: 'sm' | 'lg' = 'lg';

  /** ID used for internal Chip functionality and events, must be unique.
   *
   * **NOTE**: If you're listening for input events, you need to set this ID yourself to identify the input,
   * as the default ID is random and will be different every time.
   */
  @Prop() chipId: string = crypto.randomUUID();

  /** Controls component's checked attribute. Valid only for type checkbox and radio. */
  @Prop() checked: boolean = false;

  /** Name for the checkbox or radio input element. Also creates a reference between label and input. Valid only for type checkbox and radio. */
  @Prop() name: string;

  /** Value of input. Valid only for type checkbox and radio. */
  @Prop() value: string;

  /** Sends unique Chip identifier and value when it is changed (checked/unchecked).
   * Valid only for type checkbox and radio.
   * If no ID is specified, a random one will be generated.
   * To use this listener, don't use the randomized ID, use a specific one of your choosing. */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsChange: EventEmitter<{
    chipId: string;
    value: string;
  }>;

  private handleChange = () => {
    this.tdsChange.emit({
      chipId: this.chipId,
      value: this.value,
    });
  };

  /** Sends unique Chip identifier when Chip is clicked.
   * Valid only for type button.
   * If no ID is specified, a random one will be generated.
   * To use this listener, don't use the randomized ID, use a specific one of your choosing. */
  @Event({
    eventName: 'tdsClick',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsClick: EventEmitter<{
    chipId: string;
  }>;

  private handleClick = () => {
    this.tdsClick.emit({
      chipId: this.chipId,
    });
  };

  private renderInputAttributes() {
    if (this.type !== 'button') {
      return {
        value: this.value,
        checked: this.checked,
        name: this.name,
        onChange: () => this.handleChange(),
      };
    }
    return {
      onClick: () => this.handleClick(),
    };
  }

  render() {
    const inputAttributes = this.renderInputAttributes();

    return (
      <Host>
        <div class="component">
          <div class={`tds-chip-component ${this.size}`}>
            <input type={this.type} id={this.chipId} {...inputAttributes}></input>
            <label htmlFor={this.chipId}>
              <slot name="label" />
            </label>
          </div>
        </div>
      </Host>
    );
  }
}
