
export default class Card {

  constructor({ data, id, handleCardClick, handleConfirm, handleLikeCard }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner._id;
    this._likes = data.likes;
    this._handleLikeCard = handleLikeCard;
    this._handleCardClick = handleCardClick;
    this._handleConfirm = handleConfirm;
    this._cardSelector = cardSelector;
    this._userId = id;
  }

  _getTemplate() {
    // забираем размеку из HTML и клонируем элемент
    return this._cardSelector
      .content
      .querySelector(".element")
      .cloneNode(true);
  }

  numberOfLikes(number) {
    this._elementNumber.textContent = number.length;
    this._toggleLikeCard();
  }

  _toggleLikeCard() {
    this._buttonLike = this._element.querySelector(".element__button-like")
    this._buttonLike.classList.toggle("element__button-like_enabled");
  }

  // Удалить карточку
  trashCards() {
    this._element.parentNode.removeEventListener("click", this._handleConfirm);
    this._element.parentNode.removeEventListener("click", this._handleLikeCard);
    this._element.parentNode.removeEventListener("click", this._handleCardClick);
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector(".popup__button-trash").addEventListener("click", this._handleConfirm);

    this._element.querySelector(".element__button-like").addEventListener("click", this._handleLikeCard);

    this._element.querySelector(".element__photo").addEventListener("click", this._handleCardClick);
  }

  // проверка есть ли в массиве с лайками мой id
  isLiked() {
    return this._likes.find((like) => {
      if (like._id === this._userId) {
        return true;
      } else {
        return false
      };
    })
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    // Добавить слушателей карточке
    this._setEventListeners();

    // Добавим данные
    this._elementPhoto = this._element.querySelector(".element__photo");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementNumber = this._element.querySelector(".element__like-current");
    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._elementNumber.textContent = this._likes.length;

    // проверка создана ли карточка мной и отображения кнопки удаления
    if (this._owner !== this._userId) {
      this._element.querySelector('#card-trash').style.display = 'none';
    };

    // активная кнопка лайка, там, где лайк поставлен мной
    if (this.isLiked()) {
      this._element.querySelector(".element__button-like")
        .classList.add("element__button-like_enabled");
    }

    // Вернём элемент наружу
    return this._element;
  };

};
