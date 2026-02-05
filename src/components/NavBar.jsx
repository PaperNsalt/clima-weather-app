import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../assets/ClimaLogo.svg';

// --- Variants for Menu Animation ---
const menuVariants = {
  hidden: { 
    opacity: 0, 
    height: 0, 
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  visible: { 
    opacity: 1, 
    height: "auto", 
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({ 
    opacity: 1, 
    x: 0, 
    transition: { delay: i * 0.05, duration: 0.3 } 
  })
};

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu automatically when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // --- Reusable Nav Item ---
  const NavItem = ({ to, children, mobile = false, index }) => {
    // 1. Determine if this link is active
    const isActive = location.pathname === to;

    return (
      <Link to={to} className="relative group">
        <motion.div
          // --- HOVER & CLICK ANIMATIONS ---
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          initial={mobile ? "hidden" : "visible"}
          animate={mobile ? "visible" : "visible"}
          custom={index}
          variants={mobile ? itemVariants : {}}
          
          className={`
            relative z-10 px-5 py-2.5 text-sm font-semibold rounded-full transition-colors duration-300
            ${mobile ? "w-full text-center text-lg py-4 block" : "block"}
            ${isActive 
               ? "text-white" // Active text color
               : "text-slate-600 hover:text-[#4A90E2]" // Inactive text color
            }
          `}
        >
          {children}

          {/* --- ACTIVE INDICATOR (The "Pill" Slide Effect) --- */}
          {/* Only show this layoutId on Desktop to avoid conflicts */}
          {!mobile && isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-[#4A90E2] rounded-full -z-10 shadow-md shadow-blue-200"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          {/* Fallback active state for Mobile (No slide effect, just color) */}
          {mobile && isActive && (
             <div className="absolute inset-0 bg-[#4A90E2] rounded-full -z-10 shadow-md" />
          )}
        </motion.div>
      </Link>
    );
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm transition-all">
        <nav className="flex justify-between items-center max-w-7xl mx-auto py-3 px-4 md:px-8">
          
          {/* 1. LOGO SECTION */}
          <div className="shrink-0 z-50">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.img 
                whileHover={{ rotate: 10, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                src={logo} 
                alt="ClimaLogo" 
                className="w-10 h-10 md:w-12 md:h-12 drop-shadow-sm" 
              />
              <span className="font-bold text-xl md:text-2xl tracking-tighter text-slate-800">
                CLIMA
              </span>
            </Link>
          </div>

          {/* 2. DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1 bg-white/50 p-1.5 rounded-full border border-white/60 shadow-inner">
            {/* Note: Using manual list instead of NavItem repeated creates a cleaner LayoutGroup 
              Use LayoutGroup if you have weird layout jumps, but here it works natively.
            */}
            <NavItem to="/">HOME</NavItem>
            <NavItem to="/about">ABOUT</NavItem>
            <NavItem to="/contact">CONTACT</NavItem>
            <NavItem to="/settings">SETTINGS</NavItem>
          </div>

          {/* 3. MOBILE HAMBURGER BUTTON */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={toggleMenu}
            className="md:hidden relative z-50 p-2 text-slate-700 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-center overflow-hidden">
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} 
                className="w-full h-0.5 bg-slate-800 block rounded-full transition-transform origin-center" 
              />
              <motion.span 
                animate={isOpen ? { x: -100, opacity: 0 } : { x: 0, opacity: 1 }} 
                className="w-full h-0.5 bg-slate-800 block rounded-full transition-all" 
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} 
                className="w-full h-0.5 bg-slate-800 block rounded-full transition-transform origin-center" 
              />
            </div>
          </motion.button>
        </nav>

        {/* 4. MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl"
            >
              <div className="flex flex-col p-6 gap-2 items-center">
                {["Home", "About", "Contact", "Settings"].map((item, index) => (
                  <NavItem 
                    key={item} 
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                    mobile={true}
                    index={index}
                  >
                    {item.toUpperCase()}
                  </NavItem>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}

export default NavBar;