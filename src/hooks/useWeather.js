import { useState, useEffect } from "react";
import { getWeatherData } from "../api/weatherAPI.js";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // This function allows the UI to request weather for a specific city
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather };
}