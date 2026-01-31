import { motion } from "framer-motion";
import { WindIcon } from "./IconComponent";

function AirQualityComponent({ airQuality }) {
  // ✅ SAFETY CHECK: If data is missing, return null or a loading state
  if (!airQuality) return null;

  const aqiIndex = airQuality["us-epa-index"] || 1;
  // Use optional chaining (?.) just in case specific metrics are missing
  const pm2_5 = airQuality.pm2_5 ? Math.round(airQuality.pm2_5) : 0;
  const pm10 = airQuality.pm10 ? Math.round(airQuality.pm10) : 0;

  const getAQIDetails = (index) => {
    switch (index) {
      case 1:
        return { status: "Good", color: "text-green-600", bg: "bg-green-100", desc: "Perfect for outdoor activities." };
      case 2:
        return { status: "Moderate", color: "text-yellow-600", bg: "bg-yellow-100", desc: "Acceptable quality." };
      case 3:
        return { status: "Unhealthy for Sensitive Groups", color: "text-orange-600", bg: "bg-orange-100", desc: "Reduce prolonged outdoor exertion." };
      case 4:
        return { status: "Unhealthy", color: "text-red-600", bg: "bg-red-100", desc: "Avoid long outdoor exposure." };
      case 5:
        return { status: "Very Unhealthy", color: "text-purple-600", bg: "bg-purple-100", desc: "Avoid all outdoor activities." };
      case 6:
        return { status: "Hazardous", color: "text-rose-900", bg: "bg-rose-200", desc: "Stay indoors immediately." };
      default:
        return { status: "Unknown", color: "text-slate-500", bg: "bg-slate-100", desc: "Data unavailable." };
    }
  };

  const details = getAQIDetails(aqiIndex);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/60 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center justify-between"
    >
      {/* Left: Status */}
      <div className="flex flex-col gap-2 flex-1 w-full text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
          <div className={`p-2 rounded-full ${details.bg} ${details.color}`}>
            {WindIcon}
          </div>
          <h3 className="text-xl font-bold text-slate-700">Air Quality</h3>
        </div>
        
        <h2 className={`text-3xl md:text-4xl font-bold tracking-tighter ${details.color}`}>
          {details.status}
        </h2>
        <p className="text-slate-500 mt-1 text-lg tracking-tighter">
          {details.desc}
        </p>
      </div>

      {/* Right: Metrics */}
      <div className="flex flex-row gap-4 w-full md:w-auto justify-center">
        <div className="bg-slate-50 p-4 md:p-6 rounded-2xl min-w-[120px] border border-slate-100 flex flex-col items-center md:items-start">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-tighter mb-1">Fine Particles</span>
          <div className="flex items-end gap-1">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-700">{pm2_5}</h1>
            <h1 className="text-sm font-medium text-slate-400 mb-1">PM2.5</h1>
          </div>
        </div>

        <div className="bg-slate-50 p-4 md:p-6 rounded-2xl min-w-[120px] border border-slate-100 flex flex-col items-center md:items-start">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-tighter mb-1">Coarse Dust</span>
          <div className="flex items-end gap-1">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-700">{pm10}</h1>
            <h1 className="text-sm font-medium text-slate-400 mb-1">PM10</h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AirQualityComponent;