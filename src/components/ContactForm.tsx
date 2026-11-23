import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, FileText, Clock } from "lucide-react";

const ContactForm = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE - STEPS */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Request Your Free Quote
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Getting your free quote is now easier! Just send us an email with
              your project details and we’ll reach out within 24 hours.
            </p>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start space-x-4 bg-white p-5 rounded-lg shadow-md">
                <Mail className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Step 1: Email Us
                  </h4>
                  <p className="text-gray-600">
                    Send your request to{" "}
                    <a
                      href="mailto:info@pinkertonconstruction.org"
                      className="text-yellow-600 font-medium underline"
                    >
                      info@pinkertonconstruction.org
                    </a>
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-4 bg-white p-5 rounded-lg shadow-md">
                <FileText className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Step 2: Share Details
                  </h4>
                  <p className="text-gray-600">
                    Include your{" "}
                    <strong>name, phone number, project type</strong>, and a
                    short description of your project.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4 bg-white p-5 rounded-lg shadow-md">
                <Phone className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Step 3: Attach Photos (Optional)
                  </h4>
                  <p className="text-gray-600">
                    Sending pictures of your space helps us provide a more
                    accurate estimate.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-4 bg-white p-5 rounded-lg shadow-md">
                <Clock className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Step 4: Get Your Quote
                  </h4>
                  <p className="text-gray-600">
                    Our team will contact you within 24 hours to discuss your
                    project and provide your free quote.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - CONTACT CARD */}
          <div className="bg-gray-800 text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Phone</h4>
                <p className="text-lg">(806) 751-0035</p>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Email</h4>
                <p>info@pinkertonconstruction.org</p>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Address</h4>
                <p>
                  834 N Dumas Ave
                  <br />
                  Dumas, Texas 79029
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">
                  Business Hours
                </h4>
                <p>
                  Monday - Friday: 7:00 AM - 6:00 PM
                  <br />
                  Saturday: 8:00 AM - 4:00 PM
                  <br />
                  Sunday: Emergency calls only
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
