export default class FormValidator {

  constructor(setting, formElement) {
    // formSelector
    this._inputSelector = setting.inputSelector;
    this._submitButtonSelector = setting.submitButtonSelector;
    this._inactiveButtonClass = setting.inactiveButtonClass;
    this._inputErrorClass = setting.inputErrorClass;
    this._errorClass = setting.errorClass;
    this._spanClass = setting.spanClass;
    this._formElement = formElement;

  }

  // сбрасывание ошибок валидации
  cleanError() {
    this._formElement.querySelectorAll(this._spanClass).forEach((span) => {
      // удалить со спана модификатор ошибки
      span.classList.remove(this._errorClass);
      // удалить текст спана
      span.textContent = "";
    });
    this._formElement.querySelectorAll(this._inputSelector).forEach((input) => {
      //удаляем с инпута модификтор ошибки
      input.classList.remove(this._inputErrorClass);
    });
    // выставляем активацию кнопок
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
  }

  // добавление класса с ошибкой
  _showInputError(inputElement, errorElement, errorMessage) {
    // errorElement ищется и определяется в функции _checkInputValidity
    // добавить стиль для элемента с ошибкой
    inputElement.classList.add(this._inputErrorClass);
    // заменяет текст ошибки на ...
    errorElement.textContent = errorMessage;
    // показывает новое сообщение об ошике (модификатор со стилем ошибки)
    errorElement.classList.add(this._errorClass);
  };

  // скрытие ошибок валидации (удаление подписи)
  _hideInputError(inputElement, errorElement) {
    // удалить стиль ошибки (красная рамка и т.д.)
    inputElement.classList.remove(this._inputErrorClass);
    // удалить у спана модификатор выводящий ошибку (сделать его не активным)
    errorElement.classList.remove(this._errorClass);
    // пустое поле ошибки
    errorElement.textContent = '';
  };

  // валидация input
  _checkInputValidity(inputElement) {
    // найти элемент у которого ошибка
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      // если не валидно ошибку показать
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
      // если валидно скрыть ошибку
      this._hideInputError(inputElement, errorElement);
    };
  };

  // валидация всех полей (есть/нет ошибки)
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //блокировка кнопки (так же добавить ей прозрачность)
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    };
  };

  // добавить формам слушателей
  _setEventListeners() {
    // получим массив из всех input в inputList
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    // кнопка ввода
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    // неактивная кнопка по умолчанию
    this._toggleButtonState(inputList, buttonElement);
    // пройдемся по каждому элементу массива
    inputList.forEach((inputElement) => {
      // добавить каждому элементу слушатель ввода
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        // динамическая проверка
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  // валидация
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // У каждой формы отменим стандартное поведение
    });
    this._setEventListeners(); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  }
}
