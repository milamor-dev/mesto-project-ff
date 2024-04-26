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
    openPopup(popupNewCard);
});

function openProfilePopup() {    
    formEditProfile.elements.name.value = pageName.textContent;
    formEditProfile.elements.description.value = pageDescription.textContent;
    openPopup(popupEdit);
}

openProfileEditPopupButton.addEventListener('click', openProfilePopup);

setCloseModalByClickListeners(document.querySelectorAll('.popup'));

formEditProfile.addEventListener('submit', (evt) => {handleEditProfileFormSubmit(evt, popupEdit)});

formNewCard.addEventListener('submit', (evt) => {handleAddCardFormSubmit(evt, popupNewCard)});