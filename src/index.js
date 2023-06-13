import './style.css';

const nameNode = document.querySelector('.city');

function updatePlace(data) {
  nameNode.textContent = data.name;  
}
function resolve(data) {
  const curr = data.current;
  const loc = data.location;
  const usefulData = {
    name: loc.name,
    country: loc.country,
    region: loc.region,
    localtime: loc.localtime,
    temp_f: curr.temp_f,
    temp_c: curr.temp_c,
  };
  updatePlace(usefulData);
  console.log(usefulData.name);
  // console.log(usefulData);
  return usefulData;
}
function handleError(error) {
  console.log(`There was an error:${error}`);
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
  const weatherData = await response.json();
  if (response.status === 200) {
    // console.log(weatherData);
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
  const data = getWeather(searchValue);
  data.then(resolve).catch(handleError);
  //console.log(weatherData);
});
