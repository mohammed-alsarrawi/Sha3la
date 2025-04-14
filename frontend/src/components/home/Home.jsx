import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Sample images, replace with actual paths
import slider1 from "../../assets/slider1.jpg";
import gasImagee from "../../assets/gasImageee.jpg";
import truckImage from "../../assets/truck.jpg";
import gas from "../../assets/gas.jpg";
import radiateurImage from "../../assets/radiateur.jpg";
import truck2Image from "../../assets/truck2.jpg";

const Home = () => {
  // Hero Section (Slider)
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      img: "https://cgway.net/wp-content/uploads/2023/12/living-rooms-decor-02.jpg",
      title: "حلول التدفئة المتميزة",
      description: "الحياة الأفضل تبدأ بمنزل مريح يمكنك أن تقوم بضبطه وصيانته",
      link: "#",
    },
    {
      img: gasImagee,
      title: "اطلب غازك الآن، سيتم توصيله بسرعة!",
      description:
        "سواء كنت في عمان، إربد، أو العقبة، نحن نوصل أسطوانات الغاز إلى باب منزلك بسرعة وأمان.",
      link: "#",
    },
    {
      img: truckImage,
      title: "توصيل الغاز الموثوق به في جميع أنحاء الأردن",
      description:
        "أسطول الشاحنات لدينا يضمن التوصيل في الوقت المناسب إلى المنازل، والأعمال التجارية، والمطاعم في جميع أنحاء الأردن.",
      link: "#",
    },
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Use effect to change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentSlide]);

  // Scroll to Services Section function
  const scrollToServices = () => {
    document.getElementById("services-section").scrollIntoView({
      behavior: "smooth",
    });
  };

  // Our Services Section
  const services = [
    {
      id: 1,
      title: "طلب أسطوانة الغاز",
      description: "اطلب أسطوانة الغاز بسهولة واستلمها على باب منزلك في دقائق.",
      image: gas,
      altText: "أسطوانة الغاز",
      linkTo: "/order-gas",
      buttonText: "اطلب الآن",
    },
    {
      id: 2,
      title: "أنظمة التدفئة المركزية بالغاز",
      description:
        "تركيب وصيانة محترفة لأنظمة التدفئة المركزية بالغاز للمنازل والأعمال التجارية.",
      image: radiateurImage,
      altText: "نظام التدفئة",
      linkTo: "/HeatingSystem",
      buttonText: "اعرف المزيد",
    },
    {
      id: 3,
      title: "حجز تعبئة الغاز المركزي",
      description: "احجز مركبة تعبئة الغاز لمنزلك أو مطعمك بسرعة وأمان.",
      image: truck2Image,
      altText: "تعبئة الغاز",
      linkTo: "/GasFilling",
      buttonText: "احجز الآن",
    },
  ];

  // Why Choose Us Section
  const features = [
    {
      id: 1,
      icon: (
        <svg
          className="w-12 h-12 text-indigo-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h4l3-7 4 16 3-7h4"
          />
        </svg>
      ),
      title: "توصيل سريع",
      description: "نقوم بتوصيل إمدادات الغاز بسرعة وموثوقية.",
    },
    {
      id: 2,
      icon: (
        <svg
          className="w-12 h-12 text-indigo-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.354a8 8 0 1 0 0 15.292M12 12l4 4m0 0l-4 4m4-4H8"
          />
        </svg>
      ),
      title: "آمن وموثوق",
      description: "خدماتنا تتبع معايير الأمان الصارمة لحمايتك.",
    },
    {
      id: 3,
      icon: (
        <svg
          className="w-12 h-12 text-indigo-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 21V8H5l7-7 7 7h-4v13"
          />
        </svg>
      ),
      title: "دعم على مدار الساعة",
      description: "فريقنا متاح على مدار الساعة لمساعدتك.",
    },
    {
      id: 4,
      icon: (
        <svg
          className="w-12 h-12 text-indigo-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m-4-4h8"
          />
        </svg>
      ),
      title: "خدمة موثوقة",
      description: "يضمن خبراؤنا أن تتم إدارة أنظمة الغاز الخاصة بك بكفاءة.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full">
        {/* Slider Container */}
        <div className="relative h-80 overflow-hidden rounded-lg md:h-[500px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute block w-full h-full transition-opacity duration-700 ease-in-out ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.img}
                className="w-full h-full object-cover"
                alt={`شريحة ${index + 1}`}
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg max-w-2xl mx-auto mb-6">
                  {slide.description}
                </p>
                <button
                  onClick={scrollToServices}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                >
                  اطلب الآن
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-blue-600" : "bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`شريحة ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Slider Controls */}
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={prevSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">السابق</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={nextSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 9 5 5 1 1"
              />
            </svg>
            <span className="sr-only">التالي</span>
          </span>
        </button>
      </div>

      {/* Our Services Section */}
      <div id="services-section" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">خدماتنا</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نقدم حلول الغاز الموثوقة لاحتياجاتك المنزلية والتجارية مع توصيل
              سريع وخدمة احترافية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-full"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.altText}
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: "center" }}
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  <Link
                    to={service.linkTo}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg inline-block transition-colors duration-300 font-medium shadow-md"
                  >
                    {service.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">لماذا تختارنا</h2>
            <p className="mt-4 text-gray-600">
              اختبر خدمة استثنائية وجودة عالية لجميع حلول الغاز الخاصة بك.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
