export {renderLoading, editLocalAvatar, handleEditProfileFormSubmit, handleAddCardFormSubmit, editLocalProfile, handleChangeAvatarFormSubmit};

import {createCard, deleteCard, likeCard} from './card.js';
import {cardsContainer, formNewCard, pageName, pageDescription, openImagePopup, formEditAvatar} from './index.js';
import {closePopup} from './modal.js';
import {createNewDBCard, editDBProfile, editDBAvatar} from './api.js';

const nameInput = document.querySelector('.popup__input_type_name');
const AboutInput = document.querySelector('.popup__input_type_description');

const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinkInput = document.querySelector('.popup__input_type_url');
const avatarLinkInput = document.querySelector('.popup__input_type_avatar_url');
const avatarImg = document.querySelector('.profile__image');

function handleEditProfileFormSubmit (evt, popup) {
    evt.preventDefault();
    renderLoading(popup, true);

    const profileInfo = {
        name: nameInput.value,
        about: AboutInput.value,
    };

    editLocalProfile(profileInfo);

    editDBProfile(profileInfo);

    closePopup(popup);
}

function editLocalProfile (profileInfo) {
    pageName.textContent = profileInfo.name;
    pageDescription.textContent = profileInfo.about;
}

function handleAddCardFormSubmit (evt, popup) {
    evt.preventDefault();
    renderLoading(popup, true);

    const cardData = {
        name: placeNameInput.value,
        link: placeLinkInput.value,
    };

    Promise.all([createNewDBCard(cardData)])
    .then(([cardDBData]) => {
        const newCard = createCard(cardDBData, deleteCard, likeCard, openImagePopup, cardDBData.owner._id);

        cardsContainer.prepend(newCard);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 

    formNewCard.reset();        
    closePopup(popup);    
}

//форма обновления аватара
function editLocalAvatar (avatarData) {
    avatarImg.style = `background-image: url('${avatarData.avatar}');`
}

function handleChangeAvatarFormSubmit (evt, popup) {
    evt.preventDefault();
    renderLoading(popup, true);

    const avatarData = {
        avatar: avatarLinkInput.value,
    };

    editLocalAvatar(avatarData);

    editDBAvatar (avatarData);

    formEditAvatar.reset();        
    closePopup(popup);    
}

// Улучшенный UX всех форм

function renderLoading (popup, isLoading) {
    const popupButton = popup.querySelector('.popup__button');
    if (isLoading) {
        popupButton.textContent = 'Сохранение...';
    } else {
        popupButton.textContent = 'Сохранить';
    }
}