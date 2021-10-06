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

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
    }
    
    const toggleButtonState = (inputList, buttonElement) => {
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add('form__button_inactive')
        } else {
            buttonElement.classList.remove('form__button_inactive');
        }
    }
    

const setEventListeners = (formElement) => {
 const inputList = Array.from(formElement.querySelectorAll('.form__input'));
 const buttonElement = formElement.querySelector('.form__button');
 toggleButtonState(inputList, buttonElement);
 inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
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


