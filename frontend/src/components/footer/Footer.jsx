import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo / Branding */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">Sha3la Gas</h2>
            <p className="text-sm text-gray-400">تجربة توصيل الغاز الأفضل</p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold uppercase">خدماتنا</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="/order-gas" className="hover:text-white">
                    طلب اسطوانات الغاز
                  </a>
                </li>
                <li>
                  <a href="/HeatingSystem" className="hover:text-white">
                    أنظمة التدفئة
                  </a>
                </li>
                <li>
                  <a href="/GasFilling" className="hover:text-white">
                    تعبئة خزانات الغاز
                  </a>
                </li>
                <li>
                  <a href="/agency" className="hover:text-white">
                    سجل كوكالة
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase">الشركة</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="/about" className="hover:text-white">عن الشركة</a></li>
                <li><a href="/contact" className="hover:text-white">تواصل معنا</a></li>
                <li><a href="/terms" className="hover:text-white">الشروط والأحكام</a></li>
                <li><a href="/privacy" className="hover:text-white">سياسة الخصوصية</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase">الدعم</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="/help" className="hover:text-white">الأسئلة الشائعة</a></li>
                <li><a href="/support" className="hover:text-white">الدعم الفني</a></li>
                <li><a href="/faq" className="hover:text-white">مركز المساعدة</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase">تابعنا</h3>
              <div className="mt-4 flex space-x-4">
                <a href="#" aria-label="Facebook" className="hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22,12A10,10,0,1,0,10.09,21.95V14.7H7.08V12h3V9.41c0-3,1.79-4.67,4.53-4.67a18.51,18.51,0,0,1,2.68.23v2.95H15.78c-1.55,0-2.03.96-2.03,1.95V12h3.46l-.55,2.7H13.75v7.25A10,10,0,0,0,22,12Z" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46,6c-.77.35-1.6.58-2.46.69a4.3,4.3,0,0,0,1.88-2.37,8.59,8.59,0,0,1-2.72,1.04A4.28,4.28,0,0,0,11.07,8.72a12.13,12.13,0,0,1-8.8-4.46,4.28,4.28,0,0,0,1.33,5.71A4.27,4.27,0,0,1,2,9.71v.05A4.28,4.28,0,0,0,4.28,14a4.3,4.3,0,0,1-1.94.07,4.28,4.28,0,0,0,4,2.97A8.58,8.58,0,0,1,2,19.54,12.1,12.1,0,0,0,8.29,21c7.55,0,11.68-6.26,11.68-11.68,0-.18,0-.35,0-.53A8.35,8.35,0,0,0,22.46,6Z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7,2C4.24,2,2,4.24,2,7V17c0,2.76,2.24,5,5,5H17c2.76,0,5-2.24,5-5V7c0-2.76-2.24-5-5-5H7ZM12,8.44A3.56,3.56,0,1,1,8.44,12,3.56,3.56,0,0,1,12,8.44Zm6.5-.9a1.25,1.25,0,1,1-1.25-1.25A1.25,1.25,0,0,1,18.5,7.54Z"/>
                    <circle cx="12" cy="12" r="3.2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Sha3la Gas. جميع الحقوق محفوظة.
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
