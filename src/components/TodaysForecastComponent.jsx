import { motion } from "framer-motion";

function TodaysForecastComponent({ time, icon, temp, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: index * 0.05 
      }}
    
      whileHover={{ 
        y: -5, 
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        scale: 1.02
      }}
      whileTap={{ scale: 0.98 }}
      

      className="flex flex-col items-center justify-between p-4 md:p-6 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/30 shadow-sm cursor-pointer h-full min-h-[160px] transition-colors"
    >
    
      <span className="py-1 px-3 bg-white/50 rounded-full text-xs md:text-sm font-semibold text-slate-700 shadow-sm border border-white/50 mb-2">
        {time}
      </span>
      
    
      <div className="my-2 flex-grow flex items-center justify-center">
        <img 
          src={icon} 
          alt="weather icon" 
          className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-sm filter saturate-150" 
        />
      </div>
      
    
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
        {temp}°
      </h1>
    </motion.div>
  );
}

export default TodaysForecastComponent;