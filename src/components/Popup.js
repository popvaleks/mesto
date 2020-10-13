import { escCode } from "../utils/constants.js";

export default class Popup {

  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = (evt) => {
      if (evt.keyCode === escCode) {
        this.close();
      }
    }
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    // слушатель закрытия по Esc
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    // слушатель закрытия по Esc
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    // слушатель закрытия по кресту
    this._popupSelector.querySelector(".popup__button-cross")
    .addEventListener('click', this.close.bind(this));
    // слушатель закрытия по фону
    this._popupSelector.addEventListener('click', this._handleOverlayClick.bind(this));
  }
}
