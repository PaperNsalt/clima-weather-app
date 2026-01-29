import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity(""); // Clear input after search
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 rounded-lg text-black w-full"
      />
      <button type="submit" className="bg-blue-600 px-4 py-2 rounded-lg font-bold">
        Search
      </button>
    </form>
  );
}

export default SearchBar;