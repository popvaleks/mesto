
export default class Card {

  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // забираем размеку из HTML и клонируем элемент
    return this._cardSelector
      .content
      .cloneNode(true);
  }

  // Создать реализацию лайка
  _likeCard(evt) {
    evt.target.classList.toggle("element__button-like_enabled");
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
    this._element.querySelector(".popup__button-trash").addEventListener("click", (evt) => {
      this._trashCards(evt);
    });

    this._element.querySelector(".element__button-like").addEventListener("click", (evt) => {
      this._likeCard(evt);
    });

    this._element.querySelector(".element__photo").addEventListener("click", (evt) => {
      this._handleCardClick(evt);
    });
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    // Добавить слушателей карточке
    this._setEventListeners();

    // Добавим данные
    const elementPhoto = this._element.querySelector(".element__photo");
    const elementTitle = this._element.querySelector(".element__title");
    elementPhoto.src = this._link;
    elementPhoto.alt = this._name;
    elementTitle.textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  };

};
