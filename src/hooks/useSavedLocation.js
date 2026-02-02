import { useState, useEffect } from "react";

export function useSavedLocations() {
  // Initialize from LocalStorage
  const [savedCities, setSavedCities] = useState(() => {
    try {
      const saved = localStorage.getItem("savedCities");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
  }, [savedCities]);

  // Toggle Function (Add or Remove)
  const toggleCity = (cityName) => {
    // Normalize string to avoid duplicates (e.g. "London" vs "london")
    const exists = savedCities.some(
      (c) => c.toLowerCase() === cityName.toLowerCase()
    );

    if (exists) {
      setSavedCities(savedCities.filter((c) => c.toLowerCase() !== cityName.toLowerCase()));
    } else {
      setSavedCities([...savedCities, cityName]);
    }
  };

  // Helper to check if current city is saved
  const isSaved = (cityName) => {
    if (!cityName) return false;
    return savedCities.some((c) => c.toLowerCase() === cityName.toLowerCase());
  };

  return { savedCities, toggleCity, isSaved };
}