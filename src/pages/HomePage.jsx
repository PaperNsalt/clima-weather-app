import { useEffect } from "react";
import { useWeather } from "../hooks/useWeather";

import SearchBar from "../components/SearchBar";
import SavedCitiesList from "../components/SavedCitiesList";
import { useSavedLocations } from "../hooks/useSavedLocation";
import TodaysForecastComponent from "../components/TodaysForecastComponent";
import AirQualityComponent from "../components/AirQualityComponent";

import DailyForecastItem from "../components/DailyForecastItem";
import { LocationIcon, HeartIcon } from "../components/IconComponent";
import LottieBackground from "../components/LottieBackground";
import LottieComponent from "../components/LottieComponent";

import WeatherMap from "../components/WeatherMap";

// --- New Refresh Icon Component ---
const RefreshIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
);

function HomePage() {
  const { weather, loading, error, fetchWeather } = useWeather();
  const { savedCities, toggleCity, isSaved } = useSavedLocations();

  useEffect(() => {
    if (!weather) {
      fetchWeather("Legazpi");
    }
  }, []);

  const getForecastHours = () => {
    if (!weather) return [];
    const targetHours = [6, 9, 12, 15, 18, 21];
    return weather.forecast.forecastday[0].hour.filter((hourData) => {
      const date = new Date(hourData.time);
      return targetHours.includes(date.getHours());
    });
  };

  const forecastData = getForecastHours();

  // --- Handlers ---
  const handleRefresh = () => {
    if (weather?.location?.name) {
      fetchWeather(weather.location.name);
    }
  };

  return (
    <>
      <section className="mt-10">
        <div className="grid grid-cols-2 gap-6 bg-[#61bdf2] p-8 rounded-4xl">
          <div className="flex justify-center items-center flex-col gap-4">
            <h1 className="text-[4rem] tracking-tighter font-bold leading-20 text-slate-800">
              WELCOME TO{" "}
              <span className="text-[#4b92e3] shadow-md px-2 py-1 bg-white/40 backdrop-blur-md border border-white/30 p-3 rounded-2xl">
                CLIMA
              </span>
            </h1>
            <p className="tracking-tight text-base text-slate-800">
              CLIMA is a modern weather web application that provides real-time,
              accurate, and easy-to-understand weather information using a
              reliable Weather API. Designed with simplicity and clarity in
              mind, CLIMA helps users stay prepared for daily activities rain or
              shine.
            </p>
          </div>

          <div className="flex justify-center items-center">
            <LottieComponent />
          </div>
        </div>
      </section>

      {/* ... (Features Section omitted for brevity, keeping it same as before) ... */}
      <section className="mt-10 p-8 animated-gradient bg-gradient-to-br from-[#1d293d] via-[#2f5f8f] to-[#61bdf2] rounded-3xl">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 flex flex-col justify-center items-start p-6 bg-white/16 backdrop-blur-md border border-white/30 rounded-3xl">
            <h1 className="text-[1.4rem] tracking-tight font-bold text-white">
              Real-Time Weather Updates
            </h1>
            <p className="text-base text-white/60 font-light">
              CLIMA fetches live weather data directly from a weather API,
              ensuring that users always receive up-to-date information about
              their location. From temperature changes to sudden weather
              conditions, CLIMA keeps you informed instantly.
            </p>
          </div>

          <div className="flex flex-col justify-center items-start p-8 bg-white/16 backdrop-blur-md border border-white/30 rounded-3xl">
            <h1 className="text-[1.4rem] tracking-tight font-bold text-white">
              Location-Based Forecast
            </h1>
            <p className="text-base text-white/60 font-light">
              By detecting or selecting a location, CLIMA delivers
              location-specific weather details. This allows users to plan their
              day better, whether they’re commuting, traveling, or scheduling
              outdoor activities.
            </p>
          </div>

          <div className="flex flex-col justify-center items-start p-8 bg-white/16 backdrop-blur-md border border-white/30 rounded-3xl">
            <h1 className="text-[1.4rem] tracking-tight font-bold text-white">
              Short-Term Forecast
            </h1>
            <p className="text-base text-white/60 font-light">
              CLIMA doesn’t just show today’s weather it also provides a
              forecast for the next few days, giving users an overview of
              upcoming conditions.
            </p>
          </div>

          <div className="col-span-2 flex flex-col justify-center items-start p-6 bg-white/16 backdrop-blur-md border border-white/30 rounded-3xl">
            <h1 className="text-[1.4rem] tracking-tight font-bold text-white">
              Powered by Weather API
            </h1>
            <p className="text-base text-white/60 font-light">
              CLIMA is powered by a trusted Weather API, enabling fast and
              reliable data retrieval. API integration ensures: Accurate weather
              readings, Consistent data updates, Scalable performance
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10">
        {/* Top Search Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mx-auto md:mx-0">
          <h3 className="text-xl font-bold mb-4 text-slate-700">
            Change Location
          </h3>
          <SearchBar onSearch={fetchWeather} />

          <div className="mt-4">
            <SavedCitiesList
              cities={savedCities}
              onSelect={fetchWeather}
              onDelete={toggleCity}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mx-auto">
          {/* --- LEFT COLUMN: Main Weather Card --- */}
          <div className="md:col-span-2 relative flex flex-col p-10 rounded-3xl shadow-xl bg-[#4b92e3]/30 gap-4 min-h-121 justify-between overflow-hidden border border-white/20">
            {/* 1. BACKGROUND LAYER */}
            <LottieBackground />

            {/* 2. CONTENT WRAPPER */}
            <div className="relative z-10 flex flex-col gap-4 h-full justify-between">
              {/* Loading Overlay */}
              {loading && (
                <div className="absolute inset-0 bg-white/30 rounded-3xl flex items-center justify-center backdrop-blur-md z-50 transition-all duration-300">
                  {/* Note: We keep this overlay, but we also animate the button below */}
                </div>
              )}

              {error && (
                <div className="absolute inset-0 bg-red-100/80 rounded-3xl flex items-center justify-center z-50">
                  <p className="text-red-600 font-bold">{error}</p>
                </div>
              )}

              {weather && (
                <>
                  {/* --- TOP SECTION: Location & Icons --- */}
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                      {/* Location Tag */}
                      <div className="flex flex-row rounded-full bg-white/40 w-fit items-center py-2 px-4 shadow-sm backdrop-blur-md border border-white/30">
                        <span className="mr-2 text-blue-600">
                          {LocationIcon}
                        </span>
                        <p className="font-semibold text-slate-800">
                          {weather.location.name}, {weather.location.country}
                        </p>
                      </div>

                      {/* --- ACTION BUTTONS (Save & Reload) --- */}
                      <div className="flex items-center gap-2">
                        {/* 1. RELOAD BUTTON (New) */}
                        <button
                          onClick={handleRefresh}
                          disabled={loading}
                          title="Refresh Forecast"
                          className="p-3 bg-white/40 backdrop-blur-md rounded-full hover:bg-white/60 hover:scale-105 transition-all group border border-white/30 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RefreshIcon
                            className={`w-6 h-6 text-slate-700 transition-all duration-700 ease-in-out ${
                              loading
                                ? "animate-spin"
                                : "group-hover:rotate-180"
                            }`}
                          />
                        </button>

                        {/* 2. HEART BUTTON */}
                        <button
                          onClick={() => toggleCity(weather.location.name)}
                          title={
                            isSaved(weather.location.name)
                              ? "Remove from saved"
                              : "Save location"
                          }
                          className="p-3 bg-white/40 backdrop-blur-md rounded-full hover:bg-white/60 hover:scale-105 transition-all group border border-white/30 shadow-sm"
                        >
                          <HeartIcon
                            className={`size-6 transition-colors ${
                              isSaved(weather.location.name)
                                ? "text-red-500 fill-red-500"
                                : "text-slate-600 group-hover:text-red-400"
                            }`}
                            filled={isSaved(weather.location.name)}
                          />
                        </button>
                      </div>
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
                        <h1 className="text-xs uppercase font-bold opacity-60">
                          Visibility
                        </h1>
                        <span className="font-bold">
                          {weather.current.vis_km}km
                        </span>
                      </div>
                      <div className="bg-white/40 backdrop-blur-md border border-white/30 p-3 rounded-2xl flex flex-col items-center">
                        <h1 className="text-xs uppercase font-bold opacity-60">
                          Humidity
                        </h1>
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

          {/* --- RIGHT COLUMN: 3-Day Forecast --- */}
          <div className="flex flex-col gap-4 h-full">
            {weather && (
              <div className="animated-gradient bg-linear-to-tr from-[#121a2a] via-[#1d293d] to-[#4fa3d8] text-white p-6 rounded-3xl h-full flex flex-col shadow-lg overflow-hidden">
                <h3 className="text-xl font-bold mb-6 pl-2 opacity-90">
                  3-Day Forecast
                </h3>

                <div className="flex flex-col gap-3 justify-center h-full">
                  {weather.forecast.forecastday.map((day, index) => {
                    const dateObj = new Date(day.date);
                    const isToday = index === 0;
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
      </section>

      {/* --- SECTION 2: TODAY'S HOURLY FORECAST --- */}
      {weather && (
        <section className="mt-8 max-w-7xl mx-auto mb-8 bg-[#61bdf2] rounded-3xl p-4">
          <h3 className="text-[2rem] tracking-tighter font-bold text-slate-800 mb-6 pl-2">
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

      {/* --- SECTION 3: AIR QUALITY --- */}
      {weather && (
        <section className=" max-w-7xl mx-auto mb-10">
          <div className="bg-[#61bdf2] p-6 rounded-3xl">
            <AirQualityComponent airQuality={weather.current.air_quality} />
          </div>
        </section>
      )}

      {weather && (
        <section className="mt-8 max-w-7xl mx-auto mb-8">
          {/* Section Header */}
          <div className="justify-start items-start mb-6 px-2 flex flex-col ">
            <div className="flex flex-row justify-center items-center gap-4">
              <h3 className="text-[2rem] tracking-tighter text-center font-bold text-slate-800">
                Weather Map
              </h3>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Live
              </span>
            </div>
            <p className="text-[.8rem] text-gray-500">
              Powered by openweatherapi.org
            </p>
          </div>

          {/* The Map Component */}
          <WeatherMap lat={weather.location.lat} lon={weather.location.lon} />
        </section>
      )}
    </>
  );
}

export default HomePage;
