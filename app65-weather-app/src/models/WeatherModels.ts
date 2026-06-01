export interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface WeatherApiResponse {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
  };
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
  };
}

export interface WeatherViewModel {
  cityName: string;
  country: string;
  temperature: number;
  temperatureUnit: string;
  humidity: number;
  humidityUnit: string;
  windSpeed: number;
  windSpeedUnit: string;
  time: string;
}