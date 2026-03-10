import { useState } from 'react';
import axios from 'axios';
import { FiSearch, FiMapPin, FiWind, FiDroplet } from 'react-icons/fi';
import { WiThermometer } from 'react-icons/wi';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 text-center mb-10 tracking-tight drop-shadow-sm">
          Weather Dashboard
        </h1>

        <form onSubmit={handleSearch} className="w-full max-w-md relative mb-10 shadow-xl rounded-full overflow-hidden bg-white/95 backdrop-blur-sm border border-white/50 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all hover:shadow-2xl">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-indigo-400">
            <FiSearch className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter city name..."
            className="w-full pl-12 pr-28 py-4 text-gray-700 bg-transparent focus:outline-none rounded-full sm:text-lg"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-full font-medium transition-all shadow-md active:scale-95 flex items-center justify-center focus:outline-none"
          >
            Search
          </button>
        </form>

        {isLoading && (
          <div className="flex justify-center items-center mt-12 mb-8">
            <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-indigo-600"></div>
          </div>
        )}

        {error && (
          <div className="w-full max-w-md bg-red-50/90 backdrop-blur-sm border-l-4 border-red-500 p-5 mb-8 rounded-r-xl shadow-md transform transition-all">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 p-2 rounded-full text-red-500">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-base text-red-800 font-semibold">{error}</p>
              </div>
            </div>
          </div>
        )}

        {weatherData && !isLoading && !error && (
          <div className="w-full bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden transform transition-all duration-500 animate-in fade-in slide-in-from-bottom-5">
            <div className="p-8 sm:p-10 border-b border-indigo-50/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start text-4xl sm:text-5xl font-extrabold text-gray-800 mb-2 truncate max-w-full tracking-tight">
                    <FiMapPin className="text-indigo-600 mr-2 sm:mr-3 flex-shrink-0 drop-shadow-sm" />
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                  </div>
                  <div className="inline-flex mt-2 items-center px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50 shadow-inner">
                    <span className="h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                    <p className="text-indigo-800 font-medium tracking-wide update-time">Current Weather</p>
                  </div>
                </div>

                <div className="flex flex-col items-center bg-white/40 p-5 rounded-2xl shadow-sm border border-white">
                  <div className="text-6xl text-indigo-500 drop-shadow-md mb-2 bg-gradient-to-b from-indigo-50 to-white rounded-full p-2">
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                      alt={weatherData.weather[0].description}
                      className="w-24 h-24 sm:w-28 sm:h-28 object-contain filter drop-shadow-sm hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="capitalize text-gray-700 font-bold text-xl px-2">
                    {weatherData.weather[0].description}
                  </p>
                </div>

              </div>
            </div>

            <div className="bg-indigo-50/30 p-8 sm:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

                {/* Temperature Card */}
                <div className="bg-white/90 p-6 rounded-3xl flex flex-col items-center justify-center shadow-lg border border-indigo-50 transition-all hover:-translate-y-2 hover:shadow-xl group relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="text-orange-500 mb-4 bg-orange-50/80 p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform z-10">
                    <WiThermometer className="w-10 h-10" />
                  </div>
                  <p className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-2 z-10">Temperature</p>
                  <div className="flex items-start z-10">
                    <p className="text-5xl font-black text-gray-800 tracking-tighter">{weatherData.main.temp}</p>
                    <span className="text-2xl font-bold text-gray-400 ml-1 mt-1">°C</span>
                  </div>
                </div>

                {/* Humidity Card */}
                <div className="bg-white/90 p-6 rounded-3xl flex flex-col items-center justify-center shadow-lg border border-indigo-50 transition-all hover:-translate-y-2 hover:shadow-xl group relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="text-blue-500 mb-4 bg-blue-50/80 p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform z-10">
                    <FiDroplet className="w-9 h-9 m-0.5" />
                  </div>
                  <p className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-2 z-10">Humidity</p>
                  <div className="flex items-start z-10">
                    <p className="text-5xl font-black text-gray-800 tracking-tighter">{weatherData.main.humidity}</p>
                    <span className="text-2xl font-bold text-gray-400 ml-1 mt-1">%</span>
                  </div>
                </div>

                {/* Wind Speed Card */}
                <div className="bg-white/90 p-6 rounded-3xl flex flex-col items-center justify-center shadow-lg border border-indigo-50 transition-all hover:-translate-y-2 hover:shadow-xl group relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-teal-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="text-teal-500 mb-4 bg-teal-50/80 p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform z-10">
                    <FiWind className="w-9 h-9 m-0.5" />
                  </div>
                  <p className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-2 z-10">Wind Speed</p>
                  <div className="flex items-start z-10">
                    <p className="text-5xl font-black text-gray-800 tracking-tighter">{weatherData.wind.speed}</p>
                    <span className="text-lg font-bold text-gray-400 ml-1 mt-3">m/s</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
