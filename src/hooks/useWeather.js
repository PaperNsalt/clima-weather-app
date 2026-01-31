import { useState, useCallback } from "react";
import { getWeatherData } from "../api/weatherAPI.js";

export function useWeather() {
  // 1. Initialize state directly from LocalStorage if available
  const [weather, setWeather] = useState(() => {
    try {
      const savedData = localStorage.getItem("weatherData");
      return savedData ? JSON.parse(savedData) : null;
    } catch (e) {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    // 2. CACHE CHECK: Check if we have valid data for THIS city
    const cachedDataString = localStorage.getItem("weatherData");
    const cachedTimestamp = localStorage.getItem("weatherTimestamp");

    if (cachedDataString && cachedTimestamp) {
      const cachedData = JSON.parse(cachedDataString);
      const now = Date.now();
      const cacheAge = now - parseInt(cachedTimestamp, 10);
      
      // Check if city matches (case-insensitive)
      const isSameCity = cachedData.location.name.toLowerCase() === city.toLowerCase();

      // If same city AND cache is less than 30 minutes old (1800000ms)
      if (isSameCity && cacheAge < 1800000) {
        setWeather(cachedData);
        return; // EXIT: Stop here, do not call API
      }
    }

    // 3. API CALL: If no cache, call your existing API function
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(city); // Calls your api/weatherAPI.js

      // 4. Save new data to LocalStorage
      localStorage.setItem("weatherData", JSON.stringify(data));
      localStorage.setItem("weatherTimestamp", Date.now().toString());
      
      setWeather(data);
    } catch (err) {
      setError(err.message);
      // Optional: Don't clear weather if you want to keep showing old data on error
      setWeather(null); 
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, loading, error, fetchWeather };
}