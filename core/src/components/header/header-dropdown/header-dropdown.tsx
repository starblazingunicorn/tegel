import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core';

@Component({
  tag: 'tds-header-dropdown',
  styleUrl: 'header-dropdown.scss',
  shadow: true,
})
export class TdsHeaderDropdown {
  @Element() host: HTMLElement;

  /** The label of the button that opens the dropdown.
   * This is an alternative to the button-label slot. */
  @Prop() buttonLabel: string;

  /** If the dropdown icon (downwards chevron) should be hidden. */
  @Prop() noDropdownIcon: boolean = false;

  /** If the button that opens the dropdown should appear selected. */
  @Prop() selected: boolean = false;

  @State() open: boolean = false;

  @State() buttonEl?: HTMLButtonElement;

  private uuid: string = crypto.randomUUID();

  @Listen('click', { target: 'document' })
  onAnyClick(event: MouseEvent) {
    // Source: https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component/
    const isClickOutside = !event.composedPath().includes(this.host as any);
    if (isClickOutside) {
      this.open = false;
    }
  }

  toggleDropdown() {
    this.open = !this.open;
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'state-open': this.open,
          }}
        >
          <tds-header-item class="button" active={this.open} selected={this.selected}>
            <button
              ref={(el) => {
                this.buttonEl = el;
              }}
              aria-expanded={`${this.open}`}
              aria-controls={`launcher-${this.uuid}`}
              aria-current={this.selected ? 'location' : 'false'}
              onClick={() => {
                this.toggleDropdown();
              }}
            >
              <slot name="button-icon"></slot>
              {this.buttonLabel}
              <slot name="button-label"></slot>
              {!this.noDropdownIcon && (
                <tds-icon class="dropdown-icon" name="chevron_down" size="16px"></tds-icon>
              )}
            </button>
          </tds-header-item>
          {this.buttonEl && (
            <tds-popover-canvas
              id={`tds-dropdown-${this.uuid}`}
              class="menu"
              referenceEl={this.buttonEl}
              placement="bottom-start"
              show={this.open}
              offsetDistance={0}
              modifiers={[
                {
                  name: 'flip',
                  options: {
                    fallbackPlacements: [],
                  },
                },
              ]}
            >
              <slot></slot>
            </tds-popover-canvas>
          )}
        </div>
      </Host>
    );
  }
}
