import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Inline Icons to avoid external dependencies ---
const SearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ArrowIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
      setIsFocused(false); // remove focus styling
    } else {
      // Trigger shake animation if empty
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  };

  const clearInput = () => {
    setCity("");
    // Keep focus on input for better UX
    document.getElementById("city-input")?.focus();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      animate={{ x: shake ? [-10, 10, -10, 10, 0] : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        relative flex items-center w-full rounded-2xl transition-all duration-300
        ${isFocused ? "shadow-lg ring-2 ring-blue-100 bg-white" : "bg-slate-50 border border-slate-200"}
      `}
    >
      {/* Left Icon */}
      <div className="absolute left-4 text-slate-400 pointer-events-none">
        <SearchIcon className={`size-5 transition-colors ${isFocused ? "text-blue-500" : ""}`} />
      </div>

      {/* Input Field */}
      <input
        id="city-input"
        type="text"
        placeholder="Enter city..."
        value={city}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setCity(e.target.value)}
        className="w-full bg-transparent border-none py-4 pl-12 pr-24 text-slate-700 placeholder-slate-400 font-medium focus:outline-none rounded-2xl"
        autoComplete="off"
      />

      {/* Action Buttons (Right Side) */}
      <div className="absolute right-2 flex items-center gap-1">
        
        {/* Clear Button (Visible only when typing) */}
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

        {/* Submit Button */}
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
  );
}

export default SearchBar;