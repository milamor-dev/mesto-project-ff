export {deleteDBLike, addDBLike, getUsersInfo, getAllCards, createNewDBCard, editDBProfile, deleteDBCard, editDBAvatar}

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
    return Promise.reject(`Ошибка: ${res.status}`);
};

//Загрузка информации о пользователе с сервера
function getUsersInfo()
{
    return fetch (`${config.baseUrl}/users/me`, 
        {
            headers: config.headers
        }
    )
    .then(handleRequest)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
        }); 
}

//Загрузка карточек с сервера
function getAllCards ()
{
    return fetch (`${config.baseUrl}/cards`, 
        {
            method: "GET",
            headers: config.headers
        }
    )
    .then(handleRequest)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
        }); 
}

// Добавление новой карточки
function createNewDBCard (newCard) 
{
    return fetch (`${config.baseUrl}/cards`,
    {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({            
            name: newCard.name,
            link: newCard.link,
        })
    })
    .then(handleRequest)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
        }); 
}

// Постановка и снятие лайка
const addDBLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, 
    {
        method: "PUT",
        headers: config.headers
    })
        .then(handleRequest)
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        }); 
}

const deleteDBLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, 
    {
        method: "DELETE",
        headers: config.headers
    })
        .then(handleRequest)
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        }); 
}

// Удаление карточки
function deleteDBCard (cardId)
{
    return fetch (`${config.baseUrl}/cards/${cardId}`, 
        {
            method: "DELETE",
            headers: config.headers          
        }
    )  
}

// Редактирование профиля
function editDBProfile (newProfile) 
{
    return fetch (`${config.baseUrl}/users/me`,
    {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({            
            name: newProfile.name,
            about: newProfile.about
        })
    })
}


// Обновление аватара пользователя
function editDBAvatar (newAvatar) 
{
    return fetch (`${config.baseUrl}/users/me/avatar`,
    {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({            
            avatar: newAvatar.avatar
        })
    })
}
