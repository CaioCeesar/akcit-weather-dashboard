import type { GeocodingResponse, WeatherResponse, Location, WeatherData, DailyWeather } from '../types/weather';

const BASE_URL = 'https://geocoding-api.open-meteo.com/v1';
const WEATHER_URL = 'https://api.open-meteo.com/v1';
const ARCHIVE_URL = 'https://archive-api.open-meteo.com/v1';

export async function searchLocation(cityName: string): Promise<Location[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/search?name=${encodeURIComponent(cityName)}&count=5&language=pt&format=json`
    );

    if (!response.ok) {
      throw new Error(`Erro na busca de localização: ${response.status}`);
    }

    const data: GeocodingResponse = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return [];
    }
    
    return data.results.map(result => ({
      latitude: result.latitude,
      longitude: result.longitude,
      name: result.name,
      country: result.country
    }));
  } catch (error) {
    console.error('Erro ao buscar localização:', error);
    throw new Error('Cidade não reconhecida, tente novamente');
  }
}

export async function getWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${WEATHER_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,sunrise,sunset&timezone=auto&forecast_days=7`
    );

    if (!response.ok) {
      throw new Error(`Erro na busca de dados climáticos: ${response.status}`);
    }

    const data: WeatherResponse = await response.json();

    return {
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
        name: '',
        country: ''
      },
      current: data.current,
      hourly: data.hourly,
      daily: data.daily
    };
  } catch (error) {
    console.error('Erro ao buscar dados climáticos:', error);
    throw error;
  }
}

export async function getHistoricalWeatherData(latitude: number, longitude: number): Promise<DailyWeather> {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    const url = `${ARCHIVE_URL}/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDateStr}&end_date=${endDateStr}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto`;
    console.log('Historical API URL:', url);

    const response = await fetch(url);

    if (!response.ok) {
      console.error('Historical API Response Status:', response.status);
      console.error('Historical API Response Text:', await response.text());
      throw new Error(`Erro na busca de dados históricos: ${response.status}`);
    }

    const data: WeatherResponse = await response.json();
    return data.daily;
  } catch (error) {
    console.error('Erro ao buscar dados históricos:', error);
    throw error;
  }
}

export async function getWeatherByCity(cityName: string): Promise<WeatherData> {
  const locations = await searchLocation(cityName);
  
  if (locations.length === 0) {
    throw new Error('Cidade não reconhecida, tente novamente');
  }

  const location = locations[0];
  const weatherData = await getWeatherData(location.latitude, location.longitude);
  
  return {
    ...weatherData,
    location
  };
}
