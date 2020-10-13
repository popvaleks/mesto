import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  setEventListeners() {
    // слушатели родителя (esc, крест, оверлей)
    super.setEventListeners();
    // слушатель сабмита
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if(this._confirm) {
        this._confirm();
        this.close();
      }
    })
  }

  push(confirm) {
    this._confirm = confirm;
  }
}
