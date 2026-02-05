import { useState, useCallback } from "react";
import { getWeatherData } from "../api/weatherAPI.js";

export function useWeather() {

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

    const cachedDataString = localStorage.getItem("weatherData");
    const cachedTimestamp = localStorage.getItem("weatherTimestamp");

    if (cachedDataString && cachedTimestamp) {
      const cachedData = JSON.parse(cachedDataString);
      const now = Date.now();
      const cacheAge = now - parseInt(cachedTimestamp, 10);
      

      const isSameCity = cachedData.location.name.toLowerCase() === city.toLowerCase();


      if (isSameCity && cacheAge < 1800000) {
        setWeather(cachedData);
        return;
      }
    }


    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(city);


      localStorage.setItem("weatherData", JSON.stringify(data));
      localStorage.setItem("weatherTimestamp", Date.now().toString());
      
      setWeather(data);
    } catch (err) {
      setError(err.message);
  
      setWeather(null); 
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, loading, error, fetchWeather };
}