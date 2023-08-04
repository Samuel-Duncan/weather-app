export default class FetchAPI {
  constructor(searchCity) {
    this.searchCity = searchCity;
  }

  setSearchCity(searchCity) {
    this.searchCity = searchCity;
  }

  getSearchCity() {
    return this.searchCity;
  }

  static async fetchWeatherData(searchCity) {
    const endpoint = `http://api.weatherapi.com/v1/current.json?key=aad5fa17ae2c47f7b00214311230208&q=${searchCity}`;
    try {
      const response = await fetch(endpoint, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`City: ${searchCity} not found.`);
      }
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static organizeWeatherData(searchCity) {
    const weatherDataObject = {};

    this.fetchWeatherData(searchCity)
      .then((weatherData) => {
        weatherDataObject.description = weatherData.current.condition.text;
        weatherDataObject.location = weatherData.location.name;
        weatherDataObject.region = weatherData.location.region;
        weatherDataObject.temperatureF = weatherData.current.temp_f;
        weatherDataObject.temperatureC = weatherData.current.temp_c;
        weatherDataObject.feelsLikeF = weatherData.current.feelslike_f;
        weatherDataObject.feelsLikeC = weatherData.current.feelslike_c;
        weatherDataObject.wind = weatherData.current.gust_mph;
        weatherDataObject.humidity = weatherData.current.humidity;
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      });

    console.log(weatherDataObject);
    return weatherDataObject;
  }
}
