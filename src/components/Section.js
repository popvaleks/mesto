export default class Section {

  constructor({ items, renderer }, elementSelector) {
    this._items = items;
    this._renderer = renderer;
    this._elementSelector = elementSelector;
  }

  rendererItems() {
    this._items.forEach((item) => {
      this._renderer(item)
    });
  }

  addItem(element) {
    this._elementSelector.prepend(element);
  }
}
