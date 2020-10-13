import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, {formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popupSelector.querySelector(".popup__container");
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  //собирает данные всех полей формы
  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");// массив всех инпутов
    this._formValues = {}; // создаем пустой объект
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues; // возвращение данных всех полей форм
  }

  setEventListeners() {
    // слушатели родителя (esc, крест, оверлей)
    super.setEventListeners();
    // слушатель сабмита
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    })
  }
}
