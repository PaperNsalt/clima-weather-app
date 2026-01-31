import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, CloseIcon, ArrowIcon } from "./IconComponent";

// Helper for debouncing (prevents too many API calls while typing)
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [shake, setShake] = useState(false);


  const debouncedCity = useDebounce(city, 500);

  // FETCH SUGGESTIONS
  useEffect(() => {

    const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
    
    const fetchCities = async () => {
      if (!debouncedCity || debouncedCity.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${debouncedCity}`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [debouncedCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
      setSuggestions([]);
      setIsFocused(false);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  };

  const handleSelectCity = (selectedCity) => {

    const fullName = `${selectedCity.name}, ${selectedCity.country}`; 
    onSearch(fullName);
    setCity("");
    setSuggestions([]);
    setIsFocused(false);
  };

  const clearInput = () => {
    setCity("");
    setSuggestions([]);
    document.getElementById("city-input")?.focus();
  };

  return (
    <div className="relative w-full z-50">
      <motion.form
        onSubmit={handleSubmit}
        animate={{ x: shake ? [-10, 10, -10, 10, 0] : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`
          relative flex items-center w-full rounded-2xl transition-all duration-300 z-20
          ${isFocused || suggestions.length > 0 ? "shadow-lg ring-2 ring-blue-100 bg-white rounded-b-none" : "bg-slate-50 border border-slate-200"}
        `}
      >

        <div className="absolute left-4 text-slate-400 pointer-events-none">
          <SearchIcon className={`size-5 transition-colors ${isFocused ? "text-blue-500" : ""}`} />
        </div>


        <input
          id="city-input"
          type="text"
          placeholder="Enter city..."
          value={city}
          onFocus={() => setIsFocused(true)}

          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onChange={(e) => setCity(e.target.value)}
          className="w-full bg-transparent border-none py-4 pl-12 pr-24 text-slate-700 placeholder-slate-400 font-medium focus:outline-none rounded-2xl"
          autoComplete="off"
        />

        {/* Action Buttons */}
        <div className="absolute right-2 flex items-center gap-1">
          <AnimatePresence>
            {city && (
              <motion.button
                type="button"
                onClick={clearInput}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="p-1.5 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
              >
                <CloseIcon className="size-4" />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!city.trim()}
            className={`
              flex items-center justify-center p-2.5 rounded-xl font-bold text-white transition-all shadow-md
              ${city.trim() ? "bg-blue-600 shadow-blue-200 hover:shadow-blue-300" : "bg-slate-300 cursor-not-allowed"}
            `}
          >
            <ArrowIcon className="size-5" />
          </motion.button>
        </div>
      </motion.form>

      {/* --- SUGGESTIONS DROPDOWN --- */}
      <AnimatePresence>
        {suggestions.length > 0 && isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white rounded-b-2xl shadow-xl border-t border-slate-100 overflow-hidden z-10"
          >
            <ul>
              {suggestions.map((item, index) => (
                <li
                  key={item.id || index}
                  onClick={() => handleSelectCity(item)}
                  className="px-6 py-3 hover:bg-blue-50 cursor-pointer flex items-center justify-between group transition-colors border-b border-slate-50 last:border-none"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-700 group-hover:text-blue-700">
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {item.region ? `${item.region}, ` : ""}{item.country}
                    </span>
                  </div>
                  <ArrowIcon className="size-4 text-slate-300 -rotate-45 group-hover:text-blue-400 transition-colors" />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;