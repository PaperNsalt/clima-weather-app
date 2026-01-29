import { useEffect } from "react";
import { motion } from "framer-motion";
import { useWeather } from "../hooks/useWeather";
import SearchBar from "../components/SearchBar";
import { LocationIcon } from "../components/IconComponent";
import logo from "../assets/ClimaLogo.svg"; // Fallback logo if API icon fails

function HomePage() {
  // 1. Get the state and function from our custom hook
  const { weather, loading, error, fetchWeather } = useWeather();

  // 2. Fetch default city on mount
  useEffect(() => {
    fetchWeather("Legazpi");
  }, []);

  return (
    <section className="p-4">

      {/* SearchBar */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold mb-4 text-slate-700">
          Change Location
        </h3>
        <SearchBar onSearch={fetchWeather} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* --- LEFT COLUMN: Weather Card --- */}
        <div className="flex flex-col p-10 rounded-3xl bg-[#4b92e3]/30 gap-4 min-h-[500px] justify-center relative">
          {/* Loading / Error Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/50 rounded-3xl flex items-center justify-center z-10 backdrop-blur-sm">
              <p className="text-xl font-bold text-blue-800 animate-pulse">
                Updating...
              </p>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 bg-red-100/80 rounded-3xl flex items-center justify-center z-10">
              <p className="text-red-600 font-bold">{error}</p>
            </div>
          )}

          {/* Only render content if weather data exists */}
          {weather && (
            <>
              {/* Location Tag */}
              <div className="flex flex-row rounded-full bg-amber-50 w-fit justify-evenly items-center py-1 px-4 self-start">
                <span className="mr-2">{LocationIcon}</span>
                <p className="tracking-tighter font-medium">
                  {weather.location.name}, {weather.location.country}
                </p>
              </div>

              {/* Main Weather Info */}
              <div className="grid grid-cols-2 gap-2 items-center">
                <div>
                  <h1 className="text-[2.8rem] tracking-tighter font-bold leading-10">
                    Weather
                  </h1>
                  <p className="text-gray-700 text-lg capitalize">
                    {weather.current.condition.text}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <img
                    src={`https:${weather.current.condition.icon}`}
                    alt="Weather Icon"
                    className="size-40 object-contain drop-shadow-lg"
                  />
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <h1 className="text-[5rem] leading-none font-bold text-slate-800">
                    {Math.round(weather.current.temp_c)}°
                  </h1>
                </div>

                <div className="flex flex-row gap-2">
                  <div className="bg-amber-300 flex flex-col justify-center items-center p-4 rounded-2xl w-full">
                    <p className="text-sm font-semibold opacity-70">
                      Visibility
                    </p>
                    <h1 className="text-[1.4rem] font-bold">
                      {weather.current.vis_km} km
                    </h1>
                  </div>

                  <div className="bg-amber-300 flex flex-col justify-center items-center p-4 rounded-2xl w-full">
                    <p className="text-sm font-semibold opacity-70">Humidity</p>
                    <h1 className="text-[1.4rem] font-bold">
                      {weather.current.humidity}%
                    </h1>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* --- RIGHT COLUMN: Search & Extras --- */}
        <div className="flex flex-col gap-4 p-4">
          {/* 1. Search Bar */}

          {/* 2. Extra Info (Placeholder for UV or Wind) */}
          {/* {weather && (
            <div className="bg-slate-800 text-white p-6 rounded-3xl flex-grow flex flex-col justify-center items-center">
              <p className="opacity-70">Wind Speed</p>
              <h2 className="text-4xl font-bold mt-2">
                {weather.current.wind_kph} <span className="text-xl">km/h</span>
              </h2>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
