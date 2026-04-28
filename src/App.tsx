import { useState } from 'react'
import { WeatherSearch } from './components/WeatherSearch'
import { TemperatureChart } from './components/TemperatureChart'
import { RainForecastChart } from './components/RainForecastChart'
import { TemperatureHistoryChart } from './components/TemperatureHistoryChart'
import { RainHistoryChart } from './components/RainHistoryChart'
import { getWeatherByCity, getHistoricalWeatherData } from './services/weatherApi'
import type { WeatherData, DailyWeather } from './types/weather'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [historicalData, setHistoricalData] = useState<DailyWeather | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (city: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const data = await getWeatherByCity(city)
      setWeatherData(data)
      
      // Fetch historical data
      try {
        const history = await getHistoricalWeatherData(data.location.latitude, data.location.longitude)
        setHistoricalData(history)
      } catch (historyErr) {
        console.error('Erro ao buscar dados históricos:', historyErr)
        // Don't fail the whole search if history fails
        setHistoricalData(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar dados climáticos')
      setWeatherData(null)
      setHistoricalData(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Weather Dashboard</h1>
        <p className="app-subtitle">Previsão do tempo e histórico climático</p>
      </header>

      <main className="app-main">
        <section className="search-section">
          <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {error && (
          <section className="error-section">
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          </section>
        )}

        {weatherData && (
          <>
            <section className="weather-section">
              <div className="location-info">
                <h2>{weatherData.location.name}</h2>
                <p>{weatherData.location.country}</p>
              </div>
              
              <div className="current-weather">
                <h3>Clima Atual</h3>
                <div className="temperature">
                  {Math.round(weatherData.current.temperature_2m)}°C
                </div>
                <div className="weather-details">
                  <p>Sensação térmica: {Math.round(weatherData.current.apparent_temperature)}°C</p>
                  <p>Umidade: {weatherData.current.relative_humidity_2m}%</p>
                  <p>Vento: {weatherData.current.wind_speed_10m} km/h</p>
                </div>
              </div>
            </section>

            <section className="forecast-section">
              <h2 className="section-title">Previsão para os Próximos 7 Dias</h2>
              <div className="forecast-charts">
                <div className="chart-container">
                  <TemperatureChart dailyData={weatherData.daily} />
                </div>
                <div className="chart-container">
                  <RainForecastChart dailyData={weatherData.daily} />
                </div>
              </div>
            </section>

            <section className="history-section">
              <h2 className="section-title">Histórico Climático - Últimos 7 Dias</h2>
              <div className="history-charts">
                <div className="chart-container">
                  {historicalData ? (
                    <TemperatureHistoryChart dailyData={historicalData} />
                  ) : (
                    <div className="no-data-message">
                      <p>Dados históricos não disponíveis para esta localização.</p>
                    </div>
                  )}
                </div>
                <div className="chart-container">
                  {historicalData ? (
                    <RainHistoryChart dailyData={historicalData} />
                  ) : (
                    <div className="no-data-message">
                      <p>Dados históricos não disponíveis para esta localização.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {!weatherData && !error && !isLoading && (
          <section className="welcome-section">
            <div className="welcome-content">
              <h2>Bem-vindo ao Weather Dashboard</h2>
              <p>Digite o nome de uma cidade para começar a visualizar as informações climáticas.</p>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
