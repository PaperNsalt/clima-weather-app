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
  precipitation_new: {
    name: "Rain Radar",
    color: "bg-blue-500",
    opacity: 1,
    legendGradient: "linear-gradient(to right, rgba(0,0,0,0), #8A2BE2, #0000FF, #00FF00, #FFFF00, #FF7F00, #FF0000)",
    legendLabels: ["Light", "Moderate", "Heavy"]
  },
clouds_new: {
  name: "Cloud Cover",
  color: "bg-slate-600",
  opacity: 1,
legendGradient:
  "linear-gradient(to right, rgba(45,212,191,0.2), #0891B2, #083344)",
  legendLabels: ["Clear", "Cloudy", "Overcast"],
},

  wind_new: {
    name: "Wind Speed",
    color: "bg-teal-500",
    opacity: 1,
    legendGradient: "linear-gradient(to right, rgba(255,255,255,0), #9370DB, #4B0082, #FFFF00, #FF0000)",
    legendLabels: ["Calm", "Breezy", "Storm"]
  },
  temp_new: {
    name: "Temperature",
    color: "bg-orange-500",
    opacity: 1,
    legendGradient: "linear-gradient(to right, #9c27b0, #2196f3, #009688, #8bc34a, #ffeb3b, #ff9800, #f44336)",
    legendLabels: ["-40°", "0°", "20°", "30°", "40°+"]
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
    <div className="leaflet-bottom leaflet-left" style={{ bottom: "20px", left: "20px", zIndex: 1000, pointerEvents: "none" }}>
      <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200 w-64 pointer-events-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-700 uppercase">{config.name}</span>
        </div>
        
        {/* The Color Bar */}
        <div 
          className="h-3 w-full rounded-full shadow-inner mb-1" 
          style={{ background: config.legendGradient }} 
        />
        
        {/* The Labels */}
        <div className="flex justify-between text-[10px] font-medium text-slate-500">
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
    <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 z-0">
      
      {/* Modern Floating Layer Switcher */}
      <div className="absolute top-4 right-4 z-[999] flex flex-col gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-xl border border-white/50">
        {Object.keys(LAYER_CONFIG).map((key) => {
          const layer = LAYER_CONFIG[key];
          const isActive = activeLayer === key;
          
          return (
            <button
              key={key}
              onClick={() => setActiveLayer(key)}
              className={`
                relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 w-36
                ${isActive ? "bg-slate-800 text-white shadow-lg scale-105" : "hover:bg-slate-100 text-slate-600"}
              `}
            >
              <span className={`w-2 h-2 rounded-full ${isActive ? "bg-blue-400 animate-pulse" : layer.color}`} />
              <span className="text-xs font-bold">{layer.name}</span>
              
              {/* Active Indicator Dot */}
              {isActive && (
                <span className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full opacity-50" />
              )}
            </button>
          );
        })}
      </div>

      <MapContainer center={position} zoom={10} scrollWheelZoom={false} className="h-full w-full z-0">
        <ChangeView center={position} />

        {/* Base Map - CartoDB Dark Matter for "Modern" look, or Positron for Light */}
        {/* Switching to slightly darker base map makes weather colors pop more */}
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