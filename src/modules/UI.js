import FetchAPI from './FetchAPI';

export default class UI {
  static displayData(data) {
    const date = document.getElementById('date');
    const description = document.getElementById('weather-description');
    const name = document.getElementById('city');
    const temperature = document.getElementById('temperature');
    const feelsLike = document.getElementById('feels-like');
    const wind = document.getElementById('wind');
    const humidity = document.getElementById('humidity');

    date.textContent = `${data.date}`;
    description.textContent = `${data.description}`;
    name.textContent = `${data.city}, ${data.state}`;
    temperature.textContent = `${Math.round(data.temperatureF)}°`;
    feelsLike.textContent = `Feels like: ${data.feelsLikeF}°`;
    wind.textContent = `Wind: ${data.wind} MPH`;
    humidity.textContent = `Humidity: ${data.humidity}%`;
  }

  static convertToCelsius(temp) {
    return (temp - 32) / 1.8;
  }

  static convertToFahrenheit(temp) {

  }

  static handleEvent(search = 'indianapolis') {
    const errorMsg = document.getElementById('errorMsg');
    if (!search) {
      errorMsg.textContent = 'Please enter a city.';
      return;
    }

    FetchAPI.fetchData(search)
      .then((result) => {
        UI.displayData(result);
        errorMsg.textContent = '';
      }).catch((error) => {
        console.error(error);
        errorMsg.textContent = 'Could not find city.';
      });
  }

  static handleListener() {
    UI.handleEvent();
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const searchValue = searchInput.value.trim();
      UI.handleEvent(searchValue);
      searchInput.value = '';
    });
  }
}
