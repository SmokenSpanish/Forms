export default class FormValidation {
    constructor(formElement) {
        this._formElement = formElement;
    }
    _showError = (formElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${formElement.id}-error`);
        formElement.classList.add('form__input_type_error');
        errorElement.classList.add('form__input-error_active');
        errorElement.textContent = errorMessage;
    }

    _hideError = (formElement) => {
        const errorElement = this._formElement.querySelector(`.${formElement.id}-error`);
        formElement.classList.remove('form__input_type_error');
        errorElement.classList.remove('form__input-error_active');
        errorElement.textContent = '';
    }

    _checkInputValidity = (inputElement) => {
        const isInputNotValid = !inputElement.validity.valid;
        if (isInputNotValid) {
            const errorMessage = inputElement.validationMessage;
            this._showError(inputElement, errorMessage)
        } else {
            this._hideError(inputElement)
        }
    }

    _toggleButtonState = () => {
        const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
        const hasInvalidInput = this._inputList.some(findAtLeastOneNotValid)


        if (hasInvalidInput) {
            this._buttonElement.setAttribute("disabled", true);
            this._buttonElement.classList.add('form__button_inactive')
        } else {
            this._buttonElement.removeAttribute("disabled");
            this._buttonElement.classList.remove('form__button_inactive');
        }
    }

    _setEventListeners = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
        this._buttonElement = this._formElement.querySelector('.form__button');

        const inputListIterator = (inputElement) => {
            const handleInput = () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList, this._buttonElement);
            }
            inputElement.addEventListener("input", handleInput);
        }

        this._inputList.forEach(inputListIterator);
        this._toggleButtonState(this._inputList, this._buttonElement);
    }

    enableValidation() {
        this._setEventListeners()
    }

    clearValidation() {
        this._inputList.forEach(this._hideError);
        this._toggleButtonState();
    }

}