import { useState } from 'react';

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export function WeatherSearch({ onSearch, isLoading = false }: WeatherSearchProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="weather-search">
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite o nome da cidade..."
          className="city-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !city.trim()}
          className="search-button"
        >
          {isLoading ? 'Buscando...' : 'Buscar clima'}
        </button>
      </div>
    </form>
  );
}
