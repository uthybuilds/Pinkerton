import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  project: string;
}

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Austin, TX",
      rating: 5,
      text: "Pinkerton Construction completely transformed our kitchen! The team was professional, on time, and the quality of work exceeded our expectations. We couldn't be happier with the results.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      project: "Kitchen Renovation",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Dallas, TX",
      rating: 5,
      text: "From start to finish, the team at Pinkerton Construction was amazing. They built our dream home addition and handled everything with such attention to detail. Highly recommend!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      project: "Home Addition",
    },
    {
      id: 3,
      name: "Jennifer Martinez",
      location: "Houston, TX",
      rating: 5,
      text: "Outstanding work on our bathroom remodel! The crew was clean, respectful, and delivered exactly what we envisioned. The project was completed on time and within budget.",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      project: "Bathroom Remodeling",
    },
    {
      id: 4,
      name: "Robert Taylor",
      location: "San Antonio, TX",
      rating: 5,
      text: "Pinkerton Construction handled our office renovation perfectly. Professional, reliable, and the final result looks incredible. Our employees love the new space!",
      avatar: "https://randomuser.me/api/portraits/men/71.jpg",
      project: "Commercial Renovation",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      location: "Fort Worth, TX",
      rating: 5,
      text: "The roof replacement was done flawlessly. Great communication throughout the process and the cleanup was thorough. These guys really know their stuff!",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      project: "Roof Replacement",
    },
  ];

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // First testimonial fade-in
    gsap.fromTo(
      carouselRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.3 },
    );
  }, []);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, testimonials.length]);

  const goToSlide = (index: number) => {
    // Slide transition animation
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        x: index > currentIndex ? -100 : 100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex(index);
          gsap.fromTo(
            carouselRef.current,
            { x: index > currentIndex ? 100 : -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          );
        },
      });
    }
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don’t just take our word for it, hear directly from the homeowners
            and businesses who’ve trusted Pinkerton Construction. Their
            experiences showcase the quality, professionalism, and reliability
            we bring to every project.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden"
          >
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-yellow-500 opacity-20">
              <Quote className="h-16 w-16" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Avatar and Info */}
              <div className="text-center md:text-left">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 rounded-full mx-auto md:mx-0 mb-4 shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-gray-600 mb-2">
                  {testimonials[currentIndex].location}
                </p>
                <div className="flex justify-center md:justify-start mb-2">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                  {testimonials[currentIndex].project}
                </span>
              </div>

              {/* Testimonial Text */}
              <div className="md:col-span-2">
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                  "{testimonials[currentIndex].text}"
                </blockquote>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
            style={{ opacity: isHovered ? 1 : 0.7 }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
            style={{ opacity: isHovered ? 1 : 0.7 }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-yellow-500 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Overall Rating Display */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <div className="flex">{renderStars(5)}</div>
            <span className="text-gray-700 font-semibold">5.0 out of 5</span>
            <span className="text-gray-500">from 50+ reviews</span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to join our satisfied customers?
          </p>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Your Project Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
