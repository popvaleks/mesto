import Card from '../components/Card.js';
import { initialCards } from '../utils/cards.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js"

import {
  popupProfile,
  popupOpenButton,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  popupCards,
  buttonCards,
  formAdd,
  formProfile,
  popupWindow,
  cardTemplate,
  gridCards
} from "../utils/constants.js"

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
      errorClass: 'popup__error_visible'
    }, form);
    // функция из класса отвечающая за добавление слушателей
    formValidator.enableValidation();
  });
}

// кнопка ред профиль
popupOpenButton.addEventListener("click", () => {
  popupEditProfile.open();
  openEditProfile();
  cleanError(formProfile); // сброс ошибок валидации
  formValidation(); // провести валидацию при открытии
});

//кнопка "+" (открыть попап добавления карточек)
buttonCards.addEventListener("click", () => {
  popupAddCars.open();
  cleanError(formAdd);
  formValidation();
});

