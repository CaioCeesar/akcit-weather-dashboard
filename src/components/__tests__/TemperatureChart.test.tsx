import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TemperatureChart } from '../TemperatureChart'
import type { DailyWeather } from '../../types/weather'

// Mock do Recharts para evitar problemas de renderização em ambiente de teste
vi.mock('recharts', () => ({
  LineChart: ({ children }: { children: React.ReactNode }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>
}))

describe('TemperatureChart Component', () => {
  const mockDailyData: DailyWeather = {
    time: ['2025-04-27', '2025-04-28', '2025-04-29', '2025-04-30', '2025-05-01', '2025-05-02', '2025-05-03'],
    temperature_2m_max: [25.5, 26.2, 24.8, 27.1, 23.9, 25.7, 26.5],
    temperature_2m_min: [18.2, 17.8, 19.1, 18.5, 17.3, 18.9, 19.2],
    precipitation_sum: [0, 2.5, 0, 5.2, 1.8, 0, 3.1],
    weather_code: [0, 1, 0, 2, 1, 0, 1],
    sunrise: ['2025-04-27T06:00', '2025-04-28T06:01', '2025-04-29T06:02', '2025-04-30T06:03', '2025-05-01T06:04', '2025-05-02T06:05', '2025-05-03T06:06'],
    sunset: ['2025-04-27T18:00', '2025-04-28T18:01', '2025-04-29T18:02', '2025-04-30T18:03', '2025-05-01T18:04', '2025-05-02T18:05', '2025-05-03T18:06']
  }

  it('deve renderizar o componente corretamente', () => {
    render(<TemperatureChart dailyData={mockDailyData} />)
    
    expect(screen.getByText('Previsão de Temperatura - 7 Dias')).toBeInTheDocument()
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
  })

  it('deve renderizar todos os elementos do gráfico', () => {
    render(<TemperatureChart dailyData={mockDailyData} />)
    
    expect(screen.getAllByTestId('line')).toHaveLength(2) // Duas linhas (max e min)
    expect(screen.getByTestId('x-axis')).toBeInTheDocument()
    expect(screen.getByTestId('y-axis')).toBeInTheDocument()
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument()
    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
    expect(screen.getByTestId('legend')).toBeInTheDocument()
  })

  it('deve processar corretamente os dados diários', () => {
    render(<TemperatureChart dailyData={mockDailyData} />)
    
    // Verifica se o componente renderiza sem erros com os dados mock
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
  })

  it('deve lidar com arrays vazios', () => {
    const emptyData: DailyWeather = {
      time: [],
      temperature_2m_max: [],
      temperature_2m_min: [],
      precipitation_sum: [],
      weather_code: [],
      sunrise: [],
      sunset: []
    }

    render(<TemperatureChart dailyData={emptyData} />)
    
    // Não deve lançar erro com dados vazios
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
  })

  it('deve lidar com arrays de tamanhos diferentes', () => {
    const inconsistentData: DailyWeather = {
      time: ['2025-04-27', '2025-04-28'],
      temperature_2m_max: [25.5],
      temperature_2m_min: [18.2, 17.8],
      precipitation_sum: [0, 2.5, 0],
      weather_code: [0],
      sunrise: ['2025-04-27T06:00'],
      sunset: ['2025-04-27T18:00', '2025-04-28T18:01']
    }

    render(<TemperatureChart dailyData={inconsistentData} />)
    
    // Deve lidar gracefulmente com dados inconsistentes
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
  })

  it('deve processar temperaturas extremas', () => {
    const extremeData: DailyWeather = {
      time: ['2025-04-27'],
      temperature_2m_max: [45.7],
      temperature_2m_min: [-5.3],
      precipitation_sum: [0],
      weather_code: [0],
      sunrise: ['2025-04-27T06:00'],
      sunset: ['2025-04-27T18:00']
    }

    render(<TemperatureChart dailyData={extremeData} />)
    
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
  })

  it('deve processar valores de precipitação extremos', () => {
    const extremePrecipData: DailyWeather = {
      time: ['2025-04-27'],
      temperature_2m_max: [25.5],
      temperature_2m_min: [18.2],
      precipitation_sum: [150.8],
      weather_code: [2],
      sunrise: ['2025-04-27T06:00'],
      sunset: ['2025-04-27T18:00']
    }

    render(<TemperatureChart dailyData={extremePrecipData} />)
    
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
  })
})
