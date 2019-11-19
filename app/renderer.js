const { clipboard } = require('electron');

const clippingsList = document.querySelector('#clippings-list');
const btnCopyFromClipboard = document.querySelector('#copy-from-clipboard');

const createClippingElement = (clippingText) => {
  const clippingElement = document.createElement('article');
  clippingElement.classList.add('clippings-list-item');
  clippingElement.innerHTML = `
    <div class="clipping-text" disabled="true"></div>
    <div class="clipping-controls">
      <button class="copy-clipping">&rarr; Clipboard</button>
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

const getButtonParent = ({ target }) => {
  return target.parentNode.parentNode;
};

const getClippingText = (clippingListItem) => {
  return clippingListItem.querySelector('.clipping-text').innerText;
};

const removeClipping = (target) => {
  target.remove();
};

const writeToClipboard = (clippingText) => {
  clipboard.writeText(clippingText);
};

btnCopyFromClipboard.addEventListener('click', addClippingToList);

clippingsList.addEventListener('click', (event) => {
  const hasClass = (className) => event.target.classList.contains(className);

  const clippingListItem = getButtonParent(event);

  if (hasClass('remove-clipping')) {
    removeClipping(clippingListItem);
  }
  if (hasClass('copy-clipping')) {
    writeToClipboard(getClippingText(clippingListItem));
  }
  if (hasClass('publish-clipping')) {
    console.log('publish clipping');
  }
});
