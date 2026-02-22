
import './obsidious-view.js';

const computedParentStyles = getComputedStyle(window.parent.document.body);

document.body.style.fontFamily = computedParentStyles.fontFamily;
document.body.style.fontSize = computedParentStyles.fontSize;

// console.log(window.parent.app.vault.getResourcePath());

// steal parent <link> styles
// var links = window.parent.document.getElementsByTagName("link");
// for(const link of links) {
//    const newLink = document.createElement("link");
//    newLink.rel = 'stylesheet';
//    newLink.type = 'text/css';
//    newLink.href = link.href;
//    document.head.appendChild(newLink);
// }

// steal parent inline styles
// for (const elem of window.parent.document.head.querySelectorAll('style')) {
//     const childElem = document.createElement('style');
//     childElem.textContent = elem.textContent;
//     document.head.appendChild(childElem);
// }

