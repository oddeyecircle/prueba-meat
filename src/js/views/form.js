import { elements } from "./base";
import * as FormController from "../controllers/form.controller";

elements.form.addEventListener("input", function (e) {
    const input = e.target;
    const inputName = input.name;
    const value = input.value;
    if (!input.classList.contains("touched")) {
        input.classList.add("touched");
    }
    switch (true) {
        case inputName === "email":
            FormController.handleValidation(
                FormController.validateEmail(value),
                input
            );
            break;
        case inputName === "phone":
            FormController.handleValidation(
                FormController.validatePhone(value),
                input
            );
            break;
        case inputName === "firstname":
        case inputName === "lastname":
            FormController.handleValidation(!!value, input);
            break;
    }
    const isFormValid =
        elements.form.querySelectorAll(".invalid").length === 0 &&
        elements.form.querySelectorAll(".touched").length >= 4;
    FormController.handleButton(isFormValid, elements.formButton);
});

elements.form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData();
    this.querySelectorAll("input").forEach(input => {
        input.setAttribute("disabled", true);
        formData.append(input.name, input.value);
    });
    elements.formButton.setAttribute("disabled", true);
    this.classList.add("disabled");
    FormController.handleFormSubmit(
        formData,
        FormController.handleFormSubmitted(this)
    );
});
