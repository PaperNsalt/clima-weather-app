import { useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// --- 1. Fix Leaflet Default Icon ---
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- 2. Configuration for Layers & Legends ---
const LAYER_CONFIG = {
  temp_new: {
    name: "Temperature",
    color: "bg-orange-500",
    opacity: 1,
    legendGradient: "linear-gradient(to right, #9c27b0, #2196f3, #009688, #8bc34a, #ffeb3b, #ff9800, #f44336)",
    legendLabels: ["-40°", "0°", "20°", "40°+"] // Simplified labels for mobile
  },
  precipitation_new: {
    name: "Rain Radar",
    color: "bg-blue-500",
    opacity: 1,
    legendGradient: "linear-gradient(to right, rgba(0,0,0,0), #8A2BE2, #0000FF, #00FF00, #FFFF00, #FF7F00, #FF0000)",
    legendLabels: ["Light", "Med", "Heavy"]
  },
  clouds_new: {
    name: "Clouds",
    color: "bg-slate-600",
    opacity: 1,
    legendGradient: "linear-gradient(to right, rgba(45,212,191,0.2), #0891B2, #083344)",
    legendLabels: ["Clear", "Cloudy", "Overcast"],
  },
  wind_new: {
    name: "Wind Speed",
    color: "bg-teal-500",
    opacity: 1,
    legendGradient: "linear-gradient(to right, rgba(255,255,255,0), #9370DB, #4B0082, #FFFF00, #FF0000)",
    legendLabels: ["Calm", "Breezy", "Storm"]
  },
};

// --- 3. Helper to move map ---
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 10);
  return null;
}

// --- 4. The Legend Component ---
function MapLegend({ activeLayer }) {
  const config = LAYER_CONFIG[activeLayer];
  
  return (
    <div className="leaflet-bottom leaflet-left" style={{ bottom: "20px", left: "10px", zIndex: 1000, pointerEvents: "none" }}>
      <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/60 w-[200px] md:w-64 pointer-events-auto transition-all">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] md:text-xs font-bold text-slate-700 uppercase tracking-wider">{config.name}</span>
        </div>
        
        {/* The Color Bar */}
        <div 
          className="h-2 md:h-3 w-full rounded-full shadow-inner mb-2" 
          style={{ background: config.legendGradient }} 
        />
        
        {/* The Labels */}
        <div className="flex justify-between text-[8px] md:text-[10px] font-bold text-slate-500">
          {config.legendLabels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WeatherMap({ lat, lon }) {
  const [activeLayer, setActiveLayer] = useState("temp_new");
  const API_KEY = import.meta.env.VITE_APP_OWM_API_KEY;
  const position = lat && lon ? [lat, lon] : [51.505, -0.09];

  return (
    // Responsive Height: 350px on mobile, 500px on desktop
    <div className="relative h-[350px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 z-0 bg-slate-100">
      
      {/* --- RESPONSIVE LAYER SWITCHER --- 
          Mobile: Horizontal scroll at top 
          Desktop: Vertical list at right
      */}
      <div className="absolute top-3 left-3 right-3 md:left-auto md:right-4 z-[999] flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide snap-x">
        {Object.keys(LAYER_CONFIG).map((key) => {
          const layer = LAYER_CONFIG[key];
          const isActive = activeLayer === key;
          
          return (
            <button
              key={key}
              onClick={() => setActiveLayer(key)}
              className={`
                relative flex-shrink-0 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl transition-all duration-300
                border shadow-sm snap-start
                ${isActive 
                  ? "bg-slate-800 text-white border-slate-800 shadow-md scale-100 md:scale-105" 
                  : "bg-white/90 backdrop-blur-sm text-slate-600 border-white/50 hover:bg-white"
                }
              `}
            >
              <span className={`w-2 h-2 rounded-full ${isActive ? "bg-blue-400 animate-pulse" : layer.color}`} />
              <span className="text-xs md:text-sm font-bold whitespace-nowrap">{layer.name}</span>
            </button>
          );
        })}
      </div>

      <MapContainer 
        center={position} 
        zoom={10} 
        scrollWheelZoom={false} // Keeps page scroll smooth
        className="h-full w-full z-0"
      >
        <ChangeView center={position} />

        {/* Base Map - CartoDB Positron (Light) fits your aesthetic better than Dark Matter */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Weather Overlay */}
        {API_KEY && (
          <TileLayer
            key={activeLayer}
            url={`https://tile.openweathermap.org/map/${activeLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
            opacity={LAYER_CONFIG[activeLayer].opacity} 
          />
        )}
        
        {/* Inject the Legend */}
        <MapLegend activeLayer={activeLayer} />
      </MapContainer>
    </div>
  );
}

export default WeatherMap;