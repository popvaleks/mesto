let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__editbutton');
let popupSaveButton = document.querySelector('.popup__buttonSave');
let popupResetButton = document.querySelector('.popup__buttonCross');
// let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');// Воспользуйтесь инструментом .querySelector()
let	jobInput = document.querySelector('.popup__job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');// Воспользуйтесь инструментом .querySelector()


//Открытие/закрытие
let popupToggle = function (event) {
  event.preventDefault();
  popup.classList.toggle('popup_opened');

}
// клик вне окна
let closePopup = function(event) {
  if (event.target !== event.currentTarget) return
  popupToggle(event);
}
// внесение имени и работы в форму при открытии
function openEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

popupOpenButton.addEventListener('click', popupToggle);
popupOpenButton.addEventListener('click', openEdit);

popupResetButton.addEventListener('click', popupToggle);
popup.addEventListener('click', closePopup);

// редактирование
function formSubmitHandler (evt) {
	evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}
popupSaveButton.addEventListener('click', formSubmitHandler);
popupSaveButton.addEventListener('click', popupToggle);



