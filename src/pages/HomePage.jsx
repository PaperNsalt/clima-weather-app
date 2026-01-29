import { useEffect } from "react";
import { motion } from "framer-motion";
import { useWeather } from "../hooks/useWeather";
import SearchBar from "../components/SearchBar";
import { LocationIcon } from "../components/IconComponent";
import logo from "../assets/ClimaLogo.svg";

import LottieBackground from "../components/LottieBackground";

function HomePage() {
  const { weather, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather("Legazpi");
  }, []);

  return (
    <section className="p-4">
      {/* Top Search Bar */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mx-auto md:mx-0">
        <h3 className="text-xl font-bold mb-4 text-slate-700">
          Change Location
        </h3>
        <SearchBar onSearch={fetchWeather} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        
        {/* --- LEFT COLUMN: Weather Card --- */}
        <div className="relative flex flex-col p-10 rounded-3xl shadow-lg bg-[#4b92e3]/30 gap-4 min-h-116 max-h-116 justify-between overflow-hidden">
          {/* 1. BACKGROUND LAYER */}
          <LottieBackground />

          {/* 2. CONTENT WRAPPER */}
          <div className="relative z-10 flex flex-col gap-4 h-full justify-between">
            {/* Loading / Error Overlay */}
            {loading && (
              <div className="absolute inset-0 bg-white/50 rounded-3xl flex items-center justify-center backdrop-blur-sm z-50">
                <p className="text-xl font-bold text-blue-800 animate-pulse">
                  Updating...
                </p>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 bg-red-100/80 rounded-3xl flex items-center justify-center z-50">
                <p className="text-red-600 font-bold">{error}</p>
              </div>
            )}

            {/* Weather Content */}
            {weather && (
              <>
                {/* --- TOP SECTION: Location & Icon --- */}
                <div className="flex flex-col gap-6">
                  {/* Location Tag */}
                  <div className="flex flex-row rounded-full bg-amber-50/90 w-fit items-center py-2 px-4 shadow-sm backdrop-blur-md">
                    <span className="mr-2 text-blue-500">{LocationIcon}</span>
                    <p className="font-semibold text-slate-700">
                      {weather.location.name}, {weather.location.country}
                    </p>
                  </div>

                  {/* Main Weather Info */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-[2.5rem] md:text-[3rem] tracking-tighter font-bold leading-none text-slate-800">
                        Weather
                      </h1>
                      <p className="text-slate-700 text-lg capitalize font-medium mt-1">
                        {weather.current.condition.text}
                      </p>
                    </div>

                    <div className="flex items-center justify-center">
                      <img
                        src={`https:${weather.current.condition.icon}`}
                        alt="Weather Icon"
                        className="w-32 h-32 object-contain drop-shadow-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* --- BOTTOM SECTION: Stats Row --- */}
                {/* Moved INSIDE the main wrapper so it appears in the card */}
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="flex flex-col justify-end">
                    <h1 className="text-[5rem] leading-none font-bold text-slate-800">
                      {Math.round(weather.current.temp_c)}°C
                    </h1>
                    <p className="text-slate-400 font-medium pl-2">
                      Feels Like {Math.round(weather.current.feelslike_c + 1)}°C
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <div className="bg-amber-300/80 backdrop-blur-sm flex flex-col justify-center items-center p-3 rounded-2xl w-full shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-wider opacity-60">
                        Visibility
                      </p>
                      <h1 className="text-xl font-bold text-slate-800">
                        {weather.current.vis_km} km
                      </h1>
                    </div>

                    <div className="bg-amber-300/80 backdrop-blur-sm flex flex-col justify-center items-center p-3 rounded-2xl w-full shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-wider opacity-60">
                        Humidity
                      </p>
                      <h1 className="text-xl font-bold text-slate-800">
                        {weather.current.humidity}%
                      </h1>
                    </div>

                    <div className="bg-amber-300/80 backdrop-blur-sm flex flex-col justify-center items-center p-3 rounded-2xl w-full shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-wider opacity-60">
                        Wind Speed
                      </p>
                      <h1 className="text-xl font-bold text-slate-800">
                        {weather.current.wind_kph}{"km/h"}
          
                      </h1>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: Extras --- */}
        <div className="flex flex-col gap-4">
          {/* If you have extra components (like a map or 7-day forecast), they go here */}
          {weather && (
            <div className="bg-slate-800 text-white p-8 rounded-3xl h-full flex flex-col justify-center items-center shadow-lg">
              <p className="opacity-70 font-medium uppercase tracking-widest">
                Wind Speed
              </p>
              <h2 className="text-6xl font-bold mt-4">
                {weather.current.wind_kph}{" "}
                <span className="text-2xl text-slate-400">km/h</span>
              </h2>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
