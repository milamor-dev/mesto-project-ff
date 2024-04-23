export {renderCard, deleteCard, likeCard, getCard};

import {placesList} from '.././scripts/index.js';
import {openImagePopup} from './modal.js';

function getCard(item, deleteCard, likeCard) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const img = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = item.name;
    img.src = item.link;
    img.alt = item.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardElement);
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    img.addEventListener('click', () => {openImagePopup (item)});
 
    return cardElement;
}

function renderCard(item) {   
    placesList.append(getCard(item, deleteCard, likeCard));
}

function deleteCard(item) {
    item.remove();
}

function likeCard(evt) {   
    if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active')};
}

