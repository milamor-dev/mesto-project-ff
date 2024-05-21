(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-13",headers:{authorization:"ad0dc748-c960-4952-aca3-c228541ba83f","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var n=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t).catch((function(e){console.log(e)}))},r=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t).catch((function(e){console.log(e)}))},o=document.querySelector("#card-template").content.querySelector(".card");function c(e,t,n,r,c){var a=o.cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__title"),l=a.querySelector(".card__like-button"),s=a.querySelector(".card__delete-button"),d=a.querySelector(".card__like_counter");return u.textContent=e.name,i.src=e.link,i.alt=e.name,d.textContent=e.likes.length,e.owner._id!==c&&s.remove(),e.likes.some((function(e){return e._id===c}))&&l.classList.toggle("card__like-button_is-active"),s.addEventListener("click",(function(){t(a,e._id)})),l.addEventListener("click",(function(){n(l,e._id,d)})),i.addEventListener("click",(function(){r(e)})),a}function a(t,n){t.remove(),function(t){fetch("".concat(e.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:e.headers})}(n)}function i(e,t,o){(e.classList.contains("card__like-button_is-active")?r:n)(t).then((function(t){o.textContent=t.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)}))}function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",s)}function l(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s)}function s(e){"Escape"===e.key&&l(document.querySelector(".popup_is-opened"))}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p=document.querySelector(".popup__input_type_name"),f=document.querySelector(".popup__input_type_description"),m=document.querySelector(".popup__input_type_card-name"),y=document.querySelector(".popup__input_type_url"),_=document.querySelector(".popup__input_type_avatar_url"),v=document.querySelector(".profile__image");function h(e){w.textContent=e.name,j.textContent=e.about}function b(e){v.style="background-image: url('".concat(e.avatar,"');")}function S(e,t){e.querySelector(".popup__button").textContent=t?"Сохранение...":"Сохранить"}function g(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function q(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function E(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));q(n,e.querySelector(t.submitButtonSelector),t),n.forEach((function(n){g(e,n,t)}))}function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var L=document.querySelector(".places__list"),C=document.querySelector(".profile__edit-button"),A=document.querySelector(".profile__add-button"),w=document.querySelector(".profile__title"),j=document.querySelector(".profile__description"),x=document.forms["edit-profile"],O=document.forms["new-place"],U=document.querySelector(".popup_type_edit"),T=document.forms.avatar,P=document.querySelector(".profile__image"),B=document.querySelector(".popup_type_avatar"),I=document.querySelector(".popup_type_new-card"),D=document.querySelector(".popup__image"),M=document.querySelector(".popup__caption"),N=document.querySelector(".popup_type_image"),J=document.querySelectorAll(".popup"),H={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"form__input_type_errorr",errorClass:"form__input-error_active"};function V(e){D.src=e.link,D.alt=e.name,M.textContent=e.name,u(N)}A.addEventListener("click",(function(){E(O,H),O.reset(),S(O,!1),u(I)})),P.addEventListener("click",(function(){E(T,H),T.reset(),S(T,!1),u(B)})),T.addEventListener("submit",(function(t){!function(t,n){t.preventDefault(),S(n,!0);var r,o={avatar:_.value};b(o),r=o,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r.avatar})}),T.reset(),l(n)}(t,B)})),C.addEventListener("click",(function(){x.elements.name.value=w.textContent,x.elements.description.value=j.textContent,E(x,H),S(x,!1),u(U)})),function(e){e.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){l(e)})),e.addEventListener("click",(function(t){t.target.classList.contains("popup")&&l(e)}))}))}(J),x.addEventListener("submit",(function(t){!function(t,n){t.preventDefault(),S(n,!0);var r,o={name:p.value,about:f.value};h(o),r=o,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r.name,about:r.about})}),l(n)}(t,U)})),O.addEventListener("submit",(function(n){!function(n,r){n.preventDefault(),S(r,!0);var o,u={name:m.value,link:y.value};Promise.all([(o=u,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:o.name,link:o.link})}).then(t).catch((function(e){console.log(e)})))]).then((function(e){var t,n,r=(t=e,n=1,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0],o=c(r,a,i,V,r.owner._id);L.prepend(o)})).catch((function(e){console.log(e)})),O.reset(),l(r)}(n,I)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);q(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?g(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),q(n,r,t)}))}))}(t,e)}))}(H),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t).catch((function(e){console.log(e)})),fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then(t).catch((function(e){console.log(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return k(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?k(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0];r[1].forEach((function(e){!function(e,t,n){L.append(c(e,t,i,V,n))}(e,a,o._id)})),h({name:o.name,about:o.about}),b({avatar:o.avatar})})).catch((function(e){console.log(e)}))})();