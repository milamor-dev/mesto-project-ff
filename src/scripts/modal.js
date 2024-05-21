export {openPopup, closePopup, setCloseModalByClickListeners};


function openPopup (popup) {     
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEscape);
}

function closePopup (openedPopup) { 
    openedPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup (openedPopup);
    }
}

function setCloseModalByClickListeners(popupList) {
    popupList.forEach((popup) => {
        const closeButton = popup.querySelector('.popup__close');
        closeButton.addEventListener('click', () => {
            closePopup(popup);
        });
    
        popup.addEventListener('mousedown', (evt) => {
            if(evt.target.classList.contains('popup')) {
                closePopup(popup);
            }
        });
    });
}