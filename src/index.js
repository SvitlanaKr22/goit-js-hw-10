// Створи фронтенд частину програми пошуку даних про країну за її частковою або повною назвою.
// Використовуй публічний API Rest Countries v2, а саме ресурс name, який повертає масив об'єктів країн, що задовольнили критерій пошуку.
// Додай мінімальне оформлення елементів інтерфейсу.

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

Notify.init({
  width: '400px',
  fontSize: '20px',
  position: 'center-top',
});

inputdata = document.querySelector('#search-box');
list = document.querySelector('.country-list');
div = document.querySelector('.country-info');

inputdata.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  isClear();
  if (evt.target.value.trim() === '') return;

  fetchCountries(evt.target.value.trim())
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (countries.length > 1) list.innerHTML = creatMarkUp(countries);
      else div.innerHTML = markUpCountry(countries[0]);
    })
    .catch(() => Notify.failure('Oops, there is no country with that name'));
}

function creatMarkUp(countries) {
  return countries
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `<li>
        <img src="${svg}" alt="flag of ${official}" width="30" height="20">
        <p>${official}</p>
        </li>`
    )
    .join('');
}

function markUpCountry({
  name: { official },
  capital,
  population,
  flags: { svg },
  languages,
}) {
  return `<img src="${svg}" alt="flag of ${official}" width="100">
  <span>${official}</span>
  <p>Capital: ${capital}</p>
  <p>Population: ${population}</p>
  <p>Languages: ${Object.values(languages).join(', ')}</p>`;
}

function isClear() {
  list.innerHTML = '';
  div.innerHTML = '';
}
