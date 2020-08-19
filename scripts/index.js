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
const popupWindow = document.querySelector('.popup_window');
const closeWindow = popupWindow.querySelector('.popup__button-cross')
const body = document.body;

//Открытие/закрытие любого попапа
function togglePopup(elem) {
  elem.classList.toggle('popup_opened');
  // Добавить или убрать слушателей
  if (elem.classList.contains('popup_opened')) {
    addListenerEscClick();
  }
  else {
    clearPopupListenersByEscClick()
  };

}

// Закрытие попапов по Esc
function closeByEsc(evt) {
  const key = evt.keyCode;
  const escCode = 27; // код кнопки Esc
  // console.log(this);
  if (key === escCode) {
    // document.querySelector('.popup_opened').classList.remove('popup_opened');
    togglePopup(document.querySelector('.popup_opened')); // убирет ближайщий селектор с классом, а не активный, если будут еще октрытые попапы, закроются они
    // clearPopupListenersByEscClick();
  };
}

// Закрытие по клику вне окна
function closePopupByOverlayClick(event) {
  if (event.target == event.currentTarget) {
    // document.querySelector('.popup_opened').classList.remove('popup_opened');
    // clearPopupListenersByEscClick();
    togglePopup(document.querySelector('.popup_opened'));
  };
}

// Внесение имени и работы в форму при открытии
function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popupProfile);
}

// Редактирование профиля
function submitEditProfileFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupProfile);
}

// Создать реализацию лайка
function likeCard(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__button-like_enabled');
}

// Удалить карточку
function trashCards(evt) {
  const eventTarget = evt.target;
  eventTarget.parentNode.remove();
  eventTarget.parentNode.removeEventListener('click', likeCard);
  eventTarget.parentNode.removeEventListener('click', trashCards);
  eventTarget.parentNode.removeEventListener('click', openCard);
}

// Открыть карточку и получить ее значения
function openCard(evt) {
  subtitleCard.textContent = evt.target.alt;
  srcCard.src = evt.target.src;
  srcCard.alt = evt.target.alt;
  togglePopup(popupWindow);
}

// Собираем карточку
const createCard = (linkValue, nameValue) => {
  const card = document.querySelector('#card-template').content;
  const cardElement = card.cloneNode(true); // сама карточка
  const buttonLike = cardElement.querySelector('.element__button-like');
  const buttonTrash = cardElement.querySelector('.popup__button-trash');
  const clickImg = cardElement.querySelector('.element__photo');
  const valueCard = cardElement.querySelector('.element__photo');

  valueCard.src = linkValue;
  valueCard.alt = nameValue;
  cardElement.querySelector('.element__title').textContent = nameValue;

  buttonLike.addEventListener('click', likeCard);
  buttonTrash.addEventListener('click', trashCards);
  clickImg.addEventListener('click', openCard);

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
  elements.prepend(createCard(srcInputCards.value, nameInputCards.value));
  nameInputCards.value = '';
  srcInputCards.value = '';
  togglePopup(popupCards);
}

// Добваить слушатели закрытия по эск и клику
function addListenerEscClick() {
  document.querySelector('.popup_opened').addEventListener('click', closePopupByOverlayClick, false); //Закрытие по клику вне
  body.addEventListener('keyup', closeByEsc, false); // Закрытие по Esc
  console.log("добавили");
}

// Удалить слушатели клика и эск
function clearPopupListenersByEscClick() {
  body.removeEventListener('keyup', closeByEsc, false);
  body.removeEventListener('click', closePopupByOverlayClick);
  console.log("убрали");
}

popupOpenButton.addEventListener('click', () => openEditPopup(popupProfile)); //кнопка ред профиль
formElement.addEventListener('submit', submitEditProfileFormHandler); //кнопка сохранить профиль
popupResetButton.addEventListener('click', () => openEditPopup(popupProfile)); //кнопка закрыть профиль
buttonCards.addEventListener('click', () => togglePopup(popupCards)); //кнопка "+" (открыть попап добавления карточек)
formElementCards.addEventListener('submit', submitAddCardForm); //кнопка добавить новую карточку
popupResetButtonCards.addEventListener('click', () => togglePopup(popupCards)); //кнопка закрыть попап добавления карточек
closeWindow.addEventListener('click', () => togglePopup(popupWindow)); //кнопка закрыть карточку

addCards(initialCards);
