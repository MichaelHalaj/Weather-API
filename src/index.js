import './style.css';

const cityNode = document.querySelector('.city');
const countryNode = document.querySelector('.country');
const tempNode = document.querySelector('.temp');
const resultNode = document.querySelector('.result');
const conditionNode = document.querySelector('.condition');
const failedSearchNode = document.querySelector('.no-location');

function updatePlace(data) {
  cityNode.textContent = data.name;
  countryNode.textContent = `, ${data.country}`;
  tempNode.innerHTML = `${data.temp_f}&degF`;
  conditionNode.textContent = data.condition;
}
function resolve(data) {
  const curr = data.current;
  const loc = data.location;
  const usefulData = {
    name: loc.name,
    country: loc.country,
    condition: curr.condition.text,
    region: loc.region,
    localtime: loc.localtime,
    temp_f: curr.temp_f,
    temp_c: curr.temp_c,
  };
  updatePlace(usefulData);
  // console.log(usefulData);
  return usefulData;
}
function handleError(error) {
  if (error.message === '400') {
    failedSearchNode.classList.add('visible');
  }
}

async function getWeather(searchValue) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=a2ab483a5ab34008a59185749231106&q=${searchValue}&aqi=no`, { mode: 'cors' });
  const weatherData = await response.json();
  if (response.status === 200) {
    // console.log(weatherData);
    return weatherData;
  } if (response.status === 400) {
    throw new Error(400);
  }
  throw new Error(response.status);
}

const weatherForm = document.getElementById('weather-form');
weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  resultNode.classList.remove('visible');
  const searchValue = event.target.search.value;
  const data = getWeather(searchValue);
  data.then(resolve)
    .then(() => {
      resultNode.classList.add('visible');
      failedSearchNode.classList.remove('visible');
    })
    .catch(handleError);
  weatherForm.reset();
  // console.log(weatherData);
});
