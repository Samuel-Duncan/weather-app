export default class OrganizeData {
  static organizeData(data) {
    const {
      current: {
        condition: { text: description },
        temp_f: temperatureF,
        temp_c: temperatureC,
        feelslike_f: feelsLikeF,
        feelslike_c: feelsLikeC,
        wind_mph: wind,
        humidity,
      },
      location: {
        name: city,
        region: state,
        localtime,
      },
    } = data;
    return {
      description,
      temperatureF,
      temperatureC,
      feelsLikeF,
      feelsLikeC,
      wind,
      humidity,
      city,
      state,
      localtime,
    };
  }
}