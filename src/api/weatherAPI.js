// src/api/weatherAPI.js
const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

// src/api/weatherAPI.js
export async function getWeatherData(city) {
  // CHANGED: aqi=yes (This is required to get air_quality data)
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=yes&alerts=no`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }
  
  return response.json();
}