const popupProfile = document.querySelector('.popup_profile');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupResetButton = popupProfile.querySelector('.popup__button-cross');
const formElement = popupProfile.querySelector('.popup__container');
const nameInput = popupProfile.querySelector('.popup__input_name');
const jobInput = popupProfile.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const elements = document.querySelector('.elements');
const popupCards = document.querySelector('.popup_cards');
const buttonCards = document.querySelector('.profile__add-button-box');
const popupResetButtonCards = popupCards.querySelector('.popup__button-cross');
const formElementCards = popupCards.querySelector('.popup__container');
const nameInputCards = popupCards.querySelector('.popup__input_name');
const srcInputCards = popupCards.querySelector('.popup__input_link');
const subtitleCard = document.querySelector('.popup__subtitle');
const srcCard = document.querySelector('.popup__image');
const popupImg = document.querySelector('.popup_window');
const closeWindow = popupImg.querySelector('.popup__button-cross');
const formAdd = document.forms.add;
const formEdit = document.forms.edit;
const body = document.body;

//Открытие/закрытие любого попапа
const togglePopup = (popup) => {
  popup.classList.toggle('popup_opened');
}

// Функкция закрытия по Esc
function closeByEsc(evt) {
  const key = evt.keyCode;
  const escCode = 27; // код кнопки Esc
  if (key === escCode) {
    const popupIsOpened = document.querySelector('.popup_opened')
    togglePopup(popupIsOpened);
    document.removeEventListener('keyup', closeByEsc, false); // Закрытие по Esc
    console.log('+esc')
  };
}

// Функция закрытия по клику вне окна
function closePopupByOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    const popupIsOpened = document.querySelector('.popup_opened')
    togglePopup(popupIsOpened);
    console.log('+click')
  };
}

// Открыть попап профиля
const openEditProfile = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popupProfile);
  document.addEventListener('keyup', closeByEsc, false); // Закрытие по Esc
  document.querySelector('.popup_opened').addEventListener('click', closePopupByOverlayClick, false); //Закрытие по клику вне
}

// Закрыть попап профиля
const closeEditProfile = () => {
  togglePopup(popupProfile);
  document.removeEventListener('keyup', closeByEsc, false);
}

// Применить редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  clearPopupListenersClick(); // удалить слушатель клика вне окна
  clearPopupListenersEsc();
  togglePopup(popupProfile);
}

// Создать реализацию лайка
function likeCard(evt) {
  evt.target.classList.toggle('element__button-like_enabled');
}

// Удалить карточку
function trashCards(evt) {
  const eventTarget = evt.target;
  eventTarget.parentNode.removeEventListener('click', likeCard);
  eventTarget.parentNode.removeEventListener('click', trashCards);
  eventTarget.parentNode.removeEventListener('click', openCard);
  eventTarget.parentNode.remove();
}

// Открыть карточку и получить ее значения
function openCard(evt) {
  subtitleCard.textContent = evt.target.alt;
  srcCard.src = evt.target.src;
  srcCard.alt = evt.target.alt;
  togglePopup(popupImg);
  addListenerEsc();
  addListenerClick(); // добавить слушатель клик вне окна
}

// Собираем карточку
const createCard = (linkValue, nameValue) => {
  const card = document.querySelector('#card-template').content;
  const cardElement = card.cloneNode(true); // сама карточка
  const buttonLike = cardElement.querySelector('.element__button-like');
  const buttonTrash = cardElement.querySelector('.popup__button-trash');
  const cardImage = cardElement.querySelector('.element__photo');

  cardImage.src = linkValue;
  cardImage.alt = nameValue;
  cardElement.querySelector('.element__title').textContent = nameValue;

  buttonLike.addEventListener('click', likeCard);
  buttonTrash.addEventListener('click', trashCards);
  cardImage.addEventListener('click', openCard);

  return cardElement;
}

// Собрать initialCards
const addCards = (initialCards) => {
  initialCards.forEach(function (item) {
    elements.append(createCard(item.link, item.name));
  });
}

// Получить значения с инпута и собрать новую карточку
function submitAddCardForm(evt) {
  evt.preventDefault();
  elements.prepend(createCard(srcInputCards.value, nameInputCards.value));//
  formAdd.reset();
  clearPopupListenersClick(); // удалить слушатель клика вне окна
  clearPopupListenersEsc();
  togglePopup(popupCards);
}

// Открыть попап добавления карточки
function openAddCard() {
  togglePopup(popupCards);
}

// Закрыть попап добавления карточки
function closeAddCard() {
  formAdd.reset();
  togglePopup(popupCards);
}









// // Удалить слушатели клика
// function clearPopupListenersClick(popup) {
//   popup.removeEventListener('click', closePopupByOverlayClick, false); //Закрытие по клику вне
// }


// Слушатели профиля
popupOpenButton.addEventListener('click', openEditProfile);
formElement.addEventListener('submit', submitEditProfileForm); //кнопка сохранить профиль
popupResetButton.addEventListener('click', closeEditProfile);
// Слушатели +
buttonCards.addEventListener('click', () => { //кнопка "+" (открыть попап добавления карточек)
  openAddCard();
  addListenerEsc(); // добавить слушатель Esc
  addListenerClick(); // добавить слушатель клик вне окна
});
formElementCards.addEventListener('submit', submitAddCardForm); //кнопка добавить новую карточку
popupResetButtonCards.addEventListener('click', () => {
  clearPopupListenersEsc(); // удалить слушателя Esc
  clearPopupListenersClick(); // удалить слушатель клика вне окна
  closeAddCard(); //кнопка закрыть попап добавления карточек
});
// Слушатели карточки
closeWindow.addEventListener('click', () => {  //кнопка закрыть карточку
  clearPopupListenersClick(); // удалить слушатель клика вне окна
  clearPopupListenersEsc(); // удалить слушателя Esc
  togglePopup(popupImg);
});

addCards(initialCards);
