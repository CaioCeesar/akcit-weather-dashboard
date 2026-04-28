import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http } from 'msw'

// Mock API handlers
export const handlers = [
  // Geocoding API
  http.get('https://geocoding-api.open-meteo.com/v1/search', ({ request }) => {
    const url = new URL(request.url)
    const name = url.searchParams.get('name')
    
    if (name === 'sao paulo') {
      return Response.json({
        results: [
          {
            id: 12345,
            name: 'São Paulo',
            latitude: -23.5505,
            longitude: -46.6333,
            country: 'Brazil',
            country_code: 'BR'
          }
        ]
      })
    }
    
    if (name === 'cidade invalida') {
      return Response.json({
        results: []
      })
    }
    
    return Response.json({ error: 'Location not found' }, { status: 404 })
  }),

  // Weather Forecast API
  http.get('https://api.open-meteo.com/v1/forecast', () => {
    return Response.json({
      latitude: -23.5505,
      longitude: -46.6333,
      generationtime_ms: 0.123,
      utc_offset_seconds: -10800,
      timezone: 'America/Sao_Paulo',
      timezone_abbreviation: '-03',
      elevation: 792,
      current_units: {
        time: 'iso8601',
        interval: 'seconds',
        temperature_2m: '°C',
        relative_humidity_2m: '%',
        apparent_temperature: '°C',
        is_day: '',
        precipitation: 'mm',
        rain: 'mm',
        weather_code: 'wmo code',
        surface_pressure: 'hPa',
        wind_speed_10m: 'km/h',
        wind_direction_10m: '°'
      },
      current: {
        time: '2025-04-27T21:00',
        interval: 900,
        temperature_2m: 22.5,
        relative_humidity_2m: 75,
        apparent_temperature: 24.1,
        is_day: 0,
        precipitation: 0.0,
        rain: 0.0,
        weather_code: 0,
        surface_pressure: 1013.2,
        wind_speed_10m: 12.5,
        wind_direction_10m: 180
      },
      hourly_units: {
        time: 'iso8601',
        temperature_2m: '°C',
        relative_humidity_2m: '%',
        apparent_temperature: '°C',
        precipitation_probability: '%',
        weather_code: 'wmo code',
        wind_speed_10m: 'km/h'
      },
      hourly: {
        time: Array.from({ length: 168 }, (_, i) => {
          const date = new Date()
          date.setHours(date.getHours() - (168 - i))
          return date.toISOString()
        }),
        temperature_2m: Array.from({ length: 168 }, () => 20 + Math.random() * 10),
        relative_humidity_2m: Array.from({ length: 168 }, () => 60 + Math.random() * 30),
        apparent_temperature: Array.from({ length: 168 }, () => 22 + Math.random() * 8),
        precipitation_probability: Array.from({ length: 168 }, () => Math.random() * 100),
        weather_code: Array.from({ length: 168 }, () => Math.floor(Math.random() * 4)),
        wind_speed_10m: Array.from({ length: 168 }, () => 5 + Math.random() * 20)
      },
      daily_units: {
        time: 'iso8601',
        temperature_2m_max: '°C',
        temperature_2m_min: '°C',
        precipitation_sum: 'mm',
        weather_code: 'wmo code',
        sunrise: 'iso8601',
        sunset: 'iso8601'
      },
      daily: {
        time: Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() + i)
          return date.toISOString().split('T')[0]
        }),
        temperature_2m_max: Array.from({ length: 7 }, () => 25 + Math.random() * 5),
        temperature_2m_min: Array.from({ length: 7 }, () => 15 + Math.random() * 5),
        precipitation_sum: Array.from({ length: 7 }, () => Math.random() * 10),
        weather_code: Array.from({ length: 7 }, () => Math.floor(Math.random() * 4)),
        sunrise: Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() + i)
          date.setHours(6, 0, 0, 0)
          return date.toISOString()
        }),
        sunset: Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() + i)
          date.setHours(18, 0, 0, 0)
          return date.toISOString()
        })
      }
    })
  }),

  // Historical Weather API
  http.get('https://archive-api.open-meteo.com/v1/archive', () => {
    return Response.json({
      latitude: -23.5505,
      longitude: -46.6333,
      generationtime_ms: 0.456,
      utc_offset_seconds: -10800,
      timezone: 'America/Sao_Paulo',
      timezone_abbreviation: '-03',
      elevation: 792,
      daily_units: {
        time: 'iso8601',
        temperature_2m_max: '°C',
        temperature_2m_min: '°C',
        precipitation_sum: 'mm',
        weather_code: 'wmo code'
      },
      daily: {
        time: Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - (7 - i))
          return date.toISOString().split('T')[0]
        }),
        temperature_2m_max: Array.from({ length: 7 }, () => 24 + Math.random() * 6),
        temperature_2m_min: Array.from({ length: 7 }, () => 16 + Math.random() * 6),
        precipitation_sum: Array.from({ length: 7 }, () => Math.random() * 8),
        weather_code: Array.from({ length: 7 }, () => Math.floor(Math.random() * 4))
      }
    })
  })
]

// Setup server
export const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
