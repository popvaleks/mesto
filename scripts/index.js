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
const body = document.body;

const formAdd = document.forms.add;
const formProfile = document.forms.edit;
const buttonSave = document.querySelector('.popup__button-save');

//сбрасывание ошибок валидации
function cleanError(form) {
  form.querySelectorAll('.popup__input-error').forEach((span) => {
    // удалить со спана модификатор ошибки
    span.classList.remove('popup__error_visible');
    // удалить текст спана
    span.textContent = '';
  })
  form.querySelectorAll('.popup__input').forEach((input) => {
    //удаляем с инпута модификтор ошибки
    input.classList.remove('popup__input_type_error');
  });
};

//Открытие/закрытие любого попапа
function togglePopup(elem) {
  elem.classList.toggle('popup_opened');
  // cleanError(elem);
}

// Функкция закрытия по Esc
function closeByEsc(evt) {
  const key = evt.keyCode;
  const escCode = 27; // код кнопки Esc
  if (key === escCode) {
    clearPopupListenersClick(document.querySelector('.popup_opened')); // удалить слушатель клика вне окна
    clearPopupListenersEsc(document.querySelector('.popup_opened')); // удалить слушатель Esc
    togglePopup(document.querySelector('.popup_opened'));
  };
}

// Функция закрытия по клику вне окна
function closePopupByOverlayClick(event) {
  if (event.target === event.currentTarget) {
    clearPopupListenersClick(document.querySelector('.popup_opened')); // удалить слушатель клика вне окна
    clearPopupListenersEsc(document.querySelector('.popup_opened')); // удалить слушатель Esc
    togglePopup(document.querySelector('.popup_opened'));
  };
}

// Добавление слушателя функуции закрытия по Esc
function addListenerEsc() {
  body.addEventListener('keyup', closeByEsc, false); // Закрытие по Esc
}

// Удалить слушатели эск
function clearPopupListenersEsc() {
  body.removeEventListener('keyup', closeByEsc, false);
}

// Добавить слушатель клика
function addListenerClick(elem) {
  elem.addEventListener('click', closePopupByOverlayClick, false); //Закрытие по клику вне
}

// Удалить слушатель клика
function clearPopupListenersClick(elem) {
  elem.removeEventListener('click', closePopupByOverlayClick, false); //Закрытие по клику вне
}

// возвращает кнопке профиля активное состояние
function resetDisabledButton() {
  if (buttonSave.classList.contains('popup__button-save_disabled')) {
    buttonSave.classList.remove('popup__button-save_disabled');
  }
}

// Внесение имени и работы в форму при открытии
function openEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popupProfile);
  addListenerEsc(); // добавить слушатель Esc
  addListenerClick(popupProfile); // добавить слушатель клик вне окна
  cleanError(formProfile);
  resetDisabledButton()
}

// Закрыть попап профиля
function closeEditProfile() {
  clearPopupListenersClick(popupProfile); // удалить слушатель клика вне окна
  clearPopupListenersEsc();
  togglePopup(popupProfile);
}

// Применить редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  clearPopupListenersClick(popupProfile); // удалить слушатель клика вне окна
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
  addListenerClick(popupImg); // добавить слушатель клик вне окна
}

function closeCard() {
  clearPopupListenersClick(popupImg); // удалить слушатель клика вне окна
  clearPopupListenersEsc(); // удалить слушателя Esc
  togglePopup(popupImg);
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
  clearPopupListenersClick(popupCards); // удалить слушатель клика вне окна
  clearPopupListenersEsc();
  togglePopup(popupCards);
}

// Открыть попап добавления карточки
function openAddCard() {
  togglePopup(popupCards);
  addListenerEsc(); // добавить слушатель Esc
  addListenerClick(popupCards); // добавить слушатель клик вне окна
  cleanError(formAdd);
  formAdd.reset();
}

// Закрыть попап добавления карточки
function closeAddCard() {
  formAdd.reset();
  clearPopupListenersEsc(); // удалить слушателя Esc
  clearPopupListenersClick(popupCards); // удалить слушатель клика вне окна
  togglePopup(popupCards);
}

// Слушатели профиля
popupOpenButton.addEventListener('click', openEditProfile); //кнопка ред профиль
formElement.addEventListener('submit', submitEditProfileForm); //кнопка сохранить профиль
popupResetButton.addEventListener('click', closeEditProfile); //кнопка закрыть профиль
// Слушатели +
buttonCards.addEventListener('click', openAddCard); //кнопка "+" (открыть попап добавления карточек)
formElementCards.addEventListener('submit', submitAddCardForm); //кнопка добавить новую карточку
popupResetButtonCards.addEventListener('click', closeAddCard); //кнопка закрыть попап добавления карточек
// Слушатели карточки
closeWindow.addEventListener('click', closeCard); // закрыть карточку по кресту

addCards(initialCards);
