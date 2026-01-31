import { motion } from "framer-motion";

function TodaysForecastComponent({ time, icon, temp }) {
  return (
    <motion.div
      // Animation: Fade in and slide up
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // Hover effect: Scale up slightly and become more opaque
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
      transition={{ type: "spring", stiffness: 300 }}
      
      // Glassmorphism Styles
      className="flex flex-col items-center justify-between p-6 rounded-3xl bg-white/50 backdrop-blur-lg border border-white/40 shadow-lg cursor-pointer h-full"
    >
      {/* Time Pill */}
      <p className="py-1 px-4 bg-white/60 rounded-full text-sm font-bold text-slate-600 border border-black/40 mb-2">
        {time}
      </p>
      
      {/* Icon */}
      <div className="my-2">
        <img src={icon} alt="weather icon" className="w-16 h-16 object-contain drop-shadow-md" />
      </div>
      
      {/* Temp */}
      <h1 className="text-[2rem] font-bold text-slate-800">{temp}°</h1>
    </motion.div>
  );
}

export default TodaysForecastComponent;