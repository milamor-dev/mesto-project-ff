export {deleteCard, likeCard, createCard};
import {deleteDBLike, addDBLike, deleteDBCard} from './api.js';

const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector('.card');

function createCard(cardData, deleteCard, likeCard, openImagePopup, currentUserId) {
    const newCard = cardElement.cloneNode(true);
    const cardImg = newCard.querySelector('.card__image');
    const cardTitle = newCard.querySelector('.card__title');
    const likeButton = newCard.querySelector('.card__like-button');
    const deleteButton = newCard.querySelector('.card__delete-button');
    const cardLikeCounter = newCard.querySelector('.card__like_counter');

    cardTitle.textContent = cardData.name;
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardLikeCounter.textContent = cardData.likes.length;

    const ownerID = cardData.owner._id;
    if (ownerID !== currentUserId) {
        deleteButton.remove();
    }   

    const userIdLiked = cardData.likes.some((like) => like._id === currentUserId);
    if (userIdLiked) {        
        likeButton.classList.toggle('card__like-button_is-active');
    }

    deleteButton.addEventListener('click', () => {
        deleteCard(newCard, cardData._id);
    });

    likeButton.addEventListener('click', () => {likeCard(likeButton, cardData._id, cardLikeCounter)});

    cardImg.addEventListener('click', () => {
        openImagePopup (cardData);
    });

    return newCard;
}

function deleteCard(cardElement, cardId) {
    cardElement.remove();
    deleteDBCard (cardId);
}

function likeCard(button, cardId, cardLikeCounter) {
    const likeDBButton = button.classList.contains('card__like-button_is-active') ? deleteDBLike : addDBLike;
    likeDBButton(cardId).then((data) => {
        cardLikeCounter.textContent = data.likes.length;
        button.classList.toggle('card__like-button_is-active'); 
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}
