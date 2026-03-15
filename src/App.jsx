import { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import WeatherCard from './components/WeatherCard';
import ForecastChart from './components/ForecastChart';

// IMPORTANT: Replace this with your actual OpenWeatherMap API key
const API_KEY = 'a382ae32ed638775ca3dbd4f3ed651ea';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    if (!city.trim()) return;

    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(weatherUrl),
        axios.get(forecastUrl)
      ]);

      setWeatherData(weatherResponse.data);

      const forecastList = forecastResponse.data.list.slice(0, 8);
      const processedForecast = forecastList.map(item => {
        const date = new Date(item.dt * 1000);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return {
          time: `${hours}:${minutes}`,
          temperature: Math.round(item.main.temp)
        };
      });

      setForecastData(processedForecast);
    } catch (err) {
      console.error("Error fetching the weather data:", err);
      if (err.response && err.response.status === 404) {
        setError("City not found. Please try again or check the spelling.");
      } else {
        setError("An error occurred while fetching data from the weather service.");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100 text-center mb-10 tracking-tight drop-shadow-lg">
          Weather Dashboard
        </h1>

        <SearchBar 
          searchCity={searchCity} 
          setSearchCity={setSearchCity} 
          handleSearch={handleSearch} 
        />

        {isLoading && <LoadingSpinner />}

        {error && <ErrorMessage error={error} />}

        {weatherData && !isLoading && !error && (
          <div className="w-full bg-white/10 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
            <WeatherCard weatherData={weatherData} />
            <ForecastChart forecastData={forecastData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
