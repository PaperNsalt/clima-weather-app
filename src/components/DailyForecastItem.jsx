import { motion } from "framer-motion";

function DailyForecastItem({ day, date, icon, maxTemp, minTemp, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex items-center justify-between p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 transition-colors cursor-default"
    >
      <div className="flex flex-col">
        <span className="text-white font-bold text-lg">{day}</span>
        <span className="text-slate-400 text-xs font-medium">{date}</span>
      </div>

      <div className="flex items-center gap-4">
        <img
          src={icon}
          alt="weather icon"
          className="w-10 h-10 object-contain"
        />
        <div className="flex flex-col items-end">
          <span className="text-white font-bold text-xl">{maxTemp}°</span>
          <span className="text-slate-400 text-sm">{minTemp}°</span>
        </div>
      </div>
    </motion.div>
  );
}

export default DailyForecastItem;
