export {handleEditProfileFormSubmit, handleAddCardFormSubmit, nameInput, jobInput, editLocalProfile};

import {createCard, deleteCard, likeCard} from './card.js';
import {cardsContainer, formNewCard, pageName, pageDescription, openImagePopup, createNewCard, editDBProfile} from './index.js';
import {closePopup} from './modal.js';

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinkInput = document.querySelector('.popup__input_type_url');

function handleEditProfileFormSubmit (evt, popup) {
    evt.preventDefault();

    const profileInfo = {
        name: nameInput.value,
        about: jobInput.value,
    };

    editLocalProfile(profileInfo);

    editDBProfile(profileInfo);

    closePopup(popup);
}

function editLocalProfile (profileInfo) {
    pageName.textContent = profileInfo.name;
    pageDescription.textContent = profileInfo.about;
}

function handleAddCardFormSubmit (evt, popup) {
    evt.preventDefault();

    const cardData = {
        name: placeNameInput.value,
        link: placeLinkInput.value,
    };

    createNewCard(cardData);

    const newCard = createCard(cardData, deleteCard, likeCard, openImagePopup);

    cardsContainer.prepend(newCard);
    
    formNewCard.reset();        
    closePopup(popup);    
}