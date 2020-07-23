import validator from "validator";
import axios from "axios";

export const validateEmail = email => {
    return validator.isEmail(email);
};

export const validatePhone = phone => {
    return validator.isMobilePhone(phone, "es-CL");
};

export const handleValidation = (condition, el) => {
    if (condition === true) {
        el.classList.remove("invalid");
    } else {
        el.classList.add("invalid");
    }
};

export const handleButton = (condition, el) => {
    if (condition) {
        el.removeAttribute("disabled");
    } else {
        el.setAttribute("disabled", true);
    }
};

export const handleFormSubmit = async data => {
    await axios.post(
        "https://5eed24da4cbc340016330f0d.mockapi.io/api/subscribe",
        data
    );
};

export const handleFormSubmitted = el => {
    const template = `<h4 style="text-align: center; margin:16px 0">¡Gracias por subscribirte!</h4>`;
    el.parentElement.insertAdjacentHTML("afterbegin", template);
};
