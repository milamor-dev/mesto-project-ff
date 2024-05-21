import {createCard, deleteCard, likeCard} from './card.js';
import {openPopup, setCloseModalByClickListeners} from './modal.js';
import {renderLoading, editLocalAvatar, handleEditProfileFormSubmit, handleAddCardFormSubmit, editLocalProfile, handleChangeAvatarFormSubmit} from './forms.js';
import {clearValidation, enableValidation} from './validation.js';
import {getUsersInfo, getAllCards} from './api.js'; 

export {openImagePopup, formEditProfile, pageName, pageDescription, formNewCard, formEditAvatar, cardsContainer, openAvatarPopup, pageAvatar,};

const cardsContainer = document.querySelector('.places__list');

const openProfileEditPopupButton = document.querySelector('.profile__edit-button');
const openAddCardPopupButton = document.querySelector('.profile__add-button');

const pageName = document.querySelector('.profile__title');
const pageDescription = document.querySelector('.profile__description');
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const popupEdit = document.querySelector('.popup_type_edit');


//форма обновления аватара
const formEditAvatar = document.forms['avatar'];
const pageAvatar = document.querySelector('.profile__image');
const popupPageAvatar = document.querySelector('.popup_type_avatar');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup__image');
const popuCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup_type_image');

const popupList = document.querySelectorAll('.popup');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'form__input_type_errorr',
    errorClass: 'form__input-error_active'
    };

function renderCard(cardData, deleteCard, currentUserId) {   
    cardsContainer.append(createCard(cardData, deleteCard, likeCard, openImagePopup, currentUserId));
};
function openAvatarPopup () {
    clearValidation(formEditAvatar, validationConfig);
    formEditAvatar.reset(); 
    renderLoading(formEditAvatar, false);
    openPopup(popupPageAvatar);
}

function openImagePopup (img) {
    popupImg.src = img.link;
    popupImg.alt = img.name;
    popuCaption.textContent = img.name;

    openPopup (popupImage);
};

openAddCardPopupButton.addEventListener('click', () => {
    clearValidation(formNewCard, validationConfig);
    formNewCard.reset(); 
    renderLoading(formNewCard, false);
    openPopup(popupNewCard);
});

pageAvatar.addEventListener('click', openAvatarPopup);

formEditAvatar.addEventListener('submit', (evt) => {handleChangeAvatarFormSubmit(evt, popupPageAvatar)});

function openProfilePopup() {    
    formEditProfile.elements.name.value = pageName.textContent;
    formEditProfile.elements.description.value = pageDescription.textContent;
    clearValidation(formEditProfile, validationConfig);
    renderLoading(formEditProfile, false);
    openPopup(popupEdit);    
};

openProfileEditPopupButton.addEventListener('click', openProfilePopup);

setCloseModalByClickListeners(popupList);

formEditProfile.addEventListener('submit', (evt) => {handleEditProfileFormSubmit(evt, popupEdit)});

formNewCard.addEventListener('submit', (evt) => {handleAddCardFormSubmit(evt, popupNewCard)});

enableValidation(validationConfig); 

//api

Promise.all([getUsersInfo(), getAllCards()])
.then(([userInfo, allCards]) => 
{
    allCards.forEach((cardData) => {renderCard(cardData, deleteCard, userInfo._id)});
    editLocalProfile({
        name: userInfo.name,
        about: userInfo.about,
    });
    editLocalAvatar({
        avatar: userInfo.avatar,
    })
    
})
.catch((err) => {
    console.log(err); // выводим ошибку в консоль
    }); 