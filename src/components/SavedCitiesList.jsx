import { motion, AnimatePresence } from "framer-motion";

function SavedCitiesList({ cities, onSelect, onDelete }) {
  if (cities.length === 0) return null;

  return (
    <div className="w-full mt-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Saved Locations
        </h4>
        <span className="text-xs text-slate-300 font-medium">
            {cities.length} saved
        </span>
      </div>

      {/* Scrollable List */}
      <div className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {cities.map((city) => (
            <motion.div
              key={city}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="relative group flex-shrink-0"
            >
              <div className="relative flex items-center bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden group">
                
                {/* 1. Main Click Area (Select City) */}
                <button
                  onClick={() => onSelect(city)}
                  className="flex items-center gap-2 pl-4 pr-10 py-3 text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors"
                >
                  {/* Pin Icon */}
                  <svg 
                    className="w-4 h-4 opacity-50 group-hover:text-blue-500 transition-colors" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {city}
                </button>

                {/* 2. Delete Button (Separate Interaction) */}
                <div className="absolute right-0 top-0 bottom-0 w-8 flex items-center justify-center border-l border-slate-50 bg-slate-50/50 hover:bg-red-50 transition-colors">
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Stop click from triggering onSelect
                            onDelete(city);
                        }}
                        className="w-full h-full flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors"
                        title="Remove location"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SavedCitiesList;