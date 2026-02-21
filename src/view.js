
require('./swiper-element-bundle.min.js');
const { html, css, LitElement } = require('./lit-core.min.js');

export class ObsidiousView extends LitElement {
  static styles = css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
      }

      swiper-container {
        width: 270px;
        height: 360px;
        --bg-color-1:  #960D46;
        --bg-color-2:  #3F3F78;
        --bg-color-3:  #98B592; --fg-color-3:  black;
        --bg-color-4:  #F5D6BA; --fg-color-4:  black;
        --bg-color-5:  #F49D6E; --fg-color-5:  black;
        --bg-color-6:  #1b4b4b;
        --bg-color-7:  #5a293c;
        --bg-color-8:  #468189;
        --bg-color-9:  #9DBEBB; --fg-color-9:  black;
        --bg-color-10: #F4E9CD; --fg-color-10: black;
      }

      swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 18px;
        font-size: 22px;
        font-weight: bold;
        color: #fff;
      }

      swiper-slide:nth-child(1n) {
        background-color: var(--bg-color-1);
        color:            var(--fg-color-1, white);
      }

      swiper-slide:nth-child(2n) {
        background-color: var(--bg-color-2);
        color:            var(--fg-color-2, white);
      }

      swiper-slide:nth-child(3n) {
        background-color: var(--bg-color-3);
        color:            var(--fg-color-3, white);
      }

      swiper-slide:nth-child(4n) {
        background-color: var(--bg-color-4);
        color:            var(--fg-color-4, white);
      }

      swiper-slide:nth-child(5n) {
        background-color: var(--bg-color-5);
        color:            var(--fg-color-5, white);
      }

      swiper-slide:nth-child(6n) {
        background-color: var(--bg-color-6);
        color:            var(--fg-color-6, white);
      }

      swiper-slide:nth-child(7n) {
        background-color: var(--bg-color-7);
        color:            var(--fg-color-7, white);
      }

      swiper-slide:nth-child(8n) {
        background-color: var(--bg-color-8);
        color:            var(--fg-color-8, white);
      }

      swiper-slide:nth-child(9n) {
        background-color: var(--bg-color-9);
        color:            var(--fg-color-9, white);
      }

      swiper-slide:nth-child(10n) {
        background-color: var(--bg-color-10);
        color:            var(--fg-color-10, white);
      }
  `;

  handleTouchStart(e) {
      e.stopPropagation();
  }

  render() {
    return html`
        <swiper-container effect="cards" grab-cursor="true" @touchstart=${this.handleTouchStart}>
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide>
            <swiper-slide>Slide 6</swiper-slide>
            <swiper-slide>Slide 7</swiper-slide>
            <swiper-slide>Slide 8</swiper-slide>
            <swiper-slide>Slide 9</swiper-slide>
            <swiper-slide>Slide 10</swiper-slide>
        </swiper-container>
    `;
  }
}

customElements.define('obsidious-view', ObsidiousView);

