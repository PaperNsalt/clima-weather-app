const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1";

export async function getWeatherData(city) {
  // We strictly follow the URL structure you provided
  const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error("City not found or API error");
  }
  
  return response.json();
}