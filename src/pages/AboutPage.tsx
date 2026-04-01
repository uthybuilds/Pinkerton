import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Award, Users, Calendar, Shield, Heart, Target } from "lucide-react";
import kitPinkertonImage from "../Kit Pinkerton.jpeg";

const AboutPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animation
    gsap.fromTo(
      heroRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      },
    );

    // Story section animation
    gsap.fromTo(
      storyRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Values section animation
    gsap.fromTo(
      valuesRef.current?.children || [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Family Values",
      description:
        "As a family-owned business, we treat every client like family and every project like it's our own home.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality First",
      description:
        "We never compromise on quality. Every project meets our high standards before we consider it complete.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Precision",
      description:
        "Attention to detail and precision in every aspect of construction is what sets us apart from competitors.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from initial consultation to final walkthrough.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Teamwork",
      description:
        "Our experienced team works together seamlessly to deliver exceptional results on every project.",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Reliability",
      description:
        "We show up on time, stick to deadlines, and keep our promises. Your project matters to us.",
    },
  ];

  const teamMembers = [
    {
      name: "Kit Pinkerton",
      role: "Founder & CEO",
      image: kitPinkertonImage,
      description:
        "With over 25 years in construction, Kit founded Pinkerton Construction with a vision of honest, quality work.",
    },
    {
      name: "Sarah Pinkerton",
      role: "Project Manager",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      description:
        "Sarah oversees all projects ensuring they meet our quality standards and are completed on time and budget.",
    },
    {
      name: "Marcus Jackson",
      role: "Lead Foreman",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      description:
        "Marcus brings 20 years of hands-on construction experience and leads our skilled craftsman team.",
    },
  ];

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div
          ref={heroRef}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About Pinkerton Construction
          </h1>
          <p className="text-[18px] font-semibold font-mona md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Three generations of construction expertise, building trust and
            quality homes throughout Texas since 1998.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={storyRef}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-[16px] font-semibold font-mona text-gray-600 leading-relaxed">
                <p>
                  Pinkerton Construction was founded in 1998 by Kit Pinkerton, a
                  third-generation contractor who learned the trade from his
                  father and grandfather. What started as a small family
                  business has grown into one of the most trusted construction
                  companies in Texas, while maintaining our commitment to family
                  values and quality craftsmanship.
                </p>
                <p>
                  Over the past 25+ years, we've completed over 500 residential
                  and commercial projects, earning a reputation for honesty,
                  reliability, and exceptional quality. We believe in doing
                  things the right way, using quality materials, and treating
                  every client with the respect they deserve.
                </p>
                <p>
                  Today, Pinkerton Construction is a family-owned business that
                  combines traditional craftsmanship with modern techniques and
                  technology. We take pride in our work and stand behind
                  everything we build.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">25+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">100%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
                alt="Pinkerton Construction Team"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-[18px] font-semibold font-mona text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape the way we
              approach every project.
            </p>
          </div>

          <div
            ref={valuesRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 text-white rounded-full mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-[18px] font-semibold font-mona text-gray-600 max-w-3xl mx-auto">
              The experienced professionals behind every successful Pinkerton
              Construction project.
            </p>
          </div>

          <div ref={teamRef} className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="text-center group">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-yellow-600 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-yellow-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Work With Our Team?
          </h2>
          <p className="text-[18px] font-semibold font-mona text-white mb-8 opacity-95">
            Let's discuss your next construction or remodeling project. We're
            here to bring your vision to life.
          </p>
          <button
            onClick={() => (window.location.href = "/#contact")}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Your Free Consultation
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;
