import { Component, h, Prop, Event, EventEmitter, Element, State, Host } from '@stencil/core';

@Component({
  tag: 'tds-card',
  styleUrl: 'card.scss',
  shadow: true,
})
export class TdsCard {
  /** Variant of the Card based on the theme used. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Placement of the header */
  @Prop() headerPlacement: 'above' | 'below' = 'above';

  /** Text in the header */
  @Prop() header: string;

  /** Subheader text in the header */
  @Prop() subheader: string;

  /** Header image src */
  @Prop() headerImg: string;

  /** Alt text for the header image */
  @Prop() headerImgAlt: string;

  /** Body image src */
  @Prop() bodyImg: string;

  /** Alt text for the body image */
  @Prop() bodyImgAlt: string;

  /** Divider for the body */
  @Prop() bodyDivider: boolean = false;

  /** Makes the Card clickable. */
  @Prop() clickable: boolean = false;

  /** ID for the Card, must be unique.
   *
   * **NOTE**: If you're listening for Card events, you need to set this ID yourself to identify the Card,
   * as the default ID is random and will be different every time.
   */
  @Prop() cardId: string = crypto.randomUUID();

  /** Sends unique Card identifier when the Card is clicked, if clickable=true */
  @Event({
    eventName: 'tdsClick',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsClick: EventEmitter<{
    cardId: string;
  }>;

  @Element() hostElement: HTMLTdsCardElement;

  @State() hasCardBottomSlot: boolean = false;

  @State() hasCardBodySlot: boolean = false;

  connectedCallback() {
    this.hasCardBottomSlot = !!this.hostElement.querySelector('[slot="card-bottom"]');
    this.hasCardBodySlot = !!this.hostElement.querySelector('[slot="card-body"]');
  }

  handleClick = () => {
    this.tdsClick.emit({
      cardId: this.cardId,
    });
  };

  getCardContent = () => (
    <div>
      {this.headerPlacement === 'above' && (
        <div class={`card-top ${this.headerPlacement}`}>
          {this.headerImg && (
            <img class={`card-top-image`} src={this.headerImg} alt={this.headerImgAlt} />
          )}{' '}
          <div
            class={`
          card-top-header
          ${!this.headerImg ? 'no-header-img' : ''}
          ${!this.header || !this.subheader ? 'single-line-header' : ''}
          `}
          >
            <span class={`card-header`}>{this.header}</span>
            <span class={`card-subheader`}>{this.subheader}</span>
          </div>
        </div>
      )}
      <div class={`card-body`}>
        {this.bodyImg && <img class={`card-body-img`} src={this.bodyImg} alt={this.bodyImgAlt} />}
        {this.headerPlacement === 'below' && (this.headerImg || this.header || this.subheader) && (
          <div class={`card-top ${this.headerPlacement}`}>
            {this.headerImg && (
              <img class={`card-top-image`} src={this.headerImg} alt={this.headerImgAlt} />
            )}
            <div
              class={`
            card-top-header
            ${!this.headerImg ? 'no-header-img' : ''}
            ${!this.header || !this.subheader ? 'single-line-header' : ''}
            `}
            >
              <span class={`card-header`}>{this.header}</span>
              <span class={`card-subheader`}>{this.subheader}</span>
            </div>
          </div>
        )}
        {this.bodyDivider && <tds-divider></tds-divider>}
        <slot name="card-body"></slot>
      </div>
      <div class={`card-bottom`}>
        {this.hasCardBottomSlot && <slot name={`card-bottom`}></slot>}
      </div>
    </div>
  );

  render() {
    return (
      <Host class={this.modeVariant && `tds-mode-variant-${this.modeVariant}`}>
        {this.clickable ? (
          <button
            class={`card ${this.clickable ? 'clickable' : ''} ${this.headerPlacement}`}
            onClick={() => {
              if (this.clickable) {
                this.handleClick();
              }
            }}
          >
            {this.getCardContent()}
          </button>
        ) : (
          <div class={`card ${this.clickable ? 'clickable' : ''} ${this.headerPlacement}`}>
            {this.getCardContent()}
          </div>
        )}
      </Host>
    );
  }
}
