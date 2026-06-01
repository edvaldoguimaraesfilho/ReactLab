import type {
  City,
  WeatherApiResponse,
  WeatherViewModel,
} from "../models/WeatherModels";

export async function getCurrentWeather(
  city: City
): Promise<WeatherViewModel> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${city.latitude}` +
    `&longitude=${city.longitude}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not load weather data.");
  }

  const data: WeatherApiResponse = await response.json();

  return {
    cityName: city.name,
    country: city.country,
    temperature: data.current.temperature_2m,
    temperatureUnit: data.current_units.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    humidityUnit: data.current_units.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    windSpeedUnit: data.current_units.wind_speed_10m,
    time: data.current.time,
  };
}