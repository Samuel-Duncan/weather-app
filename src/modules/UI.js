import FetchAPI from './FetchAPI';

export default class UI {
  static setTextContent(element, content) {
    element.textContent = content;
  }

  static displayData(data) {
    const date = document.getElementById('date');
    const description = document.getElementById('weather-description');
    const name = document.getElementById('city');
    const temperature = document.getElementById('temperature');
    const feelsLike = document.getElementById('feels-like');
    const wind = document.getElementById('wind');
    const humidity = document.getElementById('humidity');

    UI.setTextContent(date, `${data.date}`);
    UI.setTextContent(description, `${data.description}`);
    UI.setTextContent(name, `${data.city}, ${(data.country !== 'United States of America') ? data.country : data.state}`);
    UI.setTextContent(temperature, `${Math.round(data.temperatureF)}°F`);
    UI.setTextContent(feelsLike, `Feels like: ${Math.round(data.feelsLikeF)}°F`);
    UI.setTextContent(wind, `Wind: ${data.wind} MPH`);
    UI.setTextContent(humidity, `Humidity: ${data.humidity}%`);
  }

  static toggleTemperatureUnit() {
    const temperature = document.getElementById('temperature');
    const feelsLike = document.getElementById('feels-like');
    const currentTemperature = parseFloat(temperature.textContent);
    const currentFeelsLike = parseFloat(feelsLike.textContent.split(' ')[2]);
    const convertToCelsius = (temp) => (temp - 32) / 1.8;
    const convertToFahrenheit = (temp) => temp * 1.8 + 32;

    if (temperature.textContent.includes('F')) {
      const convertedTemperatureToC = convertToCelsius(`${currentTemperature}`);
      const convertedFeelsLikeToC = convertToCelsius(`${currentFeelsLike}`);

      UI.setTextContent(temperature, `${Math.round(convertedTemperatureToC)}°C`);
      UI.setTextContent(feelsLike, `Feels like: ${Math.round(convertedFeelsLikeToC)}°C`);
    } else {
      const convertedTemperatureToF = convertToFahrenheit(`${currentTemperature}`);
      const convertedFeelsLikeToF = convertToFahrenheit(`${currentFeelsLike}`);

      UI.setTextContent(temperature, `${Math.round(convertedTemperatureToF)}°F`);
      UI.setTextContent(feelsLike, `Feels like: ${Math.round(convertedFeelsLikeToF)}°F`);
    }
  }

  static setErrorMessage(message) {
    const errorMsg = document.getElementById('errorMsg');
    UI.setTextContent(errorMsg, message);
  }

  static setGreeting() {
    const greetingElement = document.getElementById('greeting');
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      UI.setTextContent(greetingElement, 'Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      UI.setTextContent(greetingElement, 'Good afternoon');
    } else {
      UI.setTextContent(greetingElement, 'Good evening');
    }
  }

  static handleEvent(search = 'indianapolis') {
    if (!search) {
      UI.setErrorMessage('Please enter a city.');
      return;
    }

    FetchAPI.fetchData(search)
      .then((result) => {
        UI.displayData(result);
        UI.setErrorMessage('');
      }).catch((error) => {
        console.error(error);
        UI.setErrorMessage('Could not find city.');
      });
  }

  static handleListeners() {
    const searchBtn = document.getElementById('searchBtn');
    const tempConversionBtn = document.getElementById('tempConversionBtn');

    searchBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const searchInput = document.getElementById('search-input');
      const searchValue = searchInput.value.trim();
      UI.handleEvent(searchValue);
      searchInput.value = '';
    });

    tempConversionBtn.addEventListener('click', () => {
      UI.toggleTemperatureUnit();
    });
  }

  static initialize() {
    UI.setGreeting();
    UI.handleEvent();
    UI.handleListeners();
  }
}
