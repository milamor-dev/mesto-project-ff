export {renderCard, deleteCard, likeCard};
// import {placesList} from '.././scripts/index.js';
import {placesList} from '../scripts/index.js';


function getCard(item, deleteCard, likeCard) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardElement);
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);

    return cardElement;
}

function renderCard(item) {   
    placesList.append(getCard(item, deleteCard, likeCard));
}

function deleteCard(item) {
    item.remove();
}

// initialCards.forEach((item) => {renderCard(item, deleteCard)});

// like

function likeCard(evt) {   
    if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active')};
}

