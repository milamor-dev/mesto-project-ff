// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import {initialCards} from './cards.js';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector("#card-template").content;



function getCard(item, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardElement);
    });

    return cardElement;
}

function renderCard(item) {   
    placesList.append(getCard(item, deleteCard));
}

function deleteCard(item) {
    item.remove();
}

initialCards.forEach((item) => {renderCard(item, deleteCard)});