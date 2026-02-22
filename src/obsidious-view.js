
import { html, css, unsafeCSS, LitElement } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { keyed } from 'lit/directives/keyed.js';
import daisyCSS from 'bundle-text:./daisy.css';

import 'swiper/swiper-element-bundle';

export class ObsidiousView extends LitElement {
    static styles = [unsafeCSS(daisyCSS), css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        padding: 12px;
        background: none;
        font-family: inherit;
        align-items: center;
      }

      @media (prefers-color-scheme: dark) {
          :host {
              color: white;
          }
      }

      swiper-container {
        --width: clamp(min(200px, 100%), 60vmin, 420px);
        --height: calc((4/3) * var(--width));
        width: var(--width);
        height: var(--height);
        max-width: calc(var(--width), min(100%));
        max-height: calc(var(--height), min(100%));
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
        user-select: none;
      }

      .swiper-slide::before {
          display: block;
          content: attr("data-text");
      }

      .slide-index-1 {
        background-color: var(--bg-color-1);
        color:            var(--fg-color-1, white);
      }

      .slide-index-2 {
        background-color: var(--bg-color-2);
        color:            var(--fg-color-2, white);
      }

      .slide-index-3 {
        background-color: var(--bg-color-3);
        color:            var(--fg-color-3, white);
      }

      .slide-index-4 {
        background-color: var(--bg-color-4);
        color:            var(--fg-color-4, white);
      }

      .slide-index-5 {
        background-color: var(--bg-color-5);
        color:            var(--fg-color-5, white);
      }

      .slide-index-6 {
        background-color: var(--bg-color-6);
        color:            var(--fg-color-6, white);
      }

      .slide-index-7 {
        background-color: var(--bg-color-7);
        color:            var(--fg-color-7, white);
      }

      .slide-index-8 {
        background-color: var(--bg-color-8);
        color:            var(--fg-color-8, white);
      }

      .slide-index-9 {
        background-color: var(--bg-color-9);
        color:            var(--fg-color-9, white);
      }

      .slide-index-10 {
        background-color: var(--bg-color-10);
        color:            var(--fg-color-10, white);
      }
      .top-toolbar {
          position: absolute;
          top: 16px;
          left: 16px;
          right: 16px;
      }
    `];
    static properties = {
        _effect: { type: Boolean, state: true }
    };
    constructor() {
        super();
        this._effect = "stack";
    }
    handleTouchStart(e) {
        e.stopPropagation();
    }
    handleSelectEffect(e) {
        this._effect = e.target.value;
    }
    render() {
        const effectAttribute = {
            "stack": '',
            "fan":   '{ "slideShadows": true, "perSlideOffset":  40, "perSlideRotate": 40, "rotate": true }',
            "line":  '{ "slideShadows": true, "perSlideOffset": 120, "perSlideRotate":  0, "rotate": false }'
        }[this._effect];
        return html`
            <div class="top-toolbar">
                <button class="btn btn-primary">WTF WHY</button>
                <button>Random draw</button>
                <label>
                    <input type="checkbox" id="sounds-checkbox" />
                    Sounds
                </label>
                <label>Choose a mode:
                    <select @change=${this.handleSelectEffect}>
                        <option value="stack" selected>Stack</option>
                        <option value="fan">Fan</option>
                        <option value="line">Line</option>
                    </select>
                </label>
                <label>[TODO default running timer controls]</label>
                <a href="https://freefrontend.com/css-code-examples/">Effect Ex.</a>
                Pico.
                Sounds.
                Fix card effect bug when loop=true by looking at swiper code.
                Music for different states.
            </div>
            ${keyed(
                JSON.stringify([this._effect]),
                html`
                    <swiper-container
                      keyboard="true"
                      effect="cards"
                      grab-cursor="true"
                      cards-effect='${effectAttribute}'
                      mousewheel='{ "enabled": true, "releaseOnEdges": false }'
                      free-mode='{ "enabled": true, "sticky": true, "minimumVelocity": 100.0 }'
                      @touchstart=${this.handleTouchStart}>
                         ${repeat(
                             [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                             value => value,
                             value => html`
                                 <swiper-slide class="slide-index-${value}"><div>Slide ${value}</div></swiper-slide>
                             `
                         )}
                    </swiper-container>
                `
            )}
        `;
    }
}
customElements.define('obsidious-view', ObsidiousView);

