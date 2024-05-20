import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {openPopup, setCloseModalByClickListeners} from './modal.js';
import {editLocalAvatar, handleEditProfileFormSubmit, handleAddCardFormSubmit, editLocalProfile, handleChangeAvatarFormSubmit} from './forms.js';
import {clearValidation, enableValidation} from './validation.js';
// import { log10 } from 'core-js/core/number';

export {editDBAvatar, openImagePopup, formEditProfile, pageName, pageDescription, formNewCard, formEditAvatar, cardsContainer, createNewCard, editDBProfile, deleteDBCard, openAvatarPopup, pageAvatar, addDBLike, deleteDBLike};

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

// const cardLikeCounter = document.querySelectorAll('.card__like_counter');

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

// initialCards.forEach((cardData) => {renderCard(cardData, deleteCard)});

//аватар
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
};

openAddCardPopupButton.addEventListener('click', () => {
    clearValidation(formNewCard, validationConfig);
    formNewCard.reset(); 
    openPopup(popupNewCard);
});

// аватар
pageAvatar.addEventListener('click', openAvatarPopup);

formEditAvatar.addEventListener('submit', (evt) => {handleChangeAvatarFormSubmit(evt, popupPageAvatar)});
// аватар



function openProfilePopup() {    
    formEditProfile.elements.name.value = pageName.textContent;
    formEditProfile.elements.description.value = pageDescription.textContent;
    clearValidation(formEditProfile, validationConfig);
    openPopup(popupEdit);    
};

openProfileEditPopupButton.addEventListener('click', openProfilePopup);

setCloseModalByClickListeners(popupList);

formEditProfile.addEventListener('submit', (evt) => {handleEditProfileFormSubmit(evt, popupEdit)});

formNewCard.addEventListener('submit', (evt) => {handleAddCardFormSubmit(evt, popupNewCard)});

enableValidation(validationConfig); 

// это в  api.js

const myToken = 'ad0dc748-c960-4952-aca3-c228541ba83f';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
    headers: {
        authorization: 'ad0dc748-c960-4952-aca3-c228541ba83f',
        'Content-Type': 'application/json'
    }
    }

function handleRequest (res) 
{
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

// function renderError (err) 
// {
//     err.textContent = err; 
// }

//Загрузка информации о пользователе с сервера
function getUsersInfo()
{
    return fetch ('https://nomoreparties.co/v1/wff-cohort-13/users/me', 
        {
            headers: 
            {
                authorization: myToken
            }
        }
    )
    .then(handleRequest)
};

// Постановка и снятие лайка

const addDBLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, 
    {
        method: "PUT",
        headers: config.headers
    })
        .then(handleRequest)
}

const deleteDBLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, 
    {
        method: "DELETE",
        headers: config.headers
    })
        .then(handleRequest)
}

//Загрузка карточек с сервера
function getAllCards ()
{
    return fetch ('https://nomoreparties.co/v1/wff-cohort-13/cards', 
        {
            method: "GET",
            headers: 
            {
                authorization: myToken
            }
        }
    )
    .then(handleRequest)
}

// Добавление новой карточки
function createNewCard (newCard) 
{
    return fetch ('https://nomoreparties.co/v1/wff-cohort-13/cards',
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: myToken
        },
        body: JSON.stringify({            
            name: newCard.name,
            link: newCard.link,
        })
    })
    .then(handleRequest)
}

// Редактирование профиля
function editDBProfile (newProfile) 
{
    return fetch ('https://nomoreparties.co/v1/wff-cohort-13/users/me',
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: myToken
        },
        body: JSON.stringify({            
            name: newProfile.name,
            about: newProfile.about
        })
    })
}

// Удаление карточки
function deleteDBCard (cardId)
{
    return fetch (`https://nomoreparties.co/v1/wff-cohort-13/cards/${cardId}`, 
        {
            method: "DELETE",
            headers: 
            {
                "Content-Type": "application/json",
                authorization: myToken
            }            
        }
    )  
}

// Обновление аватара пользователя
function editDBAvatar (newAvatar) 
{
    return fetch ('https://nomoreparties.co/v1/wff-cohort-13/users/me/avatar',
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: myToken
        },
        body: JSON.stringify({            
            avatar: newAvatar.avatar
        })
    })
}


// это в index

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
// .catch((err) => 
// {
//     renderError(`Ошибка: ${err}`);
// }); 

