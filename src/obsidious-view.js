
import { html, css, unsafeCSS, LitElement } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { keyed } from 'lit/directives/keyed.js';
import daisyCSS from 'bundle-text:./daisy.css';

import 'swiper/swiper-element-bundle';

/**
 * Determines whether white or black text provides better contrast for a given background color.
 * Uses the YIQ luminance formula for perceived brightness.
*/
function getContrastColor(bgColor) {
    bgColor = bgColor.startsWith('#') ? bgColor.slice(1) : bgColor;

    const components = {
        r: parseInt(bgColor.substring(0, 2), 16),
        g: parseInt(bgColor.substring(2, 4), 16),
        b: parseInt(bgColor.substring(4, 6), 16)
    };

    // Calculate perceived brightness (YIQ formula)
    const brightness = (
        (components.r * 299) +
        (components.g * 587) +
        (components.b * 114)
    ) / 1000;

    // Use a threshold (e.g., 128) to decide between black or white overlay text.
    return brightness >= 128 ? 'black' : 'white';
}

const colors = [
    "#001219",
    "#005f73",
    "#0a9396",
    "#94d2bd",
    "#e9d8a6",
    "#ee9b00",
    "#ca6702",
    "#bb3e03",
    "#ae2012",
    "#9b2226"
];

// const colors = [
//     "#f94144",
//     "#f3722c",
//     "#f8961e",
//     "#f9844a",
//     "#f9c74f",
//     "#90be6d",
//     "#43aa8b",
//     "#4d908e",
//     "#577590",
//     "#277da1"
// ]

// const colors = [
//     "#F4E9CD",
//     "#9DBEBB",
//     "#468189",
//     "#98B592",
//     "#F49D6E",
//     "#F5D6BA",
// ]

export class ObsidiousView extends LitElement {
    static styles = [
        unsafeCSS(daisyCSS),
        css`
            :host {
              display: flex;
              flex-direction: column;
              justify-content: center;
              height: 100%;
              background: none;
              align-items: center;
            }

            :host, [data-theme] {
              font-family: inherit;
              --color-primary: inherit;
              --color-primary-content: inherit;
              background-color: transparent;
            }

            @media (prefers-color-scheme: dark) {
                :host {
                    color: white;
                }
            }

            swiper-container {
              --width: clamp(min(200px, calc(100% - 16px)), 60vmin, 420px);
              --height: calc((4/3) * var(--width));
              aspect-ratio: 3 / 4;
              width: var(--width);
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
              background-color: var(--bg-color);
              color: var(--fg-color, white);
              box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
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
            <div class="top-toolbar" data-theme="${document.body.getAttribute('data-theme')}">
                <button class="btn btn-primary">WTF WHY</button>
                <button class="btn btn-neutral">Random draw</button>
                <label class="label">
                    <input type="checkbox" checked="checked" class="toggle" />
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
                      free-mode='{ "enabled": true, "sticky": true, "minimumVelocity": 100.0 }'>
                         ${repeat(
                             [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                             (value) => value,
                             (value, index) => html`
                                 <swiper-slide
                                   style="--bg-color: ${colors[index % colors.length]}; --fg-color: ${getContrastColor(colors[index % colors.length])};">
                                     <div>Slide ${value}</div>
                                 </swiper-slide>
                             `
                         )}
                    </swiper-container>
                `
            )}
        `;
    }
}
customElements.define('obsidious-view', ObsidiousView);

