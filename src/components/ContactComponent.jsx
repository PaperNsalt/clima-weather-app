import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

// --- 1. The Component ---
function SocialCard({ icon, name, color = "bg-blue-100", href = "#" }) {
  const ref = useRef(null);

  // Motion Values for Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth tilt
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  // Transform mouse position to rotation
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      // RESPONSIVE CLASSES: 
      // w-full = full width on mobile
      // min-h-[200px] = ensures it's tall enough on mobile
      // md:h-72 md:w-72 = fixed square size on larger screens
      className="relative flex flex-col justify-center items-center w-full min-h-50 border border-black/20 md:h-72 md:w-auto rounded-[2.5rem] bg-white shadow-lg cursor-pointer perspective-1000 overflow-hidden md:overflow-visible"
    >
      <motion.div
        variants={{
          initial: { opacity: 0, scale: 0.8 },
          hover: { opacity: 1, scale: 1.1 },
          tap: { opacity: 1, scale: 1.0 }, // Show glow on tap for mobile
        }}
        transition={{ duration: 0.4 }}
        className={`absolute inset-0 -z-10 ${color} blur-3xl rounded-full opacity-0`}
      />

      {/* Content Layer */}
      <div
        style={{ transform: "translateZ(50px)" }}
        className="flex flex-col items-center z-10 pointer-events-none"
      >
        <motion.div
          variants={{
            initial: { scale: 1, y: 0 },
            hover: { scale: 1.1, y: -5 },
            tap: { scale: 0.95, y: 0 },
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="drop-shadow-lg text-slate-800"
        >
          {icon}
        </motion.div>

        <h1 className="text-2xl md:text-4xl tracking-tighter font-bold text-slate-800 mt-4 mb-1">
          {name}
        </h1>

        <motion.p
          variants={{
            initial: { opacity: 0, y: 10 },
            hover: { opacity: 1, y: 0 },
            tap: { opacity: 1, y: 0 }, // Show text on tap for mobile
          }}
          className="text-xs font-semibold uppercase tracking-widest text-slate-400"
        >
          Visit Page
        </motion.p>
      </div>

      {/* Glossy Overlay */}
      <div
        className="absolute inset-0 z-20 rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{ transform: "translateZ(20px)" }}
      />
    </motion.a>
  );
}

export default SocialCard;
