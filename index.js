class FormValidation {
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

const regForm = document.querySelector('.form-registration');
const authForm = document.querySelector('.form-auth');

const regFormValidator = new FormValidation(regForm)
const authFormValidator = new FormValidation(authForm)

regFormValidator.enableValidation();
authFormValidator.enableValidation();

const progress = document.getElementById("progress");
const prev = document.getElementById("btnPrev");
const next = document.getElementById("btnNext");
const circles = document.querySelectorAll(".circle");

let currentValue = 1;

next.addEventListener("click", () => {
    currentValue++;
   if (currentValue > circles.length) {
       currentValue = circles.length;
   }
   update();
});

prev.addEventListener("click", () => {
    currentValue--;
   if (currentValue < 1) {
       currentValue = 1;
   }
   update();
});

function update() {
    circles.forEach((circle, index) => {
        if (index < currentValue) {
            circle.classList.add("circle__type_active");
        } else {
            circle.classList.remove("circle__type_active");
        }
    })
}

const actives = document.querySelectorAll(".circle__type_active");
progress.style.width = ((actives.length -1) / (circles.length - 1)) * 100 + '%';
if (currentValue === circles.length) {
    next.disabled = true;
} else if (currentValue <= 1) {
    prev.disabled = true;
} else {
    next.disabled = false;
    prev.disabled = false;
}