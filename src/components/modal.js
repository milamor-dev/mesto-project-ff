export {openPopup, openImagePopup, openProfile, closePopup};

import {formEditProfile, pageName, pageDescription} from '.././scripts/index.js';

// open popup

function openPopup (selector) {  
    const popUp = document.querySelector(selector); 
    popUp.classList.add('popup_is-opened');
    popUp.classList.add('popup_is-animated');
    document.addEventListener('keydown', closeOnEscape);
}

function openImagePopup (img) {
    const popupImg = document.querySelector('.popup__image');
    const popuCaption = document.querySelector('.popup__caption');

    popupImg.src = img.link;
    popuCaption.textContent = img.name;

    openPopup ('.popup_type_image');
}

function openProfile() {    
    formEditProfile.elements.name.value = pageName.textContent;
    formEditProfile.elements.description.value = pageDescription.textContent;
    openPopup('.popup_type_edit')
}

// close popup

function closePopup () { 
    const popUp = document.querySelector('.popup_is-opened'); 
    popUp.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEscape);
}

document.querySelectorAll('.popup__close').forEach((item) => {
    item.addEventListener('click', closePopup);
});

document.querySelectorAll('.popup').forEach ( (popup) => {
    popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup')) {
            closePopup();
        }
    });
});
    
function closeOnEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup ();
    }
}