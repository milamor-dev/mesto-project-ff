export {ProfileForm, NewCardForm};

import {getCard, deleteCard, likeCard} from './card.js';
import {placesList, formNewCard, pageName, pageDescription} from '.././scripts/index.js';
import {closePopup} from './modal.js';


function ProfileForm (evt) {
    evt.preventDefault(); 

    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_description');

    pageName.textContent = nameInput.value;
    pageDescription.textContent = jobInput.value;

    closePopup()
}

function NewCardForm (evt) {
    evt.preventDefault();
    
    const placeNameInput = document.querySelector('.popup__input_type_card-name');
    const placeLinkInput = document.querySelector('.popup__input_type_url');

    const cardData = {
        name: placeNameInput.value,
        link: placeLinkInput.value,
    };

    const newCard = getCard(cardData, deleteCard, likeCard);

    placesList.prepend(newCard);

    formNewCard.reset();
    closePopup();    
}