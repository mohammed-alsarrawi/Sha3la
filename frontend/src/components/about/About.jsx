import React from "react";

const About = () => {
  return (
    <main
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      {/* Hero Section - Improved with better overlay and typography */}
      <section className="relative rounded-3xl overflow-hidden mb-24">
        <div className="h-96 bg-blue-900">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/api/placeholder/1200/600")',
              backgroundBlendMode: "overlay",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80" />
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center max-w-3xl mx-auto px-4">
            <h1 className="text-6xl font-bold text-white mb-6">
              مرحباً بكم في شعلة
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              رؤيتنا هي أن نكون الوجهة الأولى والخيار الأمثل في عالم خدمات
              الغاز، مع الالتزام بأعلى معايير الجودة والأمان.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Card design with icons */}
      <section className="max-w-5xl mx-auto mb-28">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start">
              <div className="p-4 bg-blue-100 rounded-full text-blue-700 ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-blue-700 mb-4">
                  مهمتنا
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  تقديم خدمة تعبئة وتوصيل الغاز بمنتهى الدقة والأمان، مع توفير
                  تجربة سلسة للعملاء تعتمد على الشفافية والسرعة والابتكار في كل
                  خطوة.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-indigo-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start">
              <div className="p-4 bg-indigo-100 rounded-full text-indigo-700 ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-indigo-700 mb-4">
                  رؤيتنا
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  نطمح إلى ريادة السوق المحلي في حلول الغاز، من خلال التوسع
                  المستدام واعتماد أحدث التقنيات لضمان أعلى مستويات الأداء ورضا
                  العملاء.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Better visual design with accent colors */}
      <section className="max-w-5xl mx-auto mb-28 py-16 px-8 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          قيمنا الأساسية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "الأمان أولاً",
              description: "في كل عملية تعبئة وتوصيل",
              color: "blue",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ),
            },
            {
              title: "الابتكار",
              description: "كوقود للتطوير المستمر",
              color: "indigo",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              ),
            },
            {
              title: "الشفافية",
              description: "في التعامل والأسعار",
              color: "teal",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              ),
            },
            {
              title: "الالتزام",
              description: "بالمواعيد ورضا العملاء",
              color: "purple",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
            },
          ].map((value) => (
            <div
              key={value.title}
              className={`flex items-start bg-white p-6 rounded-xl shadow border-r-4 border-${value.color}-500 hover:shadow-xl transition-all duration-300`}
            >
              <div className={`flex-shrink-0 text-${value.color}-600 ml-4`}>
                {value.icon}
              </div>
              <div>
                <h3
                  className={`text-xl font-bold text-${value.color}-700 mb-2`}
                >
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Story - Better typography and layout */}
      <section className="max-w-4xl mx-auto mb-28">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="inline-block p-3 bg-blue-100 rounded-full ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </span>
              قصتنا
            </h2>
            <div className="prose prose-lg text-gray-700 max-w-none">
              <p className="text-lg leading-relaxed mb-4">
                منذ انطلاقنا، وضعنا نصب أعيننا تقديم خدمة غاز لا مثيل لها،
                انطلاقاً من شغفنا بابتكار حلول تلبي احتياجات المنازل والمشاريع
                الصغيرة على حد سواء. نعمل يداً بيد مع فريق من المهندسين والفنيين
                ذوي الخبرة، لضمان أن كل أسطوانة تمر عبر نظام رقابي متكامل قبل أن
                تصل إلى باب منزلك أو منشأتك.
              </p>
              <p className="text-lg leading-relaxed">
                عبر سنوات طويلة من التعلم والتطوير، استثمرنا في أحدث السيارات
                والتقنيات الرقمية لمتابعة الطلبات وإدارتها في الوقت الفعلي، مما
                مكنَّا من تحقيق مستويات غير مسبوقة في سرعة التوصيل وجودة الخدمة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Card-based redesign */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl overflow-hidden">
          <div className="px-8 py-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">تواصل معنا</h2>
            <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto">
              لأي استفسار أو طلب خاص، فريقنا جاهز لخدمتكم على مدار الساعة.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white hover:bg-white/20 transition">
                <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">الهاتف</h3>
                <p className="text-lg">078-1234567</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white hover:bg-white/20 transition">
                <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  البريد الإلكتروني
                </h3>
                <p className="text-lg">info@gascompany.com</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white hover:bg-white/20 transition">
                <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">العنوان</h3>
                <p className="text-lg">شارع الصناعة، عمان، الأردن</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
