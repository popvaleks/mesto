let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupSaveButton = document.querySelector('.popup__button-save');
let popupResetButton = document.querySelector('.popup__button-cross');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_name');
let	jobInput = document.querySelector('.popup__input_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');


//Открытие/закрытие
let popupToggle = function () {
  // event.preventDefault();
  popup.classList.toggle('popup_opened');

}
// клик вне окна
let closePopup = function(event) {
  if (event.target !== event.currentTarget) return
  popupToggle();
}
// внесение имени и работы в форму при открытии
function openEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupToggle();
}

// редактирование
function formSubmitHandler (evt) {
	evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupToggle();
}

popupOpenButton.addEventListener('click', openEdit);
popupResetButton.addEventListener('click', popupToggle);
popup.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);



