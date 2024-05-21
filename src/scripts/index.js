import {createCard, deleteCard, likeCard} from './card.js';
import {openPopup, setCloseModalByClickListeners, closePopup} from './modal.js';
import {clearValidation, enableValidation} from './validation.js';
import {getUsersInfo, getAllCards, createNewDBCard, editDBProfile, editDBAvatar} from './api.js'; 



const cardsContainer = document.querySelector('.places__list');

const openProfileEditPopupButton = document.querySelector('.profile__edit-button');
const openAddCardPopupButton = document.querySelector('.profile__add-button');
const popupList = document.querySelectorAll('.popup');

//форма редактирования профиля
const pageName = document.querySelector('.profile__title');
const pageDescription = document.querySelector('.profile__description');
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const popupEdit = document.querySelector('.popup_type_edit');

const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_description');

//форма обновления аватара
const formEditAvatar = document.forms['avatar'];
const pageAvatar = document.querySelector('.profile__image');
const popupPageAvatar = document.querySelector('.popup_type_avatar');

const avatarLinkInput = document.querySelector('.popup__input_type_avatar_url');
const avatarImg = document.querySelector('.profile__image');

//форма добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup__image');
const popuCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup_type_image');

const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinkInput = document.querySelector('.popup__input_type_url');


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
}

function openAvatarPopup () {
    clearValidation(formEditAvatar, validationConfig);
    formEditAvatar.reset(); 
    openPopup(popupPageAvatar);
}

function openImagePopup (img) {
    popupImg.src = img.link;
    popupImg.alt = img.name;
    popuCaption.textContent = img.name;

    openPopup (popupImage);
}

openAddCardPopupButton.addEventListener('click', () => {
    clearValidation(formNewCard, validationConfig);
    formNewCard.reset(); 
    openPopup(popupNewCard);
});

pageAvatar.addEventListener('click', openAvatarPopup);

formEditAvatar.addEventListener('submit', (evt) => {handleChangeAvatarFormSubmit(evt, popupPageAvatar)});

function openProfilePopup() {    
    formEditProfile.elements.name.value = pageName.textContent;
    formEditProfile.elements.description.value = pageDescription.textContent;
    clearValidation(formEditProfile, validationConfig);
    openPopup(popupEdit);    
}

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
.catch(err => console.log(`Ошибка.....: ${err}`));



function handleEditProfileFormSubmit (evt, popup) {
    evt.preventDefault();
    renderLoading(popup, true);

    const profileInfo = {
        name: nameInput.value,
        about: aboutInput.value,
    };

    editDBProfile(profileInfo)
    .then(() => {
        editLocalProfile(profileInfo);
        closePopup(popup);
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally (() => {
        renderLoading(formEditProfile, false);
    });    
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

    createNewDBCard(cardData)
    .then((cardDBData) => {
        const newCard = createCard(cardDBData, deleteCard, likeCard, openImagePopup, cardDBData.owner._id);

        cardsContainer.prepend(newCard);
        formNewCard.reset();        
        closePopup(popup); 
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally (() => {
        renderLoading(formNewCard, false);
    });
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

    editDBAvatar (avatarData)
    .then(() => {
        editLocalAvatar (avatarData);
        formEditAvatar.reset();        
        closePopup(popup);  
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally (() => {
        renderLoading(formEditAvatar, false);
    });
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