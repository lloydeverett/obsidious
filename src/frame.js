
import './obsidious-view.js';

const computedParentStyles = getComputedStyle(window.parent.document.body);

document.body.style.fontFamily = computedParentStyles.fontFamily;
document.body.style.fontSize = computedParentStyles.fontSize;
document.body.style.setProperty('--color-primary', computedParentStyles.getPropertyValue('--color-accent'));
document.body.style.setProperty('--color-primary-content', computedParentStyles.getPropertyValue('--text-on-accent'));
document.body.setAttribute('data-theme', window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light');

