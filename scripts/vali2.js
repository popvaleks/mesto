// добавление класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  // найти элемент у которого ошибка
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // добавить стиль для ошибки
  inputElement.classList.add(inputErrorClass);
  // заменяет текст ошибки на ...
  errorElement.textContent = errorMessage;
  // показывает новое сообщение об ошике
  errorElement.classList.add(errorClass);
};

// удаление класса с ошибкой
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  // поиск элемента с ошибкой
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // удалить стиль ошибки (красная рамка и т.д.)
  inputElement.classList.remove(inputErrorClass);
  // удалить сообщение об ошибке
  errorElement.classList.remove(errorClass);
  // учистить ошибку
  errorElement.textContent = '';
};

// валидация input
const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  if (!inputElement.validity.valid) {
    // если не валидно ошибка
    showInputError(formElement, inputElement, inputElement.validationMessage), {inputErrorClass, errorClass};
  } else {
    // если валидно скрыть ошибку, даже если это первый ввод и ее не было
    hideInputError(formElement, inputElement, {inputErrorClass, errorClass});
  }
};

// получить весь массив и проверить его на валидность
const setEventListeners = (formElement) => {
  // получим массив из всех input
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  // пройдемся по каждому элементу массива
  inputList.forEach((inputElement) => {
    // проверим на валидность каждый элемент массива
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  let formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

    setEventListeners(formElement);
});

}
  enableValidation();


  enableValidation({
    formElement: '.popup__container',
    inputElement: '.popup__info',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__info_type_error',
    errorClass: 'popup__info-error_active'
  });
