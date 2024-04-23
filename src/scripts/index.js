import {initialCards} from './cards.js';
import {renderCard, deleteCard} from '../components/card.js';
import {openPopup, openProfile} from '../components/modal.js';
import {ProfileForm, NewCardForm} from '../components/forms.js';

export {formEditProfile, pageName, pageDescription, formNewCard, placesList};

const placesList = document.querySelector('.places__list');

const pageName = document.querySelector('.profile__title');
const pageDescription = document.querySelector('.profile__description');

const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];

initialCards.forEach((item) => {renderCard(item, deleteCard)});

document.querySelector('.profile__add-button').addEventListener('click', () => {
    openPopup('.popup_type_new-card');
});

document.querySelector('.profile__edit-button').addEventListener('click', openProfile);

formEditProfile.addEventListener('submit', ProfileForm);

formNewCard.addEventListener('submit', NewCardForm);