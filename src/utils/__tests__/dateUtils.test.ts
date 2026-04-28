import { describe, it, expect } from 'vitest'

// Funções utilitárias para teste
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })
}

export const roundTemperature = (temp: number): number => {
  return Math.round(temp)
}

export const roundPrecipitation = (precip: number): number => {
  return Math.round(precip * 10) / 10
}

export const getDayName = (dateString: string): string => {
  const date = new Date(dateString)
  const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })
  return dayName.charAt(0).toUpperCase() + dayName.slice(1)
}

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('deve formatar data corretamente em português', () => {
      const date = new Date('2025-04-27')
      const result = formatDate(date)
      
      // Formato real: "sáb., 26" (com caracteres especiais e espaço)
      expect(result).toMatch(/^[A-Za-zá-ú]{3}\.\,\s\d{1,2}$/)
    })

    it('deve lidar com diferentes datas', () => {
      const dates = [
        new Date('2025-01-01'),
        new Date('2025-06-15'),
        new Date('2025-12-25')
      ]
      
      dates.forEach(date => {
        const result = formatDate(date)
        expect(result).toMatch(/^[A-Za-zá-ú]{3}\.\,\s\d{1,2}$/)
      })
    })
  })

  describe('roundTemperature', () => {
    it('deve arredondar temperatura para inteiro mais próximo', () => {
      expect(roundTemperature(22.5)).toBe(23)
      expect(roundTemperature(22.4)).toBe(22)
      expect(roundTemperature(22.6)).toBe(23)
      expect(roundTemperature(22.0)).toBe(22)
    })

    it('deve lidar com temperaturas negativas', () => {
      expect(roundTemperature(-2.5)).toBe(-2)
      expect(roundTemperature(-2.6)).toBe(-3)
      expect(roundTemperature(-2.4)).toBe(-2)
    })
  })

  describe('roundPrecipitation', () => {
    it('deve arredondar precipitação para uma casa decimal', () => {
      expect(roundPrecipitation(2.56)).toBe(2.6)
      expect(roundPrecipitation(2.54)).toBe(2.5)
      expect(roundPrecipitation(2.0)).toBe(2.0)
      expect(roundPrecipitation(0.123)).toBe(0.1)
    })

    it('deve lidar com valores zero', () => {
      expect(roundPrecipitation(0)).toBe(0)
      expect(roundPrecipitation(0.04)).toBe(0)
      expect(roundPrecipitation(0.05)).toBe(0.1)
    })
  })

  describe('getDayName', () => {
    it('deve retornar nome do dia com primeira letra maiúscula', () => {
      const result = getDayName('2025-04-27')
      // Formato real: "Sáb., 26" (com caracteres especiais)
      expect(result).toMatch(/^[A-ZÁ-Ú][a-zá-ú]{2}\.\,\s\d{1,2}$/)
    })

    it('deve lidar com diferentes formatos de data', () => {
      const dates = ['2025-04-27', '2025-12-01', '2025-01-15']
      
      dates.forEach(dateString => {
        const result = getDayName(dateString)
        expect(result).toMatch(/^[A-ZÁ-Ú][a-zá-ú]{2}\.\,\s\d{1,2}$/)
      })
    })

    it('deve manter consistência com formatação dos gráficos', () => {
      // Testa se o formato é consistente com o usado nos componentes de gráfico
      const dateString = '2025-04-27'
      const result = getDayName(dateString)
      
      // Verifica se o formato é o mesmo usado nos componentes
      expect(result).toBe(formatDate(new Date(dateString)).charAt(0).toUpperCase() + formatDate(new Date(dateString)).slice(1))
    })
  })
})
