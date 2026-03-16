import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/ClimaLogo.svg";


const BentoGridIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="2" />
    <rect x="14" y="3" width="7" height="7" rx="2" />
    <rect x="14" y="14" width="7" height="7" rx="2" />
    <rect x="3" y="14" width="7" height="7" rx="2" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);


const NAV_CONFIG = [
  { label: "HOME", path: "/", icon: <BentoGridIcon /> },
  { label: "ABOUT", path: "/about", icon: <UserIcon /> },
  { label: "CONTACT", path: "/contact", icon: <MailIcon /> },
];

const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);


  const NavItem = ({ item, mobile = false, index }) => {
    const isActive = location.pathname === item.path;

    return (
      <Link to={item.path} className="relative group w-full md:w-auto">
        <motion.div
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          initial={mobile ? "hidden" : "visible"}
          animate={mobile ? "visible" : "visible"}
          custom={index}
          variants={mobile ? itemVariants : {}}
          className={`
            relative z-10 px-5 py-2.5 text-sm font-semibold rounded-full transition-colors duration-300 flex items-center justify-center gap-2
            ${mobile ? "w-full py-4 text-lg" : ""}
            ${isActive ? "text-white" : "text-slate-600 hover:text-[#4A90E2]"}
          `}
        >

          <span
            className={`relative z-10 ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}
          >
            {item.icon}
          </span>

          <span className="relative z-10">{item.label}</span>

          {!mobile && isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-[#4A90E2] rounded-full -z-10 shadow-md shadow-blue-200"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          {mobile && isActive && (
            <div className="absolute inset-0 bg-[#4A90E2] rounded-full -z-10 shadow-md" />
          )}
        </motion.div>
      </Link>
    );
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-100 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm transition-all">
        <nav className="flex justify-between items-center max-w-7xl mx-auto py-3 px-4 md:px-8">
          {/* LOGO */}
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

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1 bg-white/50 p-1.5 rounded-full border border-white/60 shadow-inner">
            {NAV_CONFIG.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
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
                animate={
                  isOpen ? { x: -100, opacity: 0 } : { x: 0, opacity: 1 }
                }
                className="w-full h-0.5 bg-slate-800 block rounded-full transition-all"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-slate-800 block rounded-full transition-transform origin-center"
              />
            </div>
          </motion.button>
        </nav>

        {/* MOBILE MENU DROPDOWN */}
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
                {NAV_CONFIG.map((item, index) => (
                  <NavItem
                    key={item.label}
                    item={item}
                    mobile={true}
                    index={index}
                  />
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
