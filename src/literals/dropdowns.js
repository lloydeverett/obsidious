import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

/*
 *  NOTE: Anchors on Safari seem to lead to some funky behaviour. Probably best to redo this to avoid.
 */

export function contentDropdown(name, label, content) {
    return html`
        <button class="btn" popovertarget="popover-${name}" style="anchor-name:--anchor-${name}">
            <span>${label}</span>
        </button>
        <div class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm p-4"
          popover id="popover-${name}" style="position-anchor:--anchor-${name}">
          ${content}
        </div>
    `;
}

export function menuDropdown(name, elements) {
    return html`
        <button class="btn" popovertarget="popover-${name}" style="anchor-name:--anchor-${name}">
            <span>Theme</span>
        </button>
        <ul class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
          popover id="popover-${name}" style="position-anchor:--anchor-${name}">
          ${elements}
        </ul>
    `;
}

export function radioDropdown(name, label, current, options, set) {
    return html`
        <button class="btn" popovertarget="popover-${name}" style="anchor-name:--anchor-${name}">
            <span>${label}</span>
        </button>
        <ul class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm max-h-128 overflow-y-auto"
          popover id="popover-${name}" style="position-anchor:--anchor-${name}">
          ${repeat(options, option => option.value, option => html`
            <li>
                <input
                  type="radio"
                  name="select-${name}"
                  class="w-full btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="${option.label}"
                  value="${option.value}"
                  ?checked=${current === option.value}
                  @change=${((e) => set(e.target.value))} />
            </li>
          `)}
        </ul>
    `;
}

