import { describe, it, expect, vi } from 'vitest'
import { searchLocation, getWeatherData, getHistoricalWeatherData, getWeatherByCity } from '../weatherApi'
import { server } from '../../test/setup'
import { http } from 'msw'

describe('Weather API Services', () => {
  describe('searchLocation', () => {
    it('deve retornar localizações para uma cidade válida', async () => {
      const result = await searchLocation('sao paulo')
      
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        latitude: -23.5505,
        longitude: -46.6333,
        name: 'São Paulo',
        country: 'Brazil'
      })
    })

    it('deve retornar array vazio para cidade não encontrada', async () => {
      const result = await searchLocation('cidade invalida')
      
      expect(result).toHaveLength(0)
    })

    it('deve lançar erro para API com erro', async () => {
      server.use(
        http.get('https://geocoding-api.open-meteo.com/v1/search', () => {
          return new Response(null, { status: 500 })
        })
      )

      await expect(searchLocation('qualquer cidade')).rejects.toThrow('Cidade não reconhecida, tente novamente')
    })
  })

  describe('getWeatherData', () => {
    it('deve retornar dados climáticos completos', async () => {
      const result = await getWeatherData(-23.5505, -46.6333)
      
      expect(result).toHaveProperty('location')
      expect(result).toHaveProperty('current')
      expect(result).toHaveProperty('hourly')
      expect(result).toHaveProperty('daily')
      
      expect(result.current).toHaveProperty('temperature_2m')
      expect(result.current).toHaveProperty('relative_humidity_2m')
      expect(result.daily).toHaveProperty('temperature_2m_max')
      expect(result.daily).toHaveProperty('temperature_2m_min')
    })

    it('deve lançar erro para API com falha', async () => {
      server.use(
        http.get('https://api.open-meteo.com/v1/forecast', () => {
          return new Response(null, { status: 500 })
        })
      )

      await expect(getWeatherData(0, 0)).rejects.toThrow('Erro na busca de dados climáticos: 500')
    })
  })

  describe('getHistoricalWeatherData', () => {
    it('deve retornar dados históricos completos', async () => {
      const result = await getHistoricalWeatherData(-23.5505, -46.6333)
      
      expect(result).toHaveProperty('time')
      expect(result).toHaveProperty('temperature_2m_max')
      expect(result).toHaveProperty('temperature_2m_min')
      expect(result).toHaveProperty('precipitation_sum')
      expect(result.time).toHaveLength(7)
    })

    it('deve lançar erro para API histórica com falha', async () => {
      server.use(
        http.get('https://archive-api.open-meteo.com/v1/archive', () => {
          return new Response(null, { status: 500 })
        })
      )

      await expect(getHistoricalWeatherData(0, 0)).rejects.toThrow('Erro na busca de dados históricos: 500')
    })
  })

  describe('getWeatherByCity', () => {
    it('deve retornar dados completos para cidade válida', async () => {
      const result = await getWeatherByCity('sao paulo')
      
      expect(result).toHaveProperty('location')
      expect(result).toHaveProperty('current')
      expect(result).toHaveProperty('hourly')
      expect(result).toHaveProperty('daily')
      
      expect(result.location.name).toBe('São Paulo')
      expect(result.location.country).toBe('Brazil')
    })

    it('deve lançar erro para cidade não encontrada', async () => {
      await expect(getWeatherByCity('cidade invalida')).rejects.toThrow('Cidade não reconhecida, tente novamente')
    })

    it('deve lançar erro para geocoding API com falha', async () => {
      server.use(
        http.get('https://geocoding-api.open-meteo.com/v1/search', () => {
          return new Response(null, { status: 500 })
        })
      )

      await expect(getWeatherByCity('qualquer cidade')).rejects.toThrow('Cidade não reconhecida, tente novamente')
    })
  })
})
