import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/ClimaLogo.svg";
import {
  TwitterIcon,
  GithubIcon,
  InstagramIcon,
  ArrowUpIcon,
} from "./IconComponent";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Settings", path: "/settings" },
];

const SOCIAL_LINKS = [
  { icon: <TwitterIcon />, href: "#" },
  { icon: <GithubIcon />, href: "#" },
  { icon: <InstagramIcon />, href: "#" },
];

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-screen mt-20 ml-[calc(50%-50vw)] bg-slate-50 border-t border-slate-200 pt-8 pb-6 overflow-hidden shadow-inner">
      <div className="absolute top-0 left-0 -z-10 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <motion.img
                whileHover={{ rotate: 10 }}
                src={logo}
                alt="ClimaLogo"
                className="w-8 h-8 md:w-10 md:h-10 opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-bold text-xl tracking-tighter text-slate-800">
                CLIMA
              </span>
            </Link>
            <p className="text-slate-400 text-sm">
              Precise weather data for your daily life.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.name} to={link.path} className="relative group">
                <motion.span
                  className="text-sm font-medium text-slate-600 group-hover:text-[#4A90E2] transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90E2] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-slate-400 hover:text-[#4A90E2] transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-slate-200 mb-8" />

        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Clima Inc. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-slate-600 text-xs font-semibold hover:border-[#4A90E2] hover:text-[#4A90E2] transition-all group"
          >
            Back to Top
            <motion.span
              animate={{ y: [0, -2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <ArrowUpIcon />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
