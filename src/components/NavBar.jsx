import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../assets/ClimaLogo.svg'
import { BentoIcon, LocationIcon } from "./IconComponent";

const menuVariants = {
  hidden: { opacity: 0, height: 0, overflow: "hidden" },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "circOut" } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "circIn" } },
};

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Reusable Link Component
  const NavItem = ({ to, children, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
        ${
          isActive
            ? "bg-[#4A90E2] text-white shadow-md"
            : "text-gray-600 hover:bg-[#4A90E2]/16 hover:text-black/80"
        }`
      }
    >
      {children}
    </NavLink>
  );

  const newLocal = "flex";
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="flex justify-between items-center max-w-[90vw] mx-auto py-3 px-4 md:px-8">
          
          {/* 1. LOGO SECTION */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="ClimaLogo" 
                className="size-16 max-[426px]:size-5" 
              />
              <span className="font-medium text-[1.8rem] hidden sm:block tracking-tighter text-black/70">CLIMA</span>
            </Link>
          </div>

          {/* 2. LINKS (Desktop) */}
          {/* justify-between on parent pushes this to the right */}
          <div className="hidden md:flex gap-2 items-center justify-center">
            <NavItem to="/">HOME</NavItem>
            <NavItem to="/about">ABOUT</NavItem>
            <NavItem to="/contact">CONTACT</NavItem>
            <NavItem to="/settings">SETTINGS</NavItem>
          </div>

          {/* 3. MOBILE HAMBURGER BUTTON */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-center relative">
              <motion.span animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-black block rounded-full transition-all" />
              <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-full h-0.5 bg-black block rounded-full transition-all" />
              <motion.span animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-black block rounded-full transition-all" />
            </div>
          </button>
        </nav>

        {/* 4. MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden border-b border-gray-100 bg-white"
            >
              <div className="p-4 flex flex-col gap-2">
                <NavItem to="/" onClick={toggleMenu}>Home</NavItem>
                <NavItem to="/about" onClick={toggleMenu}>About</NavItem>
                <NavItem to="/contact" onClick={toggleMenu}>Contact</NavItem>
                <NavItem to="/settings" onClick={toggleMenu}>Settings</NavItem>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16" />
    </>
  );
}

export default NavBar;