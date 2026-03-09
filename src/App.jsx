import { useState } from 'react';
import axios from 'axios';

// IMPORTANT: Replace this with your actual OpenWeatherMap API key
const API_KEY = 'a382ae32ed638775ca3dbd4f3ed651ea';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    if (!city.trim()) return;

    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (err) {
      console.error("Error fetching the weather data:", err);
      if (err.response && err.response.status === 404) {
        setError("City not found. Please try again.");
      } else {
        setError("An error occurred while fetching weather data.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData(searchCity);
  };

  return (
    <div>
      <h1>Weather Dashboard</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Enter city name..."
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && !isLoading && !error && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
