import { parse } from 'date-fns';
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
    temperature.textContent = `${Math.round(data.temperatureF)}°F`;
    feelsLike.textContent = `Feels like: ${data.feelsLikeF}°F`;
    wind.textContent = `Wind: ${data.wind} MPH`;
    humidity.textContent = `Humidity: ${data.humidity}%`;
  }

  static convertToCelsius(temp) {
    return (temp - 32) / 1.8;
  }

  static convertToFahrenheit(temp) {
    return temp * 1.8 + 32;
  }

  static toggleTemperatureUnit() {
    const temperature = document.getElementById('temperature');
    const feelsLike = document.getElementById('feels-like');

    const currentTemperature = parseFloat(temperature.textContent);
    const currentFeelsLike = parseFloat(feelsLike.textContent.split(' ')[2]);

    if (temperature.textContent.includes('F')) {
      const convertTemperatureToC = UI.convertToCelsius(`${currentTemperature}`);
      const convertFeelsLikeToC = UI.convertToCelsius(`${currentFeelsLike}`);

      temperature.textContent = `${Math.round(convertTemperatureToC)}°C`;
      feelsLike.textContent = `Feels like: ${Math.round(convertFeelsLikeToC)}°C`;
    } else {
      const convertTemperatureToF = UI.convertToFahrenheit(`${currentTemperature}`);
      const convertFeelsLikeToF = UI.convertToFahrenheit(`${currentFeelsLike}`);

      temperature.textContent = `${Math.round(convertTemperatureToF)}°F`;
      feelsLike.textContent = `Feels like: ${Math.round(convertFeelsLikeToF)}°F`;
    }
  }

  static setGreeting() {
    const greetingElement = document.getElementById('greeting');
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      greetingElement.textContent = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingElement.textContent = 'Good afternoon';
    } else {
      greetingElement.textContent = 'Good evening';
    }
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

  static handleListeners() {
    UI.setGreeting();
    UI.handleEvent();
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('searchBtn');
    const tempConversionBtn = document.getElementById('tempConversionBtn');

    searchBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const searchValue = searchInput.value.trim();
      UI.handleEvent(searchValue);
      searchInput.value = '';
    });

    tempConversionBtn.addEventListener('click', () => {
      UI.toggleTemperatureUnit();
    });
  }
}
