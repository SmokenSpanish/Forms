const form = document.querySelector('.form');
const formInput = form.querySelector('.form__input')
const formError = form.querySelector(`.${formInput.id}-error`)


const showError = (form, formElement, errorMessage) => {
    const errorElement = form.querySelector(`.${formElement.id}-error`);
    formElement.classList.add('form__input_type_error');
    errorElement.classList.add('form__input-error_active');
    errorElement.textContent = errorMessage;
}
const hideError = (form, formElement) => {
    const errorElement = form.querySelector(`.${formElement.id}-error`);
    formElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideError(formElement, inputElement)
    }
}

const setEventListeners = (formElement) => {
 const inputList = Array.from(formElement.querySelectorAll('.form__input'));
 inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement) 
    })
 })
}

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formElement);
    })
}
enableValidation()
