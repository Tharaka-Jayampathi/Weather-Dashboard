import { FiMapPin, FiWind, FiDroplet } from 'react-icons/fi';
import { WiThermometer } from 'react-icons/wi';

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="p-8 sm:p-10 border-b border-indigo-50/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start text-4xl sm:text-5xl font-extrabold text-gray-800 mb-2 truncate max-w-full tracking-tight">
            <FiMapPin className="text-indigo-600 mr-2 sm:mr-3 flex-shrink-0 drop-shadow-sm" />
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          </div>
          <div className="inline-flex mt-2 items-center px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50 shadow-inner">
            <span className="h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
            <p className="text-indigo-800 font-medium tracking-wide">Current Weather</p>
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

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10">
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
  );
};

export default WeatherCard;
