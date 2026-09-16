import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const socialIconsRef = useRef<HTMLAnchorElement[]>([]);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Footer entrance animation
    gsap.fromTo(
      sectionsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Social icons hover animations
    socialIconsRef.current.forEach((icon) => {
      if (icon) {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.2,
            y: -3,
            duration: 0.3,
            ease: "back.out(1.7)",
          });
        });

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5" />,
      href: "https://facebook.com",
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://instagram.com",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      href: "https://twitter.com",
      label: "Twitter",
      color: "hover:bg-blue-400",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "hover:bg-blue-700",
    },
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Our Services", href: "#services" },
    { name: "Portfolio", href: "#gallery" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact Us", href: "#contact" },
    { name: "Get Quote", href: "#quote" },
  ];

  const services = [
    "Kitchen Renovation",
    "Bathroom Remodeling",
    "Home Additions",
    "Roof Repair",
    "Commercial Construction",
    "Exterior Renovations",
  ];

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div
            ref={(el) => el && (sectionsRef.current[0] = el)}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-6">
              <img
                src="/logo.svg"
                alt="Pinkerton Construction LLC"
                className="h-12 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Pinkerton Construction is the trusted name for homeowners and
              businesses across Texas. As a dependable, family-owned contractor,
              we take pride in delivering high-quality construction and
              remodeling services that stand the test of time
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  ref={(el) => el && (socialIconsRef.current[index] = el)}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gray-800 ${social.color} text-white p-3 rounded-full transition-all duration-300 hover:text-white`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div ref={(el) => el && (sectionsRef.current[1] = el)}>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div ref={(el) => el && (sectionsRef.current[2] = el)}>
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 relative group"
                  >
                    {service}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={(el) => el && (sectionsRef.current[3] = el)}>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    834 N Dumas Ave,
                    <br />
                    Dumas, Texas 79029
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <a
                  href="tel:+15551234567"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  (806) 751-0035
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <a
                  href="mailto:info@pinkertonconstruction.com"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  info@pinkertoncontruction.com
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Mon - Fri: 7:00 AM - 6:00 PM</p>
                  <p>Sat: 8:00 AM - 4:00 PM</p>
                  <p>Sun: Emergency calls only</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>
                &copy; 2025 Pinkerton Construction LLC. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <a
                href="#privacy"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Contact Banner */}
      <div className="bg-yellow-500 text-gray-900 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-center">
            <span className="font-semibold">
              24/7 Emergency Construction Services:
            </span>
            <a
              href="tel:+15551234567"
              className="font-bold text-lg hover:underline"
            >
              (806) 751-0035
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
