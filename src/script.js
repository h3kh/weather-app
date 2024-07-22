'use strict';

// Elements
const searchEl = document.querySelector('button');
const searchBar = document.querySelector('input');
const backGround = document.querySelector('.background');
const errorEl = document.querySelector('.error');

// Functions
errorEl.style.display = 'none';
let html;

const wheather = async function () {
  searchBar.focus();
  const country = searchBar.value;
  const url = `http://api.weatherapi.com/v1/current.json?key=f624c491b7954895a1291140241707&q=${country}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      throw 'country not found!';
    } else {
      html = `<div class="condition flex-center flex-col my-10">
      <img class="size-28" src="/src/imges/${data.current.condition.text}.png" alt="${data.current.condition.text}" />
      <h2 class="number text-white text-6xl mt-6 font-semibold">${data.current.temp_c}°c</h2>
      <h2 class="number text-white text-5xl mt-6">${data.location.name}</h2>
      <div class="flex-center mt-10 space-x-10">
        <div class="flex-center">
          <img class="humidity" src="/src/imges/humidity.png" alt="" />
          <span class="text-white ml-2"
            ><h2 class="text-xl font-bold">${data.current.humidity}%</h2>
            humidity
          </span>
        </div>
        <div class="flex-center">
          <img class="wind size-11" src="/src/imges/wind.png" alt="" />
          <span class="text-white ml-2"
            ><h2 class="text-xl font-medium">${data.current.wind_kph} km/h</h2>
            wind speed
          </span>
        </div>
      </div>
    </div>`;

      backGround.classList.replace('h-96', 'h-auto');
      const selHtml = document.querySelector('.condition');
      backGround.insertAdjacentHTML('beforeend', html);

      selHtml ? selHtml.remove() : '';

      searchBar.value = '';
      errorEl.style.display = 'none';
    }
  } catch (err) {
    const selErrHtml = document.querySelector('.condition');
    selErrHtml ? selErrHtml.remove() : '';
    errorEl.textContent = err;
    errorEl.style.display = 'block';
    searchBar.value = '';
  }
};

// Events
searchEl.addEventListener('click', wheather);
