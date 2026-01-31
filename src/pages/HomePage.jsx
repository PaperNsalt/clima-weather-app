import { useEffect } from "react";
import { useWeather } from "../hooks/useWeather";

import SearchBar from "../components/SearchBar";
import TodaysForecastComponent from "../components/TodaysForecastComponent";
import AirQualityComponent from "../components/AirQualityComponent";

import DailyForecastItem from "../components/DailyForecastItem"; // Import the new component
import { LocationIcon } from "../components/IconComponent";
import LottieBackground from "../components/LottieBackground";


function HomePage() {
  const { weather, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    // ONLY fetch if weather data is missing (e.g., first ever visit or cache cleared)
    if (!weather) {
      fetchWeather("Legazpi");
    }
  }, []); // Empty dependency array ensures this only runs on mount

  // Logic: Filter for specific times (6, 9, 12, 15, 18, 21)
  const getForecastHours = () => {
    if (!weather) return [];
    const targetHours = [6, 9, 12, 15, 18, 21];
    return weather.forecast.forecastday[0].hour.filter((hourData) => {
      const date = new Date(hourData.time);
      return targetHours.includes(date.getHours());
    });
  };

  const forecastData = getForecastHours();

  return (
    <>
      <section className="mx-auto">
        {/* Top Search Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mx-auto md:mx-0">
          <h3 className="text-xl font-bold mb-4 text-slate-700">
            Change Location
          </h3>
          <SearchBar onSearch={fetchWeather} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mx-auto">
          {/* --- LEFT COLUMN: Main Weather Card (Spans 2 columns) --- */}
          <div className="md:col-span-2 relative flex flex-col p-10 rounded-3xl shadow-xl bg-[#4b92e3]/30 gap-4 min-h-121 justify-between overflow-hidden border border-white/20">
            {/* 1. BACKGROUND LAYER */}
            <LottieBackground />

            {/* 2. CONTENT WRAPPER */}
            <div className="relative z-10 flex flex-col gap-4 h-full justify-between">
              {/* Loading / Error Overlay */}
              {/* Loading Overlay with Spinner */}
              {loading && (
                <div className="absolute inset-0 bg-white/30 rounded-3xl flex items-center justify-center backdrop-blur-md z-50">
                  <svg
                    className="animate-spin h-12 w-12 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
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
                    <div className="flex flex-row rounded-full bg-white/40 w-fit items-center py-2 px-4 shadow-sm backdrop-blur-md border border-white/30">
                      <span className="mr-2 text-blue-600">{LocationIcon}</span>
                      <p className="font-semibold text-slate-800">
                        {weather.location.name}, {weather.location.country}
                      </p>
                    </div>

                    {/* Main Weather Info */}
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-[3rem] tracking-tighter font-bold leading-none text-slate-800 drop-shadow-sm">
                          Weather
                        </h1>
                        <p className="text-slate-700 text-xl capitalize font-medium mt-1">
                          {weather.current.condition.text}
                        </p>
                      </div>

                      <div className="flex items-center justify-center">
                        <img
                          src={`https:${weather.current.condition.icon}`}
                          alt="Weather Icon"
                          className="w-32 h-32 object-contain drop-shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* --- BOTTOM SECTION: Stats Row --- */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto items-end">
                    <div className="flex flex-col">
                      <h1 className="text-[5rem] leading-none font-bold text-slate-800 tracking-tight">
                        {Math.round(weather.current.temp_c)}°
                      </h1>
                      <p className="text-slate-400 font-medium pl-2">
                        Feels Like {Math.round(weather.current.feelslike_c + 1)}
                        °
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/40 backdrop-blur-md border border-white/30 p-3 rounded-2xl flex flex-col items-center">
                        <span className="text-xs uppercase font-bold opacity-60">
                          Vis
                        </span>
                        <span className="font-bold">
                          {weather.current.vis_km}km
                        </span>
                      </div>
                      <div className="bg-white/40 backdrop-blur-md border border-white/30 p-3 rounded-2xl flex flex-col items-center">
                        <span className="text-xs uppercase font-bold opacity-60">
                          Hum
                        </span>
                        <span className="font-bold">
                          {weather.current.humidity}%
                        </span>
                      </div>
                      <div className="bg-white/40 backdrop-blur-md border border-white/30 p-3 rounded-2xl col-span-2 flex flex-row justify-between px-6 items-center">
                        <span className="text-xs uppercase font-bold opacity-60">
                          Wind
                        </span>
                        <span className="font-bold">
                          {weather.current.wind_kph} km/h
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN: 3-Day Forecast (Replaced Wind Div) --- */}
          <div className="flex flex-col gap-4 h-full">
            {weather && (
              <div className="bg-slate-800 text-white p-6 rounded-3xl h-full flex flex-col shadow-lg overflow-hidden">
                <h3 className="text-xl font-bold mb-6 pl-2 opacity-90">
                  3-Day Forecast
                </h3>

                <div className="flex flex-col gap-3 justify-center h-full">
                  {weather.forecast.forecastday.map((day, index) => {
                    // Logic for Day Name
                    const dateObj = new Date(day.date);
                    const isToday = index === 0;

                    // If index 0, show "Today", else show Weekday (e.g. Sunday)
                    const dayName = isToday
                      ? "Today"
                      : dateObj.toLocaleDateString("en-US", {
                          weekday: "long",
                        });

                    const dateShort = dateObj.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });

                    return (
                      <DailyForecastItem
                        key={index}
                        index={index}
                        day={dayName}
                        date={dateShort}
                        icon={`https:${day.day.condition.icon}`}
                        maxTemp={Math.round(day.day.maxtemp_c)}
                        minTemp={Math.round(day.day.mintemp_c)}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- SECTION 2: TODAY'S HOURLY FORECAST --- */}
      </section>

      {weather && (
        <section className="mt-8 max-w-7xl mx-auto mb-8 bg-[#4b92e3] rounded-3xl p-4">
          <h3 className="text-2xl font-bold text-slate-700 mb-6 pl-2">
            Today's Forecast
          </h3>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mb-4">
            {forecastData.map((hour, index) => {
              const date = new Date(hour.time);
              const timeString = date.toLocaleTimeString([], {
                hour: "numeric",
                hour12: true,
              });

              return (
                <TodaysForecastComponent
                  key={index}
                  time={timeString}
                  icon={`https:${hour.condition.icon}`}
                  temp={Math.round(hour.temp_c)}
                />
              );
            })}
          </div>
        </section>
      )}

      {weather && (
        <section className=" max-w-7xl mx-auto mb-10">
          <div className="bg-[#4b92e3] p-6 rounded-3xl">
          <AirQualityComponent airQuality={weather.current.air_quality} />
          </div>
        </section>
      )}
    </>
  );
}

export default HomePage;
