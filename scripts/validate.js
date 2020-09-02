// добавление класса с ошибкой
const showInputError = ({ inputErrorClass, errorClass }, formElement, inputElement, errorMessage) => {
  // найти элемент у которого ошибка
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // добавить стиль для элемента с ошибкой
  inputElement.classList.add(inputErrorClass);
  // заменяет текст ошибки на ...
  errorElement.textContent = errorMessage;
  // показывает новое сообщение об ошике (модификатор со стилем ошибки)
  errorElement.classList.add(errorClass);
};

// скрытие ошибок валидации (удаление сподписи)
const hideInputError = ({ inputErrorClass, errorClass }, formElement, inputElement) => {
  // поиск элемента с ошибкой
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // удалить стиль ошибки (красная рамка и т.д.)
  inputElement.classList.remove(inputErrorClass);
  // удалить у спана модификатор выводящий ошибку (сделать его не активным)
  errorElement.classList.remove(errorClass);
  // пустое поле ошибки
  errorElement.textContent = '';
};

// валидация input
const checkInputValidity = ({ inputErrorClass, errorClass }, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // если не валидно ошибку показать
    showInputError({ inputErrorClass, errorClass }, formElement, inputElement, inputElement.validationMessage);
  } else {
    // если валидно скрыть ошибку
    hideInputError({ inputErrorClass, errorClass }, formElement, inputElement);
  };
};

// валидация всех полей (есть/нет ошибки)
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//блокировка кнопки (так же добавить ей прозрачность)
const toggleButtonState = ({ inactiveButtonClass }, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  };
};

// добавить формам слушателей
const setEventListeners = ({ submitButtonSelector, inputSelector, ...rest }, formElement) => {
  // получим массив из всех input в inputList
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // кнопка ввода
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // неактивная кнопка по умолчанию
  toggleButtonState(rest, inputList, buttonElement);
  // пройдемся по каждому элементу массива
  inputList.forEach((inputElement) => {
    // добавить каждому элементу слушатель ввода
    inputElement.addEventListener('input', () => {
      checkInputValidity(rest, formElement, inputElement);
      // динамическая проверка
      toggleButtonState(rest, inputList, buttonElement);
    });
  });
};

// валидация
const enableValidation = ({ formSelector, ...rest }) => {
  // создать массив из всех форм
  const formList = Array.from(document.querySelectorAll(formSelector));
  // добавить каждой форме слушатель
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // У каждой формы отменим стандартное поведение
    });
    setEventListeners(rest, formElement); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  });
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

