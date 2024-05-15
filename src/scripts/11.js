// валидация

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) =>
{
    // const regex = /^[a-zа-яё\s\-]+$/i; ^[a-zA-Zа-яёА-ЯЁ\s\-]+$


    // if (regex.test(!inputElement.value)) {
    //     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    // } else {
    // inputElement.setCustomValidity("");
    // };

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}; 

function setEventListeners (formElement, validationConfig)
{
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => 
    {
        inputElement.addEventListener('input', () => 
        {
            isValid(formElement, inputElement);

            toggleButtonState(inputList, buttonElement);
        });
    });
};

function enableValidation (validationConfig) 
{
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => 
    {
        setEventListeners(formElement, validationConfig);
    })
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_inactive');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_inactive');
    }
}

const clearValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
    }); 


    // работает вроде

    import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {openPopup, setCloseModalByClickListeners} from './modal.js';
import {handleEditProfileFormSubmit, handleAddCardFormSubmit} from './forms.js';

export {openImagePopup, formEditProfile, pageName, pageDescription, formNewCard, cardsContainer};

const cardsContainer = document.querySelector('.places__list');

const openProfileEditPopupButton = document.querySelector('.profile__edit-button');
const openAddCardPopupButton = document.querySelector('.profile__add-button');

const pageName = document.querySelector('.profile__title');
const pageDescription = document.querySelector('.profile__description');
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const popupEdit = document.querySelector('.popup_type_edit');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup__image');
const popuCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup_type_image');

const popupList = document.querySelectorAll('.popup');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
    }

function renderCard(cardData) {   
    cardsContainer.append(createCard(cardData, deleteCard, likeCard, openImagePopup));
}

initialCards.forEach((cardData) => {renderCard(cardData, deleteCard)});

function openImagePopup (img) {
    popupImg.src = img.link;
    popupImg.alt = img.name;
    popuCaption.textContent = img.name;

    openPopup (popupImage);
}

openAddCardPopupButton.addEventListener('click', () => {
    clearValidation(formNewCard, validationConfig);
    formNewCard.reset(); 
    openPopup(popupNewCard);
});

function openProfilePopup() {    
    formEditProfile.elements.name.value = pageName.textContent;
    formEditProfile.elements.description.value = pageDescription.textContent;
    clearValidation(formEditProfile, validationConfig);
    openPopup(popupEdit);    
}

openProfileEditPopupButton.addEventListener('click', openProfilePopup);

setCloseModalByClickListeners(popupList);

formEditProfile.addEventListener('submit', (evt) => {handleEditProfileFormSubmit(evt, popupEdit)});

formNewCard.addEventListener('submit', (evt) => {handleAddCardFormSubmit(evt, popupNewCard)});

// валидация

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) =>
{
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}; 

function setEventListeners (formElement, validationConfig)
{
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => 
    {
        inputElement.addEventListener('input', () => 
        {
            isValid(formElement, inputElement);

            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

function enableValidation (validationConfig) 
{
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => 
    {
        setEventListeners(formElement, validationConfig);
    })
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
}

function clearValidation (formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });
};

enableValidation(validationConfig); 