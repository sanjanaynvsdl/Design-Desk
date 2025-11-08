import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export const NavBar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { label: "HOME", id: "home" },
    { label: "HOW IT WORKS", id: "how-it-works" },
    { label: "FEATURES", id: "features" },
    { label: "TESTIMONIALS", id: "testimonials" },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    // Smooth scroll to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#875479]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-lg sm:text-xl font-bold text-white tracking-tighter">
            Design{" "}
            <span className="text-lg sm:text-xl font-bold text-[#f5eef4] tracking-tighter">Desk.</span>
        </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 sm:gap-6 md:gap-8">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer"
                onClick={() => handleNavClick(item.id)}
              >
                <p className="text-sm sm:text-base font-medium text-white/90 hover:text-white transition-colors duration-200">
                  {item.label}
                </p>
              </div>
            ))}
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 bg-white text-[#875479] font-semibold text-sm sm:text-base rounded-lg hover:bg-[#f5eef4] transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white hover:text-[#f5eef4]  cursor-pointer transition-colors duration-200 p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <HiX size={28} />
            ) : (
              <HiMenu size={28} />
            )}
          </button>
          </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-3 border-t border-white/20">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer px-2 py-2 rounded-md hover:bg-white/10 transition-colors duration-200"
                onClick={() => handleNavClick(item.id)}
              >
                <p className="text-base font-medium text-white/90 hover:text-white transition-colors duration-200">
                  {item.label}
                </p>
              </div>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/signup");
              }}
              className="w-full px-4 py-2 bg-white text-[#875479] font-semibold text-base rounded-lg hover:bg-[#f5eef4] transition-colors duration-200 shadow-md mt-2 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
