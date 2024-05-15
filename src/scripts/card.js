export {deleteCard, likeCard, createCard};

const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector('.card');

function createCard(cardData, deleteCard, likeCard, openImagePopup) {
    const newCard = cardElement.cloneNode(true);
    const cardImg = newCard.querySelector('.card__image');
    const cardTitle = newCard.querySelector('.card__title');
    const likeButton = newCard.querySelector('.card__like-button');
    const deleteButton = newCard.querySelector('.card__delete-button');

    cardTitle.textContent = cardData.name;
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;

    deleteButton.addEventListener('click', () => {
        deleteCard(newCard);
    });

    likeButton.addEventListener('click', () => {likeCard(likeButton)});

    cardImg.addEventListener('click', () => {
        openImagePopup (cardData);
    });

    return newCard;
}

function deleteCard(cardData) {
    cardData.remove();
}

function likeCard(button) {    
    button.classList.toggle('card__like-button_is-active');
}