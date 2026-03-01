
import { html, unsafeCSS, LitElement } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { keyed } from 'lit/directives/keyed.js';
import { play, circlePause, rocket, dice, volumeOn, volumeOff } from './literals/icons.js';
import * as styles from 'bundle-text:./obsidious-view.css';

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
    "#001d29",
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

export class ObsidiousView extends LitElement {
    static styles = [ unsafeCSS(styles) ];
    static properties = {
        _effect: { type: String, state: true },
        _theme:  { type: String, state: true },
    };
    constructor() {
        super();
        this._effect = "stack";
        this._theme = "default";
    }
    render() {
        const swiperElementKey = JSON.stringify([this._effect]);
        const isEmbedded = document.documentElement.classList.contains("embedded");
        return html`
            ${this._effect !== "list" ? keyed(
                swiperElementKey,
                html`
                    <swiper-container
                      keyboard="true"
                      effect='${this._effect === 'slider' ? 'slider' : 'cards'}'
                      grab-cursor="true"
                      cards-effect='${this._effect === 'line' ? '{ "slideShadows": true, "perSlideOffset": 130, "perSlideRotate":  0, "rotate": false }' : ''}'
                      mousewheel='{ "enabled": true, "releaseOnEdges": false }'
                      free-mode='{ "enabled": true, "sticky": true, "minimumVelocity": 100.0 }'>
                         ${repeat(
                             [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                             (value) => value,
                             (value, index) => html`
                                 <swiper-slide
                                   style="--bg-color: ${colors[index % colors.length]}; --fg-color: ${getContrastColor(colors[index % colors.length])};">
                                     <div class="slide-content">Slide ${value}</div>
                                 </swiper-slide>
                             `
                         )}
                    </swiper-container>
                `
            ) : html`
                <div class="todo-list-wrapper">
                    <ul class="bg-base-100 shadow-md todo-list w-full">
                        ${repeat(
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            (value) => value,
                            (value, index) => html`
                                <li
                                  class="collapse rounded-none relative"
                                  style="--bg-color: ${colors[index % colors.length]}; --fg-color: ${getContrastColor(colors[index % colors.length])};">
                                    <input type="radio" name="todo-list-accordion" ?checked=${index === 0} />
                                    <div class="collapse-title h-16">
                                        <div class="absolute inset-0 flex flex-row items-center p-4">
                                            <div class="font-semibold">Slide ${value}</div>
                                            <div class="flex-grow"></div>
                                            <button class="btn btn-square btn-ghost">
                                                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                                            </button>
                                            <button class="btn btn-square btn-ghost">
                                                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="collapse-content text-sm">Hello world</div>
                                </li>`)}
                    </ul>
                </div>
            `}
            <div class="bottom-toolbar">
                <div class="tooltip" data-tip="Random draw">
                    <button class="btn">${dice()}</button>
                </div>
                <div class="tooltip" data-tip="Toggle breaks">
                    <button class="btn join-item">${circlePause()}</button>
                </div>
                <div class="join">
                  <div class="btn p-0 join-item outline-none">
                      <select class="select select-ghost w-40 appearance-none outline-none">
                          <option value="5">5 minutes</option>
                          <option value="10">10 minutes</option>
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="45">45 minutes</option>
                          <option value="60">1 hour</option>
                      </select>
                  </div>
                  <button class="btn join-item">${play()}</button>
                  <button class="btn join-item">${rocket()}</button>
                </div>
            </div>
            <div class="top-left-toolbar">
                ${isEmbedded ? null : html`
                    <div class="btn p-0 outline-none">
                        <select class="select select-ghost w-32 appearance-none outline-none" @change=${(e) => {
                            const value = e.target.value;
                            if (value !== 'default') {
                                document.documentElement.setAttribute('data-theme', value);
                            } else {
                                document.documentElement.removeAttribute('data-theme');
                            }
                        }}>
                              <option value="default">Default</option>
                              <option value="light">Light</option>
                              <option value="dark">Dark</option>
                        </select>
                    </div>
                `}
                <div class="join">
                    ${repeat([
                        { value: "stack",  label: "Cards"  },
                     // { value: "line",   label: "Line"   },
                        { value: "slider", label: "Slider" },
                        { value: "list",   label: "List"   }
                    ], (v) => v, (v) => html`
                        <input
                          type="radio"
                          aria-label="${v.label}"
                          class="btn join-item"
                          name="effect"
                          value="${v.value}"
                          ?checked=${this._effect === v.value}
                          @change=${(e) => this._effect = e.target.value} />
                    `)}
                </div>
                ${/* contentDropdown("todo", "Todo", html`
                    <div>Hello world</div>
                    <div>default running timer controls</div>
                    <div><a href="https://freefrontend.com/css-code-examples/">Effect Ex.</a></div>
                    <div>Sounds.</div>
                    <div>Fix card effect bug when loop=true by looking at swiper code.</div>
                    <div>Music for different states.</div>
                    <div>Rerender on Obsidian theme change</div>
                    <div>Warn about the stack getting too big (encourage prioritisation)</div>
                    <div>... or maybe even grey out elements > a certain index</div>
                    <div>Palette selector</div>
                    <div>Continuity between selections in different modes</div>
                    <div>In Slider view, can a little button appear next to dice to loop infinitely?</div>
                    <div>Accent color from view</div>
                `) */ null}
                <div class="flex-grow"></div>
            </div>
            <div class="top-right-toolbar">
                <div class="btn p-0">
                    <label class="swap swap-rotate p-4">
                        <input type="checkbox" />
                        ${volumeOn("swap-on")}
                        ${volumeOff("swap-off")}
                    </label>
                </div>
            </div>
        `;
    }
}
customElements.define('obsidious-view', ObsidiousView);

