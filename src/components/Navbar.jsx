import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Birdpedia", path: "/birdpedia" },
    { name: "History", path: "/history" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav className="w-full z-50 sticky top-0 bg-white/95 backdrop-blur-lg border-b border-ui-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center">
              <motion.div
                className="relative"
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg
                  className="h-10 w-10 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C10.5 2 9.5 3 9.5 4.5C9.5 5.5 10 6.5 11 7L10 8C9 8.5 8 9.5 8 11C8 12.5 9 13.5 10.5 14L12 15.5L13.5 14C15 13.5 16 12.5 16 11C16 9.5 15 8.5 14 8L13 7C14 6.5 14.5 5.5 14.5 4.5C14.5 3 13.5 2 12 2Z"
                    fill="url(#birdGradient)"
                  />
                  <circle cx="11" cy="5" r="0.5" fill="#1E403C" />
                  <defs>
                    <linearGradient id="birdGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5B8266" />
                      <stop offset="100%" stopColor="#1E403C" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
              <div className="flex items-baseline">
                <span className="font-montserrat font-bold text-2xl text-brand-forest">Kicau</span>
                <span className="font-montserrat font-bold text-2xl text-brand-sage">Finder</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-center items-center flex-1">
            <div className="flex gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group"
                >
                  <motion.span
                    className={`font-medium transition-all duration-200 ${
                      location.pathname === item.path ||
                      (item.path === "/birdpedia" &&
                        location.pathname.startsWith("/birdpedia")) ||
                      (item.path === "/history" &&
                        location.pathname.startsWith("/history"))
                        ? "text-brand-sage"
                        : "text-text-primary hover:text-brand-sage"
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                  </motion.span>
                  <motion.div
                    className={`absolute -bottom-1 left-0 h-0.5 bg-brand-sage transition-all duration-300 ${
                      location.pathname === item.path ||
                      (item.path === "/birdpedia" &&
                        location.pathname.startsWith("/birdpedia")) ||
                      (item.path === "/history" &&
                        location.pathname.startsWith("/history"))
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleMobileMenu}
              className="outline-none focus:outline-none text-text-primary p-2"
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                  className="w-6 h-0.5 bg-current block transition-all duration-300 origin-center"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="w-6 h-0.5 bg-current block mt-1.5 transition-all duration-300"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                  className="w-6 h-0.5 bg-current block mt-1.5 transition-all duration-300 origin-center"
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-ui-border"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      location.pathname === item.path ||
                      (item.path === "/birdpedia" &&
                        location.pathname.startsWith("/birdpedia")) ||
                      (item.path === "/history" &&
                        location.pathname.startsWith("/history"))
                        ? "bg-brand-sage/10 text-brand-sage"
                        : "text-text-primary hover:bg-ui-bg hover:text-brand-sage"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;