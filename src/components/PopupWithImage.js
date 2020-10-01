import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popupSelector.querySelector(".popup__image");
    this._popupImgTitle = this._popupSelector.querySelector(".popup__subtitle");
  }

  open(card) {
    super.open();
    this._popupImg.src = card.link;
    this._popupImg.alt = card.title;
    this._popupImgTitle.textContent = card.title;
  }
}
