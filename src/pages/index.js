import "../pages/index.css";

import Card from '../components/Card.js';
import { initialCards } from '../utils/cards.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js"

const gridCards = document.querySelector(".elements");
const popupProfile = document.querySelector(".popup_profile");
const popupOpenButton = document.querySelector(".profile__edit-button");
const nameInput = popupProfile.querySelector(".popup__input_name");
const jobInput = popupProfile.querySelector(".popup__input_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popupCards = document.querySelector(".popup_cards");
const buttonCards = document.querySelector(".profile__add-button-box");
const popupWindow = document.querySelector(".popup_window");
const cardTemplate = document.querySelector("#card-template");
const formAdd = document.forms.add;
const formProfile = document.forms.edit;

// открытая карточка
const popupImg = new PopupWithImage(popupWindow);
popupImg.setEventListeners();

// функция создания карточки
function createCard(data) {
  const card = new Card(
    data,
    cardTemplate,
    // слушатель открытой карточки
    () => {
      popupImg.open(data);
    }
  );
  cardList.addItem(card.generateCard());
}

// собрать "плитку" собраных ранее карточек
const cardList = new Section({
  items: initialCards,
  renderer: createCard
}, gridCards);

// отобразить "плитку"
cardList.rendererItems();

// about
const userAbout = new UserInfo(profileName, profileJob);

// попап редактировать профиль
const popupEditProfile = new PopupWithForm(
  popupProfile,
  (data) => {
    userAbout.setUserInfo(data);
  })
popupEditProfile.setEventListeners();

// попап добавления карточки
const popupAddCars = new PopupWithForm(
  popupCards,
  createCard)
popupAddCars.setEventListeners();

// заполнения попапа профиля
function openEditProfile() {
  const profileInfo = userAbout.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.info;
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
      errorClass: 'popup__error_visible',
      spanClass: '.popup__input-error'
    }, form);
    // функция из класса отвечающая за добавление слушателей
    formValidator.enableValidation();
  });
}

function cleanErrorSpan(form) {
  const deleteErrorSpan = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    spanClass: '.popup__input-error'
  }, form);
  deleteErrorSpan.cleanError();
}

// кнопка ред профиль
popupOpenButton.addEventListener("click", () => {
  popupEditProfile.open();
  openEditProfile();
  cleanErrorSpan(formProfile);
});

//кнопка "+" (открыть попап добавления карточек)
buttonCards.addEventListener("click", () => {
  popupAddCars.open();
  cleanErrorSpan(formAdd);
});

formValidation(); // провести валидацию при открытии
