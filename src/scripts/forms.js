export {handleEditProfileFormSubmit, handleAddCardFormSubmit};

import {createCard, deleteCard, likeCard} from './card.js';
import {cardsContainer, formNewCard, pageName, pageDescription, openImagePopup} from './index.js';
import {closePopup} from './modal.js';

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinkInput = document.querySelector('.popup__input_type_url');

function handleEditProfileFormSubmit (evt, popup) {
    evt.preventDefault(); 

    pageName.textContent = nameInput.value;
    pageDescription.textContent = jobInput.value;

    closePopup(popup);
}

function handleAddCardFormSubmit (evt, popup) {
    evt.preventDefault();

    const cardData = {
        name: placeNameInput.value,
        link: placeLinkInput.value,
    };

    const newCard = createCard(cardData, deleteCard, likeCard, openImagePopup);

    cardsContainer.prepend(newCard);

    formNewCard.reset();
    closePopup(popup);  
}