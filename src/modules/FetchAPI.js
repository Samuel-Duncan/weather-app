import OrganizeData from './OrganizeData';

export default class FetchAPI {
  static async fetchData(search) {
    const endpoint = `https://api.weatherapi.com/v1/current.json?key=aad5fa17ae2c47f7b00214311230208&q=${search}`;
    try {
      const response = await fetch(endpoint, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`City: ${search} not found.`);
      }
      const data = OrganizeData.organizeData(await response.json());
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
