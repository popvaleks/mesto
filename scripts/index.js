const popupProfile = document.querySelector('.popup_profile');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupSaveButton = popupProfile.querySelector('.popup__button-save');
const popupResetButton = document.querySelectorAll('.popup__button-cross');
const formElement = popupProfile.querySelector('.popup__container');
const nameInput = popupProfile.querySelector('.popup__input_name');
const jobInput = popupProfile.querySelector('.popup__input_bot');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const elements = document.querySelector('.elements');


const popupCards = document.querySelector('.popup_cards');
const buttonCards = document.querySelector('.profile__add-button-box');
const popupSaveButtonCards = popupCards.querySelector('.popup__button-save');
const formElementCards = popupCards.querySelector('.popup__container');
const nameInputCards = popupCards.querySelector('.popup__input_name');
const srcInputCards = popupCards.querySelector('.popup__input_bot');



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Открытие/закрытие
const popupToggle = function (evt) {
  // event.preventDefault();
  popupProfile.classList.toggle('popup_opened');
}

// клик вне окна
const closePopup = function (event) {
  if (event.target !== event.currentTarget) return
  popupToggle();
}
popupProfile.addEventListener('click', closePopup);

// Внесение имени и работы в форму при открытии
function openEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupToggle();
}

// Редактирование
function submitFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupToggle();
}

// Закрыть попап по его кресту
popupResetButton.forEach(function (item) {
  item.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    eventTarget.closest('.popup').classList.remove('popup_opened');
  });
})

popupOpenButton.addEventListener('click', openEdit);
// popupResetButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', submitFormHandler);

// Добавить карточки

// Создать карточку
const createCard = (linkValue, nameValue) => {
  const card = document.querySelector('#card-template').content;
  const cardElement = card.cloneNode(true);
  cardElement.querySelector('.element__photo').src = linkValue;
  cardElement.querySelector('.element__title').textContent = nameValue;
  nameInputCards.value = "";
  srcInputCards.value = "";
  return cardElement;

}

const windowShow = document.querySelector('.popup_window');
// Добавить карточку
const addCard = (cardElement) => {
  elements.prepend(cardElement);
  // Поставить лайк
  const likeCard = document.querySelector('.element__button-like');
  likeCard.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__button-like_enabled');
  })
  // Удалить карточку
  const trashCards = document.querySelectorAll('.popup__button-trash');
  trashCards.forEach(function (item) {
    item.addEventListener('click', (evt) => {
      const eventTarget = evt.target;
      eventTarget.parentNode.remove();
    });
  });
  // Открыть изображение

  // Получить значения карточки и внести в нее полученные значения
  const infoCard = document.querySelectorAll('.element__photo');
  infoCard.forEach(function (item) {
    item.addEventListener('click', (evt) => {
      const eventTarget = evt.target;
      linkCard = eventTarget.getAttribute("src");
      nameCard = eventTarget.nextElementSibling.textContent;
      // внести в нее полученные значения
      const srcCard = document.querySelector('.popup__image');
      srcCard.src = linkCard;
      const subtitleCard = document.querySelector('.popup__subtitle');
      subtitleCard.textContent = nameCard;
      windowShow.classList.add('popup_opened');
    })
  });

}

// Перебрать массив
initialCards.forEach((item) => addCard(createCard(item.link, item.name), elements));

const popupToggleCards = () => {
  popupCards.classList.toggle('popup_opened');
}

buttonCards.addEventListener('click', popupToggleCards);

// Закрыть по клику вне окна
const closePopupCards = function (event) {
  if (event.target !== event.currentTarget) return
  popupToggleCards();
}
popupCards.addEventListener('click', closePopupCards);

// Добавить название и ссылку карточке
function addFormCard(evt) {
  evt.preventDefault();
  inputName = nameInputCards.value;
  inputLink = srcInputCards.value;
  addCard(createCard(inputLink, inputName), elements);
  popupToggleCards();
}

formElementCards.addEventListener('submit', addFormCard);


const popupCloseWindow = (evt) => {
  windowShow.classList.remove('popup_opened');
}

// Закрыть по клику вне окна
const closePopupWindow = function (event) {
  if (event.target !== event.currentTarget) return
  popupCloseWindow();
}
windowShow.addEventListener('click', closePopupWindow);
