
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
        width: 240px;
        height: 320px;
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
        background-color: #F26076;
      }

      swiper-slide:nth-child(2n) {
        background-color: #FF9760;
      }

      swiper-slide:nth-child(3n) {
        background-color: #FFD150;
      }

      swiper-slide:nth-child(4n) {
        background-color: #458B73;
      }

      swiper-slide:nth-child(5n) {
        background-color: rgb(118, 163, 12);
      }

      swiper-slide:nth-child(6n) {
        background-color: rgb(180, 10, 47);
      }

      swiper-slide:nth-child(7n) {
        background-color: rgb(35, 99, 19);
      }

      swiper-slide:nth-child(8n) {
        background-color: rgb(0, 68, 255);
      }

      swiper-slide:nth-child(9n) {
        background-color: rgb(218, 12, 218);
      }

      swiper-slide:nth-child(10n) {
        background-color: rgb(54, 94, 77);
      }
  `;

  render() {
    return html`
        <swiper-container effect="cards" grab-cursor="true">
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
        </swiper-container>
    `;
  }
}

customElements.define('obsidious-view', ObsidiousView);

