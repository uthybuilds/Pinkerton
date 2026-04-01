import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Menu, X, Phone, MapPin, ChevronDown } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);

      if (navRef.current) {
        gsap.to(navRef.current, {
          boxShadow: scrolled
            ? "0 4px 20px rgba(0, 0, 0, 0.1)"
            : "0 0 0 rgba(0, 0, 0, 0)",
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  
    if (hamburgerRef.current) {
      const lines = hamburgerRef.current.querySelectorAll("svg");
      lines.forEach((line) => {
        gsap.to(line, {
          rotation: isMenuOpen ? 0 : 45,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }

  
    if (mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { x: "100%" },
        {
          x: isMenuOpen ? "100%" : "0%",
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  };

  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "#services",
      dropdown: [
        {
          name: "Residential Remodeling",
          href: "/services/residential-remodeling",
        },
        {
          name: "Commercial Construction",
          href: "/services/commercial-construction",
        },
        { name: "Kitchen Renovation", href: "/services/kitchen-renovation" },
        { name: "Bathroom Remodeling", href: "/services/bathroom-remodeling" },
        { name: "Roof Repair", href: "/services/roof-repair" },
        { name: "Home Additions", href: "/services/home-additions" },
      ],
    },
    { name: "Gallery", href: "/#gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <img
                src="/logo.svg"
                alt="Pinkerton Construction LLC"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-8 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="h-4 w-4 text-yellow-500" />
              <span>(806) 751-0035</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-4 w-4 text-yellow-500" />
              <span>Dumas, Texas</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.name === "Services" ? (
                  // ===== FIX STARTS: wrap trigger + dropdown, add hover-bridge, handlers on wrapper =====
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {/* Trigger */}
                    <span className="relative text-gray-900 hover:text-blue-600 font-medium transition-colors duration-300 py-2 cursor-pointer flex items-center space-x-1">
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                      {/* Hover underline animation */}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                    </span>

                    {/* Hover bridge to remove the gap so mouse doesn't "leave" */}
                    {activeDropdown === item.name && (
                      <div
                        className="absolute top-full left-0 h-2 w-64"
                        aria-hidden
                      />
                    )}

                    {/* Dropdown */}
                    {activeDropdown === item.name && item.dropdown && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                        {item.dropdown.map((subItem, index) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 transform hover:translate-x-1"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : // ===== FIX ENDS =====
                item.href.startsWith("/#") ? (
                  <a
                    href={item.href}
                    className="relative text-gray-900 hover:text-blue-600 font-medium transition-colors duration-300 py-2"
                  >
                    <span>{item.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="relative text-gray-900 hover:text-blue-600 font-medium transition-colors duration-300 py-2"
                  >
                    <span>{item.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                  </Link>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <button
              onClick={() => {
                if (location.pathname === "/") {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate("/#contact");
                }
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile menu button - hide when menu is open */}
          <button
            ref={hamburgerRef}
            onClick={toggleMobileMenu}
            className={`lg:hidden p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors duration-200 z-[60] relative ${
              isMenuOpen ? "invisible" : "visible"
            }`}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 w-full h-screen bg-white shadow-xl transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-out z-50`}
      >
        <div className="px-6 py-8 space-y-6">
          {/* Header with Logo and Close Button */}
          <div className="flex justify-between items-center mb-8">
            <img src="/logo.svg" alt="Pinkerton Construction" className="h-8" />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.name === "Services" ? (
                <span className="block text-xl font-medium text-gray-900 py-3 border-b border-gray-100">
                  {item.name}
                </span>
              ) : item.href.startsWith("/#") ? (
                <a
                  href={item.href}
                  className="block text-xl font-medium text-gray-900 hover:text-blue-600 py-3 border-b border-gray-100 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  to={item.href}
                  className="block text-xl font-medium text-gray-900 hover:text-blue-600 py-3 border-b border-gray-100 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
              {item.dropdown && (
                <div className="ml-4 mt-2 space-y-2">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.href}
                      className="block text-gray-600 hover:text-blue-600 py-2 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile CTA */}
          <button
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
              setIsMenuOpen(false);
            }}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-300 mt-8"
          >
            Get Free Quote
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};
export default Navigation;
