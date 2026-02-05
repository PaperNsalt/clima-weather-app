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
      <section className="mt-6 md:mt-10 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-[#61bdf2] p-8 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] shadow-lg hover:shadow-xl transition-shadow duration-300 items-center">

          <div className="flex justify-center items-center w-full max-w-[280px] md:max-w-full mx-auto">
            <LottieComponent />
          </div>

          <div className="flex flex-col gap-4 text-center md:text-left">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              WELCOME TO <span className="text-white drop-shadow-md">CLIMA</span>
            </h1>

            <p className="text-[.7rem] md:text-lg leading-relaxed text-slate-800 font-medium max-w-prose mx-auto md:mx-0 opacity-90">
              CLIMA is a modern weather web application that provides real-time,
              accurate, and easy-to-understand weather information. Designed
              with simplicity in mind, we help you stay prepared for daily
              activities, rain or shine.
            </p>
          </div>
        </div>
      </section>


      <section className="mt-6 md:mt-10 px-4 max-w-7xl mx-auto">
        <div className="p-6 md:p-10 animated-gradient bg-gradient-to-br from-[#1d293d] via-[#2f5f8f] to-[#61bdf2] rounded-[2rem] shadow-xl">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

            <div className="md:col-span-2 flex flex-col justify-center items-start p-6 md:p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl hover:bg-white/15 transition-colors duration-300">
              <h1 className="text-xl md:text-2xl tracking-tight font-bold text-white mb-2">
                Real-Time Weather Updates
              </h1>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                CLIMA fetches live weather data directly from a weather API,
                ensuring that users always receive up-to-date information about
                their location. From temperature changes to sudden weather
                conditions, CLIMA keeps you informed instantly.
              </p>
            </div>


            <div className="flex flex-col justify-center items-start p-6 md:p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl hover:bg-white/15 transition-colors duration-300">
              <h1 className="text-xl md:text-2xl tracking-tight font-bold text-white mb-2">
                Location-Based
              </h1>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                By detecting or selecting a location, CLIMA delivers
                location-specific details to help you plan your commute, travel,
                or outdoor activities.
              </p>
            </div>


            <div className="flex flex-col justify-center items-start p-6 md:p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl hover:bg-white/15 transition-colors duration-300">
              <h1 className="text-xl md:text-2xl tracking-tight font-bold text-white mb-2">
                Short-Term Forecast
              </h1>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                CLIMA doesn’t just show today’s weather—it also provides a
                forecast for the next few days, giving users a clear overview of
                upcoming conditions.
              </p>
            </div>


            <div className="md:col-span-2 flex flex-col justify-center items-start p-6 md:p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl hover:bg-white/15 transition-colors duration-300">
              <h1 className="text-xl md:text-2xl tracking-tight font-bold text-white mb-2">
                Powered by Weather API
              </h1>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                CLIMA is powered by a trusted Weather API, enabling fast and
                reliable data retrieval. API integration ensures accurate
                weather readings, consistent data updates, and scalable
                performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 md:mt-10 px-4 max-w-7xl">
        {/* Top Search Bar */}
        <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-slate-100 w-full">
          <h3 className="text-lg md:text-xl font-bold mb-4 text-slate-700">
            Change Location
          </h3>
          <SearchBar onSearch={fetchWeather} />

          <div className="mt-4 overflow-x-auto pb-2 scrollbar-hide">
            <SavedCitiesList
              cities={savedCities}
              onSelect={fetchWeather}
              onDelete={toggleCity}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 md:mt-10">
          {/* --- LEFT COLUMN: Main Weather Card --- */}
          <div className="lg:col-span-2 relative flex flex-col p-6 md:p-10 rounded-3xl shadow-xl overflow-hidden border border-white/20">
            <div className="absolute inset-0 z-0 bg-blue-400">
              <LottieBackground />
              {/* Subtle gradient to ensure white text pops even if animation is bright */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
            </div>


            <div className="relative z-10 flex flex-col h-full justify-between">

              {loading && (
                <div className="absolute inset-0 bg-white/30 rounded-3xl flex items-center justify-center backdrop-blur-md z-50">

                </div>
              )}

              {error && (
                <div className="absolute inset-0 bg-red-100/90 rounded-3xl flex items-center justify-center z-50 p-4 text-center">
                  <p className="text-red-600 font-bold">{error}</p>
                </div>
              )}

              {weather && (
                <>

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                      <div className="flex flex-row rounded-full bg-white/40 w-fit items-center py-2 px-4 shadow-sm backdrop-blur-md border border-white/30">
                        <span className="mr-2 text-blue-600">
                          {LocationIcon}
                        </span>
                        <p className="font-semibold text-slate-800 text-sm md:text-base truncate max-w-[200px] md:max-w-none">
                          {weather.location.name}, {weather.location.country}
                        </p>
                      </div>

  
                      <div className="flex items-center gap-2 self-end md:self-auto">
                        <button
                          onClick={handleRefresh}
                          disabled={loading}
                          className="p-3 bg-white/40 backdrop-blur-md rounded-full hover:bg-white/60 transition-all border border-white/30 shadow-sm"
                        >
                          <RefreshIcon
                            className={`w-5 h-5 md:w-6 md:h-6 text-slate-700 ${loading ? "animate-spin" : ""}`}
                          />
                        </button>

                        <button
                          onClick={() => toggleCity(weather.location.name)}
                          className="p-3 bg-white/40 backdrop-blur-md rounded-full hover:bg-white/60 transition-all border border-white/30 shadow-sm"
                        >
                          <HeartIcon
                            className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${
                              isSaved(weather.location.name)
                                ? "text-red-500 fill-red-500"
                                : "text-slate-600"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Main Weather Info */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 md:mt-0">
                      <div>
                        <h1 className="text-4xl md:text-[3rem] tracking-tighter font-bold leading-none text-slate-800 drop-shadow-sm">
                          Weather
                        </h1>
                        <p className="text-slate-700 text-lg md:text-xl capitalize font-medium mt-1">
                          {weather.current.condition.text}
                        </p>
                      </div>

                      <div className="self-center md:self-auto mt-4 md:mt-0">
                        <img
                          src={`https:${weather.current.condition.icon}`}
                          alt="Weather Icon"
                          className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:grid md:grid-cols-2 gap-6 mt-auto items-end w-full">
                    
                    <div className="flex flex-col self-start md:self-end">
                      <h1 className="text-6xl md:text-[5rem] leading-none font-bold text-white tracking-tight drop-shadow-lg">
                        {Math.round(weather.current.temp_c)}°
                      </h1>
                      <p className="text-white/90 font-medium pl-1 md:pl-2 text-sm md:text-base drop-shadow-md">
                        Feels Like {Math.round(weather.current.feelslike_c)}°
                      </p>
                    </div>

                
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {/* Visibility */}
                      <div className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-2xl flex flex-col items-center justify-center text-white shadow-sm">
                        <h1 className="text-[10px] md:text-xs uppercase font-bold opacity-80">
                          Visibility
                        </h1>
                        <span className="font-bold text-sm md:text-base">
                          {weather.current.vis_km}km
                        </span>
                      </div>

                      {/* Humidity */}
                      <div className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-2xl flex flex-col items-center justify-center text-white shadow-sm">
                        <h1 className="text-[10px] md:text-xs uppercase font-bold opacity-80">
                          Humidity
                        </h1>
                        <span className="font-bold text-sm md:text-base">
                          {weather.current.humidity}%
                        </span>
                      </div>

                      {/* Wind */}
                      <div className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-2xl col-span-2 flex flex-row justify-between px-6 items-center text-white shadow-sm">
                        <span className="text-[10px] md:text-xs uppercase font-bold opacity-80">
                          Wind
                        </span>
                        <span className="font-bold text-sm md:text-base">
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
          <div className="flex flex-col h-full">
            {weather && (
              <div className="animated-gradient bg-linear-to-tr from-[#121a2a] via-[#1d293d] to-[#4fa3d8] text-white p-6 rounded-3xl h-full flex flex-col shadow-lg">
                <h3 className="text-lg md:text-xl font-bold mb-6 pl-2 opacity-90">
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
        <section className="max-[426px]:ml-4 max-[426px]:mr-4 mt-6 md:mt-10 mx-auto max-w-7xl mb-8 bg-[#61bdf2] rounded-3xl p-4 md:p-8 shadow-md overflow-hidden">
          <h3 className="text-xl md:text-2xl tracking-tight font-bold text-slate-900/80 mb-6 pl-2">
            Today's Forecast
          </h3>

          <div className="flex flex-row overflow-x-auto pb-6 gap-4 md:grid md:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] md:overflow-visible md:pb-0 snap-x scrollbar-hide">
            {forecastData.map((hour, index) => {
              const date = new Date(hour.time);
              const timeString = date.toLocaleTimeString([], {
                hour: "numeric",
                hour12: true,
              });

              return (
              
                <div
                  key={index}
                  className="min-w-[130px] md:min-w-0 snap-start h-full"
                >
                  <TodaysForecastComponent
                    time={timeString}
                    icon={`https:${hour.condition.icon}`}
                    temp={Math.round(hour.temp_c)}
                    index={index}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* --- SECTION 3: AIR QUALITY --- */}
      {weather && (
        <section className="max-w-7xl mx-auto mb-10 max-[426px]:ml-4 max-[426px]:mr-4">
          <div className="bg-[#61bdf2] p-6 rounded-3xl">
            <AirQualityComponent airQuality={weather.current.air_quality} />
          </div>
        </section>
      )}

      {weather && (
        <section className="mt-6 md:mt-12 max-w-7xl mx-auto mb-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl md:text-3xl tracking-tight font-bold text-slate-800">
                  Weather Map
                </h3>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <span className="bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-blue-100">
                  Live
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Real-time precipitation, clouds, and temperature data.
              </p>
            </div>

           
            <p className="text-[10px] text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
              Powered by OpenWeatherMap
            </p>
          </div>

  
          <WeatherMap lat={weather.location.lat} lon={weather.location.lon} />
        </section>
      )}
    </>
  );
}

export default HomePage;
