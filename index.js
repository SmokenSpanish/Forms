import FormValidation from "./scripts/FormValidator.js";
import { regForm, 
        authForm, 
        progress, 
        prev, 
        next, 
        circles,
        regButton, 
        authButton } from "./scripts/constants.js";

const regFormValidator = new FormValidation(regForm)
const authFormValidator = new FormValidation(authForm)

regFormValidator.enableValidation();
authFormValidator.enableValidation();

regForm.addEventListener("submit", () => {
    const circleFirst = document.querySelector('.circle-first');
    const circleSecond = document.querySelector('.circle-second');
    circleFirst.classList.add("circle__type_done");
    circleSecond.classList.add("circle__type_active");
    progress.style.width = '100%';
});

authForm.addEventListener("submit", () => {
    const circleSecond = document.querySelector('.circle-second')
    circleSecond.classList.add("circle__type_done");
});