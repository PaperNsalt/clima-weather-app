import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import logo from "../assets/ClimaLogo.svg"; // Assuming you have this

// --- 1. REUSABLE COMPONENTS ---

// A simple card for the images/visuals
const VisualCard = ({ color = "bg-blue-100", children }) => (
  <div
    className={`w-full aspect-video rounded-3xl ${color} border border-white/20 shadow-xl overflow-hidden flex items-center justify-center relative`}
  >
    {children}
    {/* Decorative sheen */}
    <div className="absolute inset-0 bg-linear-to-tr from-white/40 to-transparent opacity-50" />
  </div>
);

// --- 2. THE MAIN COMPONENT ---
function AboutPage() {
  // Ref for the timeline container to track scrolling
  const containerRef = useRef(null);

  // Scroll Progress Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"], // Start animating when top of container hits bottom of screen
  });

  // Smooth out the drawing action so it doesn't jitter
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  return (
    <div className=" min-h-screen pb-40 overflow-hidden">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#4A90E2] font-bold tracking-widest text-sm uppercase mb-2 block">
            Behind the Scenes
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-800 mb-6">
            About CLIMA
          </h1>
          <p className="max-w-xl text-slate-500 text-lg md:text-xl leading-relaxed mx-auto">
            More than just a weather app. It's a journey into modern UI,
            accurate data, and seamless user experience.
          </p>
        </motion.div>
      </section>

      {/* --- TIMELINE CONTAINER --- */}
      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto px-4 md:px-8"
      >
        {/* ==================================================================
            THE CURLY LINE (SVG)
            This sits behind the content.
            The 'd' path is hand-coded to curve between the grid sections.
           ================================================================== */}
        <div className="absolute top-0 left-0 w-full h-full hidden md:block -z-10 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 2000" // Arbitrary large coordinate system
            fill="none"
            preserveAspectRatio="none" // Stretches to fit height
          >
            {/* Path Definition:
               M 500 0   -> Start Top Center
               C ...     -> Bezier Curves to snake left and right
            */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A90E2" />
                <stop offset="100%" stopColor="#88C0FC" />
              </linearGradient>
            </defs>

            {/* Gray Background Track Line */}
            <path
              d="M 500 0 
                 Q 500 100, 250 200 
                 T 250 500 
                 Q 250 800, 750 900 
                 T 750 1300 
                 Q 750 1600, 500 1800 
                 T 500 2000"
              stroke="#E2E8F0"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Colored Animated Line */}
            <motion.path
              d="M 500 0 
                 Q 500 100, 250 200 
                 T 250 500 
                 Q 250 800, 750 900 
                 T 750 1300 
                 Q 750 1600, 500 1800 
                 T 500 2000"
              stroke="url(#gradient)" // Uses the gradient defined above
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength }} // Connects to scroll
            />
          </svg>
        </div>

        {/* --- SECTION 1: INTRODUCTION (Left Aligned) --- */}
        {/* The grid places text on left, image on right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-40 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-start text-left"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mb-6 text-2xl">
              🌤️
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-800 mb-4">
              Real-time Precision
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              CLIMA is a modern web-based weather application designed to
              deliver accurate, real-time weather information through a clean
              and user-friendly interface. By leveraging reliable weather APIs,
              we help you plan your day with confidence.
            </p>
          </motion.div>

          {/* Visual placed on the right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:pl-10"
          >
            <VisualCard color="bg-[#4A90E2]">
              <h3 className="text-white font-bold text-3xl">Clean UI</h3>
            </VisualCard>
          </motion.div>
        </div>

        {/* --- SECTION 2: PURPOSE (Right Aligned) --- */}
        {/* The grid places image on left, text on right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-40 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 md:order-1 md:pr-10"
          >
            <VisualCard color="bg-slate-800">
              <span className="text-6xl">🌍</span>
            </VisualCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 md:order-2 flex flex-col items-start text-left"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mb-6 text-2xl">
              🎯
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-800 mb-4">
              Purpose Driven
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              The goal is to provide an accessible platform that enables users
              to visualize weather patterns. We aim to help users make informed
              decisions for daily activities and travel while showcasing modern
              frontend capabilities.
            </p>
          </motion.div>
        </div>

        {/* --- SECTION 3: TECH STACK (Left Aligned - NEW CONTENT) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative pb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-start text-left"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mb-6 text-2xl">
              ⚡
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-800 mb-4">
              Built with Speed
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              We utilized the latest web technologies to ensure a snappy,
              responsive experience.
            </p>

            <ul className="space-y-3">
              {[
                "React & React Router",
                "Tailwind CSS for Styling",
                "Framer Motion for Animation",
                "OpenWeatherMap API",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#4A90E2]" />
                  <span className="font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:pl-10"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100" />
                <span className="font-bold text-slate-700">React</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-cyan-100" />
                <span className="font-bold text-slate-700">Tailwind</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple-100" />
                <span className="font-bold text-slate-700">Framer</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-100" />
                <span className="font-bold text-slate-700">API</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
