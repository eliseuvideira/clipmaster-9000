const { clipboard } = require('electron');

const clippingsList = document.querySelector('#clippings-list');
const btnCopyFromClipboard = document.querySelector('#copy-from-clipboard');

const createClippingElement = (clippingText) => {
  const clippingElement = document.createElement('article');
  clippingElement.classList.add('clippings-list-item');
  clippingElement.innerHTML = `
    <div class="clipping-text" disabled="true"></div>
    <div class="clipping-controls">
      <button class="copy-clipping">&rar; Clipboard</button>
      <button class="publish-clipping">Publish</button>
      <button class="remove-clipping">Remove</button>
    </div>
  `;
  clippingElement.querySelector('.clipping-text').innerText = clippingText;
  return clippingElement;
};

const addClippingToList = () => {
  const clippingText = clipboard.readText();
  const clippingElement = createClippingElement(clippingText);
  clippingsList.prepend(clippingElement);
};

btnCopyFromClipboard.addEventListener('click', addClippingToList);
