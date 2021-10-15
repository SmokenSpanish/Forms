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

console.log(circles)

let currentValue = 1;

regForm.addEventListener("submit", () => {
    const circleFirst = document.querySelector('.circle-first');
    const circleSecond = document.querySelector('.circle-second')
    circleFirst.classList.add("circle__type_done");
    circleSecond.classList.add("circle__type_active");
});

authForm.addEventListener("submit", () => {
    const circle = document.querySelector('.circle-second')
    circle.classList.add("circle__type_active");
});

prev.addEventListener("click", function () {
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
    });


    const actives = document.querySelectorAll(".circle__type_active");
    progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + '%';
    if (currentValue === circles.length) {
        next.disabled = true;
    } else if (currentValue <= 1) {
        prev.disabled = true;
    } else {
        next.disabled = false;
        prev.disabled = false;
    }
}






