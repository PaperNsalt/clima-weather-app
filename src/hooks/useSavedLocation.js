import { useState, useEffect } from "react";

export function useSavedLocations() {
  
  const [savedCities, setSavedCities] = useState(() => {
    try {
      const saved = localStorage.getItem("savedCities");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  
  useEffect(() => {
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
  }, [savedCities]);


  const toggleCity = (cityName) => {
  
    const exists = savedCities.some(
      (c) => c.toLowerCase() === cityName.toLowerCase()
    );

    if (exists) {
      setSavedCities(savedCities.filter((c) => c.toLowerCase() !== cityName.toLowerCase()));
    } else {
      setSavedCities([...savedCities, cityName]);
    }
  };


  const isSaved = (cityName) => {
    if (!cityName) return false;
    return savedCities.some((c) => c.toLowerCase() === cityName.toLowerCase());
  };

  return { savedCities, toggleCity, isSaved };
}