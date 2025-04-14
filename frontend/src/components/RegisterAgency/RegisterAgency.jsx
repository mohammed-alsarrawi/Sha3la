import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import axios from "axios"; // Ensure axios is installed

const RegisterAgency = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    agencyName: "",
    address: "",
    phoneNumber: "",
    email: "",
    location: "",
    licenseImage: null,
  });

  // State for multi-step progress
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({
        ...formData,
        licenseImage: e.target.files[0],
      });

      // Create preview URL for the image
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Handle geolocation to capture agency's coordinates (as "latitude,longitude")
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude.toFixed(6);
          const longitude = position.coords.longitude.toFixed(6);
          const coordsText = `${latitude},${longitude}`;

          // Update the formData with the coordinate string
          setFormData((prev) => ({
            ...prev,
            location: coordsText,
          }));
          setIsLocating(false);
          Swal.fire({
            title: "تم تحديد موقعك بنجاح!",
            text: `الإحداثيات: ${coordsText}`,
            icon: "success",
            confirmButtonText: "موافق",
          });
        },
        (error) => {
          setIsLocating(false);
          console.error("Geolocation error:", error);
          Swal.fire({
            title: "حدث خطأ",
            text: `لم نتمكن من تحديد موقعك. سبب الخطأ: ${error.message}`,
            icon: "error",
            confirmButtonText: "موافق",
          });
        }
      );
    } else {
      Swal.fire({
        title: "غير مدعوم",
        text: "متصفحك لا يدعم تحديد المواقع.",
        icon: "warning",
        confirmButtonText: "موافق",
      });
    }
  };

  // Handle form submission and send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("agencyName", formData.agencyName);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("licenseImage", formData.licenseImage);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/agency/register", // Backend API URL for agency registration
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for sending files
          },
        }
      );
      setIsSubmitting(false);
      Swal.fire({
        title: "تم تسجيل الوكالة بنجاح!",
        icon: "success",
        confirmButtonText: "موافق",
      });
      // Optionally clear the form or navigate away
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error in agency registration:", error);
      Swal.fire({
        title: "حدث خطأ",
        text: "حدث خطأ أثناء تقديم الطلب. حاول مرة أخرى.",
        icon: "error",
        confirmButtonText: "موافق",
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 py-6 px-8">
            <h2 className="text-3xl font-bold text-white text-right">
              تسجيل وكالة غاز جديدة
            </h2>
            <p className="text-blue-100 mt-2 text-right">
              أكمل النموذج أدناه للتسجيل كوكالة معتمدة لتوزيع الغاز
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="px-8 pt-6" dir="rtl">
            <div className="flex justify-between mb-8">
              <div
                className={`flex flex-col items-center ${
                  step >= 1 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                    step >= 1 ? "border-blue-600 bg-blue-100" : "border-gray-300"
                  } mb-2`}
                >
                  1
                </div>
                <span className="text-sm">المعلومات الأساسية</span>
              </div>
              <div
                className={`flex-1 border-t-2 self-start mt-5 mx-4 ${
                  step >= 2 ? "border-blue-600" : "border-gray-300"
                }`}
              ></div>
              <div
                className={`flex flex-col items-center ${
                  step >= 2 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                    step >= 2 ? "border-blue-600 bg-blue-100" : "border-gray-300"
                  } mb-2`}
                >
                  2
                </div>
                <span className="text-sm">الوثائق والتأكيد</span>
              </div>
            </div>
          </div>

          {/* Form Steps */}
          <form onSubmit={handleSubmit} className="p-8 pt-0" dir="rtl">
            {/* Step 1: Basic Information */}
            <div className={step === 1 ? "block" : "hidden"}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    اسم الوكالة
                  </label>
                  <input
                    type="text"
                    name="agencyName"
                    value={formData.agencyName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    placeholder="أدخل اسم الوكالة"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    placeholder="أدخل رقم الهاتف"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    placeholder="example@domain.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    الموقع الجغرافي
                  </label>
                  <button
                    type="button"
                    onClick={handleLocationClick}
                    disabled={isLocating}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right bg-blue-100 hover:bg-blue-200"
                    required
                  >
                    {isLocating ? "جاري تحديد الموقع..." : "تحديد الموقع تلقائياً"}
                  </button>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    العنوان بالتفصيل
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    placeholder="أدخل العنوان التفصيلي للوكالة"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={
                    !formData.agencyName ||
                    !formData.phoneNumber ||
                    !formData.email ||
                    !formData.address ||
                    !formData.location
                  }
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  التالي <span className="mr-1">→</span>
                </button>
              </div>
            </div>

            {/* Step 2: License & Confirmation */}
            <div className={step === 2 ? "block" : "hidden"}>
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  صورة الترخيص أو التصريح
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300">
                  {filePreview ? (
                    <div className="relative">
                      <img
                        src={filePreview}
                        alt="License Preview"
                        className="max-h-64 mx-auto rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFilePreview(null);
                          setFormData({ ...formData, licenseImage: null });
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto w-16 h-16 mb-4 text-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700 mb-2">
                        اسحب وأفلت ملف الترخيص هنا أو
                      </p>
                      <label className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors duration-300">
                        اختر ملف
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          required
                        />
                      </label>
                      <p className="text-sm text-gray-500 mt-2">
                        صيغ مدعومة: JPG, PNG, PDF. الحد الأقصى للحجم: 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-8 border-r-4 border-blue-500">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  معلومات هامة
                </h3>
                <p className="text-blue-700">
                  يجب أن يكون الترخيص ساري المفعول وصادر من الجهات المختصة.
                  سيتم مراجعة طلبك خلال 3-5 أيام عمل وسيتم إخطارك بالنتيجة عبر البريد الإلكتروني.
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                  <span className="ml-1">←</span> السابق
                </button>
                <button
                  type="submit"
                  disabled={!formData.licenseImage || isSubmitting}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      جاري التسجيل...
                    </>
                  ) : (
                    "إرسال الطلب"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterAgency;
