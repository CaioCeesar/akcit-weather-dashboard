export interface Location {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
}

export interface GeocodingResponse {
  results: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    country_code: string;
    admin1?: string;
    admin2?: string;
    admin3?: string;
    admin4?: string;
    population?: number;
    timezone?: string;
  }[];
}

export interface CurrentWeather {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  weather_code: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  weather_code: number[];
  wind_speed_10m: number[];
}

export interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  weather_code: number[];
  sunrise: string[];
  sunset: string[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    is_day: string;
    precipitation: string;
    rain: string;
    weather_code: string;
    surface_pressure: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
  };
  current: CurrentWeather;
  hourly_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    precipitation_probability: string;
    weather_code: string;
    wind_speed_10m: string;
  };
  hourly: HourlyWeather;
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_sum: string;
    weather_code: string;
    sunrise: string;
    sunset: string;
  };
  daily: DailyWeather;
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}
