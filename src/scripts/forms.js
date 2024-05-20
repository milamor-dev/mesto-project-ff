export {editLocalAvatar, handleEditProfileFormSubmit, handleAddCardFormSubmit, nameInput, jobInput, editLocalProfile, handleChangeAvatarFormSubmit};

import {createCard, deleteCard, likeCard} from './card.js';
import {cardsContainer, formNewCard, pageName, pageDescription, openImagePopup, createNewCard, editDBProfile, formEditAvatar, openAvatarPopup, editDBAvatar, pageAvatar} from './index.js';
import {closePopup} from './modal.js';

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinkInput = document.querySelector('.popup__input_type_url');
const avatarLinkInput = document.querySelector('.popup__input_type_avatar_url');
const avatarImg = document.querySelector('.profile__image');

function handleEditProfileFormSubmit (evt, popup) {
    evt.preventDefault();

    const profileInfo = {
        name: nameInput.value,
        about: jobInput.value,
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

    const cardData = {
        name: placeNameInput.value,
        link: placeLinkInput.value,
    };

    Promise.all([createNewCard(cardData)])
    .then(([cardDBData]) => {
        const newCard = createCard(cardDBData, deleteCard, likeCard, openImagePopup, cardDBData.owner._id);

        cardsContainer.prepend(newCard);
    })

    formNewCard.reset();        
    closePopup(popup);    
}

//форма обновления аватара
function editLocalAvatar (avatarData) {
    avatarImg.style = `background-image: url('${avatarData.avatar}');`
}

function handleChangeAvatarFormSubmit (evt, popup) {
    evt.preventDefault();

    const avatarData = {
        avatar: avatarLinkInput.value,
    };

    editLocalAvatar(avatarData);

    editDBAvatar (avatarData);

    formEditAvatar.reset();        
    closePopup(popup);    
}