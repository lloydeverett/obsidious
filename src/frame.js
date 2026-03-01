
document.documentElement.classList.toggle('embedded', window.parent !== window);

if (window.parent !== window) {
    const computedParentStyles = getComputedStyle(window.parent.document.body);
    document.body.style.fontFamily = computedParentStyles.fontFamily;
    document.body.style.fontSize = computedParentStyles.fontSize;
    // document.body.style.setProperty('--color-primary', computedParentStyles.getPropertyValue('--task-checkbox'));
    // document.body.style.setProperty('--color-primary-content', computedParentStyles.getPropertyValue('--checkbox-marker-color'));
}

import './obsidious-view.js';

console.info('[Debug] Obsidious frame documentElement', document.documentElement);

