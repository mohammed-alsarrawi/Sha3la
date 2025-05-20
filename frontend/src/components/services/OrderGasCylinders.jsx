// src/components/services/OrderGasCylinders.jsx

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import sylinder from "../../assets/cylinder1.jpg";

const OrderGasCylinders = () => {
  const [formData, setFormData] = useState({
    quantity: 1,
    address: "",
    paymentMethod: "payOnDelivery",
    notes: "",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [price, setPrice] = useState(7.5);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    setPrice(7.5 * formData.quantity);
  }, [formData.quantity]);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordsText = `خط العرض: ${position.coords.latitude.toFixed(
            6
          )}, خط الطول: ${position.coords.longitude.toFixed(6)}`;
          setLocation(coordsText);
          setIsLocating(false);
          Swal.fire({
            title: "تم تحديد موقعك بنجاح!",
            text: `الموقع: ${coordsText}`,
            icon: "success",
            confirmButtonText: "موافق",
          });
        },
        (error) => {
          setLocation("حدث خطأ أثناء محاولة تحديد الموقع.");
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
      setLocation("متصفحك لا يدعم تحديد المواقع.");
      Swal.fire({
        title: "غير مدعوم",
        text: "متصفحك لا يدعم تحديد المواقع.",
        icon: "warning",
        confirmButtonText: "موافق",
      });
    }
  };

  const handlePaymentChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, paymentMethod: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.paymentMethod === "payOnline") {
      setIsLoading(true);

      const paymentData = {
        quantity: formData.quantity,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        location: location,
        amount: price,
        cardDetails: {
          last4: formData.cardNumber.slice(-4),
          brand: "credit_card",
          expMonth: parseInt(formData.expiryDate.split('/')[0]),
          expYear: parseInt('20' + formData.expiryDate.split('/')[1])
        }
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/payments/store-payment",
          paymentData
        );

        setIsLoading(false);
        Swal.fire({
          title: "تم تأكيد الطلب!",
          text: `عدد الأسطوانات: ${formData.quantity}`,
          icon: "success",
          confirmButtonText: "موافق",
        });

        setFormData({
          quantity: 1,
          address: "",
          paymentMethod: "payOnDelivery",
          notes: "",
          cardNumber: "",
          cardHolder: "",
          expiryDate: "",
          cvv: ""
        });
        setLocation("");
      } catch (error) {
        setIsLoading(false);
        Swal.fire({
          title: "حدث خطأ",
          text: "لم يتم تقديم الطلب بنجاح. حاول مرة أخرى.",
          icon: "error",
          confirmButtonText: "موافق",
        });
      }
    } else {
      // handle 'payOnDelivery'
      setIsLoading(true);
      const orderData = {
        quantity: formData.quantity,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        location: location,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/order-gas",
          orderData
        );

        setIsLoading(false);
        Swal.fire({
          title: "تم تأكيد الطلب!",
          text: `عدد الأسطوانات: ${formData.quantity}`,
          icon: "success",
          confirmButtonText: "موافق",
        });

        setFormData({
          quantity: 1,
          address: "",
          paymentMethod: "payOnDelivery",
          notes: "",
        });
        setLocation("");
      } catch (error) {
        setIsLoading(false);
        Swal.fire({
          title: "حدث خطأ",
          text: "لم يتم تقديم الطلب بنجاح. حاول مرة أخرى.",
          icon: "error",
          confirmButtonText: "موافق",
        });
      }
    }
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-16"
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-3" dir="rtl">
            طلب أسطوانات الغاز
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto" dir="rtl">
            اطلب أسطوانات الغاز بكل سهولة وسيتم توصيلها إلى باب منزلك في أسرع
            وقت.
          </p>
        </div>

        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
          <div className="flex flex-col lg:flex-row bg-white">
            {/* Section: Product Image & Details */}
            <div className="lg:w-2/5 bg-blue-800 text-white p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6" dir="rtl">
                  أسطوانة الغاز
                </h3>
                <div className="bg-blue-900 bg-opacity-30 p-4 rounded-xl mb-8 backdrop-blur-sm">
                  <img
                    src={sylinder}
                    alt="أسطوانة الغاز"
                    className="w-full h-auto rounded-lg object-cover mb-6"
                  />
                  <h4 className="text-xl font-semibold mb-2" dir="rtl">
                    المواصفات:
                  </h4>
                  <ul className="space-y-2 text-blue-100" dir="rtl">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> أسطوانة غاز منزلية قياسية
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> مطابقة لمعايير السلامة
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> ضمان الجودة
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> توصيل سريع (خلال ساعة)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-600 p-4 rounded-xl mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-100">سعر الوحدة:</span>
                  <span className="font-semibold">7.5 دينار</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-100">الكمية:</span>
                  <span className="font-semibold">{formData.quantity}</span>
                </div>
                <div className="border-t border-blue-400 my-2 pt-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">الإجمالي:</span>
                  <span className="text-2xl font-bold">{price} دينار</span>
                </div>
              </div>
            </div>

            {/* Section: Order Form */}
            <div className="lg:w-3/5 p-8">
              <h3
                className="text-2xl font-bold text-gray-800 mb-6 text-right"
                dir="rtl"
              >
                معلومات الطلب
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quantity Input */}
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-gray-700 font-medium mb-2"
                      dir="rtl"
                    >
                      الكمية
                    </label>
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            quantity: Math.max(
                              1,
                              parseInt(formData.quantity) - 1
                            ),
                          })
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max="10"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-center focus:outline-none"
                        required
                      />
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            quantity: Math.min(
                              10,
                              parseInt(formData.quantity) + 1
                            ),
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Address Input */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-gray-700 font-medium mb-2"
                    dir="rtl"
                  >
                    العنوان بالتفصيل
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="أدخل عنوانك بالتفصيل"
                    required
                  ></textarea>
                </div>

                {/* Location (Geolocation) */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      className="block text-gray-700 font-medium"
                      dir="rtl"
                    >
                      تحديد الموقع الجغرافي
                    </label>
                    <button
                      type="button"
                      onClick={handleLocationClick}
                      className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all flex items-center"
                      disabled={isLocating}
                    >
                      {isLocating ? (
                        <>
                          <span className="inline-block animate-spin mr-2">
                            ⟳
                          </span>
                          جاري التحديد...
                        </>
                      ) : (
                        "تحديد موقعي"
                      )}
                    </button>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      location
                        ? "bg-green-50 border border-green-200"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">
                      {location ||
                        "انقر على زر تحديد موقعي للحصول على إحداثيات موقعك الحالي."}
                    </p>
                  </div>
                </div>

                {/* Notes Input */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-gray-700 font-medium mb-2"
                    dir="rtl"
                  >
                    ملاحظات إضافية (اختياري)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="أي ملاحظات أو تعليمات خاصة بالتوصيل"
                  ></textarea>
                </div>

                {/* Payment Method */}
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-3"
                    dir="rtl"
                  >
                    طريقة الدفع
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === "payOnDelivery"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-blue-200 hover:bg-blue-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="payOnDelivery"
                        checked={formData.paymentMethod === "payOnDelivery"}
                        onChange={handlePaymentChange}
                        className="hidden"
                      />
                      <div
                        className={`w-5 h-5 rounded-full mr-3 border flex items-center justify-center ${
                          formData.paymentMethod === "payOnDelivery"
                            ? "border-blue-600"
                            : "border-gray-400"
                        }`}
                      >
                        {formData.paymentMethod === "payOnDelivery" && (
                          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        )}
                      </div>
                      <div>
                        <span className="font-medium block mr-1">
                          الدفع عند الاستلام
                        </span>
                        <span className="text-gray-500 text-sm mr-1">
                          نقداً عند استلام الطلب
                        </span>
                      </div>
                    </label>
                    <label
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === "payOnline"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-blue-200 hover:bg-blue-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="payOnline"
                        checked={formData.paymentMethod === "payOnline"}
                        onChange={handlePaymentChange}
                        className="hidden"
                      />
                      <div
                        className={`w-5 h-5 rounded-full mr-3 border flex items-center justify-center ${
                          formData.paymentMethod === "payOnline"
                            ? "border-blue-600"
                            : "border-gray-400"
                        }`}
                      >
                        {formData.paymentMethod === "payOnline" && (
                          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        )}
                      </div>
                      <div>
                        <span className="font-medium block mr-1">
                          الدفع الإلكتروني
                        </span>
                        <span className="text-gray-500 text-sm mr-1">
                          بطاقة ائتمان
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Card Details Form for Online Payment */}
                {formData.paymentMethod === "payOnline" && (
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-gray-700 font-medium mb-2"
                        dir="rtl"
                      >
                        رقم البطاقة
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="XXXX XXXX XXXX XXXX"
                        maxLength="19"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cardHolder"
                        className="block text-gray-700 font-medium mb-2"
                        dir="rtl"
                      >
                        اسم حامل البطاقة
                      </label>
                      <input
                        type="text"
                        id="cardHolder"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="اسم حامل البطاقة"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="expiryDate"
                          className="block text-gray-700 font-medium mb-2"
                          dir="rtl"
                        >
                          تاريخ الانتهاء
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-gray-700 font-medium mb-2"
                          dir="rtl"
                        >
                          رمز الأمان
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="CVV"
                          maxLength="3"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
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
                        جاري انشاء الطلب...
                      </span>
                    ) : (
                      " انشاء  الطلب "
                    )}
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500 pt-2" dir="rtl">
                  بالنقر على زر التأكيد، أنت توافق على شروط الخدمة وسياسة
                  التوصيل
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderGasCylinders;
