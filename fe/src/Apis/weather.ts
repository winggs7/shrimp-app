export class WeatherApi {
  static async getWeather(lat: number, long: number): Promise<any> {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=weathercode`
    );
    return await response.json();
  }
}
