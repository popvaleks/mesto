import {
  clearPopupListenersClick,
  clearPopupListenersEsc,
  openModalWindow,
  closeModalWindow,
  popupImg,
  addListenerEsc,
  addListenerClick,
  closeWindow
} from "./index.js";

export default class Card {
  static _template = document.querySelector('#card-template').content;

  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    // забираем размеку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  // Создать реализацию лайка
  _likeCard(evt) {
    evt.target.classList.toggle("element__button-like_enabled");
  }

  // Закрыть открытую карточку
  _closeCard() {
    clearPopupListenersClick(popupImg); // удалить слушатель клика вне окна
    clearPopupListenersEsc(); // удалить слушателя Esc
    closeModalWindow(popupImg);
  }

  // Открыть карточку и получить ее значения
  _openCard(evt) {
    document.querySelector(".popup__subtitle").textContent = evt.target.alt;
    document.querySelector(".popup__image").src = evt.target.src;
    document.querySelector(".popup__image").alt = evt.target.alt;
    openModalWindow(popupImg);
    addListenerEsc();
    addListenerClick(popupImg); // добавить слушатель клик вне окна
    closeWindow.addEventListener("click", this._closeCard); // закрыть карточку по кресту
  }

  // Удалить карточку
  _trashCards(evt) {
    const eventTarget = evt.target;
    eventTarget.parentNode.removeEventListener("click", this._likeCard);
    eventTarget.parentNode.removeEventListener("click", this.trashCards);
    eventTarget.parentNode.removeEventListener("click", this.openCard);
    eventTarget.parentNode.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.popup__button-trash').addEventListener('click', (evt) => {
      this._trashCards(evt);
    });

    this._element.querySelector('.element__button-like').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });

    this._element.querySelector('.element__photo').addEventListener('click', (evt) => {
      this._openCard(evt);
    });
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    // Добавить слушателей карточке
    this._setEventListeners();

    // Добавим данные
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__photo').alt = this._name;

    // Вернём элемент наружу
    return this._element;
  };

};
