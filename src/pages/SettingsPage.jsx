import { useState } from "react";
import { motion } from "framer-motion";

// --- ICONS ---
const MoonIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-011.33-2.695 10.03 10.03 0 009.088 12.922 9.75 9.75 0 003.334-.925z" />
  </svg>
);
const SunIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);
const TrashIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

// --- REUSABLE TOGGLE SWITCH ---
const ToggleSwitch = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      checked ? "bg-blue-600" : "bg-slate-300"
    }`}
  >
    <span
      className={`${
        checked ? "translate-x-6" : "translate-x-1"
      } inline-block h-5 w-5 transform rounded-full bg-white transition-transform`}
    />
  </button>
);

function SettingsPage() {
  // Mock State - In a real app, use useContext or localStorage
  const [units, setUnits] = useState("celsius"); // 'celsius' or 'fahrenheit'
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);

  const handleClearData = () => {
    if (window.confirm("Are you sure? This will delete all saved cities.")) {
      // Logic to clear localStorage
      alert("Saved cities cleared!");
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50 pt-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Settings</h1>
        <p className="text-slate-500 mb-8">Customize your weather experience.</p>

        {/* --- SECTION 1: PREFERENCES --- */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-2">Preferences</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            
            {/* Unit Toggle */}
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Temperature Unit</h3>
                <p className="text-sm text-slate-500">Choose between Celsius and Fahrenheit</p>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setUnits("celsius")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    units === "celsius" ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  °C
                </button>
                <button
                  onClick={() => setUnits("fahrenheit")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    units === "fahrenheit" ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  °F
                </button>
              </div>
            </div>

            {/* Location Access */}
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Auto-detect Location</h3>
                <p className="text-sm text-slate-500">Use GPS on startup</p>
              </div>
              <ToggleSwitch checked={locationAccess} onChange={setLocationAccess} />
            </div>
          </div>
        </section>

        {/* --- SECTION 2: APPEARANCE --- */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-2">Appearance</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">App Theme</h3>
            <div className="grid grid-cols-3 gap-4">
              
              {/* Light Option */}
              <button
                onClick={() => setTheme("light")}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  theme === "light" ? "border-blue-500 bg-blue-50" : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <SunIcon className={`w-8 h-8 mb-2 ${theme === "light" ? "text-blue-500" : "text-slate-400"}`} />
                <span className={`text-sm font-medium ${theme === "light" ? "text-blue-600" : "text-slate-500"}`}>Light</span>
              </button>

              {/* Dark Option */}
              <button
                onClick={() => setTheme("dark")}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  theme === "dark" ? "border-blue-500 bg-slate-800" : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <MoonIcon className={`w-8 h-8 mb-2 ${theme === "dark" ? "text-blue-400" : "text-slate-400"}`} />
                <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-500"}`}>Dark</span>
              </button>

              {/* System Option */}
              <button
                onClick={() => setTheme("system")}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  theme === "system" ? "border-blue-500 bg-slate-100" : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="w-8 h-8 rounded-full border-2 border-slate-400 mb-2 relative overflow-hidden bg-white">
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-slate-800"></div>
                </div>
                <span className={`text-sm font-medium ${theme === "system" ? "text-blue-600" : "text-slate-500"}`}>System</span>
              </button>

            </div>
          </div>
        </section>

        {/* --- SECTION 3: DATA & PRIVACY --- */}
        <section>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-2">Data</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            
            {/* Notifications */}
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Weather Alerts</h3>
                <p className="text-sm text-slate-500">Get notified about severe weather</p>
              </div>
              <ToggleSwitch checked={notifications} onChange={setNotifications} />
            </div>

            {/* Clear Data (Danger Zone) */}
            <div className="p-6 flex items-center justify-between hover:bg-red-50 transition-colors group cursor-pointer" onClick={handleClearData}>
              <div>
                <h3 className="text-lg font-semibold text-red-600 group-hover:text-red-700">Clear Saved Locations</h3>
                <p className="text-sm text-red-400/80 group-hover:text-red-500">Remove all your bookmarked cities</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors">
                 <TrashIcon className="w-5 h-5 text-red-600" />
              </div>
            </div>

          </div>
        </section>

        <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm">CLIMA Weather App v1.0.0</p>
            <p className="text-slate-300 text-xs mt-1">Made with ❤️ using React</p>
        </div>

      </div>
    </div>
  );
}

export default SettingsPage;