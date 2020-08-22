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

//Открытие/закрытие любого попапа
function togglePopup(elem) {
  elem.classList.toggle('popup_opened');
}

// Внесение имени и работы в форму при открытии
function openEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popupProfile);
}

// Закрыть попап профиля
function closeEditProfile() {
  togglePopup(popupProfile);
}


// Применить редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
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
  nameInputCards.value = '';
  srcInputCards.value = '';
  togglePopup(popupCards);
}

popupOpenButton.addEventListener('click', () => openEditProfile()); //кнопка ред профиль
formElement.addEventListener('submit', submitEditProfileForm); //кнопка сохранить профиль
popupResetButton.addEventListener('click', () => closeEditProfile()); //кнопка закрыть профиль
buttonCards.addEventListener('click', () => togglePopup(popupCards)); //кнопка "+" (открыть попап добавления карточек)
formElementCards.addEventListener('submit', submitAddCardForm); //кнопка добавить новую карточку
popupResetButtonCards.addEventListener('click', () => togglePopup(popupCards)); //кнопка закрыть попап добавления карточек
closeWindow.addEventListener('click', () => togglePopup(popupImg)); //кнопка закрыть карточку

addCards(initialCards);
