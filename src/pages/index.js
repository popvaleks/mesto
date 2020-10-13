import "../pages/index.css";

import Card from '../components/Card.js';
import { initialCards } from '../utils/cards.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import AvatarInfo from "../components/AvatarInfo.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Api from "../components/Api.js";
import { data } from "autoprefixer";

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
const formAvatar = document.forms.avatar;
const popupAvatar = document.querySelector(".popup_avatar");
const buttonAvatarEdit = document.querySelector(".profile__avatar-button");
const avatarImg = document.querySelector(".profile__avatar");
const popupConfirm = document.querySelector(".popup_confirm");
const buttonLike = document.querySelector(".element__button-like");

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'dbdd480f-2b2c-4b97-8cc6-c05d1be34625',
    'content-type': 'application/json'
  }
});

// // получаем массив с карточками с сервера
// api.getUsersCards()
//   .then((res) => {
//     const userCards = new Section({
//       items: res,
//       renderer: (item) => {
//         const compileCard = getCard(item, api);
//         const elementCard = compileCard.generateCard();
//         gridCards.append(elementCard);
//       }
//     }, gridCards)
//     userCards.rendererItems();
// });


// // создаем карточку
// function getCard(res, api) {
//   const newCard = new Card(
//     res.owner._id, // id пользователя
//     res.likes,
//     res.link,
//     res.name,
//     res._id, // id карточки
//     //gridCards, //добавить
//     api,

//     {
//       // реализуем функцию лайка
//       likeCards: (evt) => {
//         const like = evt.target; // подсчет лайков на карточке
//         const currentLikes = like
//           .closest(".element__like")
//           .querySelector(".element__like-current");
//         like.classList.toggle("element__button-like_enabled");
//         // дописать функцию добавления лайков
//       }
//     },
//     {
//       handleCardClick: () => {
//         popupImg.open({
//           name: res.name,
//           link: res.link
//         })
//         popupImg.setEventListeners();
//       }
//     },
//     {
//       handleTrashCards: () => {
//         popupConfirmDelete.open();
//         popupConfirmDelete.push((evt) => {
//           evt.preventDefault();
//           //дописать
//         });
//       }
//     }
//   )
//   return newCard;
// }

// Promise.all ждет выполнения всех обещаний (или первого метода reject()).
Promise.all([api.getUserInfo(), api.getUsersCards()])
  .then((res) => {
    // получаем значения своего профиля
    const [data, usersCards] = res;
    const reversed = usersCards.reverse()

    // // установка данных о пользователе с сервера
    // profileName.textContent = data.name;
    // profileJob.textContent = data.about;
    // avatarImg.src = data.avatar;

    // попап подтверждения удаления - вызывается в карточке
    const popupConfirmDelete = new PopupWithSubmit(popupConfirm);
    popupConfirmDelete.setEventListeners();

    // отображение списка карточек пользователя
    const cardList = new Section({
      items: reversed,
      renderer: createCard,
    }, gridCards);
    cardList.rendererItems();

    // наложение на корточки слушателей и коллбеков
    function createCard(item) {
      const card = new Card({
        data: item,
        id: data._id,
        handleCardClick: () => {
          popupImg.open(item);
        },
        handleConfirm: () => {
          popupConfirmDelete.open();
          popupConfirmDelete.push(() => {
            api.deleteCard(item._id)//
              .then(() => {
                card.trashCards();
                popupConfirmDelete.close();
              })
          })
        },
        handleLikeCard: () => {
          const isLiked = card.isLiked();
          if (!isLiked) {
            api.addLike(item._id)
              .then((item) => {
                card.numberOfLikes(item.likes); //
              });
          } else {
            api.deleteLike(item._id) //
              .then((item) => {
                card.numberOfLikes(item.likes); //
              });
          }
        },
      }, cardTemplate
      )
      cardList.addItem(card.generateCard());
    }


    // about
    const userAbout = new UserInfo(profileName, profileJob);
    userAbout.setUserInfo(data);

    // попап редактировать профиль
    const popupEditProfile = new PopupWithForm(
      popupProfile, {
      formSubmit: (user) => {
        activeLoadind(true, popupProfile);
        api.editUserInfo(user.name, user.about)
          .then(() => {
            userAbout.setUserInfo(user);
          })
          .then(() => {
            popupEditProfile.close();
          })
          .finally(() => {
            activeLoadind(false, popupProfile);
          })
      }
    })
    popupEditProfile.setEventListeners();

    // кнопка ред профиль
    popupOpenButton.addEventListener("click", () => {
      popupEditProfile.open();
      openEditProfile();
      formProfileValidation.cleanError(); //сброс ошибок валидации
    });

    // заполнения попапа профиля
    function openEditProfile() {
      const profileInfo = userAbout.getUserInfo();
      nameInput.value = profileInfo.name;
      jobInput.value = profileInfo.about;
    }

    // редактирование аватара
    const userAvatar = new AvatarInfo(avatarImg);
    userAvatar.setUserAvatar(data);

    // попап редактирования аватара
    const popupEditAvatar = new PopupWithForm(
      popupAvatar, {
      formSubmit: (user) => {
        activeLoadind(true, popupAvatar);
        api.editUserAvatar(user.avatar)
          .then(() => {
            userAvatar.setUserAvatar(user);
          })
          .then(() => {
            popupEditAvatar.close();
          })
          .finally(() => {
            activeLoadind(false, popupAvatar);
          })
      }
    })
    popupEditAvatar.setEventListeners();

    // кнопка редактировать аватар
    buttonAvatarEdit.addEventListener("click", () => {
      popupEditAvatar.open();
      formAvatarValidation.cleanError();
    });

    // попап добавления карточки
    const popupAddCards = new PopupWithForm(
      popupCards, {
      formSubmit: (data) => {
        activeLoadind(true, popupCards);
        api.addMyCard(data.name, data.link)
          .then((data) => {
            createCard(data)
          })
          .then(() => {
            popupAddCards.close();
          })
          .finally(() => {
            activeLoadind(false, popupCards);
          })
      }
    })
    popupAddCards.setEventListeners();

    // кнопка "+" (открыть попап добавления карточек)
    buttonCards.addEventListener("click", () => {
      popupAddCards.open();
      formAddValidation.cleanError(); //сброс ошибок валидации
    });
  })

// открытая карточка
const popupImg = new PopupWithImage(popupWindow);
popupImg.setEventListeners();

// // функция создания карточки
// function createCard(data) {
//   const card = new Card(
//     data,
//     cardTemplate,
//     // слушатель открытой карточки
//     () => {
//       popupImg.open(data);
//     }
//   );
//   cardList.addItem(card.generateCard());
// }

// // собрать "плитку" собраных ранее карточек
// const cardList = new Section({
//   items: initialCards,
//   renderer: createCard
// }, gridCards);

// // отобразить "плитку"
// cardList.rendererItems();

// // about
// const userAbout = new UserInfo(profileName, profileJob);

// // попап редактировать профиль
// const popupEditProfile = new PopupWithForm(
//   popupProfile,
//   (data) => {
//     userAbout.setUserInfo(data);
//   })
// popupEditProfile.setEventListeners();

// // попап добавления карточки
// const popupAddCars = new PopupWithForm(
//   popupCards,
//   createCard)
// popupAddCars.setEventListeners();

// const userAvatar = new AvatarInfo(avatarImg);

// // попап редактирования аватара
// const popupEditAvatar = new PopupWithForm(
//   popupAvatar,
//   (data) => {
//     userAvatar.setUserAvatar(data);
//   }
// )
// popupEditAvatar.setEventListeners();

// попап подтверждения удаления
const popupConfirmDelete = new PopupWithSubmit(popupConfirm);
popupConfirmDelete.setEventListeners();

// // заполнения попапа профиля
// function openEditProfile() {
//   const profileInfo = userAbout.getUserInfo();
//   nameInput.value = profileInfo.name;
//   jobInput.value = profileInfo.info;
// }

// установа текста кнопки после выполнения then
const textBTN = (popupSelector) => {
  if (popupSelector === popupCards) {
    return 'Создать'
  } else {
    return 'Сохранить'}
}

// отображение загрузки
const activeLoadind = (bool, popupSelector) => {
  const currentSubmitBtn = popupSelector.querySelector('.popup__button-save');
  if (bool) {
    currentSubmitBtn.textContent = 'Сохранение...';
  } else {
    currentSubmitBtn.textContent = textBTN(popupSelector);
  }
}

// объект класса валидации формы профиля
const formProfileValidation = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  spanClass: '.popup__input-error'
}, formProfile);
// функция валидации для формы профиля
formProfileValidation.enableValidation();

// объект класса валидации формы добавления карточки
const formAddValidation = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  spanClass: '.popup__input-error'
}, formAdd);
// функция валидации для формы добавления карточки
formAddValidation.enableValidation();

// объект класса валидации формы аватара
const formAvatarValidation = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  spanClass: '.popup__input-error'
}, formAvatar);
// функция валидации для формы профиля
formAvatarValidation.enableValidation();

// // кнопка ред профиль
// popupOpenButton.addEventListener("click", () => {
//   popupEditProfile.open();
//   openEditProfile();
//   formProfileValidation.cleanError(); //сброс ошибок валидации
// });

// //кнопка "+" (открыть попап добавления карточек)
// buttonCards.addEventListener("click", () => {
//   popupAddCars.open();
//   formAddValidation.cleanError(); //сброс ошибок валидации
// });

// // кнопка редактировать аватар
// buttonAvatarEdit.addEventListener("click", () => {
//   popupEditAvatar.open();
//   formAvatarValidation.cleanError();
// });
