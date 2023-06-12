import './style.css';

function handleError(error) {
  console.log(error);
}
async function getWeather(searchValue) {
  /* fetch(`http://api.weatherapi.com/v1/current.json?key=a2ab483a5ab34008a59185749231106&q=${searchValue}&aqi=no`, { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      if (response) {
        console.log(response);
      } else {
        throw new Error('problem');
      }
    })
    .catch(handleError);
    */
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=a2ab483a5ab34008a59185749231106&q=${searchValue}&aqi=no`, { mode: 'cors' });
  if (response.status === 200) {
    const weatherData = await response.json();
    return weatherData;
  } if (response.status === 400) {
    throw new Error('empty');
  }
  throw new Error(response.status);
}

const weatherForm = document.getElementById('weather-form');
weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchValue = event.target.search.value;
  getWeather(searchValue).catch(handleError);
});
