import Card from './Card.js';
import { initialCards } from './cards.js';
import FormValidator from "./FormValidator.js";

const popupProfile = document.querySelector(".popup_profile");
const popupOpenButton = document.querySelector(".profile__edit-button");
const popupResetButton = popupProfile.querySelector(".popup__button-cross");
const formElement = popupProfile.querySelector(".popup__container");
const nameInput = popupProfile.querySelector(".popup__input_name");
const jobInput = popupProfile.querySelector(".popup__input_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popupCards = document.querySelector(".popup_cards");
const buttonCards = document.querySelector(".profile__add-button-box");
const popupResetButtonCards = popupCards.querySelector(".popup__button-cross");
const formElementCards = popupCards.querySelector(".popup__container");
const nameInputCards = popupCards.querySelector(".popup__input_name");
const srcInputCards = popupCards.querySelector(".popup__input_link");
const body = document.body;
const formAdd = document.forms.add;
const formProfile = document.forms.edit;
const buttonSaveEdit = formProfile.querySelector(".popup__button-save");
const buttonSaveAdd = formAdd.querySelector(".popup__button-save");

//сбрасывание ошибок валидации
function cleanError(form) {
  form.querySelectorAll(".popup__input-error").forEach((span) => {
    // удалить со спана модификатор ошибки
    span.classList.remove("popup__error_visible");
    // удалить текст спана
    span.textContent = "";
  });
  form.querySelectorAll(".popup__input").forEach((input) => {
    //удаляем с инпута модификтор ошибки
    input.classList.remove("popup__input_type_error");
  });
}

// Открытие любого попапа
export function openModalWindow(modalWindow) {
  modalWindow.classList.add("popup_opened");
}

// Закрытие любого попапа
export function closeModalWindow(modalWindow) {
  modalWindow.classList.remove("popup_opened");
}

// Функкция закрытия по Esc
function closeByEsc(evt) {
  const key = evt.keyCode;
  const escCode = 27; // код кнопки Esc
  if (key === escCode) {
    const openedPopup = document.querySelector(".popup_opened");
    clearPopupListenersClick(openedPopup); // удалить слушатель клика вне окна
    clearPopupListenersEsc(openedPopup); // удалить слушатель Esc
    closeModalWindow(openedPopup);
  }
}

// Функция закрытия по клику вне окна
function closePopupByOverlayClick(event) {
  if (event.target === event.currentTarget) {
    const openedPopup = document.querySelector(".popup_opened");
    clearPopupListenersClick(openedPopup); // удалить слушатель клика вне окна
    clearPopupListenersEsc(openedPopup); // удалить слушатель Esc
    closeModalWindow(openedPopup);
  }
}

// Добавление слушателя функуции закрытия по Esc
export function addListenerEsc() {
  body.addEventListener("keyup", closeByEsc, false); // Закрытие по Esc
}

// Удалить слушатели эск
export function clearPopupListenersEsc() {
  body.removeEventListener("keyup", closeByEsc, false);
}

// Добавить слушатель клика
export function addListenerClick(elem) {
  elem.addEventListener("click", closePopupByOverlayClick, false); //Закрытие по клику вне
}

// Удалить слушатель клика
export function clearPopupListenersClick(elem) {
  elem.removeEventListener("click", closePopupByOverlayClick, false); //Закрытие по клику вне
}

// возвращает кнопке профиля активное состояние
function resetDisabledButton() {
  if (buttonSaveEdit.classList.contains("popup__button-save_disabled")) {
    buttonSaveEdit.classList.remove("popup__button-save_disabled");
  }
}

// Внесение имени и работы в форму при открытии
function openEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModalWindow(popupProfile);
  addListenerEsc(); // добавить слушатель Esc
  addListenerClick(popupProfile); // добавить слушатель клик вне окна
  cleanError(formProfile);
  resetDisabledButton();
}

// Закрыть попап профиля
function closeEditProfile() {
  clearPopupListenersClick(popupProfile); // удалить слушатель клика вне окна
  clearPopupListenersEsc();
  closeModalWindow(popupProfile);
}

// возвращает кнопке профиля не активное состояние
function addDisabledButton() {
  if (!buttonSaveAdd.classList.contains("popup__button-save_disabled")) {
    buttonSaveAdd.classList.add("popup__button-save_disabled");
  }
}

// Применить редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  clearPopupListenersClick(popupProfile); // удалить слушатель клика вне окна
  clearPopupListenersEsc();
  closeModalWindow(popupProfile);
}

// Отобразить "плитку" собраных карточек
const addCards = (card) => {
  card.forEach((item => {
    const card = new Card(item, "#card-template");
    const cardElement = card.generateCard();
    document.querySelector(".elements").prepend(cardElement);
  }));
};

// Получить значения с инпута и собрать новую карточку
function submitAddCardForm(evt) {
  evt.preventDefault();
  const cardValue = {
    link: srcInputCards.value,
    name: nameInputCards.value,
  };
  const card = new Card(cardValue, "#card-template");
  const cardElement = card.generateCard();
  document.querySelector(".elements").prepend(cardElement);
  formAdd.reset();
  clearPopupListenersClick(popupCards); // удалить слушатель клика вне окна
  clearPopupListenersEsc();
  closeModalWindow(popupCards);
}

// Открыть попап добавления карточки
function openAddCard() {
  openModalWindow(popupCards);
  addListenerEsc(); // добавить слушатель Esc
  addListenerClick(popupCards); // добавить слушатель клик вне окна
  cleanError(formAdd);
  formAdd.reset();
  addDisabledButton();
}

// Закрыть попап добавления карточки
function closeAddCard() {
  formAdd.reset();
  clearPopupListenersEsc(); // удалить слушателя Esc
  clearPopupListenersClick(popupCards); // удалить слушатель клика вне окна
  closeModalWindow(popupCards);
}

function formValidation() {
  // создать массив из всех форм
  const formList = Array.from(document.querySelectorAll(".popup__container"));

  formList.forEach((form) => {

    const formValidator = new FormValidator({
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button-save',
      inactiveButtonClass: 'popup__button-save_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    }, form);
    // функция из класса отвечающая за добавление слушателей
    formValidator.enableValidation();
  });
}

// Слушатели профиля
popupOpenButton.addEventListener("click", openEditProfile); //кнопка ред профиль
formElement.addEventListener("submit", submitEditProfileForm); //кнопка сохранить профиль
popupResetButton.addEventListener("click", closeEditProfile); //кнопка закрыть профиль
// Слушатели +
buttonCards.addEventListener("click", openAddCard); //кнопка "+" (открыть попап добавления карточек)
formElementCards.addEventListener("submit", submitAddCardForm); //кнопка добавить новую карточку
popupResetButtonCards.addEventListener("click", closeAddCard); //кнопка закрыть попап добавления карточек

addCards(initialCards);
formValidation();
