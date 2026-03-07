import { useEffect } from 'react';
import axios from 'axios';

// IMPORTANT: Replace this with your actual OpenWeatherMap API key
const API_KEY = 'YOUR_API_KEY_HERE';

function App() {
  useEffect(() => {
    // We define an async function inside useEffect to handle the data fetching
    const fetchWeatherData = async () => {
      try {
        const city = "Deniyaya, Sri Lanka";
        // The endpoint URL for Current Weather Data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        // Fetch data using Axios
        const response = await axios.get(url);

        // Log the result to the browser console per the requirement
        console.log("Current Weather Data:", response.data);
      } catch (error) {
        console.error("Error fetching the weather data:", error);
      }
    };

    // Call the function when the component mounts
    fetchWeatherData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <p>Check the browser console to see the fetched weather data for Deniyaya, Sri Lanka.</p>
    </div>
  );
}

export default App;
